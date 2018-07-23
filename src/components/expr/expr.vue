<script>
export default {
  name: 'expr',
  class: 'expr',
  render: function (createElement) {
    if (this.$slots.default.length === 0) {
      return;
    }

    if (this.$slots.default.length === 1) {
      const originalSlotText = this.$slots.default[0].text;
      const slotText = originalSlotText
        .replace(/epsilon/g, '&#949;')
        .replace(/->/g, '&#10230;');

      const subscriptPattern = /(\S+)_(\S+)/;
      if (originalSlotText.match(subscriptPattern)) {
        const references = {};
        let nextReference = 0;
        const separator = '-sep-'; 
        const textNodeWithReferences = originalSlotText.replace(subscriptPattern, function (matchingPart, term, index) {
          references[nextReference] = createElement(
            'span',
            { class: 'expr__subscript' },
            [
              term,
              createElement(
                'sub',
                { 
                  domProps: {
                    innerHTML: index
                  },
                },
              )
            ]
          ); 
          const reference = nextReference;
          nextReference++;

          return separator + '\\' + reference + separator;
        });

        const textNodes = textNodeWithReferences.split(separator);
        const children = textNodes.map(function (textNode) {
          for (const reference in references) {
            const pattern = `\\\\${reference}`;
            if (textNode.match(new RegExp(pattern))) {
              return references[reference];
            };

            return textNode;
          } 
        });

        return createElement(
          'p',
          { class: 'expr' },
          children
        );        
      }

      return createElement(
        'p',
        { 
          class: 'expr',
          domProps: {
            innerHTML: slotText
          },
        },
      );
    }
  }
}
</script>

<style scoped lang='scss'>
  @import 'expr.scss';
</style>
