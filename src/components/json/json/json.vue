<script>
import Vue from 'vue';
import JsonValue from '../json-value.vue';
import JsonPair from '../json-pair.vue';
import JsonArray from '../json-array.vue';
import JsonObject from '../json-object.vue';
import SharedState from '../../../modules/shared-state';

export default {
  name: 'json',
  props: {
    isEditable: {
        type: Boolean,
        default: false,
    },
    template: {
      type: String,
      default: () => (SharedState.state.template),
    },
    json: {
      type: String,
      default: () => (SharedState.state.json),
    },
    dynamic: {
      type: Boolean,
      default: false,
    }
  },
  methods: {
    compileJsonTemplate: function (template) {
      try {
        return Vue.compile(template);
      } catch (error) {
        this.sharedState.error(error, 'json.compileJsonTemplate');
        return Vue.compile('<json-value>compilation error</json-value>');
      }
    },
  },
  render: function (createElement) {
    if (this.dynamic) {
      const dynamicChildCompilation = this.compileJsonTemplate(this.sharedState.template);
      let JSONObjectData = {
        name: 'editableJson',
        components: {
          JsonValue,
          JsonPair,
          JsonArray,
          JsonObject,
        },
        data: function () {
          return { sharedState: SharedState };
        },
        render: dynamicChildCompilation.render,
        staticRenderFns: dynamicChildCompilation.staticRenderFns,
      }
      const editableJson = createElement(
        JSONObjectData,
        { class: 'content', },
        [SharedState.template]
      );
      
      let JSONObjectDataCopy = Object.assign({}, JSONObjectData);
      JSONObjectDataCopy.name = 'dynamicJson';
      const dynamicJson = createElement(
        JSONObjectDataCopy,
        { class: 'content', },
        [SharedState.template]
      );

      let classes = 'dynamic-json';
      let attributes = [];
      if (this.sharedState.debug.punctuation) {
        classes = `${classes} with-punctuation`;
        attributes = { 'contenteditable': true };
      }
      const jsonPanelsElement = createElement(
        'div',
        { class: 'json__panels' },
        [
          createElement(
            'div',
            { 
              class: 'editable-json',
              ref: 'editable-json',
            }, 
            [editableJson]
          ), 
          createElement(
            'div',
            {
              attrs: attributes,
              class: classes,
              ref: 'dynamic-json',              
            }, 
            [dynamicJson]
          )
        ]
      );

      return jsonPanelsElement;
    }

    let children = [];
    if (!this.dynamic && this.$slots.default !== 'undefined'
    && typeof this.$slots.default[0] !== 'undefined') {
      children.push(this.$slots.default[0]);
    }

    children.push(
      createElement(
        'input',
        {
          attr: {
            value: SharedState.json
          },
          domProps: {
            type: 'hidden',
            value: SharedState.json,
          },
        },
      )
    );

    const element = createElement(
      'div',
      { 
        class: 'json__container',
        ref: 'parent',
      },
      children
    );

    return element;
  },
  data: function () {
    return {
      sharedState: SharedState.state,
    }
  }
};
</script>

<style lang='scss'>
@import 'json.scss';
</style>