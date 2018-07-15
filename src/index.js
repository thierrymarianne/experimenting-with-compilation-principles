import Vue from 'vue';
import BrowsableContent from './components/browsable-content.vue';

// eslint-disable-next-line
const app = new Vue({
  el: '#app',
  components: {
    'browsable-content': BrowsableContent,
  },
});

window.app = app;
