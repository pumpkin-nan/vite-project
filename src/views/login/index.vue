<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" xs="0"></el-col>
      <el-col :span="12" xs="24">
        <el-form class="login_form" :model="loginForm" :rules="rules">
          <h1>Hello</h1>
          <h3>欢迎来到我的qq空间</h3>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" :prefix-icon="Lock" show-Password="true" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :loading="loading" type="primary" class="login_btn" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import useUserStore from '@/store/modules/user'
import { ElNotification } from 'element-plus';
import { useRouter, useRoute } from 'vue-router';
import { getTime } from '@/utils/time'

let useStore = useUserStore();
let $router = useRouter()
let $route = useRoute()
let loading = ref(false)
let loginForm = reactive({
  username: 'admin',
  password: '111111'
})
const validatorUserName = (rule: any, value: any, callback: any) => {
  if (value.length > 6) {
    callback()
  } else {
    callback(new Error('用户名长度至少6位！'))
  }
}
const validatorPassword = (rule: any, value: any, callback: any) => {
  if (value.length > 6) {
    callback()
  } else {
    callback(new Error('密码长度至少5位！'))
  }
}
const login = async () => {
  loading.value = true
  try {
    await useStore.userLogin(loginForm)
    let redirect: any = $route.query.redirect
    $router.push({ path: redirect || '/' })
    ElNotification({
      type: "success",
      message: '登录成功！',
      title: `hi!${getTime()}好`
    })
    loading.value = false

  } catch (error) {
    ElNotification({
      type: 'error',
      message: (error as Error).message
    })
    loading.value = false
  }
}
const rules = {
  username: [
    { trigger: 'change', require: true, validator: validatorUserName }
  ],
  password: [
    { trigger: 'change', require: true, validator: validatorPassword }
  ]
}
</script>

<style lang="scss" scoped>
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;
  }

  h1 {
    color: white;
    font-size: 40px;
  }

  h3 {
    color: white;
    font-size: 20px;
    margin: 20px 0;
  }

  .login_btn {
    width: 100%;
  }
}
</style>
