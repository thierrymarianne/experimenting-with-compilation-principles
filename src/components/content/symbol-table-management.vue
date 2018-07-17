<template>
    <div class='symbol-table-management'>
      <description>An essential function of a compiler is to record the variable
names used in the source program and collect information
about various attributes of each name.

These attributes may provide information about the storage
allocated for a name, its type, its scope
(where in the program its value may be used), 
and in the case of procedure names,
such things as the number and types of its arguments,
the method of passing each argument
(for example, by value of by reference),
and the type returned.

The symbol table is a data structure containing
a record for each variable name,
with fields for the attributes of the name.

The data structure should be designed to allow the compiler
to find the record for each name quickly and to store
or retrieve data from that record quickly.
</description>
    </div>
  </template>
  
  <script>
  import Description from '../description.vue';
  
  export default {
    name: 'symbol-table-management',
    components: {
      description: Description
    },
  }
  </script>
  
  <style scoped type='text/scss'>
    @import '../../styles/symbol-table-management.scss';
  </style>