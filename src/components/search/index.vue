<template>
  <!-- 搜索框 -->
  <el-dialog
    :title="'内容搜索'"
    :visible.sync="contentVisiable"
    :before-close="handleClose"
    width="60%"
  >
    <el-form style="display: flex; flex-wrap: wrap">
      <!-- 预计交货日期 -->
      <delivery :data.sync="queryTemp.delivery"></delivery>
      <!-- 时间搜索 -->
      <timer :data.sync="queryTemp.creationdate"></timer>
      <!-- 合同编号搜索 -->
      <contractSearch :data.sync="queryTemp.contractdate"></contractSearch>
      <!-- 产品名称搜索 -->
      <ProductName :data.sync="ProductCoded.content"></ProductName>
      <!-- 产品编码搜索 -->
      <productCodes :data.sync="ProductCoded.pcode"></productCodes>
      <!-- 客户编码搜索 -->
      <customer :data.sync="customered.code"></customer>
      <!-- 客户名称 -->
      <customerName :data.sync="customered.name"></customerName>
      <!-- 公司名称搜索 -->
      <CorporateName :data.sync="corporateName.name"></CorporateName>
      <!-- 账单状态 -->
      <bill :data.sync="bill.datas"></bill>
      <!-- 业务员的填写 -->
      <responsibility :data.sync="responsibility.mins"></responsibility>
      <!-- 订单状态 -->
      <mintype :data.sync="mintype.name"></mintype>
      <!-- 出库日期 -->
      <delivery2 :data.sync="queryTemp.delivery2"></delivery2>
      <!-- 流水号 -->
      <flowingWater :data.sync="flowing.isname"></flowingWater>
      <!-- 回款信息 -->
      <PaymentCollection :data.sync="bill.collection"></PaymentCollection>
         <!-- 合同类型 -->
      <orderType :data.sync="orderType"></orderType>
        <!-- 合同类型 -->
      <contracStatus :data.sync="contracStatus_type"></contracStatus>
      <!-- 有效合同 -->
      <ycontrac :data.sync="ycontrac"></ycontrac>
      <!-- 部门 -->
      <department :data.sync="department"></department>
      <!-- materieCode -->
      
    </el-form>
 
  <br>
  <br>

    <!-- 点击确定按钮 -->
    <el-button type="primary" icon="el-icon-search" @click="searchs"
      >确定</el-button
    >
  </el-dialog>
</template>

<script>
import timer from "./modular/timer";
import contractSearch from "./modular/contractSearch";
import ProductName from "./modular/ProductName";
import productCodes from "./modular/prodectCode";
import customer from "./modular/customer";
import CorporateName from "./modular/corporateName";
import bill from "./modular/bill";
import responsibility from "./modular/responsibility";
import mintype from "./modular/mintype";
import Mintype from "./modular/mintype.vue";
import flowingWater from "./modular/flowingWater";
import customerName from "./modular/customerName";
import delivery from "./modular/delivery";
import delivery2 from './modular/delivery_two'
import orderType from "./modular/orderType";
import PaymentCollection from'./modular/PaymentCollection'
import contracStatus from './modular/contracStatus'
import ycontrac from './modular/ycontrac'
import department from './modular/department'

