import Vue from 'vue';
import Dictionary from './components/dictionary.vue';
import InputArea from './components/input-area.vue';

// eslint-disable-next-line
const app = new Vue({
    el: '#data-structures',
    components: {
        dictionary: Dictionary,
        'input-area': InputArea,
    },
});

window.app = app;
