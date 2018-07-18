<template>
  <div class='multimedia-content'>
    <paragraph class='multimedia-content__paragraph'>
      <slot></slot>
    </paragraph>
  </div>
</template>

<script>
import Paragraph from './paragraph.vue';

export default {
  name: 'multimedia-content',
  components: {
    paragraph: Paragraph
  },
}
</script>
  
<style module>
  @import '../styles/content/multimedia-content-module.scss';
</style>