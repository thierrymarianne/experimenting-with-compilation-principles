<template>
  <div class='syntax-definition'>
    <multimedia-content>In this section, we introduce a notation - the "context-free grammar," or "grammar" for short - that is used to specify
the syntax of a language. Grammmars will be used throughout this book to organize compiler front ends. A grammar naturally
describes the hierarchical structure of most programming language constructs. For example, an if-else statement in
Java can have the form
<formal-notation>
  <strong>if</strong> ( expression ) statement <strong>else</strong> statement
</formal-notation>
That is, an if-else statement is the concatenation of the keyword <expr>if</expr>,
an opening parenthesis, an expression, a closing
parenthesis, a statement, the keyword <expr>else</expr>, and another statement.
Using the variable <em>expr</em> to denote an expression
and the variable <em>stmt</em> to denote a statement,
this structuring rule can be expressed as 
<formal-notation>
  stmt  -> <strong>if</strong> ( expr ) stmt <strong>else</strong> stmt
</formal-notation>
in which the arrow may be read as "can have the form."
Such a rule is called a <em>production</em>.
In a production, lexical elements like the keyword <strong>if</strong>
and the parentheses are called <em>terminals</em>.
Variables like <em>expr</em> and <em>stmt</em> represent sequences
of terminals and are called <em>nonterminals</em>.</multimedia-content>
  </div>
</template>

<script>
  import MultimediaContent from '../../multimedia-content.vue';
  import Expr from '../../expr/expr.vue';
  import FormalNotation from '../../formal-notation/formal-notation.vue';

  export default {
    name: 'syntax-definition',
    components: {
      MultimediaContent,
      Expr,
      FormalNotation,
    },
  }
</script>