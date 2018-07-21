<script>
export default {
  name: 'formal-notation',
  class: 'form-notation',
  render: function (createElement) {
    if (this.$slots.default.length === 1) {
      const slotText = this.$slots.default[0].text
        .replace(/^\n/, '')
        .replace(/->/g, '&#10230;');

      return createElement(
        'p',
        { 
          class: 'formal-notation',
          domProps: {
            innerHTML: slotText
          },
        },
      );
    }

    const children = this.$slots.default.map((VNode) => {
      if (typeof VNode.tag === 'undefined') {
        if (VNode.text.match(/->/)) {
          return createElement(
            'span',
            {
              class: 'formal-notation__imply',
              domProps: {
                innerHTML: VNode.text.trim().replace(/->/g, '&#10230;')
              }
            }
          );
        }

        return VNode;
      }

      return VNode;
    })
    
    return createElement(
      'p',
      { class: 'formal-notation' },
      children
    )
  }
}
</script>

<style scoped lang='scss'>
  @import 'formal-notation.scss';
</style>