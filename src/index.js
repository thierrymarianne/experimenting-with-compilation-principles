import Vue from 'vue';
import Dico from './components/dictionary.vue';

// eslint-disable-next-line
const app = new Vue({
    el: '#data-structures',
    components: {
        dictionary: Dico,
    },
});

window.app = app;
