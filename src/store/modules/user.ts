import { defineStore } from 'pinia'
import { reqLogin } from '@/api/user'
import type { loginForm, loginResponseData } from '@/api/user/type'
import type { userState } from './types/types'
import { SET_TOKEN, GET_TOKEN } from '@/utils/token'
import { constantRoute } from '@/router/routers'

let useUserStore = defineStore('User', {
    state: (): userState => {
        return {
            token: GET_TOKEN(),
            menuRouters: constantRoute,// 仓库存储菜单的路由
        }
    },
    actions: {
        async userLogin(data: loginForm) {
            let result: loginResponseData = await reqLogin(data)
            if (result.code == 200) {
                this.token = (result.data.token as string)
                SET_TOKEN((result.data.token as string))
                return 'ok'
            } else {
                return Promise.reject(new Error(result.data.message))
            }
        }
    },
    getters: {}
})


export default useUserStore