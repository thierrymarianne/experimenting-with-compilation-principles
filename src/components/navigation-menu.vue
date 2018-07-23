<template>
  <div class="navigation-menu__container">
    <button class='navigation-menu__button' @click='toggleTableOfContents' v-on:keyup.shift.191="toggleTableOfContents">
      <font-awesome-icon class='navigation-menu__toggle-menu-icon' :icon='getToggleMenuIcon' />
      <span class='navigation-menu__button-label'>
        {{ getToggleMenuButtonLabel }}
      </span>
      <font-awesome-icon class='navigation-menu__toggle-menu-icon' :icon='getToggleMenuIcon' />
    </button>
    <transition name="custom-classes-transition" enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
      <header class='navigation-menu__header' v-if='showTableOfContents'>
        <div class='navigation-menu__overlay'></div>
        <ul class="navigation-menu__menu">
          <template v-for="item in getMenuItems">
            <router-link :key='item.name' :to='item.path' active-class='navigation-menu__menu-item--active' class='navigation-menu__menu-item'
              :class='{"navigation-menu__menu-item--active": isMenuActive(item)}' tag='li'>
              {{ item.text }}
            </router-link>
            <li v-if='getSubMenuItems(item.name) && isMenuActive(item)' class='navigation-menu__menu-item-sub-menu'>
              <ul class='navigation-menu__sub-menu'>
                <router-link v-for="subItem in getSubMenuItems(item.name)" :key='subItem.name' :to='subItem.path' active-class='navigation-menu__sub-menu-item--active'
                  class='navigation-menu__sub-menu-item' tag='li'>
                  {{ subItem.text }}
                </router-link>
              </ul>
            </li>
          </template>
        </ul>
        <div class='navigation-menu__overlay--right'></div>
      </header>
    </transition>
    <transition name="custom-classes-transition" enter-active-class="animated slideInUp" leave-active-class="animated slideOutDown">
      <div class='navigation-menu__titles-introduction'>
        <h1 :class="getTitleClasses()">{{ getActiveMenuItem.text }}</h1>
        <div class='navigation-menu__introduction' v-if='activeMenuItemHasIntroduction'>
          <component v-bind:is='getActiveMenuItem.introduction'></component>
        </div>
        <h2 v-if='shouldShowActiveMenuText' :class="getSubtitleClasses()">{{ getActiveSubMenuItem.text }}
        </h2>
        <div class='navigation-menu__introduction' v-if='shouldShowIntroductionBeforeContent'>
          <component v-bind:is='getActiveMenuItem.introduction'></component>
        </div>
        <h2 v-if='shouldShowSubtitle' :class="getSubtitleClasses()">{{ getActiveMenuItem.subtitle }}
        </h2>
        <h2 v-else-if='aSubMenuItemHasBeenSelected' :class="getSubtitleClasses()">{{ getActiveSubMenuItem.text }}
        </h2>
      </div>
    </transition>
  </div>
</template>

<script>
  import Content from './content';
  import SharedState from '../modules/shared-state';
  import NavigationMenu from '../modules/navigation-menu'

  export default {
    components: Content,
    name: 'navigation-menu',
    methods: {
      toggleTableOfContents: function () {
        if (this.tableOfContentsTogglingLocked) {
          return;
        }

        this.appState.tableOfContentsIsVisible = !this.appState.tableOfContentsIsVisible;
        this.tableOfContentsTogglingLocked = true;
        setTimeout(() => {
          this.tableOfContentsTogglingLocked = false;
        }, 500);
      },
      isMenuActive: function (menuItem) {
        return this.getActiveMenuItem.name == menuItem.name
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
      activeMenuItemHasIntroduction: function () {
        return this.aMenuItemHasBeenSelected && this.getActiveMenuItem.introduction;
      },
      showTableOfContents: function () {
        return this.appState.tableOfContentsIsVisible;
      },
      getToggleMenuIcon: function () {
        if (this.showTableOfContents) {
          return 'arrow-alt-circle-down';
        }

        return 'arrow-alt-circle-up';
      },
      getToggleMenuButtonLabel: function () {
        if (this.showTableOfContents) {
          return 'Hide Table of Contents';
        }

        return 'Show Table of Contents';
      },
      shouldShowActiveMenuText: function () {
        return this.aMenuItemHasBeenSelected &&
          this.getActiveSubMenuItem &&
          this.getActiveSubMenuItem.text;
        ;
      },
      shouldShowSubtitle: function () {
        return this.getActiveMenuItem.subtitle &&
          (!this.getActiveMenuItem.introduction ||
            this.aMenuItemHasBeenSelected);
      },
      shouldShowIntroductionBeforeContent: function () {
        return this.aSubMenuItemHasBeenSelected &&
          this.getActiveMenuItem.introduction &&
          this.getActiveSubMenuItem.hasIntroduction;
      },
      getMenuItems: function () {
        return this.menuItems;
      },
      aMenuItemHasBeenSelected: function () {
        return NavigationMenu.methods.isMenuItem(this.$route.name);
      },
      aSubMenuItemHasBeenSelected: function () {
        return NavigationMenu.methods.isSubMenuItem(this.$route.name);
      },
      getActiveMenuItem: function () {
        const routeName = this.$route.name;

        if (typeof routeName === 'undefined') {
          return undefined;
        }

        let activeMenuItems = this.menuItems.filter(function (item) {
          return item.name === routeName;
        });

        if (activeMenuItems.length === 1) {
          return activeMenuItems[0];
        }

        activeMenuItems = this.menuItems.filter(function (item) {
          if (typeof item.subMenuNames === 'undefined') {
            return false;
          }

          return item.subMenuNames.indexOf(routeName) !== -1;
        });

        if (activeMenuItems.length !== 1) {
          console.error(`The submenu has a wrong definition for route with name "${routeName}"`);
          return activeMenuItems[0];
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

        if (typeof this.subMenuItems[activeMenuItem.name] === 'undefined') {
          debugger;
          return undefined;
        }

        let activeSubMenuItems = this.subMenuItems[activeMenuItem.name].filter(function (item) {
          return item.name === routeName;
        });

        if (activeSubMenuItems.length !== 1) {
          throw `The submenu has a wrong definition for name "${activeMenuItem.name}"`;
        }

        return activeSubMenuItems[0];
      }
    },
    data: function () {
      SharedState.state.tableOfContentsIsVisible = this.menuIsVisible;

      return {
        appState: SharedState.state,
        tableOfContentsTogglingLocked: false,
      };
    },
    props: {
      menuIsVisible: {
        type: Boolean,
        default: () => (SharedState.state.tableOfContentsIsVisible)
      },
      menuItems: {
        type: Array,
        default: function () {
          return NavigationMenu.menuItems;
        }
      },
      subMenuItems: {
        type: Object,
        default: function () {
          return NavigationMenu.subMenuItems;
        }
      }
    }
  }
</script>

<style module>
  @import '../styles/navigation-menu-module.scss';
</style>