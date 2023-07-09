<template>
    <div class="lineBox">
        <div class="top">
            <p class="ratio">未来7天游客量趋势图</p>
            <img src="../../images//dataScreen-title.png" alt="">
        </div>
        <div class="line" ref="line"></div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from "vue"
let line = ref()
onMounted(() => {
    let myCharts = echarts.init(line.value)
    let option = {
        title: {
            text: '访问量',
            fontSize: 14
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            boundaryGap: [0, '30%'],
            splitLine: {
                show: false
            }
        },
        visualMap: {
            type: 'piecewise',
            show: false,
            dimension: 0,
            seriesIndex: 0,
            pieces: [
                {
                    gt: 1,
                    lt: 3,
                    color: 'rgba(0, 0, 180, 0.4)'
                },
                {
                    gt: 5,
                    lt: 7,
                    color: 'rgba(0, 0, 180, 0.4)'
                }
            ]
        },
        series: [
            {
                type: 'line',
                smooth: 0.6,
                symbol: 'none',
                lineStyle: {
                    color: '#5470C6',
                    width: 5
                },
                markLine: {
                    symbol: ['none', 'none'],
                    label: { show: false },
                    data: [{ xAxis: 1 }, { xAxis: 3 }, { xAxis: 5 }, { xAxis: 7 }]
                },
                areaStyle: {
                    color: '#29fcff'
                },
                data: [
                    ['2023-10-10', 200],
                    ['2023-10-11', 560],
                    ['2023-10-12', 750],
                    ['2023-10-13', 580],
                    ['2023-10-14', 250],
                    ['2023-10-15', 300],
                    ['2023-10-16', 450],
                    ['2023-10-17', 300],
                    ['2023-10-18', 100]
                ]
            }
        ],
        gird: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
        }
    };

    myCharts.setOption(option)
})
</script>

<style lang="scss" scoped>
.lineBox {
    width: 100%;
    height: 100%;
    background: url(../../images/dataScreen-main-cb.png) no-repeat;
    background-size: 100% 100%;

    .top {
        .ratio {
            color: white;
            font-size: 20px;
        }

        img {
            margin: 10px 0px;
        }
    }

    .line {
        height: calc(100% - 40px);
    }

}
</style>
