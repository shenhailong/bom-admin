<template>
  <!-- 移动端出库编辑 -->
  <div>
    <h1 class="title">
      <div>{{ $route.query.name }}</div>
    </h1>
    <div class="poty" @click="pushmi"><i class="el-icon-back"></i> 返回</div>
    <br />
    <el-form ref="form" :model="form">
      <div class="flexs">
        <div>
          <el-form-item>
            <el-input v-model="form.region" @change="iscode"></el-input>
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
      <div class="flexs">
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
        <div></div>
      </div>
    </el-form>
    <el-table :data="list" border style="width: 100%">
      <el-table-column prop="sequenceNum" label="序列号" > </el-table-column>
        <el-table-column prop="操作栏" >
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small"
            >编辑</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
// import { selectOrderInfoAsRef } from "@/api/orderCompMage/orderCompMage";
import {
  selectAllOmgPrduFinishPutoutAsPage,
  saveOmgPrduFinishPutoutSubData,
  selectAllOmgPrduFinishPutoutSubDataAsPage,
} from "@/api/orderCompMage/OrderCome";

import { saveOrderCompFile } from "@/api/orderCompMage/AproductionPub";

export default {
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
      list: [],
      file_one: {
        raw: null,
        fileName: null,
      },
      file_two: {
        raw: null,
        fileName: null,
      },
      uploadUrl: process.env.BASE_API + "/", // 上传地址
      procedureOptions1: [
        // 工序选择options
        { value: "0", label: "快递" },
        { value: "1", label: "闪送" },
        { value: "2", label: "货拉拉" },
        { value: "3", label: "公司配送" },
        { value: "4", label: "自提" },
      ],
      subInfoContent: {
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
        dr: 0, // 删除标志
      },
    };
  },
  watch: {
    "form.regions"() {
      //产品搜索
      let jsons = {
        dr: 0,
        limit: 20,
        page: 1,
        contractNo: this.form.region,
        productCode: this.form.regions,
      };
      selectAllOmgPrduFinishPutoutAsPage(jsons).then((res) => {
        this.form.regions1 = res.object[0].productName;
        this.subInfoContent.pkOmgPrduFinishPutoutB =
          res.object[0].pkOmgPrduFinishPutoutB;
        this.subInfoContent.pkOmgPrduFinishPutout =
          res.object[0].pkOmgPrduFinishPutout;
        let pro = {
          page: 1,
          limit: 20,
          pkOmgPrduFinishPutout: res.object[0].pkOmgPrduFinishPutout,
        };
        selectAllOmgPrduFinishPutoutSubDataAsPage(pro).then((res) => {
            console.log(res);
          this.list = res.object;
        });
      });
    },
  },
  methods: {
    handleClick(row) {
        console.log(row.procedureName);
        let name =row.procedureName
        this.$router.push({path:'deliveryEntry',query:{name:name,pkOmgPrduFinishPutoutB:row.pkOmgPrduFinishPutoutB,show:2}}) 
    },
    pushmi() {
      this.$router.go(-1);
    },
    iscode() {
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