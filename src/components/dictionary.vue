<template>
    <div class="dictionary-container">
        <div class="dictionary">
            <template v-for="(property, index) in properties">
                <div class="dictionary__key-value">
                    <span class="dictionary__key">{{ property.key }}</span>
                    <span :class="getPropertyClass(property)">{{ property.value }}</span>
                </div>
                <br v-if="(index < properties.length - 1)" />
            </template>
        </div>
    </div>
</template>

<script>
    import _ from 'lodash'
    import EventHub from '../modules/event-hub'

    export default {
        name: 'dictionary',
        props: {
            "literal-object": {
                type: Object
            }
        },
        mounted: function () {
            EventHub.$on('source.changed', this.updateDataStructure);
            EventHub.$on('source.copied', this.pasteSource)
        },
        methods: {
            pasteSource: function (event) {
                const text = event.code;
                EventHub.$emit('source.changed', {text: text});
            },
            updateDataStructure: function (event) {
                const previousDataStructure = this.dataStructure;

                if (this.$route.name !== 'about') {
                    return;
                }

                try {
                    event.json = event.text
                        // Replace names non-enclosed in quotes with names enclosed in quotes
                        .replace(/([^\{,"'\s\{]+)\s*:/g, '"$1":')
                        // Replace values having a non-number with the value enclosed in quotes
                        .replace(/:\s*((?:[^,\s"'\}]*[^0-9,\s"'\}]{1,}[^\s,"'\}]*){1,})/g, ': "$1"')
                        // Replace values starting with Number followed by non-number with 
                        // same values enclosed in quotes
                        .replace(/:\s*(?=[1-9]{1,}}[^\d\}]{1,})([^"',\s\}]{1,})/g, ': "$1"')
                        .replace(/:\s*(?![1-9]{1,})([^"',\s\}]{1,})/g, ': "$1"')
                        .replace(/'/g, '"')

                    this.dataStructure = JSON.parse(event.json);
                    EventHub.$emit('parsing.succeeded', { 'parsedJson': this.dataStructure });
                } catch (error) {
                    this.dataStructure = previousDataStructure;
                    EventHub.$emit('parsing.failed', { error: error });
                }
            },
            getPropertyClass: function (property) {
                const classes = {
                    'dictionary__value': true
                };

                classes['dictionary__value--string'] = _.isString(property.value);

                return classes;
            },
            isString: function (subject) {
                return _.isString(subject);
            }
        },
        computed: {
            properties: function () {
                const properties = [];

                if (typeof this.dataStructure === 'undefined') {
                    return properties;
                }

                for (const property in this.dataStructure) {
                    properties.push({
                        key: property,
                        value: this.dataStructure[property]
                    });
                }

                return properties;
            }
        },
        data: function () {
            return {
                dataStructure: this.literalObject
            }
        }
    };
</script>

<style scoped lang="scss">
    @import '../styles/dictionary.scss';
</style>