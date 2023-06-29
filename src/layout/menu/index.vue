<template>
    <div class="">
        <template v-for="(item, index) in menuList" :key="item.path">
            <!-- 没有子菜单 -->
            <template v-if="!item.children">
                <el-menu-item v-if="!item.meta.hidden" :index="item.path" @click="goRoute">
                    <template #title>
                        <el-icon>
                            <component :is="item.meta.icon"></component>
                        </el-icon>
                        <span>{{ item.meta.title }}</span>
                    </template>
                </el-menu-item>
            </template>

            <!-- 只有一个子菜单 -->
            <template v-if="item.children && item.children.length == 1">
                <el-menu-item v-if="!item.children[0].meta.hidden" :index="item.children[0].path">
                    <template #title>
                        <el-icon>
                            <component :is="item.children[0].meta.icon"></component>
                        </el-icon>
                        <span>{{ item.children[0].meta.title }}</span>
                    </template>
                </el-menu-item>
            </template>

            <!-- 多个子菜单 -->
            <template v-if="item.children && item.children.length > 1">
                <el-sub-menu v-if="!item.children[0].meta.hidden" :index="item.path">
                    <template #title>
                        <el-icon>
                            <component :is="item.children[0].meta.icon"></component>
                        </el-icon>
                        <span>{{ item.meta.title }}</span>
                    </template>
                    <Menu :menuList="item.children"></Menu>
                </el-sub-menu>
            </template>
        </template>

    </div>
</template>

<script setup lang="ts">
import { } from "vue"
defineProps(['menuList'])
// 引入菜单组件
const goRoute = (local: any) => {
    console.log(local)
}
</script>
<script lang="ts">
export default {
    name: 'Menu'
}
</script>

<style lang="scss" scoped></style>
