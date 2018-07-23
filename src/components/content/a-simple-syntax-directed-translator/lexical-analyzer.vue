<template>
  <div class='content content--no-first-letter'>
    <input-area></input-area>
    <source-code v-html='postfixTranslation'></source-code>
  </div>
</template>

<script>
import MultimediaContent from '../../multimedia-content.vue';
import InputArea from '../../input-area.vue';
import SourceCode from '../../source-code.vue';
import {
  Parser,
  CharacterReader,
  Lexer,
  SimpleTranslatorSyntaxError,
} from './modules/parser.js';
import EventHub from '../../../modules/event-hub';

export default {
  name: 'lexical-analyzer',
  components: {
    MultimediaContent,
    'input-area': InputArea,
    'source-code': SourceCode,
  },
  mounted: function () {
    EventHub.$on('source.changed', this.parseChanges);
  },
  data: function () {
    return {
      postfixTranslation: ''
    };
  },
  methods: {
    getParser: function (reader) {
      return new Parser(reader);
    },
    getCharacterReader: function (program) {
      return new CharacterReader(program, this.$route.name);
    },
    getLexer: function (reader) {
      return new Lexer(reader);
    },
    parseChanges: function ({text}) {
      this.postfixTranslation = '';

      try {
        const lexer = this.getLexer(this.getCharacterReader(text));
        const parser = this.getParser(lexer);
        this.postfixTranslation = parser.parse();
      } catch (error) {
        if (error instanceof SimpleTranslatorSyntaxError) {
          this.postfixTranslation = error.message;

          return;
        }

        throw error;
      }
    }
  }
}
</script>

<style module>
  @import './a-simple-syntax-directed-translator.scss';
</style>