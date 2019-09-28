<template>
  <div class="box">
    <header class="head">
      <span><marquee direction=left>welcome to william's vue ,this is a perfect project!</marquee></span>
    </header>
    <el-tabs v-model="activeId" @tab-click="typeClick" class="tag-list">
      <el-tab-pane v-for="(item, index) in itemList"  :label="item.tag_name"  :name="item.tag_id+''" :key="index"></el-tab-pane>
    </el-tabs>
    <VideoList></VideoList>
  </div>
</template>
<script>
import VideoList from '../components/common/VideoList';
import { tagsAPI } from "../api/api";
export default {
  name: "Index",
  components:{VideoList},
  data() {
    return {
      language: "zh",
      activeId: "",
      itemList:[],
    };
  },
  methods: {
    getThemesData() {
      var params = {};
      params.language = this.language;
      tagsAPI(params).then(rs => {
        // console.log("data", rs);
        this.itemList = rs.data;
        var all={
          tag_name:"全部",
          tag_id:"",
          brief_name:"all"
        }
        this.itemList.unshift(all);
      });
    },
    
    typeClick(tab, event) {
      // console.log(tab,event);
      // this.activeId = this.itemList[tab.index - 0].tag_id +"";
      this.$router.push("/index/themes/"+ this.itemList[tab.index - 0].brief_name)
    }
  },
  created() {
    this.getThemesData();
  }
};
</script>

<style scoped>
.box{
  margin: 0 auto;
}
.head {
  width: 100%;
  height: 70px;
  text-align: center;
  line-height: 70px;
  font-weight: bold;
  font-size: 16px;
  background: -webkit-linear-gradient(left top, rgb(196, 74, 95) , rgb(68, 68, 139)); /* Safari 5.1 - 6.0 */
  background: -o-linear-gradient(bottom right, rgb(196, 74, 95) , rgb(68, 68, 139)); /* Opera 11.1 - 12.0 */
  background: -moz-linear-gradient(bottom right, rgb(196, 74, 95) , rgb(68, 68, 139)); /* Firefox 3.6 - 15 */
  background: linear-gradient(to bottom right, rgb(196, 74, 95) , rgb(68, 68, 139)); /* 标准的语法 */
}
.head span{
  color:#fff;
}
.tag-list{
  height: 70px;
  line-height: 70px;
}
</style>
<style>
.tag-list .el-tabs__item{
  font-size: 16px;
}
.tag-list .el-tabs__nav-scroll{
  margin: 0 auto;
  max-width: 1520px;
}
.tag-list .el-tabs__nav-next,.tag-list .el-tabs__nav-prev{
  line-height: 70px;
}
.tag-list .el-tabs__active-bar{
  padding: 0 16px;
}
.tag-list .el-tabs__nav{
  padding-left: 16px;
}
</style>

