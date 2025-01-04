<template>
    <div class="layout_container">

        <div class="layout_slider">
            <Logo />

            <!-- scronll -->
            <el-scrollbar height="(100vx - 50px)">
                <el-menu :collapse="userLayoutStore().isFold" :default-active="route.path" mode="vertical"
                    background-color="#001529" text-color="white">
                    <RouterLink to="/home">
                        <el-menu-item index="/home">
                            <el-icon>
                                <HomeFilled />
                            </el-icon>
                            <template #title>home</template>
                        </el-menu-item :icon=HomeFilled>
                    </RouterLink>
                    <RouterLink to="/screen">
                        <el-menu-item index="/screen"><el-icon>
                                <DataBoard />
                            </el-icon> <template #title>dashboard</template></el-menu-item>
                    </RouterLink>
                    <el-sub-menu index="3">
                        <template #title>
                            <el-icon>
                                <User />
                            </el-icon>
                            <span>user</span>
                        </template>
                        <RouterLink to="/acl/user">
                            <el-menu-item index="/acl/user">user</el-menu-item>
                        </RouterLink>
                        <RouterLink to="/acl/role">
                            <el-menu-item index="/acl/role">role</el-menu-item>
                        </RouterLink>
                        <RouterLink to="/acl/permission">
                            <el-menu-item index="/acl/permission">permission</el-menu-item>
                        </RouterLink>
                    </el-sub-menu>
                    <el-sub-menu index="4">
                        <template #title>
                            <el-icon>
                                <Goods />
                            </el-icon>
                            <span>product</span>
                        </template>
                        <RouterLink to="/product/sku">
                            <el-menu-item index="/product/sku">sku</el-menu-item>
                        </RouterLink>
                        <RouterLink to="/product/spu">
                            <el-menu-item index="/product/spu">spu</el-menu-item>
                        </RouterLink>
                        <RouterLink to="/product/attr">
                            <el-menu-item index="/product/attr">attr</el-menu-item>
                        </RouterLink>
                        <RouterLink to="/product/trademark">
                            <el-menu-item index="/product/trademark">trademark</el-menu-item>
                        </RouterLink>
                    </el-sub-menu>
                </el-menu>
            </el-scrollbar>
        </div>


        <!-- topbar -->
        <div class="layout_topbar" :class="{ fold: userLayoutStore().isFold ? true : false }">
            <div class="topbar_left">
                <el-button type="" :icon="userLayoutStore().isFold ? Fold : Expand" style="margin-left: 10px;"
                    @click="handleFold"></el-button>
                <el-breadcrumb :separator-icon="ArrowRight" style="margin-left: 10px;">
                    <el-breadcrumb-item :to="{ path: '/' }"> {{ path.split('/')[1] }}</el-breadcrumb-item>
                    <el-breadcrumb-item> {{ path.split('/')[2] }}</el-breadcrumb-item>
                </el-breadcrumb>
            </div>

            <div class="topbar_right">
                <el-button type="" :icon="Refresh" @click="handleRefresh"></el-button>
                <el-button type="" :icon="FullScreen" @click="handleFullScreen"></el-button>
                <el-button type="" :icon="Setting"></el-button>
                <img :src="userStore.avatar" alt="avatar" style="width: 24px; height: 24px; margin: 0px 5px;">

                <el-dropdown>
                    <span class="el-dropdown-link">
                        {{ userStore.username }}
                        <el-icon class="el-icon--right">
                            <ArrowDown />
                        </el-icon>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item></el-dropdown-item>
                            <el-dropdown-item @click="handleLoginOut">login out</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>

        </div>

        <!-- content -->
        <div class="layout_content" :class="{ fold: userLayoutStore().isFold ? true : false }" v-if="refresh">
            <router-view></router-view>
        </div>

    </div>
</template>

<script lang="ts" name="" setup>
    import { ref, nextTick, watch } from 'vue'
    import { RouterLink, useRoute, useRouter } from 'vue-router'
    import Logo from '@/layout/logo/index.vue'  //Logo => fold uppercase()
    import { User, ArrowRight, HomeFilled, DataBoard, Goods, Expand, Fold, Refresh, FullScreen, Setting, ArrowDown, TurnOff } from '@element-plus/icons-vue'
    import userLayoutStore from '@/store/modules/setting'
    import useUserStore from '@/store/modules/user'
    const route = useRoute()
    const router = useRouter()

    let userStore = useUserStore();

    let path = route.path
    console.log('path', route.path)  //refresh hava first time
    console.log('matched', route.matched)  //show class layer

    function handleFold() {
        userLayoutStore().isFold = !userLayoutStore().isFold
    }

    /**
     * refresh
     */
    let refresh = ref(true)
    function handleRefresh() {
        refresh.value = false   // not: refresh = ref(true)
    }
    // reload componnet
    watch(() => refresh.value, () => {
        nextTick(() => {
            refresh.value = true
        })
    })

    /**
     * handleFullScreen
     */
    function handleFullScreen() {
        let isFull = document.fullscreenElement;
        if (!isFull) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }

    /**
     * handleLoginOut
     */
    function handleLoginOut() {
        userStore.logout()
        // router.push('/login')
        router.push({ path: '/login', query: { redirect: route.path } })
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
            transition: all 0.3s;

            &.fold {
                width: 50px;
            }
        }

        .layout_topbar {
            position: fixed;
            width: calc(100% - 260px);
            height: 50px;
            top: 0;
            left: 260px;
            background-color: white;
            background-image: linear-gradient(to right, white, rgb(169, 122, 122));
            transition: all 0.3s;

            &.fold {
                width: calc(100% - 50px);
                left: 50px;
            }
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
            transition: all 0.3s;

            &.fold {
                width: calc(100% - 50px);
                left: 50px;
            }
        }

        .layout_topbar {
            display: flex;
            justify-content: space-between; // split left and right
            align-items: center; // vertical center

            .topbar_left {
                display: flex;
                align-items: center;

            }

            .topbar_right {
                display: flex;
                align-items: center;
            }
        }
    }
</style>