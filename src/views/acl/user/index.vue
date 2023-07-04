<template>
    <!-- 搜索用户名 -->
    <el-card>
        <el-form class="user">
            <el-form-item label="用户名:">
                <el-input placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="default">搜索</el-button>
                <el-button size="default">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <!-- 用户信息 -->
    <el-card style="margin:10px 0;">
        <el-button type="primary" size="default" @click="addUser">添加</el-button>
        <el-button type="danger" size="default">批量删除</el-button>
        <!-- table展示用户信息 -->
        <el-table style="margin: 10px 0;font-size:8px" border :data="userArr" show-overflow-tooltip>
            <el-table-column type="selection" align="center" width="50px"></el-table-column>
            <el-table-column label="#" align="center" type="index"></el-table-column>
            <el-table-column label="id" align="center" prop="id" width="80px"></el-table-column>
            <el-table-column label="用户名字" align="center" prop="username"></el-table-column>
            <el-table-column label="用户名称" align="center" prop="name"></el-table-column>
            <el-table-column label="用户角色" align="center" prop="roleName"></el-table-column>
            <el-table-column label="创建时间" align="center" prop="createTime"></el-table-column>
            <el-table-column label="更新时间" align="center" prop="updateTime"> </el-table-column>
            <el-table-column label="操作" width="270px" align="center">
                <template #="{ row, $index }">
                    <el-button type="primary" size="small" icon="user" @click="setRole(row)">分配角色</el-button>
                    <el-button type="primary" size="small" icon="edit" @click="editUser(row)">编辑</el-button>
                    <el-button type="danger" size="small" icon="delete">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[5, 7, 9, 11]"
            :background="true" layout=" prev, pager, next, jumper,->,sizes,total " :total="total"
            @size-change="handleSizeChange" @current-change="getHasUser" />
    </el-card>
    <!-- 抽屉结构:完成添加新用户和修改已有的用户-->
    <el-drawer v-model="drawer">
        <template #header>
            <h4>{{ userParams.id ? '修改用户' : '添加用户' }}</h4>
        </template>
        <template #default>
            <el-form :rules="rules" :model="userParams" ref="formRef">
                <el-form-item label="用户姓名" prop="username">
                    <el-input placeholder="请输入用户姓名" v-model="userParams.username"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称" prop="name">
                    <el-input placeholder="请输入用户昵称" v-model="userParams.name"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" prop="password" v-if="!userParams.id">
                    <el-input placeholder="请输入用户密码" v-model="userParams.password"></el-input>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="save">确认</el-button>
        </template>
    </el-drawer>
    <!-- 抽屉结构：分配角色 -->
    <el-drawer v-model="visible">
        <template #header>
            <h4>分配用户角色</h4>
        </template>
        <template #default>
            <el-form v-model="userParams">
                <el-form-item label="用户姓名">
                    <el-input placeholder="" disabled v-model="userParams.name"></el-input>
                </el-form-item>
                <el-form-item label="角色列表">
                    <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate"
                        @change="handleCheckAllChange">全选</el-checkbox>
                    <el-checkbox-group v-model="userRole" @change="handleCheckedCitiesChange">
                        <el-checkbox v-for="(role, index) in allRole" :key="index" :label="role">{{ role.roleName
                        }}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <el-button @click="visible = false">取消</el-button>
            <el-button type="primary" @click="confirmClick">确定</el-button>
        </template>
    </el-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from "vue"
import { reqUserInfo, reqAddOrEditUser, reqAllRole, reqAssignRole } from "@/api/acl/user/index"
import type { UserResponseData, Records, User, RoleResponseData, AllRole, SetRoleData } from "@/api/user/type"
import { ElMessage } from "element-plus"

