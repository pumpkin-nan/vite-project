<template>
    <el-form label-width="80px">
        <el-form-item label="SKU名称">
            <el-input placeholder="请输入SKU名称"></el-input>
        </el-form-item>
        <el-form-item label="价格(元)">
            <el-input placeholder="请输入价格(元)"></el-input>
        </el-form-item>
        <el-form-item label="重量(克)">
            <el-input placeholder="请输入重量(克)"></el-input>
        </el-form-item>
        <el-form-item label="SKU描述">
            <el-input placeholder="请输入SKU描述" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="平台属性">
            <el-form :inline="true">
                <el-form-item :label="item.attrName" v-for="(item, index) in attrArr" :key="attrArr.id">
                    <el-select placeholder="请选择">
                        <el-option :label="attrValue.valueName" v-for="(attrValue, index) in item.attrValueList"
                            :key="attrValue.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>

        </el-form-item>
        <el-form-item label="销售属性">
            <el-form :inline="true">
                <el-form-item :label="item.saleAttrName" v-for="(item, index) in saleArr" :key="item.id">
                    <el-select placeholder="请选择">
                        <el-option :label="sale.saleAttrValueName" v-for="(sale, index) in item.spuSaleAttrValueList"
                            :key="sale.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="图片名称">
            <el-table border style="margin-bottom: 10px;" :data="imgArr">
                <el-table-column type="selection" width="80px" align="center"></el-table-column>
                <el-table-column label="图片">
                    <template #="{ row, $index }">
                        <img :src="row.imgUrl" alt="" style="width: 100px; height:100px">
                    </template>
                </el-table-column>
                <el-table-column label="名称" prop="imgName"></el-table-column>
                <el-table-column label="操作">
                    <template #="{ row, $index }">
                        <el-button type="warning">设置默认</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="primary">保存</el-button>
            <el-button @click="cancel">取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { reqAttrInfo } from '@/api/product/attr'
import { reqImageList, reqSaleAttrList } from '@/api/product/spu'
let $emit = defineEmits(['changeScene'])
let attrArr = ref<any>([])
let saleArr = ref<any>([])
let imgArr = ref<any>([])

const cancel = () => {
    $emit('changeScene', { flag: 0, params: '' })
}

let initSkuData = async (c1Id: number | string, c2Id: number | string, spu: any) => {
    console.log(c1Id, c2Id, spu)
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

