
import { defineStore } from "pinia";

const userLayoutStore = defineStore('LayoutStore',{
    state: () => {
        return {
            isFold:false,
            refresh:false
        }
    },

    actions:{},

    getters:{}
})

export default userLayoutStore