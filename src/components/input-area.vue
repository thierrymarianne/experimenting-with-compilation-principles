<template>
  <fieldset class="input-area">
    <textarea
      class="input-area__textarea"
      ref="json"
      @change='getJson'
    ></textarea>
    <label for="input-area__format-button" 
           class="input-area__format-button-label">
      <input 
        class="input-area__format-button"
        id="input-area__format-button" 
        type="button" 
        value="Format JavaScript Serialized Object Notation" />
    </label>
  </fieldset>
</template>

<script>
export default {
  name: 'input-area',
  methods: {
    getJson: function () {
      console.log(this.$refs.json.value);
    }
  }
}
</script>

<style scoped type="text/scss">
  @import '../styles/input-area.scss';
</style>


