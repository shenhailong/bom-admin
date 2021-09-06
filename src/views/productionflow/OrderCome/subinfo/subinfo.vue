<template>
  <el-dialog
    :title="title"
    :visible.sync="contentVisiable"
    @close="closeDialog"
    width="80%"
  >
    <el-button
      size="mini"
      style="margin-bottom: 10px; margin-left: 10px"
      type="primary"
      @click="onButtonClick('ADDSUBDATA', null)"
      >录入</el-button
    >
    <el-table :data="fileDetailsList" border style="width: 100%">
      <el-table-column
        prop="pkOmgPrduFinishPutoutB"
        label="成品出库子表主键"
        v-if="false"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="pkOmgPrduFinishPutout"
        label="成品出库主表主键"
        v-if="false"
        width="180"
      >
      </el-table-column>
      <el-table-column prop="procedureName" label="工序名称" width="90">
      </el-table-column>
      <el-table-column prop="sequenceNum" label="序列号段" width="100">
      </el-table-column>
      <el-table-column prop="putoutNum" label="出库数量" width="100">
      </el-table-column>
      <el-table-column prop="fileName" label="附件名称" width="300">
      </el-table-column>
      <el-table-column prop="chargePsnShow" label="经办人" width="100">
      </el-table-column>
      <el-table-column prop="chargeTime" label="经办时间" width="180">
      </el-table-column>
      <el-table-column
        prop="billState"
        label="单据状态"
        width="100"
        :formatter="
          (row, column) => {
            if (row.billState == '0') {
              return '自由态';
            }
            if (row.billState == '1') {
              return '进行中';
            }
            if (row.billState == '2') {
              return '已完成';
            }
          }
        "
      >
      </el-table-column>
      <!-- 新增字段 -->
      <el-table-column
        prop="shippingMethod"
        label="送货方式"
        width="100"
        :formatter="
          (row, column) => {
            if (row.shippingMethod == '0') {
              return '快递';
            }
            if (row.shippingMethod == '1') {
              return '闪送';
            }
            if (row.shippingMethod == '2') {
              return '货拉拉';
            }
            if (row.shippingMethod == '3') {
              return '公司配送';
            }
            if (row.shippingMethod == '4') {
              return '自提';
            }
          }
        "
      >
      </el-table-column>
      <el-table-column prop="trackingNumber" label="快递单号" width="100">
      </el-table-column>
      <el-table-column prop="receiptName" label="出库单回执" width="300">
      </el-table-column>
      <!-- 到底 -->
      <el-table-column fixed="right" label="操作" width="150px">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            v-if="scope.row.billState == 0"
            @click="onButtonClick('CONFIRM', scope.row)"
            >确认</el-button
          >
          <el-button
            type="text"
            size="small"
            @click="onButtonClick('EDIT', scope.row)"
            >编辑</el-button
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

    <!--新增成品出库Dialog-->
    <el-dialog
      width="95%"
      title="新增成品出库"
      :visible.sync="innerDialogVisible"
      append-to-body
    >
      <el-form
        ref="form"
        :model="subInfoContent"
        label-width="110px"
        :inline="true"
      >
        <el-form-item label="工序名称">
          <el-select
            v-model="subInfoContent.procedureName"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in procedureOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="序列号段">
          <el-input v-model="subInfoContent.sequenceNum"></el-input>
        </el-form-item>

        <el-form-item label="出库数量">
          <el-input v-model="subInfoContent.putoutNum"></el-input>
        </el-form-item>

        <el-form-item label="累计出库数量">
          <el-input
            v-model="subInfoContent.finishNum"
            :disabled="true"
          ></el-input>
        </el-form-item>

        <el-form-item label="快递单号">
          <!-- <el-input v-model="subInfoContent.trackingNumber" :disabled="true"></el-input> -->
          <el-input v-model="subInfoContent.trackingNumber"></el-input>
        </el-form-item>

        <el-form-item label="送货方式">
          <el-select
            v-model="subInfoContent.shippingMethod"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in procedureOptions1"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>

        <!--   <el-form-item label="附件名称">
          <el-input v-model="subInfoContent.fileName" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="附件全名称">
          <el-input v-model="subInfoContent.fileFullname" :disabled="true"></el-input>
        </el-form-item> -->

        <el-form-item label="经办人">
          <el-input
            v-model="subInfoContent.chargePsn"
            :disabled="true"
          ></el-input>
        </el-form-item>

        <el-form-item label="经办时间">
          <el-input
            v-model="subInfoContent.chargeTime"
            :disabled="true"
          ></el-input>
        </el-form-item>

        <el-form-item label="单据状态">
          <el-select
            v-model="subInfoContent.billState"
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

        <!-- <el-form-item label="出库单回执">
		  <el-input v-model="subInfoContent.fileFullname" :disabled="true"></el-input>
		</el-form-item> -->
      </el-form>

      <el-row>
        <el-col :span="8">
          <el-upload
            drag
            style="margin-left: 50px"
            class="upload-demo"
            ref="FileUpLoad"
            :action="uploadUrl"
            :accept="'image/*'"
            :limit="1"
            :file-list="upFileFileList"
            :on-exceed="handleExceed"
            :on-change="upFileChange"
            :before-remove="upFileRemove"
            :on-preview="downloadProccessFile"
            :auto-upload="false"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              <span>文件</span><em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              1: 上传文件大小不得超过200M
            </div>
          </el-upload>
        </el-col>
        <el-col :span="8">
          <el-upload
            drag
            style="margin-left: 50px"
            class="upload-demo"
            ref="receiptUpLoad"
            :action="uploadUrl"
            :accept="'image/*'"
            :limit="1"
            :file-list="receiptFileList"
            :on-exceed="handleExceed"
            :on-change="receiptChange"
            :before-remove="receiptRemove"
            :on-preview="downloadProccessFile"
            :auto-upload="false"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              <span>出库单回执文件</span><em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              1: 上传文件大小不得超过200M
            </div>
          </el-upload>
        </el-col>
      </el-row>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onButtonClick('SAVESUBDATA', null)"
          >保存</el-button
        >
      </span>
    </el-dialog>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import {
  selectAllOmgPrduFinishPutoutSubDataAsPage,
  saveOmgPrduFinishPutoutSubData,
} from "@/api/orderCompMage/OrderCome";

