import Vuex from 'vuex';
import { expect } from 'chai';
import { createLocalVue, shallowMount } from '@vue/test-utils';

import store from '../../src/store';
import JsonEditor from '../../src/components/json/json-editor/json-editor.vue';
import JsonValue from '../../src/components/json/json-value/json-value.vue';
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
    subjectUnderTestWrapper = shallowMount(
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
    subjectUnderTestWrapper = shallowMount(JsonValue);
    expect(subjectUnderTestWrapper.attributes()['data-uuid'].length).to.equal(36);
  });

  it('should prevent tags from being rendered', () => {
    subjectUnderTestWrapper = shallowMount(
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
    subjectUnderTestWrapper = shallowMount(
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

  const mountSubjectUnderTestWrapper = function ({ destroyAfter }) {
    ['json', 'json__container'].forEach(className => (document.body
      .classList.add(className)));

    const jsonEditorComponentWrapper = shallowMount(
      JsonEditor,
      {
        attachToDocument: false,
        store,
        localVue,
      },
    );
    const subjectUnderTestComponentWrapper = shallowMount(
      JsonValue,
      {
        attachToDocument: false,
        slots: {
          default: ['"value"'],
        },
        store,
        localVue,
      },
    );

    if (typeof destroyAfter === 'undefined' || !destroyAfter) {
      subjectUnderTestWrapper = subjectUnderTestComponentWrapper;
      jsonEditorWrapper = jsonEditorComponentWrapper;
    }

    if (typeof destroyAfter !== 'undefined' && !destroyAfter) {
      subjectUnderTestWrapper = undefined;
      jsonEditorWrapper = undefined;
    }

    jsonEditorComponentWrapper.vm.trackNode({
      uuid: subjectUnderTestComponentWrapper.vm.uuid,
      value: 'value',
      nodeType: 'value',
      twinUuid: {},
    });
    jsonEditorComponentWrapper.vm.trackComponentByUuid({
      uuid: subjectUnderTestComponentWrapper.vm.uuid,
      component: subjectUnderTestComponentWrapper.vm,
    });

    return {
      jsonEditorWrapper: jsonEditorComponentWrapper,
      subjectUnderTestWrapper: subjectUnderTestComponentWrapper,
    };
  };

  it('should make a content editable', (done) => {
    ({ subjectUnderTestWrapper } = mountSubjectUnderTestWrapper({}));

    const afterBeingMadeEditable = (event) => {
      expect(event.nodeUuid.length).to.equals(36);
      EventHub.$off(
        JsonEvents.node.afterBeingMadeEditable,
        afterBeingMadeEditable,
      );
      done();
    };
    EventHub.$on(
      JsonEvents.node.afterBeingMadeEditable,
      afterBeingMadeEditable,
    );
    subjectUnderTestWrapper.vm.makeContentEditable();
  });

  it('should make a content being edited, non-editable', (done) => {
    let valueUnderTestWrapper;
    let jsonEditorComponentWrapper;

    const afterBeingMadeEditable = () => {
      EventHub.$off(JsonEvents.node.afterBeingMadeEditable);
      expect(valueUnderTestWrapper.vm.isEdited).to.be.true;
      const uuid = valueUnderTestWrapper.vm.uuid;
      expect(jsonEditorComponentWrapper.vm.isNodeWithUuidBeingEdited()(uuid)).to.be.true;
      expect(valueUnderTestWrapper.attributes().contenteditable).to.equal('true');

      // Do the job of the editor, which does not "manage" this value
      valueUnderTestWrapper.vm.isEditable = true;
      valueUnderTestWrapper.vm.makeContentNonEditable();
    };
    EventHub.$on(
      JsonEvents.node.afterBeingMadeEditable,
      afterBeingMadeEditable,
    );

    const afterEdition = () => {
      expect(valueUnderTestWrapper.vm.isEdited).to.be.false;
      expect('contenteditable' in valueUnderTestWrapper.attributes()).to.be.false;
      EventHub.$off(JsonEvents.node.afterEdition);
      done();
    };
    EventHub.$on(
      JsonEvents.node.afterEdition,
      afterEdition,
    );

    const wrappers = mountSubjectUnderTestWrapper({});
    valueUnderTestWrapper = wrappers.subjectUnderTestWrapper;
    jsonEditorComponentWrapper = wrappers.jsonEditorWrapper;
    valueUnderTestWrapper.vm.makeContentEditable();
  });
});
