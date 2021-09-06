<template>
  <div>
    <!-- 出库明细表 -->
    <el-row>
      <el-col :span="24">
        <el-row>
          <el-col :span="2">
            <!-- 选择合同及合同子表中的产品信息 -->
            <!-- <OrderConstractProductSel @refreshTableList="refreshTableList">
            </OrderConstractProductSel> -->
          </el-col>
          <!-- <el-col :span="4" :offset="3">
            <el-tag class="ordre-tag"
              >当前选择订单合同:{{
                selectedConstractData == null
                  ? ""
                  : selectedConstractData.contractNo
              }}</el-tag
            >
          </el-col> -->
          <el-col :span="7" class="button" :offset="1">
            <btns @label="label"></btns>
          </el-col>
          <el-col :span="11" class="icon"> </el-col>
        </el-row>
        <!-- <div style="display: flex; padding: 11px; height: 60px">
          <div v-if="this.value11 == '0'" style="margin-left: 10px"></div>
        </div> -->
        <!--销售发起备忘录数据-->
        <searchs
          :visiable="visiables"
          @colsed="colsed"
          @search_ts="search_ts"
        ></searchs>
        <Table
          :columns="columns"
          :select="select"
          :top_btn="top_btn"
          :act_btn="act_btn"
          :replace="replace"
          @onButtonClick="onButtonClick"
        >
        </Table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Table from "@/components/viewcomp/Table";
import searchs from "@/components/search/index"; //搜索
import { selectAllOmgPrduFinishPutoutSubDataAsPage } from "@/api/orderCompMage/AproductionPub"
import btns from "@/components/btnselect/index"; //状态按钮

export default {
  name: "ProductionFlowOrderOrderDipView",
  components: {
    Table,
    searchs,
    btns,
  },
  data() {
    return {
      content: {
        visiable: false, // 内容界面显示控制
        title: "", // 标题
        action: null, // 执行Action
        updateRow: null, // 更新时带过来的temp
        pkProductOrder: null, // 单据业务属性 合同订单主键
      },
      visiables: false, //控制搜索框的显示隐藏
      value11: "",
      options1: [
        { value: "", label: "请选择" },
        { value: "0", label: "请选择日期范围" },
        { value: "1", label: "请选择合同编号" },
        { value: "2", label: "请选择客户编号" },
        { value: "3", label: "请选择产品编号" },
        { value: "5", label: "请选择销售员" },
      ],
      contractNo: "", //合同编号
      customerCode: "", //客户编号
      constractPsnname: "", //销售员
      productCode: "", //产品编号
      startTime: "", //开始时间
      endTime: "", //结束时间
      options: [
        {
          value: "单据状态",
          label: "单据状态",
          children: [
            {
              value: null,
              label: "全部显示",
            },
            {
              value: "0",
              label: "自由态",
            },
            {
              value: "2",
              label: "已任领",
            },
            {
              value: "3",
              label: "采购报价完成",
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
          value: "物料来源",
          label: "物料来源",
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
      ],
      value: [],
      siteRecharge: [], //主题列表
      saleTheme: "", //主题
      pkProductOrderB: "", //添加主题ID
      showx: 0, //控制评论按钮
      centerDialogVisible: false, //弹窗
      textarea1: "", //评论内容
      stepsInfo: {
        // 进度条控制相关
        visiable: false,
        pkProductOrderB: null, // 订单子表主键
      },
      columns: [
        { prop: "contractNo", label: "合同编号", width: "120" },
        { prop: "productCode", label: "产品编号", width: "120" },
        { prop: "customerCode", label: "客户编号", width: "110" },
        { prop: "creationtime", label: "创建时间", width: "100" },
        //  {prop: 'productionState', label: '存货', width: '100'},
        {prop: 'putoutNum', label: '出库数量', width: '100'},
        { prop: "constractProductNum", label: "订单数量", width: "120" },
        // { prop: "completionTime", label: "累计出库", width: "120" },
        // { prop: "upFileFileList", label: "回执单", width: "110" },
        // {prop:'receiptFullname',label:'路径',width:'120'},
        { prop: "trackingNumber", label: "快递单号", width: "120" },
      ],
      select: {
        select: selectAllOmgPrduFinishPutoutSubDataAsPage,
        queryParam: { dr: 0,  },
      },
      top_btn: [
        {
          name: "搜索",
          code: "search",
        },
      ],
      act_btn: [],
      replace: [],
      commitDialogData: {
        // 控制钉钉Dialog显示
        visiable: false,
        paramData: null,
      },
      orderProductInfoDetails: {
        visiable: false,
        pkProductOrderB: null, // 订单子表主键
      },
      selectedConstractData: null, // 当前选中的订单合同
      viewDefaultBillState: "1", // 界面默认单据状态条件
      ressl: { dr: 0,  }, //保留刷新
    };
  },
  methods:{
    onButtonClick(param){
      if (param.btnCode === "search") {
        this.visiables = true;
      }
    },
    search_ts(){},
    closed(){},
    label(data) {
      //状态按钮
      this.ressl = data;
      let newSelect = { select: this.select.select, queryParam: this.ressl };
      this.select = newSelect;
    },
     colsed(data) {
      this.visiables = data;
    },
     search_ts(data) {
      this.visiables = false;
      // console.log(data);
      let mindata = {
          creationdateBegin: data['开始时间'],
          creationdateEnd: data['结束时间'],
          contractNo:data['合同编号'],
          productCode:data['产品编码'],
          customerCode:data['客户编码'],

        };
       this.ressl = mindata
      this.select = {
        select: this.select.select,
        queryParam: mindata,
      };
    },
  }
};
</script>

<style  lang="scss" type="text/scss" scoped>
</style>
