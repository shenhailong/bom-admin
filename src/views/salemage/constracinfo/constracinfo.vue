<template>
    <div >
<!-- 合同信息 -->
    <div class="icon" >
      <i class="el-icon-s-custom zz1"><span>查看客户信息</span></i>
      <i class="el-icon-s-order zz1"><span>查看合同信息</span></i>
      <i class="el-icon-s-promotion zz1"><span>查看生产信息</span></i>
    </div>
     <Table
          :columns="columns"
          :select="select"
          :top_btn="top_btn"
          :act_btn="act_btn"
          :replace="replaces"
          @onButtonClick="onButtonClick"
        >
    </Table>
    <searchs
      :visiable="visiables"
      @colsed="colsed"
      :title="content.title"
      @search_ts="search_ts"
    ></searchs>
    

    <!-- 查看客户信息弹窗 -->
    <el-dialog
      :visible.sync="dialogVisibleCustomer"
      width="900px"
      class="dialog-header"
      @close="dialogVisibleCustomer = false"
    >
      <div>
        <el-tag class="tag-all">客户信息详情</el-tag>
        <hr />
      </div>
      <el-form :inline="true" label-width="150px" :model="customerForm">
        <el-form-item label="客户编码：">
          <el-input v-model="customerForm.code" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="客户名称：">
          <el-input v-model="customerForm.name" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="客户联系电话：">
          <el-input v-model="customerForm.tel" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="采购联系人：">
          <el-input
            v-model="customerForm.customname"
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="技术联系人：">
          <el-input :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="技术联系电话：">
          <el-input :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="财务联系人：">
          <el-input :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="财务联系电话：">
          <el-input :disabled="true"></el-input>
        </el-form-item>
        <!-- 财务联系人、财务联系电话 -->
        <el-form-item label="采购联系电话：">
          <el-input v-model="customerForm.corpname" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="收获联系人：">
          <el-input v-model="customerForm.telnum" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="收获地址：" class="address">
          <el-input
            v-model="customerForm.corpaddress"
            :disabled="true"
          ></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
    
    <!-- 查看合同信息弹窗 -->
    <el-dialog
      :visible.sync="dialogVisibleContract"
      width="88%"
      class="dialog-header"
    >
      <div>
        <el-tag class="tag-all">合同信息详情</el-tag>
      </div>
      <br />
      <el-form
        size="small"
        :inline="true"
        label-width="110px"
        :model="constractForm"
      >
        <el-tabs type="border-card">
          <el-tab-pane label="合同人员信息">
            <el-form-item label="合同编号:">
              <el-input
                v-model="constractForm.contractNo"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="合同流水号:">
              <el-input
                v-model="constractForm.projectNum"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="客户编号:">
              <el-input
                v-model="constractForm.customerCode"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="业务员:">
              <el-input
                v-model="constractForm.pkPsndocShow"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="下单日期:">
              <el-input
                v-model="constractForm.creationtime"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="预计交货日期:">
              <el-input
                v-model="constractForm.scheduledtime"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="订单类型:">
              <el-select
                v-model="constractForm.orderType"
                clearable
                placeholder="请选择"
                :disabled="true"
              >
                <el-option
                  v-for="item in orderTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="采购负责人:">
              <el-input
                v-model="constractForm.purchaseContactsName"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="采购电话:">
              <el-input
                v-model="constractForm.purchaseContactsTel"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="技术负责人:">
              <el-input
                v-model="constractForm.skillContactsName"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="技术电话:">
              <el-input
                v-model="constractForm.skillContactsTel"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
        <br />
        <el-tabs type="border-card">
          <el-tab-pane label="合同发货信息">
            <el-form-item label="税率:">
              <el-input
                v-model="constractForm.taxinclud"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="是否加急:">
              <el-select
                clearable
                v-model="constractForm.urgent"
                placeholder="请选择"
                :disabled="true"
              >
                <el-option
                  v-for="item in urgentOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="运输方式:">
              <el-select
                clearable
                v-model="constractForm.transportType"
                placeholder="请选择"
                :disabled="true"
              >
                <el-option
                  v-for="item in transportTypeOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="收货联系人:">
              <el-input
                v-model="constractForm.customname"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="收货电话:">
              <el-input
                v-model="constractForm.takeoverTel"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <br />
            <el-form-item label="收货地址:" class="coaddress">
              <el-input
                v-model="constractForm.address"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
      </el-form>
      <br />
      <el-tabs type="border-card">
        <el-tab-pane label="合同产品信息">
          <!-- <div v-for="item in productOrderBList">
				{{item.pkProduct}}
			  </div> -->
          <el-table
            :data="productOrderBList"
            border
            show-summary
            :summary-method="getSummaries"
          >
            <el-table-column type="expand">
              <template slot-scope="props">
                <el-form
                  label-position="left"
                  inline
                  class="demo-table-expand"
                  v-for="(item,index) in props.row.productOrderBHPos"
                  :key ='index'
                >
                  <el-form-item label="名称">
                    <span>{{ item.processType }}</span>
                  </el-form-item>
                  <el-form-item label="数量">
                    <span>{{ item.processParam }}</span>
                  </el-form-item>
                  <el-form-item label="单价">
                    <span>{{ item.saleUnitTotalOut }}</span>
                  </el-form-item>
                  <el-form-item label="总价">
                    <span>{{ item.allprice }}</span>
                  </el-form-item>
                </el-form>
              </template>
            </el-table-column>
            <el-table-column
              prop="orderProductCode"
              label="产品编号"
              width="110"
            >
            </el-table-column>
            <el-table-column prop="model" label="产品型号" width="100">
            </el-table-column>
            <el-table-column
              prop="orderProductName"
              label="产品名称"
              width="180"
            >
            </el-table-column>
            <el-table-column prop="productNum" label="产品数量" width="120">
            </el-table-column>
            <el-table-column
              prop="taxinclud"
              label="含率"
              width="100"
            ></el-table-column>
            <el-table-column
              prop="productUnitPrice"
              label="含税单价"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="productTotalPrice"
              label="含税总价"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="taxUnitPrice"
              label="产品单价"
              width="120"
            ></el-table-column>
            <el-table-column
              prop="taxtotalPrice"
              label="产品合计"
              width="120"
            ></el-table-column>
            <el-table-column prop="memo" label="描述"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

    <!-- 查看产品信息弹窗 -->
    <el-dialog
      :visible.sync="dialogVisibleProduct"
      width="900px"
      class="dialog-header"
    >
      <div>
        <el-tag class="tag-all">产品信息详情</el-tag>
        <hr />
      </div>
      <el-table :data="productOrderBList" style="width: 100%">
        <el-table-column
          prop="orderProductName"
          label="产品名称"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="orderProductCode"
          label="产品编码"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="productNum"
          label="产品数量"
          width="180"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click="
                () => {
                  productinoInfo.visiable = true;
                  productinoInfo.pkProductOrderB = scope.row.pkProductOrderB;
                }
              "
              >生产信息</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

    <!--生产详情Dialog-->
    <ProductionInfoContentViewShow
      :visiable="productinoInfo.visiable"
      :pkProductOrderB="productinoInfo.pkProductOrderB"
      @close="
        () => {
          productinoInfo.visiable = false;
        }
      "
    >
    </ProductionInfoContentViewShow>


    <el-dialog
      width="40%"
      title="修改日期"
      :visible.sync="singedContractVisiable"
      append-to-body
    >
      <el-tag>预计交货日期</el-tag>
      <!-- singedContractData.scheduledtime -->
      <!-- <el-input v-model=""></el-input> -->
      <el-date-picker
        v-model="singedContractData.scheduledtime"
        type="datetime"
        value-format="yyyy-MM-dd"
        placeholder="选择交货时间"
      >
      </el-date-picker>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="signedContractSure">签 订</el-button>
        <el-button @click="singedContractVisiable = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  selectAllOrderSummaryAsPage,
  selectCustomerInfoByPrimary,
} from "@/api/constracinfo/constracinfo";
import { mapGetters } from "vuex";
import Pagination from "@/components/Pagination";
import {
  initReplaceUpdateData,
  initReplaceAddData,
  parseTime,
  randomNum,
} from "@/utils/viewCompUtil";
import ProductionInfoContentViewShow from "@/views/salemage/constracinfo/productionInfo";
import searchs from "@/components/search/index";
import {
  updateProductOrderStateByPk,

} from "@/api/orders/orders";
//@/api/orders/orders
import { selectProductOrderByPrimaryKey } from "@/api/orders/orders";
import Table from "@/components/viewcomp/Table";

