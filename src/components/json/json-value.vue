<template>
  <fragment-transition v-if='isArrayItem'>
    <span class='json__value--array-item'>
      <span :class='classes'><slot></slot></span>
      <comma v-show='hasText && !isLastChild' /> 
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

import Comma from './comma.vue';
import FragmentTransition from './fragment-transition.vue';
import EventHub from '../../modules/event-hub';
import SharedState from '../../modules/shared-state';
import MutationTypes from './json-editor/json-editor-mutation-types';
import Editable from './editable';
import WithEditableContent from './with-editable-content';
import JsonEvents from './events/json-events';

import { createNamespacedHelpers } from 'vuex';
const { mapActions, mapMutations } = createNamespacedHelpers('json-editor');

export default {
  name: 'json-value',
  components: {
    Comma,
    FragmentTransition,
  },
  directives: {
    ClickOutside
  },
  mixins: [
    Object.assign({}, Editable.Editable),
    WithEditableContent,
  ],
  props: {
    textAtFirst: {
      type: String,
      default: '' 
    },
    isKey: {
      type: Boolean,
      default: false,
    },
    isArrayItem: {
      type: Boolean,
      default: false,
    },
  },
  created: function () {
    this.$nextTick(function () {
      if (!this.isRegistered 
      && !this.isArrayItem
      && typeof this.$slots.default !== 'undefined'
      && typeof this.$slots.default[0] !== 'undefined') {
        this.text = this.$slots.default[0].text;
      }

      this.register('created');
    })
  },
  mounted: function () {
    this.$nextTick(function () {
      if (!this.hasText) { 
        return;
      }
      
      if (this.isArrayItem) {
        return;
      }

      if (typeof this.$slots.default === 'undefined') {
        this.$slots.default = [this.text];
        return;
      }

      const acceptedSlots = this.$slots.default.filter(
        (VNode) => {
          return typeof VNode === 'undefined'
          || typeof VNode.tag === 'undefined'
        }
      );
      this.$slots.default = acceptedSlots; 
      this.$forceUpdate();

      let slotsText = '';
      const text = this.$slots.default.reduce(
        (text, VNode) => {
          if (typeof VNode === 'undefined') {
            return text;
          }

          if (typeof VNode === 'string') {
            return `${text}${VNode}`;
          }

          return `${text}${VNode.text}`;
        },
        slotsText
      );

      this.$slots.default = this.$slots.default.slice(0, 1);
      this.$slots.default[0] = this.text;
      this.text = text;
    });
  },
  updated: function () {
    this.$nextTick(function () {
      if (!this.hasText
      || this.isEditable) { 
        return;
      }
      
      if (typeof this.$slots.default === 'undefined') {
        this.$slots.default = [];
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
    getTextFromSlot: function () {
      let text = '';
      if (typeof this.$slots.default !== 'undefined') {
        if (this.$slots.default.length > 0) {
          const textSlots = this.$slots.default.filter((VNode) => {
            return typeof VNode !== 'undefined'
            && (typeof VNode == 'string' || typeof VNode.tag === 'undefined');
          });
          let textSnippets = textSlots.map((VNode) => {
            if (typeof VNode === 'string') {
              return VNode;
            }
            return VNode.text;
          });

          return textSnippets.join('');
        }

        text = this.$slots.default[0];
      } 

      if (!this.isArrayItem && typeof this.$el !== 'undefined') {
        return this.$el.innerText;
      }

      return text;
    }
  },
  data: function () {
    return {
      isLastChild: false,
      nodeType: this.getNodeTypes().value,
      sharedState: SharedState.state,
    }
  },
  computed: {
    text: {
      get: function () {
        return this.getTextFromSlot();
      },
      set: function (text) {
        if (this.isArrayItem) {
          return;
        }

        if (typeof this.$slots.default === 'undefined') {
          this.$slots.default = [];
        }

        this.$slots.default[0] = text;
      }
    },
    hasText: function () {
      if (typeof this.getTextFromSlot() === 'undefined') {
        return false;
      }

      const text = this.getTextFromSlot();

      return text.trim().length > 0;
    },
    hasNoText: function () {
      return !this.hasText;
    },
    classes: function () {
      const defaultClasses = 'json__value json__value--editable';

      if (this.isKey) {
        return `${defaultClasses} json__value--key`;
      }

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