<template>
  <fragment-transition v-if='isArrayItem'>
    <span class='json__value--array-item'>
      <span :class='classes'><slot></slot></span>
      <span 
        v-if='hasText && isLastChild'
        class='json__comma'
      >,</span>
    </span>
  </fragment-transition>
  <span
    v-else
    :class='classes'
    v-click-outside="makeContentNonEditable"
    @click='makeContentEditable'
    @keyup.esc='makeContentNonEditable'
    @keyup.exact.enter='makeContentNonEditable'
    @key='makeContentNonEditable'
    :data-edited='isEdited'
    :data-uuid='uuid'
    :ref='uuid'
  ><slot></slot></span>
</template>

<script>
import ClickOutside from 'vue-click-outside';

import FragmentTransition from './fragment-transition.vue';
import EventHub from '../../modules/event-hub';
import MutationTypes from './json-editor/json-editor-mutation-types';
import Editable from './editable';
import JsonEvents from './events/json-events';

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers('json-editor')

export default {
  name: 'json-value',
  components: {
    FragmentTransition,
  },
  directives: {
    ClickOutside
  },
  mixins: [Object.assign({}, Editable.Editable)],
  props: {
    isArrayItem: {
      type: Boolean,
      default: false,
    },
  },
  mounted: function () {
    this.$nextTick(function () {
      if (!this.hasText) { 
        return;
      }
      
      if (this.isArrayItem) {
        return;
      }

      const acceptedSlots = this.$slots.default.filter(
        (VNode) => (typeof VNode.tag === 'undefined')
      );
      this.$slots.default = acceptedSlots; 
      this.$forceUpdate();

      let slotsText = '';
      const text = this.$slots.default.reduce(
        (text, VNode) => {
          let concatenatedText = `${text}${VNode.text}`;
          return concatenatedText;
        },
        slotsText
      );
      this.text = text;
      this.$slots.default = this.$slots.default.slice(0, 1);
      this.$slots.default[0] = this.text;
    });
  },
  updated: function () {
    this.$nextTick(function () {
      if (!this.hasText || this.isEditable) { 
        return;
      }

      this.$slots.default[0] = this.text;
      this.$el.innerText = this.text
      this.$el.innerHtml = this.text;
    });
  },
  beforeDestroy: function () {
    EventHub.$emit(
      JsonEvents.node.destroyed,
      { component: this, uuidAttribute: this.uuid, hook: 'beforeDestroy' }
    );
  },
  methods: {
    ...mapMutations([
      MutationTypes.SET_PREVIOUS_VALUE,
      MutationTypes.SET_NEXT_VALUE,
    ]),
    makeContentEditable: function () {
      if (this.hasNoText || this.isNodeWithUuidBeingEdited(this.uuid)) {
        return;
      }

      EventHub.$emit(
        JsonEvents.node.madeEditable,
        { nodeUuid: this.uuid }
      );
    },
    makeContentNonEditable: function () {
      if (!this.isNodeWithUuidBeingEdited(this.uuid)) {
        return;
      }

      EventHub.$emit(
        JsonEvents.node.madeNonEditable,
        { nodeUuid: this.uuid }
      );
    },
  },
  data: function () {
    let text;
    if (typeof this.$slots.default !== 'undefined'
    && this.$slots.default[0] !== 'undefined') {
      text = this.$slots.default[0].text;
    }

    return {
      text: text,
      nodeType: this.getNodeTypes().value,
      isLastChild: false,
    }
  },
  computed: {
    ...mapGetters([
      'isNodeWithUuidBeingEdited',
    ]),
    hasText: function () {
      if (typeof this.text === 'undefined') {
        return false;
      }

      return this.text.trim().length > 0;
    },
    hasNoText: function () {
      return !this.hasText;
    },
    classes: function () {
      const defaultClasses = 'json__value json__value--editable';

      let booleanClass = '';
      if (this.text === 'false'
      || this.text === 'true') {
        booleanClass = ' json__value--boolean';
      }

      let nullClass = '';
      if (this.text === 'null') {
        nullClass = ' json__value--null';
      }

      return `${defaultClasses}${booleanClass}${nullClass}`;
    },
  },
};
</script>