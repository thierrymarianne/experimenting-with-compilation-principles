<template>
  <div class='box__container' v-on:click='highlightBox'>
    <div :class='getBoxClasses'>
      <slot></slot>
    </div>
    <div v-if='highlight' class='box__arrow'></div>
  </div>
</template>

<script>
export default {
  name: 'box',
  methods: {
    highlightBox: function () {
      if (!this.highlightable) {
        return;
      }

      this.highlight = !this.highlight;
    }
  },
  computed: {
    getBoxClasses: function () {
      const classes = { box: true };

      classes['box__highlightable'] = this.highlightable;
      classes['box__highlight'] = this.highlight;

      return classes;
    }  
  },
  props: {
      highlightable: {
        type: Boolean,
        default: false
      }
  },
  data: function () {
    return {
      highlight: false
    };
  }
}
</script>

<style scoped type='text/scss'>
  @import '../styles/box.scss'
</style>