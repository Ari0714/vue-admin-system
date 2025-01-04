import router from "./router";
import { useRoute, useRouter } from "vue-router";
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import useUserStore from "./store/modules/user";
import { pinia } from "./store";
nprogress.configure({ showSpinner: false })

const userStore = useUserStore(pinia)

router.beforeEach(async (to: any, from: any, next: any) => {

    let route = useRoute()
    let router = useRouter()

    nprogress.start()
    // next()

    let token = userStore.token
    let username = userStore.username

    console.log(token)
    console.log(username)

    if (token) {
        if (to.path == '/login') {
            next({path:'/'})
        } else {
            // take username
            if (username) {
                next()
            } else {
                //dont hava username
                try {
                    await userStore.getUserinfo()
                    next()
                } catch (error) {
                    await userStore.logout()
                    router.push({ path: '/login', query: { redirect: route.path } })
                }
            }
        }
    } else {
        if (to.path == '/login') {
            next()
        } else {
            router.push({ path: '/login', query: { redirect: route.path } })
        }
    }

})


router.afterEach((to: any, from: any, next: any) => {
    nprogress.done()
})