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
    registerNode: function ({ component, uuidAttribute, hook }) {
      if (typeof hook === 'beforeDestroy') {
        this.sharedState.log({ action: 'unregistration', element: component.$el });
        this.unregisterNode(uuidAttribute);
        return;
      }

      this.$refs[uuidAttribute] = component;
      this.$nextTick(function () {
        const element = component.$el;
        if (typeof element === 'undefined' || !document.body.contains(element)) {
          return;
        }

        this.sharedState.log({ action: 'registration', element }, 'json-editor.registerNode');

        const { twinVNode } = this.locateTwinOf(element, uuidAttribute);
        const node = {
          uuid: uuidAttribute,
          value: component.text,
          nodeType: component.getNodeType(),
          twinUuid: twinVNode,
        };
        
        if (node.nodeType === Editable.NODE_TYPES.value) {
          this.trackNode(node);
        }
      });
    },
    getTwinsFor(element) {
      let path;
      let twin;

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

      return {
        elementVNode: this.$refs[element.getAttribute('data-uuid')],
        twinVNode: this.$refs[twin.getAttribute('data-uuid')],
      };
    },
    locateTwinOf(element, uuid) {
      let twins;

      if (!element.hasAttribute('data-uuid')) {
        element = element.querySelector('[data-uuid]');
      }

      if (element.getAttribute('data-uuid') in this.editableToDynamic) {
        twins = {
          elementVNode: this.$refs[element.getAttribute('data-uuid')],
          twinVNode: this.$refs[this.editableToDynamic[element.getAttribute('data-uuid')]],
        };
        this.ensureTwinsAreConsistent(twins);

        return twins;
      }

      twins = this.getTwinsFor(element);
      this.ensureTwinsAreConsistent(twins);

      if (twins.elementVNode.isVisible
      && !(twins.elementVNode.uuid in this.editableToDynamic)) {
        twins.elementVNode.isEditable = true;
        this.editableToDynamic[twins.elementVNode.uuid] = twins.twinVNode.uuid;
        this.dynamicToEditable[twins.twinVNode.uuid] = twins.elementVNode.uuid;
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
        this.syncNodes(twins.twinVNode, twins.elementVNode)
      }

      return twins;
    },
    syncNodes(source, destination) {
      let text = source;
      if (typeof source !== 'string') {
        let text = source.text;
      }
      destination.text = text;
      destination.$el.innerHtml = text;
      destination.$el.innerText = text;
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
    toggleNodeVisibility: function ({ element, uuid }) {
      const { twinVNode, elementVNode } = this.locateTwinOf(element, uuid);

      if (typeof elementVNode === 'undefined'
      || typeof twinVNode === 'undefined') {
        sharedState.error(new Error('Could not toggle node visibility'));
        return;
      }

      elementVNode.isEditable = true;
      elementVNode.isVisible = !elementVNode.isVisible;
      twinVNode.isVisible = !twinVNode.isVisible;
      EventHub.$emit('node.altered', { component: twinVNode });
    },
    toggleNodeEdition: function ({ nodeUuid }) {
      const nodeComponent = this.componentWithUuid(nodeUuid);
      if (typeof nodeComponent === 'undefined' || nodeComponent.edited) {
        return;
      }
      let plainText;

      if (this.isNodeWithUuidBeingEdited()(nodeUuid)) {
        const subject = nodeComponent.$el.innerText;

        if (subject.trim().length === 0) {
          subject.innerText = 'null';
        }

        let sanitizedText = subject
        .replace(/\n/g, '')
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

        nodeComponent.$el.removeAttribute('contenteditable');
        nodeComponent.$el.classList.remove('json__value--edited');
        this.syncNodes(sanitizedText, nodeComponent);

        this.saveValue({
          uuid: nodeUuid,
          value: sanitizedText
        });

        const twins = this.getTwinsFor(nodeComponent.$el);
        this.$refs[this.editableToDynamic[nodeUuid]] = twins.twinVNode;

        const twin = this.$refs[this.editableToDynamic[nodeUuid]];
        this.syncNodes(sanitizedText, twin);
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
    },
  },
  mounted: function () {
    EventHub.$on('node.shown', this.toggleNodeVisibility);
    EventHub.$on('node.hidden', this.toggleNodeVisibility);
    EventHub.$on('node.registered', this.registerNode);
    EventHub.$on('node.made_editable', this.toggleNodeEdition);
    EventHub.$on('node.made_non_editable', this.toggleNodeEdition);
    EventHub.$on('node.destroyed', this.registerNode);

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
    }
  }
};
</script>

<style module>
@import 'json-editor.scss';
</style>