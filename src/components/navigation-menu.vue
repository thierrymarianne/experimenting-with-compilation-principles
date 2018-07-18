<template>
    <div class="navigation-menu__container">
      <header class='navigation-menu__header'>
        <ul class="navigation-menu__menu">
          <template 
            v-for="item in getMenuItems"
          >
            <router-link 
              :key='item.key'
              :to='item.url'
              active-class='navigation-menu__menu-item--active'
              class='navigation-menu__menu-item'
              tag='li' 
              >
              {{ item.text }}  
            </router-link>
            <li v-if='getSubMenuItems(item.key)'>
              <ul class='navigation-menu__sub-menu'>
                <router-link 
                  v-for="subItem in getSubMenuItems(item.key)"
                  :key='subItem.key'
                  :to='subItem.url'
                  active-class='navigation-menu__sub-menu-item--active'
                  class='navigation-menu__sub-menu-item'
                  tag='li' 
                >
                {{ subItem.text }}  
                </router-link>
              </ul>
            </li>
          </template>
        </ul>
      </header>
      <div class='navigation-menu__titles'>
        <h1 :class="getTitleClasses()">{{ getActiveMenuItem.text }}</h1>
        <h2 
          v-if='getActiveSubMenuItem'
          :class="getSubtitleClasses()">{{ getActiveSubMenuItem.text }}
        </h2>
      </div>
    </div>
</template>

<script>
export default {
  name: 'navigation-menu',
  methods: {
    getTitleClasses: function () {
      return {
        'navigation-menu__title': true,
      };
    },
    getSubtitleClasses: function () {
      return {
        'navigation-menu__subtitle': true,
      };
    },
    getSubMenuItems: function (menu) {
      if (typeof this.subMenuItems[menu] === 'undefined') {
        return false;
      }

      return this.subMenuItems[menu];
    },    
  },
  computed: {
    getMenuItems: function () {
      return this.menuItems;
    },
    getActiveMenuItem: function () {
      const routeName = this.$route.name;

      if (typeof routeName === 'undefined') {
        return undefined;
      }

      let activeMenuItems = this.menuItems.filter(function (item) {
          return item.key === routeName;
      });

      if (activeMenuItems.length === 1) {
        return activeMenuItems[0];
      }

      activeMenuItems = this.menuItems.filter(function (item) {
          if (typeof item.subMenuKeys === 'undefined') {
            return false;
          }

          return item.subMenuKeys.indexOf(routeName) !== -1;
      });

      if (activeMenuItems.length !== 1) {
        throw `The submenu has a wrong definition for key "${activeMenuItem}"`;
      }

      return activeMenuItems[0];
    },
    getActiveSubMenuItem: function () {
      const activeMenuItem = this.getActiveMenuItem;

      if (typeof activeMenuItem === 'undefined') {
        return undefined;
      }

      const routeName = this.$route.name;

      if (typeof routeName === 'undefined') {
        return undefined;
      }

      if (typeof this.subMenuItems[activeMenuItem.key] === 'undefined') {
        return undefined;
      }

      let activeSubMenuItems = this.subMenuItems[activeMenuItem.key].filter(function (item) {
          return item.key === routeName;
      });

      if (activeSubMenuItems.length !== 1) {
        throw `The submenu has a wrong definition for key "${activeMenuItem.key}"`;
      }

      return activeSubMenuItems[0];
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
            url: '/structure-of-a-compiler/phases-of-a-compiler',
            subMenuKeys: [
              'phases-of-a-compiler',
              'grouping-of-phases-into-passes'
            ]
          }, {
            key: 'about',
            text: 'About',
            url: '/about',
          }
        ];
      }
    },
    subMenuItems: {
      type: Object,
      default: function () {
        return {
          'structure-of-a-compiler': [
            {
              key: 'phases-of-a-compiler',
              text: 'Phases of a compiler',
              url: '/structure-of-a-compiler/phases-of-a-compiler',
            }, {
              key: 'grouping-of-phases-into-passes',
              text: 'Grouping of phases into passes',
              url: '/structure-of-a-compiler/grouping-of-phases-into-passes'
            }
          ]
        }; 
      }
    }    
  }
}
</script>

<style module>
@import '../styles/navigation-menu-module.scss';
</style>