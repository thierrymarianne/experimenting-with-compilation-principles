<template>
  <div class='lexical-analysis__container'>
    <div class='lexical-analysis'>
      <paragraph class='lexical-analysis__paragraph'>The first phase of a compiler is called <em class='lexical-analysis__em'>lexical analysis</em>
or <em class='lexical-analysis__em'>scanning</em>.

The lexical analyzer reads the stream of characters
making up the source program and groups the characters
into meaningful sequences called <em class='lexical-analysis__em'>lexemes</em>.
For each lexeme, the lexical analyzer produces
as output a <em class='lexical-analysis__em'>token</em> of the form 

  <em class='lexical-analysis__em'>&#12296; token-name, attribute-value &#12297;</em>

that it passes on to the subsequent phase,
syntax analysis.

In the token, the first component <em class='lexical-analysis__em'>token-name</em>
is an abstract symbol that is used during syntax analysis,
and the second component <em class='lexical-analysis__em'>attribute-value</em> points to an entry
in the symbol tablefor this token.

Information from the symbol-table entry is needed
for semantic analysis and code generation.</paragraph>
      <button 
        v-if='exampleIsHidden'
        v-on:click='toggleExampleVisibility' 
        class='lexical-analysis__example'>Show example</button>
      <button 
        v-else 
        v-on:click='toggleExampleVisibility' 
        class='lexical-analysis__example'>Hide example</button>
    </div>
  </div>
</template>

<script>
import Paragraph from '../paragraph.vue';
import EventHub from '../../modules/event-hub';

export default {
  name: 'lexical-analysis',
  components: {
    paragraph: Paragraph
  },
  methods: {
    toggleExampleVisibility: function () {
      this.exampleIsHidden = !this.exampleIsHidden;
      EventHub.$emit(
        'toggle_example_button.clicked',
        { shouldShowExample: !this.exampleIsHidden }
      );
    }
  },
  props: {
    hiddenExampleByDefault: {
      type: Boolean,
      default: true
    }
  },
  data: function () {
    return {
      exampleIsHidden: this.hiddenExampleByDefault
    }
  }
}
</script>

<style scoped type='text/scss'>
  @import '../../styles/lexical-analysis.scss';
</style>