let pageNo = ref<number>(1)
let pageSize = ref<number>(5)
let total = ref<number>(0)
let userArr = ref<Records>([])
let drawer = ref<boolean>(false)
let userParams = reactive<User>({
    name: '',
    username: '',
    password: ''
})
let formRef = ref<any>()
let visible = ref<boolean>(false)
let checkAll = ref<boolean>(false)
let isIndeterminate = ref<boolean>(true)
let allRole = ref<AllRole>([])
let userRole = ref<AllRole>([])
onMounted(() => {
    getHasUser()
})
// 获取用户信息
const getHasUser = async (pager = 1) => {
    // 收集当前页码
    pageNo.value = pager;
    let result: UserResponseData = await reqUserInfo(pageNo.value, pageSize.value)
    if (result.code == 200) {
        total.value = result.data.total
        userArr.value = result.data.records
    }
}
// 下拉菜单切换页码
const handleSizeChange = () => {
    getHasUser()
}

// 添加用户信息
const addUser = () => {

    Object.assign(userParams, {
        id: 0,
        name: '',
        username: '',
        password: ''
    })
    drawer.value = true
    nextTick(() => {
        formRef.value.clearValidate('username')
        formRef.value.clearValidate('name')
        formRef.value.clearValidate('password')
    })
}
// 修改用户信息
const editUser = async (row: User) => {
    Object.assign(userParams, row)
    drawer.value = true
    nextTick(() => {
        formRef.value.clearValidate('username')
        formRef.value.clearValidate('name')
        formRef.value.clearValidate('password')
    })

}
// 确认按钮添加用户信息表单
const save = async () => {
    await formRef.value.validate()
    let result: any = await reqAddOrEditUser(userParams)
    if (result.code == 200) {
        drawer.value = false
        ElMessage({
            type: 'success',
            message: userParams.id ? '修改成功' : '添加成功'
        })
        // getHasUser(userParams.id ? pageNo.value : 1)
        // 浏览器自动刷新一次
        window.location.reload()
    } else {
        drawer.value = false
        ElMessage({
            type: 'error',
            message: userParams.id ? '修改失败' : '添加失败'
        })
    }
}
// 取消按钮
const cancel = () => {
    drawer.value = false
}
// 用户名校验
const validateUsername = (rule: any, value: any, callBack: any) => {
    if (value.length >= 5) {
        callBack()
    } else {
        callBack(new Error('用户名字最少五位'))
    }
}
// 用户昵称校验
const validateName = (rule: any, value: any, callBack: any) => {
    if (value.length >= 5) {
        callBack()
    } else {
        callBack(new Error('用户名字最少五位'))
    }
}
// 用户密码校验
const validatePassword = (rule: any, value: any, callBack: any) => {
    if (value.length >= 6) {
        callBack()
    } else {
        callBack(new Error('用户昵称最少六位'))
    }
}
// 表单验证
const rules = {
    username: [{ required: true, trigger: 'blur', validator: validateUsername }],
    name: [{ required: true, trigger: 'blur', validator: validateName }],
    password: [{ required: true, trigger: 'blur', validator: validatePassword }],

}
// 分配角色
const setRole = async (row: User) => {
    visible.value = true
    Object.assign(userParams, row)
    let result: RoleResponseData = await reqAllRole(userParams.id as number)
    if (result.code == 200) {
        userRole.value = result.data.assignRoles
        allRole.value = result.data.allRolesList
    }
}
// 全选
const handleCheckAllChange = (val: boolean) => {
    userRole.value = val ? allRole.value : []
    isIndeterminate.value = false
}
// 底部复选框change
const handleCheckedCitiesChange = (value: string[]) => {
    const checkedCount = value.length
    checkAll.value = checkedCount === allRole.value.length
    isIndeterminate.value = checkedCount > 0 && checkedCount < allRole.value.length
}
// 分配角色确认
const confirmClick = async () => {
    let data: SetRoleData = {
        userId: userParams.id,
        roleIdList: userRole.value.map(item => { return item.id })
    }
    let result: any = await reqAssignRole(data)
    if (result.code == 200) {
        ElMessage({ type: 'success', message: '分配角色成功' })
        visible.value = false
        getHasUser(pageNo.value)
    } else {
        ElMessage({ type: 'error', message: '分配角色失败' })
    }
}
</script>

<style lang="scss" scoped>
.user {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
