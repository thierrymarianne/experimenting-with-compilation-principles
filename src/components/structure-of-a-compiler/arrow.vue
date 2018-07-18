<template>
  <div class='arrow'>
    <div class='arrow__edge arrow__edge--top'></div>
    <div class='arrow__text'>
      <slot></slot>
    </div>
    <div class='arrow__edge arrow__edge--bottom'></div>
    <div class='arrow__tip'></div>
  </div>
</template>

<script>
export default {
  name: 'arrow'
}
</script>

<style scoped lang='scss'>
  @import '../../styles/structure-of-a-compiler/arrow.scss';
</style>