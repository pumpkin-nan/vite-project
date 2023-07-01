<template>
    <div class="tabbar">
        <!-- 顶部左侧面包屑 -->
        <div class="tabber_left">
            <el-icon style="margin-right:10px;" @click="changeIcon">
                <component :is="layOutSettingStore.fold?'Fold':'Expand'"></component>
            </el-icon>
            <!-- 面包屑 -->
            <el-breadcrumb separator-icon="ArrowRight">
                <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" v-show="item.meta.title"
                    :to="item.path">
                    <!-- 面包屑展示的图标 -->
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <!-- 面包屑展示的标题 -->
                    <span class="tabber_left_span">{{ item.meta.title }}</span>
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- 顶部右侧个人中心 -->
        <div class="tabber_right">
            <el-button icon="Refresh" circle size="small" @click="refresh"></el-button>
            <el-button icon="FullScreen" circle size="small" @click="fullScreen"></el-button>
            <el-button icon="Setting" circle size="small"></el-button>
            <img :src="userStore.avatar" style="width: 24px;height: 24px;margin:0 10px;border-radius:50%">
            <!-- 下拉菜单 -->
            <el-dropdown>
                <span class="el-dropdown-link">
                    {{ userStore.username }}
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
import { useRoute } from 'vue-router'
import useLayOutSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'

let $route = useRoute()
// 用于控制菜单折叠与打开
let layOutSettingStore = useLayOutSettingStore()
const changeIcon = () => {
    layOutSettingStore.fold = !layOutSettingStore.fold
}

// 刷新按钮的回调
const refresh = () => {
    layOutSettingStore.refresh = !layOutSettingStore.refresh
}

// 全屏按钮
const fullScreen = () => {
    let full = document.fullscreenElement
    if (!full) {
        document.documentElement.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
}

let userStore = useUserStore()
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

        .tabber_left_span {
            margin: 0 5px;

        }

    }

    .tabber_right {
        display: flex;
        align-items: center;
    }
}
</style>
