<template>
  <div>
    <keywordsTxt @getTxt="getTxt" :indexData="2"></keywordsTxt>
  </div>
</template>
<script>
export default {
  components: {
    keywordsTxt: () => import("./common/keywordsTxt")
  },
  data() {
    return {
      num: 10
    };
  },
  methods: {
    getTxt(params) {
      console.log(params, "accept");
    }
  },
  created(){
    console.log(this.$store.state);
    this.$store.commit('setCityID',6);
    console.log(this.$store.state);
  },
  //路由跳转确认
  // beforeRouteLeave(to, from, next) {
  //   const answer = window.confirm("当前页面数据未保存，确定要离开？");
  //   if (answer) {
  //     next();
  //   } else {
  //     next(false);
  //   }
  // },
  //浏览器刷新确认
  // mounted() {
  //   var _this=this;
  //   window.onbeforeunload = function(e) {
  //     if (_this.$route.fullPath == '/test') {
  //       e = e || window.event;
  //       // 兼容IE8和Firefox 4之前的版本
  //       if (e) {
  //         e.returnValue = "关闭提示";
  //       }
  //       // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
  //       return "关闭提示";
  //     } else {
  //       window.onbeforeunload = null;
  //     }
  //   };
  // }
};
</script>

<style>
</style>