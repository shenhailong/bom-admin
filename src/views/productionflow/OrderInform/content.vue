<template>
  <el-dialog
    :title="title"
    :visible.sync="contentVisiable"
    @close="closeDialog"
    width="75%"
  >
    <el-button style="margin: 5px" type="primary" size="small" @click="enter"
      >添加</el-button
    >
    <el-table
      :data="subTableDataList"
      border
      style="width: 100%"
      :row-style="{ height: '2px' }"
      :cell-style="{ padding: '3px 0' }"
    >
      <el-table-column prop="sort" label="排序" width="80"> </el-table-column>
      <el-table-column
        prop="lnvoiceType"
        label="税票"
        width="120"
        :formatter="
          (row, column) => {
            if (row.lnvoiceType == '0') {
              return '税票';
            }
            if (row.lnvoiceType == '1') {
              return '回款';
            }
          }
        "
      >
      </el-table-column>
      <el-table-column prop="pkProductOrderBShow" label="产品名称" width="120">
      </el-table-column>
      <el-table-column prop="lnvoiceNo" label="发票号码" width="120">
      </el-table-column>
      <el-table-column prop="lnvoiceNum" label="发票代码" width="120">
      </el-table-column>
      <el-table-column prop="billAmount" label="金额" width="120">
      </el-table-column>
      <el-table-column prop="taxinclud" label="税率" width="120">
      </el-table-column>
      <el-table-column prop="lnvoiceTime" label="开票时间" width="120">
      </el-table-column>
      <el-table-column prop="paymentTime" label="回款日期" width="120">
      </el-table-column>
      <el-table-column prop="paymentAmount" label="回款金额" width="120">
      </el-table-column>
      <el-table-column
        prop="paymentAccount"
        label="回款账户"
        width="120"
        :formatter="
          (row, column) => {
            if (row.paymentAccount == '0') {
              return '银座银行';
            }
            if (row.paymentAccount == '1') {
              return '工商银行';
            }
            if (row.paymentAccount == '2') {
              return '建设银行';
            }
            if (row.paymentAccount == '3') {
              return '农业银行';
            }
            if (row.paymentAccount == '4') {
              return '现金';
            }
          }
        "
      >
      </el-table-column>
      <el-table-column
        prop="paymentType"
        label="回款方式"
        width="120"
        :formatter="
          (row, column) => {
            if (row.paymentType == '0') {
              return '现金';
            }
            if (row.paymentType == '1') {
              return '汇票';
            }
          }
        "
      >
      </el-table-column>
      <!-- <el-table-column prop="billState" label="单据状态" width="120"
        :formatter="(row, column) => {
          if (row.billState == '0') { return '自由态' }
          if (row.billState == '1') { return '进行中' }
          if (row.billState == '2') { return '已完成' }
         }">
      </el-table-column> -->
      <el-table-column fixed="right" label="操作" width="150px">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="onButtonClick('updatePlan', scope.row)"
            >修改</el-button
          >
          <el-button
            v-if="scope.row.billState == 0"
            @click="onButtonClick('DELETESUBDATA', scope.row)"
            type="text"
            size="small"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      width="900px"
      title="录入"
      :visible.sync="subInfoContentVisiable"
      append-to-body
    >
      <el-form
        :inline="true"
        ref="dataForm"
        :model="temp"
        label-position="left"
        label-width="130px"
      >
        <el-form-item label="税票">
          <el-select v-model="temp.lnvoiceType" clearable placeholder="请选择">
            <el-option
              v-for="item in receiptOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <span v-if="temp.lnvoiceType == 0">
          <el-form-item label="产品信息" prop="pkProductOrderB">
            <el-select
              v-model="temp.pkProductOrderB"
              multiple
              placeholder="请选择"
            >
              <el-option
                v-for="item in productInfoOrderList"
                :key="item.pkProductOrderB"
                :label="`${item.productName}_${item.productCode}`"
                :value="item.pkProductOrderB"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发票号" prop="lnvoiceNo">
            <el-input v-model="temp.lnvoiceNo"></el-input>
          </el-form-item>
          <el-form-item label="发票代码" prop="lnvoiceNum">
            <el-input v-model="temp.lnvoiceNum"></el-input>
          </el-form-item>
          <el-form-item label="金额" prop="billAmount">
            <el-input v-model="temp.billAmount"></el-input>
          </el-form-item>
          <el-form-item label="开票时间:">
            <el-date-picker
              v-model="temp.lnvoiceTime"
              type="datetime"
              value-format="yyyy-MM-dd hh:mm"
              placeholder="开票时间"
            >
            </el-date-picker>
          </el-form-item>
        </span>
        <span v-if="temp.lnvoiceType == 1">
          <el-form-item label="回款日期">
            <el-date-picker
              v-model="temp.paymentTime"
              type="datetime"
              value-format="yyyy-MM-dd hh:mm"
              placeholder="回款日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="回款账户">
            <el-select
              v-model="temp.paymentAccount"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in accountOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="回款方式">
            <el-select
              v-model="temp.paymentType"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in wayOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="回款金额" prop="paymentAmount">
            <el-input v-model="temp.paymentAmount"></el-input>
          </el-form-item>
        </span>
        <!-- <el-form-item label="文件名称" prop="fileName">
	    <el-input v-model="temp.fileName"></el-input>
	  </el-form-item>
	  <el-form-item label="文件全路径名称" prop="fileFullname">
	    <el-input v-model="temp.fileFullname"></el-input>
	  </el-form-item> -->
      </el-form>

      <el-row>
        <el-col :span="8">
          <el-upload
            drag
            class="upload-demo"
            ref="FileUpLoad"
            :action="uploadUrl"
            :limit="1"
            :file-list="upFileFileList"
            :on-exceed="handleExceed"
            :on-change="upFileChange"
            :auto-upload="false"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">文件 <em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">
              1: 上传文件大小不得超过200M
            </div>
          </el-upload>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="subInfoContentVisiable = false">取 消</el-button>
        <el-button type="primary" @click="sureDialog">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      width="900px"
      title="修改"
      :visible.sync="subInfoContentVisiable1"
      append-to-body
    >
      <el-form
        :inline="true"
        ref="dataForm"
        :model="temp"
        label-position="left"
        label-width="130px"
      >
        <el-form-item label="税票">
          <el-select v-model="temp.lnvoiceType" clearable placeholder="请选择">
            <el-option
              v-for="item in receiptOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <span v-if="temp.lnvoiceType == 0">
          <el-form-item label="产品信息" prop="pkProductOrderB">
            <el-select
              v-model="temp.pkProductOrderB"
              multiple
              placeholder="请选择"
            >
              <el-option
                v-for="item in productInfoOrderList"
                :key="item.pkProductOrderB"
                :label="`${item.productName}_${item.productCode}`"
                :value="item.pkProductOrderB"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发票号" prop="lnvoiceNo">
            <el-input v-model="temp.lnvoiceNo"></el-input>
          </el-form-item>
          <el-form-item label="发票代码" prop="lnvoiceNum">
            <el-input v-model="temp.lnvoiceNum"></el-input>
          </el-form-item>
          <el-form-item label="金额" prop="billAmount">
            <el-input v-model="temp.billAmount"></el-input>
          </el-form-item>
          <el-form-item label="开票时间:">
            <el-date-picker
              v-model="temp.lnvoiceTime"
              type="datetime"
              value-format="yyyy-MM-dd hh:mm"
              placeholder="开票时间"
            >
            </el-date-picker>
          </el-form-item>
        </span>
        <span v-if="temp.lnvoiceType == 1">
          <el-form-item label="回款日期">
            <el-date-picker
              v-model="temp.paymentTime"
              type="datetime"
              value-format="yyyy-MM-dd hh:mm"
              placeholder="回款日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="回款账户">
            <el-select
              v-model="temp.paymentAccount"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in accountOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="回款方式">
            <el-select
              v-model="temp.paymentType"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in wayOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="回款金额" prop="paymentAmount">
            <el-input v-model="temp.paymentAmount"></el-input>
          </el-form-item>
        </span>
        <!-- <el-form-item label="文件名称" prop="fileName">
	    <el-input v-model="temp.fileName"></el-input>
	  </el-form-item>
	  <el-form-item label="文件全路径名称" prop="fileFullname">
	    <el-input v-model="temp.fileFullname"></el-input>
	  </el-form-item> -->
      </el-form>

      <el-row>
        <el-col :span="8">
          <el-upload
            drag
            class="upload-demo"
            ref="FileUpLoad"
            :action="uploadUrl"
            :limit="1"
            :file-list="upFileFileList"
            :on-exceed="handleExceed"
            :on-change="upFileChange"
            :auto-upload="false"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">文件 <em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">
              1: 上传文件大小不得超过200M
            </div>
          </el-upload>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button @click="subInfoContentVisiable1 = false">取 消</el-button>
        <el-button type="primary" @click="sureDialog1">确 定</el-button>
      </span>
    </el-dialog>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { saveOrderCompFile } from "@/api/orderCompMage/AproductionPub";
