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

      const value = '"value"';
      const jsonValue = this.$createElement(
        'json-value',
        {
          props: {
            text: value,
          },
          scopedSlots: {
            default: props => [value],
          },
        },
      );
      const jsonPair = this.$createElement(
        'json-pair',
        {
          scopedSlots: {
            key: props => ['"key"'],
            colon: props => [':'],
            value: props => [jsonValue],
          },
        },
      );
      const comma = this.$createElement(
        'span',
        {
          class: 'json__comma',
          domProps: {
            innerHtml: ','
          },
        },
      );

      const target = this.$vnode;
      const slots = this.$parent.$slots.default;

      let indexInSlot = null;
      slots.map((VNode, index) => {
        if (VNode === target) {
          indexInSlot = index + 1;
        }
      });
      this.$parent.$slots.default.splice(indexInSlot, 0, comma);
      indexInSlot = indexInSlot + 1;
      this.$parent.$slots.default.splice(indexInSlot, 0, jsonPair);

      if (this.isClonable) {
        EventHub.$emit(
          JsonEvents.pair.added,
          { nodeUuid: this.uuid, indexInSlot, value },
        );
      }
    },
    updateKey({ parentComponent, indexInSlot, callback, uuids }) {
      const slot = parentComponent.$slots
      .default[indexInSlot];
      const component = parentComponent.$slots
      .default[indexInSlot].componentInstance;

      parentComponent.$slots
      .default[indexInSlot].key = component.uuid;

      const isEditableComponent = typeof callback === 'function';

      if (isEditableComponent) {
        uuids.editable = component.uuid;
        callback({ component });
        return;
      }

      uuids.dynamic = component.uuid;
    }
  }
};
</script>
