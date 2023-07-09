import { defineStore } from 'pinia'
import { reqLogin, reqLogout, reqUserInfo } from '@/api/user'
import type { userState } from './types/types'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import { constantRoute, asyncRoute, anyRoute } from '@/router/routers'
import type { loginFormData, loginResponseData, userInfoData } from '@/api/user/type'
import router from '@/router'

// 引用深拷贝方法
import cloneDeep from 'lodash/cloneDeep'

// 过滤异步路由
function filterAsyncRoute(asyncRoute: any, routes: any) {
    return asyncRoute.filter((item: any) => {
        if (routes.includes(item.name)) {
            if (item.children && item.children.length > 0) {
                //硅谷333账号:product\trademark\attr\sku
                item.children = filterAsyncRoute(item.children, routes);
            }
            return true;
        }
    })
}

let useUserStore = defineStore('User', {
    state: (): userState => {
        return {
            token: GET_TOKEN(),
            menuRouters: constantRoute,// 仓库存储菜单的路由
            username: '',
            avatar: '',
            buttons: []
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
                this.buttons = result.data.buttons

                //计算当前用户需要展示的异步路由
                let userAsyncRoute = filterAsyncRoute(cloneDeep(asyncRoute), result.data.routes);
                //菜单需要的数据整理完毕
                this.menuRouters = [...constantRoute, ...userAsyncRoute, anyRoute];
                //目前路由器管理的只有常量路由:用户计算完毕异步路由、任意路由动态追加
                [...userAsyncRoute, anyRoute].forEach((route: any) => {
                    router.addRoute(route);
                });
                return 'ok'
            } else {
                return Promise.reject(new Error(result.message))
            }
        },
        // 退出登录
        async userlogout() {
            let result: any = await reqLogout();
            if (result.code == 200) {
                this.token = ''
                this.username = ''
                this.avatar = ''
                REMOVE_TOKEN();
                return 'ok'
            } else {
                return Promise.reject(new Error(result.message))
            }
        }

    },
    getters: {}
})


export default useUserStore