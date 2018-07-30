<template>
  <span
    class='json__key'
    :data-uuid='uuid'
  >
    <json-value 
      ref='value'
      is-key
    ><slot></slot></json-value>
  </span>
</template>

<script>
import JsonValue from './json-value.vue';
import Editable from './editable';
import WithEditableContent from './with-editable-content';

export default {
  name: 'pair-key',
  components: {
    JsonValue,
  },
  mixins: [WithEditableContent],
  created: function () {
    if (!this.isRegistered) {
      return;
    }

    this.register('created');
  },
  data: function () {
    return {
      nodeType: Editable.NODE_TYPES.key,
    };
  },
  methods: {
    getText: function () {
      if (typeof this.$refs['value'] === 'undefined') {
        return;
      }

      return this.$refs['value'].text;
    },
  },
  computed: {
    text: {
      get: function () {
        return this.getText();
      },
      set: function (text) {
        this.$refs['value'].text = text;
      }
    },
    hasText: function () {
      if (typeof this.$refs['value'] === 'undefined') {
        return;
      }

      if (typeof this.$refs['value'].text === 'undefined') {
        return false;
      }

      return this.$refs['value'].text.trim().length > 0;
    },
    hasNoText: function () {
      return !this.hasText;
    },
  }
}
</script>