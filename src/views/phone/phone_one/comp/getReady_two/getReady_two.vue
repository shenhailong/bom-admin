<template>
  <!-- 备料阶段 -->
  <div>
    <h1 class="title">
      <div>{{ $route.query.name }} 备料</div>
    </h1>
    <div class="poty" @click="pushmi"><i class="el-icon-back"></i> 返回</div>
    <br />
    <el-form ref="form" :model="form">
      <div class="flexs">
        <div>
          <el-form-item>
            <el-input v-model="form.name" @change="search"></el-input>

          </el-form-item>
        </div>
        <div>
          <el-form-item>
            <el-select v-model="form.regions" placeholder="产品编号">
              <el-option
                v-for="(item, index) in list_one"
                :label="item.productCode"
                :value="item.productCode"
                :key="index"
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
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
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
              <span>文件上传</span><em>点击上传</em>
            </div>
          </el-upload>
          <!-- <el-form-item>
            <el-input
              v-model="form.sequenceNum"
              placeholder="字段序号"
            ></el-input>
          </el-form-item> -->
        </div>
      </div>

      <!-- <el-form-item label="工序名称">
      <el-select v-model="form.procedureName" clearable placeholder="请选择">
        <el-option
          v-for="item in procedureOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item> -->
      <div class="flexs">
        <div>
          <!-- <el-form-item>
            <el-input v-model="form.putinNum" placeholder="入库数量"></el-input>
          </el-form-item> -->
        </div>
        <div>
          
        </div>
      </div>
      <div class="btns">
        <el-button type="primary" @click="onSubmit" style="width: 90%"
          >发送</el-button
        >
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
  selectMaterielWareBByHPrimary,
  saveMaterielWareB,
} from "@/api/orderCompMage/OrderRepertory";
import { parseTime } from "@/utils/viewCompUtil";

import { selectAllMaterielPutinWareAsPage } from "@/api/orderCompMage/OrderRepertory";

import { saveOrderCompFile } from "@/api/orderCompMage/AproductionPub";
export default {
  computed: {
    ...mapGetters(["name"]),
  },
  data() {
    return {
      uploadUrl: process.env.BASE_API + "/", // 上传地址
      form: {
        name: "SD21-",
        regions: null,
        pkOmgPrduFinishPutin: null, //主键
        pkOmgWareHouse: null, //主键
        finishNum: 0, //出库数量
        creationtime: null, //创建时间
        procedureName: null, //产品名称
        creator: 43, 
        billState: "0",
        putinNum: null, //入库数量
        sequenceNum: null, //序号,
        creatorShow: null, //创建人
        fileName: null, //文件名
        fileFullname: null, //文件地址
      },
      pkOmgPutinWare: null,
      list_one: [],
      list_two: [],
      list_mini: [],
      // procedureOptions: [
      //   // 工序选择options
      //   { value: "成品", label: "成品" },
      //   { value: "SMT", label: "SMT" },
      //   { value: "DIP", label: "DIP" },
      //   { value: "三防", label: "三防" },
      //   { value: "组装、测试、老化", label: "组装、测试、老化" },
      // ],
      file: {
        raw: null,
      },
      sopri:null
    };
  },
  methods: {
    search() { 
      //合同搜素
      let jsons = {
        limit: 10,
        page: 1,
        contractNo: this.form.name,
      };
      this.form.creatorShow = this.name;
      selectAllMaterielPutinWareAsPage(jsons).then((res) => {
        this.list_one = res.object;
        this.form.regions = res.object[0].productCode;
        this.form.pkOmgPrduFinishPutin = res.object[0].pkOmgPrduFinishPutin;

        this.form.finishNum = res.object[0].finishNum;
      });
    },
    receiptChange1(file) {
      //文件保存
      this.file = file;
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
      // 上传 提交数据
      let dates = new Date();
      this.form.creationtime = this.dateFormat(dates);
      let formData = new FormData();
      formData.append(`file`, this.file.raw);
      formData.append(`constractNo`, this.form.name);
      this.form.procedureName = this.$route.query.name;
      var r = confirm("确定提交？");
      if (r) {
         saveOrderCompFile(formData).then((datas) => {
                // console.log(datas);
                this.sopri.fileFullname =
                  datas.object.SALE_PROCPRODUCTION_FULL_NAME
                this.sopri.fileName = datas.object.SALE_PROCPRODUCTION_NAME;
                // console.log(this.sopri);
                saveMaterielWareB(this.sopri).then((res)=>{
                    location.reload();
                })
        });
      }
    },
    pushmi() {
      //返回按钮
      this.$router.go(-1);
    },
  },
  watch: {
    name() {
      this.form.creatorShow = this.name;
    },
    "form.regions"() {
      let jsons = {
        limit: 20,
        page: 1,
        contractNo: this.form.name,
        productCode: this.form.regions,
      };
      let formData = new FormData();
      formData.append(`file`, this.file.raw);
      formData.append(`constractNo`, this.form.name);
      selectAllMaterielPutinWareAsPage(jsons).then((res) => {
        this.list_two = res.object;
        this.form.names = this.list_two[0].productName;
        this.form.pkOmgBecome = this.list_two[0].pkOmgBecome;
        this.form.pkOmgMaterielQuality = this.list_two[0].pkOmgMaterielQuality;
        let pkOmgPutinWare = res.object[0].pkOmgPutinWare;
        let minjson = {
          limit: 10,
          page: 1,
          pkOmgPutinWare: pkOmgPutinWare,
        };

        selectMaterielWareBByHPrimary(minjson).then((ress) => {
          // this.list_mini = ress.object
          for (let i of ress.object) {
            if (i.procedureName == this.$route.query.name) {
              // console.log(i);
              // this.list_mini.push(i)

              this.sopri = {
                fileFullname: null,
                fileName: null,
                pkOmgPutinWare: i.pkOmgPutinWare,
                pkOmgPutinWareB: i.pkOmgPutinWareB,
                creationtime: i.creationtime,
                overTime: parseTime(new Date()),
                billState: "0",
                creator: i.creator,
                procedureName: i.procedureName,
              };
             
            }
          }
        });
      });
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