<template>
  <div class="hello">
    <el-row>
      <el-col :span="16">
        <Preview />
      </el-col>
      <el-col :span="8">
        <CompList />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Preview from './Canvas'
import CompList from './CompList'

export default {
  name: 'HelloWorld',
  components: {
    Preview,
    CompList
  },
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  /* display: inline-block; */
  margin: 0 10px;
  padding: 10px;
  cursor: move;
  border: 1px solid #333;
}
a {
  color: #42b983;
}
</style>
