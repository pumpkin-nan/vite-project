<template>
    <div class="year">
        <div class="top">
            <p class="ratio">年度游客量对比</p>
            <img src="../../images//dataScreen-title.png" alt="">
        </div>
        <div class="charts" ref="charts"></div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import { ref, onMounted } from "vue"

let charts = ref()

onMounted(() => {
    let mychart = echarts.init(charts.value)
    mychart.setOption({
        title: {
            text: '散点图',
            textStyle: {
                color: '#fff'
            },
            left: '50%',
            fontSize: '40px'
        },
        xAxis: {
            type: 'category',
            show: true
        },
        yAxis: {
            show: false
        },
        series: {
            type: 'scatter',
            data: [34, 5, 6, 766, 78, 55, 66, 77, 233, 555, 767, 899, 677],
            Symbol: 'diamond',
            SymbolSize: 16,
            label: {
                show: true,
                position: 'top',
                color: 'pink'
            },
        },

        grid: {
            left: 20,
            right: 0,
            top: 0,
            bottom: 20
        }
    })
})
</script>

<style lang="scss" scoped>
.year {
    width: 100%;
    height: 100%;
    margin: 10px 0px;
    background: url(../../images/dataScreen-main-lb.png) no-repeat;
    background-size: 100% 100%;

    .top {
        .ratio {
            color: white;
            font-size: 20px;
        }

    }

    .charts {
        height: calc(100% - 30px);
    }
}
</style>
