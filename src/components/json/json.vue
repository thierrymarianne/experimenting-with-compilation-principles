<script>
import Vue from 'vue';
import JsonValue from './json-value.vue';
import JsonPair from './json-pair.vue';
import JsonArray from './json-array.vue';
import JsonObject from './json-object.vue';

export default {
  name: 'json',
  class: 'json',
  props: {
    jsonProp: {
      type: String,
      default: ''
    },
    dynamic: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    compileJsonTemplate: function () {
      return Vue.compile(this.json); 
    }
  },
  render: function (createElement) {
    if (typeof this.$slots.default !== 'undefined'
    && this.$slots.default.length === 0) {
      return;
    }

    if (!this.dynamic) {
      const compilationResult = this.compileJsonTemplate();
      const child = createElement(
        {
          name: 'json',
          components: {
            JsonValue,
            JsonPair,
            JsonArray,
            JsonObject,
          },
          render: compilationResult.render,
          staticRenderFns: compilationResult.staticRenderFns,
        }, {
          props: {
            jsonProp: this.json,
            dynamic: true,
          }
        }
      );

      return createElement(
        'div',
        { class: 'json__container' },
        [child],
      );
    }

    const dynamicComponent = createElement(
      'div',
      { class: 'json__container' },
    );

    return dynamicComponent;
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