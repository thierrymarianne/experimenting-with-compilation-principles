<template>
  <span 
    v-show='isVisible'
    :data-uuid='uuid'
    :ref='uuid'
    :key='uuid'
    class='json__comma'
  >,</span>
</template>

<script>
import namespaces from '../../modules/namespace';
import WithUuid from '../../mixins/with-uuid';
import Editable from './editable.js';

export default {
  name: 'comma',
  mixins: [WithUuid],
  data: () => {
    return {
      isVisible: true,
    };
  },
  computed: {
    uuid: function () {
      const namespace = namespaces[Editable.NODE_TYPES.comma];
      return this.generateUuid(this._uid, namespace);
    },
  },
};
</script>