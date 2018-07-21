<template>
    <div class='declarations-and-definitions'>
      <multimedia-content>The apparently similar terms "declaration" and
"definition" for programming-language concepts are actually quite different.
Declarations tell us about the types of things,
while definitions tell us about their values.
Thus, <expr>int i</expr> is a declaration of <em>i</em>,
while <expr>i = 1</expr> is a definition of <em>i</em>.
<br />
The difference is more significant when we deal with methods
or other procedures.
In C++, a method is declared in a class definition,
by giving the types of the arguments and result of the method
(often called the <em>signature</em> for the method).
The method is then defined, i.e., the code for executing the method is given,
in another place. Similarly, it is common to define a C function
in one file and declare it in other files where the function is used.
  </multimedia-content>
    </div>
  </template>
  
  <script>
  import MultimediaContent from '../../multimedia-content.vue';
  import Expr from '../../expr/expr.vue';
  
  export default {
    name: 'declarations-and-definitions',
    components: {
      MultimediaContent,
      Expr
    },
  }
  </script>
  