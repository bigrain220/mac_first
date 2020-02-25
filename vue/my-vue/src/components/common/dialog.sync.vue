<!-- 用法： -->
<!-- 
template结构：
    <z-dialog v-if="dialogVisible.dialog1" :dialogObj="dialogObj" :isShow.sync="dialogVisible.dialog1"></z-dialog>
   <el-button  @click="dialogVisible.dialog1=true">显示dialog</el-button>
data 数据：
    dialogObj:{
        id:110
        },
    dialogVisible:{
        dialog1:false
    }

-->

<template>
  <el-dialog
    :title="'提示:'+dialogObj.id"
    :visible.sync="isShow"
    width="30%"
    :before-close="closeDialog"
  >
    <span>这是一段信息</span>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="closeDialog">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "zDialog",
  props: {
    dialogObj: { type: Object },
    isShow: { type: Boolean }
  },
  data() {
    return {};
  },
  methods: {
    closeDialog() {
      this.$emit("update:isShow", false);
    }
  }
};
</script>
<style lang="">
</style>
