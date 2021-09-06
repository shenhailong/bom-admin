<template>
 <!-- 财务明细 -->
  <div>
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
import { selectAllIfinancialInfoAsPage } from "@/api/financing/flans"; //财务明细url路径
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
        { prop: "customerCode", label: "客户编号", width: "100" },
        { prop: "contractNo", label: "合同编号", width: "110", search: true },
        { prop: "orderSignTime", label: "签订日期", width: "100" },
        { prop: "productCode", label: "产品编号", width: "100" },
        { prop: "productName", label: "产品名称", width: "100" },
        { prop: "constractProductNum", label: "产品数量", width: "100" },
        { prop: "usingPrice", label: "治具成本价", width: "100" },
        { prop: "unitTotalOut", label: "生产成本价", width: "100" },
        { prop: "productPcbPrice", label: "pcb单价", width: "100" },
        { prop: "productPcbPriceall", label: "pcb总价", width: "100" },
        { prop: "purchasePrice", label: "采购单价", width: "100" },
         { prop: "purchasePriceall", label: "采购总价", width: "100" },
        
        { prop: "steelPrice", label: "钢网成本价", width: "100" },
        // { prop: "scydata", label: "scy", width: "100" },
        { prop: "taxinclud", label: "税率", width: "50" },
        { prop: "productUnitPrice", label: "产品单价", width: "100" },
        { prop: "productTotalPrice", label: "产品总价", width: "100" },
        { prop: "pkPsndocShow", label: "销售负责人", width: "100" },
      ],
      select: {
        select: selectAllIfinancialInfoAsPage,
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
      replace: [
      ],
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
        contractNo: data['合同编号'],
      };
      this.select = {
        select: selectAllIfinancialInfoAsPage,
        queryParam: mindata,
      };
    },
  },
};
</script>
<style scoped="scoped">
</style>