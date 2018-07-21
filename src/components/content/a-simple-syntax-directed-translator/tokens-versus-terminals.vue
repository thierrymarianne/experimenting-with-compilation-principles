<template>
  <div class='tokens-versus-terminals'>
    <multimedia-content>In a compiler, the lexical analyzer reads the characters of
the source program, groups them into lexically meaningful
units called lexemes, and produces as output tokens
representing these lexemes. A token consists of two components,
a token name and an attribute value.
The token names are abstract symbols that are used by
the parser for syntax analysis.
Often, we shall call these token names terminals,
since they appear as terminal symbols in the grammar for a programming
language. The attribute value, if present,
is a pointer to the symbol table that contains additional infomnation
about the token. This additional information is
not part of the grammar, so in our discussion of syntax analysis,
often we refer to tokens and terminals synonynously.</multimedia-content>
  </div>
</template>

<script>
  import MultimediaContent from '../../multimedia-content.vue';
  import Expr from '../../expr/expr.vue';
  import FormalNotation from '../../formal-notation/formal-notation.vue';

  export default {
    name: 'tokens-versus-terminals',
    components: {
      MultimediaContent,
      Expr,
      FormalNotation,
    },
  }
</script>
