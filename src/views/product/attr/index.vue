<template>
    <!-- 分类模块 -->
    <Category :scene="scene"></Category>
    <!-- 属性数据 -->
    <el-card class="attr_container">
        <!-- 属性列表数据 -->
        <div v-show="scene == 0">
            <el-button type="primary" icon="Plus" :disabled="!categoryStore.c3Id" @click="addAttr">添加平台属性</el-button>
            <el-table border style="margin: 10px 0;" :data="attrList">
                <el-table-column label="序号" width="90" type="index" align="center"></el-table-column>
                <el-table-column prop="attrName" label="属性名称" width="150px"></el-table-column>
                <el-table-column prop="attrValueList" label="属性值名称">
                    <template #="{ row, $index }">
                        <el-tag style="margin:5px" class="ml-2" type="success" v-for="(item, index) in row.attrValueList"
                            :key="item.id">{{
                                item.valueName }}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="150px">
                    <template #="{ row, $index }">
                        <el-button type="warning" icon="Edit" size="small" @click="editAttr(row)"></el-button>
                        <el-popconfirm :title="`是否确认删除${row.attrName} 吗？`" width="250px" @confirm="removeAttr(row.id)">
                            <template #reference>
                                <el-button type="danger" icon="delete" size="small"></el-button>
                            </template>
                        </el-popconfirm>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <!-- 添加/修改属性数据 -->
        <div v-show="scene == 1">
            <!-- 属性名称表单 -->
            <el-form :inline="true">
                <el-form-item label="属性名称">
                    <el-input type="text" placeholder="请输入属性的名称" v-model="attrParams.attrName"></el-input>
                </el-form-item>
            </el-form>
            <!-- 添加属性值和取消按钮 -->
            <el-button type="primary" icon="Plus" :disabled="!attrParams.attrName" @click="addAttrList">添加属性值</el-button>
            <el-button @click="cancel">取消</el-button>
            <!-- 属性值表格 -->
            <el-table border style="margin: 10px 0;" :data="attrParams.attrValueList">
                <el-table-column width="80px" type="index" label="序号" align="center"></el-table-column>
                <el-table-column label="属性值">
                    <template #="{ row, $index }">
                        <el-input :ref="(vc: any) => inputArr[$index] = vc" @blur="toLook(row, $index)" v-if="row.flag"
                            v-model="row.valueName" size="small" placeholder="请输入属性值名称"></el-input>
                        <div v-else @click="toEdit(row, $index)">{{ row.valueName }}</div>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template #="{ row, $index }">
                        <el-button type="danger" icon="delete" size="small"
                            @click="attrParams.attrValueList.splice($index, 1)">
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 保存和取消按钮 -->
            <el-button type="primary" @click="save"
                :disabled="attrParams.attrValueList.length > 0 ? false : true">保存</el-button>
            <el-button @click="cancel">取消</el-button>
        </div>
    </el-card>
</template>

<script setup lang="ts">
import { watch, ref, reactive, nextTick, onBeforeUnmount } from "vue"
import { reqAttrInfo, reqAddOrUpdateAttr, reqRemoveAttr } from '@/api/product/attr'
import useCategoryStore from '@/store/modules/category'
import type { AttrResponseData, Attr, AttrValue } from '@/api/product/attr/type.ts'
import { ElMessage } from "element-plus"

let categoryStore = useCategoryStore()
let attrList = ref<Attr[]>([])
let scene = ref<number>(0)
let attrParams = reactive<Attr>({
    attrName: '',
    attrValueList: [],
    categoryId: '',
    categoryLevel: 3
})
let inputArr = ref<any>([]);

// 监听三级分类id获取属性列表
watch(() => categoryStore.c3Id, () => {
    attrList.value = []
    if (!categoryStore.c3Id) return;
    getAttr()
})

// 获取属性列表
const getAttr = async () => {
    const { c1Id, c2Id, c3Id } = categoryStore
    let result: AttrResponseData = await reqAttrInfo(c1Id, c2Id, c3Id)
    if (result.code == 200) {
        attrList.value = result.data
    }
}

// 添加属性
const addAttr = async () => {
    scene.value = 1
    Object.assign(attrParams, {
        attrName: '',
        attrValueList: [],
        categoryId: categoryStore.c3Id,
        categoryLevel: 3
    })
}

// 修改属性
const editAttr = (row: Attr) => {
    scene.value = 1
    Object.assign(attrParams, JSON.parse(JSON.stringify(row)))
}

// 取消按钮
const cancel = () => {
    scene.value = 0
}
// 添加属性值
const addAttrList = () => {
    attrParams.attrValueList.push({
        valueName: '',
        flag: true
    })
    nextTick(() => {
        inputArr.value[attrParams.attrValueList.length - 1].focus()
    })
}
// 删除属性
const removeAttr = async (attrId: number) => {
    let result = await reqRemoveAttr(attrId)
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        getAttr()
    }
}

// 保存按钮
const save = async () => {
    if (attrParams.attrValueList.length > 0 && attrParams.attrValueList !== null) {
        let result: any = await reqAddOrUpdateAttr(attrParams)
        if (result.code == 200) {
            scene.value = 0
            ElMessage({
                type: 'success',
                message: attrParams.id ? '添加成功！' : '修改成功！'
            })
            getAttr()
        } else {
            ElMessage({
                type: 'error',
                message: attrParams.id ? '添加失败！' : '修改失败！'
            })
        }
    } else {
        ElMessage({
            type: 'error',
            message: '属性值不能为空'
        })
    }

}

const toLook = (row: AttrValue, $index: number | string) => {
    if (row.valueName.trim() == '') {
        attrParams.attrValueList.splice($index, 1)
        ElMessage({
            type: 'error',
            message: '属性值不能为空！'
        })
        return;
    }
    let repeat = attrParams.attrValueList.find((item) => {
        if (item != row) {
            return item.valueName === row.valueName
        }
    })
    if (repeat) {
        attrParams.attrValueList.splice($index, 1)
        ElMessage({
            type: 'error',
            message: '属性值不能为重复！'
        })
        return
    }
    row.flag = false;
}

const toEdit = (row: any, $index: number) => {
    row.flag = true
    nextTick(() => {
        inputArr.value[$index].focus()
    })
}

onBeforeUnmount(() => {
    categoryStore.$reset()
})
</script>

<style lang="scss" scoped>
.attr_container {
    margin: 10px 0;
}
</style>
