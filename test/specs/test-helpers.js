import Vue from 'vue';

Vue.config.productionTip = false;

const destroyComponent = (component) => {
  let componentCandidate = component;

  if (typeof componentCandidate === 'undefined' || componentCandidate === null) {
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

const shouldDestroyAfter = destroyAfter => (
  typeof destroyAfter === 'undefined' || destroyAfter
);

const shouldDeletePreviousWrapper = destroyAfter => (
  typeof destroyAfter !== 'undefined' && !destroyAfter
);

const ensureComponentWrapperIsDestroyedAfter = (context) => {
  const caseContext = context;
  if (shouldDestroyAfter(context.destroyAfter)) {
    caseContext.wrappersForDeletion[context.wrapperForDeletionName] = caseContext.componentWrapper;
  }

  if (shouldDeletePreviousWrapper(caseContext.destroyAfter)) {
    caseContext.wrappersForDeletion[context.wrapperForDeletionName] = undefined;
    return {
      subjectUnderTestWrapper: caseContext.componentWrapper,
    };
  }

  return { subjectUnderTestWrapper: caseContext.componentWrapper };
};

const selectPairButtonAtIndex = (index) => {
  const selector = '.editable-json .json__pair--button';
  const matchingElements = document.querySelectorAll(selector);
  if (typeof matchingElements[index] === 'undefined') {
    throw Error(`No matching element for selector ${selector}`);
  }

  return matchingElements[index];
};

const selectFirstPairButton = () => (selectPairButtonAtIndex(0));

export default {
  destroyComponent,
  shouldDestroyAfter,
  shouldDeletePreviousWrapper,
  ensureComponentWrapperIsDestroyedAfter,
  selectFirstPairButton,
  selectPairButtonAtIndex,
};
