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
    registerNode: function ({ component, uuidAttribute }) {
      this.$refs[uuidAttribute] = component;
      this.$nextTick(function () {
        const element = component.$el;
        if (typeof element === 'undefined') {
          return;
        }

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
    locateTwinOf(element, uuid) {
      let path;
      let twin;

      if (!element.hasAttribute('data-uuid')) {
        element = element.querySelector('[data-uuid]');
      }

      if (element.getAttribute('data-uuid') in this.editableToDynamic) {
        return {
          elementVNode: this.$refs[element.getAttribute('data-uuid')],
          twinVNode: this.$refs[this.editableToDynamic[element.getAttribute('data-uuid')]],
        }
      }

      try {
        path = XPathPosition.fromNode(element, this.$el.querySelector('.editable-json'));
        twin = XPathPosition.toNode(path, this.$el.querySelector('.dynamic-json'));
      } catch (error) {
        this.sharedState.error(error, 'json-editor');
        return {
          elementVNode: null,
          twinMode: null,
        };
      }

      const twins = {
        elementVNode: this.$refs[element.getAttribute('data-uuid')],
        twinVNode: this.$refs[twin.getAttribute('data-uuid')],
      };

      if (twins.elementVNode.isVisible
      && !(twins.elementVNode.uuid in this.editableToDynamic)) {
        this.editableToDynamic[twins.elementVNode.uuid] = twins.twinVNode.uuid;
        this.dynamicToEditable[twins.twinVNode.uuid] = twins.elementVNode.uuid;
      }

      return twins;
    },
    componentWithUuid: function (nodeUuid) {
      return this.$refs[nodeUuid];
    },
    toggleNodeVisibility: function ({ element, uuid }) {
      const { twinVNode, elementVNode } = this.locateTwinOf(element, uuid);
      elementVNode.isEditable = true;
      elementVNode.isVisible = !elementVNode.isVisible;
      twinVNode.isVisible = !twinVNode.isVisible;
      EventHub.$emit('node.altered');
    },
    toggleNodeEdition: function ({ nodeUuid }) {
      const nodeComponent = this.componentWithUuid(nodeUuid);
      if (typeof nodeComponent === 'undefined' || nodeComponent.edited) {
        return;
      }

      let plainText;

      if (this.isNodeWithUuidBeingEdited()(nodeUuid)) {
        nodeComponent.$el.removeAttribute('contenteditable');
        if (nodeComponent.$el.innerText.trim().length === 0) {
          nodeComponent.$el.innerText = '';
        }
        const plainTextEnclosedInAppostrophes = `"${nodeComponent.$el.innerText}"`;
        nodeComponent.$el.innerText = plainTextEnclosedInAppostrophes;
        nodeComponent.$el.classList.remove('json__value--edited');

        this.saveValue({
          uuid: nodeUuid,
          value: plainTextEnclosedInAppostrophes
        });

        console.log(this.editableToDynamic[nodeUuid]);

        return;
      }

      this.startEditingContent({
        uuid: nodeUuid,
      });

      nodeComponent.$el.setAttribute('contenteditable', true);
      nodeComponent.$el.classList.add('json__value--edited');
      plainText = nodeComponent.$el.innerText
        .replace(/^"/, '')
        .replace(/"$/, '')
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