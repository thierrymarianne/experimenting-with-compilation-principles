<template>
  <span class='json__object-container'>
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
export default {
  name: 'json-object',
  props: {
    hasChildren: {
      type: Boolean,
      default: false,
    },
  },
};
</script>