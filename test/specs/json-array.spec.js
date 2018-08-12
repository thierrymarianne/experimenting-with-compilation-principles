import Vuex from 'vuex';
import { expect } from 'chai';
import { createLocalVue, mount } from '@vue/test-utils';

import store from '../../src/store';
import Comma from '../../src/components/json/comma.vue';
import JsonEditor from '../../src/components/json/json-editor/json-editor.vue';
import JsonArray from '../../src/components/json/json-array.vue';
import JsonObject from '../../src/components/json/json-object.vue';
import JsonPair from '../../src/components/json/json-pair.vue';
import JsonValue from '../../src/components/json/json-value/json-value.vue';
import Styles from '../../src/styles';
import JsonEvents from '../../src/components/json/events/json-events';
import EventHub from '../../src/modules/event-hub';
import TestHelpers from './test-helpers';

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
  const wrappers = {
    jsonEditorWrapper: null,
    subjectUnderTestWrapper: null,
  };

  const mountSubjectUnderTest = function ({
    objectData,
    requiresEditor,
    destroyAfter,
  }) {
    if (requiresEditor) {
      const jsonEditorComponentWrapper = mount(
        JsonEditor,
        {
          attachToDocument: false,
          store,
          localVue,
        },
      );

      TestHelpers.ensureComponentWrapperIsDestroyedAfter({
        componentWrapper: jsonEditorComponentWrapper,
        wrappersForDeletion: wrappers,
        wrapperForDeletionName: 'jsonEditorWrapper',
        destroyAfter,
      });
    }

    const subjectUnderTestComponentWrapper = mount(JsonArray, objectData);

    return TestHelpers.ensureComponentWrapperIsDestroyedAfter({
      componentWrapper: subjectUnderTestComponentWrapper,
      wrappersForDeletion: wrappers,
      wrapperForDeletionName: 'subjectUnderTestWrapper',
      destroyAfter,
    });
  };

  afterEach(() => {
    TestHelpers.destroyComponent(wrappers.subjectUnderTestWrapper);
    TestHelpers.destroyComponent(wrappers.jsonEditorWrapper);
  });

  it('should render an empty array', () => {
    const { subjectUnderTestWrapper } = mountSubjectUnderTest({ objectData: {} });
    expect(subjectUnderTestWrapper.contains('span')).to.be.true;
    const text = subjectUnderTestWrapper.text();
    expect(text).to.equal('[  ]');
  });

  it('should render an array containing an oject', () => {
    const { subjectUnderTestWrapper } = mountSubjectUnderTest(
      {
        objectData: {
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
            ],
          },
          store,
          localVue,
        },
        destroyAfter: true,
      },
    );

    expect(subjectUnderTestWrapper.contains('span')).to.be.true;
    const text = subjectUnderTestWrapper.text().replace(/\s/g, '');
    expect(text).to.equal('[{"Key":"Value",}]');
  });

  it('should register its values (contains objects and their pairs)', (done) => {
    localVue.config.errorHandler = done;

    const components = [];
    EventHub.$on(
      JsonEvents.node.afterRegistration,
      ({ component }) => {
        components.push(component);
        expect(component.isRegistered).to.be.true;

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

        if (components.length === 5
        && values.length === 3) {
          localVue.nextTick(() => {
            expect(pairs.length).to.equal(1);
            expect(keys.length).to.equal(1);
            expect(values.length).to.equal(3);
            done();
          });
        }
      },
    );

    const { subjectUnderTestWrapper } = mountSubjectUnderTest(
      {
        objectData: {
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
        requiresEditor: true,
      },
    );

    const text = subjectUnderTestWrapper.text().replace(/\s/g, '');
    expect(text).to.equal('[{"Key":"Value",},"Value2"]');
  }).timeout(4000);
});
