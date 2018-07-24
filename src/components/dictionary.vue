<template>
    <div class="dictionary-container">
        <div
           class="dictionary"
           v-if='activeParser'
           v-html='html'
        >
        </div>
        <div
           class="dictionary"
           v-else
        >
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
import antlr from '../modules/antlr'

export default {
    name: 'dictionary',
    props: {
        "literal-object": {
            type: Object
        },
        activeParser: {
            type: Boolean,
            default: false,
        },
    },
    mounted: function () {
        EventHub.$on('source.changed', this.updateDataStructure);
        EventHub.$on('source.changed', this.parseChangedSource);
        EventHub.$on('source.copied', this.pasteSource);
    },
    methods: {
        parseChangedSource: function (event) {
            this.parseJson(event.text, this);
        },
        parseJson: function (text, component) {
            component.$data.html = '';
            try {
                antlr.parseJSON(text, component);
            } catch (error) {
                if (error instanceof antlr.AntlrError) {
                    EventHub.$emit(
                        'parsing.antlr.failed',
                        { errorMessage: error.message }
                    );
                    return;
                }

                throw error;
            }

            EventHub.$emit('parsing.antlr.succeeded');
        },
        pasteSource: function (event) {
            const text = event.code;

            if (this.activeParser) {
                this.parseJson(text, event.ref)
                return;
            }

            EventHub.$emit('source.changed', {text: text});
        },
        updateDataStructure: function (event) {
            const previousDataStructure = this.dataStructure;

            if (this.$route.name !== 'about' || this.activeParser) {
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
            dataStructure: this.literalObject,
            html: '',
        }
    }
};
</script>

<style scoped lang="scss">
    @import '../styles/dictionary.scss';
</style>