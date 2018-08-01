<template>
  <div
    class='json__array-container'
    :class='{"json__array-container--empty": !hasChildren}'
  >
    <span class="json__square-bracket json__square-bracket--left">[</span>
    <span v-if='hasChildren' class="json__array">
      <slot></slot>
    </span>
    <span class="json__square-bracket json__square-bracket--right">]</span>
  </div>
</template>
<script>
import Editable from './editable';

export default {
  name: 'json-array',
  mixins: [Editable.Editable],
  mounted: function () {
    this.registerChildren();
  },
  props: {
    hasChildren: {
      type: Boolean,
      default: false,
    },
  },
  data: function () {
    return {
      nodeType: this.getNodeTypes().array,
    };
  },
};
</script>