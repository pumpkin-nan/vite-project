<template>
    <div class="top">
        <div class="left">
            <span class="left_btn" @click="goHome">首页</span>
        </div>
        <div class="center">
            <span class="title">智慧旅游可视化大数据展示平台</span>
        </div>
        <div class="right">
            <span class="right_btn">统计报告</span>
            <span class="time">当前时间：{{ time }}</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import moment from 'moment'
import { ref, onMounted, onBeforeUnmount } from "vue"
import { useRouter } from "vue-router";

let $router = useRouter()
let time = ref(moment().format('YYYY年MM月DD日 hh:mm:ss'))
let timer = ref('')

const goHome = () => {
    $router.push('./home')
}
onMounted(() => {
    timer.value = setInterval(() => {
        time.value = moment().format('YYYY年MM月DD日 hh:mm:ss')
    }, 1000)
})
onBeforeUnmount(() => {
    clearInterval(timer.value)
})
</script>

<style lang="scss" scoped>
.top {
    width: 100%;
    height: 40px;
    display: flex;

    .left {
        flex: 1.5;
        background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
        background-size: cover;

        .left_btn {
            width: 150px;
            height: 40px;
            float: right;
            background: url(../../images/dataScreen-header-btn-bg-l.png) no-repeat;
            background-size: 100% 100%;
            color: #29fcff;
            text-align: center;
            line-height: 40px;
            font-size: 20px;
            cursor: pointer
        }
    }

    .center {
        flex: 1.5;

        .title {
            width: 100%;
            height: 74px;
            background: url(../../images/dataScreen-header-center-bg.png) no-repeat;
            background-size: 100% 100%;
            color: #29fcff;
            text-align: center;
            line-height: 74px;
            font-size: 30px;
            float: left;
        }
    }

    .right {
        flex: 1.5;
        color: #29fcff;
        font-size: 20px;
        text-align: center;
        line-height: 40px;
        background: url(../../images/dataScreen-header-right-bg.png) no-repeat;
        background-size: 100%;

        .right_btn {
            width: 150px;
            height: 40px;
            background: url(../../images/dataScreen-header-btn-bg-r.png) no-repeat;
            background-size: 100% 100%;
            float: left;
        }

        .time {
            float: right;
            margin-right: 30px;
        }
    }
}
</style>
