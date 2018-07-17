<template>
  <div class='structure-of-a-compiler'>
    <section class='structure-of-a-compiler__left-column'>
      <button
        v-if='exampleIsVisible'
        v-on:click='toggleExampleVisibility' 
        class='structure-of-a-compiler__example'>Hide example</button>
      <button 
        v-else 
        v-on:click='toggleExampleVisibility' 
        class='structure-of-a-compiler__example'>Show example</button>
      <div class='structure-of-a-compiler__phase'>
        <template
          v-for='step in sequences[sequence]'
        >
          <arrow v-if='!step.isTree'>
            <template v-if='isCodeSample(step.input)'>
                <code-sample 
                  :lines='step.input' />
            </template>
            <template v-else>{{ step.input }}</template>
          </arrow>
          <template v-if='step.isTree'>
            <node-tree 
              :root='step.input' 
              :isTreeRoot='true'></node-tree>
          </template>
          <box
            :name='step.name ? step.name : null'
            v-if='step.text'
            :highlighted='isHighlighted(step.name)'
            :highlightable='isHighlightable(step.name)'
          >{{ step.text }}</box>
        </template>
        <hr class='structure-of-a-compiler__separator' />
        <symbol-table :symbols='symbols'>
          <box
            name='symbol-table-management'
            :highlighted='isHighlighted("symbol-table-management")'
            :highlightable='isHighlighted("symbol-table-management")'
          >Symbol Table</box>
        </symbol-table>
      </div>
    </section>
    <section 
      :class='columnClasses(phaseName)'
      v-for='(phaseName, index) in getPhases'
      :key='index'>
      <div class='structure-of-a-compiler__scrollable'>
        <transition name='structure-of-a-compiler__fadeable'>
          <component 
            v-bind:is='phaseName' 
            v-if='isVisible(phaseName) || phaseName == "lexical-analysis"'></component>
        </transition>
      </div>
    </section>
  </div>
</template>

<script>
import Arrow from '../structure-of-a-compiler/arrow.vue';
import Box from '../structure-of-a-compiler/box.vue';
import SymbolTable from '../structure-of-a-compiler/symbol-table.vue';
import EventHub from '../../modules/event-hub';
import NodeTree from '../structure-of-a-compiler/node-tree.vue'; 
import CodeSample from '../structure-of-a-compiler/code-sample.vue'; 
import LexicalAnalysis from './lexical-analysis.vue';
import SyntaxAnalysis from './syntax-analysis.vue';
import SemanticAnalysis from './semantic-analysis.vue';
import IntermediateCodeGeneration from './intermediate-code-generation.vue';
import CodeOptimization from './code-optimization.vue';
import CodeGeneration from './code-generation.vue';
import SymbolTableManagement from './symbol-table-management.vue';

import MutationTypes from '../../store/modules/mutation-types';

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('structure-of-a-compiler')

import { isArray } from 'lodash';

