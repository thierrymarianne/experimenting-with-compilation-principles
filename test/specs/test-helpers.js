import Vue from 'vue';

Vue.config.productionTip = false;

const destroyComponent = (component) => {
  let componentCandidate = component;

  if (typeof componentCandidate === 'undefined') {
    return;
  }

  // Case when a wrapper has been passed instead of a component
  if (typeof componentCandidate.vm !== 'undefined') {
    componentCandidate = componentCandidate.vm;
  }

  if (typeof componentCandidate.$el !== 'undefined') {
    componentCandidate.$el.classList.add('hide');
  }

  componentCandidate.$destroy();

  if (document.body === null) {
    return;
  }

  if (document.body.contains(componentCandidate.$el)) {
    document.body.removeChild(componentCandidate.$el);
  }
};

export default {
  destroyComponent,
};
