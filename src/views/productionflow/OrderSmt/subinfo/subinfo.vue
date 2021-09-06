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
        prop="pkOmgProduSmtB"
        label="SMT子表主键"
        v-if="false"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="pkOmgProduSmt"
        label="SMT主表主键"
        v-if="false"
        width="180"
      >
      </el-table-column>
      <el-table-column prop="procedureName" label="工序名称" width="100">
      </el-table-column>
      <el-table-column
        prop="smtPlant"
        :formatter="
          (row, column) => {
            if (row.smtPlant == '1') {
              return '创元';
            }
          }
        "
        label="生产车间"
        width="100"
      >
      </el-table-column>
      <el-table-column prop="rematerielTime" label="领料时间" width="160">
      </el-table-column>
      <el-table-column prop="workStartTime" label="开工时间" width="160">
      </el-table-column>
      <el-table-column prop="workEndTime" label="完工时间" width="160">
      </el-table-column>
      <el-table-column prop="totalWorkHours" label="工时" width="90">
      </el-table-column>
      <el-table-column prop="productionLineName" label="产线名称" width="180">
      </el-table-column>
      <el-table-column prop="workEndNum" label="完工数量" width="90">
      </el-table-column>
      <el-table-column prop="smtPeopleNum" label="人数" width="90">
      </el-table-column>
      <el-table-column prop="smtCost" label="工价" width="90">
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
      <el-table-column prop="chargePsnShow" label="经办人" width="180">
      </el-table-column>
      <el-table-column prop="chargeTime" label="经办时间" width="180">
      </el-table-column>

      <el-table-column fixed="right" label="操作" width="150">
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
            :disabled="scope.row.billState == '2' ? true : false"
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

    <!--内容录入Dialog-->
    <el-dialog
      width="55%"
      title="新增文件上传"
      :visible.sync="innerDialogVisible"
      append-to-body
    >
      <el-form
        ref="form"
        :model="subInfoContent"
        :rules="rules"
        label-width="120px"
        :inline="true"
      >
        <el-form-item label="工序类型">
          <el-select
            v-model="subInfoContent.procedureName"
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
        <el-form-item label="生产车间">
          <el-select
            v-model="subInfoContent.smtPlant"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in workshop"
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
        <el-form-item label="领料时间">
          <el-date-picker
            v-model="subInfoContent.rematerielTime"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="开工时间">
          <el-date-picker
            v-model="subInfoContent.workStartTime"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="完工时间">
          <el-date-picker
            v-model="subInfoContent.workEndTime"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="工时" prop="totalWorkHours">
          <el-input v-model="subInfoContent.totalWorkHours"  @input="smtsub"></el-input>
        </el-form-item>
        <el-form-item label="总工时">
          <el-input v-model="allpe" :disabled="true" ></el-input>
        </el-form-item>
        <el-form-item label="产线名称">
          <el-select
            v-model="subInfoContent.productionLineName"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in productionLineNameOption"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="工时">
          <el-input v-model="subInfoContent.tdipCost"></el-input>
        </el-form-item> -->
        <el-form-item label="完工数量" prop="workEndNum">
          <el-input
            type="number"
            v-model="subInfoContent.workEndNum"
          ></el-input>
        </el-form-item>
        <el-form-item label="人数" prop="smtPeopleNum">
          <el-input
            type="number"
            v-model="subInfoContent.smtPeopleNum"
            @input="smtsub"
          ></el-input>
        </el-form-item>
        <el-form-item label="工价" prop="smtCost">
          <el-input type="number" v-model="subInfoContent.smtCost"  @input="smtsub"></el-input>
        </el-form-item>
        <el-form-item label="工序总价" prop="" >
          <el-input
          disabled
            type="number"
            v-model="subInfoContent.smtTotalCost"
            @input="proceduremet"
          ></el-input>
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
        <el-form-item label="创建人">
          <el-input
            v-model="subInfoContent.creatorShow"
            :disabled="true"
          ></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="preservation()">保存</el-button>
      </span>
    </el-dialog>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import { parseTime } from "@/utils/viewCompUtil";
import {
  selectProductionSmtSubAsPage,
  saveProductionSmtSub,
} from "@/api/orderCompMage/OrderSmt";
// import Table from "@/components/viewcomp/Table";

