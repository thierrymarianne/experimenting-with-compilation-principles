<template>
  <div class='a-model-of-a-compiler-front-end'>
    <multimedia-content>The analysis phase of a compiler breaks up a
source program into constituent pieces and produces
an internal representation for it, called intermediate code.
The synthesis phase translates the intermediate code into the target program.
<br />
Analysis is organized around the "syntax" of the language to be compiled.
The syntax of a programming language describes the proper form of
its  programs, while the semantics of the language defines
what its programs mean; that is, what each program does when it executes. 
For specifying syntax, we present a widely used notation,
called context-free grammars or BNF (for Backus-Naur Fann).
With the notations currently available, the semantics of a language
is much more difficult to describe than the syntax.   
For specifying semantics, we shall therefore use infornal
descriptions and suggestive examples. 
<br />
Besides specifying the syntax of a language,
a context-free grammar can be used to help guide
the translation of programs.  
We introduce a grammar-oriented compiling technique
known as syntax-directed translation.
<br />
We begin with the parser. 
For simplicity, we consider the syntax-directed translation of
infix expressions to postfix form, 
a notation in which operators appear after their operands. 
For example, the postfix form of the expression <expr>9-5+2</expr>
is <expr>95-2+</expr>. Translation into postfix form is rich enough
to illustrate syntax analysis, yet simple enough.
The simple translator handles expressions like <expr>9-5+2</expr>,
consisting of digits separated by plus and minus signs. 
One reason for starting with such simple expressions
is that the syntax analyzer can work directly
with the individual characters for operators and operands.
<br />
A lexical analyzer allows a translator to handle multicharacter
constructs like identifiers, which are written as sequences of characters,
but are treated as units called <em>tokens</em> during syntax analysis;
for example, in the expression <expr>count+ 1</expr>,
the identifier <expr>count</expr> is treated as a unit.
The lexical analyzer allows numbers, identifiers, and "white space"
(blanks, tabs, and newlines) to appear ,vithin expressions.
Next, we consider intermediate-code generation. 
There are two forms of intermediate codes, we'll be dealing with.
One form, called <em>abstract syntax trees</em> or simply 
<em>syntax trees</em>, represents the hierarchical syntactic
structure of the source program. The parser produces a syntax tree,
that is further translated into three-address code.
Some compilers combine parsing and intermediate-code generation
into one component.
    </multimedia-content>
  </div>
</template>

<script>
import MultimediaContent from '../../multimedia-content.vue';
import Expr from '../../expr/expr.vue';

export default {
  name: 'a-model-of-a-compiler-front-end',
  components: {
    MultimediaContent,
    Expr,
  },
}
</script>
