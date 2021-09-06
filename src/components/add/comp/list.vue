<template>
  <el-table
    :data="tableData"
    border

    style="width: 100%">
    <slot></slot>
  </el-table>
</template>

<script>
import column from './column'

  export default {
    props:['cons'],
    watch:{
      cons:{
        deep:true,
        handler(newValue){
          this.tableData = newValue
          // console.log(newValue.object);
        }
      }
    },
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },
    components:{column},
    data() {
      return {
        tableData: []
      }
    }
  }
</script>