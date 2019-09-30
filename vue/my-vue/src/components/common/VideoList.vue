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
        <video preload="none" muted="false" loop="loop" :poster="item.cover_thumb_url" :src="item.video_url" @click="videoClick(item)"></video>
        <div class="bot">
          <div class="title">{{item.title}}</div>
          <div class="time" v-if="item.duration>0">{{item.duration | timeFilter}}</div>
          <div class="time" v-else>自由模板</div>
        </div>
      </li>
      <li class="space"></li>
      <li class="space"></li>
    </ul>
    <!--v-infinite-scroll-->
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="40">
      <div class="no-more" v-if="noMore">到底咯...<span class="el-icon-toilet-paper"></span></div>
    </div>
    <!-- dialog -->
    <el-dialog :visible.sync="dialogVisible" class="video-dialog" @closed="handleClose">
      <video autoplay controls="controls" controlslist="nodownload" :poster="dialogData.cover_thumb_url" :src="dialogData.video_url" ref="dialogVideo"></video>
      <div class="dialog-right">
        <h2>{{dialogData.title}}</h2>
        <div class="right-text-box" v-if="dialogData.duration==0">
          <div class="right-text"><span class="el-icon-time"></span> 时长不限</div>
          <div class="right-text"><span class="el-icon-edit"></span> 支持照片/视频/文本</div>
        </div>
        <div class="right-text-box" v-if="dialogData.duration>0">
          <div class="right-text"><span class="el-icon-time"></span>{{dialogData.duration | timeFilter}}</div>
          <div class="right-text" v-show="dialogData.statistics.image>0"><span class="el-icon-camera"></span>{{dialogData.statistics.image}} 张照片</div>
          <div class="right-text" v-show="dialogData.statistics.text>0"><span class="el-icon-edit-outline"></span>{{dialogData.statistics.text}} 处文字</div>
          <div class="right-text" v-show="dialogData.statistics.video>0"><span class="el-icon-video-camera"></span>{{dialogData.statistics.video}} 张视频</div>
        </div>
        <el-button class="choose-templete" @click="dialogVisible = false">选择模板</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { themesAPI } from "../../api/api";
import "../../utils/filters";
export default {
  name: "VideoList",
  props: {
    clickBriefName: { type: String }
  },
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
      page: 1,
      rows: 16,
      total: "",
      busy: false,
      noMore: false,
      dialogVisible: false,
      dialogData: {}
    };
  },
  methods: {
    selectChange() {
      //   console.log(this.selectForm);
      this.page = 1;
      this.getThemes();
    },
    getThemes(flag) {
      // https://apilightmv.aoscdn.com/api/themes/?tag_id=&page=2&per_page=15&charge_type=0&composition_type=0&theme_resource_type=0&language=zh&version=3
      this.loading = true;
      var params = {
        tag_id: "",
        page: this.page,
        per_page: this.rows,
        charge_type: "0",
        composition_type: this.selectForm.type,
        theme_resource_type: this.selectForm.content,
        theme_resolution: this.selectForm.size,
        tag_brief_name: this.clickBriefName,
        order_field: this.selectForm.order,
        language: "zh",
        version: "3"
      };
      params.tag_brief_name == "all" ? (params.tag_brief_name = "") : "";
      themesAPI(params).then(rs => {
        var timer = "";
        console.log(params);
        console.log(rs);
        this.total = rs.data.total;
        clearTimeout(timer);
        timer = setTimeout(() => {
          this.loading = false;
          if (flag) {
            this.listData = [...this.listData, ...rs.data.list];
            this.busy = false;
          } else {
            this.listData = rs.data.list;
            this.busy = false;
          }
        }, 500);
      });
    },
    loadMore() {
      if (this.total > this.page * this.rows) {
        this.busy = true;
        this.noMore = false;
        setTimeout(() => {
          this.page++;
          this.getThemes(true);
        }, 500);
      } else if (this.total) {
        this.noMore = true;
      }
    },
    videoClick(params) {
      this.dialogVisible = true;
      this.dialogData = params;
      console.log(params);
      setTimeout(() => {
        this.$refs.dialogVideo.src=params.video_url;
      }, 0)
    },
    handleClose(){
      this.$refs.dialogVideo.src="";
    }
  },
  watch: {
    clickBriefName: function(val) {
      (this.selectForm = {
        content: "0",
        type: "0",
        size: "",
        order: "orderby"
      }),
        (this.page = 1);
      this.getThemes();
    }
  },

  created() {
    this.getThemes();
  }
};
</script>

<style scoped>
.card-box {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  overflow: auto;
}
.card-box li {
  margin-bottom: 30px;
  cursor: pointer;
  box-shadow: 2px 2px 8px rgba(153, 153, 153, 0.3);
}
.card-box li:hover .bot {
  background: linear-gradient(to right, #689cf9, #f9bbdd);
  color: #fff;
}
.card-box li .bot:hover {
  background: linear-gradient(to right, #4889ff, #ff9ad1);
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
  font-size: 14px;
}
.card-box li .bot .time,
.card-box li .bot .title {
  height: 50px;
  line-height: 50px;
}
.card-box .space {
  content: "";
  display: block;
  height: 0;
  width: 22%;
}
.content-box .no-more {
  text-align: center;
  color: #999;
  height: 40px;
  line-height: 40px;
  margin-bottom: 20px;
}
@media screen and (max-width: 1200px) {
  .card-box li .bot .time,
  .card-box li .bot .title {
    font-size: 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.video-dialog video {
  width: 70%;
  height: 330px;
}
.dialog-right .right-text-box {
  text-align: left;
  margin-top: 30px;
}
.dialog-right .right-text {
  height: 40px;
  line-height: 40px;
  font-size: 16px;
}
.dialog-right .right-text span {
  padding: 0 10px;
  font-size: 16px;
}
.dialog-right .choose-templete {
  position: absolute;
  right: 30px;
  bottom: 20px;
  width: calc(30% - 50px);
  background: linear-gradient(to right, #689cf9, #f9bbdd);

  border-radius: 32px;
  color: #fff;
}
.dialog-right .choose-templete:hover {
  background: linear-gradient(to right, #4889ff, #ff9ad1);
}
</style>

<style>
.content-box {
  margin: 0 auto;
  width: 1520px;
  max-width: 90%;
}
.content-box .el-loading-spinner {
  position: fixed;
  left: 50%;
  text-align: unset;
}
.tag-form-inline {
  margin: 30px 0 20px 0;
  padding: 0 30px;
}
.tag-form-inline .el-form-item__content {
  width: 140px;
}
.tag-form-inline .el-form-item {
  margin-right: 20px;
}
.video-dialog .el-dialog {
  width: 900px;
}
.video-dialog .el-dialog__body {
  padding: 10px 20px 25px 20px;
  clear: both;
  overflow: hidden;
  position: relative;
}
.video-dialog .el-dialog__body .dialog-right {
  float: right;
  text-align: left;
  width: 30%;
  padding-left: 20px;
  box-sizing: border-box;
}
.video-dialog .el-dialog__headerbtn{
  font-size: 24px;
  cursor: pointer;
  top:6px;
}
</style>