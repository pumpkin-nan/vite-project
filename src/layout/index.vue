<template>
    <div class="layout_container ">
        <!-- 左侧菜单 -->
        <div class="layout_slider">123</div>
        <!-- 顶部导航 -->
        <div class="layout_tabbar">456</div>
        <!-- 内容展示区 -->
        <div class="layout_main">
            <p style="height: 10000px;background:blue">2222222</p>
        </div>
    </div>
</template>

<script setup>
import { } from "vue"
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
