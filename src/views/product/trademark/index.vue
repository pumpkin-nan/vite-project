<template>
    <el-card class="box-card">
        <!-- 品牌按钮 -->
        <el-button type="primary" size="default" icon="plus">添加品牌</el-button>
        <!-- 表格 -->
        <el-table class="trademark_table" :data="trademarkArr" border style="width: 100%">
            <el-table-column type="index" label="序号" width="80" align="center" />
            <el-table-column prop="tmName" label="品牌名称" />
            <el-table-column label="品牌LOGO">
                <template #="{ row, $index }">
                    <img :src="row.logoUrl" alt="无图片" style="width: 100px;height:100px">
                </template>
            </el-table-column>
            <el-table-column prop="address" label="品牌操作">
                <template #="{ row, $index }">
                    <el-button type="warning" icon="Edit" size="small"></el-button>
                    <el-button type="danger" icon="Delete" size="small"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <!--   @current-change="handleCurrentChange" -->
        <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]" :background="true"
            layout="prev, pager, next, jumper,->,sizes,total" :total="total" @current-change="getHasTrademark"
            @size-change="getHasTrademark" />
    </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import { reqHasTrademark } from '@/api/product/trademark'
import type { Records } from '@/api/product/trademark/type'
let pageNo = ref<number>(1)
let limit = ref<number>(3)
let total = ref<number>(0)
let trademarkArr = ref<Records>([])
const handleSizeChange = () => {
    getHasTrademark()
}
const getHasTrademark = async (page = 1) => {
    pageNo.value = page;
    let result: TrademarkResponseData = await reqHasTrademark(pageNo.value, limit.value)
    if (result.code == 200) {
        total.value = result.data.total
        trademarkArr.value = result.data.records
    }
}
onMounted(() => {
    getHasTrademark()
})
</script>

<style lang="scss" scoped>
.trademark_table {
    margin: 10px 0px;
}
</style>
