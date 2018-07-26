import Content from '../components/content';
import BrowsableContent from '../components/browsable-content/browsable-content.vue';
import NavigationMenu from './navigation-menu';

const routesCollection = {};
[
  'programming-language-basics',
  'a-simple-syntax-directed-translator',
  'lexical-analysis',
].reduce((collection, chapter) => {
  collection[chapter] = ((path) => {
    const routes = {
      path,
      component: BrowsableContent,
      props: {
        showNavigationMenu: false,
      },
      children: NavigationMenu.routes[path](path),
    };
    return routes;
  })(chapter);

  return routesCollection;
}, routesCollection);

const defaultRedirect = '/lexical-analysis/json-parser';
export default [
  {
    path: '/',
    redirect: defaultRedirect,
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
      },
      routesCollection['programming-language-basics'],
      routesCollection['a-simple-syntax-directed-translator'],
      routesCollection['lexical-analysis'],
    ],
  }, {
    path: '*',
    redirect: defaultRedirect,
  },
];
