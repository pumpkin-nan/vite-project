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
                            <el-button type="primary" icon="Plus" size="small" @click="addSku"></el-button>
                            <el-button type="warning" icon="Edit" size="small" @click="editSpu(row)"></el-button>
                            <el-button type="info" icon="InfoFilled" size="small"></el-button>
                            <el-button type="danger" icon="delete" size="small"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[3, 5, 7, 9]"
                    :background="true" layout=" prev, pager, next, jumper,->,sizes,total" :total="total"
                    @size-change="handleSizeChange" @current-change="getSpuInfo" />
            </div>
            <SpuForm v-show="scene == 1" @changeScene="changeScene" ref="spu"></SpuForm>
            <SkuForm v-show="scene == 2" @changeScene="changeScene"></SkuForm>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from "vue"
import { reqSpuInfo } from '@/api/product/spu'
import type { SpuData, SpuInfoResponseData } from '@/api/product/spu/type'
import useCategoryStore from '@/store/modules/category'
import Category from '@/components/Category/index.vue'
import SkuForm from './skuForm.vue'
import SpuForm from './spuForm.vue'
import { ElStep } from "element-plus/es/components/index.js"


let categoryStore = useCategoryStore()
let scene = ref<number>(2)
let pageNo = ref<number>(1)
let pageSize = ref<number>(3)
let total = ref<number>(0)
let records = ref<SpuData[]>([])
let spu = ref<any>()

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

// 添加sku
const addSku = () => {
    scene.value = 2
}
</script>

<style lang="scss" scoped></style>
