<template>
  <el-form
    :inline="true"
    ref="dataForm"
    size="mini"
    :model="temp"
  >
    <el-table :data="temp.productOrderBHPosarrflase" show-summary>
      <el-table-column prop="pkProduceQuoteB" v-if="false"></el-table-column>
      <el-table-column prop="ismodel" v-if="false"></el-table-column>
      <el-table-column
        prop="modelCode"
        label="制具编号"
        width="70"
      ></el-table-column>
      <el-table-column
        prop="processType"
        label="制具名称"
        width="70"
      ></el-table-column>
      <el-table-column
        prop="processParam"
        label="制具数量"
        width="70"
      ></el-table-column>
      <el-table-column
        prop="unitPriceOut"
        label="成本单价"
        width="70"
      ></el-table-column>
      <el-table-column
        prop="unitTotalPriceOut"
        label="成本总价"
        width="70"
      ></el-table-column>
      <!-- <el-table-column
        prop="unitTotalPriceOut"
        label="销售单价"
        width="70"
      ></el-table-column>
      <el-table-column
        prop="unitTotalPriceOut"
        label="销售总价"
        width="70"
      ></el-table-column> -->
      <el-table-column
        prop="unitTotalPriceSale"
        label="销售单价"
        width="70"
      >
        <template slot-scope="scope">
          <el-input
            size="small"
            oninput="value=value.replace(/[^\d.]/g,'')"
            v-model="scope.row.unitTotalPriceSale"
            @change="zhijuChange(scope.row,1)"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column label="销售制具总价" prop="unitTotalSale" width="70">
        <template slot-scope="scope">
          <el-input
            size="small"
            oninput="value=value.replace(/[^\d.]/g,'')"
            v-model="scope.row.unitTotalSale"
            @change="zhijuChange(scope.row,2)"
          ></el-input>
        </template>
      </el-table-column>
    </el-table>
  </el-form>
</template>
<script>
export default {
  props: ["mindatas"],
  created(){
    let arr = [];
     this.temp = this.mindatas;
      // console.log(this.temp);
       for(let i of this.mindatas.productOrderBHPos ){
        //  console.log(i.isModel);
        
 
      }
  },
  watch:{
    mindatas(){
       let arr = [];
      this.temp = this.mindatas;
      //  console.log(this.temp);
       for(let i of this.mindatas.productOrderBHPos ){
        //  console.log(i.isModel);
        
        
         
 
      }
    }
  },
  data() {
    return {

    };
  },
  methods: {
    zhijuChange(row,type) {
      // console.log(row);
      if(type ==1){
        // console.log(1);
        row.unitTotalSale=row.unitTotalPriceSale *row.param
        // console.log(row.param);
      }
       if(type ==2){
        // console.log(1);
        row.unitTotalPriceSale=row.unitTotalSale /row.param
        // console.log(row.param);
      }
      // 销售制具报价
      let sourceUnitTotalSale = Number.parseFloat(row.unitTotalSale);
      if (isNaN(sourceUnitTotalSale)) {
        row.unitTotalSale = 0;
      } else {
        row.unitTotalSale = sourceUnitTotalSale
          .toFixed(3)
          .replace(/(\d)(?=(\d{3})+\.)/g, "$1");
      }
    },
  },
};
</script>
<style  scoped>
</style>