export default {
  props: ["title", "visiable"],
  components: {
    ycontrac,
    department,
    timer,
    contractSearch,
    ProductName,
    productCodes,
    customer,
    CorporateName,
    bill,
    responsibility,
    mintype,
    flowingWater,
    customerName,
    delivery,
    orderType,
    PaymentCollection,
    delivery2,
    contracStatus
  },
  data() {
    return {
      department:null,//部门
      ycontrac:null,//有效合同
      contracStatus_type:null,//合同状态
      contentVisiable: false, // dialog 显示框
      queryTemp: {
        contractdate: null, //合同编号的监听
        creationdate: [], //时间组件的值
        delivery: null, //预计交货日期
        delivery2:[],//出库日期
      },
      orderType: [null], //合同类型
      bill: {
        datas: [], //单据状态
        collection:null //回款信息
      },
      responsibility: {
        mins: null, //业务员 this.responsibility.mins
      },
      mintype: {
        name: [], //选择类型
      },
      flowing: {
        isname: null, //流水号
      },
      timer: {
        timer_one: null, //开始时间
        timer_two: null, //结束时间
         timer_three: null, //开始时间
        timer_flour: null, //结束时间
      },
      ProductCoded: {
        content: null, //产品名称 this.ProductCoded.content
        pcode: null, //产品编码 this.ProductCoded.pcode
      },
      customered: {
        code: null, //客户编码
        name: null, //客户名称
      },
      corporateName: {
        name: null, //公司名字
      },
    };
  },
  watch: {
    visiable() {
      this.contentVisiable = this.visiable; //弹窗的显示隐藏数据
      
      if(this.contentVisiable == true){
        // 绑定enter事件
        this.enterKeyup();
      }else{
           // 销毁enter事件
        this.enterKeyupDestroyed();
      } 
      
    },
    //监听时间的变化
    "queryTemp.creationdate"() {
      this.timer.timer_one=null;
        this.timer.timer_two=null;
      this.timer.timer_one = this.dateFormat(this.queryTemp.creationdate[0]); //开始时间
      this.timer.timer_two = this.dateFormat(this.queryTemp.creationdate[1]); //结束时间
    },
    "queryTemp.delivery"() {
      this.queryTemp.delivery = this.dateFormat(this.queryTemp.delivery);
    },
    'queryTemp.delivery2'(){
      this.timer.timer_three = null;
      this.timer.timer_flour = null
      this.timer.timer_three = this.dateFormat(this.queryTemp.delivery2[0]); //出库开始时间
      this.timer.timer_flour = this.dateFormat(this.queryTemp.delivery2[1]); //出库结束时间
    }
  },

  methods: {
    //点击遮罩层 请求关闭
    handleClose(done) {
      this.contentVisiable = false;
     
      this.$emit("colsed", this.contentVisiable);
    },
    searchs() {
      //点击确定 渲染表格
      let datas = {
        合同编号: this.queryTemp.contractdate,
        预计交货日期: this.queryTemp.delivery,
        // 出库日期: this.queryTemp.delivery,
        合同类型: this.orderType,
        单据状态: this.bill.datas,
        出库开始时间:this.timer.timer_three,
        出库结束时间:this.timer.timer_flour,
        业务员: this.responsibility.mins,
        选择类型: this.mintype.name,
        流水号: this.flowing.isname,
        开始时间: this.timer.timer_one,
        结束时间: this.timer.timer_two,
        产品名称: this.ProductCoded.content,
        产品编码: this.ProductCoded.pcode,
        客户编码: this.customered.code,
        客户名称: this.customered.name,
        公司名称: this.corporateName.name,
        回款情况  :this.bill.collection,
        合同状态:this.contracStatus_type,
        有效合同:this.ycontrac,
        部门:this.department
      };
      this.$emit("search_ts", datas);
    },
    dateFormat(dateData) {
      //对日期进行的处理 
      var date = new Date(dateData);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      const time = y + "-" + m + "-" + d;
      return time;
    },
    //键盘事件
    enterKey(event) {
      const componentName = this.$options.name;
      const code = event.keyCode
        ? event.keyCode
        : event.which
        ? event.which
        : event.charCode;
      //如果按下回车键 执行确定事件
      if (code == 13) {
        this.searchs();
      }
    },
    enterKeyupDestroyed() {
      
      document.removeEventListener("keyup", this.enterKey);
    },
    enterKeyup() {
      document.addEventListener("keyup", this.enterKey);
    },
  },
};
</script>

<style  lang="scss" type="text/scss" scoped>
/deep/ .el-input__inner {
  width: 206px;
}
/deep/ .el-form>div{
  margin-left: 3em;
}
</style>
