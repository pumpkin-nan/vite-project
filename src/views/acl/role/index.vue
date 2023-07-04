<template>
    <!-- 头部角色名称搜索 -->
    <el-card>
        <el-form class="role">
            <el-form-item label="职位名称">
                <el-input placeholder="职位名称" v-model="keyword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="default" :disabled="!keyword" @click="search">搜索</el-button>
                <el-button size="default" @click="reset">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <!-- 中间表格区域 -->
    <el-card style="margin: 10px 0;">
        <el-button type="primary" icon="Plus" @click="addRole">添加职位</el-button>
        <el-table border style="margin: 10px 0; font-size:8px" :data="recordsData">
            <el-table-column type="index" label="#" width="80px" align="center"></el-table-column>
            <el-table-column prop="id" label="id" align="center" width="80px"></el-table-column>
            <el-table-column prop="roleName" label="职位名称" align="center" width="100px"
                show-overflow-tooltip></el-table-column>
            <el-table-column prop="createTime" label="创建时间" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column prop="updateTime" label="更新时间" align="center" show-overflow-tooltip></el-table-column>
            <el-table-column label="操作" width="300px" align="center">
                <template #="{ row, $index }">
                    <el-button type="primary" icon="user" size="small" @click="setRole(row)">分配权限</el-button>
                    <el-button type="primary" icon="edit" size="small" @click="updateRole(row)">编辑</el-button>
                    <el-popconfirm :title="`您确定要删除${row.roleName}吗？`" width="200px" @confirm="removeRole(row)">
                        <template #reference>
                            <el-button type="danger" icon="delete" size="small">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[10, 15, 20]"
            :background="true" layout="prev, pager, next, jumper,->, sizes,total" :total="total"
            @size-change="handleSizeChange" @current-change="getRoleData" />
    </el-card>
    <!-- 添加、删除弹窗 -->
    <el-dialog v-model="dialogVisible" title="添加" width="30%">
        <template #default>
            <el-form :model="RoleParams" :rules="rules" ref="formRef">
                <el-form-item label="职位名称" prop="roleName">
                    <el-input placeholder="请填写职位名称" v-model="RoleParams.roleName"></el-input>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="confirmRole">
                    确认
                </el-button>
            </span>
        </template>
    </el-dialog>
    <!-- 分配菜单权限与按钮权限 -->
    <el-drawer v-model="drawer">
        <template #header>
            <h4>分配菜单与按钮的权限</h4>
        </template>
        <template #default>
            <!-- 树形控件 -->
            <el-tree ref="tree" :data="menuArr" default-expand-all show-checkbox node-key="id"
                :default-checked-keys="selectArr" :props="defaultProps" />
        </template>
        <template #footer>
            <el-button @click="drawer = false">取消</el-button>
            <el-button type="primary" @click="handler">确认</el-button>
        </template>
    </el-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from "vue"
import { reqRoleInfo, reqAddOrUpdateRole, reqAllMenuList, reqSetPression, reqRemoveRole } from '@/api/acl/role'
import type { RecordResponseData, Records, RecordData, MenuList } from '@/api/acl/role/type'
import useLayOutSettingStore from '@/store/modules/setting'
import { ElMessage } from "element-plus"

let pageNo = ref<number>(1)
let pageSize = ref<number>(10)
let total = ref<number>(10)
let recordsData = ref<Records>([])
let keyword = ref<string>('')
let settingStore = useLayOutSettingStore()
let dialogVisible = ref<boolean>(false)
let RoleParams = reactive<RecordData>({
    roleName: ''
})
let formRef = ref<any>()
let drawer = ref<boolean>(false)
let menuArr = ref<MenuList>([])
// 存储勾选节点的id（4级）
let selectArr = ref<number[]>([])
let tree = ref<any>()

onMounted(() => {
    getRoleData()
})
// 获取角色信息
const getRoleData = async (pager = 1) => {
    pageNo.value = pager
    let result: RecordResponseData = await reqRoleInfo(pageNo.value, pageSize.value, keyword.value)
    if (result.code == 200) {
        total.value = result.data.total;
        recordsData.value = result.data.records
    }
}
// 切换10，15,20页
const handleSizeChange = () => {
    getRoleData()
}
// 搜索
const search = () => {
    getRoleData()
}
// 重置
const reset = () => {
    settingStore.refresh = !settingStore.refresh
}
// 添加职位
const addRole = async () => {
    dialogVisible.value = true
    Object.assign(RoleParams, {
        roleName: '',
        id: ''
    })
    nextTick(() => {
        formRef.value.clearValidate('roleName')
    })

}
// 修改职位
const updateRole = (row: Records) => {
    Object.assign(RoleParams, row)
    dialogVisible.value = true
    nextTick(() => {
        formRef.value.clearValidate('roleName')
    })
}
// 添加、修改的确认按钮
const confirmRole = async () => {
    await formRef.value.validate()
    // 收集表单数据发请求，关闭弹窗，获取table最新数据
    let result: RecordResponseData = await reqAddOrUpdateRole(RoleParams)
    console.log(RoleParams)
    console.log(result)
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: RoleParams.id ? '修改成功' : '添加成功'
        })
        dialogVisible.value = false
        getRoleData(RoleParams.id ? pageNo.value : 1)
    }
}
const validateRoleName = (rule: any, value: any, callBack: any) => {
    if (value.trim().length >= 2) {
        callBack()
    } else {
        callBack(new Error('职位名称必须大于两位'))
    }
}
const rules = {
    roleName: [{ required: true, trigger: 'blur', validator: validateRoleName }]
}
// 分配权限
const setRole = async (row: Records) => {
    drawer.value = true
    Object.assign(RoleParams, row)
    let result = await reqAllMenuList((RoleParams.id) as number)
    if (result.code == 200) {
        menuArr.value = result.data
        selectArr.value = filterSelectArr(menuArr.value, [])
    }
}
const filterSelectArr = (allData: any, initArr: any) => {
    allData.forEach((item: any) => {
        if (item.select && item.level == 4) {
            initArr.push(item.id)
        }
        if (item.children.length > 0 && item.children) {
            filterSelectArr(item.children, initArr)
        }
    });
    return initArr;
}
const defaultProps = {
    children: 'children',
    label: 'name'
}
const handler = async () => {
    let roleId = (RoleParams.id as number)
    let arr = tree.value.getCheckedKeys()
    let halfArr = tree.value.getHalfCheckedKeys()
    let permissionId = arr.concat(halfArr)
    let result = await reqSetPression(roleId, permissionId)
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: '分配权限成功'
        })
        drawer.value = false
        window.location.reload()
    }
}
// 删除权限
const removeRole = async (row: Records) => {
    let roleId = row.id
    console.log(roleId)
    let result = await reqRemoveRole(roleId)
    if (result.code == 200) {
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
        getRoleData(allRole.value.length > 1 ? pageNo.value : pageNo.value - 1)
    }
}
</script>

<style lang="scss" scoped>
.role {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
