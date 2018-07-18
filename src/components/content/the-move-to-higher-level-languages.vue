<template>
    <div class='the-move-to-higher-level-languages'>
      <multimedia-content>The first step towards more people-friendly programming
languages was the devlopment of mnemonic assembly languages in the early 1950's. Initially, the instructions in an assembly language were just mnemonic representations of machine instructions.
<br />
Later, macro instructions were added to assembly languages so that a programmer could define parameterized shorthands for frequently used sequences of machine instructions.
<br />
A major step towards higher-level languages was made in the latter half of the 1950's with the development of Fortran for scientific computation, Cobol for business data processing, and Lisp for symbolic computation. The philosophy behind these languages was to create higher-level notations with which programmers could more easily write numerical computations, business applications, and symbolic programs. These languages were so successful that they are still in use today.
<br />
In the following decades, many more languages were created with innovative features to help make programming easier, more natural, and more robust. Later in this chapter, we shall discuss some key features that are common to many modern programming languages.
<br />
Today, there are thousands of programming languages. They can be classified in a variety of ways. 
One classification is by generation. <em>First-generation</em> languages are the machine languages, <em>second-generation</em> the assembly languages, and <em>third-generation</em> the higher-level languages like Fortran, Cobol, Lisp,  C, C++,  C#, and  Java. <em>Fourth-generation</em> languages are languages designed for specific applications like NOMAD for report generation, SQL for database queries, and Postscript for text formatting. The term <em>fifth-generation</em> language has been applied to logic- and constraint-based languages like Prolog and OPS5.
<br />
Another classification of languages uses the term <em>imperative</em> for languages in which a program specifies <em>how</em> a computation is to be done and <em>declarative</em> for languages in which a program specifies <em>what</em> computation is to be done. Languages such as C, C++, C#, and Java are imperative languages. In imperative languages there is a notion of program state and statements that change the state. Functional languages such as ML and Haskell and constraint logic languages such as Prolog are often considered to be declarative languages .
<br />
The term <em>von Neumann language</em> is applied to programming languages whose cornputational model is based on the von Neumann computer architecture. Many of today's languages, such as Fortran and C are von Neumann languages.
<br />
An object-oriented language is one that supports object-oriented programming, a programming style in which a program consists of a collection of objects that interact with one another. Simula 67 and Smalltalk are the earliest major object-oriented languages. Languages such as C++, C#, Java, and Ruby are more recent object-oriented languages.
<br />
<em>Scripting languages</em> are interpreted languages with high-level operators designed for "gluing together" computations. These computations were originally
called "scripts". Awk, JavaScript, Perl, PHP, Python, Ruby, and Tcl
are popular examples of scripting languages. Programs written in scripting languages
are often much shorter than equivalent programs written in languages like C. 
</multimedia-content>
  </div>
</template>

<script>
import MultimediaContent from '../multimedia-content.vue';

export default {
  name: 'the-move-to-higher-level-languages',
  components: {
    'multimedia-content': MultimediaContent
  },
}
</script>
