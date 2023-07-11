<template>
    <div>
        <el-form label-width="120px">
            <el-form-item label="SPU名称">
                <el-input placeholder="请您输入SPU名称" v-model="SpuParams.spuName"></el-input>
            </el-form-item>
            <el-form-item label="SPU品牌">
                <el-select placeholder="请选择SPU品牌" v-model="SpuParams.tmId">
                    <el-option :label="item.tmName" :value="item.id" v-for="(item, index) in allTrademarkList"
                        :key="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="SPU描述">
                <el-input type="textarea" v-model="SpuParams.description"></el-input>
            </el-form-item>
            <el-form-item label="SPU照片">
                <el-upload v-model:file-list="imgList" action="/api/admin/product/fileUpload" list-type="picture-card"
                    :on-preview="handlePictureCardPreview" :on-remove="handleRemove" :before-upload="beforeUpload">
                    <el-icon>
                        <Plus />
                    </el-icon>
                </el-upload>

                <el-dialog v-model="dialogVisible">
                    <img w-full :src="dialogImageUrl" alt="Preview Image" style="width:100%;height:100%" />
                </el-dialog>
            </el-form-item>
            <el-form-item label="SPU销售属性">
                <el-select placeholder="请选择SPU品牌">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="shanghai"></el-option>
                </el-select>
                <el-button style="margin: 0 10px;" type="primary" icon="Plus">添加销售属性值</el-button>
                <el-table style="margin:10px 0;" border>
                    <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
                    <el-table-column label="属性名"></el-table-column>
                    <el-table-column label="属性值">
                    </el-table-column>
                    <el-table-column label="操作">
                        <template #="{ row, $index }">
                            <el-button type="danger" icon="delete" size="small"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary">保存</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { reqBaseSaleList, reqSaleAttrList, reqImageList, reqAllTrademark } from '@/api/product/spu'
import type { SpuData, SpuImg, SpuSaleAttrList, baseSaleValue, AllTrademark, Trademark, SpuHasImg, baseSaleValueResponseData, SaleAttrResponseData } from '@/api/product/spu/type'
import { ElMessage } from "element-plus"

let $emit = defineEmits('changeScene')
const cancel = () => {
    $emit('changeScene', 0)
}

let allTrademarkList = ref<Trademark[]>([])
let imgList = ref<SpuImg[]>([])
let saleAttrList = ref<SpuSaleAttrList>([])
let baseSaleList = ref<baseSaleValue[]>([])
let SpuParams = ref<SpuData>({
    spuName: '',
    description: '',
    category3Id: '',
    tmId: '',
    spuSaleAttrList: [],
    spuImageList: [],
})
let dialogVisible = ref<boolean>(false)
let dialogImageUrl = ref<string>('')


const initHasSpuData = async (spu: SpuData) => {
    SpuParams.value = spu
    let result: AllTrademark = await reqAllTrademark()
    let result1: SpuHasImg = await reqImageList((spu.id as number))
    let result2: SaleAttrResponseData = await reqSaleAttrList((spu.id as number))
    let result3: baseSaleValueResponseData = await reqBaseSaleList()
    allTrademarkList.value = result.data
    imgList.value = result1.data.map((item) => {
        return {
            name: item.imgName,
            url: item.imgUrl
        }
    })
    saleAttrList.value = result2.data
    baseSaleList.value = result3.data

}

const handlePictureCardPreview = (file: any) => {
    dialogImageUrl.value = file.url
    dialogVisible.value = true

}
const handleRemove = () => {

}

const beforeUpload = (file: any) => {
    if (file.type == 'image/png' || file.type == 'image/jpeg' || file.type == 'image/gif') {
        if (file.size / 1024 / 1024 < 3) {
            return true
        } else {
            ElMessage({
                type: 'error',
                message: '上传的文件必须小于3M'
            })
            return false
        }
    } else {
        ElMessage({
            type: 'error',
            message: '上传的文件必须为PNG|JPEG|GIF'
        })
        return false
    }
}
defineExpose({ initHasSpuData })
</script> 

<style lang="scss" scoped></style>
