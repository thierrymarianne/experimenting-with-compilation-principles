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
        props: {
          subtitle: 'Language processors',
        },
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
      },
    ],
  }, {
    path: '*',
    redirect: '/introduction',
  },
];
