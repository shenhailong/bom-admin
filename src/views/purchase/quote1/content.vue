<template>
  <el-dialog
    :title="title"
    :visible.sync="contentVisiable"
    @close="closeDialog"
    width="70%"
  >
    <el-form
      :inline="true"
      ref="dataForm"
      :model="temp"
      :rules="rules"
      label-position="left"
      label-width="140px"
    >
      <el-tabs type="border-card">
        <el-tab-pane label="单据信息">
          <el-form-item label="单据状态" prop="billState">
            <el-select
              v-model="temp.billState"
              placeholder="请选择"
              :disabled="true"
            >
              <el-option
                v-for="item in billStateOprion"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="审批人" prop="approverShow">
            <el-input v-model="temp.approverShow" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="审批时间" prop="approvetime">
            <el-input v-model="temp.approvetime" :disabled="true"></el-input>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>

    <!--附件管理Controller-->
    <br />
    <el-tabs type="border-card">
      <el-tab-pane label="附件上传">
        <el-row>
          <el-col :span="8">
            <el-upload
              drag
              class="upload-demo"
              ref="BOMUpload"
              :action="uploadUrl"
              :file-list="PURFileList"
              :limit="1"
              :on-exceed="handleExceed"
              :on-change="PURFileChange"
              :before-remove="PURFileRemove"
              :on-preview="downloadProccessFile"
              :auto-upload="false"
              :disabled="title == '查看'"
            >
              <!--  -->
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">采购报价文件 <em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">
                1: 上传文件大小不得超过200M
              </div>
            </el-upload>
          </el-col>
        </el-row>
        <!--BOM、PCB、工艺文件下载-->
        <hr />
        <!--BOM文件-->
        <el-col :span="8">
          <el-upload
            drag
            class="upload-demo"
            ref="BOMUpload"
            :action="uploadUrl"
            :file-list="BOMFileList"
            :on-preview="downloadProccessFile"
            :limit="1"
            :auto-upload="false"
            :disabled="true"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">BOM文件</div>
          </el-upload>
        </el-col>
        <!--PCB文件-->
        <el-col :span="8">
          <el-upload
            drag
            class="upload-demo"
            ref="BOMUpload"
            :action="uploadUrl"
            :file-list="PCBFileList"
            :on-preview="downloadProccessFile"
            :limit="1"
            :auto-upload="false"
            :disabled="true"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">PCB文件</div>
          </el-upload>
        </el-col>
        <!--工艺文件-->
        <el-col :span="8">
          <el-upload
            drag
            class="upload-demo"
            ref="BOMUpload"
            :action="uploadUrl"
            :file-list="GONGYIFileList"
            :on-preview="downloadProccessFile"
            :limit="1"
            :auto-upload="false"
            :disabled="true"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">工艺文件</div>
          </el-upload>
        </el-col>
      </el-tab-pane>
    </el-tabs>

    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="sureDialog" :disabled="title == '查看'"
        >保 存</el-button
      >
      <!--  -->
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
  parseRefKeyInt,
} from "@/utils/viewCompUtil";
import { savePurchaseFile } from "@/api/purchase/quote";
import { listBdPsndocAsRef } from "@/api/orgs/bdpsndoc";
import { downloadProductFile } from "@/api/pub/pub";

