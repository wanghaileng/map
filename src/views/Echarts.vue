<template>
<div id="echarts">
    <div class="main">
        <div id="myCharts" ref="myCharts" style="width:1100px; height:720px"></div>
    </div>
        <div class="city" ref="charts" style="width:540px; height:420px"></div>
</div>
</template>

<script>
import "../../node_modules/echarts/map/js/china.js";
import "../../node_modules/echarts/map/js/province/beijing.js";
import "../../node_modules/echarts/map/js/province/sichuan.js";
export default {
  props: ["userJson"],
  data() {
    return {
      map: [],
      form: {
        _: "1587969072670",
        callback: "dataAPIData"
      }
    };
  },
  created() {
    let that = this;
    //发送使用请求
    let url = "https://gwpre.sina.cn/interface/fymap2020_data.json";
    this.$jsonp(url, {
      params: this.form
    }).then(res => {
      that.map = res.data.list;
      that.map.push({ name: "南海诸岛", value: 0 });
      this.drawLine();
    });
  },
  methods: {
    //绘制地图
    drawLine() {
      let that = this;

      let myCharts = this.$echarts.init(this.$refs.myCharts);
      window.addEventListener("resize", function() {
        myCharts.resize();
      });
      let options = {
        title: {
          text: "中国地图",
          subtext: "map of China"
        },
        grid: {
          show: true
        },
        //鼠标移动显示框
        tooltip: {
          show: true,
          trigger: "item",
          formatter(params) {
            return (
              "地区：" +
              params.name +
              "<br/>确诊：" +
              params.data.value +
              "人" +
              "<br/>死亡：" +
              params.data.deathNum +
              "人" +
              "<br/>医治：" +
              params.data.cureNum +
              "人" +
              "<br/>现存：" +
              params.data.econNum +
              "人"
            );
          }
        },
        toolbox: {
          show: true,
          orient: "vertical",
          left: "right",
          top: "center",
          feature: {
            dataView: {
              readOnly: false
            },
            restore: {},
            saveAsImage: {}
          }
        },
        visualMap: {
          min: 1,
          max: 1800,
          text: ["height", "low"],
          realtime: false,
          calculable: true,
          inRange: {
            color: ["lightskyblue", "yellow", "orangered"]
          }
        },
        series: [
          {
            name: "数量",
            type: "map",
            map: "china",
            label: {
              show: true,
              textStyle: {
                color: "rgba(0,0,0,0.6)"
              }
            },
            data: this.map,
            itemStyle: {
              normal: {
                borderColor: "rgba(0, 0, 120, 0.2)"
              },
              emphasis: {
                areaColor: null,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowBlur: 20,
                borderWidth: 0,
                shadowColor: "rgba(0, 60, 120, 0.5)",
                color: "rgba(255,120,0,0.8)"
              }
            }
          }
        ]
      };
      myCharts.setOption(options);

      myCharts.on("click", function(chinaParam) {
        if (chinaParam.name == "四川") {
          var option = myCharts.getOption();
          option.series[0].map = chinaParam.name;
          let arr = that.map.map(n => {
            return n.name;
          });
          option.series[0].data = that.map[arr.indexOf(chinaParam.data.name)];
          console.log(option.series[0].data);
          option.tooltip.formatter = params => {
            return (
              "地区：" +
              params.name +
              "<br/>确诊：" +
              params.value +
              "人" +
              "<br/>死亡：" +
              params.deathNum +
              "人" +
              "<br/>医治：" +
              params.cureNum +
              "人" +
              "<br/>现存：" +
              params.econNum +
              "人"
            );
          };
          myCharts.clear();
          myCharts.setOption(option, true);
        } else {
          alert(chinaParam.name + "区域尚未开通！！");
        }
      });
    }
  }
};
</script>

<style lang="less">
#echarts {
  .main {
    height: 800px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
