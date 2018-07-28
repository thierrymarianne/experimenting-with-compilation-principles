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

export default {
  name: 'json-object',
  props: {
    hasChildren: {
      type: Boolean,
      default: false,
    },
  },
  mounted: function () {
    EventHub.$on('node.altered', this.selfUpdate);
  },
  methods: {
    selfUpdate: function ({ component }) {
      if (typeof this.$refs.container === 'undefined' ||
      !this.$refs.container.contains(component.$el)) {
        return;
      }

      if (this.$children.length === 1) {
        return;
      }

      const visibleChildren = this.$children.filter(
        (child) => (child.isShown)
      );
      
      if (visibleChildren.length === 0) {
        return;
      } 

      this.$children.map((child) => (child.isLastChild = false))
      visibleChildren[visibleChildren.length - 1].isLastChild = true;
    },
  },
};
</script>