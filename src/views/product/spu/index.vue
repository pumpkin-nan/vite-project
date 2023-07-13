<template>
    <div>
        <Category :scene="scene"></Category>
        <el-card style="margin: 10px 0;">
            <div v-show="scene == 0">
                <el-button type="primary" icon="Plus" :disabled="categoryStore.c3Id ? false : true"
                    @click="addSpu">添加SPU</el-button>
                <el-table border style="margin: 10px 0;" :data="records">
                    <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
                    <el-table-column label="SPU名称" prop="spuName" show-overflow-tooltip="true"></el-table-column>
                    <el-table-column label="SPU描述" prop="description" show-overflow-tooltip="true"></el-table-column>
                    <el-table-column label="操作">
                        <template #="{ row, $index }">
                            <el-button type="primary" icon="Plus" size="small" @click="addSku(row)"></el-button>
                            <el-button type="warning" icon="Edit" size="small" @click="editSpu(row)"></el-button>
                            <el-button type="info" icon="InfoFilled" size="small" @click="LookSku(row)"></el-button>
                            <el-button type="danger" icon="delete" size="small"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
                    :background="true" layout=" prev, pager, next, jumper,->,sizes,total" :total="total"
                    @size-change="handleSizeChange" @current-change="getSpuInfo" />
            </div>
            <SpuForm v-show="scene == 1" @changeScene="changeScene" ref="spu"></SpuForm>
            <SkuForm v-show="scene == 2" @changeScene="changeScene" ref="sku"></SkuForm>
            <!-- 查看对话框 -->
            <el-dialog v-model="dialogVisible" title="SKU列表">
                <template #footer>
                    <el-table border :data="skuArr">
                        <el-table-column label="SKU名称" prop="skuName"></el-table-column>
                        <el-table-column label="SKU价格" prop="price"></el-table-column>
                        <el-table-column label="SKU重量" prop="weight"></el-table-column>
                        <el-table-column label="SKU图片">
                            <template #="{ row, $index }">
                                <img :src="row.skuDefaultImg" alt="" style="width: 100px; height:100px">
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-dialog>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from "vue"
import { reqSpuInfo, reqSkuList } from '@/api/product/spu'
import type { SpuData, SpuInfoResponseData, SkuInfoData } from '@/api/product/spu/type'
import useCategoryStore from '@/store/modules/category'
import Category from '@/components/Category/index.vue'
import SkuForm from './skuForm.vue'
import SpuForm from './spuForm.vue'

let categoryStore = useCategoryStore()
let scene = ref<number>(0)
let pageNo = ref<number>(1)
let pageSize = ref<number>(3)
let total = ref<number>(0)
let records = ref<SpuData[]>([])
let spu = ref<any>()
let sku = ref<any>()
let dialogVisible = ref<boolean>(false)
let skuArr = ref<SkuData[]>([])

watch(() => categoryStore.c3Id, () => {
    if (!categoryStore.c3Id) return;
    getSpuInfo()
})
onBeforeUnmount(() => {
    categoryStore.$reset()
})

// 获取用户信息
const getSpuInfo = async (pager = 1) => {
    pageNo.value = pager
    let result: SpuInfoResponseData = await reqSpuInfo(pageNo.value, pageSize.value, categoryStore.c3Id)
    if (result.code == 200) {
        records.value = result.data.records
        pageNo.value = result.data.current
        pageSize.value = result.data.size
        total.value = result.data.total
    }
}
// 分页切换每页显示条数
const handleSizeChange = () => {
    getSpuInfo()
}

// 添加SPU
const addSpu = () => {
    scene.value = 1
    spu.value.initAddSpu(categoryStore.c3Id)
}
// 修改SPU
const editSpu = (row: SpuData) => {
    scene.value = 1
    spu.value.initHasSpuData(row)
}

const changeScene = (obj: any) => {
    scene.value = obj.flag
    if (obj.params == 'update') {
        getSpuInfo(pageNo.value)
    } else {
        getSpuInfo()
    }
}
// 查看sku
const LookSku = async (row: SpuData) => {
    dialogVisible.value = true
    let result: SkuInfoData = await reqSkuList((row.id) as number)
    if (result.code == 200) {
        skuArr.value = result.data
    }
}
// 添加sku
const addSku = (row: SpuData) => {
    scene.value = 2
    sku.value.initSkuData(categoryStore.c1Id, categoryStore.c2Id, row)
}
</script>

<style lang="scss" scoped></style>
