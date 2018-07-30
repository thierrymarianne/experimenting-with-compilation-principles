import _ from 'lodash';

import EventHub from '../../modules/event-hub';
import SharedState from '../../modules/shared-state';
import namespaces from '../../modules/namespace';
import JsonEvents from './events/json-events';
import WithUuid from '../../mixins/with-uuid';

const NODE_TYPES = {
  undeclared: null,
  value: 'value',
  pair: 'pair',
  comma: 'comma',
};

const Editable = {
  mixins: [WithUuid],
  data: function () {
    return {
      isClonable: false,
      isEditable: false,
      isEdited: false,
      isVisible: true,
      isRegistered: false,
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
    registerChildren: function () {
      if (this.$vnode.componentOptions.tag === 'json-object') {
        this.$children.forEach((child) => {
          if (child.$vnode.componentOptions.tag === 'json-pair') {
            child.register();
          }
        });
        return;
      }

      if (this.$vnode.componentOptions.tag === 'json-array') {
        this.$children.forEach((child) => {
          if (child.$vnode.componentOptions.tag === 'json-value') {
            child.register();
          }
        });
      }
    },
    register: function (hook) {
      const event = {
        component: this,
        uuidAttribute: this.uuid,
      };

      if (hook) {
        event.hook = hook;
      }

      EventHub.$emit(JsonEvents.node.registered, event);

      if (typeof this.afterRegistration === 'function') {
        this.afterRegistration();
      }
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
