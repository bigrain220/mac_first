<template>
  <el-upload action="123" :multiple="false" :accept="acceptType.toString()" :file-list="fileList" :before-upload="beforeUpload">
    <el-button slot="trigger" size="mini" type="primary" v-text="uploadProps.btnText || '选取文件'"></el-button>
    <div slot="tip" class="el-upload__tip" v-html="uploadProps.tips"></div>
  </el-upload>
</template>

<script>
export default {
  props: {
    uploadProps: { type: Object },
    uploadParams: { type: Object }
  },
  data() {
    return {
      fileList: []
    }
  },
  computed: {
    acceptType() {
      return this.uploadProps.acceptType;
    }
  },
  methods: {
    beforeUpload(file) {
      // console.log(file)
      //判断上传文件类型
      const type = file.name.substring(file.name.lastIndexOf("."));
      const isType = this.acceptType.indexOf(type.toLowerCase()) > -1;
      //判断上传文件大小
      const isSize = file.size / 1024 / 1024 <= this.uploadProps.size;
 
      if (!isType) {
        this.$message.warning("文件支持格式为: " + this.acceptType.toString() + " !");
        //判断上传文件大小
      } else if (!isSize) {
        this.$message.warning("上传文件大小不能超过: " + this.uploadProps.size + "M");
      } else {
        let params = new FormData();
        let validData = Object.assign({}, this.uploadParams);
        for (const key in validData) {
          if (validData.hasOwnProperty(key)) {
            const element = validData[key];
            params.append(key, element);
          }
        }
        params.append("file", file);
        axios
          .post(this.uploadProps.url, params, { timeout: 20000 }, {
            headers: { "Content-Type": "multipart/form-data" }
          })
          .then(res => {
            console.log(res, "666");
          });
      }
      return false;
    },
  }
}
</script>

<style>
</style>