import { defineStore } from "pinia";
import { reqLogin, reqUserinfo } from "@/api/user";
import type { LoginFormData } from "@/api/user/type";
import type { UserState } from "./types/type";

// create small store
const useUserStore = defineStore('User', {
    state: (): UserState => {
        return {
            token: localStorage.getItem('TOKEN'),
            username: '',
            avatar: ''
        }
    },

    actions: {
        // login
        async userLogin(data: LoginFormData) {  // cant use [function] keyword
            let res = await reqLogin(data)
            console.log('aaaa',res)
            if (res.code == 200) {
                this.token = res.token
                localStorage.setItem('TOKEN', res.token)  // solve refresh token lost
                return 'ok'
            }
            else {
                return Promise.reject(new Error(res.message))
            }
        },

        // getUserinfo
        async getUserinfo() {  // cant use function
            let res = await reqUserinfo()
            console.log('res', res)
            if (res.code == 200) {
                // console.log(res.data.username)
                this.username = res.data.username
                this.avatar = res.data.avatar
                return 'ok'
            } else {
                return Promise.reject(new Error((res.message)))
            }
        },

        // logout
        async logout() {
            this.token = '';
            this.username = '';
            this.avatar = '';
            localStorage.removeItem('TOKEN')
        }

    },


    getters: {}
})


export default useUserStore