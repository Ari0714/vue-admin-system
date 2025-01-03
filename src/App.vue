<template>

  <div>
    <!-- occupy support router skip -->
    <router-view></router-view>
  </div>

</template>


<script setup lang="ts">

  import { onMounted } from 'vue';
  import { reqLogin } from './api/user';

  function ds() {
    alert('hahaha')
  }

  onMounted(() => {
    reqLogin({ username: 'admin', password: '111111' })
  })

</script>

<style scoped lang="scss">

  h1 {
    color: red;
  }

</style>
