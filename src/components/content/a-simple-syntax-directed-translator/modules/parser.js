import {
  isDigit,
  Lexer,
  Tags,
  Token,
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
    if ($routeName === 'a-translator-for-simple-expressions') {
      if (program.match(/[0-9]{2,}/)) {
        throw SimpleTranslatorSyntaxError.guardAgainstNumbersAsOperands();
      }

      if (program.match(/\s/)) {
        throw SimpleTranslatorSyntaxError.guardAgainstWhitespaces();
      }

      if (program.match(/[^0-9+-]/)) {
        throw SimpleTranslatorSyntaxError.guardAgainstNonAdditiveOperations();
      }
    }

    if ($routeName === 'lexical-analysis') {
      if (program.match(/[^0-9+-\s]/)) {
        throw SimpleTranslatorSyntaxError.guardAgainstNonAdditiveOperations();
      }
    }

    this.programCharacters = program.split('');
    this.lookaheadPosition = 0;
    this.peekPosition = 0;
  }

  scan() {
    if (this.programCharacters.length < this.lookaheadPosition + 1) {
      return null;
    }

    const lookahead = this.programCharacters[this.lookaheadPosition];

    this.lookaheadPosition = this.lookaheadPosition + 1;

    return lookahead;
  }

  peek() {
    if (this.programCharacters.length < this.peekPosition + 1) {
      return null;
    }

    const lookahead = this.programCharacters[this.peekPosition];

    this.peekPosition = this.peekPosition + 1;

    return lookahead;
  }

  rewind() {
    this.peekPosition = this.peekPosition - 1;
  }
};

const Parser = class {
  constructor(reader) {
    this.reader = reader;
    this.lookahead = this.reader.scan();
    this.output = '';
  }

  appendToken(token) {
    if (token instanceof Token) {
      if (token.tag === Tags.TAG_NUM) {
        this.output = this.output + token.value;

        return;
      }

      if (token.tag === Tags.TAG_ID || token.tag === Tags.TAG_FUNCTION) {
        this.output = this.output + token.lexeme;

        return;
      }
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
    let lookahead = this.lookahead;
    if (lookahead instanceof Token) {
      lookahead = this.lookahead.tag;
    }

    while (true) {
      if (lookahead === '+') {
        this.match('+'); this.term(); this.appendToken('+');

        lookahead = this.lookahead;
        if (lookahead instanceof Token) {
          lookahead = this.lookahead.tag;
        }
      } else if (lookahead === '-') {
        this.match('-'); this.term(); this.appendToken('-');

        lookahead = this.lookahead;
        if (lookahead instanceof Token) {
          lookahead = this.lookahead.tag;
        }
      } else {
        return;
      }
    }
  }

  term() {
    if (isDigit(this.lookahead)
      || (
        this.lookahead instanceof Token
        && this.lookahead.tag === Tags.TAG_NUM
      )
    ) {
      this.appendToken(this.lookahead);
      this.match(this.lookahead);

      return;
    }

    throw new SimpleTranslatorSyntaxError();
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

    throw new SimpleTranslatorSyntaxError();
  }
};

export {
  CharacterReader,
  Lexer,
  Parser,
  SimpleTranslatorSyntaxError,
};
