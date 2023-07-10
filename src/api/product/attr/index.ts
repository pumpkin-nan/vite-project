//这里书写属性相关的API文件
import request from "@/utils/request";
import type { CategoryResponse, AttrResponseData, Attr } from './type'

//属性管理模块接口地址
enum API {
    //获取一级分类接口地址
    C1_URL = '/admin/product/getCategory1',
    //获取二级分类接口地址
    C2_URL = '/admin/product/getCategory2/',
    //获取三级分类接口地址
    C3_URL = '/admin/product/getCategory3/',
    // 获取分类下已有的属性和属性值接口
    ATTR_URL = '/admin/product/attrInfoList/',
    ADDORUPDATEATTR_URL = '/admin/product/saveAttrInfo',
    REMOVEATTR_URL = '/admin/product/deleteAttr/'

}

//获取一级分类的接口方法
export const reqC1 = () => request.get<any, CategoryResponse>(API.C1_URL);
//获取二级分类的接口方法
export const reqC2 = (category1Id: number | string) => request.get<any, CategoryResponse>(API.C2_URL + category1Id);
//获取二级分类的接口方法
export const reqC3 = (category2Id: number | string) => request.get<any, CategoryResponse>(API.C3_URL + category2Id);
// 获取分类下已有的属性和属性值接口
export const reqAttrInfo = (category1Id: number | string, category2Id: number | string, category3Id: number | string) => request.get<any, AttrResponseData>(API.ATTR_URL + `${category1Id}/${category2Id}/${category3Id}`)
// 添加/修改属性
export const reqAddOrUpdateAttr = (data: Attr) => request.post<any, any>(API.ADDORUPDATEATTR_URL, data)
// 删除属性
export const reqRemoveAttr = (attrId: number) => request.delete<any, any>(API.REMOVEATTR_URL + `${attrId}`)