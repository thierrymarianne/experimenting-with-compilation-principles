<template>
    <div class="navigation-menu__container">
      <header class='navigation-menu__header'>
        <ul class="navigation-menu__menu">
          <router-link 
            v-for="item in getMenuItems"
            :key='item.key'
            :to='item.url'
            active-class='navigation-menu__menu-item--active'
            class='navigation-menu__menu-item'
            tag='li' 
            >
            {{ item.text }}  
          </router-link>
        </ul>
      </header>
      <h1 :class="getClasses()">{{ getActiveMenuItem.text }}</h1>
    </div>
</template>

<script>
export default {
  name: 'navigation-menu',
  methods: {
    getClasses: function () {
      return {
        'navigation-menu__title': true,
        'navigation-menu__title--align-right': true
      };
    }
  },
  computed: {
    getMenuItems: function () {
      return this.menuItems;
    },
    getActiveMenuItem: function () {
      const activeMenuItem = this.$route.name;

      return this.menuItems.filter(function (item) {
          return item.key === activeMenuItem;
      })[0];
    }
  },
  props: {
    menuItems: {
      type: Array,
      default: function () {
        return [
          {
            key: 'introduction',
            text: 'Introduction',
            url: '/introduction',
          }, {
            key: 'structure-of-a-compiler',
            text: 'The Structure of a Compiler',
            url: '/structure-of-a-compiler',
          }, {
            key: 'about',
            text: 'About',
            url: '/about',
          }
        ];
      }
    }
  }
}
</script>

<style scoped type='text/scss'>
  @import '../styles/navigation-menu.scss';
</style>