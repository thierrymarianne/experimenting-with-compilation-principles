<template>
  <div class='introduction__container'>
    <h2 class="introduction__subtitle">{{ subtitle }}</h2>
    <question>
        <template slot-scope='slotProps'>
          <paragraph :class='slotProps.question.classes.question'>What is the difference between a compiler and an interpreter?</paragraph>
          <paragraph 
            :class='slotProps.question.classes.answer'
            v-if='slotProps.question.answerIsVisible' 
          >A <em>compiler</em> is a program that can read a program
in one language - the <em>source</em> language - and translate it
into an equivalent program in another language - the <em>target</em> language.

A <em>interpreter</em> is another common kind of language processor.
Instead of producing a target program as a translation, 
an interpreter appears to directly execute the operations specified 
in the source program on inputs supplied by the user.</paragraph>
        </template>
    </question>
    <question>
        <template slot-scope='slotProps'>
          <paragraph :class='slotProps.question.classes.question'>What are the advantages of (a) a compiler over an interpreter 
(b) an interpreter over a compiler?</paragraph>
          <paragraph
            :class='slotProps.question.classes.answer'
            v-if='slotProps.question.answerIsVisible'
          >(a) The machine-language target program produced by a compiler
is usually much faster at mapping inputs to outputs.

(b) An interpreter, however can usually give better error diagnostics than a compiler,
because it executes the source program statement by statement.</paragraph>
        </template>
    </question>
    <question>
        <template slot-scope='slotProps'>
          <paragraph :class='slotProps.question.classes.question'>What advantages are there to a language-processing system
in which the compiler produces assembly language rather than machine language?</paragraph>
          <paragraph
            :class='slotProps.question.classes.answer'
            v-if='slotProps.question.answerIsVisible'
          >The compiler may produce an assembly-language as its output,
because assembly language is easier to produce as output and is easier to debug.x</paragraph>
        </template>
    </question>
  </div>
</template>

<script>
import Paragraph from '../paragraph.vue'
import Question from '../question.vue'

export default {
  name: 'introduction',
  props: {
    subtitle: {
      type: String
    }
  },
  components: {
    paragraph: Paragraph,
    question: Question,
  },
  methods: {
    getSubtitleClasses: function () {
      return {
        'introduction__subtitle': true,
      };
    }    
  }
}
</script>

<style scoped type='text/scss'>
  @import '../../styles/introduction.scss';
</style>