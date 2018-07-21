import Content from '../components/content';
import BrowsableContent from '../components/browsable-content.vue';

export default [
  {
    path: '/',
    redirect: '/introduction',
    component: BrowsableContent,
    children: [
      {
        path: 'introduction',
        name: 'introduction',
        component: Content.Introduction,
      }, {
        path: 'about',
        name: 'about',
        components: {
          default: Content.About,
        },
      }, {
        path: 'structure-of-a-compiler',
        component: BrowsableContent,
        props: {
          showNavigationMenu: false,
        },
        children: [
          {
            path: 'phases-of-a-compiler',
            name: 'phases-of-a-compiler',
            components: {
              content: Content.StructureOfACompiler,
            },
          }, {
            path: 'grouping-of-phases-into-passes',
            name: 'grouping-of-phases-into-passes',
            components: {
              content: Content.GroupingOfPhasesIntoPasses,
            },
          }, {
            path: 'compiler-construction-tools',
            name: 'compiler-construction-tools',
            components: {
              content: Content.CompilerConstructionTools,
            },
          },
        ],
      }, {
        path: 'the-science-of-building-a-compiler',
        name: 'the-science-of-building-a-compiler',
        components: {
          default: Content.TheScienceOfCodeOptimization,
        },
      }, {
        path: 'the-evolution-of-programming-languages',
        component: BrowsableContent,
        props: {
          showNavigationMenu: false,
        },
        children: [
          {
            path: 'the-move-to-higher-level-languages',
            name: 'the-move-to-higher-level-languages',
            components: {
              content: Content.TheMoveToHigherLevelLanguages,
            },
          }, {
            path: 'impacts-on-compilers',
            name: 'impacts-on-compilers',
            components: {
              content: Content.ImpactsOnCompilers,
            },
          },
        ],
      }, {
        path: 'applications-of-compiler-technology',
        component: BrowsableContent,
        props: {
          showNavigationMenu: false,
        },
        children: [
          {
            path: 'implementation-of-high-level-programming-languages',
            name: 'implementation-of-high-level-programming-languages',
            components: {
              content: Content.ImplementationOfHighLevelProgrammingLanguages,
            },
          }, {
            path: 'optimizations-for-computer-architectures',
            name: 'optimizations-for-computer-architectures',
            components: {
              content: Content.OptimizationsForComputerArchitectures,
            },
          }, {
            path: 'program-translations',
            name: 'program-translations',
            components: {
              content: Content.ProgramTranslations,
            },
          }, {
            path: 'software-productivity-tools',
            name: 'software-productivity-tools',
            components: {
              content: Content.SoftwareProductivityTools,
            },
          },
        ],
      }, {
        path: 'a-simple-syntax-directed-translator',
        component: BrowsableContent,
        props: {
          showNavigationMenu: false,
        },
        children: [
          {
            path: 'associativity-of-operators',
            name: 'associativity-of-operators',
            components: {
              content: Content.AssociativityOfOperators,
            },
          }, {
            path: 'precedence-of-operators',
            name: 'precedence-of-operators',
            components: {
              content: Content.PrecedenceOfOperators,
            },
          }, {
            path: 'a-translator-for-simple-expressions',
            name: 'a-translator-for-simple-expressions',
            components: {
              content: Content.ATranslatorForSimpleExpressions,
            },
          }, {
            path: 'lexical-analysis',
            name: 'lexical-analysis',
            components: {
              content: Content.ASimpleSyntaxDirectedTranslator,
            },
          },
        ],
      },
    ],
  }, {
    path: '*',
    redirect: '/introduction',
  },
];
