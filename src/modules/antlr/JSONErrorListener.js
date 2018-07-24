import antlr4 from 'antlr4/error';
import AntlrError from './AntlrError';

const JSONErrorListener = class extends antlr4.ErrorListener {
  static syntaxError(recognizer, offendingSymbol, line, column, msg) {
    throw new AntlrError(`line ${line}: ${column} ${msg}`);
  }
};

export default JSONErrorListener;
