import _ from 'lodash';

import EventHub from '../../modules/event-hub';
import SharedState from '../../modules/shared-state';
import namespaces from '../../modules/namespace';
import JsonEvents from './events/json-events';
import WithUuid from '../../mixins/with-uuid';

const NODE_TYPES = {
  undeclared: null,
  array: 'array',
  key: 'key',
  value: 'value',
  pair: 'pair',
  comma: 'comma',
  object: 'object',
};

const Editable = {
  mixins: [WithUuid],
  data: function () {
    return {
      isClonable: false,
      isDynamic: false,
      isEditable: false,
      isEdited: false,
      isVisible: true,
      isRegistered: false,
      hasBeenDestroyed: false,
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
    isKeyNode: function () {
      return this.nodeType === NODE_TYPES.key;
    },
    registerChildrenWithTag: function ({ children, tag }) {
      children.forEach((child) => {
        if (child.$vnode.componentOptions.tag === tag) {
          child.register();
        }
      });
    },
    registerChildren: function () {
      let componentName = this.$vnode.componentOptions.tag;
      if (typeof componentName === 'undefined') {
        componentName = this.$vnode.componentOptions.Ctor.options.name;
      }
      if (componentName === 'json-object') {
        this.registerChildrenWithTag({
          children: this.$children,
          tag: 'json-pair',
        });
        return;
      }

      if (componentName === 'json-array') {
        this.registerChildrenWithTag({
          children: this.$children,
          tag: 'json-value',
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
  destroyed: function () {
    EventHub.$emit(
      JsonEvents.node.unregistered,
      { uuid: this.uuid },
    );
    this.hasBeenDestroyed = true;
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
