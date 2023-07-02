import request from "@/utils/request";
import type { TrademarkResponseData } from './type'
enum FOO {
    TRADEMARK_URL = "/admin/product/baseTrademark/"
}

export const reqHasTrademark = (page: number, limit: number) =>
    request.get<any, TrademarkResponseData>(FOO.TRADEMARK_URL + `${page}/${limit}`)