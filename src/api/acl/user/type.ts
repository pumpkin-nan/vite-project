export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

export interface User {
    id?: number,
    createTime?: string,
    updateTime?: string,
    username: string,
    password: string,
    name?: string,
    phone?: number,
    roleName?: string
}

export type Records = User[]

export interface UserResponseData extends ResponseData {
    data: {
        records: Records,
        total: number,
        size: number,
        current: number,
        pages: number
    }
}
export interface userRoles {
    id?: number,
    createTime?: string,
    updateTime?: string,
    roleName: string,
    remark: null
}

export type AllRole = userRoles[]

export interface RoleResponseData extends RoleResponseData {
    data: {
        assignRoles: AllRole,
        allRolesList: AllRole
    }
}

export interface SetRoleData {
    roleIdList: number[],
    userId: number
}