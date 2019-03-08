<template>
  <ul class="comp-list">
    <li v-for="item of list" :key="item.id">
      <p>{{item.name}}</p>
      <component :is="item.component || item.name" draggable="true"></component>
    </li>
  </ul>
</template>

<script>
// import { Button } from 'element-ui'
import Button from './Button'
import Input from './Input'
import Div from './Div'

export default {
  name: 'Components',
  components: {
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
