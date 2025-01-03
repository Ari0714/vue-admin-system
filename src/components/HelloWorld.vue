<template>

  <div>
    <h1>{{ msg }}</h1>
    <!-- <svg style="width: 100px; height: 100px;">
      <use xlink:href="#icon-phone" fill="red"></use>
    </svg> -->

    <svg-icon name="home" color="green" width="80px" height="80px"></svg-icon>

  </div>

</template>


<script setup lang="ts">

  defineProps<{ msg: string }>()

  import axios from 'axios';
  axios.post('/api/user/login', {
    'username': 'admin',
    'password': '111111'
  }).then((response => { response.data }))



</script>

<style scoped>
  .read-the-docs {
    color: red;
  }
</style>
