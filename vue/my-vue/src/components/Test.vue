<template>
  <div>
    <!-- <keywordsTxt @getTxt="getTxt"></keywordsTxt> -->
    <!-- <vuexTemplate></vuexTemplate> -->
    <!-- <div class="img-upload">
     <img-upload :uploadProps=uploadProps @mapEvent="mapEvent"></img-upload>
     <el-button  @click="uploadProps.uploadSure=!uploadProps.uploadSure">上传事件</el-button>
     </div> -->
    <!-- <div class="z-dialog">
     <z-dialog v-if="dialogVisible.dialog1" :dialogObj="dialogObj" @dialogEvent="dialogEvent"></z-dialog>
     <el-button  @click="dialogVisible.dialog1=true">显示dialog</el-button>
     </div> -->
    <!-- <div class="z-dialog">
     <z-dialog-sync v-if="dialogVisible.dialog1" :dialogObj="dialogObj" :isShow.sync="dialogVisible.dialog1"></z-dialog-sync>
     <el-button  @click="dialogVisible.dialog1=true">显示dialog</el-button>
     </div> -->
    <!-- <date-picker></date-picker> -->
    <!-- <div>
      <line-echarts :lineEchartsObj=lineEchartsObj></line-echarts>
      <el-button type="primary" @click="lineEchartsObj.inter_val+=1">增大inter_val</el-button>
    </div> -->
    <!-- <filterTable></filterTable> -->
    <div>
      <div> 自动聚焦：<input type="text" v-focus> </div>
      <div>根据自定义指令渲染颜色：<span v-color="'red'">red</span> <span v-color="'blue'">blue</span> <span v-color="'#ccc'">#ccc</span></div>
    </div>
  </div>
</template>
<script>
import { lineData } from "@/assets/lineData";
import utils from "@/utils/utils";
import "@/utils/directives";
export default {
  components: {
    keywordsTxt: () => import("./common/keywordsTxt"),
    vuexTemplate: () => import("./common/vuex"),
    imgUpload: () => import("./common/imgUpload"),
    zDialog: () => import("./common/dialog"),
    zDialogSync: () => import("./common/dialog.sync"),
    datePicker: () => import("./common/datePicker"),
    lineEcharts: () => import("./common/lineEcharts"),
    filterTable: () => import("./common/table-filters")
  },
  data() {
    return {
      uploadProps: {
        uploadSure: false,
        width: 100,
        height: 100
      },
      dialogObj: {
        id: 110
      },
      dialogVisible: {
        dialog1: false
      },
      lineEchartsObj: {
        nameArr: [],
        x_data: [],
        y_data: [],
        colorArr: ["#4fa8f9", "#6ec71e", "#EE6363", "#6dc78e", "#000"],
        inter_val: 1,
        self: {
          //自定义配置
          title: {
            text: "堆叠区域图"
          }
        }
      }
    };
  },

  methods: {
    getTxt(params) {
      console.log(params, "accept");
    },
    mapEvent(data) {
      console.log(data);
    },
    dialogEvent(data) {
      console.log(data);
      this.dialogVisible.dialog1 = data;
    },
    dealLineData() {
      this.lineEchartsObj.x_data = [];
      this.lineEchartsObj.y_data = [];
      // console.log(lineData);虚拟数据
      var res = lineData.data.line;
      this.lineEchartsObj.nameArr = res.fields;
      res.items[0].map((item, index) => {
        this.lineEchartsObj.x_data.push(item[0]);
      });
      this.lineEchartsObj.nameArr.map((item, index) => {
        this.lineEchartsObj.y_data.push([]);
        res.items[1].map((data, i) => {
          this.lineEchartsObj.y_data[index].push(data[index]);
        });
      });
    }
  },
  created() {
    this.dealLineData();
  },
  // 路由跳转确认
  beforeRouteLeave(to, from, next) {
    const answer = window.confirm("当前页面数据未保存，确定要离开？");
    if (answer) {
      next();
    } else {
      next(false);
    }
  },
  // 浏览器刷新确认
  mounted() {
    var _this = this;
    // console.log(_this.$route.fullPath)
    window.onbeforeunload = function(e) {
      if (_this.$route.fullPath == "/test") {
        e = e || window.event;
        // 兼容IE8和Firefox 4之前的版本
        if (e) {
          e.returnValue = "关闭提示";
        }
        // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
        return "关闭提示";
      } else {
        window.onbeforeunload = null;
      }
    };
  }
};
</script>

<style>
</style>