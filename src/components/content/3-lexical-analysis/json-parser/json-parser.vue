<template>
  <div class='json-parser content content--no-first-letter'>
    <section class='json-parser__input'>
      <input-area
        :text-at-first="prettyPrintedExample"
      ></input-area>
      <button 
        v-clipboard="clipboardReadyJSON"
        v-on:mouseover="updateClipboardReadyJSON"
        @success="copyToClipboard"
        @error="failedToCopy"
        class='json-parser__button'
      >
        <font-awesome-icon
          class='json-parser__icon-copy'
          icon='copy' />
        Copy JSON
      </button>
    </section>
    <dictionary
      :literal-object="defaultExample"
      activeParser
      ref='dictionary'
      v-show='!showError'>
    </dictionary>
    <source-code 
      v-show='showError'
    >{{ errorMessage }}</source-code>
  </div>
</template>

<script>
import Vue from 'vue';

import EventHub from '../../../../modules/event-hub';
import InputArea from '../../../input-area.vue';
import Dictionary from '../../../dictionary.vue';
import PackageJson from '../../../../../package.json';
import SharedState from '../../../../modules/shared-state';
import SourceCode from '../../../source-code.vue';
import Raven from 'raven-js';

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
    EventHub.$on('node.altered', this.updateClipboardReadyJSON);

    this.$nextTick(function () {
      this.clipboardReadyJSON = this.getClipboardReadyJson();
    })
  },
  updated: function () {
    this.$nextTick(function () {
      this.clipboardReadyJSON = this.getClipboardReadyJson();
    })
  },
  methods: {
    copyToClipboard: function () {
      this.$notify({
        group: 'actions',
        title: 'What could possibly go wrong?',
        text: 'This edited version of your JSON has been successfully copied to your clipboard.',
        position: 'top left',
      });
    },
    failedToCopy: function () {
      this.sharedState.error(
        new Error(
          'Ooops, I may need a better suited way for handling errors',
          'json-parser',
        )
      );
    },
    handleFailedParsing: function (event) {
      this.errorMessage = event.errorMessage;
      this.showError = true;
    },
    hideErrorMessageContainer: function () {
      this.showError = false;
    },
    updateClipboardReadyJSON: function () {
      this.clipboardReadyJSON = this.getClipboardReadyJson();
    },
    getClipboardReadyJson: function () {
      let clibpardReadyJSON = '';
      if (typeof this.$refs.dictionary === 'undefined') {
        return clibpardReadyJSON;
      }

      if (typeof this.$refs.dictionary.$refs.jsonEditor === 'undefined') {
        return clibpardReadyJSON;
      }

      if (typeof this.$refs.dictionary.$refs.jsonEditor === 'undefined') {
        return clibpardReadyJSON;
      }

      if (typeof this.$refs.dictionary.$refs.jsonEditor
      .$refs['json-editor'] === 'undefined') {
        return clibpardReadyJSON;
      }

      if (typeof this.$refs.dictionary.$refs.jsonEditor
      .$refs['json-editor']
      .$refs['dynamic-json'] === 'undefined') {
        return clibpardReadyJSON;
      }
      
      const dynamicJSONPlaceholder = this.$refs.dictionary
      .$refs.jsonEditor
      .$refs['json-editor']
      .$refs['dynamic-json'];

      dynamicJSONPlaceholder.classList.add('with-punctuation');

      // Remove node from the DOM to copy inner text
      this.sharedState.noPendingCopy = false;

      let prettifiedJSON;
      try {
        prettifiedJSON = JSON.stringify(
          JSON.parse(dynamicJSONPlaceholder.innerText),
          null,
          '\t'
        );
      } catch (error) {
        this.sharedState.error(error, 'json-parser');
        prettifiedJSON = '{}';
      }
      
      // Restore node into the DOM to copy inner text
      this.sharedState.noPendingCopy = true;

      dynamicJSONPlaceholder.classList.remove('with-punctuation');

      return prettifiedJSON;
    }
  },
  computed: {
    prettyPrintedExample: function () {
      return JSON.stringify(this.defaultExample, null, '\t');
    },
  },
  data: function () {
    return {
      clipboardReadyJSON: '',
      defaultExample: PackageJson,
      errorMessage: '',
      sharedState: SharedState.state,
      showError: false,
    };
  },
}
</script>

<style module>
@import 'json-parser.scss';
</style>