export default {
  name: 'structure-of-a-compiler',
  components: {
    arrow: Arrow,
    box: Box,
    'symbol-table': SymbolTable,
    'node-tree': NodeTree,
    'code-sample': CodeSample,
    'lexical-analysis': LexicalAnalysis,
    'syntax-analysis': SyntaxAnalysis,
    'semantic-analysis': SemanticAnalysis,
    'intermediate-code-generation': IntermediateCodeGeneration,
    'code-optimization': CodeOptimization,
    'code-generation': CodeGeneration,
    'symbol-table-management': SymbolTableManagement,
  },
  mounted: function () {
    EventHub.$on('phase.unhighlighted', this.scrollToTop);
  },
  computed: {
    ...mapGetters([
      'visibleDescription',
      'visibilityOfDescriptions',
      'exampleIsVisible',
      'sequence'
    ]),
    getPhases() {
      return Object.keys(this.visibilityOfDescriptions);
    }
  },
  methods: {
    scrollToTop: function () {
      window.scrollTo(0, 0);
    },
    isHighlighted: function (target) {
      if (typeof this.visibilityOfDescriptions[target] !== "undefined") {
        return this.visibilityOfDescriptions[target];
      }

      return undefined;
    },
    isHighlightable: function (target) {
      if (typeof this.visibilityOfDescriptions[target] !== "undefined") {
        return !this.visibilityOfDescriptions[target];
      }

      return undefined;
    },
    isVisible: function (phaseName) {
      return phaseName === this.visibleDescription;
    },
    columnClasses: function (phaseName) {
      const classes = { 
        'structure-of-a-compiler__right-column': true,
        'structure-of-a-compiler__right-column--visible': this.visibilityOfDescriptions[phaseName] 
      }

      if (this.visibleDescription === null && phaseName !== 'lexical-analysis') {
        classes['structure-of-a-compiler__right-column--hidden'] = true;

        return classes;
      }

      if (this.visibleDescription !== null && this.visibleDescription !== phaseName) {
        classes['structure-of-a-compiler__right-column--hidden'] = true;

        return classes;
      }

      return classes;
    },
    ...mapMutations({
      toggleExampleVisibility: MutationTypes.TOGGLE_EXAMPLE_VISIBILITY,
    }),
    isCodeSample: function (input) {
      return isArray(input);
    },
  },
  props: {
    symbols: {
      type: Array,
      default: function () {
        return [
          'position',
          'initial',
          'rate',
          ' '
        ];
      }
    },
    sequences: {
      type: Object,
      default: function () {
        return {
          phases_of_a_compiler: [
            {
              input: 'character stream',
              text: 'Lexical analyzer',
              name: 'lexical-analysis',
            }, {
              input: 'token stream',
              text: 'Syntax analyzer',
              name: 'syntax-analysis',
            }, {
              input: 'syntax tree',
              text: 'Semantic analyzer',
              name: 'semantic-analysis',
            }, {
              input: 'syntax tee',
              text: 'Intermediate Code Generator',
              name: 'intermediate-code-generation',
            }, {
              input: 'intermediate representation',
              text: 'Machine-Independent Code Optimizer',
              name: 'code-optimization',
            }, {
              input: 'intermediate representation',
              text: 'Code Generator',
              name: 'code-generation',
            }, {
              input: 'target-machine code',
              text: 'Machine dependent Code Optimizer',
            }, {
              input: 'target-machine code'
            }
          ],
          translation_of_a_an_assignment_statement: [
            {
              input: 'position = initial + rate * 60',
              text: 'Lexical analyzer',
              name: 'lexical-analysis',
            }, {
              input: '⟨id, 1⟩ ⟨=⟩ ⟨id, 2⟩ ⟨+⟩ ⟨id, 3⟩ ⟨*⟩ ⟨60⟩',
              text: 'Syntax analyzer',
              name: 'syntax-analysis',
            }, {
              isTree: true,
              input: {
                '=': {
                  left: '⟨id, 1⟩',
                  right: {
                    '⟨+⟩': {
                      left: '⟨id, 2⟩', 
                      right: {
                        '⟨*⟩': {
                          left: '⟨id, 3⟩',
                          right: '60'
                        }
                      }
                    }
                  }
                }
              },
              text: 'Semantic analyzer',
              name: 'semantic-analysis',
            }, {
              isTree: true,
              input: {
                '=': {
                  left: '⟨id, 1⟩',
                  right: {
                    '⟨+⟩': {
                      left: '⟨id, 2⟩', 
                      right: {
                        '⟨*⟩': {
                          left: '⟨id, 3⟩',
                          right: {
                            'inttofloat': {
                              onlyChild: '60'
                            }
                          }
                        }
                      }
                    }
                  }
                },
              },
              name: 'intermediate-code-generation',
              text: 'Intermediate Code Generator',
            }, {
              input: [
                't1 = inttofloat(60)',
                't2 = id3 * t1',
                't3 = id2 + t2',
                'id1 = t3',
              ],
              text: 'Code Optimizer',
              name: 'code-optimization',
            }, {
              input: [
                't1 = id3 * 60.0',
                'id1 = t1 + t2',
              ],
              text: 'Code Generator',
              name: 'code-generation',
            }, {
              input: [
                'LDF R2, id3',
                'MULF R2, R2, #60.0',
                'LDF R1, id2',
                'ADDF R1, R1, R2',
                'STF id1, R1',
              ]
            }
          ]
        };
      }    
    }
  }
}
</script>

<style scoped type='text/scss'>
  @import '../../styles/structure-of-a-compiler.scss';
</style>