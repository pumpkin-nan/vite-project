<template>
    <div class="tourist">
        <div class="top">
            <p class="title">游客实时统计</p>
            <p class="bg"></p>
            <p class="right">可预约总量<span>9999</span>人</p>
        </div>
        <div class="number">
            <span v-for="(item, index) in people" :key="index">{{ item }}</span>
        </div>
        <div class="chars" ref="charts">222</div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import * as echarts from 'echarts'
import 'echarts-liquidfill'

let people = ref('216908人')
let charts = ref()
onMounted(() => {
    let myCharts = echarts.init(charts.value)
    myCharts.setOption({
        title: {
            text: '水球图'
        },
        xAxis: {},
        yAxis: {},
        series: [{
            type: 'liquidFill',
            data: [0.5, 0.4, {
                value: 0.3,
                itemStyle: {
                    color: 'red',
                    opacity: 0.6
                },
                emphasis: {
                    itemStyle: {
                        opacity: 0.9
                    }
                }
            }],
            radius: '90%',
            color: ['#294D99', '#156ACF', '#1598ED', '#45BDFF'],
        }],
        grid: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }
    })
})
</script>

<style lang="scss" scoped>
.tourist {
    background: url(../../images/dataScreen-main-lb.png) no-repeat;
    background-size: 100% 100%;
    margin-top: 10px;


    .top {
        margin-left: 20px;
        margin-top: 50x;

        .title {
            color: white;
            font-size: 20px;
        }

        .bg {
            width: 68px;
            height: 7px;
            background: url(../../images/dataScreen-title.png) no-repeat;
            background-size: 100% 100%;
            margin-top: 10px;
        }

        .right {
            color: white;
            float: right;
            margin-right: 10px;
            font-size: 20px;

            span {
                color: orange;
                font-style: italic;
            }
        }
    }

    .number {
        margin-top: 60px;
        display: flex;
        padding: 10px;

        span {
            flex: 1;
            background: url(../../images/total.png) no-repeat;
            background-size: 100% 100%;
            height: 60px;
            text-align: center;
            line-height: 60px;
            color: #29fcff;
            font-size: 30px;
            margin: 1px;

        }
    }

    .chars {
        width: 100%;
        height: 280px;
    }
}
</style>
