<template>
  <keywordsTxt @getTxt="getTxt" :indexData="2"></keywordsTxt>
</template>
<script>
export default {
  components: { keywordsTxt: () => import("./common/keywordsTxt") },
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