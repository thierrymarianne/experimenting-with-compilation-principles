<template>
  <div class='node-tree__container'>
    <div class='node-tree__edge-container' 
         v-if='isTreeRoot'>
      <div class='node-tree__edge node-tree__edge--top'></div>
    </div>
    <div class='node-tree' :class='{ "node-tree__root": isTreeRoot}'>
      <triple-node
        v-for='(node, parent) in root' 
        :key='node.parent' 
        :left='node.left' 
        :right='node.right'
        :onlyChild='node.onlyChild'
        :parent='parent'>
      </triple-node>
    </div>
    <div class='node-tree__edge-container' v-if='isTreeRoot'>
      <div class='node-tree__edge node-tree__edge--bottom'></div>
      <div class='node-tree__tip'></div>
    </div>
  </div>    
</template>

<script>
import TripleNode from './triple-node.vue';

export default {
  name: 'node-tree',
  components: {
    'triple-node': TripleNode,
  },
  props: {
    root: {
      type: Object
    },
    isTreeRoot: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped type='text/scss'>
  @import '../../styles/structure-of-a-compiler/node-tree.scss';
</style>