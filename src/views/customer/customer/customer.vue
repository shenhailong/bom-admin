<template>
<!-- 客户管理页面 -->
  <div>
    <div class="icon">
      <i class="el-icon-edit"><span>修改</span></i>
      <i class="el-icon-delete"><span>删除</span></i>
      <i class="el-icon-user"><span>一键登录</span></i>
    </div>
    <searchs
      :visiable="visiables"
      @colsed="colsed"
      :title="content.title"
      @search_ts="search_ts"
    ></searchs>
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
    <Customercontent
      :replace="replace"
      :visiable="content.visiable"
      :title="content.title"
      :action="content.action"
      :updateRow="content.updateRow"
      @close="closeContent"
      
    >
    </Customercontent>

    <!--移交用户控制Dialog-->
    <TransCustomerDialog
      :visiable="transferContent.visiable"
      :pkCustomerArr="transferContent.pkCustomerArr"
      :updateRow="transferContent.updateRow"
      @close="closeTransferContent"
    >
    </TransCustomerDialog>
  </div>
</template>

<script>
import Table from "@/components/viewcomp/Table";
import Customercontent from "@/views/customer/customer/content";
import TransCustomerDialog from "@/views/customer/customer/transfercustomer";
import searchs from "@/components/search/index";
import {
  listCustomer,
  addCustomer,
  deleteCustomerByPks,
  updateCustomer,
} from "@/api/customer/customer";

export default {
  name: "salecustomer",
  components: { Table, Customercontent, TransCustomerDialog, searchs },
  data() {
    return {
      visiables: false,
      content: {
        visiable: false, // 内容界面显示控制
        title: "", // 标题
        action: null, // 执行Action
        updateRow: null, // 更新时带过来的temp
      },
      constractTableList: [],
      input: "",
      transferContent: {
        visiable: false, // 移交界面显示控制
        pkCustomerArr: null, // 客户主键
        updateRow: null, // 更新时带过来的temp
      },
      value11: "",
      code1: "",
      value1: "",
      value2: "",
      corpname: "",
      options: [
        { value: "", label: "请选择" },
        { value: "0", label: "请选择客户编号查询" },
        { value: "1", label: "请选择日期查询" },
        { value: "2", label: "全部显示" },
        { value: "3", label: "请选择公司名称模糊查询" },
      ],
      columns: [
        { prop: "pkCustomer", label: "主键", width: "10", primary: true },
        { prop: "code", label: "客户编码", width: "80" },
        { prop: "name", label: "联系人", width: "80", search: true },
        { prop: "sex", label: "客户性别", width: "80" },
        { prop: "corpname", label: "客户名称", width: "null" },
        { prop: "corpaddress", label: "企业地址", width: "120", show: false },
        { prop: "tel", label: "联系电话(登录用户名)", width: "150" },
        { prop: "pkPsndocShow", label: "业务员", width: "90" },
        { prop: "trade", label: "所属行业", width: "120", show: false },
        { prop: "memo", label: "描述", width: "120", show: false },
        { prop: "creator", label: "创建人", width: "80", show: false },
        { prop: "creatorShow", label: "创建人", width: "80" },
        { prop: "creationtime", label: "创建时间", width: "130" },
        { prop: "modifier", label: "最后修改人", width: "120", show: false },
        {
          prop: "modifierShow",
          label: "最后修改人",
          width: "120",
          show: false,
        },
        {
          prop: "modifiedtime",
          label: "最后修改时间",
          width: "180",
          show: false,
        },
        { prop: "dr", label: "删除标志", width: "120", show: false },
        { prop: "ts", label: "时间戳", width: "120", show: false },
      ],
      select: {
        select: listCustomer,
      },
      top_btn: [
        {
          name: "搜索",
          code: "search",
          btnSize: "mini",
          action: addCustomer,
        },
        {
          name: "录入",
          code: "ADD",
          btnSize: "mini",
          action: addCustomer,
        },
        {
          name: "移交客户",
          code: "TRANSFERCUSTOMER",
          btnSize: "mini",
          action: null,
        },
      ],
      act_btn: [
        {
          name: "修改",
          code: "UPDATE",
          action: updateCustomer,
          btnSize: "mini",
          iconPic: "el-icon-edit",
          typeLess: "itag",
        },
        {
          name: "删除",
          code: "DELETE",
          action: deleteCustomerByPks,
          btnSize: "mini",
          iconPic: "el-icon-delete",
          typeLess: "itag",
        },
        {
          name: "一键登录",
          code: "POINTLOGIN",
          action: null,
          btnSize: "mini",
          iconPic: "el-icon-user",
          typeLess: "itag",
        },
      ],
      replace: [],
    };
  },
  methods: {
    redmin(){
      
    },
     //关闭蒙版
    colsed(data) {
      this.visiables = data;
    },
    //搜索
    search_ts(data) {
      // console.log(data[3]);
      this.visiables = false;
      let mindata = {
        creationdateBegin: data['开始时间'],
        creationdateEnd: data['结束时间'],
        code:data['客户编码'],
        corpname:data['公司名称'],
        creatorShow:data['业务员']
      };
      this.select = {
        select: this.select.select,
        queryParam: mindata,
      };
    },
    onButtonClick(param) {
      // 监控页面中所有的按钮点击事件
      if (param.btnCode === "ADD") {
        this.openContent("录入", param.btnAction);
      }
      if (param.btnCode === "TRANSFERCUSTOMER") {
        // 移交客户
        let pkArr = "";
        if (param.sels) {
          param.sels.forEach((element) => {
            if (element && element.pkCustomer) {
              pkArr = pkArr + element.pkCustomer + ",";
            }
          });
        }
        this.transferContent.pkCustomerArr = pkArr;
        this.transferContent.visiable = true;
      }
      if (param.btnCode === "UPDATE") {
        this.openContent("修改", param.btnAction);
        this.content.updateRow = param.bindData;
      }
      // 点击搜索后
      if (param.btnCode === "search") {
        this.content.title='搜索条件'
        this.visiables = !this.visiables;
      }
      if (param.btnCode === "POINTLOGIN") {
        // 一键登录
        console.log(param.bindData.password);
        let signUrl = `${process.env.SINGLE_SIGN_URL}?singleSign=SINGLESIGN&customeTel=${param.bindData.tel}&tokenOF=${param.bindData.password}`;
        // let signUrl = `${'http://localhost:9528/'}?singleSign=SINGLESIGN&customeTel=${param.bindData.tel}&tokenOF=${param.bindData.password}`;
        window.open(signUrl);
      }
    },
    //全部显示
    searchAll() {
      let queryParam = { page: 1, limit: 10 };
      let newSelect = { select: this.select.select, queryParam: queryParam };
      this.select = newSelect;
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
      // location.reload()
      // console.log(1);
    //  let queryParam = { page: 1, limit: 10 };
    //   let newSelect = { select: listCustomer, queryParam: queryParam };
    //   this.select = newSelect;
      // location.reload();
    },
    closeTransferContent() {
      this.transferContent.visiable = false;
      // console.log(1);
     let queryParam = { page: 1, limit: 10 };
      let newSelect = { select: listCustomer, queryParam: queryParam };
      this.select = newSelect;
    },
  },
};
</script>

<style scoped>
.icon {
  position: absolute;
  right: 0;
  color: #409eff;
  margin-top: 80px;
  font-size: 12px;
  margin-right: 15px;
}
</style>
