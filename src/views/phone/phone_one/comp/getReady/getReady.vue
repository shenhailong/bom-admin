<template>
  <!-- 库房备料 -->
  <el-form ref="form" :model="form">
    <h1 class="title"><div> {{$route.query.name}} 库房备料 </div></h1>
        <div class="poty" @click="pushmi"><i class="el-icon-back"></i> 返回</div>
        <br>
    <div class="flexs">
      <div>
        <el-form-item label="" class="flexs">
          <el-input v-model="form.name" @change="search"></el-input>
          <!-- <el-button @click="search"><i class="el-icon-search"></i></el-button> -->
        </el-form-item>
      </div>
      <div>
        <el-form-item label="" class="flexs">
          <el-select v-model="form.regions" placeholder="产品编号">
            <el-option
              v-for="(item, index) in list_one"
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
              v-for="(item, index) in list_two"
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
        <el-upload
          drag
          class="upload-demo"
          ref="FileUpLoad"
          :action="uploadUrl"
          :limit="1"
          :on-change="upFileChange"
          :auto-upload="false"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text"><span>文件</span><em>点击上传</em></div>
        </el-upload>
      </div>
    </div>

    <div class="btns">
      <el-button type="primary" @click="onSubmit" style="width:90%">保存上传</el-button>
    </div>
  </el-form>
</template>
<script>
import { selectAllMaterielWareHouseAsPage } from "@/api/orderCompMage/OrderWarehouse";
import { saveOrderCompFile } from "@/api/orderCompMage/AproductionPub";
import { updateMaterielWareHouse } from "@/api/orderCompMage/OrderWarehouse";
export default {
  data() {
    return {
      uploadUrl: process.env.BASE_API + "/", // 上传地址
      form: {
        name: "SD21-",
        regions: "",
        pkOmgWareHouse: null,
      },
      list_one: [],
      list_two: [],
      file: {
        raw: null,
      },
    };
  },
  watch: {
    "form.regions"() {
      //搜索产品
      let jsons = {
        limit: 20,
        page: 1,
        contractNo: this.form.name,
        productCode: this.form.regions,
      };
      selectAllMaterielWareHouseAsPage(jsons).then((res) => {
        this.list_two = res.object;
        this.form.names = this.list_two[0].productName;
        this.form.pkOmgWareHouse = this.list_two[0].pkOmgWareHouse;
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
      selectAllMaterielWareHouseAsPage(jsons).then((res) => {
        this.list_one = res.object;
        this.form.regions = res.object[0].productCode;
      });
    },
    upFileChange(file) {
      //文件保存
      this.file = file;
    },
     pushmi() {
       //返回按钮
      this.$router.go(-1);
    },
    onSubmit() {
      //提交数据
      let formData = new FormData(); //文件数据
      formData.append(`file`, this.file.raw);
      formData.append(`constractNo`, this.form.name);
      var r = confirm("确定提交？"); 
      if (r) {
        saveOrderCompFile(formData).then((response) => {
          this.form.fileName = response.object.SALE_PROCPRODUCTION_NAME;
          this.form.fileFullname =
            response.object.SALE_PROCPRODUCTION_FULL_NAME;
          updateMaterielWareHouse(this.form).then(() => {
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