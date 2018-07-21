<template>
  <div class='environments-and-states'>
    <multimedia-content>The association of names with locations in    
memory (the store) and then with values can be described
by two mappings that change as the program runs
<ol>
  <li>The <em>environment</em> is a mapping from names to locations in the store. 
Since variables refer to locations ("I-values" in the terminology of C),
we could alternatively define an environment as a mapping from names
to variables.</li>
  <li>The <em>state</em> is a mapping from locations in store to their values.
That is, the static I-values to their corresponding r-values ,
in the terminology of C.
  </li>
</ol>
    </multimedia-content>
  </div>
</template>

<script>
import MultimediaContent from '../../multimedia-content.vue';
import Expr from '../../expr/expr.vue';

export default {
  name: 'environments-and-states',
  components: {
    MultimediaContent,
    Expr
  },
}
</script>
