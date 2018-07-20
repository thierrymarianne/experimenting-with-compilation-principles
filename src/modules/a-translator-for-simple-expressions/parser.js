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

const Reader = class {
  constructor(program) {
    if (program.match(/[0-9]{2,}/)) {
      throw SimpleTranslatorSyntaxError.guardAgainstNumbersAsOperands();
    }

    if (program.match(/\s/)) {
      throw SimpleTranslatorSyntaxError.guardAgainstWhitespaces();
    }

    if (program.match(/[^0-9+-]/)) {
      throw SimpleTranslatorSyntaxError.guardAgainstNonAdditiveOperations();
    }

    this.programCharacters = program.split('');
    this.lookaheadPosition = 0;
  }

  readNextToken() {
    if (this.programCharacters.length < this.lookaheadPosition + 1) {
      return null;
    }

    const lookahead = this.programCharacters[this.lookaheadPosition];

    this.lookaheadPosition = this.lookaheadPosition + 1;

    return lookahead;
  }
};

const Parser = class {
  constructor(program) {
    this.reader = new Reader(program);
    this.lookahead = this.reader.readNextToken();
    this.output = '';
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
      if (this.lookahead === '+') {
        this.match('+'); this.term(); this.appendLastCharacter('+');
      } else if (this.lookahead === '-') {
        this.match('-'); this.term(); this.appendLastCharacter('-');
      } else {
        return;
      }
    }
  }

  isLookaheadDigit() {
    return parseInt(this.lookahead, 10) in [...Array(10).keys()];
  }

  term() {
    if (this.isLookaheadDigit()) {
      this.appendLastCharacter(this.lookahead);
      this.match(this.lookahead);

      return;
    }

    throw new SimpleTranslatorSyntaxError();
  }

  match(t) {
    if (t === this.lookahead) {
      this.lookahead = this.reader.readNextToken();

      return;
    }

    throw new SimpleTranslatorSyntaxError();
  }
};

export default Parser;
