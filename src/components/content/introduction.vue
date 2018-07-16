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
in which the compiler produces assembly language
rather than machine language?</paragraph>
          <paragraph
            :class='slotProps.question.classes.answer'
            v-if='slotProps.question.answerIsVisible'
          >The compiler may produce an assembly-language as its output,
because assembly language is easier to produce as output and is easier to debug.</paragraph>
        </template>
    </question>
    <question>
        <template slot-scope='slotProps'>
          <paragraph :class='slotProps.question.classes.question'>A compiler that translates a high-level language
into another high-level language
is called a <em>source-to-source</em> translator. 
What advantages are there to using C
as a target language for a compiler?</paragraph>
          <paragraph
            :class='slotProps.question.classes.answer'
            v-if='slotProps.question.answerIsVisible'
          >There is a C compiler for almost every system ever made.
<browsable-link href='http://bit.ly/advantages-of-c-compiler-as-target-language'>See original Quora answer</browsable-link></paragraph>
        </template>
    </question>
    <question>
        <template slot-scope='slotProps'>
          <paragraph :class='slotProps.question.classes.question'>Describe some of the tasks
that an assembler needs to perform.</paragraph>
          <paragraph
            :class='slotProps.question.classes.answer'
            v-if='slotProps.question.answerIsVisible'
          >An assembler produces relocatable machine code as its output
by processing an assembly language</paragraph>
        </template>
    </question>
  </div>
</template>

<script>
import Paragraph from '../paragraph.vue'
import Question from '../question.vue'
import BrowsableLink from '../browsable-link.vue'

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
    'browsable-link': BrowsableLink,
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