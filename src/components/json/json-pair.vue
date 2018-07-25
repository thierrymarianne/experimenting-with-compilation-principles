<template>
  <fragment-transition>
    <span :class="classes">
      <span class="json__key-value">
        <span class="json__key"><slot name='key'></slot></span>
        <span class="json__colon"><slot name='colon'></slot></span>
      </span>
      <slot name='value'></slot>
    </span>
  </fragment-transition>
</template>

<script>
import FragmentTransition from './fragment-transition.vue';

export default {
  name: 'json-pair',
  components: {
    FragmentTransition,
  },
  props: {
    isFirstChildArray: {
      type: Boolean,
      default: false,
    },
    isFirstChildObject: {
      type: Boolean,
      default: false,
    },
    isArrayOrObject: {
      type: Boolean,
      default: false,
    },
  },
  data: function () {
    return {
      text: '',
    }
  },
  computed: {
    classes: function () {
      let objectClass = '';
      if (this.isFirstChildObject) {
        objectClass = ' json__pair--object';
      }
      let arrayClass = '';
      if (this.isFirstChildArray) {
        arrayClass = ' json__pair--array';
      }
      let noChildrenClass = '';
      if (!this.isArrayOrObject) {
        noChildrenClass = ' json__pair--no-children';
      }

      return `json__pair${objectClass}${arrayClass}${noChildrenClass}`;
    },
  },
};
</script>