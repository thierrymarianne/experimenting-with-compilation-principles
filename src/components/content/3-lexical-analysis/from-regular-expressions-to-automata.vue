<template>
  <div class='from-regular-expressions-to-automata'>
    <input-area></input-area>
    <source-code v-html='postfixTranslation'></source-code>
  </div>
</template>

<script>
import MultimediaContent from '../../multimedia-content.vue';
import InputArea from '../../input-area.vue';
import SourceCode from '../../source-code.vue';

export default {
  name: 'from-regular-expressions-to-automata',
  components: {
    MultimediaContent,
    'input-area': InputArea,
    'source-code': SourceCode,
  },
}
</script>
