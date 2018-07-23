<template>
  <div class='ambiguity'>
    <multimedia-content>We have to be careful in talking about 
the structure of a string according to a grammar.        
A grammar can have more than one parse tree generating
a given string of terminals. Such a grammar is said to be <em>ambiguous</em>.        
To show that a grammar is ambiguous,  
all  we need  to do is find a terminal string that is the
yield of more than one parse tree.
Since a string with more than one parse tree usually has more
than one meaning, we need to design unambiguous grammars
for compiling a applications, or to use ambiguous grammars
with additional rules to resolve the anbiguities.</multimedia-content>
  </div>
</template>

<script>
  import MultimediaContent from '../../multimedia-content.vue';
  import Expr from '../../expr/expr.vue';
  import FormalNotation from '../../formal-notation/formal-notation.vue';

  export default {
    name: 'ambiguity',
    components: {
      MultimediaContent,
      Expr,
      FormalNotation,
    },
  }
</script>