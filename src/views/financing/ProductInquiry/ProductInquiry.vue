<template>
 <!-- 产品报表 -->
  <div>
    <Table
      :columns="columns"
      :select="select"
      :top_btn="top_btn"
      :act_btn="act_btn"
      :replace="replaces"
      @onButtonClick="onButtonClick"
    >
    </Table>


    <!-- 搜索 -->
    <searchs
      :visiable="content.visiable"
      @search_ts="search_one"
      @colsed="colsed"
    >
    </searchs>
  </div>
</template>
<script>
import Table from "@/components/viewcomp/Table";
import searchs from "@/components/search/index";
// Finance
import { selectAllOrderByPkCustomAsPage   } from "@/api/financing/flans"; //url路径
export default {
  components: { Table, searchs },
  data() {
    return {
      // title:'',
      visibles:false,
      content: {
        visiable: false, // 内容界面显示控制
        title: "", // 标题
        action: null, // 执行Action
        updateRow: null, // 更新时带过来的temp
      },
      columns: [
        // { prop: "pkMenu", label: "主键", width: "10", primary: true },
         { prop: "customerCode", label: "客户编码", width: "100" },
        { prop: "corpname", label: "客户名称", width: "150" },
          { prop: "productCode", label: "产品编码", width: "100" },
        { prop: "productName", label: "产品名称", width: "100" },
         { prop: "contractNo", label: "合同编号", width: "100" },
        { prop: "productUnitPrice", label: "单价", width: "100" },
        { prop: "productNum", label: "订单数量", width: "100" },
        {prop:'zPrice',label:'总价',width:''},
        { prop: "contractBillState", label: "合同状态", width: "100" },
        { prop: "orderSignTime", label: "合同签订日期", width: "100" },
        { prop: "finishNum", label: "出库数量", width: "100" },
        // {prop:'priceCompleted',label:'已结款金额',width:''},
        {prop:'backSum',label:'已结款金额',width:''},
        {prop:'invoiceSum',label:'已开票金额',width:''},
        //
        {prop:'nout',label:'未出库数量',width:''},
        {prop:'nopriceCompleted',label:'未结款金额',width:''},
        {prop:'notInvoiced',label:'未开票金额',width:''},
         { prop: "pkPsndocShow", label: "业务员", width: "100" },
      ],
      select: {
        select:selectAllOrderByPkCustomAsPage,
        queryParam: { dr: 0 },
      },
      top_btn: [
        {
          name: "搜索",
          code: "ADD",
          // action: addSmMenu,
        },
      
      ],
      act_btn: [
         {
          width: 0,
          when:true
        },
      ],
      replaces: [
        {
          name:"contractBillState",
          replace: {
            0: "无",
            30: "订单报价中",
            31: "完成订单报价", 
            32: "合同签订成功",
            50:'合同未成功',
            51:'生产中',
            65:'合同完成' 
          },
        },
      ]
    };
  },

  methods: {
    onButtonClick(param) {
      //点击搜索
      if (param.btnCode === "ADD") {
        this.content.visiable = true;
      }
    },
    colsed(data) {
      // 弹窗的显示隐藏
      this.content.visiable = data;
    },
    closes(){
      this.visibles=false
    },
    //搜索接口
    search_one(data) {
      this.content.visiable = false;
      // console.log(data);
     let mindata = {
       creationdateBegin: data['开始时间'],
        creationdateEnd: data['结束时间'],
        pkPsndocShow: data["业务员"],
        customerCode: data["客户编码"],
    
        contractNo:data['合同编号'],
       
      };
      this.select = {
        select: this.select.select,
        queryParam: mindata,
      };
      
    },
  },
};
</script>
<style scoped="scoped">
</style>