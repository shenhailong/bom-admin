<template>
  <el-dialog
    :title="title"
    :visible.sync="contentVisiable"
    @close="closeDialog"
    width="60%"
  >
    <el-form
      :inline="true"
      ref="dataForm"
      :model="temp"
      label-position="left"
      label-width="120px"
    >
      <el-form-item label="关联产品名称" prop="pkProductOrderB">
        <el-select v-model="temp.pkProductOrderB" placeholder="请选择">
          <el-option
            v-for="item in orderBProductSelOptions"
            :key="item.pkProductOrderB"
            :label="`${item.pkProductOrderB}-${item.name}-${item.code}`"
            :value="item.pkProductOrderB"
          >
          </el-option>
          <!-- item.pkProductOrderB -->
        </el-select>
      </el-form-item>
      <el-form-item label="产品型号" prop="model">
        <el-input v-model="temp.model"></el-input>
      </el-form-item>
      <el-form-item label="产品编码" prop="productCode">
        <el-input v-model="temp.productCode"></el-input>
      </el-form-item>
      <el-form-item label="钢网价格(含税)" prop="steelPrice">
        <el-input v-model="temp.steelPrice"></el-input>
      </el-form-item><el-form-item label="制具总价(含税)" prop="makePrice">
        <el-input v-model="temp.makePrice"></el-input>
      </el-form-item>
      <el-form-item label="订单数量" prop="constractProductNum">
        <el-input v-model="temp.constractProductNum"></el-input>
      </el-form-item>
      <!-- <el-form-item label="采购成本单价" prop="onePrice">
        <el-input v-model="temp.onePrice"></el-input>
      </el-form-item>

      <el-form-item label="采购成本总价" prop="all">
        <el-input v-model="temp.allPrice" :disabled='true'></el-input>
      </el-form-item> -->
      <el-form-item label="经办人" prop="constractPsnname">
        <el-input v-model="temp.constractPsnname"></el-input>
      </el-form-item>
      <span
        v-if='$store.getters.roles.includes("采购角色")||$store.getters.roles.includes("全权角色")'
      >
        <el-form-item label="采购成本单价" prop="costUnitPriceNt">
          <el-input
            v-model="temp.costUnitPriceNt"
            oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
            @input="changePrice"
          ></el-input>
        </el-form-item>
      </span>
      <span
        v-if='$store.getters.roles.includes("采购角色")||$store.getters.roles.includes("全权角色")'
      >
        <el-form-item label="采购成品总价" prop="finishAmountNt">
          <el-input
            v-model="temp.finishAmountNt"
            oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
            :disabled="true"
          ></el-input>
        </el-form-item>
      </span>
      <span
        v-if='$store.getters.roles.includes("采购角色")||$store.getters.roles.includes("全权角色")'
      >
        <!-- <el-form-item label="价税合计" prop="priceTaxTotal">
          <el-input
            v-model="temp.priceTaxTotal"
            oninput="if(isNaN(value)) { value = null } if(value.indexOf('.')>0){value=value.slice(0,value.indexOf('.')+3)}"
            :disabled="true"
          ></el-input>
        </el-form-item> -->
      </span>
      <el-form-item label="单据状态" prop="billState">
        <el-select
          v-model="temp.billState"
          clearable
          placeholder="请选择"
          :disabled="true"
        >
          <el-option
            v-for="item in billStateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间" prop="creationtime">
        <el-input v-model="temp.creationtime" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="预计齐料时间" prop="estimatedOverTime">
        <el-date-picker
          v-model="temp.estimatedOverTime"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm:ss"
          placeholder="选择日期时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="文件上传">
        <el-upload
          drag
          class="upload-demo"
          ref="FileUpLoad"
          :action="uploadUrl"
          :limit="1"
          :file-list="upFileFileList"
          :on-exceed="handleExceed"
          :on-success="handleVideoSuccess"
          :on-change="upFileChange"
          :on-preview="downloadProccessFile"
          :auto-upload="false"
        >
          <!-- :on-progress="uploadProcess" -->
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            <span class="z-span">采购文件</span><em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">
            1: 上传文件大小不得超过200M
          </div>
        </el-upload>
        <!-- <el-progress v-show="showprogress" :percentage="percent" style="margin-top:20px;"></el-progress>	 -->
      </el-form-item>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="sureDialog">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import {
  initReplaceUpdateData,
  initReplaceAddData,
  parseTime,
  randomNum,
} from "@/utils/viewCompUtil";
import { selectOrderInfoAsRef } from "@/api/orderCompMage/orderCompMage";
import { downloadProductFile } from "@/api/pub/pub";
import { saveOrderCompFile } from "@/api/orderCompMage/AproductionPub";
import { updateMaterielPurchase } from "@/api/orderCompMage/OrderProcurement";

