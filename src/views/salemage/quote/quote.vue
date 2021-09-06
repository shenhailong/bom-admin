<template>
  <div>
    <div class="titles_style" @click.capture="bill($event)">
      <el-button size="mini" type="primary" plain>报价已完成</el-button>
      <el-button size="mini" type="primary" plain>报价未完成</el-button>
      <!-- <div></div> -->
    </div>
    <searchs
      :visiable="visiables"
      @colsed="colsed"
      @search_ts="search_ts"
    ></searchs>
    <div class="icon">
      <i class="el-icon-bell"><span>完成报价</span></i>
      <i class="el-icon-phone-outline"><span>报价</span></i>
      <i class="el-icon-view"><span>查看</span></i>
      <!-- <i class="el-icon-s-promotion"><span>查看流程</span></i> -->
      <i class="el-icon-collection"><span>查看主题</span></i>
    </div>
    <!-- 搜索 -->
    <div style="padding: 20px">
      <!-- <el-cascader
        size="small"
        v-model="value"
        :options="options"
        placeholder="请选择类型"
      ></el-cascader>
      <el-button size="small" type="primary" @click="cha">搜索</el-button> -->
    </div>
    <!--基础列表界面-->
    <Table
      :columns="columns"
      :select="select"
      :top_btn="top_btn"
      :act_btn="act_btn"
      :replace="replace"
      @onButtonClick="onButtonClick"
    >
    </Table>
    <!--新增修改界面-->
    <!-- <Salequotecontent
      :replace="replace"
      :visiable="content.visiable"
      :title="content.title"
      :action="content.action"
      :updateRow="content.updateRow"
      @close="closeContent"
    >
    </Salequotecontent> -->
    <Salequotecontents
      :replace="replace"
      :visiable="content.visiable"
      :title="content.title"
      :action="content.action"
      :updateRow="content.updateRow"
      @close="closeContent"
      @queryListData="queryListData"
    >
    </Salequotecontents>
    <!--查询模板界面-->
    <ProductQueryDialog
      :visiable="queryDialog.visiable"
      @close="closeQueryDialog"
      @refreshList="queryListData"
    >
    </ProductQueryDialog>

    <!--流程图Dialog-->
    <FlowDialog
      :title="flowImageData.title"
      :visiable="flowImageData.visiable"
      :flowPrice="flowImageData.flowPrice"
      @close="closeFlowImageDialog()"
    ></FlowDialog>

    <!-- 查看主题弹窗 -->
    <!-- <el-dialog :visible.sync="centerDialogVisible" width="48%" @closed="handleClose">
      <div>
        <el-table
          :data="siteRecharge"
          height="450"
          :cell-style="{ padding: '1px' }"
          :cell-class-name="yellowBg"
          style="width: 100%"
        >
          <el-table-column prop="zong" label="发表时间" width="180">
            <template slot-scope="scope">
              <span> {{ scope.row.zong }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="content" label="评论内容" align="left">
            <template slot-scope="scope">
              <div v-html="scope.row.content"></div>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.sort == '0'"
                class="el-icon-top"
                @click="handleClick(scope.row)"
                type="text"
                size="small"
              ></el-button>
              <el-button
                v-if="scope.row.sort == '1'"
                class="el-icon-bottom"
                @click="handleClick1(scope.row)"
                type="text"
                size="small"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    
      <div class="iconRepert">
        <el-button
          v-if="this.showx == 0"
          class="showDiv"
          size="mini"
          type="primary"
          @click="showDiv"
          >开启留言</el-button
        >
        <el-button
          v-if="this.showx == 1"
          class="closeDiv"
          size="mini"
          type="info"
          @click="closeDiv"
          >关闭留言</el-button
        >
      </div>
      <div v-if="this.showx == 1">
        <div style="padding: 15px 0">
          <el-input
            :rows="5"
            :autosize="{ minRows: 5, maxRows: 10 }"
            type="textarea"
            v-model="textarea1"
          ></el-input>
        </div>
        <div style="width: 100%; padding: 15px">
          <div class="btnQ">
            <span class="bq" @click="qreport">取消</span>
          </div>
          <div class="btnF">
            <span class="bf" @click="report">发表</span>
          </div>
        </div>
      </div> -->
      <!-- <div slot="footer" class="dialog-footer">
	          <el-button @click="centerDialogVisible = false">取 消</el-button>
	          <el-button type="primary" @click="centerDialogVisible = true">确定</el-button>
	      </div>
    </el-dialog> -->
    <drawer :drawer="drawer" @closer="drawers" :quto='siteRecharge' />
  </div>
</template>

<script>
import Table from "@/components/viewcomp/Table";
// import Salequotecontent from "@/views/salemage/quote/content";
import ProductQueryDialog from "@/views/salemage/product/queryDialog";
import FlowDialog from "@/views/dashboard/components/FlowDialog";
import searchs from "@/components/search/index";
import {
  listSaleQuote,
  updateSaleQuote,
  overProccessSaleQupte,
  startRequoteProccess,
} from "@/api/salemage/salequote";
import { findFlowImage } from "@/api/flowprocess/flowprocess";
import {
  insertOrderSaleStartB,
  selectAllOrderSaleStartB,
  updateOrderSaleStartB,
} from "@/api/orderCompMage/orderStart";
import { updateSaleQuotes, saveMatterFile } from "@/api/salemage/salequote";
import { updateBatchProduceQuoteB } from "@/api/produce/quote";
import { updatePurchaseQuoteFunc } from "@/api/purchase/quote";
import { initReplaceAddData } from "@/utils/viewCompUtil";
import Salequotecontents from "@/views/salemage/quote/content/index";
import drawer from '@/components/newtab/item/drawer'  //消息中心


export default {
  name: "salequote",
  inject: ["reload"],
  components: {
    Table,
    // Salequotecontent,
    ProductQueryDialog,
    FlowDialog,
    searchs,
    Salequotecontents,
    drawer,
  },
  data() {
    return {
        drawer: false,//消息显示隐藏
      visiables: false, //控制搜索框的显示隐藏
      flowImageData: {
        visiable: false,
        flowPrice: "",
        title: "流程图",
      },
      content: {
        visiable: false, // 内容界面显示控制
        title: "", // 标题
        action: null, // 执行Action
        updateRow: null, // 更新时带过来的temp
      },
      viewDefaultBillState: "",
      
      siteRecharge: [], //主题列表
      saleTheme: "", //主题
      pkProductOrderB: "", //添加主题ID
      showx: 0, //控制评论按钮
      centerDialogVisible: false, //弹窗
      textarea1: "", //评论内容
      queryDialog: {
        visiable: false,
      },
      query: {},
      options: [
        {
          value: "全部显示",
          label: "全部显示",
          children: [
            {
              value: "0",
              label: "全部显示",
            },
          ],
        },
        {
          value: "订单类型",
          label: "订单类型",
          children: [
            {
              value: "0",
              label: "普通合同",
            },
            {
              value: "1",
              label: "生产订单",
            },
            {
              value: "2",
              label: "OEM",
            },
            {
              value: "3",
              label: "DEM",
            },
            {
              value: "4",
              label: "贸易模式",
            },
          ],
        },
        {
          value: "PCB来源",
          label: "PCB来源",
          children: [
            {
              value: "0",
              label: "无",
            },
            {
              value: "1",
              label: "甲方提供",
            },
            {
              value: "2",
              label: "乙方提供",
            },
          ],
        },
        {
          value: "钢网来源",
          label: "钢网来源",
          children: [
            {
              value: "0",
              label: "无",
            },
            {
              value: "1",
              label: "甲方提供",
            },
            {
              value: "2",
              label: "乙方提供",
            },
          ],
        },
        {
          value: "物料类型",
          label: "物料类型",
          children: [
            {
              value: "0",
              label: "自由态",
            },
            {
              value: "1",
              label: "加工",
            },
            {
              value: "2",
              label: "OEM",
            },
            {
              value: "3",
              label: "ODM",
            },
            {
              value: "4",
              label: "物料",
            },
          ],
        },
        {
          value: "单据状态",
          label: "单据状态",
          children: [
            {
              value: "0",
              label: "自由态",
            },
            {
              value: "1",
              label: "报价流程进行中",
            },
            {
              value: "2",
              label: "已认领",
            },
            {
              value: "3",
              label: "采购报价完成",
            },
            {
              value: "4",
              label: "工艺审核完成",
            },
            {
              value: "5",
              label: "生产报价完成",
            },
            {
              value: "6",
              label: "销售报价完成",
            },
          ],
        },
      ],
      labe: "",
      value: [],
      ressl:{dr:0,billState: null},
      columns: [
        { prop: "pkSaleQuote", label: "主键", width: "10", primary: true },
        { prop: "serial", label: "流水号", width: "80" },
        { prop: "customerCode", label: "客户编号", width: "90" },
        { prop: "productCode", label: "产品编号", width: "120" },
        // {prop: 'productName', label: '产品名称', width: '120', fixedLeft: true},
        { prop: "productName", label: "产品名称", width: "120" },
        { prop: "productNum", label: "订单数量", width: "80" },
        { prop: "taxinclud", label: "税率", width: "60" },
        { prop: "aprice", label: "产品单价", width: "90" },
        { prop: "allprice", label: "产品总价", width: "90" },
        { prop: "orderType", label: "订单类型", width: "80" },
        { prop: "pkPsndocShow", label: "业务员", width: "90" },
        { prop: "billState", label: "单据状态", width: "100" },
        { prop: "productModel", label: "产品型号", width: "120" },
        //Intaxprice
        { prop: "materialSource", label: "物料来源", width: "90" },
        { prop: "pcbSource", label: "PCB来源", width: "90" },

        { prop: "productType", label: "物料类型", width: "80" },
        // {prop: 'unitPrice', label: '单价', width: '80'},
        // {prop: 'Intaxprice', label: '总价', width: '80'},

        { prop: "productSteelMeshSource", label: "钢网来源", width: "90" },

        // {prop: 'bomFilename', label: 'BOM文件名称', width: '250'},
        // {prop: 'bomFilefullname', label: 'BOM文件全路径名称', width: '250', show: false},
        // {prop: 'pcbFilename', label: 'PCB文件名称', width: '230'},
        // {prop: 'pcbFilefullname', label: 'PCB文件全路径名称', width: '250', show: false},
        // {prop: 'craftFilename', label: '工艺文件名称', width: '250'},
        // {prop: 'craftFilefullname', label: '工艺文件全路径名称', width: '120', show: false},
        // { prop: "approver", label: "审批人", width: "120", show: false },
        // { prop: "approverShow", label: "审批人", width: "120" },
        { prop: "approvetime", label: "审批时间", width: "130" },
      ],
      select: {
        select: listSaleQuote,
        queryParam: { dr: 0, billState: null },
        // 'queryParam': {dr: 0,billState:0}
        // 'queryParam': {dr: 0}
      },
      top_btn: [
        {
          name: "搜索",
          code: "search",
        },
        // {
        //   name: '查询',
        //   code: 'QUERYDIALOG',
        //   action: listSaleQuote,
        //   btnSize: 'mini'
        // },
        // {
        //   name: '批量通过',
        //   code: 'BATCHOVERQUOTE',
        //   when: {'billState': [3]},
        //   action: updateSaleQuote,
        //   btnSize: 'mini'
        // }
      ],
      act_btn: [
        {
          name: "报价",
          code: "DOQUOTE",
          when: { billState: [2] },
          action: updateSaleQuote,
          width: 160,
          btnSize: "mini",
          typeLess: "itag",
          iconPic: "el-icon-phone-outline",
        },
        {
          name: "完成报价",
          code: "OVERQUOTE",
          when: { billState: [2] },
          action: overProccessSaleQupte,
          btnSize: "mini",
          typeLess: "itag",
          iconPic: "el-icon-bell",
        },
        {
          name: "查看",
          code: "LOOKUP",
          when: { billState: [0, 1, 3, 4, 5, 6] },
          action: updateSaleQuote,
          btnSize: "mini",
          typeLess: "itag",
          iconPic: "el-icon-view",
        },
        // {
        //   name: '重新报价',
        //   code: 'REQUOTE',
        //   when: {'billState': [6]},
        //   action: startRequoteProccess,
        //   btnSize: 'mini'
        // },
        // {
        //   name: '查看流程',
        //   code: 'QUERYFLOW',
        //   btnSize:'mini' ,
        //   typeLess: 'itag',
        //   iconPic: 'el-icon-s-promotion',
        // },
        {
          name: "查看主题",
          code: "READTHEME",
          action: null,
          typeLess: "itag",
          iconPic: "el-icon-collection",
          btnSize: "mini",
        },
      ],
      replace: [
        // {name: 'taxinclud', replace: { 1: "不含税", 1.13: "含税" } },
        {
          name: "billState",
          replace: {
            0: "自由态",
            1: "报价流程进行中",
            2: "已认领",
            3: "采购报价完成",
            4: "工艺审核完成",
            5: "生产报价完成",
            6: "销售报价完成",
          },
        },
        {
          name: "materialSource",
          replace: { 1: "甲方提供", 2: "乙方提供", 3: "部分甲方提供" },
        },
        {
          name: "productSteelMeshSource",
          replace: { 0: "无", 1: "甲方提供", 2: "乙方提供" },
        },
        {
          name: "pcbSource",
          replace: { 0: "无", 1: "甲方提供", 2: "乙方提供" },
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
          name: "productType",
          replace: { 0: "自由态", 1: "加工", 2: "OEM", 3: "ODM", 4: "物料" },
        },
      ],
    };
  },
  created() {
    let productCode = this.$route.query.productCode;
    if (productCode) {
      this.select.queryParam.productCode = productCode;
    }
  },
  methods: {
    bill(e) {
      let queryParam = { dr: 0 };
      // console.log(e.target.innerHTML);
      if (e.target.innerHTML == "报价已完成") {
        queryParam.billState = 6;
        // console.log(1);
      } else {
        queryParam.billStateList = [0, 1, 2, 3, 4, 5];
        // console.log(2);
      }
      let newSelect = { select: this.select.select, queryParam: queryParam };
      this.select = newSelect;
    },

    colsed(data) {
      this.visiables = data;
    },
    drawers() {
     //消息中心的调用
      this.drawer = !this.drawer;
      this.search_ts(this.ressl)
    },
    search_ts(data) {
      //搜索
      this.visiables = false;
      // console.log(data);
      let mindata = {
        serial: data["流水号"],
        customerCode: data["客户编码"],
        productCode: data["产品编码"],
        productName: data["产品名称"],
        pkPsndocShow: data["业务员"],
      };
      this.ressl = mindata
      this.select = {
        select: this.select.select,
        queryParam: mindata,
      };
    },
    onButtonClick(param) {
      if (param.btnCode === "search") {
        this.visiables = true;
      }
      // 监控页面中所有的按钮点击事件
      if (param.btnCode === "BATCHOVERQUOTE") {
      }
      // 销售报价事件
      if (param.btnCode === "DOQUOTE") {
        // console.log(param.btnCode);
        this.openContent("销售报价", param.btnCode);
        localStorage.setItem("isSteel", param.bindData.isSteel);
        localStorage.setItem("taxinclud", param.bindData.taxinclud);
        localStorage.setItem("productNum", param.bindData.productNum);
        this.content.updateRow = param.bindData;
        // console.log(param.bindData);
      }
      // 查询界面
      if (param.btnCode === "QUERYDIALOG") {
        this.openQueryDialog();
      }
      // 通过审核
      if (param.btnCode === "OVERQUOTE") {
      //  console .log(param.bindData);
        // console.log(param.bindData.isSteel);
        const modelQuoteBPoListList = param.bindData.modelQuoteBPoList;
        let billProduceQuoteBPoList = param.bindData.billProduceQuoteBPoList;
        let updateProductList = billProduceQuoteBPoList.concat(
          modelQuoteBPoListList
        );
        this.$confirm("是否确认完成销售报价?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "info",
        })
          .then(() => {
            let updateParam = {
              isSteel:param.bindData.isSteel,
              pkSaleQuote: param.bindData.pkSaleQuote,
              pkProductOrderB: param.bindData.pkProductOrderB,
              pkProduct: param.bindData.pkProduct,
              taskId: param.bindData.taskId,
              approver: param.bindData.approver,
              billState: 4,
              billProduceQuoteBPoList: updateProductList,
              billPurchaseQuotePo: param.bindData.billPurchaseQuotePo,
              modelCode: param.bindData.modelCode,
              steelCode: param.bindData.steelCode,
            };
            overProccessSaleQupte(updateParam).then((response) => {
              this.$message({ message: "操作成功", type: "success" });
              param.bindData.billState = "销售报价完成";
              this.$message({ type: "success", message: "销售报价完成!" });
              // location.reload();
            });
          })
          .catch(() => {
            this.$message({ type: "info", message: "已取消完成!" });
          });
      }
      // 查看界面
      if (param.btnCode === "LOOKUP") {
        this.openContent("查看", param.btnCode);
        localStorage.setItem("isSteel", param.bindData.isSteel);
        localStorage.setItem("taxinclud", param.bindData.taxinclud);
        localStorage.setItem("productNum", param.bindData.productNum);
        this.content.updateRow = param.bindData;
      }

      // 查看流程
      if (param.btnCode === "QUERYFLOW") {
        let queryParam = {
          processInstanceId: param.bindData.processInstanceId,
        };
        findFlowImage(queryParam)
          .then((response) => {
            let url = window.URL.createObjectURL(response.data);
            if (url) {
              this.flowImageData.flowPrice = url;
              this.flowImageData.visiable = true;
            } else {
              this.flowImageData.flowPrice = "";
            }
          })
          .catch((err) => {
            this.$message({ message: "图片加载失败!", type: "error" });
          });
      }
      // 销售控制重新报价
      if (param.btnCode === "REQUOTE") {
        // 产品名称
        let productName =
          param.bindData.productName == null
            ? "**"
            : param.bindData.productName;
        // 产品编码
        let productCode =
          param.bindData.productCode == null
            ? "**"
            : param.bindData.productCode;
        // 客户编码
        let customerCode =
          param.bindData.customerCode == null
            ? "**"
            : param.bindData.customerCode;
        // 销售负责人
        let pkPsndoc = param.bindData.pkPsndoc;
        let flowTitle = productName + "_" + productCode + "_" + customerCode;
        let requoreParam = {
          pkProduct: param.bindData.pkProduct,
          userid: this.$store.getters.userid,
          flowTitle: flowTitle,
          pkPsndoc: pkPsndoc,
          paramMap: { pkSaleQuote: param.bindData.pkSaleQuote },
        };

        this.$confirm("是否确定该操作?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "操作成功!",
            });
            startRequoteProccess(requoreParam).then((response) => {
              if (response.success) {
                // this.queryListData();
                // location.reload();
              } else {
                this.$message({ message: response.message, type: "error" });
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消操作",
            });
          });
        // this.$message({ type: "success", message: "操作成功!" });
        // this.queryListData();
      }

      //查看主题弹窗
      if (param.btnCode === "READTHEME") {
        // console.log(param);
        this.drawer = !this.drawer;
        this.siteRecharge = param.bindData.pkProductOrderB
        // console.log(this.siteRecharge);
        // if (param.bindData.pkProductOrderB) {
        //   this.centerDialogVisible = true;
        //   this.saleTheme = param.bindData.saleTheme;
        //   this.pkProductOrderB = param.bindData.pkProductOrderB;
        //   let mrpParam = { pkProductOrderB: param.bindData.pkProductOrderB };
        //   selectAllOrderSaleStartB(mrpParam).then((response) => {
        //     this.siteRecharge = response.object;
        //     for (var i = 0; i < this.siteRecharge.length; i++) {
        //       this.siteRecharge[i].zong =
        //         this.siteRecharge[i].chargePsnShow +
        //         "         " +
        //         this.siteRecharge[i].creationtime;
        //     }
        //   });
        // }
      }
    },
    //动态获取
    handleChange(val) {
      this.value = val;
    },
    //查询
    cha() {
      // console.log(this.value[1]);
      if (this.value[0] == "订单类型") {
        this.query = { page: 1, limit: 10, orderType: this.value[1] };
      } else if (this.value[0] == "物料类型") {
        this.query = { page: 1, limit: 10, productType: this.value[1] };
      } else if (this.value[0] == "PCB来源") {
        this.query = { page: 1, limit: 10, pcbSource: this.value[1] };
      } else if (this.value[0] == "钢网来源") {
        this.query = {
          page: 1,
          limit: 10,
          productSteelMeshSource: this.value[1],
        };
      } else if (this.value[0] == "单据状态") {
        this.query = { page: 1, limit: 10, billState: this.value[1] };
      } else if (this.value[0] == "全部显示") {
        this.query = { page: 1, limit: 10, billState: null };
      }
      let newSelect = { select: this.select.select, queryParam: this.query };
      this.select = newSelect;
      this.value = [];
    },
    queryListData(datas) {
      // console.log(datas.matterFilename);
      // 刷新界面数据
      if (datas.matterFilename != null) {
        let formData = new FormData();
        
          formData.append(`matterfile`, datas.files_one.raw);
        formData.append(`productCode`, datas.productCode);
        
        
         this.$confirm('你确定此确定吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          
        }).then(() => {
          
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
            saveMatterFile(formData).then((response) => {
              // console.log(response);
              if (response.object) {
                datas.matterFilename = response.object.SALE_MATTER_NAME;
                datas.matterFileFullName =
                  response.object.SALE_MATTER_FULL_NAME;

                // 更细销售报价
                let updateSaleQuoteParam = {
                  pkSaleQuote: datas.pkSaleQuote,
                  matterFilename: response.object.SALE_MATTER_NAME,
                  matterFileFullName: response.object.SALE_MATTER_FULL_NAME,
                };
                // console.log(updateSaleQuoteParam);
                updateSaleQuotes(updateSaleQuoteParam).then((response) => {
                  // 更新销售报价
                });
              }
            });

            const billProduceQuoteBPoList =
              datas.billProduceQuoteBPoList == null
                ? []
                : datas.billProduceQuoteBPoList;
            const modelQuoteBPoListList =
              datas.modelQuoteBPoList == null ? [] : datas.modelQuoteBPoList;
            let updateProductList = billProduceQuoteBPoList.concat(
              modelQuoteBPoListList
            );
            // 采购数据
            let updatePurchaseData = datas.billPurchaseQuotePo;
            // console.log(updatePurchaseData);
            updateBatchProduceQuoteB(updateProductList).then((response) => {
              if (response.success) {
                initReplaceAddData(billProduceQuoteBPoList, this.replace);
              } else {
                this.$message({
                  message: `操作失败:${response.message}`,
                  type: "error",
                });
              }
              // 更新采购数据
              updatePurchaseQuoteFunc(updatePurchaseData).then((responset) => {
                if (responset.success) {
                  // location.reload();
                  this.content.visiable = false;
                }
              });
            });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });          
        });
      
      } else {
        this.$message.warning("上传文件不完整!请选择需要上传的文件。");
      }
    },
    //根据状态改变颜色
    yellowBg({ row, column, rowIndex, columnIndex }) {
      if (row.sort == 1) {
        return "cell-grey";
      }
    },
    //打开评论
    showDiv() {
      this.showx = 1;
    },
    //关闭留言按钮
    closeDiv() {
      this.showx = 0;
    },
    //发表评论
    // report() {
    //   let param = {
    //     pkProductOrderB: this.pkProductOrderB,
    //     content: this.textarea1,
    //      msgType:1
    //   };
    //   let param1 = { pkProductOrderB: this.pkProductOrderB };
    //   insertOrderSaleStartB(param).then((response) => {
    //     if (response.message == "操作成功") {
    //       this.textarea1 = "";
    //       selectAllOrderSaleStartB(param1).then((response1) => {
    //         this.siteRecharge = response1.object;
    //         for (var i = 0; i < this.siteRecharge.length; i++) {
    //           this.siteRecharge[i].zong =
    //             this.siteRecharge[i].chargePsnShow +
    //             "       " +
    //             this.siteRecharge[i].creationtime;
    //         }
    //       });
    //     }
    //   });
    // },
    //取消评论
    qreport() {
      this.textarea1 = "";
    },
    //点击置顶
    // handleClick(row) {
    //   // console.log(row);
    //   let param = { pkOrderSaleStartB: row.pkOrderSaleStartB, sort: 1 };
    //   let param1 = { pkProductOrderB: this.pkProductOrderB };
    //   updateOrderSaleStartB(param).then((response) => {
    //     if (response.message == "操作成功") {
    //       selectAllOrderSaleStartB(param1).then((response1) => {
    //         this.siteRecharge = response1.object;
    //         for (var i = 0; i < this.siteRecharge.length; i++) {
    //           this.siteRecharge[i].zong =
    //             this.siteRecharge[i].chargePsnShow +
    //             "       " +
    //             this.siteRecharge[i].creationtime;
    //         }
    //       });
    //     }
    //   });
    // },
    // //取消置顶
    // handleClick1(row) {
    //   let param = { pkOrderSaleStartB: row.pkOrderSaleStartB, sort: 0 };
    //   let param1 = { pkProductOrderB: this.pkProductOrderB };
    //   updateOrderSaleStartB(param).then((response) => {
    //     if (response.message == "操作成功") {
    //       selectAllOrderSaleStartB(param1).then((response1) => {
    //         this.siteRecharge = response1.object;
    //         for (var i = 0; i < this.siteRecharge.length; i++) {
    //           this.siteRecharge[i].zong =
    //             this.siteRecharge[i].chargePsnShow +
    //             "       " +
    //             this.siteRecharge[i].creationtime;
    //         }
    //       });
    //     }
    //   });
    // },
    // 关闭流程图Dialog
    closeFlowImageDialog() {
      this.flowImageData.visiable = false;
    },
    // 打开查询模板
    openQueryDialog() {
      this.queryDialog.visiable = true;
    },
    // handleClose(){
    //     this.label(this.ressl);
    // },
    // 关闭查询模板
    closeQueryDialog() {
      this.queryDialog.visiable = false;
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
// div{
//   font-size: 8px;
// }
.icon {
  color: #409eff;
  position: absolute;
  right: 0;
  margin-top: 66px;
  margin-right: 50px;
  font-size: 10px;
}
i:hover {
  color: #409eff;
  cursor: pointer;
}

.readClass {
  width: 100%;
  height: 40px;
  border: solid 1px #e9e5df;
  background: #e9e5df;
  margin-top: 12px;
}
.readZi {
  color: #92887d;
  line-height: 40px;
  font-size: 15px;
  margin-left: 15px;
}

.btnQ {
  width: 100px;
  height: 30px;
  border: solid 1px #01553d;
  background: #01553d;
  text-align: center;
  border-radius: 5px;
  position: absolute;
  cursor: pointer;
  right: 0;
  margin-right: 130px;
}

.bq {
  color: white;
  line-height: 30px;
  font-size: 16px;
}
.bq:hover {
  color: black;
}
.btnF {
  width: 100px;
  height: 30px;
  cursor: pointer;
  border: solid 1px #01553d;
  background: #01553d;
  text-align: center;
  border-radius: 5px;
  position: absolute;
  right: 0;
  margin-right: 18px;
}
.bf {
  color: white;
  line-height: 30px;
  font-size: 16px;
}

.bf:hover {
  color: black;
}

.iconRepert {
  width: 6%;
  height: 40px;
  float: right;
  padding: 1px 0 0 0;
}

/deep/ .showDiv {
  position: absolute;
  right: 0;
}

/deep/ .closeDiv {
  position: absolute;
  right: 0;
}

/deep/ .cell-grey {
  background: red;
}
.titles_style {
  display: flex;
}
.titles_style div {
  border: 1px solid #000;
  margin-left: 20px;
  background: #333;
  color: #fff;
  cursor: pointer;
  // font-size: ;
}
</style>
