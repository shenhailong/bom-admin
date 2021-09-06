<template>
  <!-- 应收合同报表 -->
  <div>
    <!-- 默认列表 -->
    <Table
      :columns="columns"
      :select="select"
      :top_btn="top_btn"
      :act_btn="act_btn"
      :replace="replace"
      @onButtonClick="onButtonClick"
    >
    </Table>
    <!-- 搜索 -->
    <searchs
      :visiable="content.visiable"
      @search_ts="search_ts"
      @colsed="closed"
    >
    </searchs>
    <!-- 附件信息 -->
    <enclosure :isshow="visiablems" @close="closes" :temp='params'></enclosure>
    <!-- 修改界面 -->
    <modify :isshow="modifyshow" @close="closew" :temp='params'></modify>
  </div>
</template>
<script>
import Table from "@/components/viewcomp/Table";
import searchs from "@/components/search/index";
import enclosure from "../financingcomp/looks/index";
import modify from "../financingcomp/modify/index";
import {selectAllContractFaFinanceAsPage} from "@/api/financing/flans";
export default {
  components: {
    Table,
    searchs,
    enclosure,
    modify,
  },
  data() {
    return {
      visiablems: false, //附件信息的显示控制
      modifyshow: false, //修改界面的显示控制
      content: {
        visiable: false, // 内容界面显示控制
      },
      params:[],
      columns: [
        { prop: "contractNo", label: "合同编码", width: "100" },
        { prop: "corpname", label: "客户名称", width: "190" },
        { prop: "customerCode", label: "客户编码", width: "100" },
        { prop: "orderSummeryPriceTotal", label: "合同总价", width: "100" },
        { prop: "invoiceSum", label: "开票金额", width: "100" },
        { prop: "backSum", label: "回款金额", width: "100" },
        { prop: "onbackSum", label: "未回款金额", width: "100" },
        { prop: "oninvoiceSum", label: "未开票金额", width: "100" },
         { prop: "orderSignTime", label: "合同签订日期", width: "100" },
        { prop: "putoutOutTime", label: "发货日期", width: "100" },
         { prop: "isValid", label: "有效合同", width: "100" },
        { prop: "endTime", label: "倒计时", width: "100" },
        { prop: "contractBillState", label: "合同状态", width: "100" },
        { prop: "pkPsndocShow", label: "业务员", width: "100" },
        {prop:'memo',label:'备注'}
      ],
      select: {
        select: selectAllContractFaFinanceAsPage,
        queryParam: { dr: 0 },
      },
      top_btn: [
        {
          name: "搜索",
          code: "ADD",
        },
      ],
      act_btn: [
        {
          name: "附件信息",
          width: 80,
          code: "link",
          action: null,
          btnSize: "mini",
          typeLess: "itag",
          iconPic: "el-icon-link",
        },
        {
          name: "修改",
          code: "edit",
          action: null,
          btnSize: "mini",
          typeLess: "itag",
          iconPic: "el-icon-edit",
        },
      ],
      replace: [
        // isValid
        {
          name:'isValid',
          replace:{
            0:'是',
            1:'否'
          }
        },
        {
          name:"contractBillState",
          replace: {
            30: "订单报价中",
            31: "完成订单报价", 
            32: "合同签订成功",
            50:'合同未完成',
            51:'生产中',
            65:'合同完成' 
          },
        },
      ]
    };
  },
  methods: {
    onButtonClick(param) {
        this.params = param.bindData
      // console.log(this.param);
      if (param.btnCode === "link") { //附件文件
        this.visiablems = true;
      }
      if (param.btnCode === "ADD") { //搜索

        this.content.visiable = true;
      }
      if (param.btnCode == "edit") {//修改组件
        
        this.modifyshow = true;
      }
    },
    search_ts(data) {
        //条件搜索
      this.content.visiable = false;
  
      // console.log(data);
      let mindata = {
        creationdateBegin: data['开始时间'],
        creationdateEnd: data['结束时间'],
        pkPsndocShow: data["业务员"],
        customerCode: data["客户编码"],
        corpname: data["公司名称"],
        contractBillState:data['合同状态'],
        contractNo:data['合同编号'],
        corpname:data['公司名称'],
        isValid:data['有效合同']
      };
      this.select = {
        select: this.select.select,
        queryParam: mindata,
      };
    },
    closed() {
      this.content.visiable = false;
    },
    closes() {
      this.visiablems = false;
    },
    closew() {
      this.modifyshow = false;
    },
  },
};
</script>
<style  scoped>
</style>