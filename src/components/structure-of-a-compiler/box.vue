<template>
  <div
    class='box__container' 
    v-on:click='toggleBoxHighlight'
  >
    <div :class='getBoxClasses'>
      <slot></slot>
    </div>
    <transition name='box__translatable'>
      <div v-if='isHighlighted' class='box__arrow'></div>
    </transition>
  </div>
</template>

<script>
import ActionTypes from '../../store/modules/action-types';
import MutationTypes from '../../store/modules/mutation-types';

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions, mapMutations } = createNamespacedHelpers('structure-of-a-compiler')

export default {
  name: 'box',
  methods: {
    ...mapActions([
      ActionTypes.SHOW_DESCRIPTION,
    ]),
    ...mapMutations([
      MutationTypes.HIDE_ALL_DESCRIPTIONS,
    ]),
    unhighlight: function (event) {
      this.hideAllDescriptions();
    },
    highlight: function () {
      this.showDescription(this.name);
    },
    toggleBoxHighlight: function () {
      if (this.highlighted === undefined) {
        return;
      }

      if (this.isHighlightable) {
        window.scrollTo(0, this.$el.offsetTop - 10);
        this.highlight();

        return;
      }

      this.unhighlight();
    }
  },
  computed: {
    ...mapGetters([
      'visibleDescription',
      'visibilityOfDescriptions',
    ]),
    getBoxClasses: function () {
      const classes = { box: true };

      classes['box__highlightable'] = this.isHighlightable;
      classes['box__highlighted'] = this.isHighlighted;

      return classes;
    },
    isHighlightable: function () {
      if (typeof this.highlighted === 'undefined') {
        return false;
      }

      return !this.isHighlighted;
    },
    isHighlighted: function () {
      if (this.visibilityOfDescriptions !== undefined && (this.name in this.visibilityOfDescriptions)) {
        return this.visibleDescription == this.name;
      }

      return undefined;
    }
  },
  props: {
    name: String,
    highlighted: {
      Boolean,
      default: undefined
    }    
  },
}
</script>

<style scoped type='text/scss'>
  @import '../../styles/structure-of-a-compiler/box.scss'
</style>