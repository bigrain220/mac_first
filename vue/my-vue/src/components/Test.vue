<template>
  <div>
    <!-- <keywordsTxt @getTxt="getTxt" :indexData="2"></keywordsTxt> -->
<<<<<<< HEAD
    <!-- <vuexTemplate></vuexTemplate> -->
    <div>
     <img-upload :uploadProps=uploadProps @mapEvent="mapEvent"></img-upload>
     <el-button  @click="uploadProps.uploadSure=!uploadProps.uploadSure">上传事件</el-button>
     </div>
=======
    <vuexTemplate></vuexTemplate>
>>>>>>> 7a96ea0014507ec08a2d833e0dd4c4579715691a
  </div>
</template>
<script>
import {mapState,mapGetters,mapActions} from 'vuex'; 
export default {
  components: {
    keywordsTxt: () => import("./common/keywordsTxt"),
    vuexTemplate: () => import("./common/vuex"),
    imgUpload:()=>import("./common/imgUpload")
  },
  data() {
    return {
     uploadProps:{
        uploadSure: false,
        width: 100,
        height: 100
     }
    };
  },

  methods: {
    getTxt(params) {
      console.log(params, "accept");
    },
    mapEvent(data){
      console.log(data);
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