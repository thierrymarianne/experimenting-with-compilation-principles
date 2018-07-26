<template>
  <fragment-transition>
    <transition 
      name="custom-classes-transition" 
      mode='in-out'
      enter-active-class="animated fadeInLeftBig" 
      leave-active-class="animated hinge"
    >
      <span 
        v-if='isShown'
        :class="classes"
        :ref='uuid' 
        :data-uuid='uuid'
        :data-editable='isEditable'
      >
        <span class="json__key-value">
          <span class="json__key"><slot name='key'></slot></span>
          <span class="json__colon"><slot name='colon'></slot></span>
        </span>
        <slot name='value'></slot>
        <span class="json__comma">,</span>
      </span>
    </transition>
    <button 
      v-if='!isArrayOrObject'
      class='json__pair---button'
      v-on:click='toggleVisibility'>
      <font-awesome-icon
        class='json__pair---button-icon'
        :icon='getIconName' />
    </button>
  </fragment-transition>
</template>

<script>
import FragmentTransition from './fragment-transition.vue';
import editable from './editable';

export default {
  name: 'json-pair',
  mixins: [Object.assign({}, editable)],
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
      let hideClass='';
      if (!this.noPendingCopy) {
        hideClass = ' hide';
      }

      return `json__pair${objectClass}${arrayClass}${noChildrenClass}${hideClass}`;
    },
  },
};
</script>
