

<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      action="123"
      :accept="acceptType.toString()"
      :multiple="false"
      :on-remove="handleRemove"
      :on-change="handlefileChange"
      :auto-upload="false"
      :limit="uploadProps.limit"
      :on-exceed="handelExceed"
    >
      <el-button slot="trigger" size="mini" type="primary">选取文件</el-button>
      <div slot="tip" class="el-upload__tip">
        上传的图片文件单张大小不能超过{{uploadProps.size}}M，文件同时上传数量不能超过{{uploadProps.limit}}。
        <br />文件支持格式为{{acceptType.toString()}}
      </div>
    </el-upload>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "elUploadBase",
  props: {
    uploadProps: { type: Object },
    uploadParams: { type: Object }
  },
  data() {
    return {
      fileList: []
    };
  },
  methods: {
    handlefileChange(file, fileList) {
      //选择完文件后的状态
      console.log("change", file);
      //判断上传文件类型
      const type = file.name.substring(file.name.lastIndexOf("."));
      const isType = this.acceptType.indexOf(type.toLowerCase()) > -1;
      //判断上传文件大小
      const isSize = file.size / 1024 / 1024 <= this.uploadProps.size;
      if (!isType) {
        this.$message.error(
          "文件支持格式为: " + this.acceptType.toString() + " !"
        );
        fileList.pop();
        return false;
      } else if (!isSize) {
        this.$message.error('单次上传文件大小不能超过'+this.uploadProps.size+'M');
        fileList.pop();
        return false;
      } else {
        this.fileList = fileList;
      }
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handelExceed() {
      this.$message.error("超出文件上传数量限制！");
    },
    uploadAction() {
      let params = new FormData();
      for (const key in this.uploadParams) {
        if (this.uploadParams.hasOwnProperty(key)) {
          const element = this.uploadParams[key];
          params.append(key, element);
        }
      }
      if (this.fileList.length > 0) {
        this.fileList.map(item => {
          params.append("Filedata", item.raw);
        });
      }
      axios
        .post(this.uploadProps.url, params, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => {
          console.log(res, "666");
        });
    }
  },
  mounted() {},
  computed: {
    isUpload() {
      return this.uploadProps.uploadSure;
    },
    acceptType() {
      return this.uploadProps.acceptType;
    }
  },
  watch: {
    isUpload() {
      this.uploadAction();
    }
  }
};
</script>