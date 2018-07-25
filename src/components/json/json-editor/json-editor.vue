<template>
  <div class='json-editor'>
    <json 
      isEditable
    >
      <component
        v-bind:is='editor'
        ref='editable-json'
        dynamic></component>
    </json>
    <slot name='read-only'></slot>
  </div>
</template>

<script>
import Vue from 'vue';
import EventHub from '../../../modules/event-hub';
import SharedState from '../../../modules/shared-state';
import Json from '../json.vue';

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
    setJson: function (json) {
      this.sharedState.json = json;
    },
    setJsonTemplate: function (template) {
      this.sharedState.template = template;
    },
    registerNode: function ({ component, uuidAttribute }) {
      this.$refs[uuidAttribute] = component;
    },
    getTwinOf(element) {
      const path = XPathPosition.fromNode(element, this.$el.querySelector('.editable-json'));
      const twin = XPathPosition.toNode(path, this.$el.querySelector('.dynamic-json'));
      return {
        elementVNode: this.$refs[element.getAttribute('data-uuid')],
        twinVnode: this.$refs[twin.getAttribute('data-uuid')],
      };
    },
    toggleElementVisibility: function ({element}) {
      const { twinVnode, elementVNode } = this.getTwinOf(element);
      elementVNode.isEditable = true;
      twinVnode.isVisible = !twinVnode.isVisible;
    },
  },
  mounted: function () {
    EventHub.$on('node.shown', this.toggleElementVisibility);
    EventHub.$on('node.hidden', this.toggleElementVisibility);
    EventHub.$on('node.registered', this.registerNode);
  },
  data: function () {
    return {
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