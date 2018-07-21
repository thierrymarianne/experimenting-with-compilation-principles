<template>
  <div class='aliasing'>
    <multimedia-content>
There is an interesting consequence of call-by-reference parameter
passing or its simulation, as in Java, where references to      
objects are passed by value. It is possible that two     
formal parameters can refer to the same location; such variables are      
said to be aliases of one another. 
As a  result, any two varriab les,
which may appear to take their values from two distinct
formal parameters, can become aliases of each other, as well.
It turns out that understanding aliasing and the mechanisms
that create it is essential if a compiler is to optimize a program.
There are many situations where we can only optimize code if,
we can be sure certain variables are not aliased.
For instance, we might determine that <expr>x = 2</expr>
is the only place tl1at variable <em>x</em> is ever assigned.
If so, then we can replace a use of <em>x</em> by a use of <exp>2</exp>;
for example, replace <expr>a = x+3</expr> by the simpler
<expr>a = 5</expr>. But suppose there were another variable <em>y</em>
that was aliased to <em>x</em>. 
Then an assignment <expr>y = 4</expr> might have the unexpected
effect of changing <em>x</em>.
It might also mean that replacing <expr>a = x+3</expr> by
<expr>a = 5</expr> was a mistake;
the proper value of <em>a</em> could be <expr>7</expr> there.
</multimedia-content>
  </div>
</template>

<script>
import MultimediaContent from '../../multimedia-content.vue';
import Expr from '../../expr/expr.vue';

export default {
  name: 'aliasing',
  components: {
    MultimediaContent,
    Expr
  },
}
</script>
