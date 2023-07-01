import { defineStore } from 'pinia'
import { reqLogin, reqUserInfo } from '@/api/user'
import type { loginForm, loginResponseData } from '@/api/user/type'
import type { userState } from './types/types'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import { constantRoute } from '@/router/routers'

let useUserStore = defineStore('User', {
    state: (): userState => {
        return {
            token: GET_TOKEN(),
            menuRouters: constantRoute,// 仓库存储菜单的路由
            username: '',
            avatar: ''
        }
    },
    actions: {
        // 用户登录的方法
        async userLogin(data: loginForm) {
            let result: loginResponseData = await reqLogin(data)
            if (result.code == 200) {
                this.token = (result.data.token as string)
                SET_TOKEN((result.data.token as string))
                return 'ok'
            } else {
                return Promise.reject(new Error(result.data.message))
            }
        },
        // 获取用户信息的方法
        async userInfo() {
            let result = await reqUserInfo();
            if (result.code == 200) {
                this.username = result.data.checkUser.username
                this.avatar = result.data.checkUser.avatar
                return 'ok'
            } else {
                return Promise.reject(new Error(result.data.message))
            }
        },
        // 退出登录
        userlogout() {
            this.token = ''
            this.username = ''
            this.avatar = ''
            REMOVE_TOKEN()
        }

    },
    getters: {}
})


export default useUserStore