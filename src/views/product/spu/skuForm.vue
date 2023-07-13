<template>
    <el-form label-width="80px">
        <el-form-item label="SKU名称">
            <el-input placeholder="请输入SKU名称" v-model="skuParams.skuName"></el-input>
        </el-form-item>
        <el-form-item label="价格(元)">
            <el-input placeholder="请输入价格(元)" v-model="skuParams.price"></el-input>
        </el-form-item>
        <el-form-item label="重量(克)">
            <el-input placeholder="请输入重量(克)" v-model="skuParams.weight"></el-input>
        </el-form-item>
        <el-form-item label="SKU描述">
            <el-input placeholder="请输入SKU描述" type="textarea" v-model="skuParams.skuDesc"></el-input>
        </el-form-item>
        <el-form-item label="平台属性">
            <el-form :inline="true">
                <el-form-item :label="item.attrName" v-for="(item, index) in  attrArr " :key="attrArr.id">
                    <el-select placeholder="请选择" v-model="item.attrIdAndValueId">
                        <el-option :value="`${item.id}:${attrValue.id}`" :label="attrValue.valueName"
                            v-for="(attrValue, index) in  item.attrValueList " :key="attrValue.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

        </el-form-item>
        <el-form-item label="销售属性">
            <el-form :inline="true">
                <el-form-item :label="item.saleAttrName" v-for="( item, index ) in  saleArr " :key="item.id">
                    <el-select placeholder="请选择" v-model="item.saleIdAndValueId">
                        <el-option :value="`${item.id}:${sale.id}`" :label="sale.saleAttrValueName"
                            v-for="( sale, index ) in  item.spuSaleAttrValueList " :key="sale.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="图片名称">
            <el-table border style="margin-bottom: 10px;" :data="imgArr" ref="table">
                <el-table-column type="selection" width="80px" align="center"></el-table-column>
                <el-table-column label="图片">
                    <template #="{ row, $index }">
                        <img :src="row.imgUrl" alt="" style="width: 100px; height:100px">
                    </template>
                </el-table-column>
                <el-table-column label="名称" prop="imgName"></el-table-column>
                <el-table-column label="操作">
                    <template #="{ row, $index }">
                        <el-button type="warning" @click="handler(row)">设置默认</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="primary" @click="save">保存</el-button>
            <el-button @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from "vue"
import { reqAttrInfo } from '@/api/product/attr'
import { reqImageList, reqSaleAttrList, reqAddSku } from '@/api/product/spu'
import type { SkuData } from '@/api/product/spu/type'
import { anyRoute } from "@/router/routers"
import { ElMessage } from "element-plus"

let $emit = defineEmits(['changeScene'])
let attrArr = ref<any>([])
let saleArr = ref<any>([])
let imgArr = ref<any>([])
let table = ref<any>()
let skuParams = reactive<SkuData>({
    category3Id: '',
    spuId: '',
    tmId: '',
    skuName: '',
    price: '',
    weight: '',
    skuDesc: '',
    skuAttrValueList: [],
    skuSaleAttrValueList: [],
    skuDefaultImg: ''
})

const cancel = () => {
    $emit('changeScene', { flag: 0, params: '' })
}


const handler = (row: any) => {
    imgArr.value.forEach((item: any) => {
        table.value.toggleRowSelection(item, false)
    });
    table.value.toggleRowSelection(row, true)
    skuParams.skuDefaultImg = row.imgUrl

}
const save = async () => {
    skuParams.skuAttrValueList = attrArr.value.reduce((prev: any, next: any) => {
        if (next.attrIdAndValueId) {
            let [attrId, valueId] = next.attrIdAndValueId.split(':')
            if (next.attrIdAndValueId) {
                prev.push({
                    attrId,
                    valueId
                })
            }
            return prev
        }
    }, [])
    // skuParams.skuSaleAttrValueList = saleArr.value.reduce((prev: any, next: any) => {
    //     if (next.saleIdAndValueId) {
    //         let [saleAttrId, saleAttrValueId] = next.saleIdAndValueId.split(':')
    //         if (next.saleIdAndValueId) {
    //             prev.push({
    //                 saleAttrId,
    //                 saleAttrValueId
    //             })
    //         }
    //         return prev
    //     }
    // }, [])

    skuParams.skuAttrValueList = attrArr
    let result: any = await reqAddSku(skuParams)
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: '添加SKU成功'
        })
        $emit('changeScene', { flag: 0, params: '' })
    } else {
        ElMessage({
            type: 'error',
            message: '添加SKU失败'
        })
    }
}

let initSkuData = async (c1Id: number | string, c2Id: number | string, spu: any) => {
    skuParams.category3Id = spu.category3Id
    skuParams.spuId = spu.id
    skuParams.tmId = spu.tmId

    let result: any = await reqAttrInfo(c1Id, c2Id, spu.category3Id)
    let result1: any = await reqSaleAttrList(spu.id)
    let result2: any = await reqImageList(spu.id)

    attrArr.value = result.data
    saleArr.value = result1.data
    imgArr.value = result2.data

}
defineExpose({ initSkuData })


</script>

<style lang="scss" scoped></style>

