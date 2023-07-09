<template>
    <div class="sex">
        <div class="top">
            <p class="ratio">男女比例</p>
            <img src="../../images//dataScreen-title.png" alt="">
        </div>
        <div class="container">
            <div class="female">
                <img src="../../images/woman.png" alt="">
            </div>
            <div class="male">
                <img src="../../images/man.png" alt="">
            </div>

        </div>
        <div class="rate">
            <p>女性58%</p>
            <p>男性42%</p>
        </div>
        <div class="charts" ref="charts">
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue"
import * as echarts from 'echarts'
let charts = ref()

onMounted(() => {
    let myCharts = echarts.init(charts.value)
    myCharts.setOption({
        title: {
            text: ''
        },
        xAxis: {
            show: false,
            min: 0,
            max: 100
        },
        yAxis: {
            show: false,
            type: 'category'
        },
        series: [
            {
                type: 'bar',
                data: [58],
                barWidth: 20,
                z: 100,
                itemStyle: {
                    color: 'pink',
                    borderRadius: 20
                }
            },
            {
                type: 'bar',
                data: [100],
                barWidth: 20,
                barGap: '-100%',
                itemStyle: {
                    color: 'skyblue',
                    borderRadius: 20
                }
            }
        ],
        grid: {
            top: 0,
            left: 0,
            right: 0,
            bottom: 0
        }
    })
})

</script>

<style lang="scss" scoped>
.sex {
    width: 100%;
    height: 100%;
    margin: 10px 0px;
    background: url(../../images/dataScreen-main-cb.png) no-repeat;
    background-size: 100% 100%;

    .top {
        .ratio {
            color: white;
            font-size: 20px;
        }
    }

    .container {
        display: flex;
        justify-content: center;
        margin-top: 5px;

        .female {
            width: 111px;
            height: 116px;
            margin-right: 50px;
            background: url(../../images/woman-bg.png) no-repeat;
            background-size: 100% 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .male {
            width: 111px;
            height: 116px;
            background: url(../../images/man-bg.png) no-repeat;
            background-size: 100% 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .rate {
        display: flex;
        justify-content: space-between;
        color: white;
    }

    .charts {
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
