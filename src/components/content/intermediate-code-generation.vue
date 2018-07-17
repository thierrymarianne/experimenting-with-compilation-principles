<template>
    <div class='intermediate-code-generation'>
      <description>In the process of translating a source program
into target code, a compiler may construct one or
more intermediate representations,
which have a variety of forms. 
Syntax trees are a form of intermediate representation;
they are commonly used during syntax and
semantic analysis.

After syntax and semantic analysis of the source program,
many compilers generate an explicit low-level or
machine-like intermediate representation, 
which we can think of 
as a program for an abstract machine.
This intermediate representation 
should have two important properties:
 - it should be easy to produce and
 - it should be easy to translate into the target machine.

For instance, one can consider an intermediate form called 
<em>three-address code</em>, which consists of a sequence of 
assembly-like instructions with
three operands per instruction.
Each operand can act like a register. 

There are several points worth nothing about
three-address instructions.
First, each three-adress assignment instructions 
has at most one operator on the right side.
Thus, these instructions fix the order
in which operations are to be done.
Second, the compiler must generate
a temporary name to hold the value
computed by a three-address instruction.
Third, some "three-address instructions"
have fewer than three operands.
</description>
    </div>
  </template>
  
  <script>
  import Description from '../description.vue';
  
  export default {
    name: 'intermediate-code-generation',
    components: {
      description: Description
    },
  }
  </script>
  
  <style scoped type='text/scss'>
    @import '../../styles/intermediate-code-generation.scss';
  </style>