<template>
<!-- 工序报价 -->
  <el-form :inline="true" ref="dataForm" size="mini" :model="mindatas">
    <el-tabs>
      <el-table
        :data="mindatas.billProduceQuoteBPoList"
        show-summary
        :summary-method="getSummaries"
      >
        <el-table-column
          prop="type"
          label="工序类别"
          width="70"
        ></el-table-column>
        <el-table-column
          prop="param"
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

        <el-table-column label="销售工序单价" prop="unitPriceSale" width="90">
          <template slot-scope="scope">
            <el-input
              size="small"
              oninput="value=value.replace(/[^\d.]/g,'')"
              v-model="scope.row.unitPriceSale"
              @change="gongxuChange(scope.row, 1)"
            ></el-input>
          </template>
        </el-table-column>

        <el-table-column
          prop="unitTotalPriceSale"
          label="销售工序总价"
          width="60"
        ></el-table-column>
        <el-table-column label="销售订单合计" prop="unitTotalSale" width="130">
          <template slot-scope="scope">
            <el-input
              size="small"
              oninput="value=value.replace(/[^\d.]/g,'')"
              v-model="scope.row.unitTotalSale"
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
  props: ["mindatas"],
  created() {
    this.datas = this.mindatas;
  },

  watch: {
    mindatas() {
      this.datas = this.mindatas;
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
      //输入框填写后的判断条件 
      if (type === 1) {
        let sourceUnitPriceSale = Number.parseFloat(row.unitPriceSale);
        if (isNaN(sourceUnitPriceSale)) {
          row.unitPriceSale = 0;
        } else {
          row.unitPriceSale = sourceUnitPriceSale
            .toFixed(3)
            .replace(/(\d)(?=(\d{3})+\.)/g, "$1");
        }
        // 销售外协工序总价 = 工序参数 * 销售外协工序单价
        row.unitTotalPriceSale = (row.param * row.unitPriceSale)
          .toFixed(3)
        // 销售外协订单合计 = 销售外协工序总价 * 订单数量
        row.unitTotalSale = (row.unitTotalPriceSale * this.datas.productNum)
          .toFixed(3)
      }
      // console.log(type);
      if (type == 2) {

        let sourceUnitTotalSale = Number.parseFloat(row.unitTotalSale);
        // console.log(sourceUnitTotalSale);
        if (isNaN(sourceUnitTotalSale)) {
          row.unitTotalSale = 0;
        } else {
          row.unitTotalSale = sourceUnitTotalSale
            .toFixed(3)
        }
        // 销售外协工序总价 = 销售外协订单合计 / 数量
        row.unitTotalPriceSale = (row.unitTotalSale / this.datas.productNum)
          .toFixed(3)
        if (row.unitTotalPriceSale === "Infinity") {
          row.unitTotalPriceSale = 0.0;
        }
        // 销售外协工序单价 = 销售外协工序总价 / 工序参数
        row.unitPriceSale = (row.unitTotalPriceSale / row.param)
          .toFixed(3)
          .replace(/(\d)(?=(\d{3})+\.)/g, "$1");

        if (row.unitPriceSale === "Infinity") {
          row.unitPriceSale = 0.0;
        }
        // this.mindatas.billProduceQuoteBPoList =row.unitTotalSale
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
          
          this.allprice = sums[6] //销售工序单价价钱
          sums[index]= sums[index].toFixed(3)
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