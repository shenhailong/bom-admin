<template>
  <!-- 回款录入 -->
  <div>
    <el-form ref="form" :model="form" label-width="80px" class="box">
      <div>
        <el-form-item label="应收金额" v-if="value == 1">
          <el-input v-model="allshould" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="开票金额 " v-if="value == 2">
          <el-input v-model="allshould" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="回款日期" v-if="value == 1">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date1"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="开票日期" v-if="value == 2">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date1"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="收款单号" v-if="value == 1">
          <el-input v-model="form.names"></el-input>
        </el-form-item>
        <el-form-item label="开票编号" v-if="value == 2">
          <el-input v-model="form.names"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="预存金额">
          <el-input
            v-model="tableData.remainingNum"
            :disabled="true"
          ></el-input>
          <el-button @click="remainingclick"
            ><i class="el-icon-set-up"></i
          ></el-button>
        </el-form-item>
        <el-form-item label="回款金额" v-if="value == 1">
          <el-input v-model="form.name"></el-input>
          <el-button @click="minis"><i class="el-icon-set-up"></i></el-button>
        </el-form-item>
        <el-form-item label="开票金额" v-if="value == 2">
          <el-input v-model="form.name"></el-input>
          <el-button @click="minis"><i class="el-icon-set-up"></i></el-button>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="tableData.memo"></el-input>
        </el-form-item>

        <el-upload
          drag
          class="upload-demo"
          ref="BOMUpload"
          :action="uploadUrl"
          :limit="1"
          :on-change="BOMFileChange"
          :auto-upload="false"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">文件上传</div>
        </el-upload>
      </div>
      <div>
        <el-form-item label="客户名称">
          <el-input v-model="tableData.corpname" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="业务员">
          <el-input
            v-model="tableData.pkPsndocShow"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="合同号">
          <el-input v-model="tableData.contractNo" :disabled="true"></el-input>
        </el-form-item>
      </div>
    </el-form>

    <el-table
      ref="multipleTable"
      :data="tableData.billProductOrderBPoList"
      tooltip-effect="dark"
      style="width: 90%; margin: 0 auto"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="orderProductCode" label="产品编号">
        <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
      </el-table-column>
      <el-table-column prop="orderProductName" label="产品名称">
      </el-table-column>
      <el-table-column prop="allPrice" label="订单金额"> </el-table-column>
      <el-table-column prop="backSum" label="回款金额" v-if="value == 1">
      </el-table-column>
      <el-table-column prop="invoiceSum" label="开票金额" v-if="value == 2">
      </el-table-column>
      <el-table-column prop="should" label="应收金额" v-if="value == 1"> </el-table-column>
      <el-table-column prop="should" label="应收金额" v-if="value == 2"> </el-table-column>
    </el-table>
    <div class="divs">
      <div></div>
      <div>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  saveFinancePaymen,
  saveFinancePaymentFile,
} from "@/api/financing/flans";
export default {
  props: ["isdata", "value"],
  created() {
    this.tableData = this.isdata;

    for (let i of this.tableData.billProductOrderBPoList) {
      i.allPrice = i.productUnitPrice * i.productNum; //订单金额
      i.should = i.allPrice - i.backSum; //应收金额

      i.allPrice = i.allPrice.toFixed(3);
      i.should = i.should.toFixed(3);
      this.allshould += Number(i.should);
    }
    this.allshould = this.allshould.toFixed(2); //计算出总金额的额度
  },
  watch: {
    isdata() {
      this.allshould = 0;
      this.tableData = this.isdata;
      // this.tableData.billProductOrderBPoList
      for (let i of this.tableData.billProductOrderBPoList) {
        // console.log(i);

        i.allPrice = i.productUnitPrice * i.productNum; //订单金额
        i.allPrice = i.allPrice.toFixed(3);
        // 条件判断 计算开票和回款  计算应收金额
        if (this.value == 1) {
          //
          i.should = i.allPrice - i.backSum;
          i.should = i.should.toFixed(3);
        } else {
          i.should = i.allPrice - i.invoiceSum;
        }
        // console.log(i.should);

        this.allshould += Number(i.should);
      }
      this.allshould = this.allshould.toFixed(2); //得出总金额的额度
    },
    value() {
      this.allshould = 0;
      // 条件判断 计算开票和回款  计算应收金额
      for (let i of this.tableData.billProductOrderBPoList) {
        if (this.value == 1) {
          this.logs = 2;
          i.should = i.allPrice - i.backSum;
          i.should = i.should.toFixed(3);
        } else {
          this.logs = 3;
          i.should = i.allPrice - i.invoiceSum;
          i.should = i.should.toFixed(3);
        }
        // console.log(i.should);
        this.allshould += Number(i.should);
        // console.log(this.allshould);
      }
      this.allshould = this.allshould.toFixed(2);
    },
    "form.date1"() {
      //处理时间
      this.form.date1 = this.dateFormat(this.form.date1);
    },
  },
  mounted() {
    this.tableData = this.isdata;
  },
  data() {
    return {
      tableData: [],
      multipleSelection: [],
      miniprice: 0, //回款金额的预测
      form: {
        name: null,
        names: null,
      },
      file: {
        raw: null,
      },
      uploadUrl: process.env.BASE_API + "/", // 上传地址
      logs: 2, //控制提交是的回款和开票
      allshould: 0,
    };
  },

  methods: {
    handleSelectionChange(val) {
      // 列表里的数据
      this.multipleSelection = val;
    },
    remainingclick() {
      this.allshould = 0;
      // 对回款金额和应收金额的计算
      for (let i of this.multipleSelection) {
        if (this.value == 1) {
          //金额的计算
          let prs = i.backSum + Number(this.tableData.remainingNum);

          this.tableData.remainingNum = this.tableData.remainingNum - i.should;
          //用现在有的金额循环扣除合同的额度
          i.backSum = this.tableData.remainingNum;
          // i.backSum = i.should
          i.should = this.tableData.remainingNum;
          if (this.tableData.remainingNum <= i.should) {
            if (i.should <= 0) {
              i.should = Math.abs(i.should);
              i.backSum = prs;
              this.tableData.remainingNum = 0;
            } else {
              i.backSum = i.allPrice;
              i.should = 0;
            }
          }
          this.allshould += Number(i.should);
          this.tableData.billProductOrderBPoList = this.multipleSelection;
        } else {
          //开票的计算
          let prs = i.invoiceSum + Number(this.tableData.remainingNum);
          this.tableData.remainingNum = this.tableData.remainingNum - i.should;
          i.invoiceSum = this.tableData.remainingNum;
          i.should = this.tableData.remainingNum;
          if (this.tableData.remainingNum <= i.should) {
            if (i.should <= 0) {
              i.should = Math.abs(i.should);
              i.invoiceSum = prs;
              this.tableData.remainingNum = 0;
            } else {
              i.invoiceSum = i.allPrice;
              i.should = 0;
            }
          }
          this.allshould += Number(i.should);
          // this.allshould = this.allshould.toFixed(2);
          this.tableData.billProductOrderBPoList = this.multipleSelection;
        }
      }
        this.allshould = this.allshould.toFixed(2);
      // this.tableData = this.tableData
    },
    onSubmit() {
      //确认按钮
      let formData = new FormData();
      let day1 = new Date();
      if (this.file != null) {
        formData.append(`file`, this.file.raw);
        formData.append("customerCode", this.isdata.customerCode);
        this.$confirm("你是否确认如上操作?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "确认成功!",
            });

            let datas = {
              pkCustomer: this.isdata.pkCustomer,
              pkProductOrder: this.isdata.pkProductOrder,
              paymentType: this.logs,//类型
              paymentTime: this.form.date1, //回款日期
              paymentMoney: this.miniprice, //回款金额
              paymentNo: this.form.names, //收款单号
              memo: this.tableData.memo,//备注
              creationtime: this.dateFormat(day1), //创建时间
              fileName: null,//图片名称
              fileFullname: null,//图片路径
              billProductOrderBPoList: this.tableData.billProductOrderBPoList,//当前列表剩余的数据
              remainingNumber: this.tableData.remainingNum, //剩钱
            };

            saveFinancePaymentFile(formData).then((res) => {
              //文件
              datas.fileName = res.object.SALE_FILE_FA_FULL_NAME;
              datas.fileFullname = res.object.SALE_FILE_FA_NAME;
              saveFinancePaymen(datas).then((res) => {
                this.$emit("close");
              });
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消确认",
            });
          });
      } else {
        this.$message.error("文件未选择");
      }
    },
    BOMFileChange(file) {
      //保存文件
      this.file = file;
    },
    minis() {
      //记录回款添加
      this.miniprice += Number(this.form.name);
      this.tableData.remainingNum =
        this.tableData.remainingNum + Number(this.form.name);
      this.form.name = 0;
    },
    dateFormat(dateData) {
      //时间的计算
      var date = new Date(dateData);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      // console.log(date.getHours());
      var p = date.getHours();
      var o = date.getMinutes();
      var g = date.getSeconds();
      const time = y + "-" + m + "-" + d + " " + p + ":" + o + ":" + g;
      return time;
    },
  },
};
</script>
<style lang="scss" type="text/scss" scoped>
.box {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}
.box > div {
  width: 30%;
}
.el-input {
  width: 60%;
}
.el-form-item {
  margin: 0;
}
.icon {
  float: right;
  margin-top: 20px;
  margin-right: 50px;
  color: #409eff;
}

/deep/ .el-upload-dragger {
  width: 130px;
  height: 30px;
  background: #409eff;
  border: solid 1px #409eff;
  //   margin-top: 40px;
  margin: 0 0 0 20px;
}
/deep/ .el-upload__tip {
  width: 130px;
}

/deep/ .el-upload-dragger .el-icon-upload {
  font-size: 30px;
  color: #fffeff;
  float: left;
  margin: -10px 3px 16px;
  line-height: 50px;
}

/deep/ .el-upload__text span {
  color: white;
  margin-top: 7px;
  display: inline-block;
}
.divs {
  display: flex;
  justify-content: space-between;
}
</style>