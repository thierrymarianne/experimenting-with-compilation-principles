<template>
<p :class='getClasses()'><slot></slot></p>
</template>

<script>
export default {
  name: 'source-code',
  methods: {
    getClasses: function () {
      const classes = { 'source-code': true };

      if (this.wrap) {
        classes['source-code__wrap'] = true;
      }

      if (this.color !== 'grey') {
        classes['source-code--color-' + this.color] = true;
      }

      return classes;
    }
  },
  props: {
    wrap: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'grey'
    }
  }
}
</script>

<style scoped type='text/scss'>
  @import '../styles/source-code.scss';
</style>