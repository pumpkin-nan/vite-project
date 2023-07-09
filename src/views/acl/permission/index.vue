<template>
    <el-table :data="permissionList" style="width: 100%; margin-bottom: 20px" row-key="id" border>
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="code" label="权限值" />
        <el-table-column prop="updateTime" label="修改时间" />
        <el-table-column prop="address" label="操作">
            <template #="{ row, $index }">
                <el-button type="primary" size="small" :disabled="row.level == 4 ? true : false" @click="addPermission(row)"
                    v-has="`btn.Permission.add`">{{
                        row.level == 3 ? '添加功能'
                        : '添加菜单' }}</el-button>
                <el-button type="primary" size="small" :disabled="row.level == 1 ? true : false"
                    @click="editPermission(row)" v-has="`btn.Permission.update`">编辑</el-button>
                <!-- 删除确认框 -->
                <el-popconfirm title="是否确认删除？" @confirm="removePression(row)">
                    <template #reference>
                        <el-button type="danger" size="small" :disabled="row.level == 1 ? true : false"
                            v-has="`btn.Permission.remove`">删除</el-button>
                    </template>
                </el-popconfirm>
            </template>
        </el-table-column>
    </el-table>
    <!-- 弹出框 -->
    <el-dialog v-model="dialogVisible" width="30%" :title="permissionArr.id ? '修改菜单' : '添加菜单'">
        <template #default>
            <el-form label-position="right" label-width="70px" v-model="permissionArr">
                <el-form-item label="名称" prop="name">
                    <el-input placeholder="请填写名称" v-model="permissionArr.name"></el-input>
                </el-form-item>
                <el-form-item label="权限值" prop="code">
                    <el-input placeholder="请填写权限值" v-model="permissionArr.code"></el-input>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="confirmPermission(row)">
                    确定
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { onMounted, ref, reactive, nextTick } from 'vue'
import { reqPermission, reqAddOrUpdatePermission, reqRemovePermission } from '@/api/acl/menu'
import type { PermissionList, PermissionResponseData, Permission, MenuParams } from '@/api/acl/menu/type'
import { ElMessage } from 'element-plus'

let permissionList = ref<PermissionList>([])
let dialogVisible = ref<boolean>(false)
let permissionArr = reactive<MenuParams>({
    id: 0,
    code: '',
    level: 0,
    name: '',
    pid: 0
})

onMounted(() => {
    getPermission()
})

const getPermission = async () => {
    let result: PermissionResponseData = await reqPermission()
    if (result.code == 200) {
        permissionList.value = result.data
    }
}
// 添加菜单
const addPermission = (row: Permission) => {
    Object.assign(permissionArr, {
        id: 0,
        code: '',
        level: 0,
        name: '',
        pid: 0
    })
    dialogVisible.value = true
    permissionArr.level = row.level + 1
    permissionArr.pid = (row.id as number);

}
// 修改菜单
const editPermission = (row: Permission) => {
    Object.assign(permissionArr, row)
    dialogVisible.value = true

}
// 添加和修改的确认按钮
const confirmPermission = async () => {
    let result: any = await reqAddOrUpdatePermission(permissionArr)
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: permissionArr.id ? '修改成功' : '添加成功'
        })
        dialogVisible.value = false
        getPermission()
    }
}
// 删除菜单
const removePression = async (row: any) => {
    let id = row.id
    let result = await reqRemovePermission(id)
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        getPermission()
    }
}
</script>

<style lang="scss" scoped></style>
