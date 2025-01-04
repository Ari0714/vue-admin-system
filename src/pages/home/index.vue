<template>
    <div class="">
        <h2>Welcome: {{userStore.username}}</h2>
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