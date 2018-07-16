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
        component: Content.About,
      }, {
        path: 'structure-of-a-compiler',
        name: 'structure-of-a-compiler',
        component: Content.StructureOfACompiler,
      },
    ],
  },
];
