<template>
  <div>
    <!-- <keywordsTxt @getTxt="getTxt"></keywordsTxt> -->
    <!-- <vuexTemplate></vuexTemplate> -->
    <div class="img-upload">
     <img-upload :uploadProps=uploadProps1 @mapEvent="mapEvent"></img-upload>
     <el-button  @click="uploadProps1.uploadSure=!uploadProps1.uploadSure">上传事件</el-button>
    </div>
    <!-- <div class="z-dialog">
     <z-dialog v-if="dialogVisible.dialog1" :dialogObj="dialogObj" @dialogEvent="dialogEvent"></z-dialog>
     <el-button  @click="dialogVisible.dialog1=true">显示dialog</el-button>
    </div>-->
    <!-- <div class="z-dialog">
     <z-dialog-sync v-if="dialogVisible.dialog1" :dialogObj="dialogObj" :isShow.sync="dialogVisible.dialog1"></z-dialog-sync>
     <el-button  @click="dialogVisible.dialog1=true">显示dialog</el-button>
    </div>-->
    <!-- <date-picker></date-picker> -->
    <div>
      <!-- <line-echarts :lineEchartsObj=lineEchartsObj></line-echarts>
      <el-button type="primary" @click="lineEchartsObj.inter_val+=1">增大inter_val</el-button> -->
      <line-echarts-demo :lineEchartsObj="testObj"></line-echarts-demo>
      <el-button type="primary" @click="testObj.self.title.text=Date.now()">改变数据</el-button>
    </div>
    <!-- <filterTable></filterTable> -->
    <!-- <div>
      <div>
        自动聚焦：
        <input type="text" v-focus />
      </div>
      <div>
        根据自定义指令渲染颜色：
        <span v-color="'red'">red</span>
        <span v-color="'blue'">blue</span>
        <span v-color="'#ccc'">#ccc</span>
      </div>
    </div> -->
    <!-- <div>
      <el-upload-base :uploadProps="uploadProps2" :uploadParams="uploadParams"></el-upload-base>
      <el-button size="medium" @click="uploadProps2.uploadSure=!uploadProps2.uploadSure" type="primary">确定</el-button>
    </div> -->
    <!-- <div>
      <el-upload-single :uploadProps="uploadProps3" :uploadParams="uploadParams"></el-upload-single>
    </div> -->
  </div>
</template>
<script>
import { lineData } from "@/assets/lineData";
import utils from "@/utils/utils";
import "@/directives";

export default {
  components: {
    keywordsTxt: () => import("./common/keywordsTxt"),
    vuexTemplate: () => import("./common/vuex"),
    imgUpload: () => import("./common/imgUpload"),
    zDialog: () => import("./common/dialog"),
    zDialogSync: () => import("./common/dialog.sync"),
    datePicker: () => import("./common/datePicker"),
    lineEcharts: () => import("./common/lineEcharts"),
    filterTable: () => import("./common/table-filters"),
    elUploadBase: () => import("./common/elUploadBase"),
    elUploadSingle: () => import("./common/elUploadSingle"),
    lineEchartsDemo: () => import("./common/lineEchartsDemo"),
  },
  data() {
    return {
      uploadProps1: {
        uploadSure: false,
        width: 100,
        height: 100,
        tips: "文件支持格式为JPG,GIF,PNG和PDF"
      },
      dialogObj: {
        id: 110
      },
      dialogVisible: {
        dialog1: false
      },
      lineEchartsObj: {
        id: "line-echarts",
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
      },
      testObj: {
        id: "line-echarts",
        xData: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        yData: [
          [120, 132, 101, 134, 90, 230, 210], [220, 182, 191, 234, 290, 330, 310], [150, 232, 201, 154, 190, 330, 410], [320, 332, 301, 334, 390, 330, 320], [820, 932, 901, 934, 1290, 1330, 1320]
        ],
        nameArr: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎'],
        interVal: 1,
        //自定义配置
        self: {
          title: {
            text: "自定义标题"
          }
        }
      },
      uploadProps2: {
        uploadSure: false,
        acceptType: [".png", ".jpg", ".gif", ".pdf"],
        url: "/api/test",
        size: 1,
        limit: 2,
        tips: "上传的图片文件单张大小不能超过5M，文件上传数量不能超过3。<br />文件支持格式为JPG,GIF,PNG和PDF",
        btnText: "选择"
      },
      uploadProps3: {
        acceptType: [".png", ".jpg", ".gif", ".pdf"],
        url: "/api/test",
        size: 1,
        tips: "上传的文件大小不能超过5M,文件支持格式为JPG,GIF,PNG和PDF",
        btnText: "选择"
      },
      uploadParams: {
        params1: "",
        params2: "",
        params3: ""
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
    },
  },
  created() {
    this.dealLineData();
    console.log(this.lineEchartsObj)
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
    window.onbeforeunload = function (e) {
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
  },
  //局部自定义指令
  // directives: {
  //   focus: {
  //     // 指令的定义
  //     inserted: function(el) {
  //       el.focus();
  //     }
  //   }
  // }
};
</script>

<style>
</style>