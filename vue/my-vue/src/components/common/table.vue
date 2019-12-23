<template>
  <div>
    <el-table :data="tableData">
      <el-table-column
        v-for="item in tableHead"
        :key="item.id"
        :prop="item.id"
        :label="item.label"
        :filters="item.filter"
        :filter-method="item.filter && filterHandler"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "filterTable",
  data() {
    return {
      tableHead: [
        { id: "1", label: "xxx", filter: [] },
        { id: "2", label: "xxx", filter: [] },
        { id: "3", label: "xxx", filter: [] },
        { id: "4", label: "xxx" },
        { id: "5", label: "xxx" },
        { id: "6", label: "xxx", filter: [] }
      ],
      tableData: [
        { 1: "one", 2: "two", 3: "three", 4: "four", 5: "five", 6: "six" },
        { 1: "one1", 2: "two1", 3: "three1", 4: "four1", 5: "five1", 6: "six1" }
      ]
    };
  },
  methods: {
    uniqArrObject(arr) {
      let result = {};
      let finalResult = [];
      for (let i = 0; i < arr.length; i++) {
        result[arr[i].text] = arr[i];
      }
      for (let key in result) {
        finalResult.push(result[key]);
      }
      return finalResult;
    },
    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value || row[property].value === value;
    }
  },
  mounted() {
    let filterList = this.tableHead.filter(i => i.id === "1")[0].filter;
    //上面这句es6语法相当于下面的
    // let filterList = this.tableHead.filter(function(params){
    //     return  params.id === '1'
    // })
    // filterList = filterList1[0].filter;
    //下面是为了把数据通过 [{ text: '家', value: '家' }, { text: '公司', value: '公司' }]的格式赋值给filterList
    this.tableData.forEach(item => {
      filterList.push({
        text: item[1],
        value: item[1]
      });
    });
    console.log("filterList", filterList);
    //下面这句话只是执行uniqArrObject函数进行数组去重
    filterList = this.uniqArrObject(filterList);
  }
};
</script>

