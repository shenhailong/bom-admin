<template>
  <!-- 不良品出库 -->
  <div>
    <!-- 列表 -->
    <tables :data.sync="contents" />
    <!-- 出库单图片上传 -->
    <adds :cons='contents.bindData' />
    <!-- 返修单 -->
    <repairContent :content="contents" @close="close"></repairContent>
  </div>
</template>
<script>
// import Table from "@/components/viewcomp/Table";
import tables from "./comp/table";

import repairContent from "@/components/repair/index";

import { mapGetters } from "vuex";
import adds from "./comp/adds";

// Finance

export default {
  components: {
    // Table,
    tables,

    repairContent,
    adds,
  },
  data() {
    return {
      // title:'',
      visibles: false,
      

      cs: [],
   
      //
      contents: {
        //返修详细页面
        visiable: false, // 内容界面显示控制
        title: "", // 标题
        action: null, // 执行Action
        updateRow: null, // 更新时带过来的temp
        type: 0,
      },
      //子表数据
      comp_index: {
        contentVisiable: false,
        title: "返修出库单上传",
      },
      contents_two: {
        visiable: false, // 内容界面显示控制
        title: "", // 标题
        action: null, // 执行Action
        updateRow: null, // 更新时带过来的temp
        type: 0,
      },
    };
  },
  computed: {
    ...mapGetters(["userid", "roles"]),
  },
  methods: {
    close() {
      this.contents.visiable = false;
    },
    
    closes() {
      this.visibles = false;
    },
    //搜索接口
    
  },
};
</script>
<style scoped="scoped">
</style>