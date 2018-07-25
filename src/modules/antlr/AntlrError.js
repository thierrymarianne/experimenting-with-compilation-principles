const AntlrError = class extends SyntaxError {
  constructor(message, fileName, lineNumber, previous) {
    super(message, fileName, lineNumber);
    if (typeof previous !== 'undefined') {
      this.previous = previous;
      this.stack = `${previous.stack}\n\n${this.stack}`;
    }
  }
};

export default AntlrError;
