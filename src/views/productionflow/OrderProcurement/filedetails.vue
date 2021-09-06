<template>
  <el-dialog
    title="工艺文件维护"
    :visible.sync="contentVisiable"
    @close="closeDialog"
    width="80%"
  >
    <el-button
      type="primary"
      size="mini"
      style="margin-bottom: 15px; margin-left: 10px"
      @click="
        () => {
          innerDialogVisible = true;
          restUploadTempFile();
        }
      "
      >新增</el-button
    >

    <el-table :data="fileDetailsList" border style="width: 100%">
      <el-table-column
        prop="pkOmgTechnicsB"
        label="文件信息主键"
        v-if="false"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="pkOmgTechnics"
        label="工艺审核主表主键"
        v-if="false"
        width="180"
      >
      </el-table-column>
      <!--<el-table-column prop="receiver" label="接收人" width="180">
      </el-table-column>-->
      <el-table-column
        prop="state"
        label="确认状态"
        width="180"
        :formatter="stateFormatter"
      >
      </el-table-column>
      <el-table-column prop="fileName" label="文件名称" width="400">
      </el-table-column>
      <el-table-column
        prop="fileFullname"
        label="文件全路径名称"
        v-if="false"
        width="180"
      >
      </el-table-column>
      <el-table-column prop="fileType" label="文件类型" width="180">
      </el-table-column>
      <el-table-column prop="creationtime" label="上传时间" width="180">
      </el-table-column>
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            v-if="scope.row.state == 0"
            @click="
              handleUpdateFileDetails({
                pkOmgTechnicsB: scope.row.pkOmgTechnicsB,
                state: 2,
              })
            "
            >确认</el-button
          >
          <!--  <el-button type="text" size="small" v-if="scope.row.state == 0 || scope.row.state == 1 || scope.row.state == 2" @click="handleUpdateFileDetails(
            {
              pkOmgTechnicsB: scope.row.pkOmgTechnicsB,
              dr: 1
            }
          )">删除</el-button> -->
          <el-button
            type="text"
            size="mini"
            @click="
              downloadProccessFile({
                name: scope.row.fileName,
                fullName: scope.row.fileFullname,
              })
            "
            >下载</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!--新增文件上传Dialog-->
    <el-dialog
      width="50%"
      title="新增文件上传"
      :visible.sync="innerDialogVisible"
      append-to-body
    >
      <el-form
        ref="form"
        :model="uploadFileTemp"
        label-position="left"
        label-width="130px"
        :inline="true"
      >
        <el-form-item label="文件名称" class="file">
          <el-input
            v-model="uploadFileTemp.fileName"
            :disabled="true"
          ></el-input>
        </el-form-item>

        <el-form-item label="文件全路径名称" class="loader">
          <el-input
            v-model="uploadFileTemp.fileFullname"
            :disabled="true"
          ></el-input>
        </el-form-item>

        <el-form-item label="文件类型">
          <el-input v-model="uploadFileTemp.fileType"></el-input>
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
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleSaveOrderAuditFile"
          >保存上传</el-button
        >
        <el-button @click="innerDialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </el-dialog>
</template>

<script>
import {
  selectOrderTechnicsFileDetails,
  saveOrderTechnicsBFile,
  updateTechnicsSubData,
} from "@/api/orderCompMage/OrderAudit";
import { saveOrderCompFile } from "@/api/orderCompMage/AproductionPub";
import { downloadProductFile } from "@/api/pub/pub";

