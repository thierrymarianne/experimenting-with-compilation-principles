import Raven from 'raven-js';

const developmentMode = true;

const activeLoggers = {
  'json-editor.registerNode': false,
};
const productionMode = !developmentMode;
const punctuationDebug = true;
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
    if (typeof activeLoggers[file] === 'undefined' || !activeLoggers[file]) {
      return;
    }

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
  error(error, file, extra) {
    if (productionMode) {
      Raven.captureException(
        error,
        {
          logger: file,
          extra,
        },
      );
      return;
    }

    console.error({ error, file, extra });
  },
};

export default {
  state,
};
