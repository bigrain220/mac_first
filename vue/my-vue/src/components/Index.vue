<template>
  <div>
    <header class="head">i am the index page!</header>
    <el-tabs v-model="activeId" @tab-click="typeClick">
      <el-tab-pane v-for="(item, index) in itemList"  :label="item.tag_name"  :name="item.tag_id+''" :key="index"></el-tab-pane>
    </el-tabs>

  </div>
</template>
<script>
import { themesAPI } from "../api/api";
export default {
  name: "Index",
  data() {
    return {
      language: "en",
      activeId: "1",
      itemList:[],
    };
  },
  methods: {
    getThemesData() {
      var params = {};
      params.language = this.language;
      themesAPI(params).then(rs => {
        console.log("data", rs);
        this.itemList = rs.data;
      });
    },
    
    typeClick(tab, event) {
      // console.log(tab,event);
      this.$router.push(tab.label)
    }
  },
  created() {
    this.getThemesData();
  }
};
</script>

<style scoped>
.head {
  width: 100%;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-weight: bold;
  background: #eee;
}
</style>

