<template>
  <div class="browsable-content">
    <navigation-menu :active-menu='activeMenu'></navigation-menu>
    <component v-bind:is='activeContent'></component>
  </div>
</template>

<script>
import NavigationMenu from './navigation-menu.vue'
import Content from './content/index'
import EventHub from '../modules/event-hub'

export default {
  name: 'browsable-content',
  components: {
    NavigationMenu,
    About: Content.About,
    Introduction: Content.Introduction
  },
  mounted: function () {
    EventHub.$on('menu_item.clicked', this.showContent)
  },
  methods: {
    showContent: function (event) {
      this.activeContent = event.target;
    }
  },
  props: {
    activeMenu: {
      type: String,
      default: 'about'
    }
  },
  data: function () {
    return {
      activeContent: this.activeMenu
    };
  }
}
</script>

<style type="text/scss">
  @import '../styles/browsable-content.scss'; 
</style>