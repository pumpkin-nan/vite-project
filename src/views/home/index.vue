<template>
  <el-card>
    <div class="user">
      <img :src="userStore.avatar" alt="">
      <div class="container">
        <h3>{{ getTime() }}好&nbsp;{{ userStore.username }}</h3>
        <p>my space</p>
      </div>
    </div>
  </el-card>
  <div class="bottom">
    <svgIcon name="welcome" width="600px" height="300px"></svgIcon>
  </div>
</template>

<script setup lang="ts">
import { getTime } from '@/utils/time'
import useUserStore from '@/store/modules/user'
let userStore = useUserStore()

</script>

<style lang="scss" scoped>
.user {
  display: flex;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
  }

  h3 {
    font-size: 20px;
    margin-bottom: 20px;
  }

  .container {
    margin: 20px;

  }

  p {
    font-style: italic;
    color: gray;
  }
}

.bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px;
}
</style>
