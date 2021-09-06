<template>
  <el-form :inline="true" ref="dataForm" size="mini" :model="temp">
    <el-table :data="mins">
      <el-table-column label="" prop="name" width="60"></el-table-column>
      <el-table-column prop="purchasePrice" label="成本单价" width="120">
        <template slot-scope="scope">
          <el-input
            :disabled="true"
            size="small"
            oninput="value=value.replace(/[^\d.]/g,'')"
            v-model="scope.row.purchasePrice"
            @change="zhijuChange(scope.row, 3)"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="purchasePriceSale" label="销售单价" width="120">
        <template slot-scope="scope">
          <el-input
            size="small"
            oninput="value=value.replace(/[^\d.]/g,'')"
            v-model="scope.row.purchasePriceSale"
            @change="zhijuChange(scope.row, 1)"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="purchaseTotal" label="成本总价" width="120">
        <template slot-scope="scope">
          <el-input
            :disabled="true"
            size="small"
            oninput="value=value.replace(/[^\d.]/g,'')"
            v-model="scope.row.purchaseTotal"
            @change="zhijuChange(scope.row)"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="purchaseTotalSale" label="销售总价" width="120">
        <template slot-scope="scope">
          <el-input
            size="small"
            oninput="value=value.replace(/[^\d.]/g,'')"
            v-model="scope.row.purchaseTotalSale"
            @change="zhijuChange(scope.row, 2)"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="re" label="利润" width="120">
        <template slot-scope="scope">
          <el-input 
          :disabled="true"
            size="small"
            oninput="value=value.replace(/[^\d.]/g,'')"
            v-model="scope.row.re"
            @change="zhijuChange(scope.row)"
          ></el-input>
        </template>
      </el-table-column>
    </el-table>
  </el-form>
</template>
<script>
export default {
  props: ["mindatas",'linidata'],
  created() {
    this.temp = this.mindatas;
    // console.log(this.temp);
    // 将数据渲染成表格模式
    this.mins = [
          {
            name: "物料",
            purchasePrice: this.temp.purchasePrice ,
            purchasePriceSale: this.temp.purchasePriceSale,
            purchaseTotal:this.temp.purchaseTotal,
            purchaseTotalSale: this.temp.purchaseTotalSale,
            re: (Number(this.temp.purchaseTotalSale) - (this.temp.purchaseTotal)).toFixed(3),
          },
          {
            name: "PCB",
            purchasePrice: this.temp.productPcbPrice,
            purchasePriceSale: this.temp.productPcbPriceSale,
            purchaseTotal:this.temp.productPcbTotal ,
            purchaseTotalSale: this.temp.productPcbTotalSale,
            re: (Number(this.temp.productPcbTotalSale) - (this.temp.productPcbTotal)).toFixed(3),
          },
          // {
          //   name: "钢网",
          //   purchasePrice: this.temp.steelPrice,
          //   purchasePriceSale: this.temp.steelPrice,
          //   purchaseTotal: this.temp.steelPriceSale,
          //   purchaseTotalSale: 0,
          // },
        ];
    this.seing();
    // console.log(this.mins);
  },
  watch: {
    mindatas: {
      handler(val) {
        this.temp = this.mindatas;
        // 将数据渲染成表格模式
        // console.log(1110);
        this.mins = [
          {
            name: "物料",
            purchasePrice: this.temp.purchasePrice ,
            purchasePriceSale: this.temp.purchasePriceSale,
            purchaseTotal:this.temp.purchaseTotal,
            purchaseTotalSale: this.temp.purchaseTotalSale,
            re: (Number(this.temp.purchaseTotalSale) - (this.temp.purchaseTotal)).toFixed(3),
          },
          {
            name: "PCB",
            purchasePrice: this.temp.productPcbPrice,
            purchasePriceSale: this.temp.productPcbPriceSale,
            purchaseTotal:this.temp.productPcbTotal ,
            purchaseTotalSale: this.temp.productPcbTotalSale,
            re: (Number(this.temp.productPcbTotalSale) - (this.temp.productPcbTotal)).toFixed(3),
          },
          // {
          //   name: "钢网",
          //   purchasePrice: this.temp.steelPrice,
          //   purchasePriceSale: this.temp.steelPrice,
          //   purchaseTotal: this.temp.steelPriceSale,
          //   purchaseTotalSale: 0,
          // },
        ];
        this.seing();
        // console.log(this.mins);
        // this.temp.billPurchaseQuotePo = val;
      },

      deep: true,
    },
  },
  data() {
    return {
      temp: {},
      mins: null,
    };
  },
  methods: {
    zhijuChange(data, type) {
      // console.log(type);
      if (type == 1) {
        //列表数据的处理方法
        data.purchasePriceSale = Number.parseFloat(data.purchasePriceSale)
          // .toFixed(3)
          // .replace(/(\d)(?=(\d{3})+\.)/g, "$1");
        let countPurchaseTotal = (data.purchasePriceSale * this.linidata.productNum)
          // .toFixed(3)
          // .replace(/(\d)(?=(\d{3})+\.)/g, "$1");
        data.purchaseTotalSale = countPurchaseTotal;
        // console.log(this.temp.productNum);
      }
      if (type == 2) {
        data.purchaseTotalSale = Number.parseFloat(data.purchaseTotalSale)
          // .toFixed(3)
          // .replace(/(\d)(?=(\d{3})+\.)/g, "$1");
        let countPurchasePrice = (data.purchaseTotalSale / this.linidata.productNum)
          // .toFixed(3)
          // .replace(/(\d)(?=(\d{3})+\.)/g, "$1");
        data.purchasePriceSale = countPurchasePrice;
        if (data.purchasePriceSale === "Infinity") {
          data.purchasePriceSale = 0.0;
        }
      }
      // 将数据复制会原来的模式  json
      this.seing();
    },
    seing() {
      //同步数据 
      this.temp.purchasePrice = this.mins[0].purchasePrice;
      this.temp.purchasePriceSale = this.mins[0].purchasePriceSale;
      this.temp.purchaseTotal = this.mins[0].purchaseTotal;
      this.temp.purchaseTotalSale = this.mins[0].purchaseTotalSale;
      this.temp.productPcbPrice = this.mins[1].purchasePrice;
      this.temp.productPcbPriceSale = this.mins[1].purchasePriceSale;
      this.temp.productPcbTotal = this.mins[1].purchaseTotal;
      this.temp.productPcbTotalSale = this.mins[1].purchaseTotalSale;
      this.$emit("price", this.temp);
    },
  },
};
</script>
<style lang="scss" type="text/scss" scoped>
.divs {
  display: flex;
}
.el-form-item {
  width: 20%;
}
</style>