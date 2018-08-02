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
      'getNodes',
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
      if (!this.isEditable) {
        return;
      }

      if (this.$children > 0) {
        return;
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
