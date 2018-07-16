import VueRouter from 'vue-router';
import Vue from 'vue';
import App from './components/app.vue';
import routes from './modules/routes';

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
});

// eslint-disable-next-line
const app = new Vue({
  el: '#app',
  router,
  components: {
    app: App,
  },
});

window.app = app;
