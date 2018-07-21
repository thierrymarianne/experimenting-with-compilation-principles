<template>
  <div class='analogy-between-static-and-dynamic-scoping'>
    <multimedia-content>While there could be any number of static or
dynamic policies for scoping,
there is an interesting relationship between the normal (block-structured)
static scoping rule and the normal dynamic policy.
In a sense, the dynamic rule is to time as the static rule is to space.
While the static rule asks us to find the declaration whose unit (block)
most closely surrounds the physical location of the use,
the dynamic rule asks us to find the declaration whose unit (procedure invocation)
most closely surrounds the time of the use.
</multimedia-content>
  </div>
</template>

<script>
import MultimediaContent from '../../multimedia-content.vue';
import Expr from '../../expr/expr.vue';

export default {
  name: 'anology-between-static-and-dynamic-scoping',
  components: {
    MultimediaContent,
    Expr
  },
}
</script>
