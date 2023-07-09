<template>
  <div class="box">
    <img src="../../assets/images/error_images/404.png" alt="" @click="goHome">
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
let $router = useRouter()

const goHome = () => {
  $router.push('/home')
}
</script>

<style lang="scss" scoped>
.box {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;

  img {
    width: 1014px;
    height: 556px;
  }
}
</style>
