<template>
  <div>
    <h1 class="title"><div>成品质检</div></h1>
    <div class="poty" @click="pushmi"> <i class="el-icon-back"></i> 返回</div>
    <br>
    <el-form ref="form" :model="form">
      <div class="flexs">
        <div>
          <el-form-item >
            <el-input v-model="form.name" @change="search"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item >
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
          <el-form-item>
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
          <el-form-item>
            <el-select
              v-model="form.procedureName"
              clearable
              placeholder="工序类型"
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
        </div>
      </div>
      <el-form-item>
        <el-input v-model="form.sequenceNum" placeholder="序列号"></el-input>
      </el-form-item>
      <div class="flexs">
        <div>
          <el-form-item>
            <el-input v-model="form.checkNum" placeholder="检查数量"></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item>
            <el-input v-model="form.passNum" placeholder="通过数量"></el-input>
          </el-form-item>
        </div>
      </div>

      <!-- <el-form-item label="合格率"> 
      <el-input v-model="form.passRate"></el-input> %
    </el-form-item> -->
      <div class="flexs">
        <div>
          <el-upload
            drag
            class="upload-demo"
            :auto-upload="false"
            :action="uploadUrl"
            :limit="1"
            :on-change="receiptChange1"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              <span>质检合格</span><em>点击上传</em>
            </div>
          </el-upload>
        </div>
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
              <span>质检不合格</span><em>点击上传</em>
            </div>
          </el-upload>
        </div>
      </div>
      <br><br>
      <div class="btns">
        <el-button type="primary" @click="onSubmit" style="width:90%" >发送</el-button>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import {
  selectAllOmgBeComeAsPage,
  saveOmgBecomeSubData,
} from "@/api/orderCompMage/OrderQuality";
import { saveOrderCompFile } from "@/api/orderCompMage/AproductionPub";

export default {
  computed: {
    ...mapGetters(["name"]),
  },
  data() {
    return {
      uploadUrl: process.env.BASE_API + "/", // 上传地址
      form: {
        name: "SD21-", //合同编号
        regions: null,
        names: "",
        procedureName: "", //
        sequenceNum: null,//序列号
        checkNum: null, // 检查数量
        passNum: null, //通过数量
        passRate: 0, //通过率
        failFullname: null,//合格的文件路径
        failName: null, //合格文件名
        fileFullname: null, //不合格文件路径
        fileName: null,  //不合格文件名
        pkOmgBecome: null, //主键
        billState: "0", //状态
        creatorShow: null, //创建人
        creationtime: null, //创建时间
      },
      list_one: [],
      list_two: [],
      procedureOptions: [
        // 工序选择options
        { value: "成品", label: "成品" },
        { value: "SMT", label: "SMT" },
        { value: "DIP", label: "DIP" },
        { value: "三防", label: "三防" },
        { value: "组装、测试、老化", label: "组装、测试、老化" },
      ],
      file_one: {
        raw: null,
      },
      file_two: {
        raw: null,
      },
    };
  },
  watch: {
    "form.regions"() {
      //产品搜索
      let jsons = {
        limit: 20,
        page: 1,
        contractNo: this.form.name,
        productCode: this.form.regions,
      };
      selectAllOmgBeComeAsPage(jsons).then((res) => {
        this.list_two = res.object;
        // console.log(this.list_two);
        this.form.creatorShow = this.name;
        this.form.names = this.list_two[0].productName;
        this.form.pkOmgBecome = this.list_two[0].pkOmgBecome;

        this.form.pkOmgMaterielQuality = this.list_two[0].pkOmgMaterielQuality;
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
      selectAllOmgBeComeAsPage(jsons).then((res) => {
        // console.log(res);
        this.list_one = res.object;
        console.log(res.object.length);
        if (res.object.length == 0) {
          this.form.regions = "";
          this.form.names = "";
        } else {
          this.form.regions = res.object[0].productCode;
        }
      });
    },
    receiptChange1(file) {
      //合格文件上传
      this.file_one = file;
    },
    receiptChange2(file) {
      //不合格文件上传
      this.file_two = file;
    },
    dateFormat(dateData) {
      //对日期进行的处理
      var date = new Date(dateData);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      const time = y + "-" + m + "-" + d;
      return time;
    },
    onSubmit() {
      //上传提交
      let formData = new FormData();
      formData.append(`file`, this.file_one.raw);
      console.log(formData);
      // passNum /checkNum
      this.form.passRate = this.toPercent(
        this.form.passNum / this.form.checkNum
      );
      // console.log(this.form.passRate);
      let dates = new Date();
      this.form.creationtime = this.dateFormat(dates);
      formData.append(`failfile`, this.file_two.raw);
      formData.append(`constractNo`, this.name);
      var r = confirm("确定提交？");
      if (r) {
        saveOrderCompFile(formData).then((res) => {
          (this.form.failFullname =
            res.object.SALE_FAIL_PROCPRODUCTION_FULL_NAME),
            (this.form.failName = res.object.SALE_FAIL_PROCPRODUCTION_NAME),
            (this.form.fileFullname = res.object.SALE_PROCPRODUCTION_FULL_NAME),
            (this.form.fileName = res.object.SALE_PROCPRODUCTION_NAME);
          saveOmgBecomeSubData(this.form).then(() => {
            location.reload();
          });
        });
      }
    },
    toPercent(point) {
      //计算合格率
      var str = Number(point * 100).toFixed(1);
      str += "%";
      return str;
    },
    pushmi(){
      //返回按钮
      this.$router.go(-1);
    }
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
.btns{
  display: flex;
  justify-content: center;
}
.poty{
  font-size: 1.5rem;
}
</style>