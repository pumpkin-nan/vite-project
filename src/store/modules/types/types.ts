import type { RouteRecordRaw } from "vue-router"
export interface userState {
    token: string | null,
    menuRouters: RouteRecordRaw[],
    username: string,
    avatar: string
}