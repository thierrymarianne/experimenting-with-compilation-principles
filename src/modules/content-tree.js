import Content from '../components/content';

const programmingLanguageBasicsChildren = [
  {
    name: 'dynamic-scope',
    text: 'Dynamic Scope',
    path: '/programming-language-basics/dynamic-scope',
    components: {
      content: Content.DynamicScope,
    },
  }, {
    name: 'environments-and-states',
    text: 'Environment and States',
    path: '/programming-language-basics/environments-and-states',
    components: {
      content: Content.EnvironmentsAndStates,
    },
  }, {
    name: 'static-scope-and-block-structure',
    text: 'Static Scope and Block Structure',
    path: '/programming-language-basics/static-scope-and-block-structure',
    components: {
      content: Content.StaticScopeAndBlockStructure,
    },
  }, {
    name: 'declarations-and-definitions',
    text: 'Declarations and Definitions',
    path: '/programming-language-basics/declarations-and-definitions',
    components: {
      content: Content.DeclarationsAndDefinitions,
    },
  }, {
    name: 'anology-between-static-and-dynamic-scoping',
    text: 'Analogy Betweem Static and Dynamic Scoping',
    path: '/programming-language-basics/anology-between-static-and-dynamic-scoping',
    components: {
      content: Content.AnalogyBetweenStaticAndDynamicScoping,
    },
  }, {
    name: 'call-by-value',
    text: 'Call-by-Value',
    path: '/programming-language-basics/call-by-value',
    components: {
      content: Content.CallByValue,
    },
  }, {
    name: 'call-by-reference',
    text: 'Call-by-Reference',
    path: '/programming-language-basics/call-by-reference',
    components: {
      content: Content.CallByReference,
    },
  }, {
    name: 'aliasing',
    text: 'Aliasing',
    path: '/programming-language-basics/aliasing',
    components: {
      content: Content.Aliasing,
    },
  },
];

const programmingLanguageBasicsChildrenNames = programmingLanguageBasicsChildren.map((route) => {
  const name = route.name;
  return name;
});

const aSimpleSyntaxDirectedTranslatorChildren = [
  {
    name: 'a-model-of-a-compiler-front-end',
    text: 'A Model of a Compiler Front End',
    path: '/a-simple-syntax-directed-translator/a-model-of-a-compiler-front-end',
    components: {
      content: Content.AModelOfACompilerFrontEnd,
    },
  }, {
    name: 'syntax-definition',
    text: 'Syntax Definition',
    path: '/a-simple-syntax-directed-translator/syntax-definition',
    components: {
      content: Content.SyntaxDefinition,
    },
  }, {
    name: 'definition-of-grammars',
    text: 'Definition of Grammars',
    path: '/a-simple-syntax-directed-translator/definition-of-grammars',
    components: {
      content: Content.DefinitionOfGrammars,
    },
  }, {
    name: 'tokens-versus-terminal',
    text: 'Tokens versus Terminals',
    path: '/a-simple-syntax-directed-translator/tokens-versus-terminals',
    components: {
      content: Content.TokensVersusTerminals,
    },
  }, {
    name: 'parse-trees',
    text: 'Parse Trees',
    path: '/a-simple-syntax-directed-translator/parse-trees',
    components: {
      content: Content.ParseTrees,
    },
  }, {
    name: 'ambiguity',
    text: 'Ambiguity',
    path: '/a-simple-syntax-directed-translator/ambiguity',
    components: {
      content: Content.Ambiguity,
    },
  }, {
    name: 'a-translator-for-simple-expressions',
    text: 'A Translator for Simple Expressions',
    path: '/a-simple-syntax-directed-translator/a-translator-for-simple-expressions',
    components: {
      content: Content.ATranslatorForSimpleExpressions,
    },
  }, {
    name: 'associativity-of-operators',
    text: 'Associativity of Operators',
    path: '/a-simple-syntax-directed-translator/associativity-of-operators',
    components: {
      content: Content.AssociativityOfOperators,
    },
  }, {
    name: 'precedence-of-operators',
    text: 'Precedence of Operators',
    path: '/a-simple-syntax-directed-translator/precedence-of-operators',
    components: {
      content: Content.PrecedenceOfOperators,
    },
  }, {
    name: 'lexical-analyzer',
    text: 'Lexical Analysis',
    path: '/a-simple-syntax-directed-translator/lexical-analyzer',
    components: {
      content: Content.LexicalAnalyzer,
    },
  },
];

const aSimpleSyntaxDirectedTranslatorChildrenNames = aSimpleSyntaxDirectedTranslatorChildren
.map((route) => {
  const name = route.name;
  return name;
});

const lexicalAnalysisChildren = [
  {
    name: 'from-regular-expressions-to-automata',
    text: 'From Regular Expressions to Automata',
    path: '/lexical-analysis/from-regular-expressions-to-automata',
    components: {
      content: Content.FromRegularExpressionsToAutomata,
    },
  }, {
    name: 'json-parser',
    isPublic: true,
    text: 'JSON parser',
    path: '/lexical-analysis/json-parser',
    components: {
      content: Content.JsonParser,
    },
  },
];

const lexicalAnalysisChildrenNames = lexicalAnalysisChildren
.map((route) => {
  const name = route.name;
  return name;
});

const ContentTree = {
  programmingLanguageBasicsChildren,
  programmingLanguageBasicsChildrenNames,
  aSimpleSyntaxDirectedTranslatorChildren,
  aSimpleSyntaxDirectedTranslatorChildrenNames,
  lexicalAnalysisChildren,
  lexicalAnalysisChildrenNames,
};

export default ContentTree;
