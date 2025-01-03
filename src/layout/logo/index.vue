<template>
    <div class="logo">
        <img :src="settting.logo" alt="project logl">
        <p>{{ settting.title }}</p>
    </div>
</template>

<script lang="ts" name="" setup>
    import { } from 'vue'
    import { } from 'vue-router'
    import settting from '@/settting';

</script>

<style lang="scss" scoped>
    .logo {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        padding: 10px;
        color: white;
        img{
            width: 40px;
            height: 40px;
        }
        p{
            font-size: 20px;
            margin-left: 10px;
        }
    }
</style>