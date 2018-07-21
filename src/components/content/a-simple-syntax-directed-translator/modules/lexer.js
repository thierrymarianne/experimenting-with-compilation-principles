const TAG_ID = 'ID';
const TAG_NUM = 'NUM';
const TAG_FUNCTION = 'function';

const Tags = {
  TAG_FUNCTION,
  TAG_ID,
  TAG_NUM,
};

class Token {
  constructor(tag) {
    this.tag = tag;
  }
}

class Num extends Token {
  constructor(value) {
    super(TAG_NUM);
    this.value = parseInt(value, 10);
  }
}

class Word extends Token {
  constructor(tag, lexeme) {
    super(tag);
    this.lexeme = lexeme;
  }
}

const isTerminal = (expectedTerminal, token) => {
  let tag = token;
  if (token instanceof Token) {
    tag = token.tag;
  }

  return tag === expectedTerminal;
};
const isDigit = subject => (parseInt(subject, 10) in [...Array(10).keys()]);
const isLetter = (subject) => {
  const CHAR_CODE_A_CAPITAL = 65;
  const CHAR_CODE_Z_CAPITAL = 65 + 25;
  const CHAR_CODE_A = 97;
  const CHAR_CODE_Z = 97 + 25;

  if (typeof subject === 'undefined' || (typeof subject !== 'string')) {
    return false;
  }

  const charCode = subject.charCodeAt();
  const isLowercaseLetter = charCode >= CHAR_CODE_A && charCode <= CHAR_CODE_Z;
  const isUppercaseLetter = charCode >= CHAR_CODE_A_CAPITAL && charCode <= CHAR_CODE_Z_CAPITAL;

  return isLowercaseLetter || isUppercaseLetter;
};
const isNumber = subject => (subject instanceof Token && subject.tag === Tags.TAG_NUM);
const isIdentifier = subject => (subject instanceof Token && subject.tag === Tags.TAG_ID);
const isKeyword = subject => (
  subject instanceof Token && [Tags.TAG_FUNCTION].indexOf(subject.tag) !== -1
);

class Lexer {
  constructor(reader) {
    this.line = 1;
    this.peek = ' ';
    this.reader = reader;
    this.words = {
      function: new Word(TAG_FUNCTION, 'function'),
    };
  }

  scan() {
    while (true) {
      const foundWhiteSpace = (peek) => {
        if (peek === ' ' || peek === '\t') {
          return 0;
        }

        if (peek === '\n') {
          return 1;
        }

        return null;
      };

      this.peek = this.reader.scan();
      const newLine = foundWhiteSpace(this.peek);

      if (newLine === null) {
        break;
      }

      this.line = this.line + newLine;
    }

    // if (this.peek === '/') {
    //   this.reader.peek
    // }

    if (isDigit(this.peek)) {
      let numericValue = 0;
      do {
        numericValue = 10 * numericValue + parseInt(this.peek, 10);
        this.peek = this.reader.scan();
      } while (isDigit(this.peek));

      this.reader.rewind();

      return new Num(numericValue);
    }

    if (isLetter(this.peek)) {
      let lexeme = '';

      do {
        lexeme += this.peek;
        this.peek = this.reader.scan();
      } while (isLetter(this.peek) || isDigit(this.peek));

      this.reader.rewind();

      let word = this.words[lexeme];
      if (typeof word !== 'undefined') {
        return word;
      }

      word = new Word(TAG_ID, lexeme);
      this.words[lexeme] = word;

      return word;
    }

    const token = new Token(this.peek);
    this.peek = ' ';

    return token;
  }
}

export {
  isDigit,
  isNumber,
  isKeyword,
  isIdentifier,
  isTerminal,
  Lexer,
  Tags,
  Token,
};