export default {
  name: "ProductionFlowOrderSmtContent",
  props: ["visiable", "title", "updateRow", "selectedConstractData"],
  computed: {
    ...mapGetters(["listData", "columns", "name", "userid"]),
  },
  data() {
    return {
      isprocedureshow: false,
      contentVisiable: false, // dialog 显示框
      fileDetailsList: [], // 列表数据集合
      listQuery: {
        // 分页查询
        page: 1,
        limit: 20,
      },
      allpe:0,//总工时
      a1: false,
      innerDialogVisible: false, // 内层控制Dialog
      subInfoContent: {
        smtTotalCost: 0,
        smtCost: 100,
        smtPeopleNum: "",
        pkOmgProduSmtB: null, // SMT子表主键
        pkOmgProduSmt: null, // SMT主表主键
        finishNum: null, // 累积完成数量
        billState: "0", // 单据状态
        procedureName: "", // 工序类型
        rematerielTime: "", // 领料时间
        workStartTime: "", // 开工时间
        workEndTime: "", // 完工时间
        totalWorkHours: "", // 总工时
        productionLineName: "", // 产线名称
        workEndNum: null, // 完工数量
        chargePsn: null, // 经办人
        chargeTime: "", // 经办时间
        creator: null, // 创建人
        creatorShow: "", // 创建人显示名称
        creationtime: "", // 创建时间
        dr: null, // 删除标识
        ts: "", // 时间戳
      },

      procedureOptions: [
        // 工序选择options
        { value: "SMT", label: "SMT" },
      ],
      workshop: [
        // 工序选择options
        { value: 1, label: "创元" },
      ],
      productionLineNameOption: [
        { value: "SMT1", label: "SMT1" },
        { value: "SMT2", label: "SMT2" },
      ],
      billStateOptions: [
        { value: "0", label: "自由态" },
        { value: "1", label: "进行中" },
        { value: "2", label: "已完成" },
      ],
      rules: {
        smtPeopleNum: [
          { required: true, message: "人数不能为空", trigger: "blur" },
        ],
        smtCost: [{ required: true, message: "工时不能为空", trigger: "blur" }],
        workEndNum: [
          { required: true, message: "完工数量不能为空", trigger: "blur" },
        ],
        totalWorkHours: [
          { required: true, message: "完工数量不能为空", trigger: "blur" },
        ],
      },
    };
  },
  updated() {},
  watch: {
    // "subInfoContent.smtPeopleNum"() {
    //   this.isshowmet();
    // },
    // subInfoContent() {
    //   this.isshowmet();
    // },
    visiable() {
      this.contentVisiable = this.visiable;
      if (this.visiable === true) {
        this.initFileDetailsListData();
      }
    },
  },
  methods: {
     smtsub(){
         if (
        this.subInfoContent.smtPeopleNum != "" &&
        this.subInfoContent.smtCost != "" &&
        this.subInfoContent.totalWorkHours != ''
      ) {
        this.isprocedureshow = true;
        // console.log(this.subInfoContent.totalWorkHours);
        // console.log(this.subInfoContent.smtPeopleNum * * subInfoContent.smtCost);
        let s = this.subInfoContent.smtPeopleNum;
        let p = this.subInfoContent.totalWorkHours;
        let y = this.subInfoContent.smtCost;
        this.allpe = s*p
        this.subInfoContent.smtTotalCost = s * p * y;
      } else {
        // console.log(this.subInfoContent.smtPeopleNum);
        this.isprocedureshow = false;
      }
     },
    isshowmet() {
      //工序的计算
    
    },
    closeDialog() {
      // 回调关闭Dialog
      this.$emit("close", null);
    },
    // 根据工艺审核主表主键初始化文件详细列表数据
    initFileDetailsListData() {
      if (this.updateRow && this.updateRow.pkOmgProduSmt) {
        this.listQuery = {
          page: 1,
          limit: 20,
        };
        this.listQuery.pkOmgProduSmt = this.updateRow.pkOmgProduSmt;
        selectProductionSmtSubAsPage(this.listQuery).then((response) => {
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
        this.subInfoContent.pkOmgProduSmt = this.updateRow.pkOmgProduSmt;
        this.innerDialogVisible = true;
      }
      if (btnCode === "EDIT") {
        this.innerDialogVisible = true;
        this.subInfoContent = rowData;
        this.subInfoContent.finishNum =
          this.updateRow == null ? null : this.updateRow.finishNum; // 累积完成数量
      }
      if (btnCode === "DELETESUBDATA") {
        // 删除生产计划子表数据
        if (rowData.pkOmgProduSmtB) {
          let deleteParam = {
            pkOmgProduSmtB: rowData.pkOmgProduSmtB,
            pkOmgProduSmt: rowData.pkOmgProduSmt,
            dr: 1,
          };

          this.$confirm("是否确认删除?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              saveProductionSmtSub(deleteParam).then((response) => {
                //  this.initFileDetailsListData();
                if (response && response.success) {
                  this.initFileDetailsListData();
                  // initFileDetailsListData()
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
      // 确认字表数据
      if (btnCode === "CONFIRM") {
        // console.log(rowData);
        if (rowData.pkOmgProduSmtB) {
          let deleteParam = {
            pkOmgProduSmtB: rowData.pkOmgProduSmtB,
            pkOmgProduSmt: rowData.pkOmgProduSmt,
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
              saveProductionSmtSub(deleteParam).then((response) => {
                if (response && response.success) {
                  this.initFileDetailsListData();
                  // this.$emit("refreshTableList", this.selectedConstractData);
                  // this.$emit("close", null);
                  // location.reload();
                } else {
                  this.$message({
                    message: `确认失败:${response.message}`,
                    type: "error",
                  });
                }
              });
              // this.a1=true
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消确认",
              });
            });

          // this.$message({ message: '确认成功', type: 'success' })
          // this.$emit("refreshTableList", this.selectedConstractData);
          // this.$emit("close", null);
        }
      }
      if (btnCode === "SAVESUBDATA") {
        // this.$message({ message: '操作成功', type: 'success' })
      }
    },
    proceduremet(data) {
      // console.log(data);
      //工序总价的反推
      let s = this.subInfoContent.smtPeopleNum;
      let p = this.subInfoContent.totalWorkHours;
      let y = this.subInfoContent.smtCost;
      let all =  data
      // console.log(all/ (p * y));
      // this.subInfoContent.smtTotalCost = s *  p* y
      this.subInfoContent.smtCost = all/ (p * s);
    },
    preservation(formData) {
      // 保存生产计划子表数据

      // console.log(this.$refs[formData]);
      this.$refs.form.validate((valid) => {
        // console.log(valid);
        if (!valid) {
          // console.log(this.form)
          // alert("1");
          this.$message.warning("表单验证未通过!");
        } else {
          this.subInfoContent.rematerielTime = parseTime(
            this.subInfoContent.rematerielTime
          ); // 领料时间
          this.subInfoContent.workStartTime = parseTime(
            this.subInfoContent.workStartTime
          ); // 开工时间
          this.subInfoContent.workEndTime = parseTime(
            this.subInfoContent.workEndTime
          ); // 完工时间

          this.$confirm("是否保存该项", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.$message({
                type: "success",
                message: "操作成功!",
              });
              saveProductionSmtSub(this.subInfoContent).then((response) => {
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
        }
      });
    },
    // 刷新临时文件目录
    restSubInfoContent() {
      this.subInfoContent = {
        smtTotalCost: 0,
        smtCost: 100,
        smtPeopleNum: "", //人数
        pkOmgProduSmtB: null, // SMT子表主键
        pkOmgProduSmt: null, // SMT主表主键
        finishNum: this.updateRow == null ? null : this.updateRow.finishNum, // 累积完成数量
        billState: "0", // 单据状态
        procedureName: "SMT", // 工序类型
        rematerielTime: "", // 领料时间
        workStartTime: "", // 开工时间
        workEndTime: "", // 完工时间
        totalWorkHours: "", // 总工时
        productionLineName: "", // 产线名称
        workEndNum: null, // 完工数量
        chargePsn: null, // 经办人
        chargeTime: "", // 经办时间
        creator: null, // 创建人
        creatorShow: this.name, // 创建人显示名称
        creationtime: "", // 创建时间
        dr: null, // 删除标识
        ts: "", // 时间戳
      };
    },
  },
};
</script>

<style  lang="scss" type="text/scss" scoped>
.el-select /deep/.el-input__inner {
  width: 206px;
}
/deep/ .el-dialog__body {
  padding: 10px;
}
.el-input--prefix /deep/ .el-input__inner {
  width: 206px;
}
.el-input /deep/.el-input__inner {
  width: 206px;
}
</style>

