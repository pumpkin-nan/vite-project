<template>
  <div class="">
    <h1>{{ userStore.username }}</h1>
    <img :src="userStore.avatar">
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()
onMounted(() => {
  userStore.userInfo()
})
</script>

<style lang="scss" scoped></style>
