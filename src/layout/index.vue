<template>
    <div class="layout_container ">
        <!-- 左侧菜单 -->
        <div class="layout_slider">
            <Logo></Logo>
            <!-- 展示菜单 -->
            <el-scrollbar class="sliderbar">
                <!-- 菜单组件 -->
                <el-menu background-color="#001529" text-color="white">
                    <Menu :menuList="userStore.menuRouters"></Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabbar">456</div>
        <!-- 内容展示区 -->
        <div class="layout_main">
            <Main></Main>
        </div>
    </div>
</template>

<script setup>
import Logo from './logo/index.vue'
import Menu from './menu/index.vue'
import Main from './main/index.vue'
import useUserStore from '@/store/modules/user'

let userStore = useUserStore()
</script>

<style lang="scss" scoped>
.layout_container {
    width: 100%;
    height: 100vh;
    background: pink;

    .layout_slider {
        width: $base-menu-width;
        height: 100vh;
        background: $base-menu-background;
        color: white;

        .sliderbar {
            width: 100%;
            height: calc(100vh - $base-menu-logo-height);

            .el-menu {
                border-right: none;
            }
        }
    }

    .layout_tabbar {
        position: fixed;
        width: calc(100% - $base-menu-width);
        height: $base-topbar-height;
        background: orange;
        top: 0;
        left: $base-menu-width;
    }

    .layout_main {
        position: fixed;
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-topbar-height);
        background: skyblue;
        top: $base-topbar-height;
        left: $base-menu-width;
        padding: 20px;
        overflow: scroll;
    }
}
</style>
