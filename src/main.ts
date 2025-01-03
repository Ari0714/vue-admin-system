import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import zhCn from 'element-plus/es/locale/lang/zh-cn'
import en from 'element-plus/es/locale/lang/zh-cn'

const app = createApp(App)

app.use(ElementPlus,{
    locale: en,
});

//@ts-ignore
import 'virtual:svg-icons-register'

// console.log(import.meta.env)

// defien universal component
import SvgIcon from '@/components/SvgIcon/index.vue';
app.component('SvgIcon',SvgIcon)


//router
import router from './router'
app.use(router)

// pinia
import { pinia } from './store'
app.use(pinia)


import '@/styles/reset.scss'
import '@/styles/variable.scss'
app.mount('#app')
