<template>
  <el-dialog
    :title="'返修产品'"
    :visible.sync="visiable"
    @close="closeDialog"
    width="88%"
  >
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <!-- contractNo -->
      <el-table-column prop="contractNo" label="合同编号" width="180">
      </el-table-column>
      <el-table-column prop="orderProductCode" label="产品编号" width="180">
      </el-table-column>
      <el-table-column prop="orderProductName" label="产品名称" width="180">
      </el-table-column>
      <el-table-column prop="putoutOutTime" label="下单时间"> </el-table-column>
    
      <!-- <el-table-column prop="num">
        <template slot-scope="scope">
          <el-input v-model="multipleSelection[scope.$index].num"></el-input>
        </template>
      </el-table-column> -->
    </el-table>
    <el-button type="primary" @click="closeDialogs()">立即创建</el-button>
    <el-button @click="closeDialog">取消</el-button>
  </el-dialog>
</template>
<script>
import { repairOrder } from "@/api/rapir/rapir";

export default {
  props: ["show", "pkid",'images'],
  data() {
    return {
      // pkid:null,
      visiable: false,
      pkcode: null,
      tableData: [],
      multipleSelection: [],
    };
  },
  watch: {
    show() {
      // 列表显示后的列表
      this.visiable = this.show;
      this.pkcode = this.pkid;
      console.log(this.datapkcode);
      repairOrder({ pkProduct: this.pkcode }).then((res) => {
        // console.log(res);
        this.tableData = res.object;
      });
    },
  },
  methods: {
    closeDialogs(num) {
      this.$emit("close", this.multipleSelection);
    },
    closeDialog(num) {
         this.$emit("closes");
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
};
</script>
<style lang="scss" type="text/scss" scoped>
</style>
