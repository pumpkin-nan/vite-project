// 路由鉴权
import router from '@/router'
// 进度条
import nprogress from 'nprogress';
//引入进度条样式
import "nprogress/nprogress.css";
nprogress.configure({ showSpinner: false })
import pinia from './store';
import useUserStore from '@/store/modules/user'
import setting from './setting';

let userStore = useUserStore(pinia)
let username = userStore.username
router.beforeEach(async (to: any, from: any, next: any) => {
    document.title = `${setting.title}-${to.meta.title}`
    nprogress.start();
    let token = userStore.token
    if (token) {
        if (to.path == '/login') {
            next({ path: '/' })
        } else {
            if (username) {
                next()
            } else {
                try {
                    await userStore.userInfo();
                    next()
                } catch (error) {
                    await userStore.userlogout()
                    next({ path: '/login', query: { redirect: to.path } })
                }
            }
        }
    } else {
        if (to.path == '/login') {
            next()
        } else {
            next({ path: '/login', query: { redirect: to.path } })
        }
    }

})

router.afterEach((to: any, from: any) => {
    nprogress.done();
})