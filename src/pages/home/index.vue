<template>
    <div class="">
        <el-card style="max-width: 100%; height: 300px;">
            <h2>Welcome: {{ userStore.username }}</h2>
            <img :src="userStore.avatar" alt="avatar" width="200px" height="200px" style="margin-top: 20px;">
        </el-card>
    </div>
</template>

<script lang="ts" name="" setup>
    import { ref, reactive } from 'vue'
    import { } from 'vue-router'
    import { onMounted } from 'vue';
    import useUserStore from '@/store/modules/user';

    let userStore = useUserStore()
    onMounted(async () => {
        console.log('onmount');
        await userStore.getUserinfo();
    })

</script>

<style lang="scss" scoped></style>