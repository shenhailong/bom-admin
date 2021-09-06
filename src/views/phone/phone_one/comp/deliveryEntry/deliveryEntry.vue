<template>
  <!-- 移动端出库 -->
  <div>
    <h1 class="title">
      <!-- {{$store.getters.name}} -->
      <div>{{ $route.query.name }} 出库</div>
      <!-- <div>{{ $route.query.pkOmgPrduFinishPutoutB}} 出库</div> -->
    </h1>
    <div class="poty" @click="pushmi"><i class="el-icon-back"></i> 返回</div>
    <br />
    <el-form ref="form" :model="form">
      <div class="flexs" v-if="$route.query.show != 2">
        <div>
          <el-form-item>
            <el-input v-model="form.region" @change="iscode"></el-input>
            <!-- <el-button @click="iscode"><i class="el-icon-search"></i></el-button> -->
          </el-form-item>
        </div>
        <div>
          <el-form-item label="">
            <el-select v-model="form.regions" placeholder="产品编号">
              <el-option
                v-for="(item, index) in form.list_two"
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
      <div class="flexs" v-if="$route.query.show != 2">
        <div>
          <el-form-item label="">
            <el-select
              v-model="form.regions1"
              placeholder="产品名称"
              :disabled="true"
            >
              <el-option
                :label="form.list_three.productName"
                :value="form.list_three.productName"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
        <div>
          <el-input v-model="$store.getters.name" :disabled="true"></el-input>
        </div>
      </div>
      <div>
        <el-form-item label="">
          <el-input
            v-model="subInfoContent.sequenceNum"
            placeholder="序列号段"
          ></el-input>
        </el-form-item>
      </div>

      <div class="flexs">
        <div>
          <el-input
            v-model="subInfoContent.finishNum"
            placeholder="累计出库数量"
            :disabled="true"
          ></el-input>
        </div>
        <div>
          <el-input
            v-model="subInfoContent.constractProductNum"
            placeholder="订单数量"
            :disabled="true"
          ></el-input>
        </div>
      </div>
      <br />
      <el-form-item label="">
        <!-- <el-input v-model="subInfoContent.trackingNumber" :disabled="true"></el-input> -->
        <el-input
          v-model="subInfoContent.trackingNumber"
          placeholder="快递单号"
        ></el-input>
      </el-form-item>
      <div class="flexs">
        <div>
          <el-form-item label="">
            <el-input
              v-model="subInfoContent.putoutNum"
              placeholder="出库数量"
            ></el-input>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="">
            <el-select
              v-model="subInfoContent.shippingMethod"
              clearable
              placeholder="送货方式"
            >
              <el-option
                v-for="item in procedureOptions1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>

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
             :accept="'image/*'" 
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              <span>文件</span><em>点击上传</em>
            </div>
          </el-upload>
        </div>
        <div>
          <el-upload
            drag
            class="upload-demo"
            :auto-upload="false"
            :action="uploadUrl"
             :accept="'image/*'" 
            :limit="1"
            :on-change="receiptChange2"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              <span>出库单回执文件</span><em>点击上传</em>
            </div>
          </el-upload>
        </div>
      </div>
      <br />
      <br />
      <div class="btns">
        <el-button style="width: 90%" type="primary" @click="subClick"
          >发送</el-button
        >
      </div>
      <br />
      <br />
      <br />
      <br />
    </el-form>
  </div>
