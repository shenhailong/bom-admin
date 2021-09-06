<template>
  <el-dialog
    :title="title"
    :visible.sync="contentVisiable"
    @close="closeDialog"
    width="60%"
    class="customer-dialog"
  >
    <el-form
      :inline="true"
      ref="dataForm"
      :model="temp"
      :rules="rules"
      label-position="left"
      label-width="120px"
    >
      <el-form-item label="客户编码" prop="code">
        <el-input v-model="temp.code" :disabled="false"></el-input>
      </el-form-item>
      <span v-if="this.userid == '145'">
        <el-form-item label="项目号" prop="code">
          <el-input v-model="temp.projectNum" :disabled="false"></el-input>
        </el-form-item>
      </span>
      <el-form-item label="联系人" prop="name">
        <el-input v-model="temp.name"></el-input>
      </el-form-item>

      <el-form-item label="性别" prop="sex">
        <el-select v-model="temp.sex" placeholder="请选择">
          <el-option
            v-for="item in sexOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户类型" prop="sex">
        <el-select v-model="temp.customerType" placeholder="请选择">
          <el-option
            v-for="item in custOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="客户名称" prop="corpname">
        <el-input v-model="temp.corpname" minlength="6"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" prop="tel">
        <el-input v-model="temp.tel"></el-input>
      </el-form-item>
      <el-form-item label="保修天数" prop="warrantyPeriod">
        <el-input v-model="temp.warrantyPeriod" type="number"></el-input>
      </el-form-item>
      <el-form-item label="所属行业" prop="trade" class="select">
        <el-select v-model="temp.trade" placeholder="请选择">
          <el-option
            v-for="item in tradeOption"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述" prop="memo">
        <el-input v-model="temp.memo"></el-input>
      </el-form-item>
      <el-form-item label="创建人" prop="creatorShow">
        <el-input v-model="temp.creatorShow" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="creationtime">
        <el-input v-model="temp.creationtime" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="修改人" prop="modifierShow">
        <el-input v-model="temp.modifierShow" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="最后修改时间" prop="modifiedtime">
        <el-input v-model="temp.modifiedtime" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="公司地址" prop="corpaddress" width="800">
        <el-input v-model="temp.corpaddress" style="width: 550px"></el-input>
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
import { listTradeAsRef } from "@/api/refdoc/trade";

export default {
  name: "Customercontent",
  props: ["replace", "title", "visiable", "action", "updateRow"],
  computed: {
    ...mapGetters(["listData", "columns", "name", "userid"]),
  },
  data() {
    return {
      contentVisiable: false, // dialog 显示框
      temp: {
        pkCustomer: undefined,
        name: "",
        customerType: "",
        warrantyPeriod: 0,
        // code: 'KH' + randomNum(100*1000),
        code: "",
        sex: "",
        corpname: "",
        corpaddress: "",
        tel: "",
        trade: "",
        projectNum: "", //项目号
        memo: "",
        creator: null,
        creatorShow: this.name,
        creationtime: parseTime(new Date()),
        modifier: null,
        modifierShow: this.name,
        modifiedtime: parseTime(new Date()),
        dr: 0,
        ts: parseTime(new Date()),
      },
      // 页面填写数据规则校验
      rules: {
        corpname: [
          { required: true, message: "客户名称不能为空", trigger: "blur" },
          { min: 6, message: "客户名称长度在6位或者6为以上", trigger: "blur" },
        ],
        name: [{ required: true, message: "联系人不能为空", trigger: "blur" }],
        tel: [{ required: true, message: "联系电话不能为空", trigger: "blur" }],
        corpaddress: [
          { required: true, message: "公司地址不能为空", trigger: "blur" },
        ],
      },
      sexOption: [
        { value: "男", label: "男" },
        { value: "女", label: "女" },
      ],
      custOption: [
        { value: "0", label: "自由态" },
        { value: "1", label: "ODM" },
        { value: "2", label: "OEM" },
        { value: "3", label: "加工" },
      ],
      // 所属行业参照
      tradeOption: [],
    };
  },
  destroyed() {},
  watch: {
    visiable() {
      this.contentVisiable = this.visiable;
      if (this.title === "录入") {
        this.restTemp();
        this.temp.creatorShow = this.name;
      }
      if (this.title === "修改" && this.updateRow) {
        this.temp = this.updateRow;
        this.temp.modifierShow = this.name;
      }
    },
  },
  created() {
    listTradeAsRef().then((response) => {
      if (response.object) {
        this.tradeOption = response.object;
      }
    });
  },
  methods: {
    closeDialog() {
      // 回调关闭Dialog
      this.$emit("close", null);
    },
    sureDialog() {
      // 确定保存回调Dialog
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          this.temp.warrantyPeriod = Number(this.temp.warrantyPeriod);
          const actTemp = this.temp;
          if (this.action) {
            this.$store.commit("HANDLE_LISTVIEW_DATA", actTemp);
            this.$confirm("是否确认修改?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(() => {
                this.$message({
                  type: "success",
                  message: "操作成功!",
                });
                initReplaceUpdateData(actTemp, this.replace, this.userid);
                initReplaceAddData(actTemp, this.replace, this.name);
                this.action(actTemp).then((response) => {
                  if (response.primary) {
                    actTemp.pkCustomer = response.primary;
                  }
                  // location.reload();
                });
                this.$emit("close", actTemp);
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "已取消操作",
                });
              });

            // this.$message({ message: '操作成功', type: 'success' })
          } else {
            this.$message({
              message: `操作失败:${response.message}`,
              type: "error",
            });
          }
        } else {
          this.$message.warning("表单验证未通过!");
          return false;
        }
      });
    },
    restTemp() {
      // 刷新本界面的数据
      this.temp = {
        pkCustomer: undefined,
        name: "",
        customerType: "",
        // code: 'KH' + randomNum(100*1000),
        code: "",
        sex: "",
        corpname: "",
        corpaddress: "",
        tel: "",
        trade: "",
        projectNum: "", //项目号
        memo: "",
        creator: null,
        creatorShow: this.name,
        creationtime: parseTime(new Date()),
        modifier: null,
        modifierShow: this.name,
        modifiedtime: parseTime(new Date()),
        dr: 0,
        warrantyPeriod: 0,
        ts: parseTime(new Date()),
      };
    },
  },
};
</script>

<style  lang="scss" type="text/scss" scoped>
.el-select /deep/ .el-input__inner {
  width: 195px;
}

/deep/ .el-input__inner {
  width: 195px;
}
/deep/ .el-dialog__body {
  padding: 10px 20px;
}
</style>
