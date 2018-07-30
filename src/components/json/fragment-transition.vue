<template>
  <transition
    mode='in-out'
    name="custom-classes-transition"
    :enter-active-class="enterActiveClass"
    :leave-active-class="leaveActiveClass"
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
    },
    idle: { 
      type: Boolean,
      default: false
    }
  },
  computed: {
    enterActiveClass: function () {
      if (this.idle) {
        return '';
      }

      return 'transition animated fadeInLeftBig';
    },
    leaveActiveClass: function () {
      if (this.idle) {
        return '';
      }

      return 'transition animated hinge';
    }
  },
  data: function () {
    return {
      dataVisible: this.isVisibleAtFirst,
    } 
  }
};
</script>