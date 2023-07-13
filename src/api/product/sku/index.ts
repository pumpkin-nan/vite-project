import request from "@/utils/request";
import type { SkuResponseData, SkuInfoData } from './type'

enum API {
    SKUINFO_URL = '/admin/product/list/',
    CANCELSALE_URL = '/admin/product/cancelSale/',
    ONSALE_URL = '/admin/product/onSale/',
    DETAILSKU_URL = '/admin/product/getSkuInfo/',
    DELETESKU_URL = '/admin/product/deleteSku/'
}

export const reqSkuInfo = (page: number, limit: number) => request.get<any, SkuResponseData>(API.SKUINFO_URL + `${page}/${limit}`)

export const reqOnSale = (skuId: number | string) => request.get<any, any>(API.ONSALE_URL + skuId)

export const reqCancelSale = (skuId: number | string) => request.get<any, any>(API.CANCELSALE_URL + skuId)

export const reqDetailSku = (skuId: number | string) => request.get<any, SkuInfoData>(API.DETAILSKU_URL + skuId)

export const reqDeleteSku = (skuId: number | string) => request.delete<any, any>(API.DELETESKU_URL + skuId)


