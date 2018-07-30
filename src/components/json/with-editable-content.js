import { createNamespacedHelpers } from 'vuex';
import Editable from './editable';
import EventHub from '../../modules/event-hub';
import JsonEvents from './events/json-events';

const { mapGetters } = createNamespacedHelpers('json-editor');

const WithEditableContent = {
  mixins: [Editable.Editable],
  computed: {
    ...mapGetters([
      'isNodeWithUuidBeingEdited',
    ]),
  },
  methods: {
    makeContentEditable: function () {
      if (this.hasNoText
      || this.isNodeWithUuidBeingEdited(this.uuid)
      || this.isDynamic
      ) {
        return;
      }

      EventHub.$emit(
        JsonEvents.node.madeEditable,
        { nodeUuid: this.uuid },
      );
    },
    makeContentNonEditable: function () {
      if (typeof this.$parent !== 'undefined'
      && typeof this.$parent.$parent !== 'undefined'
      && typeof this.$parent.$parent.$parent !== 'undefined'
      ) {
        if (this.$parent.$parent.$parent
        .$vnode.componentOptions.tag !== 'json-object'
        && this.$parent.$vnode.componentOptions.tag !== 'pair-key') {
          return;
        }
      }

      if (!this.isNodeWithUuidBeingEdited(this.uuid)) {
        return;
      }

      EventHub.$emit(
        JsonEvents.node.madeNonEditable,
        { nodeUuid: this.uuid },
      );
    },
  },
};

export default WithEditableContent;
