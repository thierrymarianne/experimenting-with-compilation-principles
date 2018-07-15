<template>
    <div class="navigation-menu__container">
      <header class='navigation-menu__header'>
        <ul class="navigation-menu__menu">
          <li v-for="item in getMenuItems"
              @click='navigateTo(item.key)'
              :class="getMenuItemClasses(item.key)">{{ item.text }}</li>
        </ul>
      </header>
      <h1 class="navigation-menu__title">{{ getActiveMenuItem.text }}</h1>
    </div>
</template>

<script>
import EventHub from '../modules/event-hub'

export default {
  name: 'navigation-menu',
  computed: {
    getMenuItems: function () {
      return this.menuItems;
    },
    getActiveMenuItem: function () {
      const activeMenuItem = this.selectedMenuItem;

      return this.menuItems.filter(function (item) {
          return item.key === activeMenuItem;
      })[0];
    }
  },
  methods: {
    navigateTo: function (key) {
      this.selectedMenuItem = key;
      EventHub.$emit('menu_item.clicked', {target: this.getActiveMenuItem.key})
    },
    getMenuItemClasses: function (key) {
      const classes = { 'navigation-menu__menu-item': true };

      classes['navigation-menu__menu-item--active'] = key == this.selectedMenuItem;

      return classes;
    }    
  },
  props: {
    activeMenuItem: {
      type: String,
      default: 'about'
    },
    menuItems: {
      type: Array,
      default: function () {
        return [
          {
            key: 'introduction',
            text: 'Introduction',
          }, 
          {
            key: 'about',
            text: 'About',
          }
        ];
      }
    }
  },
  data: function () {
    return {
      selectedMenuItem: this.activeMenuItem
    };
  }
}
</script>

<style scoped type='text/scss'>
  @import '../styles/navigation-menu.scss';
</style>