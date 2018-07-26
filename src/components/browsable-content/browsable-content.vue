<template>
  <div class="browsable-content">
    <template v-if='showNavigationMenu'>
      <notifications 
        group="actions"
        position='top left'
        classes='browsable-content__notifications' 
      />
      <navigation-menu></navigation-menu>
      <transition name='browsable-content__fade'>
        <template
          v-if='showContent'
        >
          <router-view></router-view>
        </template>
      </transition>
    </template>
    <div 
      v-else
      class="browsable-content__content"
    >
      <router-view name='content'></router-view>
    </div>
  </div>
</template>

<script>
import NavigationMenu from '../navigation-menu.vue'
import RouterView from 'vue-router'
import SharedState from '../../modules/shared-state';

export default {
  name: 'browsable-content',
  components: {
    NavigationMenu
  },
  computed: {
    showContent: function () {
      return ! this.appState.tableOfContentsIsVisible;
    }
  },
  data: function () {
    return {
      appState: SharedState.state
    };
  },
  props: {
    showNavigationMenu: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style module>
  @import 'browsable-content-module.scss'; 
</style>