import _ from 'lodash';

import uuidv5 from 'uuid/v5';
import EventHub from '../../modules/event-hub';
import SharedState from '../../modules/shared-state';
import namespaces from '../../modules/namespace';

const NODE_TYPES = {
  undeclared: null,
  value: 'value',
  pair: 'pair',
};

const Editable = {
  data: function () {
    return {
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
          EventHub.$emit('node.hidden', togglingEvent);
          return;
        }

        if (this.isVisible) {
          EventHub.$emit('node.shown', togglingEvent);
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
  },
  computed: {
    isShown: function () {
      return this.isEditable
      || this.isVisible
      || !this.sharedState.noPendingCopy;
    },
    uuid: function () {
      const namespace = namespaces[this.getNodeType()];
      const uuidAttribute = uuidv5(`${this._uid}`, namespace);
      EventHub.$emit('node.registered', { component: this, uuidAttribute });
      return uuidAttribute;
    },
    getIconName: function () {
      if (this.isVisible) {
        return 'eye-slash';
      }

      return 'eye';
    },
  },
};

export default {
  NODE_TYPES,
  Editable,
};
