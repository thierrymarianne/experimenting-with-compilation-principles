<template>
  <div class='lexical-analysis__container'>
    <div class='lexical-analysis'>
      <description>The first phase of a compiler is called <em>lexical analysis</em>
or <em>scanning</em>.

The lexical analyzer reads the stream of characters
making up the source program and groups the characters
into meaningful sequences called <em>lexemes</em>.
For each lexeme, the lexical analyzer produces
as output a <em>token</em> of the form 

  <em>&#12296; token-name, attribute-value &#12297;</em>

that it passes on to the subsequent phase,
syntax analysis.

In the token, the first component <em>token-name</em>
is an abstract symbol that is used during syntax analysis,
and the second component <em>attribute-value</em> points to an entry
in the symbol tablefor this token.

Information from the symbol-table entry is needed
for semantic analysis and code generation.</description>
    </div>
  </div>
</template>

<script>
import Description from '../description.vue';

export default {
  name: 'lexical-analysis',
  components: {
    description: Description
  },
}
</script>

<style scoped type='text/scss'>
  @import '../../styles/lexical-analysis.scss';
</style>