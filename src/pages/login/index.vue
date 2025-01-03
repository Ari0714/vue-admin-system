<template>
    <div class="login_container">

        <el-row :gutter="10">
            <el-col :span="12" :xs="0">left</el-col>
            <el-col :span="12" :xs="24">
                <!-- model: data collect -->
                <el-form class="login_form" :rules="rules" :model="loginForm" ref="formRef">
                    <h1>Hello</h1>
                    <h2>欢迎来到硅谷甄选</h2>
                    <el-form-item label="" prop="username">
                        <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="" prop="password">
                        <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password"
                            show-password></el-input>
                    </el-form-item>
                    <el-form-item label="">
                        <el-button :loading=load class="login_btn" type="primary" @click="login">login</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>

    </div>
</template>

<script lang="ts" name="" setup>
    import { reactive, ref } from 'vue'
    import { User, Lock } from '@element-plus/icons-vue'
    import useUserStore from "@/store/modules/user";
    import { ElNotification } from 'element-plus'
    import { useRouter, useRoute } from 'vue-router';
    import { gettime } from '@/utils/time'

    let loginForm = reactive({ username: 'admin', password: '111111sdds' })  //default value
    // console.log(loginForm)

    let useStore = useUserStore();
    let router = useRouter()
    // let route = useRoute()
    let load = ref(false)

    let formRef = ref()

    // login
    async function login() {

        // reject, dont run after
        await formRef.value.validate()

        try {
            load.value = true
            await useStore.userLogin(loginForm)
            ElNotification({
                type: 'success',
                title: 'Hi, good ' + gettime() + '',
                message: 'welcome back'
            })
            load.value = false
            // let redirect: any = route.query.redirect;
            // console.log('redirect: ', redirect)
            router.push('/')
        } catch (error) {
            load.value = false
            ElNotification({
                type: 'error',
                message: (error as Error).message
            })
        }
    }

    //自定义校验规则函数
    const validatorUserName = (rule: any, value: any, callback: any) => {
        //rule:即为校验规则对象
        //value:即为表单元素文本内容
        //函数:如果符合条件callBack放行通过即为
        //如果不符合条件callBack方法,注入错误提示信息
        if (value.length >= 5) {
            callback();
        } else {
            callback(new Error('账号长度至少五位'));
        }
    }
    const validatorPassword = (rule: any, value: any, callback: any) => {
        if (value.length >= 6) {
            callback();
        } else {
            callback(new Error('密码长度至少六位'));
        }
    }

    const rules = {
        username: [
            // { required: true, min: 6, max: 10, message: '账号长度至少六位', trigger: 'blur' }
            { validator:validatorUserName, trigger: 'blur' }
        ],
        password: [
            // { required: true, min: 6, max: 15, message: '密码长度至少6位', trigger: 'change' }
            { validator:validatorPassword, trigger: 'change' }
        ]
    }

</script>

<style lang="scss" scoped>

    .login_container {
        width: 100%;
        height: 100vh;
        background: url('@/assets/images/background.jpg') no-repeat;
        background-size: cover;
        background-color: skyblue;

        .login_form {
            position: relative;
            width: 80%;
            top: 30vh;
            background: url('@/assets/images/login_form.png') no-repeat;
            background-size: cover;
            padding: 40px;

            h1 {
                color: white;
                font-size: 40px;
            }

            h2 {
                color: white;
                font-size: 20px;
                margin: 20px 0px;
            }
        }

        .login_btn {
            width: 100%;
        }

    }
</style>