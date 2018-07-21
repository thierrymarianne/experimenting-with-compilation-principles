<template>
    <div class='static-scope-and-block-structure'>
      <multimedia-content>In C, the syntax of blocks is given by
<ol>
  <li>One type of statement is a block.
Blocks can appear anywhere that other types of statements,
such as assignment statements, can appear.
  </li>
  <li>A block is a sequence of declarations followed by a sequence
of statements, all surrounded by braces.
  </li>
</ol>

Note that this syntax allows blocks to be nested inside each other.
This nesting property is referred to as block structure.
The C family of languages has block structure,
except that a function may not be defined inside another function.
<br />
We say that a declaration <em>D</em> "belongs" to a block <em></em>B</em>
if <em>B</em> is
the most closely nested block containing <em>D</em>;
that is, <em>D</em> is located within <em>B</em>,
but not within any block that is nested within <em>B</em>.
<br />
The static-scope rule for variable declarations
in block-structured languages is as follows.
If declaration <em>D</em> of name <em>x</em> belongs to block <em>B</em>,
then the scope of <em>D</em> is all of <em>B</em>,
except for any blocks <em>B'</em> nested to any depth within <em>B</em>,
in which <em>x</em> is redeclared.
Here, <em>x</em> is redeclared in <em>B'</em> if some other declaration <em>D'</em>
of the same name <em>x</em> belongs to <em>B'</em>.
  </multimedia-content>
    </div>
  </template>
  
  <script>
  import MultimediaContent from '../../multimedia-content.vue';
  import Expr from '../../expr/expr.vue';
  
  export default {
    name: 'static-scope-and-block-structure',
    components: {
      MultimediaContent,
      Expr
    },
  }
  </script>
  