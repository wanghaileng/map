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
//二级地图引入
import "../../node_modules/echarts/map/js/province/anhui.js";
import "../../node_modules/echarts/map/js/province/aomen.js";
import "../../node_modules/echarts/map/js/province/beijing.js";
import "../../node_modules/echarts/map/js/province/chongqing.js";
import "../../node_modules/echarts/map/js/province/fujian.js";
import "../../node_modules/echarts/map/js/province/gansu.js";
import "../../node_modules/echarts/map/js/province/guangdong.js";
import "../../node_modules/echarts/map/js/province/guangxi.js";
import "../../node_modules/echarts/map/js/province/hainan.js";
import "../../node_modules/echarts/map/js/province/hebei.js";
import "../../node_modules/echarts/map/js/province/heilongjiang.js";
import "../../node_modules/echarts/map/js/province/henan.js";
import "../../node_modules/echarts/map/js/province/hubei.js";
import "../../node_modules/echarts/map/js/province/hunan.js";
import "../../node_modules/echarts/map/js/province/jiangsu.js";
import "../../node_modules/echarts/map/js/province/jiangxi.js";
import "../../node_modules/echarts/map/js/province/jilin.js";
import "../../node_modules/echarts/map/js/province/liaoning.js";
import "../../node_modules/echarts/map/js/province/neimenggu.js";
import "../../node_modules/echarts/map/js/province/ningxia.js";
import "../../node_modules/echarts/map/js/province/qinghai.js";
import "../../node_modules/echarts/map/js/province/shandong.js";
import "../../node_modules/echarts/map/js/province/shanghai.js";
import "../../node_modules/echarts/map/js/province/shanxi.js";
import "../../node_modules/echarts/map/js/province/sichuan.js";
import "../../node_modules/echarts/map/js/province/taiwan.js";
import "../../node_modules/echarts/map/js/province/tianjin.js";
import "../../node_modules/echarts/map/js/province/xianggang.js";
import "../../node_modules/echarts/map/js/province/xinjiang.js";
import "../../node_modules/echarts/map/js/province/xizang.js";
import "../../node_modules/echarts/map/js/province/yunnan.js";
import "../../node_modules/echarts/map/js/province/zhejiang.js";

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
          text: "中国地图1",
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
            if (params.data) {
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
            } else {
              return "地区：" + params.name + "<br/>暂无疫情信息";
            }
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
        if (chinaParam.name == "南海诸岛") {
          alert(chinaParam.name + "区域尚未开放");
        } else {
          let option = myCharts.getOption();
          option.series[0].map = chinaParam.name;
          let arr = that.map.map(n => {
            return n.name;
          });
          let data = [];
          that.map[arr.indexOf(chinaParam.data.name)].city.forEach(item => {
            if (item.mapName) {
              item.name = item.mapName;
            }
            return data.push(Object.assign({}, item, { value: item.conNum }));
          });

          option.series[0].data = data;
          option.visualMap[0].max = 50;
          //重绘地图
          myCharts.clear();
          myCharts.setOption(option);
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
