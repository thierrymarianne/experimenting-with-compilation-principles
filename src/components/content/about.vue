<template>
  <div class='about__container'>
    <div class='about__left-column'>
      <paragraph align='right'>When playing with <browsable-link href='https://vuejs.org'>vue.js</browsable-link>,
I've stumbled upon several limitations of
my own understanding  with regards to
how a source code can be parsed
before interpretation.

My original intent was to get
a better sense of data structures
(as plain and simple as a JavaScript object).
        
I had the following requirements in mind:
 - Drawing visual representations
 - Such representation should be reactive

I came up with the following prototype, 
which would work with very simple examples, like

<source-code 
  wrap
  color='clickable' 
  v-on:click.native='copyToInputArea($event)'>{{ getDefaultJsonExample }}</source-code><br />
<source-code
  color='clickable'
  v-on:click.native='copyToInputArea($event)'>{ margin-left: 10px }</source-code>
<source-code 
  color='clickable'
  v-on:click.native='copyToInputArea($event)'>{ color: blue }</source-code>

Provided the replacement of substrings
using regular expressions
to fix half-compliant JSON
would not help much to deal with 
the task at hand, I've decided to dive into 
<em>Compilers - Principles, Techniques, & Tools</em></paragraph>
    </div>

    <div class='about__right-column'>
      <div class="about__content">
        <div class="about__example">
          <input-area></input-area>
          <dictionary 
            :literal-object="defaultExample"
            ref="dictionary">
          </dictionary>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Paragraph from '../paragraph.vue'
import BrowsableLink from '../browsable-link.vue'
import InputArea from '../input-area.vue'
import Dictionary from '../dictionary.vue'  
import SourceCode from '../source-code.vue'
import EventHub  from '../../modules/event-hub'

export default {
  name: 'about',
  components: {
    paragraph: Paragraph,
    'browsable-link': BrowsableLink,
    'source-code': SourceCode,
    InputArea,
    Dictionary,
  },
  computed: {
    getDefaultJsonExample: function () {
      return JSON.stringify(this.example)
        .replace(/,(?!\s)/g, ', ');
    }
  },  
  methods: { 
    copyToInputArea: function (event) {
      EventHub.$emit(
        'source.copied',
        {code: event.target.innerText}
      )
    }
  }, 
  props: {
    defaultExample: {
      type: Object,
      default: function () {
        return {
          display: 'flex',
          'font-family': 'monospace', 
          'font-size': '1rem'
        };
      }
    }
  },
  data: function () {
    return {
      example: this.defaultExample
    };
  }
}
</script>

<style scoped type='text/scss'>
  @import '../../styles/about.scss' 
</style>