export default {
  name: "ProductionFlowOrderProcurementContent",
  props: [
    "replace",
    "title",
    "visiable",
    "action",
    "updateRow",
    "pkProductOrder",
  ],
  computed: {
    ...mapGetters(["listData", "columns", "name", "roles"]),
  },
  data() {
    return {
      isshow: false,
      contentVisiable: false, // dialog 显示框
      orderBProductSelOptions: [
        // 选择关联订单字表数据
      ],
      billStateOptions: [
        { value: "0", label: "自由态" },
        { value: "1", label: "进行中" },
        { value: "2", label: "已完成" },
      ],
      percent: 0,
      temp: {
        pkOmgMaterielPurchase: undefined, // 物料采购主键
        pkProductOrderB: "", // 订单子表主键
        model: "", // 型号
        costUnitPriceNt: null, // 成本单价(未税)
        finishAmountNt: null, // 成品金额(未税)
        priceTaxTotal: null, // 价税合计
        billState: null, // 单据状态
        estimatedOverTime: "", // 预计齐料时间
        chargePsn: "", // 经办人
        creator: "", // 创建人
        fileName: "", // 文件名称
        fileFullname: "", // 文件全路径名称
        creationtime: parseTime(new Date()), // 创建时间
        dr: 0, // 删除标志
        ts: parseTime(new Date()), // 时间戳
      },
      showprogress: false,
      //采购文件集合
      upFileTemp: null, //记录临时文件
      upFileFileList: [],
      uploadUrl: process.env.BASE_API + "/", // 上传地址
    };
  },
  watch: {
    //计算采购成本总价
    "temp.onePrice"() {
      this.temp.allPrice = 0;
      // console.log(this.constractProductNum);
      this.temp.allPrice =
        Number(this.temp.onePrice) * Number(this.temp.constractProductNum);
    },
    visiable() {
      this.contentVisiable = this.visiable;
      if (this.title === "录入") {
        this.restTemp();
      }
      if (this.title === "修改" && this.updateRow) {
        // console.log(this.updateRow);

        this.temp = this.updateRow;

        // console.log(this.temp);
        if (this.temp.fileName) {
          this.upFileFileList = [
            { name: this.temp.fileName, fullName: this.temp.fileFullname },
          ];
        }
        if (this.temp.failName) {
          this.upFailFileList = [
            { name: this.temp.failName, fullName: this.temp.failFullname },
          ];
        }
      }
      if (this.visiable === true) {
        // 每次打开重新加载当前选择订单的字表数据信息
        // this.initOrderBProductListInfo()
        if (this.updateRow) {
          // console.log(this.updateRow)
          this.orderBProductSelOptions = [
            {
              pkProductOrderB: this.updateRow.pkProductOrderB,
              name: this.updateRow.productName,
              code: this.updateRow.productCode,
            },
          ];
        }
      }
      this.upFileTemp = null;
      this.upFailFileTemp = null;
    },
  },
  methods: {
    isprice() {},
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    handleVideoSuccess(file) {},
    upFileChange(file, fileList) {
      // 记录工艺文件
      // console.log(file);
      // if(file.status=='ready'){
      //  // file.percentage
      //  this.percent=0
      //  this.showprogress=true
      //  const interval = setInterval(()=>{
      //   if(this.percent>=99){
      // 	  clearInterval(interval)
      // 	  return
      //   }
      //   this.percent+=1
      //  },20)
      // }

      // if(file.status=='success'){
      //  this.percent=100
      //  this.showprogress=false
      // }

      this.upFileTemp = file;
    },
    upFailFileChange(file, fileList) {
      // 记录不合格文件
      this.upFailFileTemp = file;
    },
    closeDialog() {
      // 回调关闭Dialog
      this.$emit("close", null);
    },
    //改变价格
    changePrice() {
      this.temp.finishAmountNt =
        this.temp.costUnitPriceNt * this.temp.constractProductNum;
      this.temp.priceTaxTotal = this.temp.finishAmountNt * 1.13;
      // this.temp.priceTaxTotal=(this.temp.priceTaxTotal).toFixed(4)
      this.temp.priceTaxTotal =
        Math.round(this.temp.priceTaxTotal * 100 * 1000) / 1000;
    },
    // 加载当前选择订单的字表数据信息
    initOrderBProductListInfo() {
      if (this.pkProductOrder) {
        let initQueryParam = {
          pkProductOrder: this.pkProductOrder,
        };
        selectOrderInfoAsRef(initQueryParam).then((response) => {
          // console.log(response);
          if (response && response.success && response.object) {
            this.orderBProductSelOptions =
              response.object[0].orderCompMageProductPoList;
          } else {
            this.orderBProductSelOptions = [];
          }
        });
      }
    },
    //增加
    sureDialog() {
      // 确定保存回调Dialog
      let formData = new FormData();
      formData.append(
        `file`,
        this.upFileTemp == null ? null : this.upFileTemp.raw
      );
      formData.append(
        `failfile`,
        this.upFailFileTemp == null ? null : this.upFailFileTemp.raw
      );
      formData.append(`constractNo`, this.updateRow.contractNo);
      saveOrderCompFile(formData).then((response) => {
        if (response && response.success && response.object) {
          let saveParam = {
            pkOmgMaterielPurchase: this.temp.pkOmgMaterielPurchase,
            fileName:
              response.object.SALE_PROCPRODUCTION_NAME == ""
                ? null
                : response.object.SALE_PROCPRODUCTION_NAME,
            fileFullname:
              response.object.SALE_PROCPRODUCTION_FULL_NAME == ""
                ? null
                : response.object.SALE_PROCPRODUCTION_FULL_NAME,
            failName:
              response.object.SALE_FAIL_PROCPRODUCTION_NAME == ""
                ? null
                : response.object.SALE_FAIL_PROCPRODUCTION_NAME,
            failFullname:
              response.object.SALE_FAIL_PROCPRODUCTION_FULL_NAME == ""
                ? null
                : response.object.SALE_FAIL_PROCPRODUCTION_FULL_NAME,
            model: this.temp.model,
            costUnitPriceNt: this.temp.costUnitPriceNt,
            finishAmountNt: this.temp.finishAmountNt,
            priceTaxTotal: this.temp.priceTaxTotal,
            estimatedOverTime: this.temp.estimatedOverTime,
            steelPrice:this.temp.steelPrice,
            makePrice:this.temp.makePrice
          };

          this.$confirm("此操作将修改文件, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.$message({
                type: "success",
                message: "成功!",
              });
              updateMaterielPurchase(saveParam).then((response) => {
                if (response.success) {
                  this.$emit("close", null);
                  // location.reload();
                } else {
                  this.$message({
                    message: `操作失败:${response.message}`,
                    type: "error",
                  });
                }
              });
              
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除",
              });
            });
          // this.$message({ message: '操作成功', type: 'success' })
        } else {
          this.$message({
            message: `操作失败:${response.message}`,
            type: "error",
          });
        }
      });
    },
    // //进度条变化
    // uploadProcess(event, file, fileList) {
    // 	  console.log(event)
    // 	// this.percent = Math.floor(event.percent);
    // },
    // 文件下载
    downloadProccessFile(file) {
      let fileName = file.name;
      let fileFullName = file.fullName;
      if (fileName && fileFullName) {
        let downLoadParma = { fileName: fileName, fileFullName: fileFullName };
        downloadProductFile(downLoadParma).then((response) => {
          const blob = response.data;
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          // console.log(reader);
          reader.onload = (e) => {
            const a = document.createElement("a");
            if (fileName) {
              a.download = fileName;
            } else {
              a.download = fileName;
            }
            a.href = e.target.result;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          };
        });
      }
    },
    restTemp() {
      // 刷新本界面的数据
      this.temp = {
        pkOmgMaterielPurchase: undefined, // 物料采购主键
        pkProductOrderB: "", // 订单子表主键
        model: "", // 型号
        costUnitPriceNt: null, // 成本单价(未税)
        finishAmountNt: null, // 成品金额(未税)
        priceTaxTotal: null, // 价税合计
        billState: null, // 单据状态
        estimatedOverTime: "", // 预计齐料时间
        chargePsn: "", // 经办人
        fileName: "", // 文件名称
        fileFullname: "", // 文件全路径名称
        creator: "", // 创建人
        creationtime: parseTime(new Date()), // 创建时间
        dr: 0, // 删除标志
        ts: parseTime(new Date()), // 时间戳
      };
      this.upFileTemp = null;
      this.upFileFileList = [];
    },
  },
};
</script>

<style  lang="scss" type="text/scss" scoped>
.el-select /deep/.el-input__inner {
  width: 206px;
}
/deep/ .el-input__inner {
  width: 206px;
}

/deep/ .el-upload-dragger {
  width: 130px;
  height: 30px;
  background: #409eff;
  border: solid 1px #409eff;
}

/deep/ .el-upload-dragger .el-icon-upload {
  font-size: 30px;
  // color: #C0C4CC;
  color: #fffeff;
  float: left;
  margin: -10px 3px 16px;
  line-height: 50px;
}

/deep/ .el-upload__text .z-span {
  color: white;
  margin-top: -10px;
  display: inline-block;
}
</style>
