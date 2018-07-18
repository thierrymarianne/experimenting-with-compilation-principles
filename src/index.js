import VueRouter from 'vue-router';
import Vue from 'vue';

import App from './components/app.vue';
import routes from './modules/routes';
import store from './store';

import './styles/global.css';

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

// eslint-disable-next-line
const app = new Vue({
  el: '#app',
  router,
  store,
  components: {
    app: App,
  },
});

window.app = app;
