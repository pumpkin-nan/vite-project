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
                <el-form-item label="手机">
                    <el-select placeholder="请选择">
                        <el-option label="2222"></el-option>
                        <el-option label="2222"></el-option>
                        <el-option label="2222"></el-option>
                        <el-option label="2222"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="手机">
                    <el-select placeholder="请选择">
                        <el-option label="2222"></el-option>
                        <el-option label="2222"></el-option>
                        <el-option label="2222"></el-option>
                        <el-option label="2222"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="手机">
                    <el-select placeholder="请选择">
                        <el-option label="2222"></el-option>
                        <el-option label="2222"></el-option>
                        <el-option label="2222"></el-option>
                        <el-option label="2222"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <el-form :inline="true">
                <el-form-item label="手机">
                    <el-select placeholder="请选择">
                        <el-option label="2222"></el-option>
                        <el-option label="2222"></el-option>
                        <el-option label="2222"></el-option>
                        <el-option label="2222"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="手机">
                    <el-select placeholder="请选择">
                        <el-option label="2222"></el-option>
                        <el-option label="2222"></el-option>
                        <el-option label="2222"></el-option>
                        <el-option label="2222"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="手机">
                    <el-select placeholder="请选择">
                        <el-option label="2222"></el-option>
                        <el-option label="2222"></el-option>
                        <el-option label="2222"></el-option>
                        <el-option label="2222"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-form-item>
        <el-form-item label="销售属性">
            <el-select placeholder="请选择">
                <el-option label="2222"></el-option>
                <el-option label="2222"></el-option>
                <el-option label="2222"></el-option>
                <el-option label="2222"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="图片名称">
            <el-table border style="margin-bottom: 10px;" :data="[1, 2, 3, 5]">
                <el-table-column type="selection" width="80px" align="center"></el-table-column>
                <el-table-column label="图片"></el-table-column>
                <el-table-column label="名称"></el-table-column>
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

<script setup>
import { } from "vue"

let $emit = defineEmits(['changeScene'])

const cancel = () => {
    $emit('changeScene', { flag: 0, params: '' })
}

</script>

<style lang="scss" scoped></style>

