<template>
    <!-- 分类模块 -->
    <Category></Category>
    <!-- 属性数据 -->
    <el-card class="attr_container">
        <el-button type="primary" icon="Plus" :disabled="!categoryStore.c3Id">添加平台属性</el-button>
        <el-table border style="margin: 10px 0;">
            <el-table-column label="序号" width="90" type="index" align="center"></el-table-column>
            <el-table-column label="属性名称" width="150px"></el-table-column>
            <el-table-column label="属性值名称"></el-table-column>
            <el-table-column label="操作" width="150px"></el-table-column>
        </el-table>
    </el-card>
</template>

<script setup lang="ts">
import { } from "vue"
import useCategoryStore from '@/store/modules/category'
let categoryStore = useCategoryStore()
</script>

<style lang="scss" scoped>
.attr_container {
    margin: 10px 0;
}
</style>
