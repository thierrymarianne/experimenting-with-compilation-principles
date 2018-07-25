<template>
  <transition
    mode='in-out'
    name="custom-classes-transition"
    enter-active-class="animated slideInLeft"
    leave-active-class="animated slideOutRight"
  >
    <div v-show='visible'>
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'fragment-transition',
  props: {
    isVisible: { 
      type: Boolean,
      default: true
    }
  },
  data: function () {
    return {
      visible: this.isVisible,
    } 
  }
};
</script>