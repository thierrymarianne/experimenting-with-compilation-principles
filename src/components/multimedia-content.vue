<script>
import Paragraph from './paragraph.vue';

export default {
  name: 'multimedia-content',
  components: {
    paragraph: Paragraph
  },
  render: function (createElement) {
    let paragraphIndexes = 0;
    let groupedVNodes = [];
    groupedVNodes = this.$slots.default.reduce((groupedVNodes, vnode) => {
      if (vnode.tag === 'br') {
        paragraphIndexes++;

        return groupedVNodes;
      }

      if (typeof groupedVNodes[paragraphIndexes] === 'undefined') {
        groupedVNodes[paragraphIndexes] = [vnode];

        return groupedVNodes;
      }

      groupedVNodes[paragraphIndexes].push(vnode);

      return groupedVNodes;
    }, groupedVNodes);

    const paragraphs = groupedVNodes.map(function (vodes) {
      return createElement(
        'paragraph',
        { class: 'multimedia-content__paragraph' },
        vodes
      );
    });

    return createElement(
      'div',
      { 
        class: 'multimedia-content',
      },
      paragraphs
    );
  }
}
</script>
  
<style module>
  @import '../styles/content/multimedia-content-module.scss';
</style>