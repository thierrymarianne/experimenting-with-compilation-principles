<template>
  <div class='postfix-notation'>
    <multimedia-content></multimedia-content>
  </div>
</template>

<script>
  import MultimediaContent from '../../multimedia-content.vue';
  import Expr from '../../expr/expr.vue';
  import FormalNotation from '../../formal-notation/formal-notation.vue';

  export default {
    name: 'postfix-notation',
    components: {
      MultimediaContent,
      Expr,
      FormalNotation,
    },
  }
</script>