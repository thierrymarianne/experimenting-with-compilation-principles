<template>
  <fieldset class="input-area">
    <textarea
      :class='getInputStatusClasses'
      ref="json"
      @change='getJson'
    ></textarea>
  </fieldset>
</template>

<script>
import EventHub from '../modules/event-hub' 

export default {
  name: 'input-area',
  mounted: function () {
    EventHub.$on('parsing.failed', this.highlightInputError);
    EventHub.$on('parsing.succeeded', this.fixedInput);
  },
  computed: {
    getInputStatusClasses: function () {
      const classes = {
        'input-area__textarea': true
      };

      classes['input-area__textarea--error'] = this.error

      return classes;
    },  
  },
  methods: {
    getJson: function () {
      this.json = this.$refs.json.value
      EventHub.$emit('source.changed', {
        json: this.json
      });
    },
    highlightInputError: function () {
      this.error = true;
    },
    fixedInput: function (event) {
      this.error = false;

      if (typeof this.$refs.json !== 'undefined') {
        this.$refs.json.value = JSON.stringify(event.parsedJson);
      }
    }
  },
  data: function () {
    return {
      json: {},
      error: false
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../styles/input-area.scss';
</style>


