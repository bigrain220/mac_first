<!-- 用法： -->
<!-- 
template结构：
   <z-dialog v-if="dialogVisible.dialog1" :dialogObj="dialogObj" @dialogEvent="dialogEvent"></z-dialog>
   <el-button  @click="dialogVisible.dialog1=true">显示dialog</el-button>
data 数据：
    dialogObj:{
        id:110
        },
    dialogVisible:{
        dialog1:false
    }
methods方法：
  dialogEvent(data){
      this.dialogVisible.dialog1=data;
    }
-->

<template>
    <el-dialog :title="'提示:'+dialogObj.id" :visible.sync="dialogVisible" width="30%"  @closed="dialogClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
</template>

<script>
export default {
  name: "zDialog",
   props: {
    dialogObj: { type: Object }
  },
  data() {
    return {
        dialogVisible:true,
    };
  },
  methods: {
      dialogClose(){
          this.dialogVisible=false
      }
  },
   watch: {
    dialogVisible(val) {
      this.$emit("dialogEvent", val);
    }
  },
};
</script>

<style lang="scss" scoped>
</style>