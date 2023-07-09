<template>
    <div class="rank">
        <div class="top">
            <p class="title">热门景区排行</p>
            <p class="bg"></p>
        </div>
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from "vue"

let charts = ref()

onMounted(() => {
    let myChart = echarts.init(charts.value)
    myChart.setOption({
        title: {
            text: '景区排行',
            left: '50%',
            textStyle: {
                color: 'white',
                fontSize: 25
            }
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
        },
        series: [
            {
                type: 'bar',
                data: [5, 10, 20, 30, 50, 70, 90],
                label: {
                    show: true,
                    position: 'insideTop',
                    color: 'gray'
                },
                color: 'pink',
                showBackground: true,
                itemStyle: {
                    borderRadius: [10, 10, 0, 0]
                }
            },
            {
                type: 'line',
                data: [10, 20, 30, 40, 59, 60]
            }
        ],
        tooltip: {
            show: true
        }
    })
})
</script>

<style lang="scss" scoped>
.rank {
    background: url(../../images/dataScreen-main-lb.png) no-repeat;
    background-size: 100% 100%;

    .top {
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

    }

    .charts {
        height: calc(100% - 30px);
    }
}
</style>
