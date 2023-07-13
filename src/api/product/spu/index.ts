import request from "@/utils/request";
import type { SkuData, SpuData, SpuInfoResponseData, AllTrademark, SpuHasImg, SaleAttrResponseData, baseSaleValueResponseData } from './type'

enum API {
    SPUINFO_URL = '/admin/product/',
    ALLTRADEMARK_URL = '/admin/product/baseTrademark/getTrademarkList',
    IMAGELIST_URL = '/admin/product/spuImageList/',
    SALE_URL = '/admin/product/spuSaleAttrList/',
    BASESALE_URL = '/admin/product/baseSaleAttrList',
    ADDSPU_URL = '/admin/product/saveSpuInfo',
    UPDATESPU_URL = '/admin/product/updateSpuInfo',
    ADDSKU_URL = '/admin/product/saveSkuInfo'
}

export const reqSpuInfo = (page: number, limit: number, category3Id: number | string) => request.get<any, SpuInfoResponseData>(API.SPUINFO_URL + `${page}/${limit}?category3Id=${category3Id}`)

export const reqAllTrademark = () => request.get<any, AllTrademark>(API.ALLTRADEMARK_URL)

export const reqImageList = (spuId: number) => request.get<any, SpuHasImg>(API.IMAGELIST_URL + spuId)

export const reqSaleAttrList = (spuId: number) => request.get<any, SaleAttrResponseData>(API.SALE_URL + spuId)

export const reqBaseSaleList = () => request.get<any, baseSaleValueResponseData>(API.BASESALE_URL)

export const reqAddOrUpdateSpu = (data: SpuData) => {
    if (data.id) {
        return request.post<any, any>(API.UPDATESPU_URL, data)
    } else {
        return request.post<any, any>(API.ADDSPU_URL, data)
    }

}

export const reqAddSku = (data: SkuData) => request.post<any, any>(API.ADDSKU_URL, data)