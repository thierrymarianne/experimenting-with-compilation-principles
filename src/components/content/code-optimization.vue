<template>
    <div class='code-optimization'>
      <description>The machine-independent code-optimization phase attempts to
improve the intermediate code so that
better target code will result.
Usually better means faster, 
but other objectives may be desired,
such as shorter code,
or target code that consumes less power.

For example, a straightforward algorithm
generates the intermediate code,
using an instruction for each operator 
in the tree representation
that comes from the semantic analyzer. 

A simple intermediate code generation algorithm
followed by code optimization is a reasonable way
to generate good target code.
The optimizer can deduce that the conversion of 60
from integer to floating point can be done once and
for all at compile time, so the <strong>inttofloat</strong>
operation can be eliminated by replacing the integer 60
by the floating-point number 60.0.

Moreover, <code>t3</code> is used only once to transmit its value to <code>id1</code>.
There is a great variation in the amount of code optimization
different compilers perform. In those that do the most,
the so-called "optimizing compilers",
a significant amount of time is spent on this phase.
There are simple optimizations that significantly improve 
the running time of the target program without slowing down
compilation too much.
</description>
    </div>
  </template>
  
  <script>
  import Description from '../description.vue';
  
  export default {
    name: 'code-optimization',
    components: {
      description: Description
    },
  }
  </script>
  
  <style scoped lang='scss'>
    @import '../../styles/content/code-optimization.scss';
  </style>