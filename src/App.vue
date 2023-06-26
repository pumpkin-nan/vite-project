<template>
  <div class="box">
    <h1>我是根组件</h1>
    <el-button type="primary" size="default" :icon="Plus">确认</el-button>
  </div>
</template>

<script setup lang="ts">
import {Plus} from '@element-plus/icons-vue'
</script>

<style scoped>

</style>
