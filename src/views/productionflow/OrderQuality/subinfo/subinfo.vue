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
        prop="pkOmgBecomeB"
        label="成品质检子表主键"
        v-if="false"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="pkOmgBecome"
        label="成品质检主表主键"
        v-if="false"
        width="180"
      >
      </el-table-column>
      <el-table-column prop="procedureName" label="工序类型" width="90">
      </el-table-column>
      <el-table-column prop="sequenceNum" label="序列号段" width="100">
      </el-table-column>
      <el-table-column prop="checkNum" label="检查数量" width="100">
      </el-table-column>
      <el-table-column prop="passNum" label="通过数量" width="100">
      </el-table-column>
      <el-table-column prop="passRate" label="通过率" width="100">
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

    <!--成品质检Dialog-->
    <el-dialog
      width="65%"
      title="成品质检"
      :visible.sync="innerDialogVisible"
      append-to-body
    >
      <el-form
        ref="form"
        :model="subInfoContent"
        label-width="130px"
        :inline="true"
      >
        <el-form-item label="工序类型">
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

        <el-form-item label="累计完成数量">
          <el-input
            v-model="subInfoContent.finishNum"
            :disabled="true"
          ></el-input>
        </el-form-item>

        <el-form-item label="序列号段">
          <el-input v-model="subInfoContent.sequenceNum"></el-input>
        </el-form-item>

        <el-form-item label="检查数量">
          <el-input v-model="subInfoContent.checkNum"></el-input>
        </el-form-item>

        <el-form-item label="通过数量">
          <el-input v-model="subInfoContent.passNum"></el-input>
        </el-form-item>

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

        <el-form-item label="创建人">
          <el-input
            v-model="subInfoContent.creatorShow"
            :disabled="true"
          ></el-input>
        </el-form-item>

        <el-form-item label="通过率">
          <el-input v-model="subInfoContent.passRate">
            <template slot="append">%</template>
          </el-input>
        </el-form-item>
      </el-form>

      <el-row>
        <el-col :span="8">
          <el-upload
            drag
            style="margin-left: 50px"
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
              <span>质检合格</span><em>点击上传</em>
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
            ref="FileUpLoad"
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
              <span>质检不合格</span><em>点击上传</em>
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
  selectAllOmgBecomeSubDataAsPage,
  saveOmgBecomeSubData,
} from "@/api/orderCompMage/OrderQuality";
import { saveOrderCompFile } from "@/api/orderCompMage/AproductionPub";
import { parseTime } from "@/utils/viewCompUtil";
import { downloadProductFile } from "@/api/pub/pub";

