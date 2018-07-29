import { createNamespacedHelpers } from 'vuex';
import EventHub from '../../modules/event-hub';
import JsonEvents from './events/json-events';

const { mapGetters } = createNamespacedHelpers('json-editor');

const WithEditableContent = {
  computed: {
    ...mapGetters([
      'isNodeWithUuidBeingEdited',
    ]),
  },
  methods: {
    makeContentEditable: function () {
      if (this.hasNoText || this.isNodeWithUuidBeingEdited(this.uuid)) {
        return;
      }

      EventHub.$emit(
        JsonEvents.node.madeEditable,
        { nodeUuid: this.uuid },
      );
    },
    makeContentNonEditable: function () {
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
