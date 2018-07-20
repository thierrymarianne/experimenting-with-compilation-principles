<template>
  <div class='content content--no-first-letter'>
    <multimedia-content>
    </multimedia-content>
    <input-area></input-area>
    <source-code v-html='postfixTranslation'></source-code>
  </div>
</template>

<script>
import MultimediaContent from '../multimedia-content.vue';
import InputArea from '../input-area.vue';
import SourceCode from '../source-code.vue';
import Parser from '../../modules/a-translator-for-simple-expressions/parser.js';
import EventHub from '../../modules/event-hub';

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
    getParser: function (program) {
      return new Parser(program);
    },
    parseChanges: function ({text}) {
      try {
        const parser = this.getParser(text);
        this.postfixTranslation = parser.parse();
      } catch (error) {
        this.postfixTranslation = error.message;
      }
    }
  }
}
</script>

<style module>
  @import '../../styles/content/a-translator-for-simple-expressions.scss';
</style>