export default {
  name: "TechnologyFileDetailsDialog",
  props: ["visiable", "updateRow"],
  data() {
    return {
      contentVisiable: false, // dialog 显示框

      fileDetailsList: [], // 文件详情地址
      innerDialogVisible: false, // 内层上传文件Dialog
      uploadFileTemp: {
        // 上传文件临时Temp
        pkOmgTechnics: null, // 工艺审核主表主键
        pkProduct: null, // 产品主键
        state: "0", // 单据状态
        receiver: "", // 接收人
        fileName: "", // 文件名称
        fileFullname: "", // 文件全路径名称
        fileType: "", // 文件类型
        creationtime: "", // 创建时间
      },
      upFileTemp: null, // 记录临时文件
      upFileFileList: [], // 文件存储List集合
      uploadUrl: process.env.BASE_API + "/", // 上传地址
    };
  },
  watch: {
    visiable() {
      this.contentVisiable = this.visiable;
      if (this.visiable == true) {
        this.initFileDetailsListData();
      }
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
    closeDialog() {
      this.$emit("close", null);
    },
    // 保存新增工艺审核文件
    handleSaveOrderAuditFile() {
      let formData = new FormData();
      formData.append(`file`, this.upFileTemp.raw);
      formData.append(`constractNo`, this.updateRow.code);
      saveOrderCompFile(formData).then((response) => {
        if (response && response.success && response.object) {
          this.uploadFileTemp.fileName =
            response.object.SALE_PROCPRODUCTION_NAME; // 上传文件名称
          this.uploadFileTemp.fileFullname =
            response.object.SALE_PROCPRODUCTION_FULL_NAME; // 上传文件名称

          // this.uploadFileTemp.pkOmgTechnics = this.updateRow.pkOmgTechnics // 生产流程工艺主键主键
          this.uploadFileTemp.pkProduct = this.updateRow.pkProduct; // 产品主键

          this.$confirm("此操作将永久保存该工艺审核文件, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.$message({
                type: "success",
                message: "操作成功!",
              });
              saveOrderTechnicsBFile(this.uploadFileTemp).then((response) => {
                if (response && response.success) {
                  this.innerDialogVisible = false;
                  this.initFileDetailsListData();
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
          // this.innerDialogVisible = false
          // this.initFileDetailsListData()
        } else {
          this.$message({
            message: `操作失败:${response.message}`,
            type: "error",
          });
        }
      });
    },
    // 根据主键更新工艺子表主键
    handleUpdateFileDetails(updateParam) {
      this.$confirm("此操作将永久主键更新该工艺子表主键, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "操作成功!",
          });
          updateTechnicsSubData(updateParam).then((response) => {
            if (response && response.success) {
              this.initFileDetailsListData();
              // location.reload();
            } else {
              this.$message({
                message: `操作失败:${response.message}`,
                type: "error",
              });
            }
          })
          
          
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });
      // this.$message({ message: "操作成功", type: "success" });
      // this.initFileDetailsListData();
    },
    // 根据工艺审核主表主键初始化文件详细列表数据
    initFileDetailsListData() {
      if (this.updateRow && this.updateRow.pkProduct) {
        let initQueryParam = {
          pkProduct: this.updateRow.pkProduct,
        };
        selectOrderTechnicsFileDetails(initQueryParam).then((response) => {
          if (response && response.success) {
            this.fileDetailsList = response.object;
          } else {
            this.fileDetailsList = [];
          }
        });
      }
    },
    // 转义工艺审核字表状态
    stateFormatter(row, column) {
      if (row.state === "-1") {
        return "产品自带";
      }
      if (row.state === "0") {
        return "自由态";
      }
      if (row.state === "1") {
        return "确认中";
      }
      if (row.state === "2") {
        return "确认完成";
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
    restUploadTempFile() {
      // 新增重置文件上传描述信息Temp
      this.upFileTemp = null;
      this.upFileFileList = [];
      // 上传文件临时Temp
      this.uploadFileTemp = {
        pkOmgTechnics: null, // 工艺审核主表主键
        pkProduct: null, // 产品主键
        state: "0", // 单据状态
        receiver: "", // 接收人
        fileName: "", // 文件名称
        fileFullname: "", // 文件全路径名称
        fileType: "", // 文件类型
        creationtime: "", // 创建时间
      };
    },
  },
};
</script>

<style>
</style>