export default {
  name: "Purchasequotecontent",
  props: ["replace", "title", "visiable", "action", "updateRow"],
  computed: {
    ...mapGetters(["listData", "columns"]),
  },
  data() {
    // 整数类型校验
    let checkNumberAsInt = (rule, value, callback) => {
      if (value || isNaN(value)) {
        let numVal = Number.parseInt(value);
        if (value && Number.isFinite(numVal)) {
          callback();
        } else {
          return callback(new Error("订单数量必须为数字类型"));
        }
      } else {
        callback();
      }
    };
    return {
      contentVisiable: false, // dialog 显示框
      uploadUrl: process.env.BASE_API + "/", // 上传地址
      showMaterielData: false, // 是否显示物料信息
      // BOM文件
      BOMFileList: [],
      a1: false,
      // PCB文件
      PCBFileList: [],
      // 工艺文件
      GONGYIFileList: [],
      // 采购报价文件
      PURFileList: [],
      PURFile: null,
      temp: {
        pkPurchaseQuote: undefined,
        contractno: "",
        pkCustomer: null,
        customerCode: "",
        materialSwitch: "否",
        productType: 0,
        encapsulation: "",
        brand: "",
        explain: "",
        pkPsndoc: null,
        pkProduct: null,
        productCode: "",
        productName: "",
        productModel: "",
        productNum: null,
        productMaterialSource: "",
        productSteelMeshSource: "",
        ispcb: "否",
        pcbSource: "",
        pcbLong: null,
        pcbWide: null,
        pcbThick: null,
        pcbResistColor: "",
        pcbCharColor: "",
        pcbResistCover: "",
        pcbPadSpary: "",
        pcbCopperThick: "",
        pcbFloors: null, // 板子层数-add
        pcbFrTg: "", // FR-4 TG值-add
        pcbBoardBrand: "", // 板材品牌-add
        pcbMinHole: "", // 最小孔径-add
        pcbImpedance: "", // 阻抗-add
        pcbResinPlugHole: "0", // 树脂塞孔0不需要1需要-add
        pcbHypotenuse: "0", // 金（锡）手指倒斜边0不需要1需要-add
        quoteEndDate: "",
        purchasePrice: null,
        purchaseTotal: null,
        materielPoList: [],
        fileName: "",
        fileFullname: "",
        billState: 0,
        approver: "",
        approverShow: "",
        approvetime: parseTime(new Date()),
        dr: 0,
        ts: parseTime(new Date()),
      },
      // 页面填写数据规则校验
      rules: {
        // 采购单价
        purchasePrice: [
          { required: true, message: "采购单价不能为空", trigger: "blur" },
          { validator: checkNumberAsInt, trigger: "blur" },
        ],
        // 采购总价
        purchaseTotal: [
          { required: true, message: "采购总价不能为空", trigger: "blur" },
          { validator: checkNumberAsInt, trigger: "blur" },
        ],
      },
      materialSourceOption: [
        // 物料来源
        { value: "1", label: "甲方提供" },
        { value: "2", label: "乙方提供" },
        { value: "3", label: "部分甲方提供" },
      ],
      //物料下单类别
      technicsStateOprion1: [
        { value: 0, label: "自由态" },
        { value: 1, label: "加工" },
        { value: 2, label: "OEM" },
        { value: 3, label: "ODM" },
        { value: 4, label: "物料" },
      ],
      billStateOprion: [
        { value: 0, label: "自由态" },
        { value: 1, label: "报价流程进行中" },
        { value: 2, label: "已认领" },
        { value: 3, label: "采购报价完成" },
        { value: 4, label: "工艺审核完成" },
        { value: 5, label: "生产报价完成" },
        { value: 6, label: "销售报价完成" },
      ],
      steelMeshSourceOption: [
        // 钢网来源
        { value: "0", label: "无" },
        { value: "1", label: "甲方提供" },
        { value: "2", label: "乙方提供" },
      ],
      pcbThickOption: [
        // 板子厚度
        { value: 0.4, label: "0.4mm" },
        { value: 0.6, label: "0.6mm" },
        { value: 0.8, label: "0.8mm" },
        { value: 1.0, label: "1.0mm" },
        { value: 1.2, label: "1.2mm" },
        { value: 1.6, label: "1.6mm" },
        { value: 2.0, label: "2.0mm" },
      ],
      pcbResistColorOption: [
        // 阻焊颜色
        { value: "绿色", label: "绿色" },
        { value: "红色", label: "红色" },
        { value: "黄色", label: "黄色" },
        { value: "蓝色", label: "蓝色" },
        { value: "白色", label: "白色" },
        { value: "黑色", label: "黑色" },
      ],
      pcbCharColorOption: [
        // 字符颜色
        { value: "白色", label: "白色" },
      ],
      pcbResistCoverOption: [
        // 阻焊覆盖
        { value: "0", label: "过孔盖油" },
        { value: "1", label: "过孔开窗" },
      ],
      pcbPadSparyOption: [
        // 焊盘喷镀
        { value: "0", label: "有铅喷锡" },
        { value: "1", label: "无铅喷锡" },
        { value: "2", label: "沉金" },
      ],
      pcbCopperThick: [
        // 铜厚
        { value: "0", label: "0.5盎司" },
        { value: "1", label: "1盎司" },
        { value: "2", label: "2盎司" },
      ],
      needOrNotNeed: [
        // 需要 不需要 Option
        { value: "0", label: "不需要" },
        { value: "1", label: "需要" },
      ],
      pcbBoardBrandOption: [
        // 板材品牌optoin
        { value: "1", label: "FR-4生益" },
        { value: "2", label: "FR-4建滔" },
        { value: "3", label: "FR-4国纪" },
      ],
      pcbFrTgOption: [
        // FRT4G option
        { value: "1", label: "TG140" },
        { value: "2", label: "TG150" },
        { value: "3", label: "TG170" },
      ],
      pcbMinHoleOption: [
        // 最小孔径 optoin
        { value: "1", label: "0.25mm" },
        { value: "2", label: "0.3mm" },
        { value: "3", label: "0.35mm" },
        { value: "4", label: "0.4mm" },
      ],
      pcbImpedanceOption: [
        // 阻抗 optoin
        { value: "1", label: " 无" },
        { value: "2", label: "50Ω" },
        { value: "3", label: "90Ω" },
        { value: "4", label: "100Ω" },
      ],
      // 人员档案
      psndocOption: [],
    };
  },
  watch: {
    visiable() {
      this.contentVisiable = this.visiable;
      if (this.updateRow) {
        this.restTemp();
        this.temp = this.updateRow;
        // console.log(this.temp);
        // 采购文件信息
        if (this.updateRow.fileName) {
          let purfile = {
            name: this.updateRow.fileName,
            fullName: this.updateRow.fileFullname,
          };
          this.PURFileList = [purfile];
          this.PURFile = purfile;
        }

        // BOM文件信息
        if (this.updateRow.bomFilename) {
          this.BOMFileList = [
            {
              name: this.updateRow.bomFilename,
              fullName: this.updateRow.bomFilefullname,
            },
          ];
        }
        // PCB文件信息
        if (this.updateRow.pcbFilename) {
          this.PCBFileList = [
            {
              name: this.updateRow.pcbFilename,
              fullName: this.updateRow.pcbFilefullname,
            },
          ];
        }
        // 工艺文件信息
        if (this.updateRow.craftFilename) {
          this.GONGYIFileList = [
            {
              name: this.updateRow.craftFilename,
              fullName: this.updateRow.craftFilefullname,
            },
          ];
        }

        // 预制物料信息的图片URL信息
        let tempThis = this.temp;
        if (tempThis && tempThis.materielPoList) {
          let materielPoList = tempThis.materielPoList;
          for (let index in materielPoList) {
            let dataOne = materielPoList[index];
            if (dataOne && dataOne.previewUrl) {
              dataOne.previewUrlShow = this.uploadUrl + dataOne.previewUrl;
              let previewUrlListShow = [dataOne.previewUrlShow];
              dataOne.previewUrlListShow = previewUrlListShow;
            }
          }
        }
      }
    },
  },
  created() {
    // 初始人员信息参照
    listBdPsndocAsRef().then((response) => {
      this.psndocOption = response.object;
      parseRefKeyInt(this.psndocOption);
    });
  },
  methods: {
    //下拉
    //下拉
    productSelct(val) {
      if (val == 4) {
        this.temp.materialSwitch = "是";
        this.a1 = true;
      } else {
        this.temp.materialSwitch = "否";
        this.a1 = false;
      }
    },
    // 解析日期
    dateFormat() {
      if (this.temp.quoteEndDate) {
        this.temp.quoteEndDate = parseTime(
          this.temp.quoteEndDate,
          "{y}-{m}-{d}"
        );
      }
    },
    priceCount(flag) {
      if (flag === "single") {
        // 采购总价 = 采购单价 * 数量
        this.temp.purchasePrice = Number.parseFloat(this.temp.purchasePrice)
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+\.)/g, "$1");
        let countPurchaseTotal = (
          this.temp.purchasePrice * this.temp.productNum
        )
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+\.)/g, "$1");
        this.temp.purchaseTotal = countPurchaseTotal;
      }
      if (flag === "sum") {
        // 采购单价 = 采购总价 / 数量
        this.temp.purchaseTotal = Number.parseFloat(this.temp.purchaseTotal)
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+\.)/g, "$1");
        let countPurchasePrice = (
          this.temp.purchaseTotal / this.temp.productNum
        )
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+\.)/g, "$1");
        this.temp.purchasePrice = countPurchasePrice;
        if (this.temp.purchasePrice === "Infinity") {
          this.temp.purchasePrice = 0.0;
        }
      }
    },
    pcbPriceCount(flag) {
      if (flag === "single") {
        // PCB成本总价 = PCB成本单价 * 数量
        this.temp.productPcbPrice = Number.parseFloat(this.temp.productPcbPrice)
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+\.)/g, "$1");
        let countProductPcbTotal = (
          this.temp.productPcbPrice * this.temp.productNum
        )
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+\.)/g, "$1");
        this.temp.productPcbTotal = countProductPcbTotal;
      }
      if (flag === "sum") {
        // PCB成本单价 = PCB成本总价 / 数量
        this.temp.productPcbTotal = Number.parseFloat(this.temp.productPcbTotal)
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+\.)/g, "$1");
        let countProductPcbPrice = (
          this.temp.productPcbTotal / this.temp.productNum
        )
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+\.)/g, "$1");
        this.temp.productPcbPrice = countProductPcbPrice;
        if (this.temp.productPcbPrice === "Infinity") {
          this.temp.productPcbPrice = 0.0;
        }
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    PURFileChange(file, fileList) {
      // 记录文件变化
      this.PURFile = file;
    },
    PURFileRemove(file, fileList) {
      // 采购报价文件删除
      this.PURFile = null;
    },
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
    closeDialog() {
      // 回调关闭Dialog
      this.$emit("close", null);
    },
    sureDialog() {
      // 确定保存回调Dialog

      let formData = new FormData();
      if (this.title === "采购报价" && this.PURFile == null) {
        this.$message.warning("上传文件不完整!请选择需要上传的文件。");
        return;
      }
      formData.append(`purfile`, this.PURFile.raw);
      formData.append(`productCode`, this.temp.productCode);

      // 表单校验
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          savePurchaseFile(formData).then((response) => {
            if (response.object) {
              this.temp.fileName = response.object.PURCHASE_FILE_NAME;
              this.temp.fileFullname = response.object.PURCHASE_FILE_FULL_NAME;
            }

            const actTemp = this.temp;
            if (this.action) {
              this.$confirm("是否确定该项表单校验?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              })
                .then(() => {
                  this.$message({
                    type: "success",
                    message: "操作成功!",
                  });
                  initReplaceUpdateData(actTemp, this.replace);
                  this.action(actTemp).then((response) => {
                    if (response.primary) {
                      actTemp.pkProvince = response.primary;
                    }
                    if (response.success) {
                      initReplaceAddData(actTemp, this.replace);
                      this.$store.commit("HANDLE_LISTVIEW_DATA", actTemp);
                      this.$emit("close", actTemp);
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
                    message: "已取消操作",
                  });
                });
              // this.$message({ message: '操作成功', type: 'success' })
              // this.$emit('close', actTemp)
            }
          });
        } else {
          this.$message.warning("表单验证未通过!");
          return false;
        }
      });
    },
    restTemp() {
      // 刷新本界面的数据
      this.temp = {
        pkPurchaseQuote: undefined,
        contractno: "",
        pkCustomer: null,
        customerCode: "",
        pkPsndoc: null,
        pkProduct: null,
        materialSwitch: "否",
        productType: 0,
        encapsulation: "",
        brand: "",
        explain: "",
        productCode: "",
        productName: "",
        productModel: "",
        productNum: null,
        productMaterialSource: "",
        productSteelMeshSource: "",
        ispcb: "否",
        pcbSource: "",
        pcbLong: null,
        pcbWide: null,
        pcbThick: null,
        pcbResistColor: "",
        pcbCharColor: "",
        pcbResistCover: "",
        pcbPadSpary: "",
        pcbCopperThick: "",
        pcbFloors: null, // 板子层数-add
        pcbFrTg: "", // FR-4 TG值-add
        pcbBoardBrand: "", // 板材品牌-add
        pcbMinHole: "", // 最小孔径-add
        pcbImpedance: "", // 阻抗-add
        pcbResinPlugHole: "0", // 树脂塞孔0不需要1需要-add
        pcbHypotenuse: "0", // 金（锡）手指倒斜边0不需要1需要-add
        quoteEndDate: "",
        purchasePrice: null,
        purchaseTotal: null,
        materielPoList: [],
        fileName: "",
        fileFullname: "",
        billState: 0,
        approver: "",
        approverShow: "",
        approvetime: parseTime(new Date()),
        dr: 0,
        ts: parseTime(new Date()),
      };
      this.PURFileList = [];
      this.PURFile = null;
      this.showMaterielData = false;
    },
  },
};
</script>

<style  lang="scss" type="text/scss" scoped>
.el-select /deep/ .el-input__inner {
  width: 208px;
}
</style>
