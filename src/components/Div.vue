<template>
  <draggable group="component" v-model="list" class="div"></draggable>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  name: 'Div',
  props: {
    list: Array
  },
  components: {
    draggable
  }
}
</script>

<style lang="scss" scoped>
  .div {
    min-height: 100px;
  }
</style>