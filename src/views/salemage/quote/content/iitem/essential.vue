<template>
  <div>
    <el-form :inline="true" ref="dataForm" size="mini" :model="mindatas">
      <div class="dispersed">
        <el-form-item label="客户编码" prop="customerCode">
          <el-input v-model="mindatas.customerCode" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="产品名称" prop="productName">
          <el-input v-model="mindatas.productName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="产品型号" prop="productModel">
          <el-input v-model="mindatas.productModel" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="订单数量" prop="productNum">
          <el-input v-model="mindatas.productNum" :disabled="true"></el-input>
        </el-form-item>
      </div>
      <div class="dispersed">
        
        <el-form-item label="产品编码" prop="productCode">
          <el-input v-model="mindatas.productCode" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="税率" prop="taxinclud">
          <el-input v-model="mindatas.taxinclud" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="订单类型" prop="productType">
          <el-input v-model="mindatas.productType" :disabled="true"></el-input>
        </el-form-item>
            <el-form-item label="钢网来源" prop="productSteelMeshSource">
            <el-select
              v-model="mindatas.productSteelMeshSource"
              placeholder="请选择"
              :disabled="true"
            >
              <el-option
                v-for="item in steelMeshSourceOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
      </div>
      <div class="dispersed">
         <el-form-item label="含税单价" >
          <el-input v-model="workprice" :disabled="true"></el-input>
        </el-form-item>
         <el-form-item label="未税单价" >
          <el-input v-model="Untaxedworkprice" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="含税总价" >
          <el-input v-model="allprice" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="未税总价" >
          <el-input v-model="Untaxedallprice" :disabled="true"></el-input>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>
<script>
export default {
  props: ["mindatas",'workprice'],
  watch:{
    workprice(){
      this.Untaxedworkprice = this.workprice/this.mindatas.taxinclud
      this.Untaxedworkprice = this.Untaxedworkprice.toFixed(3)
      this.Untaxedallprice = this.Untaxedworkprice*this.mindatas.productNum
      this.Untaxedallprice = this.Untaxedallprice.toFixed(3)
      this.allprice = this.workprice*this.mindatas.productNum
    }
  },
  data() {
    return {
      datas: [],
      Untaxedworkprice:0,
      Untaxedallprice:0,
      allprice:0,
      profit_one:0,
      profit_two:0,
      steelMeshSourceOption: [
        // 钢网来源
        { value: "0", label: "无" },
        { value: "1", label: "甲方提供" },
        { value: "2", label: "乙方提供" },
      ],
    };
  },
};
</script>
<style  scoped>
    .dispersed{
        display: flex;
    }
    .dispersed>div{
        width: 25%;
    }
</style>