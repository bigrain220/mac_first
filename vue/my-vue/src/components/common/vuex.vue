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
      cId: state => state.cityID,
      cname:state => state.city
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
    //执行mutations
    // this.$store.commit("setCityID", 6);
    //执行actions
    // this.$store.dispatch("selectCity", { id: 110 });
    console.log(this.$store.state);
    this.idValue=this.$store.state.cityID;
    //在app.vue中设置了sessionStorage;
    if(sessionStorage.getItem('store')){
      var _store = JSON.parse(sessionStorage.getItem('store')).cityID;
      this.idValue = _store;
    }

  }
};
</script>

<style>
</style>