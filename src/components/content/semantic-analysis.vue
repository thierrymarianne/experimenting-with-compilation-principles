<template>
  <div class='semantic-analysis'>
    <description>The <em>semantic analyzer</em> uses the syntax tree and
the information in the symbol table to check
the source program for semantic consistency
with the language definition.

It also gathers type information and saves it
in either the syntax tree or the symbol table,
for subsequent use during intermediate-code generation.

An important part of semantic analysis is <em>type checking</em>,
where the compiler checks that each operator
has matching operands.
For example, many programming language definition
requires an array index to be an integer;
the compiler must report an error
if a floating-point number is used to index an array.

The language specification may permit
some type conversions called <em>coercions</em>.
For example, a binary arithmetic operator
may be applied to either a pair of integers
or to a pair of floating-point numbers.
If the operator is applied to a floating-point number
and an integer, the compiler may convert or coerce
the integer into a floating-point number.

Notice that the output of the semantic analyzer
has an extra node for the operator <strong>inttoflloat</strong>,
which explicitly converts its integer argument into
a floating-point number</description>
  </div>
</template>

<script>
import Description from '../description.vue';

export default {
  name: 'semantic-analysis',
  components: {
    description: Description
  },
}
</script>

<style scoped type='text/scss'>
  @import '../../styles/semantic-analysis.scss';
</style>