export default {
  name: "ProductionFlowOrderQualityContent",
  props: ["visiable", "title", "updateRow", "selectedConstractData"],
  computed: {
    ...mapGetters(["listData", "columns", "name", "userid"]),
  },
  data() {
    return {
      contentVisiable: false, // dialog 显示框
      fileDetailsList: [], // 文件详情地址
      listQuery: {
        // 分页查询
        page: 1,
        limit: 20,
      },

      innerDialogVisible: false, // 内层控制Dialog
      subInfoContent: {
        pkOmgBecomeB: null, // 成品质检子表主键
        pkOmgBecome: null, // 成品质检主表主键
        finishNum: null, // 累积完成数量
        billState: "0", // 单据状态
        procedureName: "", // 工序名称
        sequenceNum: "", // 序列号段
        checkNum: null, // 检查数量
        passNum: null, // 通过数量
        passRate: null, // 合格率
        fileName: "", // 附件名称
        fileFullname: "", // 附件全名称
        failName: "", // 不合格文件名称
        failFullname: "", // 不合格文件全路径名称
        chargePsn: "", // 经办人
        chargeTime: "", // 经办时间
        creator: null, // 创建人
        creatorShow: "", // 创建人
        creationtime: parseTime(new Date()), // 创建时间
        dr: 0, // 删除标志
        ts: parseTime(new Date()), // 时间戳
      },
      upFileTemp: null, // 记录临时文件
      upFileFileList: [], // 文件存储List集合

      upFailFileTemp: null, // 记录不合格临时文件
      upFailFileList: [], // 不合格文件存储List集合

      uploadUrl: process.env.BASE_API + "/", // 上传地址

      procedureOptions: [
        // 工序选择options
        { value: "成品", label: "成品" },
        { value: "SMT", label: "SMT" },
        { value: "DIP", label: "DIP" },
        { value: "三防", label: "三防" },
        { value: "组装、测试、老化", label: "组装、测试、老化" },
      ],
      billStateOptions: [
        { value: "0", label: "自由态" },
        { value: "1", label: "进行中" },
        { value: "2", label: "已完成" },
      ],
    };
  },
  watch: {
    visiable() {
      this.contentVisiable = this.visiable;
      if (this.visiable === true) {
        this.initFileDetailsListData();
      }

      this.upFileTemp = null; // 记录临时文件
      this.upFailFileTemp = null; // 记录不合格临时文件
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
    // 根据工艺审核主表主键初始化文件详细列表数据
    initFileDetailsListData() {
      if (this.updateRow && this.updateRow.pkOmgBecome) {
        this.listQuery = {
          page: 1,
          limit: 20,
        };
        this.listQuery.pkOmgBecome = this.updateRow.pkOmgBecome;
        selectAllOmgBecomeSubDataAsPage(this.listQuery).then((response) => {
          if (response && response.success) {
            this.fileDetailsList = response.object;
          } else {
            this.fileDetailsList = [];
          }
        });
      }
    },
    // 处理界面所有的按钮监听动作
    onButtonClick(btnCode, rowData) {
      if (btnCode === "ADDSUBDATA") {
        // 添加生产计划子表数据
        this.restSubInfoContent();
        this.subInfoContent.pkOmgBecome = this.updateRow.pkOmgBecome;
        this.innerDialogVisible = true;
      }
      if (btnCode === "EDIT") {
        this.innerDialogVisible = true;
        this.subInfoContent = rowData;
        this.subInfoContent.finishNum =
          this.updateRow == null ? null : this.updateRow.finishNum; // 累积完成数量
        if (rowData.fileName) {
          this.upFileFileList = [
            { name: rowData.fileName, fullName: rowData.fileFullname },
          ];
        } else {
          this.upFileFileList = [];
        }
        if (rowData.failName) {
          this.upFailFileList = [
            { name: rowData.failName, fullName: rowData.failFullname },
          ];
        } else {
          this.upFailFileList = [];
        }
      }
      if (btnCode === "DELETESUBDATA") {
        // 删除生产计划子表数据
        if (rowData.pkOmgBecomeB) {
          let deleteParam = {
            pkOmgBecomeB: rowData.pkOmgBecomeB,
            dr: 1,
          };
          saveOmgBecomeSubData(deleteParam)
            .then((response) => {
              this.$confirm("是否确认删除?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              }).then(() => {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                if (response && response.success) {
                  this.initFileDetailsListData();
                  //  location.reload();
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
      // 确认字表数据
      if (btnCode === "CONFIRM") {
        if (rowData.pkOmgBecomeB) {
          let deleteParam = {
            pkOmgBecomeB: rowData.pkOmgBecomeB,
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
              saveOmgBecomeSubData(deleteParam).then((response) => {
                if (response && response.success) {
                  this.initFileDetailsListData();
                  this.$emit("refreshTableList", this.selectedConstractData);
                  this.$emit("close", null);
                  // location.reload();
                } else {
                  this.$message({
                    message: `确认失败:${response.message}`,
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

          // this.$message({ message: "确认成功", type: "success" });
          // this.$emit("refreshTableList", this.selectedConstractData);
          // this.$emit("close", null);
        }
      }
      if (btnCode === "SAVESUBDATA") {
        // 保存生产计划子表数据
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
          // console.log(response.object);
          if (response && response.success && response.object) {
            this.subInfoContent.fileName =
              response.object.SALE_PROCPRODUCTION_NAME == ""
                ? null
                : response.object.SALE_PROCPRODUCTION_NAME; // 上传文件名称
            this.subInfoContent.fileFullname =
              response.object.SALE_PROCPRODUCTION_FULL_NAME == ""
                ? null
                : response.object.SALE_PROCPRODUCTION_FULL_NAME; // 上传文件名称
            this.subInfoContent.failName =
              response.object.SALE_FAIL_PROCPRODUCTION_NAME == ""
                ? null
                : response.object.SALE_FAIL_PROCPRODUCTION_NAME;
            this.subInfoContent.failFullname =
              response.object.SALE_FAIL_PROCPRODUCTION_FULL_NAME == ""
                ? null
                : response.object.SALE_FAIL_PROCPRODUCTION_FULL_NAME;
            this.executeSaveDataMethod();
          } else {
            this.$message({
              message: `操作失败:${response.message}`,
              type: "error",
            });
          }
        });
      }
    },
    // 执行保存更新数据方法
    executeSaveDataMethod() {
      this.$confirm("是否保存更新数据方法?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "操作成功!",
          });
          saveOmgBecomeSubData(this.subInfoContent).then((response) => {
            if (response && response.success) {
                this.initFileDetailsListData();
                this.innerDialogVisible = false;
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
      // this.$message({ message: "操作成功", type: "success" });
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
        pkOmgBecomeB: null, // 成品质检子表主键
        pkOmgBecome: null, // 成品质检主表主键
        finishNum: this.updateRow == null ? null : this.updateRow.finishNum, // 累积完成数量
        billState: "0", // 单据状态
        procedureName: "", // 工序名称
        sequenceNum: "", // 序列号段
        checkNum: null, // 检查数量
        passNum: null, // 通过数量
        passRate: null, // 合格率
        fileName: "", // 附件名称
        fileFullname: "", // 附件全名称
        failName: "", // 不合格文件名称
        failFullname: "", // 不合格文件全路径名称
        chargePsn: "", // 经办人
        chargeTime: "", // 经办时间
        creator: this.userid, // 创建人
        creatorShow: this.name, // 创建人
        creationtime: parseTime(new Date()), // 创建时间
        dr: 0, // 删除标志
        ts: parseTime(new Date()), // 时间戳
      };

      this.upFileTemp = null; // 记录临时文件
      this.upFileFileList = []; // 文件存储List集合
      this.upFailFileTemp = null; // 记录不合格临时文件
      this.upFailFileList = []; // 不合格文件存储List集合
    },
  },
};
</script>

<style  lang="scss" type="text/scss" scoped>
/deep/ .el-dialog__body {
  padding: 10px;
}
.el-select /deep/.el-input__inner {
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

/deep/ .el-upload__text span {
  color: white;
  margin-top: 10px;
  display: inline-block;
}
</style>

