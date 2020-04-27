<template>
<div id="home">
    <div class="main">
        <div id="myCharts" ref="myCharts" style="width:1100px; height:720px"></div>
    </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      data: {
        visit: [320, 120, 220, 650, 260, 123, 23]
      }
    };
  },
  mounted() {
    this.draw();
  },
  methods: {
    draw() {
      console.log(this.data.visit);
      let myCharts = this.$echarts.init(this.$refs.myCharts);
      myCharts.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ["直接访问"]
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        //x轴显示
        xAxis: {
          type: "category",
          data: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"]
        },
        //y轴显示
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            label: {
              show: true,
              position: "insideRight"
            },
            data: this.data.visit
          }
        ]
      });
    }
  }
};
</script>

<style lang="less">
#home {
  .main {
    height: 800px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
