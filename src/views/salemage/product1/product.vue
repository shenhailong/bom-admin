<template>
  <!-- 订单利润-->
  <div>
    <btns @label="label"></btns>
    <div class="icon">
      <i class="el-icon-edit"><span>编辑</span></i>
    </div>
    <!--基础列表界面-->
    <Table
      :columns="columns"
      :select="select"
      :act_btn="act_btn"
      :replace="replace"
      :top_btn="top_btn"
      @onButtonClick="onButtonClick"
    >
    </Table>
    <!--新增修改界面-->
    <Productcontent
      :replace="replace"
      :visiable="content.visiable"
      :title="content.title"
      :action="content.action"
      :updateRow="content.updateRow"
      @close="closeContent"
      @refreshList="queryListData"
    >
    </Productcontent>

    <searchs
      :visiable="visiables"
      @colsed="colsed"
      @search_ts="search_ts"
    ></searchs>
    <!-- 修改回款信息弹框-->
    <el-dialog title="修改回款信息" :visible.sync="dialogVisible" width="30%">
      <el-select v-model="payStatus" placeholder="请选择回款信息">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <!-- <el-button type="primary" @click="dialogVisible = false">确 定</el-button> -->
        <el-button type="primary" @click="sureDialog">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Table from "@/components/viewcomp/Table";
import CommitDialog from "@/components/Commitdingding/CommitDialog";
import Productcontent from "@/views/salemage/product/content";
import ProductQueryDialog from "@/views/salemage/product/queryDialog";
// import { listProduct, addProduct, deleteProductByPks, updateProduct, commitTechnics } from '@/api/salemage/product'
import {
  selectAllPriceInfoAsPage,
  updateProduct,
  updateProductOrderB,
} from "@/api/salemage/product";
import { sendDingMsgByPsndoc } from "@/api/pub/pub";
import { mapGetters } from "vuex";
import searchs from "@/components/search/index"; //搜索
import btns from "@/components/btnselect/index"; //状态按钮

