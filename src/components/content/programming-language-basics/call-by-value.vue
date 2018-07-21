<template>
  <div class='call-by-value'>
    <multimedia-content>In call-by-value, the actual parameter is evaluated
(if it is an expression) or copied (if it is a variable).
The value is placed in the location belonging to the corresponding formal parameter
of the called procedure.
This method is used in C and Java, and is a common option in C++,
as well as in most other languages.
Call-by-value has the effect that all computation involving the formal parameters
done by the called procedure is local to that procedure,
and the actual parameters themselves cannot be changed.
<br />
Note, however, that in C we can pass a pointer to a variable
to allow that variable to be changed by the callee.
Likewise, array names passed as pararmeters in C, C++, or Java
give the called procedure what is in effect a pointer
or reference to the array itself.
Thus, if <em>a</em> is the name of an array of the calling procedure,
and it is passed by value to corresponding formal parameter <em>x</em>,
then an assignment such as <expr>x[i] = 2</expr> really
changes the array element <em>a[i]</em> to <expr>2</expr>.
The reason is that, although <em>x</em> gets a copy of the value
of <em>a</em>, that value is really a pointer to the beginning
of the area of the store where the array named <em>a</em> is located.
<br />
Similarly, in Java, many variables are really references,
or pointers. to the things they stand for.
This observation applies to arrays, strings, and object of 
all classes.  Even though Java uses call-by-value exclusively, 
wheneve we pass the name of an object to a called procedure,
the value received by that procedure is in effect a pointer
to the object. Thus, the called procedure is able
to affect the value of the object itself.</multimedia-content>
  </div>
</template>

<script>
import MultimediaContent from '../../multimedia-content.vue';
import Expr from '../../expr/expr.vue';

export default {
  name: 'call-by-value',
  components: {
    MultimediaContent,
    Expr
  },
}
</script>
