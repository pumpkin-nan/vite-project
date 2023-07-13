export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

export interface Attr {
    id?: number | string,
    attrId: number | string,
    valueId: number | string,
    attrName?: number | string,
}
export interface SaleAttrValue {
    id?: number | string,
    saleAttrId: number | string,
    saleAttrValueId: number | string,
    saleAttrName?: number | string,
}
export interface SkuData {
    category3Id: number | string,
    spuId: number | string,
    tmId: number | string,
    skuName: string,
    price: number | string,
    weight: number | string,
    skuDesc: string,
    skuAttrValueList?: Attr[],
    skuSaleAttrValueList?: SaleAttrValue[],
    skuDefaultImg: string,
    isSale?: number | string,
    id?: number | string
}

export interface SkuResponseData extends ResponseData {
    data: {
        records: SkuData[],
        "total": number,
        "size": number,
        "current": number,
        "orders": [],
        "optimizeCountSql": boolean,
        "hitCount": boolean,
        "countId": null,
        "maxLimit": null,
        "searchCount": boolean,
        "pages": number
    }
}

export interface SkuInfoData extends ResponseData {
    data: SkuData
}