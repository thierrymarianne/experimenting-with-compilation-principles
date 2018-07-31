<template>
  <div class='json-editor'>
    <json 
      isEditable
    >
      <keep-alive>
        <component
          v-bind:is='editor'
          ref='json-editor'
          dynamic></component>
      </keep-alive>
    </json>
    <slot name='read-only'></slot>
  </div>
</template>

<script>
import Vue from 'vue';
import sanitizeHtml from 'sanitize-html';

import EventHub from '../../../modules/event-hub';
import SharedState from '../../../modules/shared-state';
import Json from '../json/json.vue';
import ActionTypes from './json-editor-action-types';
import MutationTypes from './json-editor-mutation-types';
import Editable from '../editable';
import JsonEvents from '../events/json-events';

import { createNamespacedHelpers } from 'vuex'
const { mapActions, mapGetters, mapMutations } = createNamespacedHelpers('json-editor')

const XPathPosition = require('simple-xpath-position');

export default {
  name: 'json-editor',
  components: {
    Json,
  },
  props: {
    editor: {
      type: String,
      default: 'json',
    },
    json: {
      type: String,
      default: () => (SharedState.state.json)
    },
  },
  methods: {
    ...mapActions([
      ActionTypes.SAVE_VALUE,
    ]),
    ...mapMutations([
      MutationTypes.START_EDITING_CONTENT,
      MutationTypes.TRACK_NODE,
    ]),
    addPair: function ({ indexInSlot, nodeUuid, value }) {
      const pairTwin = this.editableToDynamic[nodeUuid];
      const element = this.$refs[nodeUuid];
      const twin = this.$refs[pairTwin];

      if (typeof element === 'undefined' || typeof twin === 'undefined') {
        return;
      }

      element.isEditable = false;
      twin.isEditable = true;
      twin.addAfterPair();
      twin.isEditable = false;
      element.isEditable = true;

      let uuids = {
        editable: null,
        dynamic: null,
      };
      const trackPairNode = ({ component }) => {
        const pair = component;
        const clonedPairTwin = twin;

        let twins = this.getTwinsFor(pair.$refs[uuids.editable], uuids);
        const pairNode = {
          uuid: pair.uuid,
          value: null,
          nodeType: pair.getNodeType(),
          twinUuid: twins.twinVNode.uuid,
        };
        this.trackNode(pairNode);

        EventHub.$emit(JsonEvents.node.altered, { component: pair.$parent });
        EventHub.$emit(JsonEvents.node.altered, { component: clonedPairTwin.$parent });

        const valueComponent = pair.$children[0].$children
        .filter((component) => (component.$vnode.componentOptions.tag === 'json-value'))
        .pop();
        valueComponent.text = value;
        twins = this.getTwinsFor(valueComponent.$el);
        twins.twinVNode.text = value;
        const valueNode = {
          uuid: valueComponent.uuid,
          value: valueComponent.text,
          nodeType: valueComponent.getNodeType(),
          twinUuid: twins.twinVNode.uuid,
        };

        this.trackNode(valueNode);
      };

      this.$nextTick(function () {
        const twinClone = twin.updateKey({
          indexInSlot,
          parentComponent: twin.$parent,
          uuids: uuids,
        });
        this.trackComponentByUuid({
          component: twinClone,
          uuid: uuids.dynamic,
        });
        this.$nextTick(function () {
          const elementClone = element.getSlotByIndex({
            index: indexInSlot,
            parentComponent: element.$parent,
          });
          this.trackComponentByUuid({
            component: elementClone,
            uuid: elementClone.uuid,
          });
          this.editableToDynamic[elementClone.uuid] = twinClone.uuid;
          element.updateKey({
            callback: trackPairNode,
            indexInSlot,
            parentComponent: element.$parent,
            uuids: uuids,
          });
          this.dynamicToEditable[uuids.dynamic] = elementClone.uuid;
        })
      });

      twin.$parent.$forceUpdate();
      element.$parent.$forceUpdate();
    },
    setJson: function (json) {
      this.sharedState.json = json;
    },
    setJsonTemplate: function (template) {
      this.sharedState.template = template;
    },
    unregisterNode: function (uuidAttribute) {
      const editableElementUuid = this.dynamicToEditable[uuidAttribute];
      delete this.editableToDynamic[editableElementUuid];
      delete this.dynamicToEditable[uuidAttribute];
    },
    trackComponentByUuid: function ({ component, uuid }) {
      this.$refs[uuid] = component;
    },
    registerNode: function ({ component, uuidAttribute, hook }) {
      if (typeof hook === 'beforeDestroy') {
        this.sharedState.log({ action: 'unregistration', element: component.$el });
        this.unregisterNode(uuidAttribute);
        return;
      }

      this.trackComponentByUuid({ component, uuid: uuidAttribute });
      this.$nextTick(function () {
        const element = component.$el;
        if (typeof element === 'undefined' 
        || !document.body.contains(element)
        || (
          component.$vnode.componentOptions.tag === 'json-value'
          && (
            !component.hasText
            || component.$parent.$vnode.componentOptions.tag === 'json-array'
          )
        )) {
          return;
        }
        this.sharedState.log({ action: 'registration', element }, 'json-editor.registerNode');

        let { twinVNode } = this.locateTwinOf({
          element,
          uuid: uuidAttribute,
          nodeType: component.getNodeType()
        });

        if (typeof twinVNode == 'undefined') {
          twinVNode = {
            uuid: null,
          };
        }

        const node = {
          uuid: uuidAttribute,
          value: component.text,
          nodeType: component.getNodeType(),
          twinUuid: twinVNode.uuid,
        };
        
        if (node.nodeType === Editable.NODE_TYPES.value) {
          this.trackNode(node);
        }

        if (node.nodeType === Editable.NODE_TYPES.key) {
          this.trackNode(node);
        }

        component.isRegistered = true;
        EventHub.$emit(
          JsonEvents.node.afterRegistration,
          { component, node }
        );
      });
    },
    getTwinsFor(element, uuids) {
      let path;
      let twin;

      if (!document.body.contains(element)) {
        return {
          elementVNode: this.$refs[element.getAttribute('data-uuid')],
          twinVNode: undefined,
        };
      }

      try {
        path = XPathPosition.fromNode(element, this.$el.querySelector('.editable-json'));
        twin = XPathPosition.toNode(path, this.$el.querySelector('.dynamic-json'));
      } catch (error) {
        try {
          path = XPathPosition.fromNode(element, this.$el.querySelector('.dynamic-json'));
          const editableElement = XPathPosition.toNode(path, this.$el.querySelector('.editable-json'));
          twin = element;
          element = editableElement;
        } catch (error) {
          this.sharedState.error(error, 'json-editor.getTwinsFor');
          return {
            elementVNode: this.$refs[element.getAttribute('data-uuid')],
            twinVNode: undefined,
          }
        }
      }

      let elementVNode = this.$refs[element.getAttribute('data-uuid')];
      let twinVNode = this.$refs[twin.getAttribute('data-uuid')];

      if (typeof uuids !== 'undefined') {
         elementVNode = this.$refs[uuids.editable];
         twinVNode = this.$refs[uuids.dynamic];
      }

      elementVNode.isEditable = true;
      elementVNode.isClonable = true;
      twinVNode.isDynamic = true;

      return {
        elementVNode,
        twinVNode,
      };
    },
    locateTwinOf({ element, uuid, nodeType }) {
      let twins;
      let editableElement = element;

      if (!editableElement.hasAttribute('data-uuid')) {
        editableElement = element.querySelector('[data-uuid]');
        if (editableElement.classList.contains('json__comma')) {
          return;
        }

        if (editableElement === null) {
          return;
        }
      }

      if (editableElement.getAttribute('data-uuid') in this.editableToDynamic) {
        twins = {
          elementVNode: this.$refs[editableElement.getAttribute('data-uuid')],
          twinVNode: this.$refs[this.editableToDynamic[editableElement.getAttribute('data-uuid')]],
        };
        this.ensureTwinsAreConsistent(twins);

        return twins;
      }

      twins = this.getTwinsFor(editableElement);
      this.ensureTwinsAreConsistent(twins);

      if (twins.elementVNode.isVisible
      && !(twins.elementVNode.uuid in this.editableToDynamic)) {
        twins.elementVNode.isEditable = true;
        if (typeof twins.twinVNode !== 'undefined') {
          this.editableToDynamic[twins.elementVNode.uuid] = twins.twinVNode.uuid;
          this.dynamicToEditable[twins.twinVNode.uuid] = twins.elementVNode.uuid;
        }
      }

      return twins;
    },
    ensureTwinsAreConsistent(twins) {
      if (typeof twins.elementVNode === 'undefined'
      || typeof twins.twinVNode === 'undefined') {
        return;
      }

      // Ensure dynamic and editable JSON components are consistent
      if (twins.elementVNode.text !== twins.twinVNode.text) {
        this.syncNodes(twins.elementVNode, twins.twinVNode)
      }

      return twins;
    },
    syncNodes(source, destination) {
      let text = source;
      if (typeof source !== 'string') {
        text = source.text;
      }
      destination.text = text;
      destination.$el.innerHtml = text;
      destination.$el.innerText = text;

      if (typeof destination.$slots.default === 'undefined') {
        if (typeof text === 'undefined') {
          return;
        }

        destination.$slots.default = [];
      }

      destination.$slots.default[0] = text;
    },
    componentWithUuid: function (nodeUuid) {
      return this.$refs[nodeUuid];
    },
    isEnclosedInQuotes: function(subject) {
      let enclosedInQuotes = false;
      if (subject.match(/^\s*".*"\s*$/)) {
        enclosedInQuotes = true;
      }

      return enclosedInQuotes;
    },
    toggleVisibilityOfPreviousComma: function ({ dynamicComponent, isVisible, indexOfElement }) {
      let precedingVNode = dynamicComponent.$parent.$slots.default[indexOfElement - 1];
      if (typeof precedingVNode !== 'undefined') {
        const defaultSlot = dynamicComponent.$parent.$slots.default;
        let precedingCommaCandidateIndex = indexOfElement - 2;
        let precedingCommaCandidate;
        while (typeof defaultSlot[precedingCommaCandidateIndex] !== 'undefined') {
          precedingCommaCandidate = defaultSlot[precedingCommaCandidateIndex].componentInstance;
          if (typeof precedingCommaCandidate !== 'undefined') {
            if (precedingCommaCandidate.$vnode.componentOptions.tag == 'comma') {
              precedingVNode = precedingCommaCandidate.$vnode; 
              break;
            }
          }

          precedingCommaCandidateIndex = precedingCommaCandidateIndex - 1; 
        }
      }

      if (precedingVNode) {
        precedingVNode.componentInstance.isVisible = isVisible;
      }      
    },
    toggleVisibilityOfNextComma: function ({ dynamicComponent, isVisible, indexOfElement }) {
      let nextVNode = dynamicComponent.$parent.$slots.default[indexOfElement + 1];
      if (typeof nextVNode !== 'undefined') {
        const defaultSlot = dynamicComponent.$parent.$slots.default;
        let nextCommaCandidateIndex = indexOfElement + 2;
        let nextCommaCandidate;
        while (typeof defaultSlot[nextCommaCandidateIndex] !== 'undefined') {
          nextCommaCandidate = defaultSlot[nextCommaCandidateIndex].componentInstance;
          if (typeof nextCommaCandidate !== 'undefined') {
            if (nextCommaCandidate.$vnode.componentOptions.tag == 'comma') {
              nextVNode = nextCommaCandidate.$vnode; 
              break;
            }
          }

          nextCommaCandidateIndex = nextCommaCandidateIndex + 1; 
        }
      }

      if (nextVNode) {
        nextVNode.componentInstance.isVisible = isVisible;
      }      
    },
    toggleVisibilityOfCommas({ dynamicComponent, isVisible }) {
      let indexOfElement;
      dynamicComponent.$parent.$slots.default.map((VNode, index) => {
        if (VNode == dynamicComponent.$vnode) {
          indexOfElement = index;
        }
      });

      if (indexOfElement === 0) {
        this.toggleVisibilityOfNextComma({ dynamicComponent, isVisible, indexOfElement });
        return;
      }

      this.toggleVisibilityOfPreviousComma({ dynamicComponent, isVisible, indexOfElement });
    },
    toggleNodeVisibility: function ({ element, uuid }) {
      const { twinVNode, elementVNode } = this.locateTwinOf({
        element,
        uuid,
        nodeType: Editable.NODE_TYPES.pair,
      });
      twinVNode.$parent.$forceUpdate();
      this.$nextTick(function () {
        const editableComponent = elementVNode;
        const dynamicComponent = twinVNode;

        if (typeof elementVNode === 'undefined'
        || typeof twinVNode === 'undefined') {
          sharedState.error(new Error('Could not toggle node visibility'));
          return;
        }

        elementVNode.isEditable = true;
        elementVNode.isVisible = !elementVNode.isVisible;
        twinVNode.isVisible = !twinVNode.isVisible;
        this.toggleVisibilityOfCommas({ dynamicComponent, isVisible: twinVNode.isVisible })

        EventHub.$emit(JsonEvents.node.altered, { component: twinVNode });
      });
    },
    toggleNodeEdition: function ({ nodeUuid }) {
      const nodeComponent = this.componentWithUuid(nodeUuid);

      if (typeof nodeComponent === 'undefined' || nodeComponent.edited) {
        return;
      }
      let plainText;

      if (this.isNodeWithUuidBeingEdited()(nodeUuid)) {
        const subject = nodeComponent.$el.innerText;
        
        let sanitizedText = subject
        .replace(/\n/g, '');

        if (sanitizedText.trim().length === 0) {
          sanitizedText = 'null';
        }
;
        sanitizedText = sanitizedText
        .replace(/\\"/g, '<quote />')
        .trim()

        const enclosedInQuotes = this.isEnclosedInQuotes(sanitizedText);

        if (enclosedInQuotes) {
          sanitizedText = sanitizedText        
          .replace(/^(")/g, '')
          .replace(/(")$/g, '');
        }

        sanitizedText = sanitizeHtml(
          sanitizedText,
          {
            allowedTags: [ 'json-array', 'quote' ],
            selfClosing: [ 'quote' ] 
          }
        );

        sanitizedText = sanitizedText.replace('<quote />', '\\"');

        if (enclosedInQuotes) {
          sanitizedText = `"${sanitizedText}"`;
        }

        nodeComponent.isEdited = false;
        nodeComponent.text = sanitizedText;
        nodeComponent.$el.removeAttribute('contenteditable');
        nodeComponent.$el.classList.remove('json__value--edited');
        this.syncNodes(sanitizedText, nodeComponent);

        this.saveValue({
          uuid: nodeUuid,
          value: sanitizedText
        });

        this.applyChangesToTwin({
          component: nodeComponent,
          uuid: nodeUuid,
          text: sanitizedText,
        });

        EventHub.$emit(JsonEvents.node.afterEdition);
        return;
      }

      this.startEditingContent({
        uuid: nodeUuid,
      });

      nodeComponent.isEdited = true;
      nodeComponent.$el.setAttribute('contenteditable', true);
      nodeComponent.$el.classList.add('json__value--edited');

      plainText = nodeComponent.$el.innerText;
      nodeComponent.$el.innerText = plainText;
      nodeComponent.$el.focus();

      EventHub.$emit(
        JsonEvents.node.afterBeingMadeEditable,
        { nodeUuid: nodeUuid },
      );
    },
    applyChangesToTwin: function ({ component, uuid, text }) {
      const twins = this.getTwinsFor(component.$el);
      if (typeof twins.twinVNode === 'undefined') {
        return;
      }

      this.$refs[this.editableToDynamic[uuid]] = twins.twinVNode;

      const twin = this.$refs[this.editableToDynamic[uuid]];
      this.syncNodes(text, twin);
    },
  },
  mounted: function () {
    EventHub.$on(JsonEvents.node.destroyed, this.registerNode);
    EventHub.$on(JsonEvents.node.hidden, this.toggleNodeVisibility);
    EventHub.$on(JsonEvents.node.registered, this.registerNode);
    EventHub.$on(JsonEvents.node.madeEditable, this.toggleNodeEdition);
    EventHub.$on(JsonEvents.node.madeNonEditable, this.toggleNodeEdition);
    EventHub.$on(JsonEvents.node.shown, this.toggleNodeVisibility);
    EventHub.$on(JsonEvents.pair.added, this.addPair);

    this.$nextTick(function () {
      if (typeof this.$refs['json-editor'] === 'undefined') {
        return;
      }

      if (typeof this.$refs['json-editor'].$refs['editable-json'] === 'undefined') {
        return;
      }

      this.$refs['json-editor']
      .$refs['editable-json']
      .classList.add('editable-json--ready');
    });
  },
  data: function () {
    return {
      ...mapGetters([
        'isNodeWithUuidBeingEdited',
        'valueOfNodeWithUuid',
        'nodeWithUuid',
      ]),
      sharedState: SharedState.state,
      dynamicToEditable: {},
      editableToDynamic: {},
      isReady: false,
    }
  }
};
</script>

<style module>
@import 'json-editor.scss';
</style>