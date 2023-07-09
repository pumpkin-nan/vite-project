<template>
    <el-card class="box-card">
        <!-- 品牌按钮 -->
        <el-button type="primary" size="default" icon="plus" @click="addTrademark"
            v-has="`btn.Trademark.add`">添加品牌</el-button>
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
                    <el-button type="warning" icon="Edit" size="small" @click="$event => updateTrademark(row)"></el-button>
                    <el-popconfirm :title="`您是否要删除${row.tmName}吗？`" width="200px" icon="Delete"
                        @confirm="removeTrademark(row.id)">
                        <template #reference>
                            <el-button type="danger" icon="Delete" size="small"></el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <!--   @current-change="handleCurrentChange" -->
        <el-pagination v-model:current-page="pageNo" v-model:page-size="limit" :page-sizes="[3, 5, 7, 9]" :background="true"
            layout="prev, pager, next, jumper,->,sizes,total" :total="total" @current-change="getHasTrademark"
            @size-change="handleSizeChange" />
    </el-card>
    <!-- 对话框组件 -->
    <el-dialog v-model="dialogFormVisible" :title="trademarkParams.id ? '修改品牌' : '添加品牌'">
        <el-form style="width: 80%;" :model="trademarkParams" :rules="rules" ref="formRef">
            <el-form-item label="品牌名称" label-width="100px" prop="tmName">
                <el-input placeholder="请您输入品牌名称" v-model="trademarkParams.tmName"></el-input>
            </el-form-item>
            <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
                <el-upload class="avatar-uploader" v-model="trademarkParams.logoUrl" action="/api/admin/product/fileUpload"
                    :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                    <img v-if="trademarkParams.logoUrl" :src="trademarkParams.logoUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon">
                        <Plus />
                    </el-icon>
                </el-upload>
            </el-form-item>
        </el-form>
        <!-- 对话框底部按钮 -->
        <template #footer>
            <span class="dialog-footer">
                <el-button type="primary" size="default" @click="cancel">取消</el-button>
                <el-button type="primary" size="default" @click="confirm">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from "vue"
import { reqHasTrademark, reqAddOrUpdateTrademark, reqDeleteTrademark } from '@/api/product/trademark'
import type { Records, Trademark, TrademarkResponseData } from '@/api/product/trademark/type'
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'


let pageNo = ref<number>(1)
let limit = ref<number>(3)
let total = ref<number>(0)
let trademarkArr = ref<Records>([])
let dialogFormVisible = ref<boolean>(false)
let trademarkParams = reactive<Trademark>({
    logoUrl: '',
    tmName: ''
})
// 获取组件实例
let formRef = ref()

onMounted(() => {
    getHasTrademark()
})
// 修改品牌
const updateTrademark = (row: Trademark) => {
    dialogFormVisible.value = true
    Object.assign(trademarkParams, row)
    nextTick(() => {
        formRef.value.clearValidate('tmName')
        formRef.value.clearValidate('logoUrl')
    })
}
// 添加品牌
const addTrademark = () => {
    dialogFormVisible.value = true
    trademarkParams.id = ''
    trademarkParams.tmName = ''
    trademarkParams.logoUrl = ''
    formRef.value?.clearValidate('tmName')
    formRef.value?.clearValidate('logoUrl')

}
const handleSizeChange = () => {
    getHasTrademark()
}
// 取消按钮
const cancel = () => {
    dialogFormVisible.value = false
}
// 确认按钮
const confirm = async () => {
    // 触发校验规则
    await formRef.value.validate()
    let result = await reqAddOrUpdateTrademark(trademarkParams)
    if (result.code == 200) {
        dialogFormVisible.value = false;
        ElMessage({
            type: 'success',
            message: trademarkParams.id ? '修改品牌成功' : '添加品牌成功'
        })
        getHasTrademark(trademarkParams.id ? pageNo.value : 1)
    } else {
        ElMessage({
            type: 'error',
            message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败'
        })
        dialogFormVisible.value = false;
    }
}
// 获取品牌信息
const getHasTrademark = async (page = 1) => {
    pageNo.value = page;
    let result: TrademarkResponseData = await reqHasTrademark(pageNo.value, limit.value)
    if (result.code == 200) {
        total.value = result.data.total
        trademarkArr.value = result.data.records
    }
}

// 上传图片约束
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile: any) => {
    if (rawFile.type == 'image/png' || rawFile.type == 'image/jpeg' || rawFile.type == 'image/gif') {
        if (rawFile.size / 1024 / 1024 <= 4) {
            return true
        } else {
            ElMessage({
                type: 'error',
                message: '文件必须小于4M'
            });
            return false
        }
    } else {
        ElMessage({
            type: 'error',
            message: trademarkParams.id ? '修改品牌失败' : '添加品牌失败'
        });
        return false
    }
}
// 上传文件成功
const handleAvatarSuccess: UploadProps['onSuccess'] = (response: any) => {
    trademarkParams.logoUrl = response.data
    formRef.value.clearValidate('logoUrl')
}
// 校验自定义品牌名称
const validateTmName = (rule: any, value: any, callBack: any) => {
    if (value.trim().length >= 2) {
        callBack()
    } else {
        callBack(new Error('品牌名称位数必须大于2位'))
    }
}
// 校验logo
const validateLogoUrl = (rule: any, value: any, callBack: any) => {
    if (value) {
        callBack()
    } else {
        callBack(new Error('品牌图片必须上传'))
    }
}
// 添加品牌表单的校验
const rules = {
    tmName: [
        { required: true, trigger: 'blur', validator: validateTmName }
    ],
    logoUrl: [
        { required: true, validator: validateLogoUrl }
    ]
}
// 删除按钮
const removeTrademark = async (id: number) => {
    let result = await reqDeleteTrademark(id)
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: '删除品牌成功'
        })
        getHasTrademark(trademarkArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
    } else {
        ElMessage({
            type: 'error',
            message: '删除品牌失败'
        })
    }
}
</script>

<style lang="scss" scoped>
.trademark_table {
    margin: 10px 0px;
}

.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>