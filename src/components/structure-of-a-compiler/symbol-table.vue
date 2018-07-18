<template>
  <div class='symbol-table'>
    <slot></slot>
    <div v-for='(symbol, index) in symbols' class='symbol-table__row'>
      <div class='symbol-table__index'>
        <template v-if='index < symbols.length - 1'>
          {{ index + 1 }}
        </template>
      </div>
      <div class='symbol-table__name'>
        {{ symbol }}
      </div>
      <div class='symbol-table__ellipsis'>
        <template v-if='index < symbols.length - 1'>
          ...
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'symbol-table',
  props: {
    symbols: Array,
    required: true,
  }
}
</script>

<style scoped lang='scss'>
  @import '../../styles/structure-of-a-compiler/symbol-table.scss';
</style>