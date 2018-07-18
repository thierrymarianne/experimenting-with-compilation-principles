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
              :class='{"navigation-menu__menu-item--active": isMenuActive(item)}'
              tag='li' 
              >
              {{ item.text }}  
            </router-link>
            <li 
              v-if='getSubMenuItems(item.key) && isMenuActive(item)'
              class='navigation-menu__menu-item-sub-menu'
            >
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
      <div class='navigation-menu__titles-introduction'>
        <h1 :class="getTitleClasses()">{{ getActiveMenuItem.text }}</h1>
        <div 
          class='navigation-menu__introduction'
          v-if='aMenuItemHasBeenSelected && getActiveMenuItem.introduction'
        >
          <component
            v-bind:is='getActiveMenuItem.introduction'></component>
        </div>
        <h2 
          v-if='aMenuItemHasBeenSelected && getActiveSubMenuItem'
          :class="getSubtitleClasses()">{{ getActiveSubMenuItem.text }}
        </h2>
        <div 
          class='navigation-menu__introduction'
          v-if='shouldShowIntroductionBeforeContent'
        >
          <component
            v-bind:is='getActiveMenuItem.introduction'></component>
        </div>
        <h2
          v-if='getActiveMenuItem.subtitle && !getActiveMenuItem.introduction'
          :class="getSubtitleClasses()">{{ getActiveMenuItem.subtitle }}
        </h2>
        <h2 
          v-else-if='aSubMenuItemHasBeenSelected'
          :class="getSubtitleClasses()">{{ getActiveSubMenuItem.text }}
        </h2>
      </div>
    </div>
</template>

<script>
import Content from './content';

export default {
  components: Content,
  name: 'navigation-menu',
  methods: {
    isMenuActive: function (menuItem) {
      return this.getActiveMenuItem.key == menuItem.key      
    },
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
    shouldShowIntroductionBeforeContent: function () {
      return this.aSubMenuItemHasBeenSelected && 
        this.getActiveMenuItem.introduction &&
        this.getActiveSubMenuItem.hasIntroduction;
    },
    getMenuItems: function () {
      return this.menuItems;
    },
    aMenuItemHasBeenSelected: function () {
      const routeName = this.$route.name;

      if (typeof routeName === 'undefined') {
        return undefined;
      }

      const activeMenuItems = this.menuItems.filter(function (item) {
          if (typeof item.subMenuKeys === 'undefined') {
            return false;
          }

          return item.subMenuKeys.indexOf(routeName) !== -1;
      });

      return activeMenuItems.length === 0;
    },
    aSubMenuItemHasBeenSelected: function () {
      return !this.aMenuItemHasBeenSelected;
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
              'grouping-of-phases-into-passes',
              'compiler-construction-tools',
            ]
          }, {
            key: 'the-evolution-of-programming-languages',
            text: 'The Evolution of Programming Languages',
            url: '/the-evolution-of-programming-languages/the-move-to-higher-level-languages',  
            introduction: 'the-evolution-of-programming-languages',
            subtitle: 'The Evolution of programming languages',
            subMenuKeys: [
              'the-move-to-higher-level-languages',
              'impacts-on-compilers',
            ]
          }, {
            key: 'the-science-of-building-a-compiler',
            text: 'The Science of Building a Compiler',
            url: '/the-science-of-building-a-compiler',  
            introduction: 'the-science-of-building-a-compiler',
            subtitle: 'The Science of Code Optimization'   
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
            }, {
              key: 'compiler-construction-tools',              
              url: '/structure-of-a-compiler/compiler-construction-tools',
              text: 'Compiler-Construction Tools',              
            }
          ],
          'the-evolution-of-programming-languages': [
            {
              key: 'the-move-to-higher-level-languages',
              text: 'The Move to Higher-level Languages',
              hasIntroduction: true,
              url: '/the-evolution-of-programming-languages/the-move-to-higher-level-languages'
            }, {
              key: 'impacts-on-compilers',              
              text: 'Impacts on Compilers',
              url: '/the-evolution-of-programming-languages/impacts-on-compilers',
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