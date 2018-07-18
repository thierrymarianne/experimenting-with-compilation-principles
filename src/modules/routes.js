import Content from '../components/content';
import BrowsableContent from '../components/browsable-content.vue';

export default [
  {
    path: '/',
    redirect: '/introduction',
    components: {
      default: BrowsableContent,
    },
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
        path: 'structure-of-a-compiler/phases-of-a-compiler',
        name: 'phases-of-a-compiler',
        components: {
          main: Content.StructureOfACompiler,
        },
      }, {
        path: 'structure-of-a-compiler/grouping-of-phases-into-passes',
        name: 'grouping-of-phases-into-passes',
        components: {
          main: Content.GroupingOfPhasesIntoPasses,
        },
      }, {
        path: 'structure-of-a-compiler/compiler-construction-tools',
        name: 'compiler-construction-tools',
        components: {
          main: Content.CompilerConstructionTools,
        },
      },
    ],
  }, {
    path: '*',
    redirect: '/',
  },
];
