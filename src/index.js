import VueRouter from 'vue-router';
import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowAltCircleUp,
  faArrowAltCircleDown,
  faEyeSlash,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from './components/app.vue';
import routes from './modules/routes';
import SharedState from './modules/shared-state';
import store from './store';
import NavigationMenu from './modules/navigation-menu';
import EventHub from './modules/event-hub';

import styles from './styles/global.css';

// See https://fontawesome.com/how-to-use/on-the-web/using-with/vuejs
library.add(faArrowAltCircleUp);
library.add(faArrowAltCircleDown);
library.add(faEye);
library.add(faEyeSlash);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

router.afterEach((to, from) => {
  if (NavigationMenu.methods.willCloseMenuAfterNavigation(from, to)) {
    SharedState.state.tableOfContentsIsVisible = false;

    return;
  }

  EventHub.$emit('menu_item.clicked');
});

router.beforeEach((to, from, next) => {
  if (typeof from.query.peek !== 'undefined'
  && typeof to.query.peek === 'undefined'
  ) {
    next({ name: to.name, query: from.query });
    return;
  }

  next();
});

// eslint-disable-next-line
const app = new Vue({
  el: '#app',
  router,
  store,
  styles,
  components: {
    app: App,
  },
});

window.app = app;
