import Vuex from 'vuex';
import Vue from 'vue';
import StructureOfACompiler from './modules/structure-of-a-compiler';
import JsonEditor from '../components/json/json-editor/json-editor-store';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules: {
    'structure-of-a-compiler': StructureOfACompiler,
    'json-editor': JsonEditor,
  },
  strict: debug,
});
