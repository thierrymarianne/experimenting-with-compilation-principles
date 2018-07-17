import ActionTypes from './action-types';
import MutationTypes from './mutation-types';

const StructureOfACompiler = {
  namespaced: true,
  state: {
    visibilityOfDescriptions: {
      'lexical-analyzer': false,
      'syntax-analyzer': false,
      'semantic-analyzer': false,
    },
    visibleDescription: 'lexical-analyzer',
    exampleIsVisible: false,
    sequence: 'phases_of_a_compiler',
  },
  mutations: {
    [MutationTypes.HIDE_ALL_DESCRIPTIONS](state) {
      state.visibleDescription = null;
      const { visibilityOfDescriptions } = state;

      const hideAll = (result, phaseName) => {
        result[phaseName] = false;

        return result;
      };

      state.visibilityOfDescriptions = Object.keys(visibilityOfDescriptions).reduce(
        hideAll,
        visibilityOfDescriptions,
      );
    },
    [MutationTypes.SHOW_DESCRIPTION](state, phaseName) {
      state.visibilityOfDescriptions[phaseName] = !state.visibilityOfDescriptions[phaseName];
      state.visibleDescription = phaseName;
    },
    [MutationTypes.TOGGLE_EXAMPLE_VISIBILITY](state) {
      state.exampleIsVisible = !state.exampleIsVisible;

      if (state.exampleIsVisible) {
        state.sequence = 'translation_of_a_an_assignment_statement';

        return;
      }

      state.sequence = 'phases_of_a_compiler';
    },
  },
  actions: {
    [ActionTypes.SHOW_DESCRIPTION]({ commit }, phaseName) {
      commit(MutationTypes.HIDE_ALL_DESCRIPTIONS);
      commit(MutationTypes.SHOW_DESCRIPTION, phaseName);
    },
  },
  getters: {
    sequence: (state) => {
      const { sequence } = state;

      return sequence;
    },
    exampleIsVisible: (state) => {
      const { exampleIsVisible } = state;

      return exampleIsVisible;
    },
    visibleDescription: (state) => {
      const { visibleDescription } = state;

      return visibleDescription;
    },
    visibilityOfDescriptions: (state) => {
      const { visibilityOfDescriptions } = state;

      return visibilityOfDescriptions;
    },
  },
};

export default StructureOfACompiler;
