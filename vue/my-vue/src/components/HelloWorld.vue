<template>
  <div class="hello">
    <h1 @click="goIndex" class="title">{{ msg }}</h1>
    <br>
    <div class="session"><span @click="dialogFormVisible = true">login</span><span v-show="hasToken"></span><span @click="logout" v-show="hasToken">logout</span></div>

    <el-dialog title="login" :visible.sync="dialogFormVisible" @closed="handleClose">
      <el-form :model="form">
        <el-form-item label="identity_token:" :label-width="formLabelWidth">
          <el-input v-model="form.identity_token" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="goSession">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { sessionAPI } from "../api/api";
import  util  from "../utils/utils";
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to My Vue.js App",
      form:{
        "identity_token":""
      },
      dialogFormVisible:false,
      formLabelWidth:"120px",
      hasToken:false
    };
  },
  methods: {
    goIndex() {
      this.$router.push("/themes/all");
    },
    goSession() {
      var params = {
        identity_token: this.form.identity_token
      };
      sessionAPI(params).then(rs => {
        // console.log(rs);
        if(rs.status=="1"){
            util.setCookie("session_val", rs.data.user.api_token,5);
            this.goIndex();
        }else{
           this.$message({
              message: '校验失败,请确认无误后重新输入',
              type: 'warning'
           });
        }
      });
    },
    handleClose(){
       this.form.identity_token="";
    },
    logout(){
      this.$confirm('此操作将删除session_val:'+util.getCookie('session_val')+'的cookie', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
           util.clearCookie('session_val');
           history.go(0);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    }
  },
  created(){
     util.getCookie("session_val")==""?this.hasToken=false:this.hasToken=true;
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  margin: 200px 0 100px 0;
  cursor: pointer;
}
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
.title {
  display: flex;
  justify-content: center;
  color: #42b983;
}
.hello {
  text-align: center;
}
.session {
  font-size: 18px;
  color: rgb(92, 166, 250);
  cursor: pointer;
  font-weight: bold;
}
.session span:nth-child(2) {
  padding: 0 20px;
}
.session span:nth-last-child(1){
  color: rgb(124, 63, 63);
}
</style>
<style>
.el-message-box__message p{
   word-break:break-all;
}
</style>
