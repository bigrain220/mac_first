<template>
  <div class="content-box" v-loading="loading">
    <el-form :inline="true" :model="selectForm" class="tag-form-inline" size="medium">
      <el-form-item label="内容：">
        <el-select v-model="selectForm.content" @change="selectChange">
          <el-option label="全部" value="0"></el-option>
          <el-option label="纯照片" value="1"></el-option>
          <el-option label="纯视频" value="2"></el-option>
          <el-option label="两者都有" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="类型：">
        <el-select v-model="selectForm.type" @change="selectChange">
          <el-option label="全部" value="0"></el-option>
          <el-option label="自由模板" value="1"></el-option>
          <el-option label="固定模板" value="2"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="比例：">
        <el-select v-model="selectForm.size" @change="selectChange">
          <el-option label="全部" value></el-option>
          <el-option label="16x9" value="16x9"></el-option>
          <el-option label="9x16" value="9x16"></el-option>
          <el-option label="1x1" value="1x1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="排序：" class="order-tag">
        <el-select v-model="selectForm.order" @change="selectChange">
          <el-option label="默认" value="orderby"></el-option>
          <el-option label="最热" value="task_num"></el-option>
          <el-option label="最新" value="created_at "></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <ul class="card-box">
      <li v-for="(item,index) in listData" :key="index" style="width:22%;">
        <video webkit-playsinline="true" playsinline="true" preload="none" muted="muted" loop="loop" :poster="item.cover_thumb_url"  :src="item.video_url">
        </video>
        <div class="bot">
          <div class="title">{{item.title}}</div>
          <div class="time" v-if="item.duration>0">{{item.duration | timeFilter}}</div>
          <div class="time" v-else>自由模板</div>
        </div>
      </li>
      <li class="space"></li>
      <li class="space"></li>
    </ul>
  </div>
</template>

<script>
import { themesAPI } from "../../api/api";
import "../../utils/filters";
export default {
  name: "VideoList",
  data() {
    return {
      loading: false,
      selectForm: {
        content: "0",
        type: "0",
        size: "",
        order: "orderby"
      },
      listData: [],
      total: ""
    };
  },
  methods: {
    selectChange() {
      //   console.log(this.selectForm);
      this.getThemes();
    },
    getThemes(page,num) {
      // https://apilightmv.aoscdn.com/api/themes/?tag_id=&page=2&per_page=15&charge_type=0&composition_type=0&theme_resource_type=0&language=zh&version=3
      this.loading = true;
      var params = {
        tag_id: "",
        page: page,
        per_page: num,
        charge_type: "0",
        composition_type: "",
        theme_resource_type: "",
        theme_resolution: "",
        order_field: "",
        language: "zh",
        version: "3"
      };
      params.composition_type = this.selectForm.type;
      params.theme_resource_type = this.selectForm.content;
      params.order_field = this.selectForm.order;
      params.theme_resolution = this.selectForm.size;
      themesAPI(params).then(rs => {
        console.log(rs);
        this.total = rs.data.total;
        // this.listData = rs.data.list;
        this.loading = false;
        this.listData =[...this.listData,...rs.data.list]
      });
    },
   
  },

  created() {
    this.getThemes(1,16);
  }
};
</script>

<style scoped>
.card-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow:auto;
}
.card-box li {
  margin-bottom: 30px;
  cursor: pointer;
  box-shadow: 2px 2px 8px rgba(153, 153, 153, 0.3);
}
.card-box li video {
  display: block;
  width: 100%;
  height: calc(100% - 50px);
}
.card-box li .bot {
  background: #fff;
  text-align: center;
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  box-sizing: border-box;
}
.card-box li .bot .time,.card-box li .bot .title {
  height: 50px;
  line-height: 50px;
}
.card-box .space{
    content: ""; display: block; height:0; width:22%
}
</style>

<style>
.content-box {
  margin: 0 auto;
  width: 1520px;
  max-width: 90%;
}
.tag-form-inline {
  margin: 30px 0 20px 0;
  padding: 0 30px;
}
.tag-form-inline .el-form-item__content {
  width: 140px;
}
</style>