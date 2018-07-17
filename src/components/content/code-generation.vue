<template>
    <div class='code-generation'>
      <description>The code generator takes as input
an intermediate representation of the source program
and maps it into the target language.

If the target language is machine code,
registers or memory locations are selected for each of
the variables used by the program.

Then, the intermediate instructions are translated
into sequences of machine instructions
that perform the same task.

A crucial aspect of code generation
is the judicious assignment of registers
to hold variables.

The first operand of each instruction specifies a destination.
The F in each instruction tells that it deals with
floating-point numbers. 

The code loads the contents of address <code>id3</code>
into <code>R2</code>, then multiplies it with
floating-point constant 60.0. 
The <strong>#</strong> signifies that 60.0 is to be treated
as an immediate constant.

The third instruction moves <code>id2</code> into register <code>R1</code>
and the fourth adds to it the value 
previously computed in register <code>R2</code>.

Finally, the value in register <code>R1</code> is stored
into the address of <code>id1</code>, so the code correctly 
implements the assignment statement.

The discussion of code generation has ignored
the important issue of storage allocation 
for the identifiers in the source program.

Storage-allocation decisions are made
either during intermediate code generation
or during code generation.
</description>
    </div>
  </template>
  
  <script>
  import Description from '../description.vue';
  
  export default {
    name: 'code-generation',
    components: {
      description: Description
    },
  }
  </script>
  
  <style scoped type='text/scss'>
    @import '../../styles/code-generation.scss';
  </style>