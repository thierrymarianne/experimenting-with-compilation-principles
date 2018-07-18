<template>
    <div class='the-science-of-building-a-compiler'>
      <multimedia-content>Compiler design is full of beautiful examples where 
complicated real-world prob­ lems are solved by abstracting
the essence of the problem mathematically. 
<br />
These serve as excellent illustrations of how abstractions can be used to solve prob­lems: 
take a problem, formulate a mathematical abstraction that captures the key characteristics,
and solve it using mathematical techniques. The problem formulation must be grounded
in a solid understanding of the characteristics of computer programs,
and the solution must be validated and refined empirically.
<br />
A compiler must accept all source programs that conform to the specification of the language;
the set of source programs is infinite and any program can be very large,
consisting of possibly millions of lines of code.
Any transformation performed by the compiler while translating a source program
must preserve the meaning of the program being compiled.
Compiler writers thus have influence over not just the compilers they create,
but all the programs that  their com­ pilers compile.
This leverage makes writing compilers particularly rewarding;
however, it also makes compiler development challenging.
</multimedia-content>
  </div>
</template>

<script>
import MultimediaContent from '../multimedia-content.vue';

export default {
  name: 'the-science-of-building-a-compiller',
  components: {
    'multimedia-content': MultimediaContent
  },
}
</script>
