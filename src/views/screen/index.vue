<template>
    <div class="container">
        <!-- 数据大屏内容区 -->
        <div class="screen" ref="screen">
            <div class="top">top</div>
            <div class="bottom">
                <div class="left">
                    left
                </div>
                <div class="center">
                    center
                </div>
                <div class="right">
                    right
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"

let screen = ref()

onMounted(() => {
    screen.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
})

function getScale(w = 1920, h = 1080) {
    const ww = window.innerWidth / w;
    const wh = window.innerHeight / h;
    return ww < wh ? ww : wh;
}


</script>

<style lang="scss" scoped>
* {
    margin: 0;
    padding: 0;
}

.container {
    width: 100vw;
    height: 100vh;
    background: url(./images/bg.png) no-repeat;
    background-size: cover;

    .screen {
        width: 1920px;
        height: 1080px;
        background: pink;
        position: fixed;
        left: 50%;
        top: 50%;
    }
}
</style>
