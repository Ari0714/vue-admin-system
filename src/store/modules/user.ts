import { defineStore } from "pinia";
import { reqLogin } from "@/api/user";
import type { LoginFormData, LoginResponseData } from "@/api/user/type";

// create small store
const useUserStore = defineStore('User', {
    state: () => {
        return {
            token: localStorage.getItem('TOKEN')
        }
    },

    actions: {

        // login
        async userLogin(data: LoginFormData) {  // cant use function
            const res: LoginResponseData = await reqLogin(data)
            if (res.code == 200) {
                this.token = res.data.token
                localStorage.setItem('TOKEN', res.data.token)  // solve refresh token lost
                return 'ok'
            }
            else {
                return Promise.reject(new Error((res.data).message))
            }

        }
    },


    getters: {}
})


export default useUserStore