<template>
  <div class="preview">
    <draggable v-model="list" tag="div" group="component">
      <!-- <li v-for="item in list" :key="item.name">{{item.name}}</li> -->
      <component v-for="item in list" :key="item.id" :is="item.component || item.name" :list="item.list"></component>
      <!-- <el-button ref="btn">button</el-button> -->
      <!-- <draggable v-for="item in list" :key="item.name" v-model="item.list" group="component" tag="div">
        {{item.name}}
        <draggable v-for="subitem in item" :key="subitem.name" v-model="subitem.list" group="component" tag="div">{{subitem.name}}</draggable>
      </draggable> -->
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'Preview',
  components: {
    draggable
  },
  data() {
    return {
      list: [
        // {
        //   id: 10,
        //   name: 'el-button',
        //   list: []
        // }
      ]
    }
  },
  mounted() {
    // console.log(this.$refs.btn) // eslint-disable-line
  },
}
</script>

<style lang="scss">
.preview {
  height: 500px;
  border: 1px dashed #333;
}
</style>
