<template>
  <div class='about__container'>
    <paragraph>When playing around with <browsable-link href='https://vuejs.org'>vue.js</browsable-link>,
  I've stumbled upon several limitations of my own understanding 
  with regards to how a source code can be parsed before interpretation.</paragraph>

    <div class="about__content">
      <div class="about__example">
        <input-area></input-area>
        <dictionary 
          :literal-object="{color: 'blue', material: 'plastic', height: 10}"
          ref="dictionary">
        </dictionary>
      </div>
    </div>
  </div>
</template>

<script>
import Paragraph from '../paragraph.vue'
import BrowsableLink from '../browsable-link.vue'
import InputArea from '../input-area.vue'   
import Dictionary from '../dictionary.vue'   

export default {
  name: 'about',
  components: {
    paragraph: Paragraph,
    'browsable-link': BrowsableLink,
    InputArea,
    Dictionary,
  }
}
</script>

<style scoped type='text/scss'>
  @import '../../styles/about.scss' 
</style>