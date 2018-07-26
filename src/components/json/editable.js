import uuidv5 from 'uuid/v5';
import EventHub from '../../modules/event-hub';
import namespaces from '../../modules/namespace';

const editable = {
  props: {
    isVisibleAtFirst: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isVisible: this.isVisibleAtFirst,
      isEditable: false,
    };
  },
  methods: {
    toggleVisibility() {
      this.isVisible = !this.isVisible;

      if (!this.isVisible) {
        EventHub.$emit('node.hidden', { element: this.$refs[this.uuid] });
        return;
      }

      if (this.isVisible) {
        EventHub.$emit('node.shown', { element: this.$refs[this.uuid] });
      }
    },
  },
  computed: {
    uuid() {
      const namespace = namespaces.pair;
      const uuidAttribute = uuidv5(`${this._uid}`, namespace);
      EventHub.$emit('node.registered', { component: this, uuidAttribute });
      return uuidAttribute;
    },
    getIconName() {
      if (this.isVisible) {
        return 'eye-slash';
      }

      return 'eye';
    },
  },
};

export default editable;
