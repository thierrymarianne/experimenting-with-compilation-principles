<template>
  <div class='syntax-definition'>
    <multimedia-content>
A <em>context-free grammar</em> has four components: 
<ol>
  <li>A set of <em>terminal</em> symbols, sometimes referred to as "tokens."
The terminals are the elementary symbols of the language
defined by the grammar. </li>
  <li>A set of <em>nonterminals</em>, sometimes called "syntactic variables."
Each nonterminal represents a set of strings of terminals,
in a manner we shall describe. 
  </li>
  <li>A set of <em>productions</em>, where each production consists
of a nonterminal, called the <em>head</em> or <em></em>left side</em>
of the production, an arrow, and a sequence of terminals and/or nonterminals,
called the <em>body</em> or <em>right-side</em> of the production.
The intuitive intent of a production is to specify one of
the written forms of a construct; if the head nonterminal 
represents a construct, then the body represents
a written form of the construct. 
  </li>
  <li>A designation of one of the nonterminals as the <em>start</em> symbol.</li>
</ol>

We specify grammars by listing their productions,
with the productions for the start symbol listed first.
We assume that digits, signs such as <strong><</strong> and <strong><=</strong>, 
and boldface strings such as <strong>while</strong> are terminals.
An italicized name is a nonterminal, and any nonitalicized name
or symbol may be assumed to be a terminal.
For notational convenience, productions with the same nonterminal as
the head can have tl1eir bodies grouped, with the alternative bodies
separated by the symbol <em>|</em>, which we read as  "or."</multimedia-content>
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