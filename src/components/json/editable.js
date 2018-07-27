import uuidv5 from 'uuid/v5';
import EventHub from '../../modules/event-hub';
import SharedState from '../../modules/shared-state';
import namespaces from '../../modules/namespace';
import _ from 'lodash';

const editable = {
  data: function () {
    return {
      isEditable: false,
      isEdited: false,
      isVisible: true,
      noPendingCopy: SharedState.state.noPendingCopy,
      sharedState: SharedState.state,
    };
  },
  methods: {
    toggleVisibility: _.debounce(function () {
        if (!this.isVisible) {
          EventHub.$emit('node.hidden', { element: this.$refs[this.uuid] });
          return;
        }

        if (this.isVisible) {
          EventHub.$emit('node.shown', { element: this.$refs[this.uuid] });
        }
      },
      500,
    ),
  },
  computed: {
    isShown: function () {
      return this.isEditable
      || this.isVisible
      || !this.sharedState.noPendingCopy;
    },
    isConcreteNode() {
      return this.isShown && this.sharedState.noPendingCopy;
    },
    uuid: function () {
      const namespace = namespaces.pair;
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

export default editable;
