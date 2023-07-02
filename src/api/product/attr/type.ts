export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

export interface CategoryObj {
    id: number | string,
    name: string,
    category1Id?: number,
    category2Id?: number,

}

export interface CategoryResponse extends ResponseData {
    data: CategoryObj[]
}
