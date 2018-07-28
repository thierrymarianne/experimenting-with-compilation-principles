<template>
  <div class='json-parser content content--no-first-letter'>
    <multimedia-content>
      Suggestions and issues can be provided at
      <browsable-link href='http://bit.ly/new-issue-json-editor'>http://bit.ly/new-issue-json-editor</browsable-link>
    </multimedia-content>
    <section class='json-parser__input'>
      <input-area
        ref='input'
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
          >Validate and Copy JSON</span>
          <span 
            v-else='sharedState.invalidJSON'
            class='json-parser__button-label'
          >Invalid JSON</span>
      </button>
    </section>
    <multimedia-content>
      <source-code
        wrap
        color='clickable'
        v-on:click.native='copyToInputArea("codeInjection", $event)'>Injected code
      </source-code>
      <source-code
        wrap
        color='clickable'
        v-on:click.native='copyToInputArea("array", $event)'>Array
      </source-code>
      <source-code 
        wrap
        v-on:click.native='copyToInputArea("pair", $event)'
        color='clickable'
      >Pair
      </source-code>
      <source-code 
        wrap
        color='clickable'
        v-on:click.native='copyToInputArea("symfony", $event)'>Symfony
      </source-code>
      <source-code 
        wrap
        color='clickable'
        v-on:click.native='copyToInputArea("leftpad", $event)'>Leftpad
      </source-code>
      <source-code 
        wrap
        color='clickable'
        v-on:click.native='copyToInputArea("learningCompilers", $event)'>Learning Compilers
      </source-code>
    </multimedia-content>
    <dictionary
      :literal-object="parsedJSON"
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
import SharedState from '../../../../modules/shared-state';
import SourceCode from '../../../source-code.vue';
import Raven from 'raven-js';

import Array from '../../../../json/array.json';
import CodeInjection from '../../../../json/code-injection.json';
import LearningCompilers from '../../../../../package.json';
import Leftpad from '../../../../json/leftpad.json';
import Pair from '../../../../json/pair.json';
import Symfony from '../../../../json/symfony.json';

const jsonExamples = {
  array: Array,
  codeInjection: CodeInjection,
  learningCompilers: LearningCompilers,
  leftpad: Leftpad,
  pair: Pair,
  symfony: Symfony,
};

const PackageJson = jsonExamples.codeInjection;

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
  mounted: function () {
    const exampleName = this.$route.query.json;
    if (typeof exampleName !== 'undefined'
    && typeof jsonExamples[exampleName] !== 'undefined') {
      this.copyToInputArea(exampleName);
    }
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
    copyToInputArea: function (exampleName) {
      const json = this.prettifyJSON(jsonExamples[exampleName]);
      this.$refs.input.text = json;
      EventHub.$emit('source.changed', { text: json });
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
      let clipboardReadyJSON = '';
      if (typeof this.$refs.dictionary === 'undefined') {
        return clipboardReadyJSON;
      }

      if (typeof this.$refs.dictionary.$refs.jsonEditor === 'undefined') {
        return clipboardReadyJSON;
      }

      if (typeof this.$refs.dictionary.$refs.jsonEditor === 'undefined') {
        return clipboardReadyJSON;
      }

      if (!this.$refs.dictionary.$refs.jsonEditor.isReady) {
        return clipboardReadyJSON;
      }

      if (typeof this.$refs.dictionary.$refs.jsonEditor
      .$refs['json-editor'] === 'undefined') {
        return clipboardReadyJSON;
      }

      if (typeof this.$refs.dictionary.$refs.jsonEditor
      .$refs['json-editor']
      .$refs['dynamic-json'] === 'undefined') {
        return clipboardReadyJSON;
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
        this.hideErrorMessageContainer();
      } catch (error) {
        this.sharedState.error(error, 'json-parser');
        this.sharedState.invalidJSON = true;
        this.handleFailedParsing({ errorMessage: error.message });
        prettifiedJSON = '{}';
      }
      
      // Restore node into the DOM to copy inner text
      this.sharedState.noPendingCopy = true;

      if (!this.sharedState.debug.punctuation) {
        dynamicJSONPlaceholder.classList.remove('with-punctuation');
      }

      return prettifiedJSON;
    },
    prettifyJSON(json) {
      return JSON.stringify(json, null, '\t');
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
      return this.prettifyJSON(this.parsedJSON);
    },
  },
  data: function () {
    return {
      clipboardReadyJSON: '',
      parsedJSON: PackageJson,
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