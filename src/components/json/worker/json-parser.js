import parseJson from './parse-json';

const JsonParser = function (self) {
  self.addEventListener('message', event => (parseJson(event, self)));
};

export default JsonParser;
