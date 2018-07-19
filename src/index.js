import VueRouter from 'vue-router';
import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowAltCircleUp,
  faPenNib,
  faArrowAltCircleDown,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import App from './components/app.vue';
import routes from './modules/routes';
import store from './store';

import './styles/global.css';

// See https://fontawesome.com/how-to-use/on-the-web/using-with/vuejs
library.add(faArrowAltCircleUp);
library.add(faArrowAltCircleDown);
library.add(faPenNib);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.config.productionTip = false;

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
