import Content from '../components/content';
import BrowsableContent from '../components/browsable-content.vue';

export default [
  {
    path: '/',
    component: BrowsableContent,
    children: [
      {
        path: 'introduction',
        name: 'introduction',
        component: Content.Introduction,
      },
      {
        path: 'about',
        name: 'about',
        component: Content.About,
      },
    ],
  },
];
