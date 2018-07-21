import VueRouter from 'vue-router';
import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowAltCircleUp,
  faArrowAltCircleDown,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from './components/app.vue';
import routes from './modules/routes';
import SharedState from './modules/shared-state';
import store from './store';
import NavigationMenu from './modules/navigation-menu';

import styles from './styles/global.css';

// See https://fontawesome.com/how-to-use/on-the-web/using-with/vuejs
library.add(faArrowAltCircleUp);
library.add(faArrowAltCircleDown);

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
  if (NavigationMenu.methods.isSubMenuItem(from.name)
  && NavigationMenu.methods.isSubMenuItem(to.name)
  && (
    !NavigationMenu.methods.isFirstChildOfMenuItem(to.name, to.path)
    || NavigationMenu.methods.haveSameParent(from.name, to.name)
  )) {
    SharedState.state.tableOfContentsIsVisible = false;
  }
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
