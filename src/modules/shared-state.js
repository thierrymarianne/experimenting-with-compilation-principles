import Raven from 'raven-js';

const developmentMode = true;

const productionMode = !developmentMode;
const punctuationDebug = developmentMode;
const state = {
  debug: {
    punctuation: punctuationDebug,
  },
  productionMode: productionMode,
  tableOfContentsIsVisible: false,
  template: '<div class="json__container"></div>',
  json: '{}',
  invalidJSON: false,
  errorMessage: '',
  noPendingCopy: true,
  log(message, file, extra) {
    if (productionMode) {
      Raven.captureMessage(
        message,
        {
          level: 'info',
          logger: file,
          extra,
        },
      );
      return;
    }

    console.info({ message, file, extra });
  },
  error(error, file) {
    if (productionMode) {
      Raven.captureException(
        error,
        {
          logger: file,
        },
      );
      return;
    }

    console.error({ error, file });
  },
};

export default {
  state,
};
