<template>
  <div class='structure-of-a-compiler'>
    <section class='structure-of-a-compiler__left-column'>
      <div class='structure-of-a-compiler__phase'>
        <template
          v-for='step in sequence'
        >
          <arrow v-if='!step.isTree'>{{ step.input }}
          </arrow>
          <template v-if='step.isTree'>
            <node-tree 
              :root='step.input' 
              :isTreeRoot='true'></node-tree>
          </template>
          <box
            v-if='step.text'
            v-bind:highlightable='step.highlightable'
            v-on:click.native='showDescription(step.name)'>{{ step.text }}</box>
        </template>
      </div>
    </section>
    <section
      ref='lexical-analyzer'
      :class='{ "structure-of-a-compiler__right-column--visible": descriptions["lexical-analyzer"] }'
      class='structure-of-a-compiler__right-column'>
      <lexical-analysis></lexical-analysis>
    </section>
  </div>
</template>

<script>
import Arrow from '../arrow.vue';
import Box from '../box.vue';
import LexicalAnalysis from './lexical-analysis.vue';
import EventHub from '../../modules/event-hub'; 
import NodeTree from '../node-tree.vue'; 

export default {
  name: 'structure-of-a-compiler',
  components: {
    arrow: Arrow,
    box: Box,
    'node-tree': NodeTree,
    'lexical-analysis': LexicalAnalysis
  },
  methods: {
    showDescription: function (phaseName) {
      if (typeof this.descriptions[phaseName] !== 'undefined') {
        this.descriptions[phaseName] = !this.descriptions[phaseName];
      }
    },
    toggleExample: function (event) {
      if (event.shouldShowExample) {
        this.sequence = this.translation_of_a_an_assignment_statement;

        return;
      } 

      this.sequence = this.phases_of_a_compiler;
    }
  },
  computed: {
    getPhasesOfACompiler: function () {
      return this.phasesOfACompiler;
    } 
  },
  mounted: function () {
    // this.sequence = this.phases_of_a_compiler;
    this.sequence = this.translation_of_a_an_assignment_statement;
    EventHub.$on('toggle_example_button.clicked', this.toggleExample);
  },
  data: function () {
    return {
      descriptions: {
        'lexical-analyzer': false
      },
      exampleIsVisible: false,
      sequence: {},
      phases_of_a_compiler: [
        {
          input: 'character stream',
          text: 'Lexical Analyzer',
          name: 'lexical-analyzer',          
          highlightable: true
        }, {
          input: 'token stream',
          text: 'Syntax Analyzer',
        }, {
          input: 'syntax tree',
          text: 'Semantic Analyzer',
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
        }, {
          input: '⟨id, 1⟩ ⟨=⟩ ⟨id, 2⟩ ⟨+⟩ ⟨id, 3⟩ ⟨*⟩ ⟨60⟩',
          text: 'Syntax Analyzer',
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
      ]
    };
  }
}
</script>

<style scoped type='text/scss'>
  @import '../../styles/structure-of-a-compiler.scss';
</style>