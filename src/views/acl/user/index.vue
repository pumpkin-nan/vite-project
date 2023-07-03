<template>
    <el-card>
        <el-form inline="true" class="user">
            <el-form-item label="用户名:">
                <el-input placeholder="请输入用户名"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" size="default">搜索</el-button>
                <el-button size="default">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
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
                    <el-button type="primary" size="small" icon="user">分配角色</el-button>
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
    <!-- 抽屉结构 -->
    <el-drawer v-model="drawer">
        <template #header="{ close, titleId, titleClass }">
            <h4 :id="titleId" :class="titleClass">{{ userArr.id ? '添加用户' : '修改用户' }}</h4>
        </template>
        <template #default>
            <el-form :rules="rules" :model="userParams" ref="formRef">
                <el-form-item label="用户姓名" prop="username">
                    <el-input placeholder="请输入用户姓名" v-model="userParams.username"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称" prop="name">
                    <el-input placeholder="请输入用户昵称" v-model="userParams.name"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" prop="password">
                    <el-input placeholder="请输入用户密码" v-model="userParams.password"></el-input>
                </el-form-item>
            </el-form>
        </template>
        <template #footer>
            <el-button @click="cancel">取消</el-button>
            <el-button type="primary" @click="save">确认</el-button>
        </template>
    </el-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, nextTick } from "vue"
import { reqUserInfo, reqAddOrEditUser } from "@/api/acl/user/index"
import type { UserResponseData, Records, User } from "@/api/user/type"
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
const editUser = (row: User) => {
    drawer.value = true
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
        getHasUser()
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
</script>

<style lang="scss" scoped>
.user {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
