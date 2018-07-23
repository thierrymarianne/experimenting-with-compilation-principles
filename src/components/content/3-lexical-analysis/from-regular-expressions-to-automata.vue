<template>
  <div class='from-regular-expressions-to-automata content content--no-first-letter'>
    <input-area></input-area>
    <br />
    <multimedia-content>Visualization implemented with <browsable-link href='https://github.com/hokein/Automata.js'>Automata.js</browsable-link>
and <browsable-link href='https://github.com/mdaines/viz.js'>Viz.js</browsable-link>
    </multimedia-content>
    <div
      class='from-regular-expressions-to-automata__visualizations'
      v-show='inputText.length > 0'
    >
      <transition-table :transitions='transitions'></transition-table>
      <div 
        class='from-regular-expressions-to-automata__visualization' 
        ref='visualization-dfa'>
      </div>
      <div
        class='from-regular-expressions-to-automata__visualization from-regular-expressions-to-automata__visualization--dfa' 
        ref='visualization-nfa'>
      </div>
    </div>
  </div>
</template>

<script>
import BrowsableLink from '../../browsable-link.vue';
import MultimediaContent from '../../multimedia-content.vue';
import InputArea from '../../input-area.vue';
import TransitionTable from './transition-table/transition-table.vue';
import EventHub from '../../../modules/event-hub';
import regParser from 'automata.js';
import Viz from 'viz.js';
const { Module, render } = require('viz.js/full.render.js');

export default {
  name: 'from-regular-expressions-to-automata',
  components: {
    BrowsableLink,
    InputArea,
    MultimediaContent,
    TransitionTable,
  },
  data: function () {
    return {
      inputText: '',
      transitions: {},
    };
  },
  mounted: function () {
    EventHub.$on('source.changed', this.parseInput);
  },
  methods: {
    resetGraphic: function (suffix) {
      if (typeof this.$refs[`visualization${suffix}`] !== 'undefined') {
          [...Array(this.$refs[`visualization${suffix}`].children.length).keys()]
          .map((index) => { 
            this.$refs[`visualization${suffix}`]
            .children[index].remove();
          })
        }
    },
    parseInput: function (input) {
      this.resetGraphic('-dfa');
      this.resetGraphic('-nfa');

      this.inputText = input.text.trim();

      if (this.inputText.trim().length === 0) {
        return;
      }

      [
        {
          suffix: '-dfa',
          parsingMethod: 'parseToDFA',
        }, {
          suffix: '-nfa',
          parsingMethod: 'parseToNFA',
      },
      ].map((automatonProperties) => {
        const parser = new regParser.RegParser(this.inputText);
        const automaton = parser[automatonProperties.parsingMethod]();
        const viz = new Viz({ Module, render });

        if (automatonProperties.suffix == '-dfa') {
          const transitionSourceStates = Object.keys(automaton.transitions);
          const transitionTable = transitionSourceStates.reduce((acc, from) => {
              for (const to in automaton.transitions[from]) {
                const symbol = automaton.transitions[from][to];
                if (typeof acc[from] === 'undefined') {
                  acc[from] = {};
                }

                if (typeof acc[from][symbol] === 'undefined') {
                  acc[from][symbol] = [to];
                  continue;
                }

                acc[from][symbol].push(to);
              }

              return acc;
            },
            {}
          );

          this.transitions = transitionTable;
        }

        viz.renderSVGElement(automaton.toDotScript())
        .then(element => {
          const referenceIndex = `visualization${automatonProperties.suffix}`;
          if (typeof this.$refs[referenceIndex] !== 'undefined') {
            this.$refs[referenceIndex].appendChild(element);
          }
        })
        .catch(error => {
          throw error;
        });
      });
    }
  },
}
</script>

<style>
@import './../../styles/content/from-regular-expressions-to-automata.scss';
</style>