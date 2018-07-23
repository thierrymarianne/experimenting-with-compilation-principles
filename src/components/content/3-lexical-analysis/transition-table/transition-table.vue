<template>
  <div class='transition-table'>
    <div class='transition-table__row transition-table__row--header'>
      <div class='transition-table__state'>State</div>
      <div 
        v-for='symbol in symbols'
        class='transition-table__symbol'
      >
        {{ symbol }}
      </div>
    </div>
    <div
      class='transition-table__row'         
      v-for='(state, index) in Object.keys(transitions)'
      :class='{ "transition-table__row--last": index === Object.keys(transitions).length - 1 }'
    >
      <div class='transition-table__state'>
        {{ state }}
      </div>
      <div 
        class='transition-table__destination'
        v-for='(destination, symbol) in transitionRows[state]'
        v-html='destination'
      >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'transition-table',
  props: {
    transitions: Object,
    required: true,
  },
  computed: {
    symbols: function () {
      const transitions = this.transitions;
      const sources = Object.keys(this.transitions);
      const symbols = sources.reduce((acc, index) => {
        Object.keys(transitions[index]).map((symbol) => {
          if (acc.indexOf(symbol) === -1) {
            acc.push(symbol);
          }
        });
        return acc;
      }, []);
      return symbols.sort();
    },
    transitionRows: function () {
      const rows = {};
      const transitions = this.transitions;
      const sourceStates = Object.keys(this.transitions);
      sourceStates.map((sourceState) => {
        this.symbols.map((symbol) => {
          if (typeof transitions[sourceState] === 'undefined'
          || typeof transitions[sourceState][symbol] === 'undefined') {
            if (typeof rows[sourceState] === 'undefined') {
              rows[sourceState] = {};              
            }
            rows[sourceState][symbol] = '&#8709;'; // empty set
            return;
          }
          if (typeof rows[sourceState] == 'undefined') {
            rows[sourceState] = {};
          }
          rows[sourceState][symbol] = transitions[sourceState][symbol][0];
        })      
      });
      return rows;
    }
  }
}
</script>

<style scoped lang='scss'>
@import 'transition-table.scss';
</style>