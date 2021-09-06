<template>
  <el-form
    :inline="true"
    ref="dataForm"
    size="mini"
    :model="temp.billPurchaseQuotePo"
  >
    <el-table :data="mins">
      <el-table-column label="" prop="name" width="60"></el-table-column>
      <el-table-column prop="purchasePrice" label="成本单价" width="100">
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
      <el-table-column prop="purchasePriceSale" label="销售单价" width="100">
        <template slot-scope="scope">
          <el-input
            size="small"
            oninput="value=value.replace(/[^\d.]/g,'')"
            v-model="scope.row.purchasePriceSale"
            @change="zhijuChange(scope.row, 1)"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="purchaseTotal" label="成本总价" width="100">
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
      <el-table-column prop="purchaseTotalSale" label="销售总价" width="100">
        <template slot-scope="scope">
          <el-input
            size="small"
            oninput="value=value.replace(/[^\d.]/g,'')"
            v-model="scope.row.purchaseTotalSale"
            @change="zhijuChange(scope.row, 2)"
          ></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="re" label="利润" width="100">
        <template slot-scope="scope">
          <el-input
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
  props: ["mindatas"],
  created() {
    if (this.mindatas.billPurchaseQuotePo != null) {
      this.temp = this.mindatas;
    } else {
      this.temp.billPurchaseQuotePo = {
        ss: 1,
        pkPurchaseQuote: 0,
        quoteEndDate: "",
        purchasePrice: 0,
        purchaseTotal: 0,
        purchasePriceSale: 0,
        purchaseTotalSale: 0,
        productPcbPrice: 0,
        // productPcbTotal:0,
        productPcbTotal: 0,
        productPcbPriceSale: 0,
        productPcbTotalSale: 0,
        fileName: "",
        zPrice: 0,
        gstPrice: 0,
        untPrice: 0,
        zPrice1: 0,
        fileFullname: "",
        steelPrice: 0, //钢网采购价格
        steelPriceSale: 0, //钢网销售价格
      };
      this.mindatas.billPurchaseQuotePo = this.temp.billPurchaseQuotePo;
      // this.temp = this.mindatas;
    }
    this.isSteel();
    this.seing();
  },
  watch: {
    "mindatas.billPurchaseQuotePo": {
      handler(val) {
        if (this.mindatas.billPurchaseQuotePo != null) {
          this.temp = this.mindatas;
        } else {
          this.temp.billPurchaseQuotePo = {
            pkPurchaseQuote: 0,
            quoteEndDate: "",
            purchasePrice: 0,
            purchaseTotal: 0,
            purchasePriceSale: 0,
            purchaseTotalSale: 0,
            productPcbPrice: 0,
            // productPcbTotal:0,
            productPcbTotal: 0,
            productPcbPriceSale: 0,
            productPcbTotalSale: 0,
            fileName: "",
            zPrice: 0,
            gstPrice: 0,
            untPrice: 0,
            zPrice1: 0,
            fileFullname: "",
            steelPrice: 0, //钢网采购价格
            steelPriceSale: 0, //钢网销售价格
          };
          this.mindatas.billPurchaseQuotePo = this.temp.billPurchaseQuotePo;
        }

        this.temp = this.mindatas;
        // this.temp.billPurchaseQuotePo.productPcbTotal =0
        // 将数据渲染成表格模式
        // console.log(this.temp.isSteel);
        this.isSteel();
         this.seing();
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
          .toFixed(3)
          .replace(/(\d)(?=(\d{3})+\.)/g, "$1");
        let countPurchaseTotal = (data.purchasePriceSale * this.temp.productNum)
          .toFixed(3)
          .replace(/(\d)(?=(\d{3})+\.)/g, "$1");
        data.purchaseTotalSale = countPurchaseTotal;
      }
      if (type == 2) {
        data.purchaseTotalSale = Number.parseFloat(data.purchaseTotalSale)
          .toFixed(3)
          .replace(/(\d)(?=(\d{3})+\.)/g, "$1");
        let countPurchasePrice = (data.purchaseTotalSale / this.temp.productNum)
          .toFixed(3)
          .replace(/(\d)(?=(\d{3})+\.)/g, "$1");
        data.purchasePriceSale = countPurchasePrice;
        if (data.purchasePriceSale === "Infinity") {
          data.purchasePriceSale = 0.0;
        }
      }
      // 将数据复制会原来的模式  json
      this.seing();
    },
    seing() {
      // 销售物料报价的计算
      this.temp.billPurchaseQuotePo.purchasePrice = this.mins[0].purchasePrice;
      this.temp.billPurchaseQuotePo.purchasePriceSale = this.mins[0].purchasePriceSale;
      this.temp.billPurchaseQuotePo.purchaseTotal = this.mins[0].purchaseTotal;
      this.temp.billPurchaseQuotePo.purchaseTotalSale = this.mins[0].purchaseTotalSale;
      this.temp.billPurchaseQuotePo.productPcbPrice = this.mins[1].purchasePrice;
      this.temp.billPurchaseQuotePo.productPcbPriceSale = this.mins[1].purchasePriceSale;
      this.temp.billPurchaseQuotePo.productPcbTotal = this.mins[1].purchaseTotal;
      this.temp.billPurchaseQuotePo.productPcbTotalSale = this.mins[1].purchaseTotalSale;
      if(this.mins[2]){
        
        this.temp.billPurchaseQuotePo.steelPrice = this.mins[2].purchasePrice;
        
        
       this.temp.billPurchaseQuotePo.steelPriceSale = this.mins[2].purchasePriceSale;
      //  console.log(this.temp.billPurchaseQuotePo.steelPriceSale);
      }
      
      console.log(this.temp.billPurchaseQuotePo);
      this.$emit("price", this.temp.billPurchaseQuotePo);
    },
    isSteel() {
      if (this.temp.isSteel == "0") {
        this.mins = [
          {
            name: "物料",
            purchasePrice: this.temp.billPurchaseQuotePo.purchasePrice,
            purchasePriceSale: this.temp.billPurchaseQuotePo.purchasePriceSale,
            purchaseTotal: this.temp.billPurchaseQuotePo.purchaseTotal,
            purchaseTotalSale: this.temp.billPurchaseQuotePo.purchaseTotalSale,
            re: (
              this.temp.billPurchaseQuotePo.purchaseTotalSale -
              this.temp.billPurchaseQuotePo.purchaseTotal
            ).toFixed(3),
          },
          {
            name: "PCB",
            purchasePrice: this.temp.billPurchaseQuotePo.productPcbPrice,
            purchasePriceSale: this.temp.billPurchaseQuotePo
              .productPcbPriceSale,
            purchaseTotal: this.temp.billPurchaseQuotePo.productPcbTotal,
            purchaseTotalSale: this.temp.billPurchaseQuotePo
              .productPcbTotalSale,
            re: (
              this.temp.billPurchaseQuotePo.productPcbTotalSale -
              this.temp.billPurchaseQuotePo.productPcbTotal
            ).toFixed(3),
          },
        ];
        this.temp.billPurchaseQuotePo.steelPrice = null;
        this.temp.billPurchaseQuotePo.steelPriceSale = null;
      } else {
        this.mins = [
          {
            name: "物料",
            purchasePrice: this.temp.billPurchaseQuotePo.purchasePrice,
            purchasePriceSale: this.temp.billPurchaseQuotePo.purchasePriceSale,
            purchaseTotal: this.temp.billPurchaseQuotePo.purchaseTotal,
            purchaseTotalSale: this.temp.billPurchaseQuotePo.purchaseTotalSale,
            re: (
              this.temp.billPurchaseQuotePo.purchaseTotalSale -
              this.temp.billPurchaseQuotePo.purchaseTotal
            ).toFixed(3),
          },
          {
            name: "PCB",
            purchasePrice: this.temp.billPurchaseQuotePo.productPcbPrice,
            purchasePriceSale: this.temp.billPurchaseQuotePo
              .productPcbPriceSale,
            purchaseTotal: this.temp.billPurchaseQuotePo.productPcbTotal,
            purchaseTotalSale: this.temp.billPurchaseQuotePo
              .productPcbTotalSale,
            re: (
              this.temp.billPurchaseQuotePo.productPcbTotalSale -
              this.temp.billPurchaseQuotePo.productPcbTotal
            ).toFixed(3),
          },
          {
            name: "钢网",
            purchasePrice: this.temp.billPurchaseQuotePo.steelPrice,
            purchasePriceSale: this.temp.billPurchaseQuotePo.steelPriceSale,
            purchaseTotal: this.temp.billPurchaseQuotePo.steelPrice,
            purchaseTotalSale: this.temp.billPurchaseQuotePo.steelPriceSale,
            re: (
              this.temp.billPurchaseQuotePo.steelPriceSale -
              this.temp.billPurchaseQuotePo.steelPrice
            ).toFixed(3),
          },
        ];
      }
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