<template>

  <div>
    <h1>1312321</h1>
    <HelloWorld msg="hello world" />
    <el-button type="primary" @click="ds" :icon="Plus">click me</el-button>
    <el-button type="success" @click="ds" :icon="Edit">success</el-button>
    <el-button type="info" @click="ds" :icon="Search">search</el-button>
    <el-button type="danger" @click="ds" :icon="Delete">delete</el-button>
  </div>
  
</template>


<script setup lang="ts">
  import HelloWorld from '@/components/HelloWorld.vue'
  import { Edit, Plus, Search, Delete } from '@element-plus/icons-vue'

  function ds() {
    alert('hahaha')
  }

</script>

<style scoped lang="scss">

  h1 {
    color: red;
  }

</style>
