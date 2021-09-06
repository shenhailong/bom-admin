<template>
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
    <searchs
      :visiable="visible"
      @search_ts="search_one"
      @colsed="colsed"
    >
    </searchs>
  </div>
</template>
<script>
import Table from "@/components/viewcomp/Table";
import { selectAllOrderPlanBAsPage } from "@/api/orderCompMage/detailed";
import searchs from "@/components/search/index";
export default {
  components: {
    Table,
    searchs
  },
  data() {
    return {
    visible:false,
      columns: [
        { prop: "pkProductOrder", label: "主键", width: "10", primary: true },
        {prop:'procedureName',label:'部门',width:'120'},
        { prop: "countDown", label: "距离交货日期", width: "100" },
        { prop: "estimatedOverTime", label: "预计齐料时间", width: "150" },
         {prop:'estimatedStartTime',label:'计划开工时间',width:'150'},
        {prop:'estimatedEndTime',label:'计划结束时间',width:'150'},
        { prop: "contractNo", label: "合同编号" },
         { prop: "productCode", label: "产品编码", width: "100" },
        
       { prop: "productName", label: "产品名称", width: "150" },
        { prop: "pkProduct", label: "产品主键", width: "",primary:true },
       
        
        { prop: "constractProductNum", label: "订单数量", width: "50" },
        
        // { prop: "scheduledtime", label: "预计交货日期", width: "" },
        
         { prop: "constractPsnname", label: "业务员", width: "" },
         { prop: "constractOrderType", label: "合同类型" },
      ],
      select: {
        select: selectAllOrderPlanBAsPage,
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
          when: true,
        },
      ],
      replace: [
          {
          name: "constractOrderType",
          replace: {
            0: "普通合同",
            1: "生产订单",
            2: "OEM",
            3: "DEM",
            4: "贸易模式",
          },
        },
      ],
    };
  },
  methods: {
    onButtonClick(param) {
      //点击搜索
      if (param.btnCode === "ADD") {
        this.visible = true;
      }
    },
    colsed(data) {
      // 弹窗的显示隐藏
      this.visible = data;
    },
    //搜索接口
    search_one(data) {
      this.visible = false;
      console.log(data);
      let mindata = {
        creationdateBegin: data["开始时间"],
        creationdateEnd: data["结束时间"],
        procedureName:data['部门'],
        contractNo:data['合同编号']
      };
      this.select = {
        select: selectAllOrderPlanBAsPage,
        queryParam: mindata,
      };
    },
  },
};
</script>