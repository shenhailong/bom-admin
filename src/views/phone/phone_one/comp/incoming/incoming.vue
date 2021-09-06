<template>
  <el-form ref="form" :model="form">
    <h1 class="title"><div>来料质检</div></h1>
    <div class="poty" @click="pushmi"> <i class="el-icon-back"></i> 返回</div>
    <br>
    <div class="flexs">
      <div>
        <el-form-item>
          <el-input v-model="form.name" @change="search"></el-input>
          <!-- <el-button ><i class="el-icon-search"></i></el-button> -->
        </el-form-item>
      </div>
      <div>
        <el-form-item>
          <el-select v-model="form.regions" placeholder="产品编号">
            <el-option
              v-for="(item, index) in list"
              :label="item.productCode"
              :value="item.productCode"
              :key="index"
              @change="productCodeck(index)"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </div>
    </div>
    <div class="flexs">
      <div>
        <el-form-item label="">
          <el-select
            v-model="form.names"
            placeholder="产品名称"
            :disabled="true"
          >
            <el-option
              v-for="(item, index) in lists"
              :label="item.productName"
              :value="item.productName"
              :key="index"
              @change="productCodeck(index)"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="">
          <el-input v-model="form.num" placeholder="质检数量"></el-input>
        </el-form-item>
      </div>
    </div>
    <el-form-item label="">
      <el-input v-model="form.memo" placeholder="质检说明"></el-input>
    </el-form-item>
    <div class="flexs">
      <div>
        <el-upload
          drag
          
          class="upload-demo"
          ref="receiptUpLoad"
          :action="uploadUrl"
          :limit="1"
          :on-change="receiptChange"
          :auto-upload="false"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            <span>质检合格验收</span><em>点击上传</em>
          </div>
        </el-upload>
      </div>
      <br />
      <div>
        <el-upload
          drag
          
          class="upload-demo"
          :auto-upload="false"
          :action="uploadUrl"
          :limit="1"
          :on-change="receiptChange2"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            <span>质检不合格验收</span><em>点击上传</em>
          </div>
        </el-upload>
      </div>
    </div>
    <br>
    <br>
    <div class="btns">
      <el-button style="width:90%"  type="primary" @click="subClick"
        >发送</el-button
      >
    </div>
  </el-form>
</template>
<script>
import { selectAllOmgMaterielQualityAsPage } from "@/api/orderCompMage/OrderMaterialQc";
import { saveOrderCompFile } from "@/api/orderCompMage/AproductionPub";
import { updateOmgMaterielQuality } from "@/api/orderCompMage/OrderMaterialQc";
export default {
  data() {
    return {
      form: {
        name: "SD21-",
        regions: "",
        names: "", 
        num: null, //数量
        memo: "", //备注
        pkOmgMaterielQuality: "",
        failFullname: null, //合格的文件地址
        failName: null, //合格的文件名
        fileFullname: null, //不合格的文件地址
        fileName: null, //不合格的文件名
      },
      list: [], //缓存数据
      lists: [],
      uploadUrl: process.env.BASE_API + "/", // 上传地址
      file_one: { //合格文件
        raw: null,
      },
      file_two: { //不合格文件
        raw: null,
      },
    };
  },
  watch: {
    "form.regions"() {
      //产品搜索
      let jsons = {
        limit: 10,
        page: 1,
        contractNo: this.form.name,
        productCode: this.form.regions,
      };
      selectAllOmgMaterielQualityAsPage(jsons).then((res) => {
        this.lists = res.object;
        this.form.names = this.lists[0].productName;
        this.form.pkOmgMaterielQuality = this.lists[0].pkOmgMaterielQuality;
      });
    },
  },
  methods: {
    search() {
      //合同搜索
      let jsons = {
        limit: 10,
        page: 1,
        contractNo: this.form.name,
      };
      selectAllOmgMaterielQualityAsPage(jsons).then((res) => {
        this.list = res.object;
        // console.log(this.list);
        this.form.regions = this.list[0].productCode;
      });
    },
    receiptChange(file) {
      //文件保存
      console.log(file);
      this.file_one = file;
    },
    receiptChange2(file) {
      // console.log(file); 文件保存
      this.file_two = file;
    },
    pushmi(){
      //返回按钮
      this.$router.go(-1);
    },
    subClick() {
      //提交时数据
      let formData = new FormData();
      formData.append(`file`, this.file_one.raw);
      formData.append(`failfile`, this.file_two.raw);
      formData.append(`constractNo`, this.lists[0].contractNo);
      //  console.log(this.lists[0].contractNo);
      var r = confirm("确定提交？");
      if (r) {
        saveOrderCompFile(formData).then((res) => {
          (this.form.failFullname =
            res.object.SALE_FAIL_PROCPRODUCTION_FULL_NAME),
            (this.form.failName = res.object.SALE_FAIL_PROCPRODUCTION_NAME),
            (this.form.fileFullname = res.object.SALE_PROCPRODUCTION_FULL_NAME),
            (this.form.fileName = res.object.SALE_PROCPRODUCTION_NAME);
          updateOmgMaterielQuality(this.form).then((res) => {
            // console.log();
            location.reload();
          });
        });
      }
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
.flexs /deep/.el-input {
  width: 17.5rem;
}

.el-select-dropdown
  .scroll-opacity.el-scrollbar
  .el-scrollbar__bar.is-vertical {
  opacity: 1; //改为0不显示滚动条
}
/deep/ .el-upload-dragger {
  width: 15rem;
  height: 3rem;
  background: #409eff;
  border: solid 1px #409eff;
}

/deep/ .el-upload-dragger .el-icon-upload {
  font-size: 3rem;
  // color: #C0C4CC;
  color: #fffeff;
  float: left;
  margin: -10px 3px 16px;
  line-height: 50px;
}
/deep/ .el-form-item__label {
  font-size: 0.4rem;
}
/deep/.el-upload__text {
  font-size: 1.2rem;
}
/deep/ .el-upload__text span {
  color: white;
  margin-top: 10px;
  display: inline-block;
}
.flexs {
  display: flex;
  justify-content: space-between;
}
// /deep/.flexs>.el-input{
//   width: 40%;
// }
/deep/.el-input__inner {
  height: 4rem;
}
.title > div {
  width: 25%;
  margin: 0 auto;
}
.btns {
  display: flex;
  justify-content: center;
}
.poty {
  font-size: 1.5rem;
}
</style>