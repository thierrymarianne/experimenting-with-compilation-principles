<template>
    <div class="dictionary-container">
        <div class="dictionary"></div>
    </div>
</template>

<script>
export default {
    name: 'dictionary',
    props: {
        dictionary: {
            type: Object
        }
    }
};
</script>

<style lang="scss" scoped>
    @import "../styles/dictionary.scss";
</style>
