<template>
  <div 
    class='question' 
    v-on:click='showAnswer'>
    <slot v-bind:question='question'></slot>
  </div>
</template>

<script>
import Paragraph from './paragraph.vue';

export default {
  name: 'question',
  components: { 
    paragraph: Paragraph
  },
  methods: {
    showAnswer: function () {
      this.question.answerIsVisible = !this.question.answerIsVisible;
    }
  },
  data: function () {
    return {
      question: {
        answerIsVisible: false,
        classes: {
          question: 'question__question', 
          answer: 'question__answer',
        },
      }
    };
  }
}
</script>

<style scoped type='text/scss'>
  @import '../styles/question.scss';
</style>