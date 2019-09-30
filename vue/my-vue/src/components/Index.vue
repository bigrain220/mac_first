<template>
  <div class="box">
    <header class="head">
      <span>
        <marquee direction="left">welcome to william's project which is made of Vue!</marquee>
      </span>
    </header>
    <el-tabs v-model="activeName" @tab-click="typeClick" class="tag-list">
      <el-tab-pane v-for="(item, index) in itemList" :label="item.tag_name" :name="item.brief_name+''" :key="index"></el-tab-pane>
    </el-tabs>
    <VideoList :clickBriefName="clickBriefName"></VideoList>
    <div v-if="btnFlag" class="go-top el-icon-caret-top"  @click="backTop"></div>
  </div>
</template>
<script>
import VideoList from "../components/common/VideoList";
import { tagsAPI } from "../api/api";
export default {
  name: "Index",
  components: { VideoList },
  inject: ["reload"],
  data() {
    return {
      language: "zh",
      activeName: "all",
      itemList: [
        {
          tag_name: "全部",
          tag_id: "",
          brief_name: "all"
        }
      ],
      clickBriefName: "",
      btnFlag: false
    };
  },
  methods: {
    getThemesData() {
      var params = {};
      params.language = this.language;
      tagsAPI(params).then(rs => {
        // console.log("data", rs);
        this.itemList = [...this.itemList, ...rs.data];
      });
    },

    typeClick(tab, event) {
      this.clickBriefName = this.itemList[tab.index - 0].brief_name;
      if (this.clickBriefName == this.$route.params.name) {
        this.reload();
      } else {
        this.$router.push("/themes/" + this.clickBriefName);
      }
    },

    backTop() {
      const that = this;
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed;
        if (that.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 16);
    },

    scrollToTop() {
      const that = this;
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      that.scrollTop = scrollTop;
      if (that.scrollTop > 60) {
        that.btnFlag = true;
      } else {
        that.btnFlag = false;
      }
    }
  },

  created() {
    this.getThemesData();
    this.activeName = this.$route.params.name;
    this.clickBriefName = this.$route.params.name;
  },
  mounted() {
    window.addEventListener("scroll", this.scrollToTop);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollToTop);
  }
};
</script>

<style scoped>
.box {
  margin: 0 auto;
}
.head {
  width: 100%;
  height: 70px;
  text-align: center;
  line-height: 70px;
  font-weight: bold;
  font-size: 16px;
  background: -webkit-linear-gradient(
    left top,
    rgb(196, 74, 95),
    rgb(68, 68, 139)
  ); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(
    bottom right,
    rgb(196, 74, 95),
    rgb(68, 68, 139)
  ); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(
    bottom right,
    rgb(196, 74, 95),
    rgb(68, 68, 139)
  ); /* Firefox 3.6 - 15 */
  background: linear-gradient(
    to bottom right,
    rgb(196, 74, 95),
    rgb(68, 68, 139)
  ); /* 标准的语法 */
}
.head span {
  color: #fff;
}
.tag-list {
  height: 70px;
  line-height: 70px;
}
.box .go-top{
  position: fixed;
  right: 20px;
  bottom: 20px;
  cursor: pointer;
  font-size: 22px;
  background-color: #fff;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
  color: #409eff;
  text-align: center;
  box-shadow: 0 0 6px rgba(0,0,0,.12);
}
.box .go-top:hover{
  background: rgba(0,0,0,.12);
}
</style>
<style>
.tag-list .el-tabs__item {
  font-size: 16px;
}
.tag-list .el-tabs__nav-scroll {
  margin: 0 auto;
  max-width: 1520px;
}
.tag-list .el-tabs__nav-next,
.tag-list .el-tabs__nav-prev {
  line-height: 70px;
}
.tag-list .el-tabs__active-bar {
  padding: 0 16px;
}
.tag-list .el-tabs__nav {
  padding-left: 16px;
}
</style>

