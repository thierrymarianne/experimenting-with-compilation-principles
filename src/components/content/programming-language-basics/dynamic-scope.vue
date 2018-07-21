<template>
  <div class='dynamic-scope'>
    <multimedia-content>Technically, any scoping policy is dynamic
if it is based on factor(s) that can be known only
when the program executes.
The term <em>dynamic scope</em>, however,
usually refers to the following policy: a use of a name <em>x</em>
refers to the declaration of <em>x</em> in the most recenlty called,
not-yet-terminated, procedure with such a declaration.
Dynamic scoping of this type appears only in special situations.
We shall consider two examples of dynamic policies:
macro expansion in the C preprocessor and method resolution
in object-oriented programming.
    </multimedia-content>
  </div>
</template>

<script>
import MultimediaContent from '../../multimedia-content.vue';
import Expr from '../../expr/expr.vue';

export default {
  name: 'dynamic-scope',
  components: {
    MultimediaContent,
    Expr
  },
}
</script>
