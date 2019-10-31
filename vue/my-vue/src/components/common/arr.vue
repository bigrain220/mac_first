<template>
  <div></div>
</template>

<script>
export default {
    name:"Arr",
    data(){
        return{
            arr:[
                [1,2,1,1,1],
                ['one',2,'three'],
                ['一','二',2]
            ]
        }
    },
    methods:{
        getData(){
          var a=[];
          var numArr=[];
          this.arr.map((item,index)=>{
              item.map((data,i)=>{
                  var obj={};
                  obj={x:index,y:i,value:data}
                  a.push(obj)
              })
          });
          console.log(a)
          for(var i = 0;i<a.length;i++){
              for(var j = i+1;j<a.length;j++){
                   if(a[i].value==a[j].value){
                    //    console.log(a[i],a[j]);
                        numArr.push(a[i].x+""+a[i].y);
                        numArr.push(a[j].x+""+a[j].y)
                   }
              }
          }
        numArr=[...new Set(numArr)]
        console.log(numArr)
        }
    },
    created(){
        this.getData();
    }
}
</script>

<style>

</style>