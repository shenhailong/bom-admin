<template>
  <el-dialog
    :title="'账户存储'"
    :visible.sync="contentVisiable"
    @close="closeDialog"
    width="60%"
  >
    <div class="min">
      <div>客户名称 :{{ form.corpname }}</div>

      <div>客户编号:{{ form.customerCode }}</div>
    </div>

    <div class="min min1">
      <div>销售员:{{ form.pkPsndocShow }}</div>

      <div>预存余额:{{ form.remainingNum }}</div>
    </div>

    <el-form ref="form" :model="form" label-width="80px">
      <div class="min min1">
        <div>
          <div>预存日期</div>
          <el-date-picker
            v-model="form.date1"
            type="datetime"
            placeholder="选择日期时间"
          >
          </el-date-picker>
        </div>
        <div>
          <div>预存金额</div>
          <el-input v-model="form.name"></el-input>
        </div>
      </div>
      <div class="min min1">
        <div>
          <div>预存单号</div>
          <el-input v-model="form.names"></el-input>
        </div>
        <div>
          <div>备注</div>
          <el-input v-model="form.memo"></el-input>
        </div>
      </div>
      <div class="min min1">
        <div>回款类型：预存</div>
        <div>
          <el-upload
            drag
            class="upload-demo"
            ref="BOMUpload"
            :action="uploadUrl"
            :file-list="BOMFileList"
            :limit="1"
            :on-change="BOMFileChange"
            :auto-upload="false"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">文件上传</div>
            <!-- <div class="el-upload__tip" slot="tip">
              1: 上传文件大小不得超过200M
            </div> -->
          </el-upload>
        </div>
      </div>
      <br />
      <br />
      <div style="height: 40px">
        <div style="float: right">
          <el-button @click="closeDialog">取消</el-button>
          <el-button type="primary" @click="onSubmit">保存</el-button>
        </div>
      </div>
    </el-form>
  </el-dialog>
</template>
<script>
import {
  saveFinancePaymen,
  saveFinancePaymentFile,
} from "@/api/financing/flans";
export default {
  props: ["storageshow", "mindata"],
  data() {
    return {
      contentVisiable: false,
      uploadUrl: process.env.BASE_API + "/", // 上传地址
      BOMFileList: [],
      form: {},//提交数据
      file: { // 图片
        raw: null,
      },
    };
  },
  watch: {
    storageshow() {
      // 
      this.contentVisiable = this.storageshow; //保存到组件数据
      this.form = this.mindata;
    }
  },
  methods: {
    closeDialog() {
      this.$emit("close");
    },
    BOMFileChange(file, fileList) {
      // console.log(file);
      this.file = file; //文件保存
    },
    onSubmit() {
      // 提交接口
      if (this.form.date1 == null) {
        // console.log(this.form.date1);
        let date = new Date();
        this.form.date1 = date;//时间的处理 当前的时间
      }
      if(this.form.name == null){
        this.form.name = 0 //金额不可以为null
      }
      let formData = new FormData();
      let datas = {
        pkCustomer: this.form.pkCustomer,//客户主键
        paymentType: 1, //回款类型
        paymentTime: this.dateFormat(this.form.date1),
        paymentMoney: this.form.name, //预存金额
        paymentNo: this.form.names,//预存单号
        memo: this.form.memo,//备注
        fileName: null,//图片名字
        fileFullname: null,//路径
      };
      formData.append(`file`, this.file.raw);
      formData.append("customerCode", this.form.customerCode);
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
          saveFinancePaymentFile(formData).then((res) => { //保存图片
            // console.log(res.object.SALE_FILE_FA_FULL_NAME,res.object.SALE_FILE_FA_NAME);
            datas.fileName = res.object.SALE_FILE_FA_FULL_NAME;
            datas.fileFullname = res.object.SALE_FILE_FA_NAME;
            saveFinancePaymen(datas).then((res) => { //保存文件
              this.$emit("close");
            });
          });
        });
    },
    dateFormat(dateData) {
      //时间的处理
      var date = new Date(dateData);
      // console.log(date);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      // console.log(date.getHours());
      var p = date.getHours();
      var o = date.getMinutes();
      var g = date.getSeconds();
      const time = y + "-" + m + "-" + d + "/" + p + ":" + o + ":" + g;
      return time;
    },
  },
};
</script>
<style lang="scss" type="text/scss" scoped>
.min {
  display: flex;
  justify-content: space-around;
}

.min > div {
  display: flex;
  width: 40%;
  line-height: 200%;
}
.min1 {
  margin-top: 30px;
}
.min > div > div {
  margin-right: 4%;
}
.el-input {
  width: 50%;
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
  margin-top: 40px;
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
</style>