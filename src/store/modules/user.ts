import { defineStore } from 'pinia'
import { reqLogin, reqLogout, reqUserInfo } from '@/api/user'
import type { userState } from './types/types'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import { constantRoute } from '@/router/routers'
import type { loginFormData, loginResponseData, userInfoData } from '@/api/user/type'

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
        async userLogin(data: loginFormData) {
            let result: loginResponseData = await reqLogin(data)
            if (result.code == 200) {
                this.token = (result.data as string)
                SET_TOKEN((result.data as string))
                return 'ok'
            } else {
                return Promise.reject(new Error(result.data))
            }
        },
        // 获取用户信息的方法
        async userInfo() {
            let result: userInfoData = await reqUserInfo();
            if (result.code == 200) {
                this.username = result.data.name
                this.avatar = result.data.avatar
                return 'ok'
            } else {
                return Promise.reject(new Error(result.data))
            }
        },
        // 退出登录
        async userlogout() {
            let result: any = await reqLogout();
            console.log(result)
            if (result.code == 200) {
                this.token = ''
                this.username = ''
                this.avatar = ''
                REMOVE_TOKEN();
                return 'ok'
            } else {
                return Promise.reject(new Error(result.data))
            }
        }

    },
    getters: {}
})


export default useUserStore