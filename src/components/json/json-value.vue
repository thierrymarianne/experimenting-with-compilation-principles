<template>
  <fragment-transition v-if='isArrayItem'>
    <span class='json__value--array-item'>
      <span :class='classes'><slot></slot></span>
      <span class='json__comma'>,</span>
    </span>
  </fragment-transition>
  <span v-else :class='classes'><slot></slot></span>
</template>

<script>
import FragmentTransition from './fragment-transition.vue';

export default {
  name: 'json-value',
  components: {
    FragmentTransition,
  },
  props: {
    isArrayItem: {
      type: Boolean,
      default: false,
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
    }
  },
  computed: {
    classes: function () {
      let booleanClass = '';
      if (this.text === 'false'
      || this.text === 'true') {
        booleanClass = ' json__value--boolean';
      }

      let nullClass = '';
      if (this.text === 'null') {
        nullClass = ' json__value--null';
      }

      return `json__value${booleanClass}${nullClass}`;
    },
  },
};
</script>