import request from "@/utils/request";
import type { PermissionResponseData, MenuParams } from './type'

enum API {
    PERMISSION_URL = '/admin/acl/permission',
    ADDPERMISSION_URL = '/admin/acl/permission/save',
    EDITPERMISSION_URL = '/admin/acl/permission/update',
    REMOVEPERMISSION_URL = '/admin/acl/permission/remove/'
}

export const reqPermission = () => request.get<any, PermissionResponseData>(API.PERMISSION_URL)

export const reqAddOrUpdatePermission = (data: MenuParams) => {
    if (data.id) {
        return request.put<any, any>(API.EDITPERMISSION_URL, data)
    } else {
        return request.post<any, any>(API.ADDPERMISSION_URL, data)
    }
}

export const reqRemovePermission = (id: number) => request.delete<any, any>(API.REMOVEPERMISSION_URL + id)