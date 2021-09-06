<template>
<!-- 工序报价 -->
  <el-form :inline="true" ref="dataForm" size="mini" :model="mindatas">
    <el-tabs>
      <el-table
        :data="datas.productOrderBHPosarr"
        show-summary
        :summary-method="getSummaries"
      >
        <el-table-column
          prop="processType"
          label="工序类别"
          width="70"
        ></el-table-column>
        <el-table-column
          prop="processParam"
          label="工序参数"
          width="70"
        ></el-table-column>
        <el-table-column
          prop="unitPriceOut"
          label="外协工序单价"   
          width="70"
        ></el-table-column>
        <el-table-column
          prop="unitTotalPriceOut"
          label="外协工序总价"
          width="70"
        ></el-table-column>
        <el-table-column
          prop="unitTotalOut"
          label="外协订单合计"
          width="70"
        ></el-table-column>

        <!-- <el-table-column label="销售工序单价" prop="saleTotalPriceOut" width="150">
          <template slot-scope="scope">
            <el-input
              size="small"
              oninput="value=value.replace(/[^\d.]/g,'')"
              v-model="scope.row.saleTotalPriceOut"
              @input="gongxuChange(scope.row, 1)"
            ></el-input>
          </template>
        </el-table-column> -->

        <el-table-column
          prop="saleTotalPriceOut"
          label="销售工序总价"
          width="60"
        ></el-table-column>
        <el-table-column label="销售订单合计" prop="saleUnitTotalOut" width="150">
          <template slot-scope="scope">
            <el-input
              size="small"
              oninput="value=value.replace(/[^\d.]/g,'')"
              v-model="scope.row.saleUnitTotalOut"
              @change="gongxuChange(scope.row, 2)"
            ></el-input>
          </template>
        </el-table-column>
      </el-table>
    </el-tabs>
  </el-form>
</template>
<script>
export default {
  props: ["mindatas" ,'linidata'],
  created() {
    let arr = [];
    let arrm = []
      this.datas = this.mindatas;
       for(let i of this.datas.productOrderBHPos ){
        //  console.log(i.isModel);
        
        if(i.isModel =='否'){
          // this.datas.productOrderBHPos 
          arr.push(i)
          // console.log(arr);
          this.datas.productOrderBHPosarr = arr
        }else{
          arrm.push(i)
          // console.log(arrm);
          this.datas.productOrderBHPosarrflase = arrm
        }
       
      
        
      }
  },

  watch: {
    mindatas() {
       let arr = [];
    let arrm = []
      this.datas = this.mindatas;
       for(let i of this.datas.productOrderBHPos ){
        //  console.log(i.isModel);
        
        if(i.isModel =='否'){
          // this.datas.productOrderBHPos 
          arr.push(i)
          // console.log(arr);
          this.datas.productOrderBHPosarr = arr
        }else{
          arrm.push(i)
          // console.log(arrm);
          this.datas.productOrderBHPosarrflase = arrm
        }

      }
    },
    allprice(){
      // console.log(this.allprice);
       this.$emit('isallprice',this.allprice)
    }
  },
  data() {
    return {
      datas: null,
      allprice: 0,
    };
  },
  methods: {
    gongxuChange(row, type) {
      // console.log(type);
      // saleTotalPriceOut ,unitTotalSale ,saleUnitTotalOut
      if (type === 2) {
        let sourceUnitTotalSale = Number.parseFloat(row.saleUnitTotalOut);
        if (isNaN(sourceUnitTotalSale)) {
          row.saleUnitTotalOut = 0;
        } else {
          row.saleUnitTotalOut = sourceUnitTotalSale
            .toFixed(3)
        }
        // 销售外协工序总价 = 销售外协订单合计 / 数量
        row.saleTotalPriceOut = (row.saleUnitTotalOut / this.linidata.productNum)
          // .toFixed(3)
        if (row.saleTotalPriceOut === "Infinity") {
          row.saleTotalPriceOut = 0.0;
        }
        // 销售外协工序单价 = 销售外协工序总价 / 工序参数
        row.unitPriceSale = (row.saleTotalPriceOut / row.processParam)
          .toFixed(3)
         

        if (row.unitPriceSale === "Infinity") {
          row.unitPriceSale = 0.0;
        }
        this.mindatas.billProduceQuoteBPoList =row.saleUnitTotalOut
      }
     
    },
    getSummaries(param) {
      this.allprice = 0
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总价";
          return;
        }
        const values = data.map((item) => Number(item[column.property]));
        if (!values.every((value) => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          sums[index] = sums[index].toFixed(3)
          this.allprice = sums[5] //销售工序单价价钱
   
        } else {
          sums[index] = "N/A";
        }
      });

      return sums;
    },
  },
};
</script>
<style lang="scss" type="text/scss"  scoped>

</style>