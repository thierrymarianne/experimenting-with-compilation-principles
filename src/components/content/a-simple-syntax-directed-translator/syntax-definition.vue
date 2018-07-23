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
of terminals and are called <em>nonterminals</em>.
<h3>Derivation</h3>
A grammar derives strings by beginning with the start symbol
and repeatedly replacing a nonterminal by the body of a production
for that nonterminal. The terminal strings that can be derived
from the start symbol form the <em>language</em> defined by the grammar.
<br />
<em>Parsing</em> is the problem of taking a string
of terminals and figuring out how to derive it
from the start symbol of the grammar,
and if it cannot be derived frorn the start symbol of the grammar,
then reporting syntax errors within the string.
Parsing is one of the most fundamental problems in all of compiling.
For simplicity, we begin, vith source programs like <expr>9-5+2</expr>
in which each character is a terminal;
in general, a source program has multicharacter lexemes
that are grouped by the lexical analyzer into tokens,
whose first components are the terminals processed by the parser.</multimedia-content>
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