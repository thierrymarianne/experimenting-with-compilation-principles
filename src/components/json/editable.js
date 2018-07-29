import _ from 'lodash';

import uuidv5 from 'uuid/v5';
import EventHub from '../../modules/event-hub';
import SharedState from '../../modules/shared-state';
import namespaces from '../../modules/namespace';
import JsonEvents from './events/json-events';

const NODE_TYPES = {
  undeclared: null,
  value: 'value',
  pair: 'pair',
};

const Editable = {
  data: function () {
    return {
      isClonable: false,
      isEditable: false,
      isEdited: false,
      isVisible: true,
      noPendingCopy: SharedState.state.noPendingCopy,
      sharedState: SharedState.state,
      nodeType: NODE_TYPES.undeclared,
    };
  },
  methods: {
    toggleVisibility: _.debounce(
      function () {
        if (this.isEdited) {
          return;
        }

        const togglingEvent = {
          element: this.$refs[this.uuid],
          uuid: this.uuid,
        };

        if (!this.isVisible) {
          EventHub.$emit(JsonEvents.node.hidden, togglingEvent);
          return;
        }

        if (this.isVisible) {
          EventHub.$emit(JsonEvents.node.shown, togglingEvent);
        }
      },
      500,
    ),
    getNodeTypes: function () {
      return NODE_TYPES;
    },
    getNodeType: function () {
      return this.nodeType;
    },
    isValueNode: function () {
      return this.nodeType === NODE_TYPES.value;
    },
    isPairNode: function () {
      return this.nodeType === NODE_TYPES.pair;
    },
    generateUuid: function (name, namespace) {
      return uuidv5(`${name}`, namespace);
    },
  },
  computed: {
    isShown: function () {
      return this.isEditable
      || this.isVisible
      || !this.sharedState.noPendingCopy;
    },
    uuid: function () {
      const namespace = namespaces[this.getNodeType()];
      const uuidAttribute = this.generateUuid(this._uid, namespace);
      EventHub.$emit(JsonEvents.node.registered, { component: this, uuidAttribute });
      return uuidAttribute;
    },
    getIconName: function () {
      if (this.isVisible) {
        return 'trash';
      }

      return 'undo';
    },
  },
};

export default {
  NODE_TYPES,
  Editable,
};
