<!-- 父组件用法： -->
<!--
template结构：
<div>
<line-echarts :lineEchartsObj="obj"></line-echarts>
 <el-button type="primary" @click="testObj.self.title.text=Date.now()">改变数据</el-button>
</div>
data数据：
obj:{
    id: "line-echarts",
    xData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    yData: [
        [120, 132, 101, 134, 90, 230, 210], [220, 182, 191, 234, 290, 330, 310], [150, 232, 201, 154, 190, 330, 410], [320, 332, 301, 334, 390, 330, 320], [820, 932, 901, 934, 1290, 1330, 1320]
    ],
    nameArr: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
    //自定义配置
    self: {
        title: {
            text: "自定义标题"
        }
    }
}
-->


<!--
本组件是改版官网一个基本折线图
https://echarts.apache.org/examples/zh/editor.html?c=line-stack
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
  name: "lineEchartsDemo",
  props: {
    lineEchartsObj: { type: Object }
  },
  data() {
    return {
      myChart: ""
    };
  },
  methods: {
    initEcharts() {
      //挂载dom
      this.myChart = $echarts.init(document.getElementById(this.lineEchartsObj.id));
      //调用echarts自带的clear()保证dom没有被其他数据污染；
      this.myChart ? this.myChart.clear() : "";
      //设置静态配置的option
      let option = {
        title: {
          text: '折线图堆叠'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          //data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
          data: []
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          //data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          data: []
        },
        yAxis: {
          type: 'value'
        },
        series: [
          //   {
          //     name: '邮件营销',
          //     type: 'line',
          //     stack: '总量',
          //     data: [120, 132, 101, 134, 90, 230, 210]
          //   },
          //   {
          //     name: '联盟广告',
          //     type: 'line',
          //     stack: '总量',
          //     data: [220, 182, 191, 234, 290, 330, 310]
          //   },
          //   {
          //     name: '视频广告',
          //     type: 'line',
          //     stack: '总量',
          //     data: [150, 232, 201, 154, 190, 330, 410]
          //   },
          //   {
          //     name: '直接访问',
          //     type: 'line',
          //     stack: '总量',
          //     data: [320, 332, 301, 334, 390, 330, 320]
          //   },
          //   {
          //     name: '搜索引擎',
          //     type: 'line',
          //     stack: '总量',
          //     data: [820, 932, 901, 934, 1290, 1330, 1320]
          //   }
        ]
      }
      //调用echarts自带的setOption()方法把option渲染进dom
      this.myChart.setOption(option);
    },
    setEcharts() {
      //获取series数组
      let series_data = [];
      this.name_arr.map((item, index) => {
        var obj = {};
        obj.name = item;
        obj.type = "line";
        obj.stack = "总量"
        obj.data = this.y_data[index];
        // console.log(obj);
        series_data.push(obj);
      });
      //默认配置
      this.myChart.setOption({
        xAxis: {
          data: this.x_data
        },
        legend: {
          data: this.name_arr
        },
        series: series_data
      });
      //自定义配置
      if (this.self && JSON.stringify(this.self) !== "{}") {
        // console.log(this.self);
        this.myChart.setOption(this.self);
      }
    }
  },
  mounted() {
    this.initEcharts();
    this.setEcharts();
    // console.log(this.x_data, this.y_data, this.name_arr);
    window.addEventListener("resize", () => {
      this.myChart ? this.myChart.resize() : "";
    });
  },
  //这里写computed的原因，不管你x_data在lineEchartsObj是什么结构，都转换成x_data在本组件使用，其它同理
  computed: {
    x_data: function () {
      return this.lineEchartsObj.xData;
    },
    y_data: function () {
      return this.lineEchartsObj.yData;
    },
    name_arr: function () {
      return this.lineEchartsObj.nameArr;
    },
    self: function () {
      return this.lineEchartsObj.self;
    }
  },
  //监听整个父组件props对象，一旦发生改变，就调用setEcharts更新echarts视图；
  watch: {
    lineEchartsObj: {
      handler(newValue, oldValue) {
        // console.log(newValue); //props参数
        this.setEcharts();
      },
      deep: true
    }
  }
}
</script>

<style>
</style>