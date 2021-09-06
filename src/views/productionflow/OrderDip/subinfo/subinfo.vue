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
        prop="pkOmgProduDipB"
        label="DIP子表主键"
        v-if="false"
        width="180"
      >
      </el-table-column>
      <el-table-column
        prop="pkOmgProduDip"
        label="DIP主表主键"
        v-if="false"
        width="180"
      >
      </el-table-column>
      <el-table-column prop="procedureName" label="工序名称" width="90">
      </el-table-column>
      <!-- <el-table-column prop="dipPlant" label="生产车间" width="90">
      </el-table-column> -->
      <el-table-column
        prop="dipPlant"
        :formatter="
          (row, column) => {
            if (row.dipPlant == '1') {
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
      <el-table-column prop="totalWorkHours" label="总工时" width="80">
      </el-table-column>
      <el-table-column prop="workEndNum" label="完工数量" width="100">
      </el-table-column>
      <el-table-column prop="dipPeopleNum" label="人数" width="90">
      </el-table-column>
      <el-table-column prop="dipCost" label="工价" width="90">
      </el-table-column>
      <el-table-column prop="chargePsnShow" label="经办人" width="100">
      </el-table-column>
      <el-table-column prop="chargeTime" label="经办时间" width="160">
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
            :disabled="scope.row.billState == '2' ? true : false"
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

    <!--DIP子表Dialog-->
    <el-dialog
      width="55%"
      title="新增文件上传"
      :visible.sync="innerDialogVisible"
      append-to-body
    >
      <el-form
        ref="form"
        :model="subInfoContent"
        label-width="120px"
        :rules="rules"
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
        <el-form-item label="生产车间">
          <el-select
            v-model="subInfoContent.dipPlant"
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

        <el-form-item label="工时" prop="totalWorkHours" >
          <el-input v-model="subInfoContent.totalWorkHours" @input='dipted'></el-input>
        </el-form-item>
        <el-form-item label="总工时">
          <el-input v-model="allpe" :disabled="true" ></el-input>
        </el-form-item>
        <el-form-item label="完工数量" prop="workEndNum">
          <el-input
            type="number"
            v-model="subInfoContent.workEndNum"
          ></el-input>
        </el-form-item>
        <el-form-item label="人数" prop="dipPeopleNum" >
          <el-input
            type="number"
            v-model="subInfoContent.dipPeopleNum"
            @input='dipted'
          ></el-input>
        </el-form-item> 
        <!-- isprocedureshow -->
        <el-form-item label="工价" prop="dipCost" >
          <el-input type="number" v-model="subInfoContent.dipCost" @input='dipted'></el-input>
        </el-form-item>
         <el-form-item label="工序总价" prop="dipTotalCost" v-if='isprocedureshow'>
          <el-input type="number" v-model="subInfoContent.dipTotalCost" @input="proceduremet"></el-input>
        </el-form-item>
        <!-- <el-form-item label="经办人">
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
        </el-form-item> -->

        <el-form-item label="创建人">
          <el-input
            v-model="subInfoContent.creatorShow"
            :disabled="true"
          ></el-input>
        </el-form-item>
      </el-form>

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
import { parseTime } from "@/utils/viewCompUtil";
import {
  selectProductionSubAsPage,
  saveProductionSub,
} from "@/api/orderCompMage/OrderDip";

export default {
  name: "ProductionFlowOrderDipContent",
  props: ["visiable", "title", "updateRow", "selectedConstractData"],
  computed: {
    ...mapGetters(["listData", "columns", "name", "userid"]),
  },
  // mounted(){
  //     this.subInfoContent.procedureName = { value: "DIP", label: "DIP" }
  // },
  data() {
    return {
      contentVisiable: false, // dialog 显示框
      fileDetailsList: [], // 文件详情地址
      listQuery: {
        // 分页查询
        page: 1,
        limit: 20,
      },
      allpe:0,//总工时
      isprocedureshow:false,
      innerDialogVisible: false, // 内层控制Dialog
      subInfoContent: {
        dipCost: 30,
        dipPeopleNum:'',
        totalWorkHours:'',
        pkOmgProduDipB: '', // 生产流程 dip子表主键
        pkOmgProduDip: '', // dip主表主键
        finishNum: '', // 累积完成数量
        billState: "0", // 单据状态
        procedureName: "", // 工序类型
        rematerielTime: "", // 领料时间
        workStartTime: "", // 开工时间
        workEndTime: "", // 完工时间
        totalWorkHours: '', // 总工时
        workEndNum: '', // 完工数量
        chargePsn: '', // 经办人
        // chargeTime: null,  // 经办时间
        creator: '', // 创建人
        creatorShow: "", // 创建人
        creationtime: "", // 创建时间
        dr: 0, // 删除标志
        ts: "", // 时间戳
      },

      procedureOptions: [
        // 工序选择options
        { value: "DIP", label: "DIP" },
      ],
      workshop: [{ value: "1", label: "创元" }],
      billStateOptions: [
        { value: "0", label: "自由态" },
        { value: "1", label: "进行中" },
        { value: "2", label: "已完成" },
      ],
      productionLineNameOption: [
        { value: "DIP1", label: "DIP1" },
        { value: "DIP2", label: "DIP2" },
      ],
      rules: {
        dipPeopleNum: [
          { required: true, message: "人数不能为空", trigger: "blur" },
        ],
        dipCost: [{ required: true, message: "工时不能为空", trigger: "blur" }],
        workEndNum: [
          { required: true, message: "完工数量不能为空", trigger: "blur" },
        ],
        totalWorkHours: [
          { required: true, message: "完工数量不能为空", trigger: "blur" },
        ],
      },
    };
  },
  watch: {
    "subInfoContent.procedureName"() {
      console.log(this.subInfoContent.procedureName);
      if (this.subInfoContent.procedureName == "三防") {
        this.subInfoContent.dipCost = 60;
      } else {
        this.subInfoContent.dipCost = 30;
      }
    },
    visiable() {
      this.contentVisiable = this.visiable;
      if (this.visiable === true) {
        this.initFileDetailsListData();
      }
    },
  },
  methods: {
    dipted(){
      if (
        this.subInfoContent.dipPeopleNum != "" &&
        this.subInfoContent.dipCost != "" &&
        this.subInfoContent.totalWorkHours != ''
      ) {
        this.isprocedureshow = true;
        let s = this.subInfoContent.dipPeopleNum;
        let p = this.subInfoContent.totalWorkHours;
        let y = this.subInfoContent.dipCost;
        this.allpe = s*p
        this.subInfoContent.dipTotalCost = s * p * y;
      } else {
        console.log(this.subInfoContent.dipPeopleNum);
        this.isprocedureshow = false;
      }
    },
    closeDialog() {
      // 回调关闭Dialog
      this.$emit("close", null);
    },
    // 根据工艺审核主表主键初始化文件详细列表数据
    initFileDetailsListData() {
      if (this.updateRow && this.updateRow.pkOmgProduDip) {
        this.listQuery = {
          page: 1,
          limit: 20,
        };
        this.listQuery.pkOmgProduDip = this.updateRow.pkOmgProduDip;
        selectProductionSubAsPage(this.listQuery).then((response) => {
          if (response && response.success) {
            this.fileDetailsList = response.object;
          } else {
            this.fileDetailsList = [];
          }
        });
      }
    },
    proceduremet(data) {
      console.log(data);
      //工序总价的反推
      let s = this.subInfoContent.dipPeopleNum;
      let p = this.subInfoContent.totalWorkHours;
      let y = this.subInfoContent.dipCost;
      let all =  data
      // console.log(all/ (p * s));
      // this.subInfoContent.dipTotalCost = s *  p* y
      this.subInfoContent.dipCost = all/ (p * s);
    },
    // 处理界面所有的按钮监听动作
    onButtonClick(btnCode, rowData) {
      if (btnCode === "ADDSUBDATA") {
        // 添加生产计划子表数据
        this.restSubInfoContent();
        this.subInfoContent.pkOmgProduDip = this.updateRow.pkOmgProduDip;
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
        if (rowData.pkOmgProduDipB) {
          let deleteParam = {
            pkOmgProduDipB: rowData.pkOmgProduDipB,
            pkOmgProduDip: rowData.pkOmgProduDip,
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
              saveProductionSub(deleteParam).then((response) => {
                if (response && response.success) {
                  // location.reload();
                } else {
                  this.$message({
                    message: `删除失败:${response.message}`,
                    type: "error",
                  });
                }
              });
              this.initFileDetailsListData();
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
        if (rowData.pkOmgProduDipB) {
          let deleteParam = {
            pkOmgProduDipB: rowData.pkOmgProduDipB,
            pkOmgProduDip: rowData.pkOmgProduDip,
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
              saveProductionSub(deleteParam).then((response) => {
                if (response && response.success) {
                  this.initFileDetailsListData();
                  this.$emit("refreshTableList", this.selectedConstractData);
                  // this.$emit("close", null);
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
                message: "已取消确认",
              });
            });
        }
      }
      if (btnCode === "SAVESUBDATA") {
        // 保存生产计划子表数据
        this.$refs.form.validate((valid) => {
          if (!valid) {
            // console.log(this.form)
            // alert("1");
            this.$message.warning("表单验证未通过!");
          } else {
            this.subInfoContent.pkOmgProduDip = this.updateRow.pkOmgProduDip; // 主表主键
            this.subInfoContent.rematerielTime = parseTime(
              this.subInfoContent.rematerielTime
            ); // 领料时间
            this.subInfoContent.workStartTime = parseTime(
              this.subInfoContent.workStartTime
            ); // 开工时间
            this.subInfoContent.workEndTime = parseTime(
              this.subInfoContent.workEndTime
            ); // 完工时间

            this.$confirm("是否保存生产计划子表数据?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(() => {
                this.$message({
                  type: "success",
                  message: "操作成功!",
                });
                saveProductionSub(this.subInfoContent).then((response) => {
                  if (response && response.success) {
                    this.initFileDetailsListData();
                    this.innerDialogVisible = false;
                    // this.$emit("close");
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

        // this.$message({ message: "操作成功", type: "success" });
      }
    },
    // 刷新临时文件目录
    restSubInfoContent() {
      this.subInfoContent = {
        dipCost: 30,
        dipPeopleNum:'',
        totalWorkHours:'',
        pkOmgProduDipB: null, // 生产流程 dip子表主键
        pkOmgProduDip: null, // dip主表主键
        finishNum: this.updateRow == null ? null : this.updateRow.finishNum, // 累积完成数量
        billState: "0", // 单据状态
        procedureName: "DIP", // 工序类型
        rematerielTime: "", // 领料时间
        workStartTime: "", // 开工时间
        workEndTime: "", // 完工时间
        totalWorkHours: null, // 总工时
        workEndNum: null, // 完工数量
        chargePsn: null, // 经办人
        // chargeTime: null, // 经办时间
        creator: this.userid, // 创建人
        creatorShow: this.name, // 创建人
        creationtime: "", // 创建时间
        dr: 0, // 删除标志
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
.el-input /deep/.el-input__inner {
  width: 206px;
}

/deep/ .el-dialog__body {
  padding: 10px;
}
.el-input--prefix /deep/ .el-input__inner {
  width: 206px;
}
</style>
