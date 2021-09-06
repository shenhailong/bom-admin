<template>
  <div>
    <Top
      :search_columns="search_columns"
      :fastFilter="fastFilter"
      @getSearchData="getSearchData"
      @onButtonClick="onButtonClick"
      @refreshList="parent"
      @actionbar="actionbar"
    >
    </Top>
    <hr />
    <List
      ref="reflush"
      style="min-height: 550px"
      :replace="replace"
      @onButtonClick="onButtonClick"
      @refreshSelList="refreshSelList"
    ></List>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />
  </div>
</template>

<script>
import List from "@/components/viewcomp/List";
import Top from "@/components/viewcomp/Top";
import Pagination from "@/components/Pagination";
import { mapGetters } from "vuex";

export default {
  name: "Table",
  props: ["fastFilter", "select", "columns", "top_btn", "act_btn", "replace"],
  components: { Top, List, Pagination },
  computed: {
    ...mapGetters(["name", "roles"]),
  },
  data() {
    return {
      search_columns: [], // 查询字段
      title: "",
      searchData: [], // 查询结果数据
      listData: [], // 列表数据
      total: 0, // 数据量
      listQuery: {
        page: 1,
        limit: 10,
      },
      sels: [], // 选中的列表
    };
  },
  watch: {
    // 监听查询参数变化
    select(val) {
      if (val.queryParam) {
        for (let key in val.queryParam) {
          // this.listQuery[key] = val.queryParam[key]
          //页面重定向问题的解决 不需要可以删除 改为1
          val.queryParam.page = this.listQuery.page;
          val.queryParam.limit = this.listQuery.limit;

          this.listQuery = val.queryParam;
          // this.listQuery.page = 1;
          // this.listQuery.limit = 10;
        }
        this.getList();
      }
    },
  },
  created() {
    //保留当前页操作
    this.listQuery.page = Number(localStorage.getItem("pagination")) || 1;
    this.pageChange(this.listQuery.page);
    //////////
    // 初始过滤条件
    if (this.select.queryParam) {
      for (let key in this.select.queryParam) {
        this.listQuery[key] = this.select.queryParam[key];
      }
    }
    // 初始化表头信息
    let columns = this.columns;
    // console.log(columns);
    let fixedLeftColumns = [];
    let listColumns = [];
    for (let index in columns) {
      let columnOne = columns[index];
      if (columnOne.search) {
        // 搜索字段
        this.search_columns.push(columnOne);
      }
      // 固定左边列字段
      if (columnOne.show !== false && columnOne.fixedLeft === true) {
        fixedLeftColumns.push(columnOne);
      }
      // 常规字段
      if (columnOne.show !== false && columnOne.fixedLeft !== true) {
        listColumns.push(columnOne);
      }
    }
    // console.dir(listColumns);
    this.$store.commit("SET_FIXEDLEFT_COLUMNS", fixedLeftColumns);
    this.$store.commit("SET_COLUMNS", listColumns);

    // 初始化查询
    this.getList();

    // 初始化顶部组件按钮组
    const topButtons = this.top_btn;
    if (topButtons && typeof topButtons === "object" && topButtons.length > 0) {
      this.$store.commit("SET_TOPBUTTON", topButtons);
    } else {
      this.$store.commit("SET_TOPBUTTON", []);
    }

    //初始化操作栏按钮
    const actionButtons = this.act_btn;
    if (
      actionButtons &&
      typeof actionButtons === "object" &&
      actionButtons.length > 0
    ) {
      this.$store.commit("SET_ACTBUTTON", actionButtons);
      // 判断是否设置了宽度\
      if (actionButtons[0].width) {
        this.$store.commit("SET_ACTWIDTH", actionButtons[0].width);
      } else {
        this.$store.commit("SET_ACTWIDTH", null);
      }
    } else {
      this.$store.commit("SET_ACTBUTTON", []);
    }
  },
  //保留当前页操作
  beforeUpdate() {
    localStorage.setItem("pagination", this.listQuery.page);
  },
  //保留当前页操作
  beforeDestroy() {
    localStorage.setItem("pagination", "1");
  },
  methods: {
    //调用list的导出方法
    parent() {
      this.$refs.reflush.exportExcel();
    },
    actionbar() {
      this.$refs.reflush.myself();
    },
    //保留当前页操作
    pageChange(page) {
      this.listQuery.page = page;
    },
    //小数点的向上近位置  第一为需要近卫的数  第二为进到小数点的第几位
    ceilNum(d, prex) {
      if (parseInt(d) == d) return d;
      let len = 1;
      let i = 0;
      while (parseInt(d) != d) {
        d = d * 10;
        len *= 10;
        i++;
      }
      let last = Math.abs(i <= prex ? 0 : d % Math.pow(10, i - prex));
      let d1 = d - last;
      if (last > 0) {
        d1 = d1 + Math.pow(10, i - prex);
      }
      d1 = d1 / len;
      return d1;
    },
    getList() {
      // 查询列表数据
      if (this.select && this.select.select) {
        let selectFunc = this.select.select;
        // console.log(selectFunc);
        selectFunc(this.listQuery).then((response) => {
          // console.log(response.object);
          // response.object = null
          if (response.object != null) {
            for (let i of response.object) {
              
              // console.log(i);
              // i.MaterialCostPrices = 0
              //----------------
              i.Intaxprice = 0; //计算含税单价
              if (i.purchasePrice && i.productPcbPrice) {
                i.Intaxprice = i.purchasePrice + i.productPcbPrice;
              } else {
                i.Intaxprice = 0;
              }
              //----------------
              //计算含税总价----------------------------------------------------------------------------------------------------------------
              i.IntaxZprice = 0;
              if (i.Intaxprice == 0) {
                i.IntaxZprice = 0;
              } else {
                // i.IntaxZprice = (i.Intaxprice * i.productNum).toFixed(2);
                console.log(i.Intaxprice * i.productNum);
                if(!isNaN(i.Intaxprice * i.productNum)){
                  i.IntaxZprice = this.ceilNum(i.Intaxprice * i.productNum, 2);
                }else{
                  i.IntaxZprice = null
                }
                // 
              }
              //----------------
              
              //生产明细中的smt ，dip ， 三防，老化的计算 ----------------------------------------------------------------------------------------------------------------
              i.asprice = 0;
              i.smtUnitPrices = i.smtPeople * i.smtTotalWorkHours * i.smtCost;
              i.dipUnitPrice = i.dipPeople * i.dipTotalWorkHours * i.dipCost;
              i.defenseUnitPrice =
                i.defensePeople * i.defenseTotalWorkHours * i.defenseCost;
              i.testUnitPrice =
                i.testPeople * i.testTotalWorkHours * i.testCost;
              i.asprice =
                i.smtUnitPrices +
                i.dipUnitPrice +
                i.defenseUnitPrice +
                i.testUnitPrice;
              if (
                typeof i.asprice == "number" &&
                this.$route.path == "/MENU61719/MENU46542"
              ) {
                // i.asprice = i.asprice.toFixed(3);
                i.asprice = this.ceilNum(i.asprice, 2);
              }
              //----------------
              i.Costunitprice = 0; //生产成本的单价
              if (i.smtUnitPrices != 0 ) {
                i.Costunitprice += Number(i.smtUnitPrices / i.smtWorkEndNum);
              }
              if (i.dipUnitPrice != 0) {
                i.Costunitprice += Number(i.dipUnitPrice / i.dipWorkEndNum);
              }
              if (i.defenseUnitPrice != 0) {
                i.Costunitprice += Number(
                  i.defenseUnitPrice / i.defenseWorkEndNum
                );
              }
              if (i.testUnitPrice != 0) {
                i.Costunitprice += Number(i.testUnitPrice / i.testWorkEndNum);
              }

              if (
                typeof i.Costunitprice == "number" &&
                this.$route.path == "/MENU61719/MENU46542"
              ) {
                // i.Costunitprice = i.Costunitprice.toFixed(3);
                i.Costunitprice = this.ceilNum(i.Costunitprice, 2); //生产成本单价
              }
              //----------------
              if (i.creationtime != null) {
                i.creationtime = i.creationtime.slice(0, 11);
              }
              if (i.modifiedtime != null) {
                i.modifiedtime = i.modifiedtime.slice(0, 11);
              }
              if (i.orderSignTime != null) {
                i.orderSignTime = i.orderSignTime.slice(0, 11); //限制签订日期
              }
              if (i.ts != null) {
                i.ts = i.ts.slice(0, 11); //限制签订日期
              }

              if (i.billProductOrderBPos) {
                // 计算合同总价
                for (var s = 0; s < i.billProductOrderBPos.length; s++) {
                  i.billProductOrderBPos[s].productTotalPrice =
                    Number(i.billProductOrderBPos[s].productNum) *
                    Number(i.billProductOrderBPos[s].productUnitPrice);
                  if (
                    i.billProductOrderBPos[s].productOrderBHPos != null &&
                    i.billProductOrderBPos[s].productOrderBHPos[0] != null
                  ) {
                    //添加钢网价格
                    let allprice;
                    for (let q of i.billProductOrderBPos[s].productOrderBHPos) {
                      q.allprice =
                        Number(q.processParam) * Number(q.saleUnitTotalOut);
                      allprice = Number(q.allprice);
                    }
                    i.orderSummeryPriceTotal +=
                      Number(i.billProductOrderBPos[s].productTotalPrice) +
                      Number(allprice);
                  } else {
                    i.orderSummeryPriceTotal += Number(
                      i.billProductOrderBPos[s].productTotalPrice != null
                        ? i.billProductOrderBPos[s].productTotalPrice
                        : 0
                    );
                  }
                  i.billProductOrderBPos[s].productTotalPrice = this.ceilNum(
                    i.billProductOrderBPos[s].productTotalPrice,
                    2
                  );
                }

                if (typeof i.orderSummeryPriceTotal == "number") {
                  i.orderSummeryPriceTotal = this.ceilNum(
                    i.orderSummeryPriceTotal,
                    2
                  );
                }
              }
              // console.log(i.finishNum/i.finishSmtTotalCost);
            //  console.log(null/null);
              if (i.finishNum != null && i.finishSmtTotalCost != null) {
                i.mPrice = i.finishSmtTotalCost / i.finishNum;
                
              //  console.log( isNaN(i.mPrice));
                
                
              }
              if (i.finishTestTotalCost != null && i.finishNum != null) {
                i.mPrice = i.finishTestTotalCost / i.finishNum;
                // i.mPrice = this.ceilNum(i.mPrice, 2);
              }
              if (i.finishDipTotalCost != null && i.finishNum != null) {
                i.mPrice = i.finishDipTotalCost / i.finishNum;
                // i.mPrice = this.ceilNum(i.mPrice, 2);
              }
              if (i.finishDefenseTotalCost != null && i.finishNum != null) {
                i.mPrice = i.finishDefenseTotalCost / i.finishNum;
                // i.mPrice = this.ceilNum(i.mPrice, 2);
              }
              // console.log(i.mPrice =='Infinity');
              if(isNaN(i.mPrice) || i.mPrice =='Infinity'){
                  i.mPrice = 0
                }else{
                  // console.log(i.mPrice);
                  i.mPrice = this.ceilNum(i.mPrice, 2);
                }
              //----------------
              //专门控制按钮显示隐藏字段
              i.dis = 1;

              if (i.code) {
                i.steelCode = i.code + "-G";
              }
              //----------------
              //计算产品单价
              
              i.aprice = 0;
              if (i.billPurchaseQuotePo && i.billPurchaseQuotePo != null) {
                i.aprice =
                  i.billPurchaseQuotePo.purchasePriceSale +
                  i.billPurchaseQuotePo.productPcbPriceSale;
              }
              // let s = 0
              if (i.billProduceQuoteBPoList) {
                for (let m of i.billProduceQuoteBPoList) {
                   i.aprice += m.unitTotalPriceSale;
                }
                i.aprice = this.ceilNum(i.aprice, 3);
                //计算产品总价
                i.allprice = Number(i.aprice) * Number(i.productNum);
                i.allprice = this.ceilNum(i.allprice, 2);
              }
              
              //----------------
              //订单利润里面的计算 ----------------------------------------------------------------------------------------------------------------
              if (i.materialCostPrice != null) {
                //成本物料未税金额
                i.MaterialCostPrices = i.materialCostPrice / i.taxinclud;
                i.MaterialCostPrices = this.ceilNum(i.MaterialCostPrices, 2);
                // console.log(this.ceilNum(i.MaterialCostPrices,2));
              } else {
                i.MaterialCostPrices = 0;
              }
              if (i.saleProductionNotTax != null) {
                //销售生产未税金额
                // console.log(i.saleProductionNotTax );
                i.saleProductionNotTax = i.saleProductionNotTax / i.taxinclud;
                i.saleProductionNotTax = this.ceilNum(
                  i.saleProductionNotTax,
                  2
                );
              } else {
                i.saleProductionNotTax = 0;
              }
              //
              // if()
              i.saleMaterialNotTax =
                (i.purchaseTotalSale + i.productPcbTotal) / i.taxinclud; //销售物料未税金额
              if (
                this.$route.path == "/MENU36962/MENU47518" &&
                typeof i.saleMaterialNotTax == "number" &&
                i.saleMaterialNotTax != 0
              ) {
                // i.saleMaterialNotTax = i.saleMaterialNotTax.toFixed(3);
                i.saleMaterialNotTax = this.ceilNum(i.saleMaterialNotTax, 2);
              }

              if (this.$route.path == "/MENU36962/MENU47518") {
                //制具计算
                i.Steelmeshcost = (i.usingPrice + i.steelPrice) / i.taxinclud;
                i.Steelmeshcost = this.ceilNum(i.Steelmeshcost, 2);
                i.Salestooling = i.usingPriceSale / i.taxinclud;
                i.Salestooling = this.ceilNum(i.Salestooling, 2);
                i.Toolingprofit = i.Salestooling - i.Steelmeshcost;
                i.Toolingprofit = this.ceilNum(i.Toolingprofit, 2);
                i.money =
                  (i.productUnitPrice * i.constractProductNum) / i.taxinclud;
                i.money = this.ceilNum(i.money, 2);
              }
              //制具,物料,生产,的利润 和小数点小数点近卫
              i.xprice = i.saleMaterialNotTax - i.MaterialCostPrices;
              i.xprice1 = i.saleProductionNotTax - i.unitTotalOut;
              i.xprice2 = i.xprice + i.xprice1 + i.Toolingprofit;
              if (i.xprice && this.$route.path == "/MENU36962/MENU47518") {
                i.xprice = this.ceilNum(i.xprice, 2);
              }
              if (
                i.unitTotalOut &&
                this.$route.path == "/MENU36962/MENU47518"
              ) {
                // 成本生产未税金额  后台数据的小数点进位
                i.unitTotalOut = this.ceilNum(i.unitTotalOut, 2);
              }
              if (i.xprice1 && this.$route.path == "/MENU36962/MENU47518") {
                i.xprice1 = i.xprice1.toFixed(2);
              }
              if (i.xprice2 && this.$route.path == "/MENU36962/MENU47518") {
                i.xprice2 = i.xprice2.toFixed(2);
              }

              // console.log(i.finishNum);
              if (i.finishNum ) {
                //累计出库数量出现小数点问题
                // i.finishNum = Math.floor(i.finishNum);
              }
              //财务 ----------------------------------------------------------------------------------------------------------------
              // i.finishNum = 10; //假的出库数量
              if (i.noTotalInvoicePrice == null) {
                i.noTotalInvoicePrice = 0;
              }
              //财务产品报表的出库数量兼容
              if (
                this.$route.path == "/MENU13775/MENU57636" &&
                i.finishNum == null
              ) {
                i.finishNum = 0;
              }
              if (i.productNum != null && i.productUnitPrice != null) {
                i.zPrice = i.productNum * i.productUnitPrice; //总价
              }
              if (i.finishNum != null && i.productUnitPrice != null) {
                // i.priceCompleted = i.finishNum * i.productUnitPrice; //应收金额
                i.nopriceCompleted = i.priceCompleted - i.backSum; //未结款金额
                if(isNaN(i.nopriceCompleted )){
                  i.nopriceCompleted  = 0
                }else{
                  i.nopriceCompleted = this.ceilNum(i.nopriceCompleted, 3);
                }
                
                i.notInvoiced = i.priceCompleted - i.invoiceSum; // 未开票金额
                if(isNaN(i.notInvoiced)){
                  i.notInvoiced = 0
                }else{
                  i.notInvoiced = this.ceilNum(i.notInvoiced, 3);
                }
                
              }
              // i.contractBillState=30
              if (i.productNum != null && i.finishNum != null) {
                // i.nout = i.productNum - i.finishNum;
              }
              //财务pcb总价 和采购总价
              if(i.productPcbPrice != 0  && i.constractProductNum !=0 ){
                i.productPcbPriceall = i.productPcbPrice *  i.constractProductNum //pcb总价
              }else{
                i.productPcbPriceall = 0
              }
              if(i.constractProductNum !=0 && i.purchasePrice != 0){
                i.purchasePriceall =  i.constractProductNum * i.purchasePrice //采购总价
              }else{
                i.purchasePriceall = 0
              }
              //财务的合同总价
              if (i.billProductOrderBPoList) {
                i.orderSummeryPriceTotal = 0;

                for (let s of i.billProductOrderBPoList) {
                  s.productNum =
                    s.productNum == null
                      ? (s.productNum = 0)
                      : (s.productNum = Number(s.productNum));
                  s.productUnitPrice =
                    s.productUnitPrice == null
                      ? (s.productUnitPrice = 0)
                      : (s.productUnitPrice = Number(s.productUnitPrice));
                  if (s.productNum != 0 && s.productUnitPrice != 0) {
                    s.productTotalPrice = s.productNum * s.productUnitPrice;
                  } else {
                    s.productTotalPrice = 0;
                  }
                  // console.log( s.productTotalPrice);
                  // let o = 0 ;
                  // o += s.productTotalPrice
                  // console.log(o);
                  if (
                    s.productOrderBHPos != null &&
                    s.productOrderBHPos[0] != null
                  ) {
                    //判断时候涵盖钢网
                    let productOrderBHPosm = 0;
                    for (let m of s.productOrderBHPos) {
                      productOrderBHPosm += m.saleUnitTotalOut; //添加钢网总价
                    }

                    i.orderSummeryPriceTotal += Number(s.productTotalPrice);
                    i.orderSummeryPriceTotal =
                      i.orderSummeryPriceTotal + Number(productOrderBHPosm);
                    i.orderSummeryPriceTotal = this.ceilNum(
                      i.orderSummeryPriceTotal,
                      3
                    );
                  } else {
                    //不添加钢网

                    i.orderSummeryPriceTotal += Number(s.productTotalPrice);

                    i.orderSummeryPriceTotal = this.ceilNum(
                      i.orderSummeryPriceTotal,
                      3
                    );
                  }
                  // let o = 0
                  // o+=i.orderSummeryPriceTotal
                  // console.log(o,i.orderSummeryPriceTotal);
                }
                // console.log(i);
                //--------------
                if (i.invoiceSum == null) {
                  i.invoiceSum = 0;
                }
                if (i.backSum == null) {
                  i.backSum = 0;
                }
                i.oninvoiceSum = i.orderSummeryPriceTotal - i.invoiceSum;
                i.onbackSum = i.orderSummeryPriceTotal - i.backSum;
                //  i.time = '2020-12-31'
                if (i.putoutOutTime != null) {
                  //倒计时计算
                  let n;
                  n = i.putoutOutTime.split("-");
                  let myDate = new Date();
                  let timess = this.GetDateStr(i.putoutOutTime, 90); //90天后的时间
                  let ios = this.getchaTime(timess); //剩余的天数
                  i.endTime = ios;
                } else {
                  i.putoutOutTime = "无";
                  i.endTime = "无";
                }
              }
              //出库明细表  ----------------------------------------------------------------------------------------------------------------
              i.uisFileimgs = [
                { name: i.receiptName, fullName: i.receiptFullname },
              ];
              i.upFileFileList = [
                { name: i.fileName, fullName: i.fileFullname },
              ]; //文件的提交 list文件中有专门针对渲染单独的文件渲染
              if (i.productUnitPrice && i.productTotalPrice) {
                //关于财务明细总价和单价的保留小数点
                i.productUnitPrice = this.ceilNum(i.productUnitPrice, 3);
                i.productTotalPrice = this.ceilNum(i.productTotalPrice, 3);
              }
             
            }

          } else {
            response.object = [];
          }

          let listData = response.object;

          this.total = response.total;
          // console.log(response.total);
          this.initReplaceData(listData);
        });
      }
    },
    initReplaceData(result) {
      // 数据格式化
      if (result) {
        // 替换字段格式化
        const replace = this.replace;
        if (result) {
          if (replace) {
            for (let index in replace) {
              let r = replace[index];
              let prop = r.name;
              let doReplace = r.replace;
              for (let j in result) {
                let valueForResult = result[j][prop];
                for (let key in doReplace) {
                  let value = doReplace[key];
                  if (valueForResult == key) {
                    result[j][prop] = value;
                  }
                }
              }
            }
          }
        }
      }
      this.$store.commit("SET_LISTDATA", result);
    },
    GetDateStr(name, AddDayCount) {
      //几天后的时间
      var dd = new Date(name);
      dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期
      var y = dd.getFullYear();
      var m =
        dd.getMonth() + 1 < 10 ? "0" + (dd.getMonth() + 1) : dd.getMonth() + 1; //获取当前月份的日期，不足10补0
      var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0
      return y + "-" + m + "-" + d;
    },
    getchaTime(datem) {
      //时间倒计时
      let bsDate = new Date(datem);
      let date = new Date();
      let start = bsDate.getTime() - date.getTime(); //传递时间和当前时间差异 毫秒计算
      let startday = Math.floor(start / (1000 * 60 * 60 * 24));
      return startday;
    },
    getSearchData(params) {
      // 通过查询条件查询数据并返回
      if (params) {
        for (let index in params) {
          if (params[index]) {
            let selprop = params[index].selprop; // 查询字段
            let selval = params[index].selval; // 查询字段内容

            if (selprop) {
              this.listQuery[selprop] = selval;
            }
          }
        }
      }
      this.getList();
    },
    onButtonClick(param) {
      // 点击按钮触发的事件
      param.sels = this.sels;
      if (param) {
        let btnCode = param.btnCode;
        switch (btnCode) {
          case "DELETE":
            let bindRow = param.bindData; // 当前行数据
            let deleteAction = param.btnAction; // 删除Action
            let rowPrimary = this.findPrimaryColumn();
            if (deleteAction) {
              let deleteParam = { pkArr: bindRow[rowPrimary] };

              this.$confirm("您是否确认删除?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              })
                .then((response) => {
                  this.$message({
                    message: "删除成功",
                    type: "success",
                  });
                  deleteAction(deleteParam);
                  // location.reload();
                  this.getList();
                })
                .catch(() => {
                  this.$message({
                    type: "info",
                    message: "已取消删除",
                  });
                });
            }
            break;
        }
        this.$emit("onButtonClick", param);
      }
    },
    findPrimaryColumn() {
      // 获取列中的主键
      let columns = this.columns;
      // console.log(columns);
      if (columns) {
        for (let index in columns) {
          let colOne = columns[index];

          if (colOne && colOne.primary === true) {
            return colOne.prop;
          }
        }
      }
      return "HAVE_NOT_PRIMARY";
    },
    refreshSelList(sels) {
      this.sels = sels;
    },
  },
};
</script>

<style scoped>
</style>
