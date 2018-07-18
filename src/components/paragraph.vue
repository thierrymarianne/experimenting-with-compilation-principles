<template>
  <p :class="getClasses()"><slot></slot></p>
</template>

<script>
export default {
  name: 'paragraph',
  methods: {
    getClasses: function () {
      const classes = { 'paragraph': true };
      
      if (this.align !== 'left') {
        classes['paragraph--align-' + this.align] = true
      }

      return classes;
    }
  },
  props: {
    align: {
      type: String,
      default: 'left'
    }
  }
}
</script>

<style scoped lang='scss'>
  @import '../styles/paragraph.scss'
</style>