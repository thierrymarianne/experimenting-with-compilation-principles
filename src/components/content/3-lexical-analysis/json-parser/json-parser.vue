<template>
  <div class='json-parser content content--no-first-letter'>
    <input-area
      :text-at-first="prettyPrintedExample"
    ></input-area>
    <dictionary
      :literal-object="defaultExample"
      activeParser
      v-show='!showError'>
    </dictionary>
    <source-code 
      v-show='showError'
    >{{ errorMessage }}</source-code>
  </div>
</template>

<script>
import InputArea from '../../../input-area.vue';
import Dictionary from '../../../dictionary.vue';
import SourceCode from '../../../source-code.vue';
import EventHub from '../../../../modules/event-hub';
import PackageJson from '../../../../../package.json';

export default {
  name: 'lexical-analyzer',
  components: {
    Dictionary,
    InputArea,
    SourceCode,
  },
  mounted: function () {
    EventHub.$on('parsing.antlr.failed', this.handleFailedParsing);
    EventHub.$on('parsing.antlr.succeeded', this.hideErrorMessageContainer);
  },
  methods: {
    handleFailedParsing: function (event) {
      this.errorMessage = event.errorMessage;
      this.showError = true;
    },
    hideErrorMessageContainer: function () {
      this.showError = false;
    }
  },
  computed: {
    prettyPrintedExample: function () {
      return JSON.stringify(this.defaultExample, null, '\t');
    }
  },
  data: function () {
    return {
      defaultExample: PackageJson,
      errorMessage: '',
      showError: false,
    };
  },
}
</script>

<style module>
@import 'json-parser.scss';
</style>