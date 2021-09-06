<template>
 <!--  -->
  <el-dialog :visible.sync="contentVisiable" @close="closeDialog" width="88%" class="customer-dialog">
    <el-tabs v-model="activeName">
      <el-tab-pane label="基本信息" name="first">
        <!-- 内容 -->
        <essential :mindatas="datas" :workprice="workallprice"></essential>
      </el-tab-pane>
    </el-tabs>
    <div class="uit">
      <div style="width:55%">
        <el-tabs v-model="activeName">
          <el-tab-pane label="工序报价" name="first">
            <offwork :mindatas="datas" @isallprice="isallprice"></offwork>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div style="width:45%" >
        <el-tabs v-model="activeName">
          <el-tab-pane label="销售物料报价" name="first">
            <materiel
              class="bian"
              :mindatas="datas"
              @price="materielprice"
            ></materiel>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <div class="uit">
      <div>
        <el-tabs v-model="activeName">
          <el-tab-pane label="制具报价" name="first">
            <makingTools :temp="datas"></makingTools>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div >
        <el-tabs v-model="activeName">
          <el-tab-pane label="文件上传" name="first">
            <fileload class="bian" :mindatas="datas" @files="files"></fileload>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <div style="height: 50px">
      <div class="btn">
        <el-button type="primary" @click="sureDialog" v-if="action == 'DOQUOTE'">确定</el-button>
        <el-button @click="dleve">取消</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<script>
import essential from "./iitem/essential";
import offwork from "./iitem/offer_work";
import makingTools from "./iitem/makingTools";
import materiel from "./iitem/materiel";
import fileload from "./iitem/fileupload";

export default {
  components: {
    essential,
    offwork,
    makingTools,
    materiel,
    fileload,
  },
  props: ["replace", "visiable", "action", "updateRow"],
  watch: {
    visiable() {
      // console.log(this.action);
      this.contentVisiable = this.visiable; //显示隐藏
      this.datas = this.updateRow;
    },
    purchasePriceSale() {
      //含税单价计算
      this.workallprice =
        this.workprice + this.purchasePriceSale + this.productPcbPrice;
    },
    productPcbPrice() {
      //含税单价计算
      this.workallprice =
        this.workprice + this.purchasePriceSale + this.productPcbPrice;
    },
    workprice() {
      //含税单价计算
      this.workallprice =
        this.workprice + this.purchasePriceSale + this.productPcbPrice;
        console.log(this.workallprice);
    },
  },
  data() {
    return {
      contentVisiable: false, // dialog 显示框
      activeName: "first",
      datas: [], //页面数据,
      workprice: 0,
      materieldata: {},
      purchasePriceSale: 0,
      productPcbPrice: 0,
      workallprice: 0,
      steelPriceSale:0,
      files_one: null,
    };
  },
  methods: {
    closeDialog() {
      // 回调关闭Dialog
      this.$emit("close", null); //退出
    },
    files(data) {
      // console.log(data);
      if (data == null) {
        this.datas.matterFilename = null;
      } else {
        this.datas.matterFilename = data.name;
      }

      this.files_one = data;
      // console.log(data);
    },
    isallprice(data) {
      this.workprice = Number(data);
    },
    materielprice(data) {
      this.materieldata = data; //物料采购价格
      this.datas.billPurchaseQuotePo = data;
      // console.log(data.pcbdifference);
      // console.log(data.pcbdifference);
      // console.log(data);
      this.purchasePriceSale = Number(data.purchasePriceSale);
      // this.steelPriceSale =  Numberdata.steelPriceSale //无用 钢网不进行计算单价
      
      this.productPcbPrice = Number(data.productPcbPriceSale);
    },
    dleve() {
      this.$emit("close");
    },
    sureDialog() {
      let formData = new FormData();
      let jsons = this.datas;
      jsons.files_one = this.files_one;
      this.$emit("queryListData", jsons);
    },
  },
};
</script>
<style lang="scss" type="text/scss" scoped>
.uit {
  display: flex;
}
.uit > div {
  width: 50%;
}
.bian {
  border-left: 1px solid #000;
}

.btn {
  float: right;
}
/deep/.el-dialog {
  margin-top: 0 !important ;
}
/deep/ .el-dialog__header {
  padding: 0 !important;
}
/deep/ .el-dialog__body {
  // background:  #DCDC;
  padding: 0px 20px;
}
/deep/.el-tabs__header{
  margin: 0;
}
/deep/ .el-dialog__headerbtn{
  display: none;
}
</style>
