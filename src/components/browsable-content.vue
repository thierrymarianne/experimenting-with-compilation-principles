<template>
  <div class="browsable-content">
    <template v-if='showNavigationMenu'>
      <navigation-menu></navigation-menu>
      <router-view></router-view>
    </template>
    <div 
      v-else
      class="browsable-content__content">
        <router-view name='content'></router-view>
    </div>
  </div>
</template>

<script>
import NavigationMenu from './navigation-menu.vue'
import RouterView from 'vue-router'

export default {
  name: 'browsable-content',
  components: {
    NavigationMenu
  },
  props: {
    showNavigationMenu: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped lang='scss'>
  @import '../styles/browsable-content.scss'; 
</style>