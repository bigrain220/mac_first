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
     <!-- <date-picker></date-picker> -->
  </div>
</template>
<script>
import {mapState,mapGetters,mapActions} from 'vuex'; 
export default {
  components: {
    keywordsTxt: () => import("./common/keywordsTxt"),
    vuexTemplate: () => import("./common/vuex"),
    imgUpload:()=>import("./common/imgUpload"),
    zDialog:()=>import("./common/dialog"),
    datePicker:()=>import("./common/datePicker")
  },
  data() {
    return {
     uploadProps:{
        uploadSure: false,
        width: 100,
        height: 100
     },
     dialogObj:{
       id:110
     },
     dialogVisible:{
       dialog1:false
     }
    };
  },

  methods: {
    getTxt(params) {
      console.log(params, "accept");
    },
    mapEvent(data){
      console.log(data);
    },
    dialogEvent(data){
      console.log(data)
      this.dialogVisible.dialog1=data;
    }

  },
  created(){
    
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
    var _this=this;
    console.log(_this.$route.fullPath)
    window.onbeforeunload = function(e) {
      if (_this.$route.fullPath == '/test') {
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