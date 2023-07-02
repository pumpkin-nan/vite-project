<template>
    <el-card class="attr_category">
        <el-form inline="true">
            <el-form-item label="一级分类">
                <el-select placeholder="请选择" style="width: 200px;" v-model="categoryStore.c1Id" @change="categoryChange()">
                    <el-option :label="item.name" v-for="(item, index) in categoryStore.c1Arr" :key="item.id"
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="二级分类">
                <el-select placeholder="请选择" style="width: 200px;" v-model="categoryStore.c2Id" @change="c3Change()">
                    <el-option :label="item.name" v-for="(item, index) in categoryStore.c2Arr" :key="item.id"
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="三级分类">
                <el-select placeholder="请选择" style="width: 200px;" v-model="categoryStore.c3Id">
                    <el-option :label="item.name" v-for="(item, index) in categoryStore.c3Arr" :key="item.id"
                        :value="item.id"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </el-card>
</template>

<script setup lang="ts">
import { onMounted } from "vue"
import useCategoryStore from '@/store/modules/category'
let categoryStore = useCategoryStore()

onMounted(() => {
    getC1()
})

const getC1 = () => {
    categoryStore.getCategory1()
}

const categoryChange = () => {
    categoryStore.c2Id = ''
    categoryStore.c2Arr = []
    categoryStore.c3Id = ''
    categoryStore.getCategory2()
}

const c3Change = () => {
    categoryStore.c3Id = ''
    categoryStore.getCategory3()
}
</script>

<style lang="scss" scoped></style>
