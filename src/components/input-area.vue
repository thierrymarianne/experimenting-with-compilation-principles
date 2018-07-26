<template>
  <fieldset class="input-area">
    <textarea
      :class='getInputStatusClasses'
      ref="input"
      v-model='text'
      @change='getInputValue'
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
    getInputValue: function () {
      this.inputValue = this.$refs.input.value
      EventHub.$emit('source.changed', {
        text: this.inputValue,
      });
    },
    highlightInputError: function () {
      this.error = true;
    },
    fixedInput: function (event) {
      this.error = false;

      if (typeof this.$refs.input !== 'undefined') {
        this.$refs.input.value = JSON.stringify(event.parsedJson);
      }
    }
  },
  props: {
    textAtFirst: {
      type: String,
      default: '',
    }
  },
  data: function () {
    return {
      json: {},
      error: false,
      text: this.textAtFirst,
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../styles/input-area.scss';
</style>
