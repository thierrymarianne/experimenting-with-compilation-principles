<template>
    <div class='content'>
      <multimedia-content>The compiler writer, like any software developer,
can profitably use modern development environment containing tools
such as language editors, debuggers, version managers, profilers,
test harnesses, and so on.
<br />
In addition to these software development tools,
other more specialized tools have been created
to help implement various phases of a compiler.
<br />
These tools use specialized languages for specifying and implementing
specific components, and many use quite sophisticated algorithms.
The most successful tools are those that hide the details
of the generation algorithm and produce components
than can be easily integrated into the remainder of the compiler.
<br />
Some commonly used compiler-construction tools include
<ol>
  <li><em>Parser generators</em> that automatically produce syntax analyzers
from a grammatical description of a programming language.</li>
  <li><em>Scanner generators</em> that produce lexical analyzers
from a regular description of the tokens of a language</li>
  <li><em>Syntax-directed translation engines</em> that produce collections
of routines for walking a parse tree and generating intermediate code.</li>
  <li><em>Code generators</em> that produce a code generator
from a collection of rules for translating each operation
of the intermediate language into the machine language for a target machine.</li>
  <li><em>Data-flow analysis engines</em> that facilitates the gathering of
information about how values are transmitted from one part of a program
to each other part. Data-flow analysis is a key part of code optimization.</li>
  <li><em>Compiler-construction toolkits</em> that provide an integrated
set of routines for constructing various phases of a compiler.</li>
</ol>
</multimedia-content>
    </div>
  </template>
  
  <script>
  import MultimediaContent from '../multimedia-content.vue';
  
  export default {
    name: 'compiler-construction-tools',
    components: {
      'multimedia-content': MultimediaContent
    },
  }
  </script>
  