<template>
  <div>
    <h1>颜色</h1>
  </div>
</template>

<script setup lang="ts">
import request from "@/utils/request.ts";
import {onMounted} from 'vue'
onMounted(()=>{
  request({
    url:'/user/login',
    method: 'post',
    data:{
      username:'admin',
      password:'111111'
    }
  })
})
</script>

<style scoped lang="scss">
div{
  h1{
    color:$color;
  }
}
</style>
