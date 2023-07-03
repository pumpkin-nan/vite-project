import request from '@/utils/request'
import type { UserResponseData, User, RoleResponseData } from './type'
enum API {
    ALLUSER_URL = '/admin/acl/user/',
    ADDUSER_URL = '/admin/acl/user/save',
    EDITUSER_URL = '/admin/acl/user/update',
    ALLROLE_URL = '/admin/acl/user/toAssign/'
}

export const reqUserInfo = (page: number, limit: number) => request.get<any, UserResponseData>(API.ALLUSER_URL + `${page}/${limit}`)

export const reqAddOrEditUser = (data: User) => {
    if (data.id) {
        return request.put<any, any>(API.EDITUSER_URL, data)
    } else {
        return request.post<any, any>(API.ADDUSER_URL, data)
    }
}

export const reqAllRole = (userId: number) => request.get<any, RoleResponseData>(API.ALLROLE_URL + userId)