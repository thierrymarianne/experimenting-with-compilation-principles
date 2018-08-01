import Vuex from 'vuex';
import { expect } from 'chai';
import { createLocalVue, mount, shallowMount } from '@vue/test-utils';

import store from '../../src/store';
import JsonEditor from '../../src/components/json/json-editor/json-editor.vue';
import JsonValue from '../../src/components/json/json-value.vue';
import JsonEvents from '../../src/components/json/events/json-events';
import EventHub from '../../src/modules/event-hub';
import TestHelpers from './test-helpers';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('JsonValue', () => {
  let subjectUnderTestWrapper;
  let jsonEditorWrapper;

  afterEach(() => {
    TestHelpers.destroyComponent(subjectUnderTestWrapper);
    TestHelpers.destroyComponent(jsonEditorWrapper);
  });

  it('should render a value', () => {
    subjectUnderTestWrapper = mount(
      JsonValue,
      {
        slots: {
          default: ['"My Value"'],
        },
      },
    );
    expect(subjectUnderTestWrapper.contains('span')).to.be.true;
    const text = subjectUnderTestWrapper.text();
    expect(text).to.equal('"My Value"');
  });

  it('should add a uuid attribute', () => {
    subjectUnderTestWrapper = mount(JsonValue);
    expect(subjectUnderTestWrapper.attributes()['data-uuid'].length).to.equal(36);
  });

  it('should prevent tags from being rendered', () => {
    subjectUnderTestWrapper = mount(
      JsonValue,
      {
        slots: {
          defaults: ['"Before', '<a onclick="alert(1337)"></a>', 'After"'],
        },
      },
    );
    expect(subjectUnderTestWrapper.contains('span')).to.be.true;
    const text = subjectUnderTestWrapper.text();
    expect(text).to.equal('"BeforeAfter"');
  });

  it('should revise slots and text data when a tag is detected', (done) => {
    subjectUnderTestWrapper = mount(
      JsonValue,
      {
        slots: {
          defaults: ['"Before', '<a onclick="alert(1337)"></a>', 'After"'],
        },
      },
    );

    localVue.nextTick(() => {
      expect(subjectUnderTestWrapper.vm.text).to.equals('"BeforeAfter"');
      expect(subjectUnderTestWrapper.vm.$slots.default.length).to.equals(1);
      done();
    });
  });

  const mountSubjectUnderTestWrapper = function () {
    (subjectUnderTestWrapper = shallowMount(
      JsonValue,
      {
        slots: {
          default: ['"value"'],
        },
        store,
        localVue,
      },
    ));
    jsonEditorWrapper = mount(
      JsonEditor,
      {
        store,
        localVue,
      },
    );
    jsonEditorWrapper.vm.trackNode({
      uuid: subjectUnderTestWrapper.vm.uuid,
      value: 'value',
      nodeType: 'value',
      twinUuid: {},
    });
    jsonEditorWrapper.vm.trackComponentByUuid({
      uuid: subjectUnderTestWrapper.vm.uuid,
      component: subjectUnderTestWrapper.vm,
    });

    return {
      jsonEditorWrapper,
      subjectUnderTestWrapper,
    };
  };

  it('should make a content editable', (done) => {
    ({ subjectUnderTestWrapper } = mountSubjectUnderTestWrapper());

    EventHub.$on(
      JsonEvents.node.afterBeingMadeEditable,
      (event) => {
        expect(event.nodeUuid.length).to.equals(36);
        done();
      },
    );
    subjectUnderTestWrapper.vm.makeContentEditable();
  });

  it('should make a content being edited, non-editable', (done) => {
    ({ subjectUnderTestWrapper } = mountSubjectUnderTestWrapper());

    EventHub.$on(
      JsonEvents.node.afterEdition,
      () => {
        expect(subjectUnderTestWrapper.vm.isEdited).to.be.false;
        expect('contenteditable' in subjectUnderTestWrapper.attributes()).to.be.false;
        done();
      },
    );

    EventHub.$on(
      JsonEvents.node.afterBeingMadeEditable,
      () => {
        expect(subjectUnderTestWrapper.vm.isEdited).to.be.true;
        expect(subjectUnderTestWrapper.attributes().contenteditable).to.equal('true');
        subjectUnderTestWrapper.vm.makeContentNonEditable();
      },
    );
    subjectUnderTestWrapper.vm.makeContentEditable();
  });
});
