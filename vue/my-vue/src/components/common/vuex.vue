<template>
  <div>
    <el-form :inline="true">
      <el-form-item label="cityId :">
        <el-input v-model="idValue" placeholder=""></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button @click="changeId" type="primary">改变id</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "vuexTemplate",
  data() {
    return {
      idValue: ""
    };
  },
  computed: {
    ...mapState({
      cId: state => state.cityID
    })
  },
  methods: {
    getTxt(params) {
      console.log(params, "accept");
    },
    changeId() {
      this.$store.dispatch("selectCity", { id: this.idValue });
      this.$message.success('成功修改为：'+this.$store.state.cityID);
    }
  },
  created() {
    console.log(this.$store.state);
    this.$store.commit("setCityID", 6);
    console.log(this.$store.state);
    this.$store.dispatch("selectCity", { id: 110 });
    console.log(this.$store.state);
    this.idValue=this.$store.state.cityID;
  }
};
</script>

<style>
</style>