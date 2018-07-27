<template>
  <fragment-transition v-if='isArrayItem'>
    <span class='json__value--array-item'>
      <span :class='classes'><slot></slot></span>
      <span class='json__comma'>,</span>
    </span>
  </fragment-transition>
  <span 
    v-else
    :class='classes'
    @click='makeContentEditable'
    @keyup.esc='makeContentNonEditable'
    @key='makeContentNonEditable'
    :data-edited='isEdited'
    :data-uuid='uuid'
    :ref='uuid'
  ><slot></slot></span>
</template>

<script>
import FragmentTransition from './fragment-transition.vue';
import EventHub from '../../modules/event-hub';
import MutationTypes from './json-editor/json-editor-mutation-types';
import Editable from './editable';

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers('json-editor')

export default {
  name: 'json-value',
  components: {
    FragmentTransition,
  },
  mixins: [Object.assign({}, Editable.Editable)],
  props: {
    isArrayItem: {
      type: Boolean,
      default: false,
    },
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
        'node.made_editable',
        { nodeUuid: this.uuid }
      );
    },
    makeContentNonEditable: function () {
      if (!this.isNodeWithUuidBeingEdited(this.uuid)) {
        return;
      }

      EventHub.$emit(
        'node.made_non_editable',
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