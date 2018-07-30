import Vuex from 'vuex';
import { expect } from 'chai';
import { createLocalVue, mount, shallowMount } from '@vue/test-utils';

import store from '../../src/store';
import JsonEditor from '../../src/components/json/json-editor/json-editor.vue';
import JsonValue from '../../src/components/json/json-value.vue';
import JsonEvents from '../../src/components/json/events/json-events';
import EventHub from '../../src/modules/event-hub';

const localVue = createLocalVue();
localVue.use(Vuex);

describe('JsonValue', () => {
  it('should render a JSON value', () => {
    const wrapper = mount(
      JsonValue,
      {
        slots: {
          defaults: ['"My Value"'],
        },
      },
    );
    expect(wrapper.contains('span')).to.be.true;
    const text = wrapper.text();
    expect(text).to.equal('"My Value"');
  });

  it('should add a uuid attribute', () => {
    const wrapper = mount(JsonValue);
    expect(wrapper.attributes()['data-uuid'].length).to.equal(36);
  });

  it('should prevent tags from being rendered', () => {
    const wrapper = mount(
      JsonValue,
      {
        slots: {
          defaults: ['"Before', '<a onclick="alert(1337)"></a>', 'After"'],
        },
      },
    );
    expect(wrapper.contains('span')).to.be.true;
    const text = wrapper.text();
    expect(text).to.equal('"BeforeAfter"');
  });

  it('should revise slots and text data when a tag is detected', (done) => {
    const wrapper = mount(
      JsonValue,
      {
        slots: {
          defaults: ['"Before', '<a onclick="alert(1337)"></a>', 'After"'],
        },
      },
    );

    localVue.nextTick(() => {
      expect(wrapper.vm.text).to.equals('"BeforeAfter"');
      expect(wrapper.vm.$slots.default.length).to.equals(1);
      done();
    });
  });

  const mountSubjectUnderTest = function () {
    const jsonValueWrapper = shallowMount(
      JsonValue,
      {
        slots: {
          defaults: ['"value"'],
        },
        store,
        localVue,
      },
    );
    const jsonEditorWrapper = mount(
      JsonEditor,
      {
        store,
        localVue,
      },
    );
    jsonEditorWrapper.vm.trackNode({
      uuid: jsonValueWrapper.vm.uuid,
      value: 'value',
      nodeType: 'value',
      twinUuid: {},
    });
    jsonEditorWrapper.vm.trackComponentByUuid({
      uuid: jsonValueWrapper.vm.uuid,
      component: jsonValueWrapper.vm,
    });

    return {
      jsonEditorWrapper,
      jsonValueWrapper,
    };
  };

  it('should make a content editable', (done) => {
    const { jsonValueWrapper } = mountSubjectUnderTest();

    EventHub.$on(
      JsonEvents.node.afterBeingMadeEditable,
      (event) => {
        expect(event.nodeUuid.length).to.equals(36);
        done();
      },
    );
    jsonValueWrapper.vm.makeContentEditable();
  });

  it('should make a content being edited, non-editable', (done) => {
    const { jsonValueWrapper } = mountSubjectUnderTest();

    EventHub.$on(
      JsonEvents.node.afterBeingMadeNonEditable,
      () => {
        expect(jsonValueWrapper.vm.isEdited).to.be.false;
        expect('contenteditable' in jsonValueWrapper.attributes()).to.be.false;
        done();
      },
    );

    EventHub.$on(
      JsonEvents.node.afterBeingMadeEditable,
      () => {
        expect(jsonValueWrapper.vm.isEdited).to.be.true;
        expect(jsonValueWrapper.attributes().contenteditable).to.equal('true');
        jsonValueWrapper.vm.makeContentNonEditable();
      },
    );
    jsonValueWrapper.vm.makeContentEditable();
  });
});
