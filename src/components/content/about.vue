<template>
  <div class='about__container'>
    <section class='about__left-column'>
      <paragraph align='right'>When playing with <browsable-link href='https://vuejs.org'>vue.js</browsable-link>,
I've stumbled upon several limitations of
my own understanding with regards to
how a source code can be parsed
before interpretation.

My original intent was to get a better grasp
of data structures (as plain and
simple as a JavaScript object).
        
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
<browsable-link href='https://bit.ly/compilers-principles'>Compilers - Principles, Techniques, & Tools</browsable-link>
in order to exercice myself
in learning the basics of compilation</paragraph>
    </section>

    <section class='about__right-column'>
      <div class="about__content">
        <div class="about__example">
          <input-area></input-area>
          <dictionary 
            :literal-object="defaultExample"
            ref="dictionary">
          </dictionary>
          <source-code 
            v-html='errorMessage'
            v-show='showError'
          ></source-code>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Paragraph from '../paragraph.vue'
import BrowsableLink from '../browsable-link.vue'
import InputArea from '../input-area.vue'
import Dictionary from '../dictionary.vue'  
import SourceCode from '../source-code.vue'
import EventHub from '../../modules/event-hub'

export default {
  name: 'about',
  components: {
    BrowsableLink,
    Dictionary,
    InputArea,
    Paragraph,
    SourceCode,
  },
  mounted: function () {
    EventHub.$on('parsing.antlr.failed', this.handleFailedParsing);
    EventHub.$on('parsing.antlr.succeeded', this.hideErrorMessageContainer);
  },
  computed: {
    getDefaultJsonExample: function () {
      const defaultExample = JSON.stringify(this.example)
        .replace(/,(?!\s)/g, ', ');
      return defaultExample;
    },
  },  
  methods: { 
    copyToInputArea: function (event) {
      const json = event.target.innerText
      EventHub.$emit(
        'source.copied',
        {
          code: json,
          ref: this.$refs['parsedJSON'],
        }
      );
    },
    handleFailedParsing: function (event) {
      this.errorMessage = event.errorMessage;
      this.showError = true;
    },
    hideErrorMessageContainer: function () {
      this.showError = false;
    }
  }, 
  props: {
    emptyExample: {
      type: Object,
      default: function () {
        return {};
      }
    },
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
      example: this.defaultExample,
      errorMessage: '',
      showError: false,
    };
  }
}
</script>

<style scoped lang='scss'>
  @import '../../styles/content/about.scss';
</style>