import Vuex from 'vuex';
import { expect } from 'chai';
import { createLocalVue, mount } from '@vue/test-utils';

import store from '../../src/store';
import JsonEditor from '../../src/components/json/json-editor/json-editor.vue';
import JsonObject from '../../src/components/json/json-object.vue';
import JsonPair from '../../src/components/json/json-pair.vue';
import JsonValue from '../../src/components/json/json-value.vue';
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
localVue.use(Vuex);
localVue.component(
  'json-pair',
  JsonPair,
);
localVue.component(
  'json-value',
  JsonValue,
);

describe('JsonObject', () => {
  let jsonEditorWrapper;
  let subjectUnderTestWrapper;

  const mountSubjectUnderTest = ({ objectData, requiresEditor }) => {
    document.body.classList.add('json');

    if (requiresEditor) {
      // the editor should be mounted before the component under test,
      // so that all node registration is accounted for.
      jsonEditorWrapper = mount(
        JsonEditor,
        {
          store,
          localVue,
        },
      );
    }

    subjectUnderTestWrapper = mount(JsonObject, objectData);

    return { subjectUnderTestWrapper };
  };

  afterEach(() => {
    TestHelpers.destroyComponent(subjectUnderTestWrapper);
    TestHelpers.destroyComponent(jsonEditorWrapper);
  });

  it('should render an empty object', () => {
    ({ subjectUnderTestWrapper } = mountSubjectUnderTest({ objectData: {} }));
    expect(subjectUnderTestWrapper.contains('span')).to.be.true;
    const text = subjectUnderTestWrapper.text();
    expect(text).to.equal('{  }');
  });

  it('should render an object containing a pair', () => {
    ({ subjectUnderTestWrapper } = mountSubjectUnderTest({
      objectData: {
        attachToDocument: false,
        propsData: {
          hasChildren: true,
        },
        slots: {
          default: [
            '<json-pair>'
            + '<template slot=\'key\'>"Key"</template>'
            + '<template slot=\'colon\'>:</template>'
            + '<template slot=\'value\'><json-value>"Value"</json-value></template>'
            + '</json-pair>',
          ],
        },
        store,
        localVue,
      },
    }));
    expect(subjectUnderTestWrapper.contains('span')).to.be.true;
    const text = subjectUnderTestWrapper.text().replace(/\s/g, '');
    expect(text).to.equal('{"Key":"Value",}');
  });

  it('should register its pairs (values and keys)', (done) => {
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

        if (components.length === 8
        && values.length === 4) {
          expect(values.length).to.equal(4);
          expect(keys.length).to.equal(2);
          expect(pairs.length).to.equal(2);
          done();
        }
      },
    );

    ({ subjectUnderTestWrapper } = mountSubjectUnderTest({
      objectData: {
        attachToDocument: true,
        propsData: {
          hasChildren: true,
        },
        slots: {
          default: [
            '<json-pair>'
            + '<template slot=\'key\'>"Key"</template>'
            + '<template slot=\'colon\'>:</template>'
            + '<template slot=\'value\'><json-value>"Value"</json-value></template>'
            + '</json-pair>',
            '<json-pair>'
            + '<template slot=\'key\'>"Key2"</template>'
            + '<template slot=\'colon\'>:</template>'
            + '<template slot=\'value\'><json-value>"Value2"</json-value></template>'
            + '</json-pair>',
          ],
        },
        store,
        localVue,
      },
      requiresEditor: true,
    }));

    const text = subjectUnderTestWrapper.text().replace(/\s/g, '');
    expect(text).to.equal('{"Key":"Value","Key2":"Value2",}');
  }).timeout(4000);
});
