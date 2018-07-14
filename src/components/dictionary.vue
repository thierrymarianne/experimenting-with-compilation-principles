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
import {isString} from 'lodash'

export default {
    name: 'dictionary',
    props: {
        "literal-object": {
            type: Object
        }
    },
    methods: {
        getPropertyClass(property) {
            const classes = {
                'dictionary__value': true
            };

            classes['dictionary__value--string'] = isString(property.value);

            return classes;
        },
        isString: function (subject) {
            return isString(subject); 
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

<style lang="scss" scoped>
@import '../styles/dictionary.scss';
</style>
