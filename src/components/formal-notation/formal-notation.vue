<script>
export default {
  name: 'formal-notation',
  class: 'form-notation',
  render: function (createElement) {
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
}
</script>

<style scoped lang='scss'>
  @import 'formal-notation.scss';
</style>