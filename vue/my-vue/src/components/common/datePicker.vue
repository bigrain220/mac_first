<!-- 用法： -->
<!-- 
template结构：
  <date-picker></date-picker>
data 数据：
  
methods方法：
 
-->


<template>
  <div class="date-picker">
    <el-button-group>
      <el-button type="primary" @click="dateClick(0)">今天</el-button>
      <el-button type="primary" @click="dateClick(-1)">昨天</el-button>
      <el-button type="primary" @click="dateClick(-6)">最近七天</el-button>
      <el-button type="primary" @click="dateClick(-29)">最近三十天</el-button>
    </el-button-group>
    <el-date-picker v-model="value" format="yyyy-MM-dd" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" @change="dateChange">
    </el-date-picker>
  </div>
</template>

<script>
export default {
  name: "datePicker",
  data() {
    return {
      value: []
    };
  },
  methods: {
    dateChange(params) {
      console.log(params, this.value);
    },
    dateClick(val) {
      //获取当前时间戳(毫秒)
      var nowTime = new Date().getTime();

      var start = "";
      if (val === 0) {
        this.value = [new Date(nowTime), new Date(nowTime)];
      } else if (val === -1) {
        start = nowTime - 24 * 60 * 60 * 1000;
        this.value = [new Date(start), new Date(nowTime)];
      } else if (val === -6) {
        start = nowTime - 7 * 24 * 60 * 60 * 1000;
        this.value = [new Date(start), new Date(nowTime)];
      } else if (val === -29) {
        start = nowTime - 29 * 24 * 60 * 60 * 1000;
        this.value = [new Date(start), new Date(nowTime)];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>