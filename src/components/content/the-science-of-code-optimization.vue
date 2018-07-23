<template>
    <div class='the-science-of-building-a-compiler'>
      <multimedia-content>The term "optimization" in compiler design refers to the attempts
that a compiler makes to produce code that is more efficient than the obvious code.
"Optimization" is thus a misnommer, since there is no way that the code
produced by a compiler can be guaranteed to be as fast or faster than
any other code that performs the same task.
<br />
In modern times, the optimization of code that a compiler performs has
become both more important and more complex. It is more complex because
processor architecture have become more complex, yielding more opportunies
to improve the way code executes. It is more important because massively
parallel computers require substantial optimization, or their performance
suffers by orders of magnitude. With the likely prevalence of multicore machines
(computers with chips that have large numbers of processors on them),
all compilers will have to face the problem of
taking advantage of multiprocessor machines. 
<br />
It is hard, if not impossible, to build a robust compiler out of "hacks".
Thus, an extensive and useful theory has been built up
around the problem of optimizing code.
The use of a rigorous mathematical foundation allows us to show
that an optimization is correct and that it produces the desirable effect
for all possible inputs. 
<br />
On the other hand, pure theory alone is insufficient.
Like many real-world problems, there are no perfect answers.
In fact, most of the questions that we ask in compiler optimization
are undecidable. One of the most important skills in compiler design
is the ability to formulate the right problem to solve.
<br />
We need a good understanding of the behavior of programs to start
with and thorough experimentation and evaluation to validate our intuitions.
<br />
Compiler optimizations must meet the following design objectives:
<ul>
  <li>The optimization must be correct, that is,
preserve the meaning of the compiled program,</li>
  <li>The optimization must improve the performance of many programs</li>
  <li>The compilation time must be kept reasonable, and</li>
  <li>The engineering effort required must be manageable.</li>
</ul>
It is impossible to overemphasize the importance of correctness.
It is trivial to write a compiler that generates fast code
if the generated code need not be correct!
Optimizing compilers are so difficult to get right that we dare say
that no optimizing compiler is completely error-free! 
Thus, the most important objective in writing a compiler is that it is correct. 
<br />
The second goal is that the compiler must be effective in improving
the performance of many input programs.
Normally, performance means speed of the program execution.
Especially in embedded applications, we may also wish to minimize
the size of the generated code.
<br />
And in the case of mobile devices, it is also desirable that
the code minimizes power consumption. Typically, the same optimizations
that speed up execution time also conserve power.
<br />
Besides performance, usability aspects such as error reporting
and debugging are also important.
<br />
Third, we meed to keep the compilation time short to support a rapid
development and debugging cycle. This requirement has become easier to meet
as machines get faster. Often, a program is first developed and debugged
without program optimizations. Not only is the compilation time reduced,
but more importantly, unoptimized programs are easier to debug,
because the optimizations introduced by a compiler often obscure
the relationship between the source code and the object code. 
Turning on optimizations in the compiler sometimes exposes new problems
in the source program; thus testing may again be performed
on the optimized code.
<br />
The need for additional testing sometimes deters the use of optimizations
in applications, especially if their performance is not critical.
<br />
Finally, a compiler is a complex system; we must keep the system
simple to assure that the engineeing and maintenance costs
of the compiler are manageable. There is an infinite number of program
optimizations that we could implement, and it takes a nontrivial
amount of effort to create a correct and effective optimization.
We must prioritize the optimizations,
implementing only those that lead to the greatest benefits on source
programs encountered in practice.
<br />
Thus, in studying compilers, we learn not only how to build a compiler,
but also the general methodology of solving complex and open-ended problems.
The approach used in compiler development involves both theory and
experimentation. We normally start by formulating the problem
based on our intuitions on what the important issues are.
</multimedia-content>
  </div>
</template>

<script>
import MultimediaContent from '../multimedia-content.vue';

export default {
  name: 'the-science-of-code-optimization',
  components: {
    'multimedia-content': MultimediaContent
  },
}
</script>
