import request from "@/utils/request";
import type { SpuInfoResponseData } from './type'

enum API {
    SPUINFO_URL = '/admin/product/'
}

export const reqSpuInfo = (page: number, limit: number, category3Id: number | string) => request.get<any, SpuInfoResponseData>(API.SPUINFO_URL + `${page}/${limit}?category3Id=${category3Id}`)