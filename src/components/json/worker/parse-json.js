import antlr from '../../../modules/antlr';

const parseJson = (event, self) => {
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
};

export default parseJson;