</template>
<script>
// import { selectOrderInfoAsRef } from "@/api/orderCompMage/orderCompMage";
import { mapGetters } from "vuex";
import {
  selectAllOmgPrduFinishPutoutAsPage,
  saveOmgPrduFinishPutoutSubData,
} from "@/api/orderCompMage/OrderCome";
// import { saveOrderCompFile } from "@/api/orderCompMage/AproductionPub";
import { saveOrderPutoOutImage } from "@/api/orderCompMage/AproductionPub";
import { parseTime } from "@/utils/viewCompUtil";
export default {
  components: {
    ...mapGetters(["name"]),
  },
  data() {
    return {
      form: {
        region: "SD21-",
        regions: "",
        regions1: "",
        list_one: [],
        list_two: [],
        list_three: [],
      },
      file_one: {
        raw: null,
        fileName: null,
      },
      file_two: {
        raw: null,
        fileName: null,
      },
      uploadUrl: process.env.BASE_API + "/", // 上传地址
      procedureOptions: [
        // 工序选择options
        { value: "成品", label: "成品" },
        { value: "SMT", label: "SMT" },
        { value: "DIP", label: "DIP" },
        { value: "三防", label: "三防" },
        { value: "组装、测试、老化", label: "组装、测试、老化" },
      ],
      procedureOptions1: [
        // 工序选择options
        { value: "0", label: "快递" },
        { value: "1", label: "闪送" },
        { value: "2", label: "货拉拉" },
        { value: "3", label: "公司配送" },
        { value: "4", label: "自提" },
      ],
      subInfoContent: {
         outImgName: null,
        outImgUrl: null,
        receiptImgUrl: null,
        receiptImgName: null,
        pkOmgPrduFinishPutoutB: null, // 成品出库子表主键
        pkOmgPrduFinishPutout: null, // 成品出库主表主键
        billState: "0", // 单据状态
        procedureName: "", // 工序类型
        sequenceNum: "", // 序列号段
        putoutNum: "", // 出库数量
        finishNum: "", // 累计出库数量
        fileName: "", // 文件名称
        fileFullname: "", // 文件全名称
        chargePsn: "", // 经办人
        chargeTime: "", // 经办时间
        creator: null, // 创建人
        creatorShow: "", // 创建人
        shippingMethod: "", //出货方式
        trackingNumber: "", //订单号
        receiptName: "", //回执单名称
        receiptFullname: "", //回执单路径
        creationtime: null,
        dr: 0, // 删除标志
      },
    };
  },
  watch: {
    "form.regions"() {
      //查找产品
      let jsons = {
        dr: 0,
        limit: 20,
        page: 1,
        productCode: this.form.regions,
        contractNo: this.form.region,
      };
      selectAllOmgPrduFinishPutoutAsPage(jsons).then((res) => {
        this.form.regions1 = res.object[0].productName;
        this.subInfoContent.pkOmgPrduFinishPutoutB =
          res.object[0].pkOmgPrduFinishPutoutB;
        this.subInfoContent.pkOmgPrduFinishPutout =
          res.object[0].pkOmgPrduFinishPutout;
        this.subInfoContent.finishNum = res.object[0].finishNum;
        this.subInfoContent.constractProductNum =
          res.object[0].constractProductNum;
      });
    },
  },
  methods: {
    pushmi() {
      this.$router.go(-1);
    },
    subClick() {
      //确定按钮
      //文件上传
      let formData = new FormData();
      formData.append("file", this.file_one.raw);
      formData.append("failfile", this.file_two.raw);
      formData.append(`constractNo`, this.form.region);
      this.subInfoContent.procedureName = this.$route.query.name;
      //  console.log(this.form.procedureName);
      // console.log(formData);
      //-------------
      var r = confirm("确定提交？");
      if (r == true) {
        saveOrderPutoOutImage(formData).then((response) => {
          // 文件提交
   
          this.subInfoContent.pkOmgPrduFinishPutoutB = this.$route.query.pkOmgPrduFinishPutoutB;
          this.subInfoContent.fileUrl = response.object.outImgUrl
            this.subInfoContent.receiptUrl  = response.object.receiptImgUrl
            this.subInfoContent.fileName =response.object.outImgName // 上传文件名称
      

            this.subInfoContent.receiptName = response.object.receiptImgName
          this.subInfoContent.creationtime = parseTime(new Date());
          saveOmgPrduFinishPutoutSubData(this.subInfoContent).then((res) => {
            //内容提交
            // location.reload();
          });
        });
      }
    },
    iscode() {
      // 查找产品
      let jsons = {
        dr: 0,
        limit: 20,
        page: 1,
        contractNo: this.form.region,
      };
      selectAllOmgPrduFinishPutoutAsPage(jsons).then((res) => {
        // console.log(res);
        this.form.list_two = res.object;
        this.form.regions = res.object[0].productCode;
        this.form.regions1 = res.object[0].productName;
      });
    },
    receiptChange(file) {
      //文件
      this.file_one.raw = file.raw;
      // console.log(this.file_one.raw);
    },
    receiptChange2(file) {
      //文件
      this.file_two.raw = file.raw;
      // console.log(this.file_two.raw);
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