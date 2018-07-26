import Raven from 'raven-js';

const state = {
  tableOfContentsIsVisible: false,
  template: '<div class="json__container"></div>',
  json: '{}',
  noPendingCopy: true,
  log(message, file, extra) {
    Raven.captureMessage(
      message,
      {
        level: 'info',
        logger: file,
        extra,
      },
    );
  },
};

export default {
  state,
};