export default {
  name: "AllConstractSummaryTableListVersiont",
  props: ["replace", "title", "visiable", "action", "updateRow"],
  components: { Pagination, ProductionInfoContentViewShow, searchs,Table },
  computed: {
    ...mapGetters(["name", "userid"]),
  },
  destroyed() {
    //   this.productOrderBList = []
  },
  data() {
    return {
      singedContractData: {
        scheduledtime: "", // 预计交货时间
        signScheduledtime  :null
      },
      temp:{
        pkProductOrder:null
      },
      singedContractVisiable: false, // 签订合同Dialog
      isshow: true,
      allmoney: 0,
      visiables: false, //控制搜索的显示隐藏
      restaurants: [],
      input: "", //合同查询值
      input1: "", //销售负责人值
      dialogVisibleCustomer: false,
      dialogVisibleContract: false,
      dialogVisibleProduct: false,
      constractTableList: [
        // 合同列表数据
      ],
      query: {},
      pkPsndocShow1: "",
      sPrice: 0, //计算所有合同总价
      sum1: 0,
      sum2: 0,
      contractPrice: 0, //所有产品加支具的价格
      creationdateBegin: "",
      creationdateEnd: "",
      constractSearch: [], // 通过合同编号查到合同
      currentPage: 1, //初始页
      pagesize: 15, //    每页的数据
      userList: [],
      productOrderBList: [], // 合同子表数据
      productinoInfo: {
        visiable: false,
        pkProductOrderB: false,
      },
      value1: "", //开始日期
      value2: "", //结束日期
      customerForm: {
        code: "", // 客户编码
        name: "", // 客户名称
        tel: "", // 客户联系电话
        customname: "", // 采购联系人
        telnum: "", // 采购联系电话
        corpname: "", // 公司名称
        corpaddress: "", // 公司地址
      }, // 客户信息Form

      constractForm: {
        contractNo: "", // 合同编号
        customerCode: "", // 客户编号
        projectNum: "", //合同流水号
        pkPsndocShow: "", // 销售负责人
        creationtime: "", // 下单日期
        scheduledtime: "", // 预计交货日期
        orderType: "", // 订单类型
        purchaseContactsName: "", // 采购联系人
        purchaseContactsTel: "", // 采购联系电话
        skillContactsName: "", // 技术联系人
        skillContactsTel: "", // 技术联系电话
        taxinclud: null, //是否含税
        urgent: "", // 是否加急
        transportType: "", // 运输方式
        customname: "", // 收货人
        takeoverTel: "", // 收货人联系方式
        address: "", // 收货地址
      },
      total: 0, // 数据量
      list1: [],
      listQuery: {
        page: 1,
        limit: 10,
        pkProductOrder: null,
      },
      value11: "", //控制 隐藏值
      // options: [
      //   { value: "", label: "请选择" },
      //   { value: "0", label: "请选择合同编号查询" },
      //   { value: "1", label: "请选择日期查询" },
      //   { value: "2", label: "请选择销售负责人查询" },
      //   { value: "3", label: "请选择单据状态" },
      // ],
      // selectAllOrderSummaryAsPage
      //orderSignTime 签订日期  scheduledtime 预计交货日期 contractNo 合同编号 projectNum 合同项目号 customerCode 客户编号
    // customerName 客户简称 taxinclud 税率 orderSummeryPriceTotal 合同总价 billState 单据状态  productionState 生产流程状态 pkPsndocShow 业务员
        columns: [
        { prop: "orderSignTime", label: "签订日期", width: "90" },
        { prop: "scheduledtime", label: "预计交货日期", primary: true },
        { prop: "contractNo", label: "合同编号", width: "80" },
        // { prop: "pkProductOrderB", label: "合同子表主键", show: false },
        
        // { prop: "projectNum", label: "合同项目号", width: "120" },
        { prop: "customerCode", label: "客户编号", width: "80" },
        { prop: "customerName", label: "客户简称", width: "null" },
        { prop: "taxinclud", label: "税率", width: "100" },
        { prop: "orderSummeryPriceTotal", label: "合同总价", width: "100" },
        // { prop: "completionTime", label: "完工时间", width: "180" },
        { prop:"billState", label: "单据状态", width: "150" },
        { prop: "productionState", label: "生产流程状态", width: "100" },
        { prop: "pkPsndocShow", label: "业务员" ,width: "100" },
        // { prop: "", label: "" ,width: "100" },
        // { prop: "", label: "" ,width: "100" },

      ],
      select: {
        select: selectAllOrderSummaryAsPage,
        queryParam: {pkProductOrder: null},
      },
      top_btn: [
        {
          name: "搜索",
          code: "search",
        },
      ],
      act_btn: [
        {
          width: 150,
          name: "查看产品数据",
          code: "LOOKCUSTOMER",
          action: null,
          typeLess: "itag",
          iconPic: "el-icon-user-solid",
          btnSize: "mini",
        },
        {
          name: "查看子表",
          code: "LOOKCONTRACT",
          action: null,
          typeLess: "itag",
          iconPic: "el-icon-s-order",
          btnSize: "mini",
        },
        // {    
        //   name: '部分完成',
        //   code: 'INSPEREPORT',
        //   action: null,
        //   typeLess: 'itag',
        //   iconPic: 'el-icon-check',
        //   btnSize: 'mini'
        // },
        {
          name: "全部完成",
          code: "LOOKPRODUCT",
          // when: { billState: [0, 1] },
          action: null,
          typeLess: "itag",
          iconPic: "el-icon-s-promotion",
          btnSize: "mini",
        },
        {
          name: "修改",
          code: "edit",
          when: {billState: [50]},
          action: null,
          typeLess: "itag",
          iconPic: "el-icon-edit",
          btnSize: "mini",
        }
      ],
      replaces: [
        {
          name:"billState",
          replace: {
            30: "订单报价中",
            31: "完成订单报价", 
            // 32: "合同签订成功",
            50:'合同签订成功',
            51:'生产中',
            65:'合同完成' 
          },
        },
        {
          name:'productionState',
          replace:{
            0:'自由态',
            1:'生产中',
            2:'暂停生产',
            3:'生成完成',
            4:'一键暂停'
          }
        }
      ],
      //单据状态列表
      // options1: [
      //   {
      //     value: "单据状态",
      //     label: "单据状态",
      //     children: [
      //       {
      //         value: "30",
      //         label: "订单报价中",
      //       },
      //       {
      //         value: "31",
      //         label: "完成订单报价",
      //       },
      //       {
      //         value: "50",
      //         label: "合同签订成功",
      //       },
      //     ],
      //   },
      //   {
      //     value: "生产流程状态",
      //     label: "生产流程状态",
      //     children: [
      //       {
      //         value: "0",
      //         label: "自由态",
      //       },
      //       {
      //         value: "1",
      //         label: "生产中",
      //       },
      //       {
      //         value: "2",
      //         label: "暂停生产",
      //       },
      //       {
      //         value: "3",
      //         label: "生成完成",
      //       },
      //       {
      //         value: "4",
      //         label: "一键暂停",
      //       },
      //     ],
      //   },
      // ],
      value: [], //状态查询值
      content: {
        title: "搜索条件",
      },
      orderTypeOptions: [
        // { value: '0', label: '普通合同' },
        { value: "1", label: "生产订单" },
        { value: "2", label: "OEM" },
        { value: "3", label: "DEM" },
        { value: "4", label: "物料订单" },
        // { value: '4', label: '贸易模式' }
      ],
      urgentOption: [
        { value: "0", label: "否" },
        { value: "1", label: "料齐三天发货(费用：1000元)" },
        { value: "2", label: "料齐三天发货(费用：500元)" },
      ],
      transportTypeOption: [
        { value: "0", label: "甲方负责" },
        { value: "1", label: "乙方负责" },
      ],
    };
  },
  created() {
    this.initTableViewListData();
    console.log('' == "");
  },
  methods: {
    signedContract() {
      this.singedContractVisiable = true;
      this.singedContractData.scheduledtime = ""; // 预计交货时间预制空
      this.singedContractData.signScheduledtime  =this.singedContractData.scheduledtime
    },
    signedContractSure() {
      console.log(this.temp.pkProductOrder);
      this.$confirm("是否确认与客户签订合同?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          let updateParam = {
            pkProductOrder: this.temp.pkProductOrder,
            scheduledtime: this.singedContractData.scheduledtime,
            signScheduledtime  :this.singedContractData.scheduledtime
          };

          updateProductOrderStateByPk(updateParam).then((response) => {
            if (response.success) {
              this.$message({ type: "success", message: "签订成功!" });
              this.singedContractVisiable = false;
              this.$emit("close", null);
              this.$emit("queryListData", null);
              //  location.reload();
            }
          });
         
        })
        .catch(() => {
          this.$message({ type: "info", message: "已取消!" });
        });
    },
    search_ts(data) {
      // console.log(data[5]);
      this.visiables = false;
      let mindata = {
        creationdateBegin: data['开始时间'],
        creationdateEnd: data['结束时间'],
        contractNo: data['合同编号'],
        productionState: data['单据状态'][1],
        pkPsndocShow: data['业务员'],
        customerCode: data['客户编码'],
        customerName: data['客户名称'],
      };
      let newSelect = { select: this.select.select, queryParam: mindata };
      this.select = newSelect;
        // this.query =mindata
        // selectAllOrderSummaryAsPage(mindata).then((res) => {
      //   console.log(res);

      //   this.constractTableList = res.object;

      //   this.total = res.total;
      // });
      // console.log(this.constractTableList);
      //   this.select={
      //     select:this.select.select,
      //     queryParam:mindata
      //   }
    },
    //  操作栏
    actionbar() {
      this.isshow = !this.isshow;
    },
    //蒙版层
    colsed(data) {
      this.visiables = data;
    },
    //显示搜索
    // btnclick() {
    //   this.visiables = true;
    // },

    All() {
      this.initTableViewListData();
    },
    // 初始化界面列表数据
    initTableViewListData() {
      let queryParam = this.listQuery;
      selectAllOrderSummaryAsPage(queryParam).then((response) => {
        //   console.log(response);

        if (response && response.success && response.object) {
          // console.log(response.object);

          for (var i = 0; i < response.object.length; i++) {
            //    console.log(response.object[i].orderSummeryPriceTotal.toFixed(2));
            // productOrderBHPos
            this.sPrice += response.object[i].orderSummeryPriceTotal;
          }
          this.constractTableList = response.object;
          this.total = response.total;
          //计算合同总价
         
        }
      });
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
      this.pagesize = size;
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage;
    },
    //进行模糊查询操作
    querySearchAsync(queryString, cb) {
      //这里是从后台获取数据
      let queryParam = this.listQuery;
      selectAllOrderSummaryAsPage(queryParam).then((response) => {
        if (response && response.success && response.object) {
          this.constractTableList = response.object;
          this.currentPage = 1;
          this.total = response.total;
        }
      });
      var restaurants = this.constractTableList;
      var results = queryString ? this.searchData(queryString) : restaurants;

      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    searchData(issue_content) {
      return this.constractTableList.filter(function (product) {
        return Object.keys(product).some(function (key) {
          return String(product[key]).toUpperCase().indexOf(issue_content) > -1;
        });
      });
      return this.constractTableList;
    },
    handleSelect(item) {
      this.constractSearch = [];
      this.constractSearch.push(item);
    },
    //模糊查询搜索 按钮
    cha() {
      this.constractTableList = this.constractSearch;
    },
    cha1() {
      if (this.value1 && this.value2) {
        let queryParam = {
          page: 1,
          limit: 10,
          creationdateBegin: this.value1,
          creationdateEnd: this.value2,
        };
        selectAllOrderSummaryAsPage(queryParam).then((response) => {
          // console.log(response.object);
          this.constractTableList = response.object;
        });
      } else {
        alert("搜索条件不正确");
      }
    },
    //查询销售负责人
    searchPkPsndocShow1() {
      if (this.pkPsndocShow1) {
        let queryParam = {
          page: 1,
          limit: 10,
          pkPsndocShow: this.pkPsndocShow1,
        };
        selectAllOrderSummaryAsPage(queryParam).then((response) => {
          this.constractTableList = response.object;
          this.pkPsndocShow1 = "";
        });
      } else {
        alert("搜索条件不正确");
      }
    },
    //查询 whereParam
    // cha5(){
    // 	console.log(this.value[0])
    // 	if(this.value[0]=="单据状态"){
    // 	    this.query={page:1,limit:10,billState:this.value[1]}
    // 	}else if(this.value[0]=="生产流程状态"){
    // 		this.query={page:1,limit:10,productionState:this.value[1]}
    // 	}

    // 	selectAllOrderSummaryAsPage(this.query).then((response) => {
    // 	  if (response && response.success && response.object) {
    // 		let arr=[]
    // 		for(var i=0;i<response.object.length;i++){
    // 			 if(this.value[1]==response.object[i].billState){
    // 				 arr.push(response.object[i])
    // 			 }else if(this.value[1]==response.object[i].productionState){
    // 				 arr.push(response.object[i])
    // 			 }
    // 		}
    // 		this.constractTableList = arr
    // 		this.total = response.total
    // 		this.value=[]
    // 	  }
    // 	})

    // },
    // 监听界面所有按钮时间
    onButtonClick(param, btnCode, unexParam) {
      // console.log(param);
      if(param.btnCode=='edit'){
        this.signedContract();
        // console.log(param.bindData);
        this.temp.pkProductOrder = param.bindData.pkProductOrder
        // console.log(param, btnCode, unexParam);
        // console.log('ss');
      }

      if(param.btnCode=='search'){
         this.visiables = true;
      }
      // 查看客户详细信息
      if (param.btnCode == "LOOKCUSTOMER") {
        this.dialogVisibleCustomer = true;
        this.restCustomerForm();
        // 查询客户信息
        let queryParam = {
          pkCustomer:param.bindData.pkCustomer
        };
        selectCustomerInfoByPrimary(queryParam).then((response) => {
          if (response && response.success && response.object) {
            this.customerForm = response.object;
          }
        });
      }
      //查看订单合同详情
      if (param.btnCode  === "LOOKCONTRACT") {
        this.productOrderBList = [];
        this.dialogVisibleContract = true;
        this.constractForm = param.bindData;
        if (param.bindData.billProductOrderBPos) {
          for (let i of param.bindData.billProductOrderBPos) {
            if (i.productOrderBHPos[0] != null) {
              // console.log(i.productOrderBHPos);
              for (var s = 0; s < i.productOrderBHPos.length; s++) {
                i.productOrderBHPos[s].allprice =
                  i.productOrderBHPos[s].processParam *
                  i.productOrderBHPos[s].saleUnitTotalOut;
                // console.log('shen');
                // console.log(i.productOrderBHPos[s].allprice);
                var allprice = i.productOrderBHPos[s].allprice;
                // console.log(allprice);
              }
              let taxUnitPrice =
                i.productUnitPrice / this.constractForm.taxinclud;
              let taxtotalPrice = taxUnitPrice * i.productNum + allprice;
              i.productUnitPrice = i.productUnitPrice.toFixed(3);
              // console.log(i.productUnitPrice);
              i.taxUnitPrice = taxUnitPrice.toFixed(3); //计算未税单价
              i.taxtotalPrice = taxtotalPrice.toFixed(3); //计算未税总价
              i.taxinclud = this.constractForm.taxinclud; //税率
              this.productOrderBList.push(i);
            } else {
              let taxUnitPrice =
                i.productUnitPrice / this.constractForm.taxinclud;
              let taxtotalPrice = taxUnitPrice * i.productNum;
              i.taxUnitPrice = taxUnitPrice.toFixed(3); //计算未税单价
              i.taxtotalPrice = taxtotalPrice.toFixed(3); //计算未税总价
              i.taxinclud = this.constractForm.taxinclud; //税率
              this.productOrderBList.push(i);
            }
          }
        } else {
          this.productOrderBList = [];
        }
        // }
      }
      // 查看产品详情信息
      if (param.btnCode === "LOOKPRODUCT") {
        this.dialogVisibleProduct = true;
        if (param.bindData.billProductOrderBPos) {
          this.productOrderBList = param.bindData.billProductOrderBPos;
        } else {
          this.productOrderBList = [];
        }
      }
    },
    // 条件查询列表数据
    queryViewListDataByWhere(whereParam) {
      let queryParam = this.listQuery;
    },
    //数据全部显示
    all() {
      this.initTableViewListData();
    },
    restCustomerForm() {
      this.customerForm = {
        code: "", // 客户编码
        name: "", // 客户名称
        tel: "", // 客户联系电话
        customname: "", // 采购联系人
        telnum: "", // 采购联系电话
        corpname: "", // 公司名称
        corpaddress: "", // 公司地址
        projectNum: "", //合同项目号
      }; // 客户信息Form
    },
    // 自实现计算合计列中的数据
    getSummaries(param) {
      //计算属性的单位
      const { columns, data } = param;
      const sums = []; // 返回合计列数据
      //   sums[0] = '合计'
      columns.forEach((item, index) => {
        //如果是第一列，则最后一行展示为“总计”两个字
        if (index === 1) {
          sums[index] = "总计";
          //如果是最后一列，索引为列数-1，则显示计算总和
        } else if (
          index == 3 ||
          index == 5 ||
          index == 2 ||
          index == 0 ||
          index == 10
        ) {
          //不进行计算
        } else if (index == 7) {
          sums[index] = 0;
          // console.log(data);
          for (var i = 0; i < data.length; i++) {
            // console.log(data[i].productTotalPric);
            if (data[i].productOrderBHPos[0] != null) {
              // console.log(data[i].productOrderBHPos);

              for (let s of data[i].productOrderBHPos) {
                s.allprice = s.processParam * s.saleUnitTotalOut;
                var allprice = s.allprice;
              }
              sums[index] += Number(data[i].productTotalPrice) + allprice;
            } else {
              //   console.log(data[i].productTotalPrice);

              sums[index] += Number(data[i].productTotalPrice);
              // var s = 0
              // 	s += data[i].productTotalPrice
              //   console.log(s);
            }
            
          }
          sums[index] = sums[index].toFixed(3);
        } else {
          let str = [
            "",
            "",
            "",
            "",
            "productNum",
            "",
            "productUnitPrice",
            "",
            "taxUnitPrice",
            "taxtotalPrice",
          ][index];
          //对每一个需要进行计算的属性进行计算
          // productNum *productUnitPrice
          sums[index] = 0;
          for (var i = 0; i < data.length; i++) {
            sums[index] += Number(data[i][str]);
          }
          sums[index] = sums[index].toFixed(3);
        }
      });
      return sums;
    },
  },
};
</script>
<style>
.demo-table-expand {
  font-size: 0;
  display: flex;
}
.demo-table-expand label {
  width: 80px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  /* margin-right: -19%;
  margin-bottom: 0; */
  width: 30%;
}
</style>
<style  lang="scss" type="text/scss" scoped>
.el-select /deep/ .el-input__inner {
  width: 160px;
}

.el-input /deep/ .el-input__inner {
  width: 160px;
}

/deep/ .el-table .row-expand-cover .el-table__expand-column .el-icon {
  visibility: hidden;
}

.coaddress /deep/ .el-input__inner {
  width: 350px;
}
.address /deep/ .el-input__inner {
  width: 460px;
}
.icon {
  // position: relative;
  color: #409eff;
  height: 20px;
  float: right;
  // bottom: 10px;
}
i {
  font-size: 15px;
  // padding-left: 5px;
}
i:hover {
  color: #409eff;
  cursor: pointer;
}
/deep/ .zz1 {
  font-size: 6px;
}
// .dialog-header /deep/ .el-input__inner .address {
//   width: 800px;
// }
div {
  font-size: 13px;
}

// .el-table__body tr.current-row > td {
//   background-color: #ff784a !important;
//   color: #fff;
// }
</style>


