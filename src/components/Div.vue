<template>
  <div class="div">
    <slot></slot>
    <slot name="header"></slot>
  </div>
</template>

<script>
// import draggable from 'vuedraggable'

export default {
  name: 'Div',
  props: {
    // list: Array
  },
  components: {
    // draggable
  }
}
</script>

<style lang="scss" scoped>
  .div {
    min-height: 100px;
    border: 1px solid #333;
  }
</style>