<template>
  <fragment-transition 
    v-show='isShown'
  >
    <transition 
      v-show='isShown'
      name="custom-classes-transition" 
      mode='in-out'
      enter-active-class="animated fadeInLeftBig" 
      leave-active-class="animated hinge"
    >
      <span 
        v-show='isShown'
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
        <span v-if='!isLastChild' class="json__comma">,</span>
      </span>
    </transition>
    <button
      v-if='!isArrayOrObject && isShown'
      class='json__pair---button'
      v-on:click='toggleVisibility'>
      <font-awesome-icon
        class='json__pair---button-icon'
        :icon='getIconName' />
    </button>
    <button
      class='json__pair---button'
      v-if='!isArrayOrObject && isVisible'
      v-on:click='addPairAfter'
    >
      <font-awesome-icon
        class='json__pair---button-icon'
        icon='plus' />
    </button>
  </fragment-transition>
</template>

<script>
import FragmentTransition from './fragment-transition.vue';
import JsonValue from './json-value.vue';
import JsonEvents from './events/json-events';
import Editable from './editable';
import EventHub from '../../modules/event-hub';

export default {
  name: 'json-pair',
  mixins: [Object.assign({}, Editable.Editable)],
  components: {
    FragmentTransition,
    JsonValue,
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
    isLastItem: {
      type: Boolean,
      default: false,
    }
  },
  data: function () {
    return {
      text: '',
      nodeType: this.getNodeTypes().value,
      isLastChild: false,
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
  methods: {
    addPairAfter: function() {
      if (!this.isEditable) {
        return;
      }

      const jsonValue = this.$createElement(
        'json-value',
        {
          scopedSlots: {
            default: props => '"value"',
          },
        },
      );
      const jsonPair = this.$createElement(
        'json-pair',
        {
          scopedSlots: {
            key: props => '"key"',
            colon: props => ':',
            value: props => jsonValue,
          },
        },
      );

      const target = this.$vnode;
      let indexInSlot = null; 
      this.$parent.$slots.default.map((VNode, index) => {
        if (VNode === target) {
          indexInSlot = index;
        }
      });
      this.$parent.$slots.default.splice(indexInSlot + 1, 0, jsonPair);

      if (this.isClonable) {
        EventHub.$emit(
          JsonEvents.pair.added,
          { nodeUuid: this.uuid, indexInSlot },
        );
      }
    },
    updateKey({ parentComponent, indexInSlot }) {
      const slot = parentComponent.$slots
      .default[indexInSlot + 1];

      parentComponent.$slots
      .default[indexInSlot + 1].key = parentComponent.$slots
      .default[indexInSlot + 1].componentInstance.uuid;      
    }
  }
};
</script>
