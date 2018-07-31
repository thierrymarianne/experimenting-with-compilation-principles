import VueRouter from 'vue-router';
import Vue from 'vue';

import Notifications from 'vue-notification';
import VueClipboards from 'vue-clipboards';
import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';

import App from './components/app.vue';
import JsonPair from './components/json/json-pair.vue';
import routes from './modules/routes';
import SharedState from './modules/shared-state';
import store from './store';
import NavigationMenu from './modules/navigation-menu';
import EventHub from './modules/event-hub';
import Styles from './styles';

Vue.config.productionTip = false;
Vue.config.errorHandler = function (error, component, info) {
  SharedState.state.error(
    error,
    `json-editor.${component.$options.name}`,
    {
      info,
    },
  );
};

Vue.use(VueRouter);
Vue.use(Notifications);
Vue.use(VueClipboards);

if (SharedState.state.productionMode) {
  Raven.config('https://ef89d78c721a44f9ae1585ac0fb6b7e7@sentry.io/1250682')
  .addPlugin(RavenVue, Vue)
  .install();
}

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
  style: Styles.styles,
  components: {
    App,
    JsonPair,
  },
});

window.app = app;
