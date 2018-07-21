<template>
  <div class='triple-node'>
    <div 
      class='triple-node__parent'
      v-html='replaceBrackets(parent)'>
    </div>
    <div
      class='triple-node__arrows'
      :class='{"triple-node__arrows--only-child": hasOnlyChild}'>
      <template v-if='hasOnlyChild'>
        <div class='triple-node__arrow'>
          <div class='triple-node__arrow-edge'> 
          </div>
        </div>
      </template>
      <template v-else>
        <div class='triple-node__left-arrow'>
          <div class='triple-node__left-arrow-edge'> 
          </div>
          <div class='triple-node__left-arrow-tip'> 
          </div>
        </div>
        <div class='triple-node__right-arrow'>
          <div class='triple-node__right-arrow-edge'>
          </div>
          <div class='triple-node__right-arrow-tip'> 
          </div>
        </div>
      </template>
    </div>
    <div class='triple-node__children'>
      <template v-if='hasOnlyChild'>
          <template v-if='isOnlyChildALeaf'>
            <div class='triple-node__only-child'>{{ onlyChildNode }}</div>
          </template>
          <template v-else>
            <div class='triple-node__only-child'>
              <node-tree :root='onlyChildNode'></node-tree>              
            </div>
          </template>
      </template>
      <template v-else>
        <template v-if='bothLeftAndRightChildrenAreLeaves'>
          <div class='triple-node__left-child' v-html='replaceBrackets(leftNode)'></div>
          <div class='triple-node__right-child' v-html='replaceBrackets(rightNode)'></div>
        </template>
        <template v-else>
          <template v-if='isLeftChildALeaf'>
            <div class='triple-node__left-child' v-html='replaceBrackets(leftNode)'></div>
            <div class='triple-node__right-child'>
              <node-tree :root='rightNode'></node-tree>
            </div>
          </template>
          <template v-else>
            <div class='triple-node__left-child'>
              <node-tree :root='leftNode'></node-tree>
            </div>
            <div class='triple-node__right-child' v-html='replaceBrackets(rightNode)'></div>
          </template>
        </template>        
      </template>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';

export default {
  name: 'triple-node',
  components: {
    'node-tree': () => import('./node-tree.vue')
  },
  methods: {
    replaceBrackets: function (subject) {
      if (!_.isString(subject)) {
        return subject;
      }

      return subject.replace(/</g, '&#12296;')
        .replace(/>/g, '&#12297;');
    },
  },
  computed: {
    bothLeftAndRightChildrenAreLeaves: function () {
      return this.isLeftChildALeaf && this.isRightChildALeaf;
    },
    isLeftChildALeaf: function () {
      return _.isString(this.leftNode);
    },
    isRightChildALeaf: function () {
      return _.isString(this.rightNode);
    },
    hasOnlyChild: function () {
      return typeof this.onlyChildNode !== 'undefined';
    },
    isOnlyChildALeaf: function () {
      return _.isString(this.onlyChildNode);
    }
  },
  props: {
    left: null,
    right: null,
    onlyChild: {
      type: null,
      default: undefined,
    },
    parent: {
      type: String,
      required: true
    }
  },
  data: function () {
    return {
      leftNode: this.left,
      rightNode: this.right,
      onlyChildNode: this.onlyChild,
      parentNode: this.parent,
    }
  }
}
</script>

<style scoped lang='scss'>
@import 'triple-node.scss';
</style>