import { saveOrderPutoOutImage } from "@/api/orderCompMage/AproductionPub";

import { parseTime } from "@/utils/viewCompUtil"; //时间处理
import { downloadProductFile } from "@/api/pub/pub";

export default {
  name: "ProductionFlowOrderComeContent",
  props: ["visiable", "title", "updateRow", "selectedConstractData"],
  computed: {
    ...mapGetters(["listData", "columns", "name", "userid"]),
  },
  data() {
    return {
      contentVisiable: false, // dialog 显示框
      fileDetailsList: [], // 文件详情地址
      innerDialogVisible: false, // 内层控制Dialog
      subInfoContent: {
        outImgName: null,//出库单名称
        outImgUrl: null,//出库单路径
        receiptImgUrl: null,//
        receiptImgName: null,
        pkOmgPrduFinishPutoutB: null, // 成品出库子表主键
        pkOmgPrduFinishPutout: null, // 成品出库主表主键
        billState: "0", // 单据状态
        procedureName: null, // 工序类型
        sequenceNum: null, // 序列号段
        putoutNum: null, // 出库数量
        finishNum: null, // 累计出库数量
        // fileName: null, // 文件名称
        // fileFullname: null, // 文件全名称
        chargePsn: null, // 经办人
        chargeTime: null, // 经办时间
        creator: null, // 创建人
        creatorShow: null, // 创建人
        shippingMethod: null, //出货方式
        trackingNumber: null, //订单号
        // receiptName: null, //回执单名称
        // receiptFullname: null, //回执单路径
        creationtime: parseTime(new Date()), // 创建时间
        dr: 0, // 删除标志
        ts: parseTime(new Date()), // 时间戳
        receiptUrl: null,
      },
      uploadUrl: process.env.BASE_API + "/", // 上传地址

      upFileTemp: null, // 记录临时文件
      upFileFileList: [], // 文件存储List集合

      receiptFileTemp: null, //记录出库单回执临时文件
      receiptFileList: [], //出库单回执文件集合

      procedureOptions: [
        // 工序选择options
        { value: "成品", label: "成品" },
        { value: "SMT", label: "SMT" },
        { value: "DIP", label: "DIP" },
        { value: "三防", label: "三防" },
        { value: "组装、测试、老化", label: "组装、测试、老化" },
      ],
      procedureOptions1: [
        // 工序选择options
        { value: "0", label: "快递" },
        { value: "1", label: "闪送" },
        { value: "2", label: "货拉拉" },
        { value: "3", label: "公司配送" },
        { value: "4", label: "自提" },
      ],
     
     
    };
  },
  watch: {
    visiable() {
      this.contentVisiable = this.visiable;
      if (this.visiable === true) {
        this.initFileDetailsListData();
      }
    },
  },
  methods: {
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 20 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    upFileChange(file, fileList) {
      // 记录工艺文件
      this.upFileTemp = file;
    },
    upFileRemove(file, fileList) {
      // 工艺文件删除
      this.upFileTemp = null;
    },

    receiptChange(file, fileList) {
      // 记录出库回执单文件
      this.receiptFileTemp = file;
    },

    receiptRemove(file, fileList) {
      //出库回执单文件删除
      this.receiptFileTemp = null;
    },
    closeDialog() {
      // 回调关闭Dialog
      this.$emit("close", null);
    },
    // 根据工艺审核主表主键初始化文件详细列表数据
    initFileDetailsListData() {
      if (this.updateRow && this.updateRow.pkOmgPrduFinishPutout) {
        this.listQuery = {
          page: 1,
          limit: 20,
        };
        this.listQuery.pkOmgPrduFinishPutout = this.updateRow.pkOmgPrduFinishPutout;
        selectAllOmgPrduFinishPutoutSubDataAsPage(this.listQuery).then(
          (response) => {
            if (response && response.success) {
              this.fileDetailsList = response.object;
            } else {
              this.fileDetailsList = [];
            }
          }
        );
      }
    },
    // 处理界面所有的按钮监听动作
    onButtonClick(btnCode, rowData) {
      if (btnCode === "ADDSUBDATA") {
        // 添加生产计划子表数据
        this.restSubInfoContent();
        this.subInfoContent.pkOmgPrduFinishPutout = this.updateRow.pkOmgPrduFinishPutout;
        this.innerDialogVisible = true;
      }
      if (btnCode === "EDIT") {
        this.innerDialogVisible = true;
        this.subInfoContent = rowData;
        this.subInfoContent.finishNum =
          this.updateRow == null ? null : this.updateRow.finishNum; // 累积完成数量

        // console.log(rowData)
        if (rowData.fileName) {
          this.upFileFileList = [
            { name: rowData.fileName, fullName: rowData.fileFullname },
          ];
        } else {
          this.upFileFileList = [];
        }

        if (rowData.receiptName) {
          this.receiptFileList = [
            { name: rowData.receiptName, fullName: rowData.receiptFullname },
          ];
        } else {
          this.receiptFileList = [];
        }
      }
      if (btnCode === "DELETESUBDATA") {
        // 删除生产计划子表数据
        if (rowData.pkOmgPrduFinishPutoutB) {
          let deleteParam = {
            pkOmgPrduFinishPutoutB: rowData.pkOmgPrduFinishPutoutB,
            dr: 1,
          };

          this.$confirm("是否删除?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              saveOmgPrduFinishPutoutSubData(deleteParam).then((response) => {
                if (response && response.success) {
                } else {
                  this.$message({
                    message: `删除失败:${response.message}`,
                    type: "error",
                  });
                }
              });
              this.initFileDetailsListData();
              // location.reload();
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
      // 确认字表数据
      if (btnCode === "CONFIRM") {
        if (rowData.pkOmgPrduFinishPutoutB) {
          let deleteParam = {
            pkOmgPrduFinishPutoutB: rowData.pkOmgPrduFinishPutoutB,
            billState: "2",
            chargePsn: this.userid,
            chargeTime: parseTime(new Date()),
          };

          this.$confirm("是否确认字表数据?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.$message({
                type: "success",
                message: "确认成功!",
              });
              saveOmgPrduFinishPutoutSubData(deleteParam).then((response) => {
                if (response && response.success) {
                } else {
                  this.$message({
                    message: `确认失败:${response.message}`,
                    type: "error",
                  });
                }
              });
              this.initFileDetailsListData();
              this.$emit("refreshTableList", this.selectedConstractData);
              this.$emit("close", null);
              // location.reload();
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消",
              });
            });

          // this.$message({ message: "确认成功", type: "success" });
          // this.$emit("refreshTableList", this.selectedConstractData);
          // this.$emit("close", null);
        }
      }
      if (btnCode === "SAVESUBDATA") {
        // 保存生产计划子表数据
        let formData = new FormData();
        //
        formData.append(
          `file`,
          this.upFileTemp == null ? null : this.upFileTemp.raw
        );
        formData.append(
          `failfile`,
          this.receiptFileTemp == null ? null : this.receiptFileTemp.raw
        );
        formData.append(`constractNo`, this.updateRow.contractNo);

        saveOrderPutoOutImage(formData).then((response) => {
          console.log(response.object);
          if (response && response.success && response.object) {
            // this.subInfoContent.fileUrl =null
            // this.subInfoContent.outImgName = response.object.outImgName;
            // this.subInfoContent.outImgUrl = response.object.outImgUrl;
            // this.subInfoContent.receiptImgUrl = response.object.receiptImgUrl;
            // this.receiptChange = response.object.receiptImgName;
            // console.log();
            this.subInfoContent.fileUrl = response.object.outImgUrl
            this.subInfoContent.receiptUrl  = response.object.receiptImgUrl
            this.subInfoContent.fileName =response.object.outImgName // 上传文件名称
            // this.subInfoContent.fileFullname =
            //   response.object.SALE_PROCPRODUCTION_FULL_NAME == ""
            //     ? null
            //     : response.object.SALE_PROCPRODUCTION_FULL_NAME; // 上传文件名称

            this.subInfoContent.receiptName = response.object.receiptImgName
            // this.subInfoContent.receiptFullname = response.object.SALE_FAIL_PROCPRODUCTION_FULL_NAME = ""
            //   ? null
            //   : response.object.SALE_FAIL_PROCPRODUCTION_FULL_NAME;
            // IMAGE_REF_FILE_PATH_R
            this.$confirm("是否操作该项?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }).then(() => {
              this.$message({
                type: "success",
                message: "操作成功!",
              });
              saveOmgPrduFinishPutoutSubData(this.subInfoContent)
                .then((response) => {
                  if (response && response.success) {
                  } else {
                    this.$message({
                      message: `操作失败:${response.message}`,
                      type: "error",
                    });
                  }
                  this.initFileDetailsListData();
                  this.innerDialogVisible = false;
                  // location.reload();
                })
                .catch(() => {
                  this.$message({
                    type: "info",
                    message: "已取消操作",
                  });
                });

              // this.$message({ message: "操作成功", type: "success" });
            });
          } else {
            this.$message({
              message: `操作失败:${response.message}`,
              type: "error",
            });
          }
        });
      }
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
    // 刷新临时文件目录
    restSubInfoContent() {
      this.subInfoContent = {
        outImgName: null,
        outImgUrl: null,
        receiptImgUrl: null,
        receiptImgName: null,
        pkOmgPrduFinishPutoutB: null, // 成品出库子表主键
        pkOmgPrduFinishPutout: null, // 成品出库主表主键
        billState: "0", // 单据状态
        procedureName: null, // 工序类型
        sequenceNum: null, // 序列号段
        putoutNum: null, // 出库数量
        finishNum: this.updateRow == null ? null : this.updateRow.finishNum, // 累计出库数量
        fileName: null, // 文件名称
        fileFullname: null, // 文件全名称
        chargePsn: null, // 经办人
        chargeTime: null, // 经办时间
        creator: null, // 创建人
        creatorShow: null, // 创建人
        shippingMethod: null, //出货方式
        trackingNumber: null, //订单号
        receiptName: null, //回执单名称
        receiptFullname: null, //回执单路径
        creationtime: parseTime(new Date()), // 创建时间
        dr: 0, // 删除标志
        receiptUrl: null,
        ts: parseTime(new Date()), // 时间戳
      };
      this.upFileTemp = null; // 记录临时文件
      this.upFileFileList = []; // 文件存储List集合

      this.receiptFileTemp = null; //记录出库单回执临时文件
      this.receiptFileList = []; //出库单回执文件集合
    },
  },
};
</script>

<style  lang="scss" type="text/scss" scoped>
/deep/ .el-dialog__body {
  padding: 5px;
}
.el-select /deep/.el-input__inner {
  width: 195px;
}

/deep/ .el-upload-dragger {
  width: 150px;
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

/deep/ .el-upload__text span {
  color: white;
  margin-top: 10px;
  display: inline-block;
}
</style>
