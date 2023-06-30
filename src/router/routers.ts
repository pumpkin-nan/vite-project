export const constantRoute = [
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        name: 'login',
        meta: {
            title: '登录',
            hidden: true,
            icon: 'Avatar'
        }
    },
    {
        path: '/',
        component: () => import('@/layout/index.vue'),
        name: 'layout',
        meta: {
            title: 'layout',
            hidden: false,
            icon: 'CloseBold'
        },
        redirect: '/home',
        children: [
            {
                path: '/home',
                component: () => import('@/views/home/index.vue'),
                meta: {
                    title: '首页',
                    hidden: false,
                    icon: 'HomeFilled'
                }
            }
        ],
    },
    {
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        name: '404',
        meta: {
            title: '404',
            hidden: true,
            icon: 'StarFilled'
        },

    },
    {
        path: '/screen',
        component: () => import('@/views/screen/index.vue'),
        name: 'Screen',
        meta: {
            title: '数据大屏',
            hidden: false,
            icon: 'DataAnalysis'
        }
    },
    {
        path: '/acl',
        component: () => import('@/views/layout/index.vue'),
        name: 'Acl',
        meta: {
            title: '权限管理',
            icon: 'Lock',
            hidden: false
        },
        children: [
            {
                path: '/user',
                components: () => import('@/views/acl/user/index.vue'),
                name: 'User',
                meta: {
                    title: '用户管理',
                    icon: 'UserFilled',
                    hidden: false
                }
            },
            {
                path: '/role',
                components: () => import('@/views/acl/role/index.vue'),
                name: 'Role',
                meta: {
                    title: '角色管理',
                    icon: 'Avatar',
                    hidden: false
                }
            },
            {
                path: '/permission',
                components: () => import('@/views/acl/permission/index.vue'),
                name: 'Permission',
                meta: {
                    title: '菜单管理',
                    icon: 'Menu',
                    hidden: false
                }
            }
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'Any',
        meta: {
            title: '任意路由',
            hidden: true,
            icon: 'Grid'
        },
    }
]