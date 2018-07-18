<template>
    <div class='grouping-of-phases-into-passes'>
      <description>The discussion of phases deals with the logical organization
of a compiler. In an implementation, activities from several phases
may be grouped together into a <em>pass</em> that reads an input file
and writes an output file.

For example, the front-end phases of lexical analysis,
syntax analysis, semantic analysis, and intermediate code generation
might be grouped together into one pass.
Code optimization might be optional.

Then there could be a back-end pass consisting of code generation
for a particular target machine.

Some compiler collections have been created around carefully designed
intermediate representations that allow the front end for a particular
language to interface with the back end for a certain target machine.
With these collections, we can produce compilers
for different source languages for one target machine.

Similarly, we can produce compilers for different target machines,
by combining a front end with back ends for different target machines.
</description>
    </div>
  </template>
  
  <script>
  import Description from '../description.vue';
  
  export default {
    name: 'grouping-of-phases-into-passes',
    components: {
      description: Description
    },
  }
  </script>
  
  <style scoped lang='scss'>
    @import '../../styles/content/grouping-of-phases-into-passes.scss';
  </style>