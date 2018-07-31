import 'es6-promise/auto';
import Vue from 'vue';
import Vuex from 'vuex';
import { expect } from 'chai';
import { createLocalVue, mount } from '@vue/test-utils';

import store from '../../src/store';
import Comma from '../../src/components/json/comma.vue';
import JsonEditor from '../../src/components/json/json-editor/json-editor.vue';
import JsonArray from '../../src/components/json/json-array.vue';
import JsonObject from '../../src/components/json/json-object.vue';
import JsonPair from '../../src/components/json/json-pair.vue';
import JsonValue from '../../src/components/json/json-value.vue';
import Styles from '../../src/styles';
import JsonEvents from '../../src/components/json/events/json-events';
import EventHub from '../../src/modules/event-hub';

Vue.config.productionTip = false;
mocha.setup({ timeout: 10000 });

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component(
  'font-awesome-icon',
  Styles.components['font-awesesome-icon'],
);
[
  {
    name: 'comma',
    component: Comma,
  }, {
    name: 'json-pair',
    component: JsonPair,
  }, {
    name: 'json-object',
    component: JsonObject,
  }, {
    name: 'json-value',
  component: JsonValue,
  },
].forEach(
  ({ name, component }) => {
    localVue.component(
      name,
      component,
    );
  },
);

describe('JsonArray', () => {
  const mountSubjectUnderTest = function (objectData) {
    document.body.classList.add('json');

    const subjectUnderTestWrapper = mount(JsonArray, objectData);
    const jsonEditorWrapper = mount(
      JsonEditor,
      {
        store,
        localVue,
      },
    );

    return {
      jsonEditorWrapper,
      subjectUnderTestWrapper,
    };
  };

  it('should render an empty array', () => {
    const { subjectUnderTestWrapper } = mountSubjectUnderTest({});
    expect(subjectUnderTestWrapper.contains('span')).to.be.true;
    const text = subjectUnderTestWrapper.text();
    expect(text).to.equal('[  ]');
  });

  it('should render an array containing an oject', () => {
    const { subjectUnderTestWrapper } = mountSubjectUnderTest(
      {
        attachToDocument: false,
        propsData: {
          hasChildren: true,
        },
        slots: {
          default: [
            '<json-object has-children>'
            + '<json-pair>'
            + '<template slot=\'key\'>"Key"</template>'
            + '<template slot=\'colon\'>:</template>'
            + '<template slot=\'value\'><json-value>"Value"</json-value></template>'
            + '</json-pair>'
            + '</json-object>',
          ],
        },
        store,
        localVue,
      },
    );
    expect(subjectUnderTestWrapper.contains('span')).to.be.true;
    const text = subjectUnderTestWrapper.text().replace(/\s/g, '');
    expect(text).to.equal('[{"Key":"Value",}]');
    subjectUnderTestWrapper.vm.$destroy();
  });

  it('should register its values (contains objects and their pairs)', (done) => {
    const components = [];
    EventHub.$on(
      JsonEvents.node.afterRegistration,
      ({ component }) => {
        components.push(component);
        expect(component.isRegistered).to.be.true;

        if (components.length === 4) {
          const pairs = components.filter(
            componentCandidate => (componentCandidate.$vnode
            .componentOptions.Ctor.options.name === 'json-pair'),
          );
          const keys = components.filter(
            componentCandidate => (componentCandidate.$vnode
            .componentOptions.Ctor.options.name === 'pair-key'),
          );
          const values = components.filter(
            componentCandidate => (componentCandidate.$vnode
            .componentOptions.Ctor.options.name === 'json-value'),
          );
          expect(pairs.length).to.equal(1);
          expect(keys.length).to.equal(1);
          expect(values.length).to.equal(2);
          done();
        }
      },
    );

    const { subjectUnderTestWrapper } = mountSubjectUnderTest(
      {
        attachToDocument: true,
        propsData: {
          hasChildren: true,
        },
        slots: {
          default: [
            '<json-object has-children>'
            + '<json-pair>'
            + '<template slot=\'key\'>"Key"</template>'
            + '<template slot=\'colon\'>:</template>'
            + '<template slot=\'value\'><json-value>"Value"</json-value></template>'
            + '</json-pair>'
            + '</json-object>',
            '<comma />',
            '<json-value>"Value2"</json-value>',
          ],
        },
        store,
        localVue,
      },
    );

    const text = subjectUnderTestWrapper.text().replace(/\s/g, '');
    expect(text).to.equal('[{"Key":"Value",},"Value2"]');
  });
});
