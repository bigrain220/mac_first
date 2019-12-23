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
import {mapState,mapGetters,mapMutations,mapActions} from 'vuex'
export default {
  name: "vuexTemplate",
  data() {
    return {
      idValue: ""
    };
  },
  computed: {
    //mapState其实就是设置别名，简化代码，比如this.$store.state.cityID可以用this.cId替代
    // ...mapState({
    //   cId: state => state.cityID,
    //   cname:state => state.city
    // }),
    ...mapState({
      cId: 'cityID',
      cname:'city'
    }),
    // 另一种写法(不设置别名，直接使用)
    // ...mapState(['cityID','city']),
  },
  methods: {
    ...mapActions(['cityID','selectCityID']),
    changeId() {
      this.selectCityID({ id: this.idValue });
      this.$message.success('成功修改为：'+this.cId);
       console.log(this.$store.state);
    }
  },
  created() {
    //执行mutations
    // this.$store.commit("setCityID", 6);
    //执行actions
    // this.$store.dispatch("selectCity", { id: 110 });
    console.log(this.$store.state);
    this.idValue=this.cId;
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