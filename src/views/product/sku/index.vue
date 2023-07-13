<template>
    <el-card>
        <el-table border :data="skuArr" setScrollLeft="left">
            <el-table-column label="序号" type="index" width="80px" align="center"></el-table-column>
            <el-table-column label="名称" show-overflow-tooltip width="150px" prop="skuName"></el-table-column>
            <el-table-column label="描述" show-overflow-tooltip width="150px" prop="skuDesc"></el-table-column>
            <el-table-column label="默认图片" width="150px">
                <template #="{ row, $index }">
                    <img :src="row.skuDefaultImg" alt="" style="width: 100px; height:100px">
                </template>
            </el-table-column>
            <el-table-column label="重量(g)" width="150px" prop="weight"></el-table-column>
            <el-table-column label="价格(元)" width="150px" prop="price"></el-table-column>
            <el-table-column label="操作" width="250px" fixed="right">
                <template #="{ row, $index }">
                    <el-button size="small" :icon="row.isSale == 1 ? 'Bottom' : 'Top'"
                        :type="row.isSale == 1 ? 'info' : 'success'" @click="updateSale(row)"></el-button>
                    <el-button size="small" icon="Edit" type="primary" @click="editSale"></el-button>
                    <el-button size="small" icon="InfoFilled" type="info" @click="detailSale(row)"></el-button>
                    <el-popconfirm :title="`确认删除${row.skuName}吗？`" @confirm="removeSku(row.id)" width="250px">
                        <template #reference>
                            <el-button size="small" icon="delete" type="danger"></el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination style="margin: 10px 0;" v-model:current-page="pageNo" v-model:page-size="pageSize"
            :page-sizes="[5, 7, 9, 12]" :background="true" layout="prev, pager, next, jumper,->,sizes,total" :total="total"
            @size-change="handleSizeChange" @current-change="getSkuInfo" />

        <el-drawer v-model="drawer">
            <template #header>
                <h4>查看商品详情</h4>
            </template>
            <template #default>
                <el-row style="margin: 10px 0 ;">
                    <el-col :span="6">名称</el-col>
                    <el-col :span="18">{{ skuInfo.skuName }}</el-col>
                </el-row>
                <el-row style="margin: 10px 0 ;">
                    <el-col :span="6">描述</el-col>
                    <el-col :span="18">{{ skuInfo.skuDesc }}</el-col>
                </el-row>
                <el-row style="margin: 10px 0 ;">
                    <el-col :span="6">价格</el-col>
                    <el-col :span="18">{{ skuInfo.price }}</el-col>
                </el-row>
                <el-row style="margin: 10px 0 ;">
                    <el-col :span="6">平台属性</el-col>
                    <el-col :span="18">
                        <el-tag style="margin:5px" v-for="(item, index) in skuInfo.skuAttrValueList" :key="item.id">{{
                            item.attrName }}</el-tag>
                    </el-col>
                </el-row>
                <el-row style="margin: 10px 0 ;">
                    <el-col :span="6">销售属性</el-col>
                    <el-col :span="18">
                        <el-tag style="margin:5px" v-for="(item, index) in skuInfo.skuSaleAttrValueList" :key="item.id">{{
                            item.saleAttrName
                        }}</el-tag>
                    </el-col>
                </el-row>
                <el-row style="margin: 10px 0 ;">
                    <el-col :span="6">商品图片</el-col>
                    <el-col :span="18">
                        <el-carousel :interval="4000" type="card" height="100px" indicator-position="outside">
                            <el-carousel-item v-for="(item, index) in skuInfo.skuImageList" :key="item.id">
                                <img :src="item.imgUrl" alt="" style="width: 100%;height:100%">
                            </el-carousel-item>
                        </el-carousel>
                    </el-col>
                </el-row>
            </template>
        </el-drawer>
    </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { reqSkuInfo, reqOnSale, reqCancelSale, reqDetailSku, reqDeleteSku } from '@/api/product/sku'
import type { SkuResponseData, SkuData, SkuInfoData } from '@/api/product/sku/type'
import { ElMessage } from "element-plus"

let pageNo = ref<number>(1)
let pageSize = ref<number>(5)
let total = ref<number>(0)
let skuArr = ref<SkuData[]>([])
let drawer = ref<boolean>(false)
let skuInfo = ref<SkuData>({})

onMounted(() => {
    getSkuInfo()
})
const getSkuInfo = async (pager = 1) => {
    pageNo.value = pager
    let result: SkuResponseData = await reqSkuInfo(pageNo.value, pageSize.value)
    if (result.code == 200) {
        skuArr.value = result.data.records
        pageNo.value = result.data.current
        pageSize.value = result.data.size
        total.value = result.data.pages
    }
}
const handleSizeChange = () => {
    getSkuInfo()
}

const updateSale = async (row: SkuData) => {
    if (row.isSale == 1) {
        let result = await reqCancelSale((row.id) as number)
        if (result.code == 200) {
            ElMessage({
                type: 'success',
                message: '下架成功'
            })
            getSkuInfo(pageNo.value)
        } else {
            ElMessage({
                type: 'error',
                message: '下架失败'
            })
        }
    } else {
        let result = await reqOnSale((row.id) as number)
        if (result.code == 200) {
            ElMessage({
                type: 'success',
                message: '上架成功'
            })
            getSkuInfo(pageNo.value)
        } else {
            ElMessage({
                type: 'error',
                message: '上架失败'
            })
        }
    }
}

const editSale = () => {
    ElMessage({
        type: 'success',
        message: '正在开发中'
    })
}

const detailSale = async (row: SkuData) => {
    drawer.value = true
    let result: SkuInfoData = await reqDetailSku((row.id) as number)
    if (result.code == 200) {
        skuInfo.value = result.data
    }
}

const removeSku = async (id: number) => {
    let result: any = await reqDeleteSku(id)
    console.log(result)
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        getSkuInfo(skuArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
    } else {
        ElMessage({
            type: 'error',
            message: '系统数据不能删除'
        })
    }
}
</script>

<style scoped>
.el-carousel__item h3 {
    color: #475669;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
    text-align: center;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
}
</style>
