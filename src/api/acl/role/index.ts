import request from "@/utils/request";
import type { RecordResponseData, RecordData, MenuResponseData } from './type'

enum API {
    ROLEINFO_URL = '/admin/acl/role/',
    SAVEROLE_URL = '/admin/acl/role/save',
    UPDATEROLE_URL = '/admin/acl/role/update',
    ALLPRESSION_URL = '/admin/acl/permission/toAssign/',
    SETPRESSION_URL = '/admin/acl/permission/doAssign/?',
    REMOVEPRESSION_URL = '/admin/acl/permission/remove/'
}

export const reqRoleInfo = (page: number, limit: number, roleName: string) =>
    request.get<any, RecordResponseData>(API.ROLEINFO_URL + `${page}/${limit}/?roleName=${roleName}`)

export const reqAddOrUpdateRole = (data: RecordData) => {
    if (data.id) {
        return request.put<any, any>(API.UPDATEROLE_URL, data)
    } else {
        return request.post<any, any>(API.SAVEROLE_URL, data)
    }
}

export const reqAllMenuList = (roleId: number) => request.get<any, MenuResponseData>(API.ALLPRESSION_URL + roleId)

export const reqSetPression = (roleId: number, permissionId: number[]) => request.post<any, any>(API.SETPRESSION_URL + `roleId=${roleId}&permissionId=${permissionId}`)

export const reqRemoveRole = (roleId: number) => request.delete<any, any>(API.REMOVEPRESSION_URL + `${roleId}`)