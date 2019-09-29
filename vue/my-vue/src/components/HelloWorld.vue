<template>
  <div class="hello">
    <h1 @click="goIndex">{{ msg }}</h1>
    <h2 class="title">Essential Links</h2>
    <br>
    <h2 class="title">Ecosystem</h2>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to My Vue.js App'
    }
  },
  methods:{
    goIndex(){
      this.$router.push('/index')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1{
  margin:200px 0 100px 0;
}
h1, h2 {
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
.hello{
  text-align: center;
}
</style>
