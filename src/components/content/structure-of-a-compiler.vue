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
            :highlighted='typeof visibilityOfDescriptions[step.name] !== "undefined" ? visibilityOfDescriptions[step.name] : undefined'
            :highlightable='typeof visibilityOfDescriptions[step.name] !== "undefined" ? ! visibilityOfDescriptions[step.name] : undefined'
            :ref='step.name ? step.name : null'>{{ step.text }}</box>
        </template>
      </div>
    </section>
    <section
      :class='columnClasses("lexical-analyzer")'>
      <lexical-analyzer></lexical-analyzer>
    </section>
    <section
      :class='columnClasses("syntax-analyzer")'>
      <syntax-analyzer></syntax-analyzer>
    </section>
    <section
      :class='columnClasses("semantic-analyzer")'>
      <semantic-analyzer></semantic-analyzer>
    </section>
  </div>
</template>

<script>
import Arrow from '../structure-of-a-compiler/arrow.vue';
import Box from '../structure-of-a-compiler/box.vue';
import EventHub from '../../modules/event-hub'; 
import NodeTree from '../structure-of-a-compiler/node-tree.vue'; 
import CodeSample from '../structure-of-a-compiler/code-sample.vue'; 
import LexicalAnalyzer from './lexical-analyzer.vue';
import SyntaxAnalyzer from './syntax-analyzer.vue';
import SemanticAnalyzer from './semantic-analyzer.vue';

import MutationTypes from '../../store/modules/mutation-types';

import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapMutations } = createNamespacedHelpers('structure-of-a-compiler')

import { isArray } from 'lodash';

export default {
  name: 'structure-of-a-compiler',
  components: {
    arrow: Arrow,
    box: Box,
    'node-tree': NodeTree,
    'code-sample': CodeSample,
    'lexical-analyzer': LexicalAnalyzer,
    'syntax-analyzer': SyntaxAnalyzer,
    'semantic-analyzer': SemanticAnalyzer,
  },
  computed: {
    ...mapGetters([
      'visibleDescription',
      'visibilityOfDescriptions',
      'exampleIsVisible',
      'sequence'
    ]),
  },
  methods: {
    columnClasses: function (phaseName) {
      const classes = { 
        'structure-of-a-compiler__right-column': true,
        'structure-of-a-compiler__right-column--visible': this.visibilityOfDescriptions[phaseName] 
      }

      if (this.visibleDescription === null && phaseName !== 'lexical-analyzer') {
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
    sequences: {
      type: Object,
      default: function () {
        return {
          phases_of_a_compiler: [
            {
              input: 'character stream',
              text: 'Lexical Analyzer',
              name: 'lexical-analyzer',
            }, {
              input: 'token stream',
              text: 'Syntax Analyzer',
              name: 'syntax-analyzer',
            }, {
              input: 'syntax tree',
              text: 'Semantic Analyzer',
              name: 'semantic-analyzer',
            }, {
              input: 'syntax tee',
              text: 'Intermediate Code Generator',
            }, {
              input: 'intermediate representation',
              text: 'Machine-Independent Code Optimizer'
            }, {
              input: 'intermediate representation',
              text: 'Code Generator',
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
              text: 'Lexical Analyzer',
              name: 'lexical-analyzer',
            }, {
              input: '⟨id, 1⟩ ⟨=⟩ ⟨id, 2⟩ ⟨+⟩ ⟨id, 3⟩ ⟨*⟩ ⟨60⟩',
              text: 'Syntax Analyzer',
              name: 'syntax-analyzer',
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
              text: 'Semantic Analyzer',
              name: 'semantic-analyzer',
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
                }
              },
              text: 'Intermediate Code Generator',
            }, {
              input: [
                't1 = inttofloat(60)',
                't2 = id3 * t1',
                't3 = id2 + t2',
                'id1 = t3',
              ],
              text: 'Code Optimizer'
            }, {
              input: [
                't1 = id3 * 60.0',
                'id1 = t1 + t2',
              ],
              text: 'Code Generator',
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