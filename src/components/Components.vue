<template>
  <div>
    <draggable v-model="list" tag="ul" :move="handleMove" v-bind="{group:{ name:'component',  pull:'clone', put:false },sort:false}" @end="handleEnd">
      <!-- <div v-for="item in list" :key="item.name">{{item.name}}</div> -->
      <li v-for="item in list" :key="item.id">
        {{item.name}}
        <!-- <component :is="item.name" v-bind="item.attr || {}"></component> -->
      </li>
    </draggable>
    <!-- <div>{{list}}</div> -->
  </div>
</template>

<script>
import draggable from 'vuedraggable'
// import { Button } from 'element-ui'
import Button from './Button'
import Input from './Input'
import Div from './Div'

export default {
  name: 'Components',
  components: {
    draggable
  },
  data () {
    return {
      list:[
        {
          id: 1,
          name: 'el-button',
          component: Button,
          list: []
        },
        {
          id: 2,
          name: 'el-input',
          component: Input,
          list: []
        },
        {
          id: 3,
          name: 'el-col',
          list: []
        },
        {
          id: 4,
          name: 'div',
          component: Div,
          list: []
        },
        {
          id: 5,
          name: 'el-button',
          component: Button,
          list: []
        },
        {
          id: 6,
          name: 'el-button',
          component: Button,
          list: []
        },
      ]
    }
  },
  methods: {
    handleMove(e) {
      console.log(e) // eslint-disable-line
      // const list = e.to.__vue__.list || []
      // list.push(e.draggedContext.element)
      // e.to.__vue__.list = list
    },
    handleEnd() {
      // console.log(e) // eslint-disable-line
    }
  }
}
</script>
