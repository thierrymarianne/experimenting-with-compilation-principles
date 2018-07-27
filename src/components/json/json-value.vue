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
    :data-edited='isEdited'
    :data-uuid='uuid'
    :ref='uuid'
  ><slot></slot></span>
</template>

<script>
import FragmentTransition from './fragment-transition.vue';
import EventHub from '../../modules/event-hub';
import editable from './editable';

export default {
  name: 'json-value',
  components: {
    FragmentTransition,
  },
  mixins: [Object.assign({}, editable)],
  props: {
    isArrayItem: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    makeContentEditable: function () {
      if (this.hasNoText) {
        return;
      }

      EventHub.$emit(
        'node.made_editable',
        { element: this.$refs.value }
      );
    }
  },
  data: function () {
    let text;
    if (typeof this.$slots.default !== 'undefined'
    && this.$slots.default[0] !== 'undefined') {
      text = this.$slots.default[0].text;
    }

    return {
      text: text,
    }
  },
  computed: {
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