import {
  initReplaceUpdateData,
  initReplaceAddData,
  parseTime,
  randomNum,
} from "@/utils/viewCompUtil";
import {
  selectAllProductOrderInfoAs,
  insertOmgNoticeInvoiceB,
  selectAllOmgNoticeInvoiceBAsPage,
  deleteOmgNoticeInvoiceBByPks,
  updateOmgNoticeInvoiceB,
} from "@/api/orderCompMage/OrderInform";
export default {
  name: "OrderInformEditContent",
  props: [
    "replace",
    "title",
    "visiable",
    "action",
    "updateRow",
    "contractNo",
    "pkProductOrder",
    "pkOmgNoticeInvoice",
  ],
  computed: {
    ...mapGetters(["listData", "columns", "name"]),
  },
  data() {
    return {
      contentVisiable: false, // dialog 显示框
      subTableDataList: [],
      //税票集合
      receiptOptions: [
        { value: "0", label: "税票" },
        { value: "1", label: "回款" },
      ],
      //收款账户
      accountOptions: [
        { value: "0", label: "银座银行" },
        { value: "1", label: "工商银行" },
        { value: "2", label: "建设银行" },
        { value: "3", label: "农业银行" },
        { value: "4", label: "现金" },
      ],
      //收款方式
      wayOptions: [
        { value: "0", label: "现金" },
        { value: "1", label: "汇票" },
      ],

      temp: {
        pkOmgNoticeInvoice: null,
        pkProductOrder: null,
        pkProductOrderB: "",
        billState: "",
        lnvoiceNo: "",
        billNumber: null,
        billAmount: null,
        fileName: "",
        fileFullname: "",
        chargePsn: null,
        chargeTime: "",
        creator: null,
        creatorShow: "",
        creationtime: parseTime(new Date()),
        //////
        lnvoiceType: null,
        lnvoiceTime: null,
        taxinclud: null,
        paymentTime: null,
        paymentAmount: null,
        paymentAccount: null,
        paymentType: null,
        //////
        dr: null,
        ts: parseTime(new Date()),
      },

      upFileTemp: null, // 记录临时文件
      upFileFileList: [], // 文件存储List集合
      uploadUrl: process.env.BASE_API + "/", // 上传地址
      subInfoContentVisiable: false,
      subInfoContentVisiable1: false,
      productInfoOrderList: [],
    };
  },
  watch: {
    visiable() {
      this.contentVisiable = this.visiable;
      if (this.visiable == true) {
        console.log(this.updateRow.pkOmgNoticeInvoice);
        this.initOrderDetails();
        this.initProductInfoByPkProductOrder();
      }
      if (this.title === "录入") {
        this.restTemp();
      }
      if (this.title === "修改" && this.updateRow) {
        this.temp = this.updateRow;
        // 解析合同字表数据为数组 供多选组件使用
        let pkProductOrderB = this.updateRow.pkProductOrderB;
        if (pkProductOrderB) {
          this.temp.pkProductOrderB = pkProductOrderB.split(",");
        }
      }

      this.upFileTemp = null;
      this.upFileFileList = [];
    },
  },
  methods: {
    // 初始化订单子表数据
    initOrderDetails() {
      let param = {
        page: 1,
        limit: 10,
        pkOmgNoticeInvoice: this.updateRow.pkOmgNoticeInvoice,
      };
      selectAllOmgNoticeInvoiceBAsPage(param).then((response) => {
        if (response && response.success && response.object) {
          this.subTableDataList = response.object;
        } else {
          this.subTableDataList = [];
        }
      });
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    upFileChange(file, fileList) {
      // 记录工艺文件
      this.upFileTemp = file;
    },
    closeDialog() {
      // 回调关闭Dialog
      this.$emit("close", null);
    },
    // 根据合同主键查询该合同下的所有产品信息
    initProductInfoByPkProductOrder() {
      this.productInfoOrderList = [];
      if (this.pkProductOrder) {
        let initQueryParam = {
          pkProductOrder: this.pkProductOrder,
        };
        selectAllProductOrderInfoAs(initQueryParam).then((response) => {
          if (response && response.success && response.object) {
            this.productInfoOrderList = response.object;
          }
        });
      }
    },

    //监听按钮
    onButtonClick(btnCode, rowData) {
      if (btnCode === "DELETESUBDATA") {
        // 删除生产计划子表数据
        console.log(rowData);
        if (rowData.pkOmgNoticeInvoiceB) {
          let deleteParam = {
            pkArr: rowData.pkOmgNoticeInvoiceB,
          };

          this.$confirm("是否确认?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              deleteOmgNoticeInvoiceBByPks(deleteParam).then((response) => {
                if (response && response.success) {
                   this.initOrderDetails();
              // location.reload();
                } else {
                  this.$message({
                    message: `删除失败:${response.message}`,
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
          // this.$message({ message: '删除成功', type: 'success' })
        }
      }
      if (btnCode === "updatePlan") {
        this.subInfoContentVisiable1 = true;
        this.temp = rowData;
      }
    },
    //录入
    enter() {
      this.subInfoContentVisiable = true;
    },
    sureDialog() {
      // 确定保存回调Dialog
      let param = {
        pkOmgNoticeInvoice: this.temp.pkOmgNoticeInvoice,
        pkProductOrder: this.pkProductOrder,
        pkProductOrderB: this.temp.pkProductOrderB,
        lnvoiceNo: this.temp.lnvoiceNo,
        billNumber: this.temp.billNumber,
        billAmount: this.temp.billAmount,
        fileName: this.temp.fileName,
        fileFullname: this.temp.fileFullname,
        creator: this.temp.creator,
        creationtime: parseTime(new Date()),
        //////
        lnvoiceType: this.temp.lnvoiceType,
        lnvoiceTime: this.temp.lnvoiceTime,
        paymentTime: this.temp.paymentTime,
        paymentAmount: this.temp.paymentAmount,
        paymentAccount: this.temp.paymentAccount,
        paymentType: this.temp.paymentType,
        //////
        dr: null,
        ts: parseTime(new Date()),
      };
      if (this.upFileTemp != null) {
        let formData = new FormData();
        formData.append(`file`, this.upFileTemp.raw);
        formData.append(`constractNo`, this.contractNo);
        saveOrderCompFile(formData).then((response) => {
          if (response && response.success && response.object) {
            param.fileName = response.object.SALE_PROCPRODUCTION_NAME;
            param.fileFullname = response.object.SALE_PROCPRODUCTION_FULL_NAME;

            // 转义pkProductOrderB
            if (param.pkProductOrderB && param.pkProductOrderB.length > 0) {
              let pkProductOrderBStr = "";
              param.pkProductOrderB.forEach((element) => {
                if (element) {
                  pkProductOrderBStr = pkProductOrderBStr + element + ",";
                }
              });
              if (pkProductOrderBStr && pkProductOrderBStr.endsWith(",")) {
                pkProductOrderBStr = pkProductOrderBStr.substring(
                  0,
                  pkProductOrderBStr.length - 1
                );
              }
              param.pkProductOrderB = pkProductOrderBStr;
            }
            insertOmgNoticeInvoiceB(param).then((response) => {
              console.log(response);
              if (response.message == "操作成功") {
                this.initOrderDetails();
                this.subInfoContentVisiable = false;
              }
            });
          }
        });
      }
    },

    //修改
    sureDialog1() {
      console.log(this.temp);
      let param = {
        pkOmgNoticeInvoice: this.temp.pkOmgNoticeInvoice,
        pkOmgNoticeInvoiceB: this.temp.pkOmgNoticeInvoiceB,
        pkProductOrder: this.pkProductOrder,
        pkProductOrderB: this.temp.pkProductOrderB,
        lnvoiceNo: this.temp.lnvoiceNo,
        billNumber: this.temp.billNumber,
        billAmount: this.temp.billAmount,
        fileName: this.temp.fileName,
        fileFullname: this.temp.fileFullname,
        creator: this.temp.creator,
        creationtime: parseTime(new Date()),
        lnvoiceType: this.temp.lnvoiceType,
        lnvoiceTime: this.temp.lnvoiceTime,
        paymentTime: this.temp.paymentTime,
        paymentAmount: this.temp.paymentAmount,
        paymentAccount: this.temp.paymentAccount,
        paymentType: this.temp.paymentType,
        dr: null,
        ts: parseTime(new Date()),
      };
      if (this.upFileTemp != null) {
        let formData = new FormData();
        formData.append(`file`, this.upFileTemp.raw);
        formData.append(`constractNo`, this.contractNo);
        saveOrderCompFile(formData).then((response) => {
          if (response && response.success && response.object) {
            param.fileName = response.object.SALE_PROCPRODUCTION_NAME;
            param.fileFullname = response.object.SALE_PROCPRODUCTION_FULL_NAME;

            // 转义pkProductOrderB
            if (param.pkProductOrderB && param.pkProductOrderB.length > 0) {
              let pkProductOrderBStr = "";
              param.pkProductOrderB.forEach((element) => {
                if (element) {
                  pkProductOrderBStr = pkProductOrderBStr + element + ",";
                }
              });
              if (pkProductOrderBStr && pkProductOrderBStr.endsWith(",")) {
                pkProductOrderBStr = pkProductOrderBStr.substring(
                  0,
                  pkProductOrderBStr.length - 1
                );
              }
              param.pkProductOrderB = pkProductOrderBStr;
            }
            updateOmgNoticeInvoiceB(param).then((response) => {
              console.log(response);
              if (response.message == "操作成功") {
                this.initOrderDetails();
                this.subInfoContentVisiable1 = false;
              }
            });
          }
        });
      }
    },
    restTemp() {
      this.temp = {
        pkOmgNoticeInvoice: null,
        pkProductOrder: null,
        pkProductOrderB: "",
        billState: "0",
        lnvoiceNo: "",
        billNumber: null,
        billAmount: null,
        fileName: "",
        fileFullname: "",
        chargePsn: null,
        chargeTime: "",
        //////
        lnvoiceType: null,
        lnvoiceTime: null,
        taxinclud: null,
        paymentTime: null,
        paymentAmount: null,
        paymentAccount: null,
        paymentType: null,
        //////
        creator: null,
        creatorShow: this.name,
        creationtime: parseTime(new Date()),
        dr: null,
        ts: parseTime(new Date()),
      };
    },
  },
};
</script>

<style  lang="scss" type="text/scss" scoped>
.el-select /deep/.el-input__inner {
  width: 190px;
}
.el-input /deep/.el-input__inner {
  width: 190px;
}
</style>
