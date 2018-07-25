<template>
  <fragment-transition>
      <transition 
        name="custom-classes-transition" 
        mode='in-out'
        enter-active-class="animated fadeInLeftBig" 
        leave-active-class="animated hinge"
      >
      <span 
        :class="classes"
        v-show='isEditable || isVisible'
        :ref='uuid' 
        :data-uuid='uuid'
        :data-editable='isEditable'
      >
        <span class="json__key-value">
          <span class="json__key"><slot name='key'></slot></span>
          <span class="json__colon"><slot name='colon'></slot></span>
        </span>
        <slot name='value'></slot>
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
import uuidv5 from 'uuid/v5';

import FragmentTransition from './fragment-transition.vue';
import EventHub from './../../modules/event-hub';
import namespaces from './../../modules/namespace';

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
    isVisibleAtFirst: {
      type: Boolean,
      default: true,
    },
  },
  data: function () {
    return {
      text: '',
      isVisible: this.isVisibleAtFirst,
      isEditable: false,
    }
  },
  moounted: function () {
    this.isEditable = this.canBeEdited;
  },
  methods: {
    mounted: function () {
      this.isEditable = this.canBeEdited();
    },
    toggleVisibility: function () {
      this.isVisible = !this.isVisible;

      if (!this.isVisible) {
        EventHub.$emit('node.hidden', { element: this.$refs[this.uuid] });
        return;
      }

      if (this.isVisible) {
        EventHub.$emit('node.shown', { element: this.$refs[this.uuid] });
      }
    },
  },
  computed: {
    uuid: function () {
      let namespace = namespaces.pair;
      const uuidAttribute = uuidv5(`${this._uid}`, namespace);
      EventHub.$emit('node.registered', { component: this, uuidAttribute });
      return uuidAttribute;
    },
    getIconName: function () {
      if (this.isVisible) {
        return 'eye-slash';
      }

      return 'eye';
    },
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