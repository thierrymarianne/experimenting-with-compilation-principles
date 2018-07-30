<template>
  <span class='json__object-container' ref='container'>
    <span 
      class="json__parentheses json__parentheses--left"
    >{</span>
    <span v-if='hasChildren' class="json__object">
      <slot></slot>
    </span>
    <span class="json__parentheses json__parentheses--right">}</span>
  </span>
</template>
<script>
import EventHub from '../../modules/event-hub';
import Editable from './editable';

export default {
  name: 'json-object',
  mixins: [Editable.Editable],
  props: {
    hasChildren: {
      type: Boolean,
      default: false,
    },
  },
  mounted: function () {
    this.checkIntegrity();
    EventHub.$on('node.altered', this.selfUpdate);
  },
  methods: {
    checkIntegrity() {
      this.$slots.default = this.$slots.default.filter(VNode => (typeof VNode.tag !== 'undefined'));
      this.$children.map((component) => {
        if (component.$vnode.componentOptions.tag === 'json-pair') {
          component.register();
        }
      })
    },
    selfUpdate: function ({ component }) {
      if (typeof this.$refs.container === 'undefined'
    || component.$parent !== this) {
        return;
      }

      if (this.$children.length === 1) {
        return;
      }
      
      let visibleChildren = this.$children.filter(
        (child) => (child.isShown)
      );

      if (visibleChildren.length === 0) {
        return;
      }

      const filteredChildren = this.$slots.default.map((VNode, index) => {
        if (typeof VNode.tag !== 'undefined' 
        && VNode.tag.indexOf('json-pair') !== -1) {
          return {
            isShown: VNode.componentInstance.isShown,
            index: index,
            VNode: VNode,
            component: VNode.componentInstance,
          };
        }

        return { 
          isShown: false
        };
      }).filter(child => (child.isShown));

      filteredChildren.map((child) => (child.component.isLastChild = false));
      filteredChildren[filteredChildren.length - 1].component.isLastChild = true;
    },
  },
};
</script>