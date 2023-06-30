<template>
    <div class="logo" v-if="setting.logoHidden">
        <img :src="setting.logo" alt="">
        <p>{{ setting.title }}</p>
    </div>
</template>

<script setup lang="ts">
import { } from "vue"
import setting from '@/setting'
</script>
<script lang="ts">
export default {
    name: 'Logo'
}
</script>
<style lang="scss" scoped>
.logo {
    width: 100%;
    height: $base-menu-logo-height;
    display: flex;

    align-items: center;
    color: white;
    padding: 5px;

    img {
        width: 45px;
        height: 45px;
        border-radius: 20px;
    }

    p {
        margin-left: 22px;
        font-size: $base-menu-logo-title-fontSize;
    }
}
</style>
