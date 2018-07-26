<template>
  <transition
    mode='in-out'
    name="custom-classes-transition"
    enter-active-class="transition animated fadeInLeftBig"
    leave-active-class="transition animated hinge"
  >
    <div v-if='dataVisible'>
      <slot></slot>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'fragment-transition',
  props: {
    isVisibleAtFirst: { 
      type: Boolean,
      default: true
    }
  },
  data: function () {
    return {
      dataVisible: this.isVisibleAtFirst,
    } 
  }
};
</script>