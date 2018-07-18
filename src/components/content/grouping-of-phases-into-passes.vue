<template>
    <div class='grouping-of-phases-into-passes'>
      <multimedia-content>The discussion of phases deals with the logical organization
of a compiler. In an implementation, activities from several phases
may be grouped together into a <em>pass</em> that reads an input file
and writes an output file.
<br />
For example, the front-end phases of lexical analysis,
syntax analysis, semantic analysis, and intermediate code generation
might be grouped together into one pass.
Code optimization might be optional.
<br />
Then there could be a back-end pass consisting of code generation
for a particular target machine.
<br />
Some compiler collections have been created around carefully designed
intermediate representations that allow the front end for a particular
language to interface with the back end for a certain target machine.
With these collections, we can produce compilers
for different source languages for one target machine.
<br />
Similarly, we can produce compilers for different target machines,
by combining a front end with back ends for different target machines.
</multimedia-content>
    </div>
  </template>
  
  <script>
  import MultimediaContent from '../multimedia-content.vue';
  
  export default {
    name: 'grouping-of-phases-into-passes',
    components: {
      'multimedia-content': MultimediaContent
    },
  }
  </script>
  