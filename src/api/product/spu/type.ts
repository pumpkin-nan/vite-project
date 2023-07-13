export interface ResponseData {
    code: number,
    message: string,
    ok: boolean
}

export interface SpuData {
    id?: number | string,
    spuName: string,
    description: string,
    category3Id: number | string,
    tmId: number | string,
    spuSaleAttrList: null | SaleAttr[],
    spuImageList: null | SpuImg[],
}
export type Records = SpuData[]

export interface SpuInfoResponseData extends ResponseData {
    data: {
        records: Records,
        total: number,
        size: number,
        current: number,
        pages: number,
        searchCount: boolean
    }
}

export interface Trademark {
    id: number,
    tmName: string,
    logoUrl: string
}

export interface AllTrademark extends ResponseData {
    data: Trademark[]
}

export interface SpuImg {
    id: number,
    createTime?: string,
    updateTime?: string,
    spuId?: number,
    imgName?: string,
    imgUrl?: string,
    name?: string,
    url?: string
}

export interface SpuHasImg extends ResponseData {
    data: SpuImg[]
}

export interface SaleAttrValue {
    id?: number,
    createTime?: null,
    updateTime?: null,
    spuId?: number,
    baseSaleAttrId: number | string,
    saleAttrName: string,
    saleAttrValueName?: string | number,
    isChecked?: null
}
export type SpuSaleAttrList = SaleAttrValue[]
export interface SaleAttr {

    baseSaleAttrId: number | string,
    saleAttrName: string,
    spuSaleAttrValueList: SpuSaleAttrList,
    id?: number,
    createTime?: null,
    updateTime?: null,
    spuId?: number,
    flag?: boolean,
    saleAttrValue?: string

}

export interface SaleAttrResponseData extends ResponseData {
    data: SaleAttr[]
}

export interface baseSaleValue {
    "id": number,
    "createTime": string,
    "updateTime": string,
    "name": string
}

export interface baseSaleValueResponseData extends ResponseData {
    data: baseSaleValue[]
}

export interface Attr {
    attrId: number | string,
    valueId: number | string,
}
export interface SaleAttrValue {
    saleAttrId: number | string,
    saleAttrValueId: number | string,
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
    skuDefaultImg: string
}

export interface SkuInfoData extends ResponseData {
    data: SkuData[]
}