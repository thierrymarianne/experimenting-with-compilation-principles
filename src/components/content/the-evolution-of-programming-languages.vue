<template>
    <div class='the-evolution-of-programming-languages'>
      <multimedia-content>The first electronic computers appeared in the 1940's
and were programmed in machine language by sequences of O's and 1 's
that explicitly told the computer what operations to execute and in what order.
The operations themselves were very low level:
move data from one location to another, add the contents of two registers,
compare two values, and so on. 
<br />
Needless to say, this kind of programming was slow, tedious,
and error prone.
<br />And once written, the programs were hard to understand and modify.
</multimedia-content>
  </div>
</template>

<script>
import MultimediaContent from '../multimedia-content.vue';

export default {
  name: 'the-evolution-of-programming-languages',
  components: {
    'multimedia-content': MultimediaContent
  },
}
</script>
