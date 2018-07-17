<template>
  <div class='code-sample'>
    <source-code class='code-sample__line'
      :key='index'
      v-for='(line, index) in sourceCodeLines'>{{ line }}</source-code>
  </div>
</template>

<script>
import SourceCode from '../source-code.vue'

export default {
  name: 'code-sample',
  components: {
    'source-code': SourceCode,
  },
  props: {
    lines: {
      type: Array,
      required: true
    }
  },
  data: function () {
    return {
      sourceCodeLines: this.lines
    };
  }
};
</script>

<style scoped type='text/scss'>
  @import '../../styles/structure-of-a-compiler/code-sample.scss';
</style>