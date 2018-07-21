<template>
  <div class='precedence-of-operators'>
    <multimedia-content>Consider the expression <expr>9+5 * 2</expr>.
There are two possible interpretations of this expression: <expr>(9+5)*2</expr>
or <expr>9+(5*2)</expr>. The associativity rules for <expr>+</expr>
and <expr>*</expr> apply to occurrences of the same operator,
so they do not resolve this ambiguity.
Rules defining the relative precedence of operators are needed 
when more than one kind of operator is present.
<br />
We say that * has higher
precedence than + if * takes its operands before +
does. In ordinary arithmetic, multiplication and division have higher precede11ce than addition and subtraction. Therefore, 5 is taken by * in botl1 9+5*2 and 9*5+2; i.e., the expressions are equivalent to 9+ (5*2) and (9*5) +2, respectively.
  </multimedia-content>
</div>
</template>

<script>
import MultimediaContent from '../../multimedia-content.vue';
import FormalNotation from '../../formal-notation/formal-notation.vue';
import Expr from '../../expr/expr.vue';

export default {
  name: 'precedence-of-operators',
  components: {
    MultimediaContent,
    FormalNotation,
    Expr,
  },
}
</script>
