import Vue from 'vue';
import Vuex from 'vuex';
import { expect } from 'chai';
import { createLocalVue, mount } from '@vue/test-utils';

import store from '../../src/store';
import EventHub from '../../src/modules/event-hub';
import JsonEditor from '../../src/components/json/json-editor/json-editor.vue';
import JsonEvents from '../../src/components/json/events/json-events';
import SharedState from '../../src/modules/shared-state';
import Styles from '../../src/styles';

Vue.config.productionTip = false;

const localVue = createLocalVue();
localVue.use(Vuex);
localVue.component(
  'font-awesome-icon',
  Styles.components['font-awesesome-icon'],
);
localVue.use(Vuex);

describe('JsonEditor', () => {
  const mountSubjectUnderTest = (objectData, wrapperCreator) => {
    ['json', 'json__container'].forEach(className => (document.body
    .classList.add(className)));

    const jsonEditorWrapper = wrapperCreator.apply(null, [JsonEditor, objectData]);

    jsonEditorWrapper.vm.$refs['json-editor']
    .$refs['editable-json'].classList.add('json');
    jsonEditorWrapper.vm.$refs['json-editor']
    .$refs['dynamic-json'].classList.add('json');

    return jsonEditorWrapper;
  };

  const isVisible = function (element) {
    return window.getComputedStyle(element).display !== 'none';
  };

  it('should mount a JSON editor with two distinct sections', () => {
    const json = '{}';
    SharedState.state.json = json;

    const subjectUnderTestWrapper = mountSubjectUnderTest(
      {
        attachToDocument: true,
        store,
      },
      mount,
    );

    const template = '<json-object></json-object>';
    subjectUnderTestWrapper.vm.setJsonTemplate(template);

    return localVue.nextTick().then(() => {
      expect(subjectUnderTestWrapper.contains('.json-editor')).to.be.true;
      expect(subjectUnderTestWrapper.contains('.editable-json.editable-json--ready'))
      .to.be.true;
      expect(subjectUnderTestWrapper.contains('.dynamic-json')).to.be.true;
      expect(subjectUnderTestWrapper.vm.json).to.equals(json);
      expect(SharedState.state.template).to.equals(template);
      const text = subjectUnderTestWrapper.text();
      expect(text).to.equal('{  }{  }');
      subjectUnderTestWrapper.vm.$el.classList.add('hide');
      subjectUnderTestWrapper.vm.$destroy();
    });
  });

  it('should allow to toggle the visibility of pairs in objects', (done) => {
    localVue.config.errorHandler = done;

    const subjectUnderTestWrapper = mountSubjectUnderTest(
      {
        attachToDocument: true,
        store,
        localVue,
      },
      mount,
    );

    const template = '<json-object has-children>'
      + '<json-pair>'
      + '<template slot="key">"Key"</template>'
      + '<template slot="colon">:</template>'
      + '<template slot="value"><json-value>"Value"</json-value></template>'
      + '</json-pair>'
      + '</json-object>';

    let togglePairVisibilityButton;

    EventHub.$on(
      JsonEvents.node.altered,
      ({ hook, component }) => {
        localVue.nextTick().then(() => {
          let dynamicPairComponent;

          if (hook === JsonEvents.node.afterBeingHidden) {
            // Ensure pair is hidden after which visibility has been toggled
            const pair = subjectUnderTestWrapper.vm
            .$refs['json-editor']
            .$refs['dynamic-json']
            .querySelector('.json__pair')
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

          done();
        });
      },
    );

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
});
