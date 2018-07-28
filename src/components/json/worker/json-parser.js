import antlr from '../../../modules/antlr';

const JsonParser = function (self) {
  self.addEventListener(
    'message',
    (event) => {
      const { text, component } = event.data;
      try {
        antlr.parseJSON(text, component);
        self.postMessage({
          eventType: 'parsing.antlr.succeeded',
          template: component.$refs.jsonEditor.template,
        });
      } catch (error) {
        self.postMessage({
          eventType: 'parsing.antlr.failed',
          errorMessage: error.message,
        });
      }
    },
  );
};

export default JsonParser;
