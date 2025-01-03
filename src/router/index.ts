import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/login',
            component: () => import('@/pages/login/index.vue'),
            name: 'login'
        },
        {
            path: '/',
            component: () => import('@/layout/index.vue'),
            name: 'home',
            redirect: '/home',
            children: [
                {
                    path: '/home',
                    component: () => import('@/pages/home/index.vue'),
                    meta: {
                        title: '首页',
                        hidden: false,
                        icon: 'HomeFilled',
                    },
                }
            ]
        },
        {
            path: '/404',
            component: () => import('@/pages/404/index.vue'),
            name: '404'
        },
        {
            path: '/screen',
            component: () => import('@/pages/screen/index.vue'),
            name: 'screen'
        },

        //acl
        {
            path: '/acl',
            component: () => import('@/layout/index.vue'),
            name: 'acl',
            redirect: '/acl/user',
            children: [
                {
                    path: 'user',
                    component: () => import('@/pages/acl/user/index.vue'),
                    name: 'user',
                },
                {
                    path: '/acl/role',
                    component: () => import('@/pages/acl/role/index.vue'),
                    name: 'role',
                },
                {
                    path: '/acl/permission',
                    component: () => import('@/pages/acl/permission/index.vue'),
                    name: 'permission',
                },
            ]
        },

        //product
        {
            path: '/product',
            component: () => import('@/layout/index.vue'),
            name: 'product',
            redirect: '/product/attr',
            children: [
                {
                    path: '/product/attr',
                    component: () => import('@/pages/product/attr/index.vue'),
                    name: 'attr',
                },
                {
                    path: '/product/spu',
                    component: () => import('@/pages/product/spu/index.vue'),
                    name: 'spu',
                },
                {
                    path: '/product/sku',
                    component: () => import('@/pages/product/sku/index.vue'),
                    name: 'sku',
                },
                {
                    path: '/product/trademark',
                    component: () => import('@/pages/product/trademark/index.vue'),
                    name: 'trademark',
                },
            ]
        },

        {
            path: '/:pathMatch(.*)*',
            redirect: '/404',
            name: 'any'
        },

    ]
})

export default router