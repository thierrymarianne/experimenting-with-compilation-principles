<template>
  <div class='precedence-of-operators'>
    <multimedia-content>Consider the expression <expr>9+5*2</expr>.
There are two possible interpretations of this expression: <expr>(9+5)*2</expr>
or <expr>9+(5*2)</expr>. The associativity rules for <expr>+</expr>
and <expr>*</expr> apply to occurrences of the same operator,
so they do not resolve this ambiguity.
Rules defining the relative precedence of operators are needed 
when more than one kind of operator is present.
<br />
We say that <expr>*</expr> has higher
precedence than <expr>+</expr> if <expr>*</expr>
takes its operands before <expr>+</expr> does.
In ordinary arithmetic, multiplication and division
have higher precedence than addition and subtraction.
Therefore, <expr>5</expr> is taken by <expr>*</expr>
in both <expr>9+5*2</expr> and <expr>9*5+2</expr>; i.e.,
the expressions are equivalent to <expr>9+(5*2)</expr> and </expr>(9*5)+2</expr>,
respectively.
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
