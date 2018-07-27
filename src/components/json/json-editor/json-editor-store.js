import ActionTypes from './json-editor-action-types';
import MutationTypes from './json-editor-mutation-types';

const JsonEditor = {
  namespaced: true,
  state: {
    nodes: {
    },
  },
  mutations: {
    [MutationTypes.COMMIT_VALUE](state, node) {
      const { uuid, value } = node;
      state.nodes[uuid].value = value;
      const twin = state.nodes[uuid];
      state.nodes[twin.uuid].value = value;
    },
    [MutationTypes.MAKE_CONTENT_NON_EDITABLE](state, node) {
      const { uuid } = node;
      state.nodes[uuid].edited = false;
    },
    [MutationTypes.START_EDITING_CONTENT](state, node) {
      const { uuid } = node;
      state.nodes[uuid].edited = true;
    },
    [MutationTypes.TRACK_NODE](state, node) {
      state.nodes[node.uuid] = {
        edited: false,
        twinUuid: node.twinUuid,
        type: node.nodeType,
        uuid: node.uuid,
        value: node.value,
      };
    },
  },
  actions: {
    [ActionTypes.SAVE_VALUE]({ commit }, node) {
      commit(MutationTypes.COMMIT_VALUE, node);
      commit(MutationTypes.MAKE_CONTENT_NON_EDITABLE, node);
    },
  },
  getters: {
    nodeWithUuid: function (state) {
      return (uuid) => {
        if (typeof state.nodes[uuid] === 'undefined') {
          console.error({
            message: `Could not find node with UUID #${uuid}`,
            file: 'json-editor-store.nodeWithUuid',
          });
          return undefined;
        }
        return state.nodes[uuid];
      };
    },
    isNodeWithUuidBeingEdited: function (state) {
      return (uuid) => {
        if (typeof state.nodes[uuid] === 'undefined') {
          console.error({
            message: `Could not find node with UUID #${uuid}`,
            file: 'json-editor-store.isNodeWithUuidBeingEdited',
          });
          return undefined;
        }
        return state.nodes[uuid].edited;
      };
    },
    valueOfNodeWithUuid: function (state) {
      return (uuid) => {
        if (typeof state.nodes[uuid] === 'undefined') {
          console.error({
            message: `Could not find node with UUID #${uuid}`,
            file: 'json-editor-store.valueOfNodeWithUuid',
          });
          return undefined;
        }
        return state.nodes[uuid].value;
      };
    },
  },
};

export default JsonEditor;
