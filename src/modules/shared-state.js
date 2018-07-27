import Raven from 'raven-js';

const state = {
  productionMode: false,
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
  error(error, file) {
    Raven.captureException(
      error,
      {
        logger: file,
      },
    );
  },
};

export default {
  state,
};
