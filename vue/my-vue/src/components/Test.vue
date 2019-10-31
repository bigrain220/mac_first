<template>
<div>
  <keywordsTxt @getTxt="getTxt" :indexData="2"></keywordsTxt>
  <Arr></Arr>
  </div>
</template>
<script>
export default {
  components: { keywordsTxt: () => import("./common/keywordsTxt"),Arr: () => import("./common/arr") },
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