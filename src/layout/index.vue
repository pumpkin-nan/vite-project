<template>
    <div class="layout_container ">
        <!-- 左侧菜单 -->
        <div class="layout_slider" :class="{ fold: layOutSettingStore.fold ? true : false }">
            <Logo></Logo>
            <!-- 展示菜单 -->
            <el-scrollbar class="sliderbar">
                <!-- 菜单组件 -->
                <el-menu :collapse="layOutSettingStore.fold" collapse-transition="false" background-color="#001529"
                    text-color="white" :default-active="$router.path">
                    <Menu :menuList="userStore.menuRouters"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabbar" :class="{ fold: layOutSettingStore.fold ? true : false }">
            <Tabbar></Tabbar>
        </div>
        <!-- 内容展示区 -->
        <div class="layout_main" :class="{ fold: layOutSettingStore.fold ? true : false }">
            <Main></Main>
        </div>
    </div>
</template>

<script setup lang="ts">
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'
import useUserStore from '@/store/modules/user'
import useLayOutSettingStore from '@/store/modules/setting'
import { useRoute } from 'vue-router'

// 获取layout仓库配置
let layOutSettingStore = useLayOutSettingStore()

let userStore = useUserStore()
let $router = useRoute()
</script>
<script lang="ts">
export default {
    name: 'Layout'
}
</script>

<style lang="scss" scoped>
.layout_container {
    width: 100%;
    height: 100vh;

    .layout_slider {
        width: $base-menu-width;
        height: 100vh;
        background: $base-menu-background;
        color: white;
        transition: all 0.3s;
        white-space: nowrap;

        .sliderbar {
            width: 100%;
            height: calc(100vh - $base-menu-logo-height);

            .el-menu {
                border-right: none;
            }
        }

        &.fold {
            width: $base-menu-min-width;
        }
    }

    .layout_tabbar {
        position: fixed;
        width: calc(100% - $base-menu-width);
        height: $base-topbar-height;
        top: 0;
        left: $base-menu-width;
        color: black;
        transition: all 0.3s;

        &.fold {
            width: calc(100vw - $base-menu-min-width);
            left: $base-menu-min-width;
        }
    }

    .layout_main {
        position: fixed;
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-topbar-height);
        top: $base-topbar-height;
        left: $base-menu-width;
        padding: 20px;
        overflow: auto;
        transition: all 0.3s;

        &.fold {
            width: calc(100vw - $base-menu-min-width);
            left: $base-menu-min-width;
        }
    }
}
</style>
