<template>
  <div class='content content--no-first-letter'>
    <multimedia-content>
    </multimedia-content>
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
  CharacterReader
} from './modules/parser.js';
import EventHub from '../../../modules/event-hub';

export default {
  name: 'a-translator-for-simple-expressions',
  components: {
    'multimedia-content': MultimediaContent,
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
    parseChanges: function ({text}) {
      try {
        const parser = this.getParser(this.getCharacterReader(text));
        this.postfixTranslation = parser.parse();
      } catch (error) {
        this.postfixTranslation = error.message;
      }
    }
  }
}
</script>

<style module>
  @import './a-simple-syntax-directed-translator.scss';
</style>