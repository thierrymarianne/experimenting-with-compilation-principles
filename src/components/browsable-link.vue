<template>
  <a class="link" :href="href"><slot></slot></a>
</template>

<script>
export default {
  name: 'browsable-link',
  props: {
    href: {
      type: String,
      required: true,
    }
  }
}
</script>

<style scoped type="text/scss">
  @import '../styles/link.scss'; 
</style>