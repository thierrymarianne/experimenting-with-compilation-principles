<template>
    <div class='the-move-to-higher-level-languages'>
      <multimedia-content>Since the design of programming languages
and compilers are intimately related,
the advances in programming languages placed new demands on compiler writers.
They had to devise algorithms and representations
to translate and support the new language features.
Since the 1940's, computer architecture has evolved as well.
Not only did the compiler writers have to track new language features,
they also had to devise translation algorithms
that would take maximal advantage of the new hardware capabilities.
<br />
Compilers can help promote the use of high-level languages by minimizing
the execution overhead of the programs written in these languages.
Compilers are also critical in making high-performance computer architectures
effective on users' applications. In fact, the performance of a computer system
is so dependent on compiler technology that compilers are used as a tool
in evaluating architectural concepts before a computer is built.
<br />
Compiler writing is challenging. A compiler by itself is a large program.
Moreover, many modern language-processing systems handle several source languages and
target machines within the same framework; that is, they serve as collections of compilers,
possibly consisting of millions of lines of code.
Consequently, good software-engineering techniques are essential
for creating and evolving modern language processors.
<br />
A compiler must translate correctly the potentially infinite set
of programs that could be written in the source language.
The problem of generating the optimal target code from a source program is undecidable in general;
thus, compiler writers must evaluate tradeoffs about what problems to tackle
and what heuristics to use to approach the problem of generating efficient code.
<br />
A study of compilers is also a study of how theory meets practice.
<br />
The  purpose of this text is to teach the methodology
and fundamental ideas used in compiler design.
It is not the intention of this text to teach all the algorithms
and techniques that could be used for building a state-of-the-art language-processing system.
However, readers of this text will acquire the basic knowledge
and understanding to learn how to build a compiler relatively easily.</multimedia-content>
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
