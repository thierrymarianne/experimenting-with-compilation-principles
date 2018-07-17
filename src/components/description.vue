<template>
  <div class='description__container'>
    <div class='description'>
      <paragraph class='description__paragraph'>
        <slot></slot>
      </paragraph>
    </div>
  </div>
</template>

<script>
import Paragraph from './paragraph.vue';

export default {
  name: 'description',
  components: {
    paragraph: Paragraph
  }
};
</script>

<style scoped type='text/scss'>
  @import '../styles/description.scss';
</style>