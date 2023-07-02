export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}
export interface Trademark {
    id?: number,
    createTime: string,
    updateTime: string,
    tmName: string,
    logUrl: string
}

export type Records = Trademark[]

export interface TrademarkResponseData extends ResponseData {
    data: {
        records: Records,
        "total": number,
        "size": number,
        "current": number,
        "searchCount": boolean,
        "pages": number
    }
}