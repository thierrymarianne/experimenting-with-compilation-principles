import Vue from 'vue';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowAltCircleUp,
  faArrowAltCircleDown,
  faCopy,
  faEyeSlash,
  faEye,
  faTrash,
  faUndo,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import styles from './global.css';

// See https://fontawesome.com/how-to-use/on-the-web/using-with/vuejs
library.add(faArrowAltCircleUp);
library.add(faArrowAltCircleDown);
library.add(faCopy);
library.add(faEye);
library.add(faEyeSlash);
library.add(faTrash);
library.add(faUndo);
library.add(faPlus);

Vue.component('font-awesome-icon', FontAwesomeIcon);

export default {
  Styles: styles,
  components: {
    'font-awesome-icon': FontAwesomeIcon,
  },
};
