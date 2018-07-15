<template>
  <div class="browsable-content">
    <navigation-menu></navigation-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import NavigationMenu from './navigation-menu.vue'
import RouterView from 'vue-router'

export default {
  name: 'browsable-content',
  components: {
    NavigationMenu
  }
}
</script>

<style type="text/scss">
  @import '../styles/browsable-content.scss'; 
</style>