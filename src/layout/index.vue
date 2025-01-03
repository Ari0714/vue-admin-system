<template>
    <div class="layout_container">

        <div class="layout_slider">
            <Logo />

            <!-- scronll -->
            <el-scrollbar height="(100vx - 50px)">
                <el-menu :default-active="activeIndex" mode="vertical" background-color="#001529" text-color="white"
                    @click="goRouth">
                    <RouterLink to="/home">
                        <el-menu-item index="1"><el-icon>
                                <HomeFilled />
                            </el-icon>home</el-menu-item>
                    </RouterLink>
                    <RouterLink to="/screen">
                        <el-menu-item index="2"><el-icon>
                                <DataBoard />
                            </el-icon>dashboard</el-menu-item>
                    </RouterLink>
                    <el-sub-menu index="3">
                        <template #title> <el-icon>
                                <User />
                            </el-icon>user</template>
                        <RouterLink to="/acl/user">
                            <el-menu-item index="31">user</el-menu-item>
                        </RouterLink>
                        <RouterLink to="/acl/role">
                            <el-menu-item index="32">role</el-menu-item>
                        </RouterLink>
                        <RouterLink to="/acl/permission">
                            <el-menu-item index="33">permission</el-menu-item>
                        </RouterLink>
                    </el-sub-menu>
                    <el-sub-menu index="4">
                        <template #title><el-icon>
                                <Goods />
                            </el-icon>product</template>
                        <RouterLink to="/product/sku">
                            <el-menu-item index="41">sku</el-menu-item>
                        </RouterLink>
                        <RouterLink to="/product/spu">
                            <el-menu-item index="42">spu</el-menu-item>
                        </RouterLink>
                        <RouterLink to="/product/attr">
                            <el-menu-item index="43">attr</el-menu-item>
                        </RouterLink>
                        <RouterLink to="/product/trademark">
                            <el-menu-item index="44">trademark</el-menu-item>
                        </RouterLink>
                    </el-sub-menu>
                </el-menu>
            </el-scrollbar>

        </div>

        <div class="layout_topbar">layout_topbar</div>

        <div class="layout_content">

            <router-view></router-view>

        </div>

    </div>
</template>

<script lang="ts" name="" setup>
    import { } from 'vue'
    import { RouterLink } from 'vue-router'
    import Logo from '@/layout/logo/index.vue'  //Logo => fold uppercase()
    import { User, Lock, HomeFilled, DataBoard, Goods } from '@element-plus/icons-vue'

    function goRouth(a: any) {
        console.log(a.target)
    }

</script>

<style lang="scss" scoped>
    .layout_container {
        width: 100%;
        height: 100vh;
        background-color: red;

        .layout_slider {
            color: white;
            width: 260px;
            height: 100vh;
            background-color: #001529;
        }

        .layout_topbar {
            position: fixed;
            width: calc(100% - 260px);
            height: 50px;
            top: 0;
            left: 260px;
            background-color: yellow;

        }

        .layout_content {
            position: absolute;
            left: 260px;
            top: 50px;
            width: calc(100% - 260px);
            height: calc(100vh - 50px);
            background-color: skyblue;
            padding: 20px;
            overflow: auto; //slide no effect, else below is white
        }
    }
</style>