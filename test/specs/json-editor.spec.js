import Vuex from 'vuex';
import { expect } from 'chai';
import { createLocalVue, mount } from '@vue/test-utils';

import store from '../../src/store';
import EventHub from '../../src/modules/event-hub';
import JsonEditor from '../../src/components/json/json-editor/json-editor.vue';
import JsonEvents from '../../src/components/json/events/json-events';
import SharedState from '../../src/modules/shared-state';
import Styles from '../../src/styles';
import TestHelpers from './test-helpers';

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component(
  'font-awesome-icon',
  Styles.components['font-awesesome-icon'],
);
localVue.use(Vuex);

describe('JsonEditor', () => {
  // Show punctuation characters as they should be
  // before copy to clipboard
  SharedState.state.debug.punctuation = true;

  let jsonEditorWrapper;

  const mountSubjectUnderTest = ({
    destroyAfter,
    id,
    objectData,
    wrapperCreator,
  }) => {
    ['json', 'json__container'].forEach(className => (document.body
    .classList.add(className)));

    const jsonEditorComponentWrapper = wrapperCreator.apply(
      null,
      [JsonEditor, objectData],
    );
    jsonEditorComponentWrapper.vm.$refs['json-editor']
    .$refs['editable-json'].classList.add('json');
    jsonEditorComponentWrapper.vm.$refs['json-editor']
    .$refs['dynamic-json'].classList.add('json');

    if (typeof destroyAfter === 'undefined' || destroyAfter) {
      jsonEditorWrapper = jsonEditorComponentWrapper;
    }

    if (typeof destroyAfter !== 'undefined' && !destroyAfter) {
      jsonEditorWrapper = undefined;
    }

    if (typeof id !== 'undefined') {
      jsonEditorComponentWrapper.vm.$el.setAttribute('id', id);
    }

    return jsonEditorComponentWrapper;
  };

  const isVisible = function (element) {
    return window.getComputedStyle(element).display !== 'none';
  };

  afterEach(() => {
    TestHelpers.destroyComponent(jsonEditorWrapper);
  });

  it('should mount a JSON editor with two distinct sections', () => {
    const json = '{}';
    SharedState.state.json = json;

    const subjectUnderTestWrapper = mountSubjectUnderTest({
      objectData: {
        attachToDocument: true,
        store,
      },
      wrapperCreator: mount,
    });

    const template = '<json-object></json-object>';
    subjectUnderTestWrapper.vm.setJsonTemplate(template);

    return localVue.nextTick().then(() => {
      expect(subjectUnderTestWrapper.contains('.json-editor')).to.be.true;
      expect(subjectUnderTestWrapper.contains('.editable-json.editable-json--ready'))
      .to.be.true;
      expect(subjectUnderTestWrapper.contains('.dynamic-json')).to.be.true;
      expect(subjectUnderTestWrapper.vm.json).to.equal(json);
      expect(SharedState.state.template).to.equal(template);
      const text = subjectUnderTestWrapper.text();
      expect(text).to.equal('{  }{  }');
    });
  });

  it('should allow to toggle the visibility of pairs in objects', (done) => {
    localVue.config.errorHandler = done;

    let subjectUnderTestWrapper;

    const template = '<json-object has-children>'
      + ' <json-pair>'
      + '   <template slot="key">"Key"</template>'
      + '   <template slot="colon">:</template>'
      + '   <template slot="value"><json-value>"Value"</json-value></template>'
      + ' </json-pair>'
      + '</json-object>';

    let togglePairVisibilityButton;

    const ensurePairVisibilityToggling = ({ hook, component }) => {
      localVue.nextTick().then(() => {
        let dynamicPairComponent;

        if (hook === JsonEvents.node.afterBeingHidden) {
          // Ensure pair is hidden after its visibility has been toggled
          const pair = subjectUnderTestWrapper.vm
          .$refs['json-editor']
          .$refs['dynamic-json']
          .querySelector('.json__pair');
          expect(isVisible(pair)).to.be.false;

          const uuid = pair.getAttribute('data-uuid');

          // A dynamic component (oppositely to an editable component)
          // reflects operations applied to its editable counterpart.
          dynamicPairComponent = subjectUnderTestWrapper.vm.getComponentByUuid(uuid);
          expect(dynamicPairComponent.isVisible).to.be.false;
          expect(dynamicPairComponent.isEditable).to.be.false;

          // The editor tracks editable elements, dynamic elements
          // and their corrrespondance
          const editablePairComponent = subjectUnderTestWrapper.vm
          .getEditableCounterpartFor(dynamicPairComponent.uuid);

          // The editable pair component has been marked as not being visible anymore,
          // event though we can "see" it in the "editable-json" panel
          expect(editablePairComponent.isVisible).to.be.false;
          expect(editablePairComponent.isEditable).to.be.true;

          togglePairVisibilityButton.click();
          return;
        }

        dynamicPairComponent = component;
        expect(dynamicPairComponent.isVisible).to.be.true;
        expect(dynamicPairComponent.isEditable).to.be.false;

        const editablePairComponent = subjectUnderTestWrapper.vm
        .getEditableCounterpartFor(dynamicPairComponent.uuid);
        expect(editablePairComponent.isVisible).to.be.true;
        expect(editablePairComponent.isEditable).to.be.true;

        EventHub.$off(
          JsonEvents.node.altered,
          ensurePairVisibilityToggling,
        );
        done();
      });
    };

    EventHub.$on(
      JsonEvents.node.altered,
      ensurePairVisibilityToggling,
    );

    subjectUnderTestWrapper = mountSubjectUnderTest({
      objectData: {
        attachToDocument: true,
        store,
        localVue,
      },
      wrapperCreator: mount,
    });

    subjectUnderTestWrapper.vm.setJsonTemplate(template);
    const text = subjectUnderTestWrapper.text().replace(/\s/g, '');
    expect(text).to.equal('{"Key":"Value",}{"Key":"Value",}');

    togglePairVisibilityButton = document.querySelector('.editable-json .json__pair---button');
    expect(isVisible(
      subjectUnderTestWrapper.vm
      .$refs['json-editor']
      .$refs['dynamic-json']
      .querySelector('.json__object'),
    )).to.be.true;

    togglePairVisibilityButton.click();
  }).timeout(4000);

  it('should allow to add a pair after an existing one', (done) => {
    localVue.config.errorHandler = done;

    const registeredComponents = [];
    const afterRegistration = ({ component }) => {
      registeredComponents.push(component);
      if (registeredComponents.length === 8) {
        EventHub.$off(
          JsonEvents.node.afterRegistration,
          afterRegistration,
        );
        const buttons = document.querySelectorAll('.editable-json .json__pair---button');
        const addPairAfterButton = buttons[1];
        addPairAfterButton.click();
      }
    };

    const afterPairAddition = ({
      editableComponentAddition,
      dynamicComponentAddition,
      editableComponent,
      dynamicComponent,
    }) => {
      localVue.nextTick(() => {
        expect(document.querySelectorAll('.editable-json .json__pair')
        .length).to.equal(2);
        expect(document.querySelectorAll('.dynamic-json .json__pair')
        .length).to.equal(2);

        expect(editableComponentAddition.isClonable).to.be.true;
        expect(editableComponentAddition.isEditable).to.be.true;
        expect(dynamicComponentAddition.isClonable).to.be.false;
        expect(dynamicComponentAddition.isEditable).to.be.false;

        expect(editableComponent.isClonable).to.be.true;
        expect(editableComponent.isEditable).to.be.true;
        expect(dynamicComponent.isClonable).to.be.false;
        expect(dynamicComponent.isEditable).to.be.false;

        EventHub.$off(
          JsonEvents.node.afterPairAddition,
          afterPairAddition,
        );
        done();
      });
    };

    EventHub.$on(
      JsonEvents.node.afterPairAddition,
      afterPairAddition,
    );

    EventHub.$on(
      JsonEvents.node.afterRegistration,
      afterRegistration,
    );

    const subjectUnderTestWrapper = mountSubjectUnderTest({
      objectData: {
        attachToDocument: true,
        store,
        localVue,
      },
      wrapperCreator: mount,
    });

    const template = '<json-object has-children>'
      + ' <json-pair>'
      + '   <template slot="key">"Key"</template>'
      + '   <template slot="colon">:</template>'
      + '   <template slot="value"><json-value>"Value"</json-value></template>'
      + ' </json-pair>'
      + '</json-object>';
    subjectUnderTestWrapper.vm.setJsonTemplate(template);
  });

  it('should allow to edit a key or a value', (done) => {
    localVue.config.errorHandler = done;

    const registeredComponents = [];
    let pairValue;
    const clickOnPairValue = ({ component }) => {
      registeredComponents.push(component);
      if (registeredComponents.length === 8) {
        const editableValues = document.querySelectorAll('.editable-json .json__value');
        pairValue = editableValues[1];
        pairValue.click();
      }
    };

    let subjectUnderTestWrapper;
    let editions = 0;

    const afterBeingMadeEditable = ({ component }) => {
      localVue.nextTick(() => {
        editions += 1;
        EventHub.$off(JsonEvents.node.afterRegistration, clickOnPairValue);

        expect(component.isEdited).to.be.true;

        expect(component.$el.getAttribute('contenteditable'))
        .to.be.equal('true');

        let newValue;
        if (editions === 1) {
          newValue = '"value updated"';
        }

        if (editions === 2) {
          newValue = '"value updated again"';
          EventHub.$off(
            JsonEvents.node.afterBeingMadeEditable,
            afterBeingMadeEditable,
          );
        }

        component.$el.innerText = newValue;

        // Click outside of the edited component
        subjectUnderTestWrapper.vm.$refs['json-editor']
        .$refs['dynamic-json'].click();

        expect(component.$el.hasAttribute('contenteditable'))
        .to.be.false;

        const editableCompanent = component;
        expect(editableCompanent.isEdited).to.be.false;
        expect(editableCompanent.value).to.equal(newValue);
        expect(editableCompanent.text).to.equal(newValue);

        const dynamicComponent = subjectUnderTestWrapper.vm
        .getDynamicCounterpartFor(component.uuid);
        expect(dynamicComponent.value).to.equal(newValue);
        expect(dynamicComponent.text).to.equal(newValue);

        if (editions === 2) {
          done();
          return;
        }

        pairValue.click();
      });
    };

    EventHub.$on(
      JsonEvents.node.afterBeingMadeEditable,
      afterBeingMadeEditable,
    );

    EventHub.$on(
      JsonEvents.node.afterRegistration,
      clickOnPairValue,
    );

    subjectUnderTestWrapper = mountSubjectUnderTest({
      objectData: {
        attachToDocument: true,
        store,
        localVue,
      },
      destroyAfter: false,
      wrapperCreator: mount,
    });

    const template = '<json-object has-children>'
      + ' <json-pair>'
      + '   <template slot="key">"Key"</template>'
      + '   <template slot="colon">:</template>'
      + '   <template slot="value"><json-value>"Value"</json-value></template>'
      + ' </json-pair>'
      + '</json-object>';
    subjectUnderTestWrapper.vm.setJsonTemplate(template);
  });

  it('should allow to add/remove a pair without breaking the JSON validity because of remaining or missing commas', (done) => {
    localVue.config.errorHandler = done;

    // Create an additional pair after the first one
    const registeredComponents = [];
    const afterRegistration = ({ component }) => {
      if (registeredComponents.length === 23) {
        EventHub.$off(
          JsonEvents.node.afterRegistration,
          afterRegistration,
        );
      }

      registeredComponents.push(component);

      // There are 12 components to be accounted for in each panel:
      // - an array (1),
      // - the only value of this array (an object) (1),
      // - three pairs (3),
      // - three corresponding values (3),
      // - three corresponding keys and their respective values (6) and
      // Given there are two panels (one for the editable JSON,
      // and another for the dynamic JSON), it gives us 24 components
      // but the array, and the object don't register themselves (twice).

      if (registeredComponents.length === 24) {
        const buttons = document.querySelectorAll('.editable-json .json__pair---button');
        const addPairAfterButton = buttons[1];
        addPairAfterButton.click();
        done();
      }
    };
    EventHub.$on(
      JsonEvents.node.afterRegistration,
      afterRegistration,
    );

    const actions = {};

    // Allow to set up a sequence of arbitrary actions
    // (which details are given by the "actionTrigger" functions),
    // without worrying about unregistering event handlers.
    // It also prevent having to face a pyramid
    // of nested callback registration
    const setUpAction = ({
      event,
      action,
      actionTrigger,
      nextAction,
      nextEvent,
    }) => {
      let jsonEvent = event;
      if (typeof jsonEvent === 'undefined') {
        jsonEvent = JsonEvents.node.altered;
      }

      let nextJsonEvent = nextEvent;
      if (typeof nextJsonEvent === 'undefined') {
        nextJsonEvent = JsonEvents.node.altered;
      }

      actions[action] = () => {
        EventHub.$off(
          jsonEvent,
          actions[action],
        );

        localVue.nextTick()
        .then(() => {
          if (nextAction) {
            if (typeof actions[nextAction] !== 'function') {
              throw Error(
                `The definition of the next action (with name "${nextAction}") `
                + 'is not valid (a function is required as trigger)',
              );
            }

            EventHub.$on(
              nextJsonEvent,
              actions[nextAction],
            );
          }

          actionTrigger();
        });
      };

      return actions[action];
    };

    const startByHidingFirstPair = setUpAction({
      event: JsonEvents.node.afterPairAddition,
      action: 'hide_first_pair',
      actionTrigger: function () {
        TestHelpers.selectFirstPairButton().click();
      },
      nextAction: 'hide_second_pair',
    });

    setUpAction({
      action: 'hide_second_pair',
      actionTrigger: function () {
        TestHelpers.selectPairButtonAtIndex(1).click();
      },
      nextAction: 'show_first_pair',
    });

    setUpAction({
      action: 'show_first_pair',
      actionTrigger: function () {
        TestHelpers.selectPairButtonAtIndex(0).click();
      },
      nextAction: 'show_second_pair',
    });

    setUpAction({
      action: 'show_second_pair',
      actionTrigger: function () {
        TestHelpers.selectPairButtonAtIndex(2).click();
      },
      nextAction: 'ensure_there_are_three_commas_left_before_hiding_last_pair',
    });

    setUpAction({
      action: 'ensure_there_are_three_commas_left_before_hiding_last_pair',
      actionTrigger: function () {
        expect(document.querySelector('.dynamic-json')
        .innerText.match(/,/g).length).to.equal(3);
        TestHelpers.selectPairButtonAtIndex(6).click();
      },
      nextAction: 'hide_pair_before_the_last',
    });

    setUpAction({
      action: 'hide_pair_before_the_last',
      actionTrigger: function () {
        TestHelpers.selectPairButtonAtIndex(4).click();
      },
      nextAction: 'ensure_there_are_one_comma_left_before_showing_pair_before_last',
    });

    setUpAction({
      action: 'ensure_there_are_one_comma_left_before_showing_pair_before_last',
      actionTrigger: function () {
        expect(document.querySelector('.dynamic-json')
        .innerText.match(/,/g).length).to.equal(1);
        TestHelpers.selectPairButtonAtIndex(4).click();
      },
      nextAction: 'ensure_there_are_two_commas_left',
    });

    setUpAction({
      action: 'ensure_there_are_two_commas_left',
      actionTrigger: function () {
        expect(document.querySelector('.dynamic-json')
        .innerText.match(/,/g).length).to.equal(2);
        done();
      },
    });

    EventHub.$on(
      JsonEvents.node.afterPairAddition,
      startByHidingFirstPair,
    );

    const subjectUnderTestWrapper = mountSubjectUnderTest({
      objectData: {
        attachToDocument: true,
        store,
        localVue,
      },
      wrapperCreator: mount,
    });

    const template = '<json-array has-children>'
      + '<json-value>'
      + ' <json-object has-children>'
      + ' <json-pair>'
      + '   <template slot="key">"Key"</template>'
      + '   <template slot="colon">:</template>'
      + '   <template slot="value"><json-value>"Value"</json-value></template>'
      + ' </json-pair>'
      + ' <comma />'
      + ' <json-pair>'
      + '   <template slot="key">"Key2"</template>'
      + '   <template slot="colon">:</template>'
      + '   <template slot="value"><json-value>"Value2"</json-value></template>'
      + ' </json-pair>'
      + ' <comma />'
      + ' <json-pair>'
      + '   <template slot="key">"Key3"</template>'
      + '   <template slot="colon">:</template>'
      + '   <template slot="value"><json-value>"Value3"</json-value></template>'
      + ' </json-pair>'
      + '</json-object>'
      + '</json-value>'
      + '</json-array>';
    subjectUnderTestWrapper.vm.setJsonTemplate(template);
  });
});
