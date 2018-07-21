<template>
  <div class='call-by-reference'>
    <multimedia-content>In call-by-reference, the address of the actual parameter
is passed to the callee as the value of the corresponding formal parameter.
Uses of the formal parameter in the code of the callee are implemented
by following this pointer to the location indicated by the caller.
Changes to the formal parameter thus appear as changes to the actual parameter.
<br />
If the actual parameter is an expression, however,
then the expression is evaluated before the call,
and its value stored in a location of its own.
Changes to the formal parameter change the value in this location,
but can have no effect on the data of the caller.
<br />
Call-by-reference is used for "ref" parameters in C++ and
is an option in many other languages.
It is almost essential when the formal parameter is a large object,
array, or structure. The reason is that strict call-by-value requires that the caller copy
 the entire actual parameter into the space belonging
 to the corresponding formal parameter.
 This copying gets expensive when the parameter is large.
 As we noted when discussing call-by-value,
 languages such as Java solve the problem of passing arrays,
 strings, or other objects by copying only a reference to those objects.
 The effect is that Java behaves as if it used call-by-reference
 for anything other than a basic type such as an integer or real.
</multimedia-content>
  </div>
</template>

<script>
import MultimediaContent from '../../multimedia-content.vue';
import Expr from '../../expr/expr.vue';

export default {
  name: 'call-by-reference',
  components: {
    MultimediaContent,
    Expr
  },
}
</script>
