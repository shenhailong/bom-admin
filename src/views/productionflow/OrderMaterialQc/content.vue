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
      <el-form-item label="关联订单产品" prop="pkProductOrderB">
        <el-select v-model="temp.pkProductOrderB" placeholder="请选择">
          <el-option
            v-for="item in orderBProductSelOptions"
            :key="item.pkProductOrderB"
            :label="`${item.pkProductOrderB}-${item.name}-${item.code}`"
            :value="item.pkProductOrderB"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="质检数量" prop="qualityNum">
        <el-input v-model="temp.qualityNum"></el-input>
      </el-form-item>
      <el-form-item label="质检说明" prop="memo">
        <el-input v-model="temp.memo"></el-input>
      </el-form-item>
      <el-form-item label="经办人" prop="chargePsn">
        <el-input v-model="temp.chargePsn" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="经办时间" prop="chargeTime">
        <el-input v-model="temp.chargeTime" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="单据状态" prop="billState">
        <el-input v-model="temp.billState" :disabled="true"></el-input>
      </el-form-item>
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
          :on-preview="downloadProccessFile"
          :auto-upload="false"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            <span>质检合格验收报告</span><em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">
            1: 上传文件大小不得超过200M
          </div>
        </el-upload>
      </el-col>
      <el-col :span="8">
        <el-upload
          drag
          class="upload-demo"
          ref="FileUpLoad2"
          :action="uploadUrl"
          :limit="1"
          :file-list="upFailFileList"
          :on-exceed="handleExceed"
          :on-change="upFailFileChange"
          :on-preview="downloadProccessFile"
          :auto-upload="false"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            <span>质检不合格验收报告</span><em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">
            1: 上传文件大小不得超过200M
          </div>
        </el-upload>
      </el-col>
    </el-row>

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
import { updateOmgMaterielQuality } from "@/api/orderCompMage/OrderMaterialQc";
import { saveOrderCompFile } from "@/api/orderCompMage/AproductionPub";
import { downloadProductFile } from "@/api/pub/pub";

export default {
  name: "ProductionFlowOrderMaterialQcContent",
  props: [
    "replace",
    "title",
    "visiable",
    "action",
    "updateRow",
    "pkProductOrder",
  ],
  computed: {
    ...mapGetters(["listData", "columns", "name"]),
  },
  data() {
    return {
      contentVisiable: false, // dialog 显示框
      orderBProductSelOptions: [
        // 选择关联订单字表数据
      ],
      temp: {
        pkOmgMaterielQuality: undefined, // 来料质检主键
        pkProductOrderB: null, // 合同子表主键
        qualityNum: null, // 质检数量
        billState: "", // 单据状态
        memo: "", // 备注
        fileName: "", // 文件名称
        fileFullname: "", // 文件全路径名称
        failName: "", // 不合格文件名称
        failFullname: "", // 不合格文件全路径名称
        chargePsn: "", // 经办人
        chargeTime: "", // 经办时间
        creator: "", // 创建人
        creationtime: parseTime(new Date()), // 创建时间
        dr: 0, // 删除标志
        ts: parseTime(new Date()), // 时间戳
      },

      upFileTemp: null, // 记录临时文件
      upFileFileList: [], // 文件存储List集合

      upFailFileTemp: null, // 记录不合格临时文件
      upFailFileList: [], // 不合格文件存储List集合

      uploadUrl: process.env.BASE_API + "/", // 上传地址
    };
  },
  watch: {
    visiable() {
      this.contentVisiable = this.visiable;
      if (this.title === "录入") {
        this.restTemp();
      }
      if (this.title === "修改" && this.updateRow) {
        // console.log(this.updateRow)
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

      if (this.visiable == true) {
        // 每次打开重新加载当前选择订单的字表数据信息
        this.initOrderBProductListInfo();
      }
      this.upFileTemp = null;
      this.upFailFileTemp = null;
    },
  },
  methods: {
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
    upFailFileChange(file, fileList) {
      // 记录不合格文件
      this.upFailFileTemp = file;
    },
    closeDialog() {
      // 回调关闭Dialog
      this.$emit("close", null);
    },
    // 加载当前选择订单的字表数据信息
    initOrderBProductListInfo() {
      // if (this.pkProductOrder) {
      //   let initQueryParam = {
      //     pkProductOrder: this.pkProductOrder
      //   }
      //   selectOrderInfoAsRef(initQueryParam).then((response) => {
      //     debugger
      //     if (response && response.success && response.object) {
      //       this.orderBProductSelOptions = response.object[0].orderCompMageProductPoList
      //     } else {
      //       this.orderBProductSelOptions = []
      //     }
      //   })
      // }
      this.orderBProductSelOptions = [];
      if (this.updateRow) {
        this.orderBProductSelOptions = [
          {
            pkProductOrderB: this.updateRow.pkProductOrderB,
            name: this.updateRow.productName,
            code: this.updateRow.productCode,
          },
        ];
      }
    },
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
            pkOmgMaterielQuality: this.temp.pkOmgMaterielQuality,
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
            qualityNum: this.temp.qualityNum,
            memo: this.temp.memo,
          };

          this.$confirm("是否确认保存回调Dialog?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.$message({
                type: "success",
                message: "操作成功!",
              });
              updateOmgMaterielQuality(saveParam).then((response) => {
                if (response.success) {
                  this.$emit("close", null);
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
                message: "已取消",
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
    restTemp() {
      // 刷新本界面的数据
      this.temp = {
        pkOmgMaterielQuality: undefined, // 来料质检主键
        pkProductOrderB: null, // 合同子表主键
        qualityNum: null, // 质检数量
        billState: "", // 单据状态
        memo: "", // 备注
        fileName: "", // 文件名称
        fileFullname: "", // 文件全路径名称
        failName: "", // 不合格文件名称
        failFullname: "", // 不合格文件全路径名称
        chargePsn: "", // 经办人
        chargeTime: "", // 经办时间
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
  width: 195px;
}
/deep/ .el-upload-dragger {
  width: 180px;
  height: 30px;
  background: #409eff;
  border: solid 1px #409eff;
}

/deep/ .el-upload-dragger .el-icon-upload {
  font-size: 30px;
  // color: #C0C4CC;
  color: #fffeff;
  float: left;
  margin: -10px 1px 16px;
  line-height: 50px;
}

/deep/ .el-upload__text span {
  color: white;
  margin-top: 10px;
  display: inline-block;
}
</style>
