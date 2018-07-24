<script>
import Vue from 'vue';

export default {
  name: 'json',
  class: 'json',
  props: {
    jsonProp: {
        type: String,
        default: ''
    },
  },
  render: function (createElement) {
    if (typeof this.$slots.default !== 'undefined'
    && this.$slots.default.length === 0) {
      return;
    }

    const element = createElement(
      'div',
      { 
        class: 'json__container',
        domProps: {
          innerHTML: this.json
        },
      },
    );

    return element;
  },
  data: function () {
    return {
      json: this.jsonProp,
    }
  }
};
</script>

<style module>
@import 'json.scss';
</style>