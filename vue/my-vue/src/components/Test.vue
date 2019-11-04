<template>
<div>
  <!-- <keywordsTxt @getTxt="getTxt" :indexData="2"></keywordsTxt> -->
  <!-- <Arr></Arr> -->
  <Test></Test>
  </div>
</template>
<script>
export default {
  components: { 
      keywordsTxt: () => import("./common/keywordsTxt"),
      Arr: () => import("./common/arr"),
      Test:() => import("./common/test") 
    },
  data() {
    return {
      
    };
  },
  methods: {
    getTxt(params){
      console.log(params,'accept')
    }
  }
};
</script>

<style>
</style>