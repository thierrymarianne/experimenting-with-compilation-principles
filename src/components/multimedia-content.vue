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

    if (typeof this.$slots.default === 'undefined') {
      this.$slots.default = [];
    }

    groupedVNodes = this.$slots.default.reduce((groupedVNodes, vnode) => {
      if (vnode.tag === 'br') {
        paragraphIndexes++;

        return groupedVNodes;
      }

      if (vnode.tag === 'h3') {
        paragraphIndexes++;
        groupedVNodes[paragraphIndexes] = [vnode];
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

    const paragraphs = groupedVNodes.map(function (VNodes) {
      if (VNodes[0].tag === 'h3') {
        return VNodes[0];
      }

      return createElement(
        'paragraph',
        { class: 'multimedia-content__paragraph' },
        VNodes
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