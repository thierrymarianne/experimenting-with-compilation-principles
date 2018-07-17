<template>
  <div class='syntax-analyzer'>
    <description>The second phase of the compiler is <em>syntax analysis</em>
or <em>parsing</em>.

The parser uses the first components of the token produced
by the lexical analyzer to create a tree-like intermediate
representation that depicts the grammatical structure
of the token stream.

A typical representation is a <em>syntax-tree</em> in which each
interior node represents an operation and
the children of the node represent
the arguments of the operation.
    </description>
  </div>
</template>

<script>
import Description from '../description.vue';
import EventHub from '../../modules/event-hub';

export default {
  name: 'syntax-analyzer',
  components: {
    description: Description
  },
}
</script>

<style scoped type='text/scss'>
  @import '../../styles/syntax-analyzer.scss';
</style>