export default {
  name: "saleproduct1",
  components: {
    Table,
    CommitDialog,
    Productcontent,
    ProductQueryDialog,
    searchs,
    btns,
  },
  computed: {
    ...mapGetters(["name", "roles", "userid", "pkCorp"]),
  },
  data() {
    return {
      content: {
        visiable: false, // 内容界面显示控制
        title: "", // 标题
        action: null, // 执行Action
        updateRow: null, // 更新时带过来的temp
      },
      visiables: false, //控制搜索框的显示隐藏
      dialogVisible: false,
      listQuery: {
        //通过分页查询值
        page: 1,
        limit: 10,
      },
      queryDialog: {
        visiable: false,
      },
      pkPsndoc: this.pkPsndoc,
      payStatus: "",
      pkProductOrderB: "",
      options: [
        {
          value: "0",
          label: "未回款",
        },
        {
          value: "1",
          label: "部分回款",
        },
        {
          value: "2",
          label: "完成回款",
        },
      ],
      columns: [
        { prop: "pkProduct", label: "主键", width: "10", primary: true },
        { prop: "customerCode", label: "客户编码", width: "80" },
        { prop: "contractNo", label: "合同编号", width: "80" },
        { prop: "orderSignTime", label: "签订日期", width: "100" },
        { prop: "putoutOutTime", label: "发货日期", width: "180" },
        { prop: "productCode", label: "产品编号", width: "100" },
        { prop: "productName", label: "产品名称", width: "80" },
        { prop: "constractProductNum", label: "订单数量", width: "80" },
        { prop: "taxinclud", label: "税率", width: "80" },

        { prop: "money", label: "订单金额" },
        { prop: "saleMaterialNotTax", label: "销售物料未税金额", width: "80" },
        { prop: "MaterialCostPrices", label: "成本物料未税金额", width: "80" },
        { prop: "xprice", label: "物料利润", width: "80" },
        {
          prop: "saleProductionNotTax",
          label: "销售生产未税金额",
          width: "80",
        },
        { prop: "unitTotalOut", label: "成本生产未税金额", width: "80" },
        { prop: "xprice1", label: "生产利润", width: "80" },
        { prop: "Salestooling", label: "销售制具未税", width: "80" },
        { prop: "Steelmeshcost", label: "治具成本未税", width: "80" },
        { prop: "Toolingprofit", label: "制具利润", width: "80" },
        { prop: "xprice2", label: "合计利润", width: "80" },
        { prop: "pkPsndocShow", label: "业务员", width: "80" },
        { prop: "payStatus", label: "回款信息", width: "80" },
        { prop: "orderType", label: "合同类型", width: "80" },
        { prop: "billState", label: "订单状态", width: "110" },
        { prop: "corpname", label: "客户名称", width: "170" },
      ],
      select: {
        select: selectAllPriceInfoAsPage,
        queryParam: { dr: 0 },
        // 'queryParam': { dr:0,pkPsndoc:36}
      },
      top_btn: [
        {
          name: "搜索",
          code: "search",
        },
      ],
      act_btn: [
        // {
        //   name: '修改',
        //   code: 'UPDATE',
        //   // when: {'technicsState': [20,22]},
        //   action: updateProduct,
        //   btnSize:'mini' ,
        //   typeLess: 'itag',
        //   iconPic: 'el-icon-edit',
        // },
        {
          name: "修改",
          code: "UPDATE1",
          // when: {'technicsState': [20,22]},
          action: null,
          btnSize: "mini",
          typeLess: "itag",
          iconPic: "el-icon-edit",
        },
      ],
      replace: [
        {
          name: "technicsState",
          replace: {
            0: "自由态",
            20: "已申请",
            21: "工艺审核中",
            22: "工艺审核完成",
          },
        },
        {
          name: "billState",
          replace: {
            30: "订单报价中",
            31: "完成订单报价",
            50: "合同签订成功",
            51: "生产中",
          },
        },
        {
          name: "orderType",
          replace: {
            0: "普通合同",
            1: "生产订单",
            2: "OEM",
            3: "DEM",
            4: "贸易模式",
          },
        },
        {
          name: "productionState",
          replace: { 0: "无", 1: "未完成", 2: "已完成" },
        },
        {
          name: "materialSource",
          replace: { 1: "甲方提供", 2: "乙方提供", 3: "部分甲方提供" },
        },
        {
          name: "steelMeshSource",
          replace: { 0: "无", 1: "甲方提供", 2: "乙方提供" },
        },
        {
          name: "payStatus",
          replace: { 0: "未回款", 1: "部分回款", 2: "完成回款" },
        },
        {
          name: "pcbSource",
          replace: { 1: "甲方提供", 2: "乙方提供" },
        },
      ],
      ressl: { dr: 0 },
    };
  },
  created() {},
  methods: {
    label(data) {
      this.ressl = data;
      let newSelect = { select: this.select.select, queryParam: data };
      this.select = newSelect;
    },
    colsed(data) {
      this.visiables = data;
    },
    search_ts(data) {
      //搜索
      this.visiables = false;
      // console.log(data['回款情况']); pkPsndoc: "null"
      let mindata = {
        creationdateBegin: data["开始时间"],
        creationdateEnd: data["结束时间"],
        contractNo: data["合同编号"],
        // productCode: data['产品编码'],
        productName: data["产品名称"],
        customerCode: data["客户编码"],
        productCode: data["产品编码"],
        corpname: data["公司名称"],
        payStatus: data["回款情况"],
        outcreationdateBegin: data["出库开始时间"],
        outcreationdateEnd: data["出库结束时间"],
        // constractPsnname: data['客户名称'],
        // orderType: data['选择类型'][1],
        // orderType:data['合同类型'][0],
        pkPsndocShow: data["业务员"],
        // billState: null,
      };
      this.ressl = mindata;
      this.label(this.ressl);
      // this.select = {
      //   select: this.select.select,
      //   queryParam: mindata,
      // };
    },
    onButtonClick(param) {
      // 监控页面中所有的按钮点击事件
      // 修改
      if (param.btnCode === "UPDATE") {
        this.openContent("修改", param.btnAction);
        this.content.updateRow = param.bindData;
      }
      if (param.btnCode === "UPDATE1") {
        this.dialogVisible = true;
        this.payStatus = param.bindData.payStatus;
        this.pkProductOrderB = param.bindData.pkProductOrderB;
        // this.content.updateRow = param.bindData
      }
      if (param.btnCode === "search") {
        this.visiables = true;
      }
    },

    //确定
    sureDialog() {
      let param = {
        pkProductOrderB: this.pkProductOrderB,
        payStatus: this.payStatus,
      };
      updateProductOrderB(param).then((response) => {
        // console.log(response);
        this.$message({
          message: "修改成功",
        });
        this.queryListData();
        this.dialogVisible = false;
      });
    },
    queryListData(queryParam) {
      // 刷新界面数据
      if (queryParam) {
        let queryDialogParam = {
          productCode: queryParam.productCode,
          pkPsndoc: queryParam.pkPsndoc,
          customShortName: queryParam.customShortName,
          technicsState: queryParam.technicsState,
          creationdateBegin: queryParam.creationdateBegin,
          creationdateEnd: queryParam.creationdateEnd,
          customerCode: queryParam.customerCode,
        };
        let newSelect = {
          select: this.select.select,
          queryParam: queryDialogParam,
        };
        this.select = newSelect;
      } else {
        let newSelect = {
          select: this.select.select,
          queryParam: this.select.queryParam,
        };
        this.select = newSelect;
      }
    },

    openContent(title, action) {
      // 打开内容界面Dialog
      this.content.visiable = true;
      this.content.title = title;
      this.content.action = action;
    },
    closeContent(tempData) {
      // 关闭内容界面Dialog
      this.content.visiable = false;
    },
  },
};
</script>

<style  lang="scss" type="text/scss" scoped>
div {
  font-size: 8px;
}
.icon {
  float: right;
  margin-top: 20px;
  margin-right: 50px;
  color: #409eff;
}
i:hover {
  color: #409eff;
  cursor: pointer;
}
</style>
