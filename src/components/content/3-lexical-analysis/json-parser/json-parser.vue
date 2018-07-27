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
          :class='classes'
          icon='copy' />
          <span 
            v-if='!sharedState.invalidJSON'
            class='json-parser__button-label'
          >Copy JSON</span>
          <span 
            v-else='sharedState.invalidJSON'
            class='json-parser__button-label'
          >Invalid JSON</span>
      </button>
    </section>
    <multimedia-content>
      Suggestions and issues can be provided at
      <browsable-link href='http://bit.ly/new-issue-json-editor'>http://bit.ly/new-issue-json-editor</browsable-link>
    </multimedia-content>
    <dictionary
      :literal-object="defaultExample"
      activeParser
      ref='dictionary'>
    </dictionary>
    <source-code 
      v-show='showError'
    >{{ errorMessage }}</source-code>
  </div>
</template>

<script>
import Vue from 'vue';

import BrowsableLink from '../../../browsable-link.vue';
import EventHub from '../../../../modules/event-hub';
import InputArea from '../../../input-area.vue';
import Dictionary from '../../../dictionary.vue';
import MultimediaContent from '../../../multimedia-content.vue';
import LearningCompilers from '../../../../../package.json';
import Pair from '../../../../json/pair.json';
import Leftpad from '../../../../json/leftpad.json';
import Symfony from '../../../../json/symfony.json';
import SharedState from '../../../../modules/shared-state';
import SourceCode from '../../../source-code.vue';
import Raven from 'raven-js';

const jsonExamples = {
  learningCompilers: LearningCompilers,
  pair: Pair,
  symfony: Symfony,
  leftpad: Leftpad,
};

const PackageJson = jsonExamples.leftpad;

export default {
  name: 'lexical-analyzer',
  components: {
    Dictionary,
    InputArea,
    MultimediaContent,
    BrowsableLink,
    SourceCode,
  },
  mounted: function () {
    EventHub.$on('parsing.antlr.failed', this.handleFailedParsing);
    EventHub.$on('parsing.antlr.succeeded', this.hideErrorMessageContainer);
    EventHub.$on('parsing.edition.failed', this.handleFailedParsing);
    EventHub.$on('parsing.edition.succeeded', this.hideErrorMessageContainer);
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
      if (this.sharedState.invalidJSON) {
        this.$notify({
          group: 'actions',
          type: 'error',
          title: 'Something went horribly wrong...',
          text: `This edited version of your JSON could not be parsed. It might not be valid`,
          position: 'top left',
          duration: 10000,
        });

        return;
      }

      this.$notify({
        group: 'actions',
        title: 'What could possibly go wrong?',
        text: `This edited version of your JSON should have been copied to your clipboard
        If not please kindly open an issue at http://bit.ly/new-issue-json-editor`,
        position: 'top left',
        duration: 10000,
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
        this.sharedState.invalidJSON = false;
        EventHub.$emit('parsing.edition.succeeded');
      } catch (error) {
        this.sharedState.error(error, 'json-parser');
        this.sharedState.invalidJSON = true;
        EventHub.$emit('parsing.edition.failed', { errorMessage: error.message });
        prettifiedJSON = '{}';
      }
      
      // Restore node into the DOM to copy inner text
      this.sharedState.noPendingCopy = true;

      if (!this.sharedState.debug.punctuation) {
        dynamicJSONPlaceholder.classList.remove('with-punctuation');
      }

      return prettifiedJSON;
    }
  },
  computed: {
    classes: function () {
      const classes = { 
        'json-parser__icon-copy': true,
        'json-parser__icon-copy': false, 
      };
      if (this.sharedState.invalidJSON) {
        classes['json-parser__icon-copy--disabled'] = true;
      }

      return classes;
    },
    prettyPrintedExample: function () {
      return JSON.stringify(this.defaultExample, null, '\t');
    },
  },
  data: function () {
    return {
      clipboardReadyJSON: '',
      defaultExample: PackageJson,
      errorMessage: SharedState.state.errorMessage,
      sharedState: SharedState.state,
      showError: false,
    };
  },
}
</script>

<style module>
@import 'json-parser.scss';
</style>