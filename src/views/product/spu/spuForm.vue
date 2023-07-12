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
                <el-select v-model="saleAttrIdAndValueName"
                    :placeholder="unSelectSaleAttr.length ? `还未选择${unSelectSaleAttr.length}个` : '无'">
                    <el-option :label="item.name" :value="`${item.id}:${item.name}`"
                        v-for="( item, index ) in  unSelectSaleAttr " :key="item.id"></el-option>
                </el-select>
                <el-button style="margin: 0 10px;" type="primary" icon="Plus"
                    :disabled="saleAttrIdAndValueName ? false : true" @click="addSaleAttr">添加销售属性</el-button>
                <el-table style="margin:10px 0;" border :data="saleAttrList">
                    <el-table-column label="序号" width="80px" align="center" type="index"></el-table-column>
                    <el-table-column label="属性名" prop="saleAttrName" width="120px"></el-table-column>
                    <el-table-column label="属性值">
                        <template #="{ row, $index }">
                            <el-tag style="margin: 0 5px;" v-for="( item, index ) in  row.spuSaleAttrValueList "
                                :key="item.id" class="mx-1" closable :disable-transitions="false" @close="handleClose(tag)">
                                {{ item.saleAttrValueName }}
                            </el-tag>
                            <el-input @blur="toLook(row)" type="text" placeholder="请输入属性值" size="small"
                                style="width:100px;margin:0 5px" v-if="row.flag == true"
                                v-model="row.saleAttrValue"></el-input>
                            <el-button v-else type="success" icon="Plus" size="small" @click="toEdit(row)"></el-button>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="120px" align="center">
                        <template #="{ row, $index }">
                            <el-button type="danger" icon="delete" size="small"
                                @click="saleAttrList.splice($index, 1)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-button type="primary" @click="save" :disabled="saleAttrList.length > 0 ? false : true">保存</el-button>
                <el-button @click="cancel">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { reqBaseSaleList, reqSaleAttrList, reqImageList, reqAllTrademark, reqAddOrUpdateSpu } from '@/api/product/spu'
import type { SaleAttrValue, SaleAttr, SpuData, SpuImg, SpuSaleAttrList, baseSaleValue, AllTrademark, Trademark, SpuHasImg, baseSaleValueResponseData, SaleAttrResponseData } from '@/api/product/spu/type'
import { ElMessage } from "element-plus"

let $emit = defineEmits('changeScene')
const cancel = () => {
    $emit('changeScene', { flag: 0, params: 'update' })
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
let saleAttrIdAndValueName = ref<string>('')

let unSelectSaleAttr = computed(() => {
    let unSelectAttr = baseSaleList.value.filter((item) => {
        return saleAttrList.value.every(item1 => {
            return item.name != item1.saleAttrName
        })
    })
    return unSelectAttr
})

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
const initAddSpu = async (c3Id: number | string) => {
    // 清空数据
    Object.assign(SpuParams.value, {
        spuName: '',
        description: '',
        category3Id: '',
        tmId: '',
        spuSaleAttrList: [],
        spuImageList: [],
    })
    imgList.value = []
    saleAttrList.value = []
    saleAttrIdAndValueName.value = ''
    SpuParams.value.id = ''

    SpuParams.value.category3Id = c3Id
    let result: AllTrademark = await reqAllTrademark()
    let result1: baseSaleValueResponseData = await reqBaseSaleList()
    allTrademarkList.value = result.data
    baseSaleList.value = result1.data

}

defineExpose({ initHasSpuData, initAddSpu })

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


const addSaleAttr = () => {
    /*
    baseSaleAttrId: number,
    saleAttrName: string,
    spuSaleAttrValueList: SpuSaleAttrList,
    */
    const [baseSaleAttrId, saleAttrName] = saleAttrIdAndValueName.value.split(':')
    let newSaleAttr: SaleAttr = {
        baseSaleAttrId,
        saleAttrName,
        spuSaleAttrValueList: []
    }
    //追加到数组当中
    saleAttrList.value.push(newSaleAttr);
    //清空收集的数据
    saleAttrIdAndValueName.value = '';
}

const toEdit = (row: SaleAttr) => {
    row.flag = true
    row.saleAttrValue = ''
}
const toLook = (row: SaleAttr) => {
    const { baseSaleAttrId, saleAttrValue } = row
    let newSaleAttrValue: SaleAttrValue = {
        baseSaleAttrId,
        saleAttrValueName: (saleAttrValue as string)
    }
    if ((saleAttrValue as string).trim() == '') {
        ElMessage({
            type: 'error',
            message: '属性值不能为空'
        })
        return
    }
    let repeat = row.spuSaleAttrValueList.find(item => {
        return item.saleAttrValueName == saleAttrValue
    })
    if (repeat) {
        ElMessage({
            type: 'error',
            message: '属性值不能重复'
        })
        return
    }

    row.spuSaleAttrValueList.push(newSaleAttrValue)
    row.flag = false
}
const save = async () => {
    SpuParams.value.spuImageList = imgList.value.map(item => {
        return {
            imgName: item.name,
            imgUrl: (item.response && item.response.data) || item.url
        }
    })
    SpuParams.value.spuSaleAttrList = saleAttrList.value
    let result = await reqAddOrUpdateSpu(SpuParams.value)
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: SpuParams.value.id ? '更新成功' : '添加成功'
        })
        $emit('changeScene', { flag: 0, params: SpuParams.value.id ? 'update' : 'add' })
    } else {
        ElMessage({
            type: 'error',
            message: SpuParams.value.id ? '更新失败' : '添加失败'
        })
    }

}
</script> 

<style lang="scss" scoped></style>
