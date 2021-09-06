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
    //   if (param.btnCode === "ADD") {
    //     this.content.visiable = true;
    //   }
    },
    colsed(data) {
      // 弹窗的显示隐藏
    //   this.content.visiable = data;
    },
    closes(){
    //   this.visibles=false
    },
    //搜索接口
    search_one(data) {
    //   this.content.visiable = false;
    //   // console.log(data);
    //   let mindata = {
    //     creationdateBegin: data['开始时间'],
    //     creationdateEnd: data['结束时间'],
    //     contractNo: data['合同编号'],
    //   };
    //   this.select = {
    //     select: selectAllIfinancialInfoAsPage,
    //     queryParam: mindata,
    //   };
    },
  },
};
</script>
<style scoped="scoped">
</style>