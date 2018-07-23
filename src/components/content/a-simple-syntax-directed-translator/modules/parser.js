import {
  Lexer,
  Token,
  isDigit,
  isKeyword,
  isIdentifier,
  isTerminal,
  isNumber,
} from './lexer';

const SimpleTranslatorSyntaxError = class extends SyntaxError {
  static guardAgainstNumbersAsOperands() {
    return new SimpleTranslatorSyntaxError(SimpleTranslatorSyntaxError
      .operandsShouldBeDigitsMessage);
  }

  static guardAgainstNonAdditiveOperations() {
    return new SimpleTranslatorSyntaxError(SimpleTranslatorSyntaxError
      .operationsShouldBeAdditive);
  }

  static guardAgainstWhitespaces() {
    return new SimpleTranslatorSyntaxError(SimpleTranslatorSyntaxError
      .operationsShouldNotContainWhitespaces);
  }
};
SimpleTranslatorSyntaxError.operandsShouldBeDigitsMessage = 'This translator handles operations <br />'
+ 'on digits (not numbers).';
SimpleTranslatorSyntaxError.operationsShouldBeAdditive = 'This translator handles additive operations.';
SimpleTranslatorSyntaxError.operationsShouldNotContainWhitespaces = 'This translator does not handle whitespaces.';

const CharacterReader = class {
  constructor(program, $routeName) {
    this.programCharacters = program.split('');
    this.lookaheadPosition = 0;
    this.peekPosition = 0;
    CharacterReader.guardAgainstExceptions($routeName, program);
  }

  static guardAgainstExceptions(routeName, program) {
    if (routeName === 'a-translator-for-simple-expressions') {
      if (program.match(/[0-9]{2,}/)) {
        throw SimpleTranslatorSyntaxError.guardAgainstNumbersAsOperands();
      }

      if (program.match(/\s/)) {
        throw SimpleTranslatorSyntaxError.guardAgainstWhitespaces();
      }

      if (program.match(/[^0-9+-]/)) {
        throw SimpleTranslatorSyntaxError.guardAgainstNonAdditiveOperations();
      }

      return;
    }

    if (routeName === 'lexical-analyzer') {
      if (program.match(/[^a-zA-Z0-9+-\s]/)) {
        throw SimpleTranslatorSyntaxError.guardAgainstNonAdditiveOperations();
      }

      return;
    }

    if (routeName === 'symbol-tables') {
      if (program.match(/[^a-zA-Z0-9{}\s]/)) {
        throw SimpleTranslatorSyntaxError.guardAgainstNonAdditiveOperations();
      }
    }
  }

  scan() {
    if (this.programCharacters.length < this.lookaheadPosition + 1) {
      return null;
    }

    const lookahead = this.programCharacters[this.lookaheadPosition];

    this.lookaheadPosition = this.lookaheadPosition + 1;

    return lookahead;
  }

  rewind() {
    this.lookaheadPosition = this.lookaheadPosition - 1;
  }
};

const Parser = class {
  constructor(reader) {
    this.reader = reader;
    this.lookahead = this.reader.scan();
    this.output = '';
  }

  appendToken(token) {
    if (isNumber(token)) {
      this.output = this.output + token.value;

      return;
    }

    if (isIdentifier(token) || isKeyword(token)) {
      this.output = this.output + token.lexeme;

      return;
    }

    this.appendLastCharacter(token);
  }

  appendLastCharacter(character) {
    this.output = this.output + character;
  }

  getOutput() {
    return this.output;
  }

  parse() {
    this.expr();

    return this.output;
  }

  expr() {
    this.term();

    while (true) {
      if (isTerminal('+', this.lookahead)) {
        this.match('+'); this.term(); this.appendToken('+');
      } else if (isTerminal('-', this.lookahead)) {
        this.match('-'); this.term(); this.appendToken('-');
      } else {
        return;
      }
    }
  }

  isValidTerm() {
    return isDigit(this.lookahead)
      || isNumber(this.lookahead)
      || isIdentifier(this.lookahead);
  }

  term() {
    if (this.isValidTerm()) {
      this.appendToken(this.lookahead);
      this.match(this.lookahead);

      return;
    }

    throw new SimpleTranslatorSyntaxError('Invalid term');
  }

  match(t) {
    let lookahead = this.lookahead;
    if (this.lookahead instanceof Token && !(t instanceof Token)) {
      lookahead = this.lookahead.tag;
    }

    if (t === lookahead) {
      this.lookahead = this.reader.scan();

      return;
    }

    throw new SimpleTranslatorSyntaxError(`Unknown token: ${lookahead}`);
  }
};

export {
  CharacterReader,
  Lexer,
  Parser,
  SimpleTranslatorSyntaxError,
};
