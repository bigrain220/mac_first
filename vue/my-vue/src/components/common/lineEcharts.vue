<!-- 用法： -->
<!-- 
template结构：
   <line-echarts :lineEchartsObj=lineEchartsObj></line-echarts>
data 数据：
     lineEchartsObj: {
        nameArr: [],
        x_data: [],
        y_data: [],
        colorArr: [],
        inter_val: 1,//默认1
        self: {//自定义配置
          title: {
            text: "堆叠区域图"
          }
        }
      }
methods方法：（把数据处理然后赋值给lineEchartsObj中的每项属性）
-->


<template>
  <div :id="lineEchartsObj.id" style="width:100%;height:500px;background:#fff;"></div>
</template>

<script>
// 引入基本模板
let $echarts = require("echarts/lib/echarts");
// 引入图形组件
require("echarts/lib/chart/line");
// 引入其他组件
require("echarts/lib/component/title");
require("echarts/lib/component/tooltip");
require("echarts/lib/component/legend");

export default {
  name: "lineEcharts",
  props: {
    lineEchartsObj: {
      type: Object
    }
  },
  data() {
    return {
      myChart: ""
    };
  },
  methods: {
    initEcharts() {
      this.myChart = $echarts.init(document.getElementById(this.lineEchartsObj.id));
      this.myChart ? this.myChart.clear() : "";
      var option = {
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(255,255,255,0.9)",
          textStyle: {
            color: "#666",
            fontSize: "14px"
          },
          extraCssText:
            "width:220px;padding:0;box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);height:" +
            (40 + this.nameArr.length * 40) +
            "px",
          formatter: function (params) {
            var htmlStr = "";
            for (var i = 0; i < params.length; i++) {
              var tem = params[i].name;
              var val = params[i].value;
              htmlStr +=
                '<div style="height:26px;line-height:26px;overflow:hidden;padding:6px 8px;">' +
                '<span style="float:left;max-width:160px;overflow:hidden;text-overflow: ellipsis;white-space: nowrap;">' +
                '<span class="border_span" style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:5px;background-color:' +
                params[i].color +
                ';"></span>' +
                params[i].seriesName +
                "</span>" +
                '<span style="float:right">' +
                params[i].value +
                "</span>" +
                "</div>";
            }
            var res =
              '<div><div style="height:40px;line-height:40px;padding:0 8px;background:rgba(237,233,233,0.4)">' +
              tem +
              htmlStr +
              "</div></div>";
            return res;
          }
        },
        textStyle: {
          color: "#999"
        },
        color: [],
        legend: {
          left: "center",
          bottom: 8,
          itemWidth: 4,
          itemHeight: 10,
          //   selectedMode: false, //取消图例上的点击事件
          textStyle: {
            padding: [0, 0, 0, 12]
          },
          data: []
        },
        grid: {
          left: "5%",
          right: "5%"
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: "#eee"
            }
          },
          data: []
        },
        yAxis: {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "transparent"
            }
          },
          splitLine: {
            lineStyle: {
              color: "#eee"
            }
          }
        },
        series: []
      };
      this.myChart.setOption(option);
      //echarts点击事件
      this.myChart.on("legendselectchanged", function (params) {
        var legend_option = this.getOption();
        var selectTotal = 0;
        var tem = Object.values(params.selected);
        for (var j = 0; j < tem.length; j++) {
          if (tem[j] === true) {
            selectTotal += 1;
          }
        }
        legend_option.tooltip[0].extraCssText =
          "width:220px;padding:0;box-shadow: 0 0 3px rgba(0, 0, 0, 0.3);height:" +
          (40 + selectTotal * 40) +
          "px";
        this.setOption(legend_option);
      });
    },
    setEcharts() {
      var _this = this;
      //获取series对象
      var series_data = [];
      _this.nameArr.map((item, index) => {
        var obj = {};
        obj.name = item;
        obj.type = "line";
        obj.symbol = "circle";
        obj.symbolSize = "5";
        obj.data = _this.y_data[index];
        // console.log(obj);
        series_data.push(obj);
      });
      //默认配置
      _this.myChart.setOption({
        xAxis: {
          axisLabel: {
            interval: _this.inter_val
          },
          data: _this.x_data
        },
        color: _this.colorArr,
        legend: {
          data: _this.nameArr
        },
        series: series_data
      });
      //自定义配置
      if (JSON.stringify(_this.self) !== "{}") {
        // console.log(_this.self);
        _this.myChart.setOption(_this.self);
      }
    }
  },
  mounted() {
    this.initEcharts();
    this.setEcharts();
    // console.log(this.x_data, this.y_data, this.nameArr, this.colorArr);
    window.addEventListener("resize", () => {
      this.myChart ? this.myChart.resize() : "";
    });
  },
  computed: {
    x_data: function () {
      return this.lineEchartsObj.x_data;
    },
    y_data: function () {
      return this.lineEchartsObj.y_data;
    },
    nameArr: function () {
      return this.lineEchartsObj.nameArr;
    },
    colorArr: function () {
      return this.lineEchartsObj.colorArr;
    },
    inter_val: function () {
      return this.lineEchartsObj.inter_val;
    },
    self: function () {
      return this.lineEchartsObj.self;
    }
  },
  watch: {
    lineEchartsObj: {
      handler(newValue, oldValue) {
        console.log(newValue); //props参数
        this.setEcharts();
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
</style>