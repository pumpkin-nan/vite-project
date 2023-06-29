<template>
    <div class="logo" v-if="setting.logoHidden">
        <img :src="setting.logo" alt="">
        <p>{{ setting.title }}</p>
    </div>
</template>

<script setup>
import { } from "vue"
import setting from '@/setting'
</script>

<style lang="scss" scoped>
.logo {
    width: 100%;
    height: $base-menu-logo-height;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;

    img {
        width: 50px;
        height: 50px;
    }

    p {
        margin-left: 10px;
        font-size: $base-menu-logo-title-fontSize;
    }
}
</style>
