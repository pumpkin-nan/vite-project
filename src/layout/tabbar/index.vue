<template>
    <div class="tabbar">
        <!-- 顶部左侧面包屑 -->
        <div class="tabber_left">
            <el-icon style="margin-right:10px;" @click="changeIcon">
                <component :is="layOutSettingStore.fold?'Fold':'Expand'"></component>
            </el-icon>
            <!-- 面包屑 -->
            <el-breadcrumb separator-icon="ArrowRight">
                <el-breadcrumb-item>权限管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- 顶部右侧个人中心 -->
        <div class="tabber_right">
            <el-button :icon="Refresh" circle size="small"></el-button>
            <el-button :icon="FullScreen" circle size="small"></el-button>
            <el-button :icon="Setting" circle size="small"></el-button>
            <img src="../../assets/images/cat.jpg" style="width: 24px;height: 24px;margin:0 10px;">
            <!-- 下拉菜单 -->
            <el-dropdown>
                <span class="el-dropdown-link">
                    admin
                    <el-icon class="el-icon--right">
                        <arrow-down />
                    </el-icon>
                </span>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item>退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import useLayOutSettingStore from '@/store/modules/setting'
// 用于控制菜单折叠与打开
let layOutSettingStore = useLayOutSettingStore()
const changeIcon = () => {
    layOutSettingStore.fold = !layOutSettingStore.fold
}
</script>
<script lang="ts">
export default {
    name: 'Tabbar'
}
</script>

<style lang="scss" scoped>
.tabbar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;


    .tabber_left {
        display: flex;
        align-items: center;
        margin-left: 20px;

    }

    .tabber_right {
        display: flex;
        align-items: center;
    }
}
</style>
