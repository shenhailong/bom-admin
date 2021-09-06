<template>
  <!-- <button>导出</button> -->
  <div>
    <big :ishow="shows" :scr="minscr" @close="closeds"></big>
    <el-table
      :data="listData"
      border
      show-summary
      ref="filterTable"
      fit
      id="out-table"
      class="tables2"
      @selection-change="selsChange"
      @row-click="rowClick"
      :row-class-name="tableRowClassName"
      :row-style="{ height: '2px' }"
      :cell-style="{ padding: '3px 0' }"
      highlight-current-row

      :header-cell-style="
        (row, column, rowIndex, columnIndex) => {
          return 'background:#F5F7FA;';
        }
      "
    >
      <el-table-column
        type="selection"
        width="40"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        type="index"
        width="50"
        label="序号"
        show-overflow-tooltip
      ></el-table-column>
      <el-table-column
        v-for="(column, index) in fixedLeftColumns"
        :key="index"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
        :show-overflow-tooltip="true"
        class="titleJs"
      >
      </el-table-column>
      <!--常规字段-->
      <el-table-column
        v-for="(column, index) in columns"
        v-if="column.primary === true ? false : true"
        :key="'s' + index"
        :prop="column.prop"
        :label="column.label"
        :width="column.width"
        :show-overflow-tooltip="true"
      >
      </el-table-column>

      <el-table-column
        :label="'出库单'"
        v-if="$route.path == '/MENU76444/MENU4162'||$route.path == '/MENU67699/MENU86811'"
        :width="150"
      >
        <!-- 只在出库明细表中现实 -->
        <template slot-scope="scope">
          <img
            @click="bigimg(scope.$index, 1)"
            :src="arr[scope.$index]"
            v-if='arr[scope.$index] != null'
            style="width: 100%; height: 100px"
          />
        </template>
      </el-table-column>
      <el-table-column
        :label="'回执单'"
        v-if="$route.path == '/MENU76444/MENU4162'||$route.path == '/MENU67699/MENU86811'"
        :width="150"
      >
        <!-- 只在出库明细表中现实 -->
        <template slot-scope="scope">
          <img
            @click="bigimg(scope.$index, 2)"
            :src="arr1[scope.$index]"
            v-if='arr1[scope.$index] != null'
            style="width: 100%; height: 100px"
          />
        </template>
      </el-table-column>
      <!--操作栏-->
      <el-table-column
        label="操作栏"
        fixed="right"
        :width="actWidth"
        v-if="ishowm"
        style="height: 50px"
        class="conts"
      >
        <template slot-scope="scope">
          <el-badge
            :value="listData[scope.$index].msgNumber"
            class="item"
            v-if="listData[scope.$index].msgNumber != 0 && $route.path != '/MENU61719/MENU12411'"
          >
            <el-button
              v-for="(btn, index) in actBtns"
              v-if="checkBtnIsShow(btn, scope.row).show"
              :icon="btn.iconPic == null ? '' : btn.iconPic"
              :size="btn.btnSize == null ? '' : btn.btnSize"
              :key="'q' + index"
              @click="buttonFunction(btn.name, btn.code, btn.action, scope.row)"
            >
              {{ btn.name }}
            </el-button>
            <i
              v-for="(btn, index) in actBtns"
              v-if="checkITagBtnIsShow(btn, scope.row).show"
              :class="btn.iconPic == null ? '' : btn.iconPic"
              :key="'m' + index"
              @click="buttonFunction(btn.name, btn.code, btn.action, scope.row)"
            >
            </i>
          </el-badge>
          <el-badge class="item" v-else>
            <el-button
              v-for="(btn, index) in actBtns"
              v-if="checkBtnIsShow(btn, scope.row).show"
              :icon="btn.iconPic == null ? '' : btn.iconPic"
              :size="btn.btnSize == null ? '' : btn.btnSize"
              :key="'q' + index"
              @click="buttonFunction(btn.name, btn.code, btn.action, scope.row)"
            >
              {{ btn.name }}
            </el-button>
            <i
              v-for="(btn, index) in actBtns"
              v-if="checkITagBtnIsShow(btn, scope.row).show"
              :class="btn.iconPic == null ? '' : btn.iconPic"
              :key="'m' + index"
              @click="buttonFunction(btn.name, btn.code, btn.action, scope.row)"
            >
            </i>
          </el-badge>
        </template>
      </el-table-column>
    </el-table>

    <!-- <div    style="float:right;margin:30px 10% 0 0;">
  	<el-button  type="primary" size="mini" @click="exportExcel" >点击导出</el-button> 
  </div> -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { downloadProductFile } from "@/api/pub/pub";
import big from "./big/big";
import FileSaver from "file-saver";
import XLSX from "xlsx";
export default {
  name: "List",
  props: ["replace"],
  components: {
    big,
  },
  computed: {
    ...mapGetters([
      "listData",
      "fixedLeftColumns",
      "columns",
      "actBtns",
      "actWidth",
      "name",
    ]),
    tablewatch() {
      let mindata = [];
      // console.log(this.columns);
      for (let i of this.columns) {
        // console.log(i);
        mindata.push(i.prop);
      }

      return mindata;
    },
    tablewatch_label() {
      let mindata = [];
      for (let i of this.columns) {
        mindata.push(i.label);
      }
      // console.log(mindata);
      return mindata;
    },
  },
  data() {
    return {
      sels: [], // 选中的列表
      ishowm: true,
      heights: null,
      uploadUrl: process.env.BASE_API + "/", // 图片的本地地址
      arr: [],
      title: [],
      arr1: [],
      shows: false,
      minscr: null,
    };
  },
  created() {
    this.sels = []; // 选中的列表
    // console.log(this.columns);
    // console.log(this.listData); console.log(this.$store.getters.listData);
  },

  watch: {
    columns() {},
    listData() {
      this.arr = [];
      this.arr1 = [];
      // if (this.$route.path == "1") {
      //   for (let i = 0; i < this.listData.length; i++) {
      //     // console.log(i.upFileFileList[0]);
      //     this.downloadProccessFile(this.listData[i].upFileFileList[0]);
      //     // uisFileimgs
      //     this.downloadProccessFiles(this.listData[i].uisFileimgs[0]);
      //   }
      // }
      for (let i of this.listData) {
        // i.fileUrl = this.uploadUrl + i.fileUrl;
        // i.receiptUrl = this.uploadUrl + i.receiptUrl;
        this.arr.push(i.fileUrl);
        this.arr1.push(i.receiptUrl);
        // console.log(this.arr,this.arr1);
      }
      // for(let i of this.listData){
      //    this.downloadProccessFile(i.upFileFileList[0]);
      // }
    },
  },
  mounted: function () {
    window.addEventListener("scroll", this.getScrollPosition, false);
  },
  destroyed: function () {
    window.removeEventListener("scroll", this.getScrollPosition, false);
  },
  updated() {
    // this.arr = [];
    //   this.arr1 = [];
    // if (this.$route.path == "/MENU76444/MENU4162") {
    //   for (let i = 0; i < this.listData.length; i++) {
    //     // console.log(i.upFileFileList[0]);
    //     this.downloadProccessFile(this.listData[i].upFileFileList[0]);
    //     // uisFileimgs
    //     this.downloadProccessFiles(this.listData[i].uisFileimgs[0]);
    //   }
    // }
    //订单利润里面独有的计算的兼容写法
    let arr = [
      "/MENU36962/MENU47518",
      "/MENU61719/MENU46542",
      "/MENU36962/MENU9093",
      "/MENU36962/MENU25210",
      "/MENU13775/MENU55129",
      "/MENU13775/MENU83320",
      "/MENU13775/MENU49822",
      "/MENU13775/MENU57636",
      '/MENU13775/MENU6859',
    ];
    if (arr.includes(this.$route.path)) {
    } else {
      var el = document.getElementsByClassName("el-table__footer-wrapper")[0];
      var el2 = document.getElementsByClassName(
        "el-table__fixed-footer-wrapper"
      );
      if (el) {
        el.style.display = "none";
        el2[0].style.display = "none";
      }
    }
  },
  methods: {
    myself() {
      this.ishowm = !this.ishowm;
    },
    // 校验当前按钮是否显示
    checkBtnIsShow(btn, row) {
      let defaultShow = true; // 默认显示
      if (btn && row) {
        let btnWhen = btn.when;
        if (btnWhen) {
          // // console.log();

          defaultShow = false; // 如果有when属性默认按钮为不显示
          for (let key in btnWhen) {
            let caseValueArr = btnWhen[key]; // 条件值数组
            let rowDataVal = this.initRealValueByReplace(row[key]);
            if (caseValueArr) {
              for (let caseIndex in caseValueArr) {
                // console.log(caseValueArr[caseIndex],rowDataVal);
                if (caseValueArr[caseIndex] == rowDataVal) {
                  defaultShow = true;
                }
              }
            }
          }
        }
        // console.log();
        // 如果 typeLess为itag 不显示
        if (btn.typeLess === "itag") {
          defaultShow = false;
        }
      }
      return { show: defaultShow };
    },

    checkITagBtnIsShow(btn, row) {
      let defaultShow = true; // 默认显示
      if (btn && row) {
        let btnWhen = btn.when;
        if (btnWhen) {
          defaultShow = false; // 如果有when属性默认按钮为不显示
          for (let key in btnWhen) {
            let caseValueArr = btnWhen[key]; // 条件值数组
            let rowDataVal = this.initRealValueByReplace(row[key]);
            if (caseValueArr) {
              for (let caseIndex in caseValueArr) {
                if (caseValueArr[caseIndex] == rowDataVal) {
                  defaultShow = true;
                }
              }
            }
          }
        }
      }
      return { show: defaultShow };
    },

    // 校验当前I标签按钮是否显示
    // checkITagBtnIsShow(btn, row) {
    //   let defaultShow = true; // 默认显示
    //   if (btn && row) {
    //     let btnWhen = btn.when;
    //     if (btnWhen) {
    //       // defaultShow = false; // 如果有when属性默认按钮为不显示
    //       for (let key in btnWhen) {
    //         if (this.$route.path == "/MENU36962/MENU9093") {
    //           //合同信息里面的修改界面单独的判断
    //           let caseValueArr = btnWhen[key]; // 条件值数组
    //           let rowDataVal = this.initRealValueByReplace(row[key]);
    //           console.log(row[key]);
    //           if (caseValueArr) {
    //             for (let caseIndex in caseValueArr) {
    //               if (caseValueArr[caseIndex] == rowDataVal) {
    //                 defaultShow = false;
    //               }
    //             }
    //           }
    //         } else {
    //           let caseValueArr = btnWhen[key]; // 条件值数组
    //           let rowDataVal = this.initRealValueByReplace(row[key]);
    //           // console.log(row[key]);
    //           if (caseValueArr) {
    //             for (let caseIndex in caseValueArr) {
    //               if (caseValueArr[caseIndex] == rowDataVal) {
    //                 defaultShow = true;
    //               }
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    //   return { show: defaultShow };
    // },
    // 将显示的值还原为真实的值
    initRealValueByReplace(showValue) {
      let replace = this.replace;
      if (showValue && replace) {
        for (let index in replace) {
          let porp = replace[index].name;
          let repVal = replace[index].replace;
          for (let key in repVal) {
            let rpValue = repVal[key];
            if (showValue === rpValue) {
              showValue = key;
              return showValue;
            }
          }
        }
      }
      return showValue;
    },
    //导出excel

    filterHandler(value, row, column) {
      const property = column["property"];
      return row[property] === value;
    },
    buttonFunction(name, code, action, row) {
      let param = {
        btnName: name,
        btnCode: code,
        btnAction: action,
        bindData: row,
      };
      this.$emit("onButtonClick", param);
    },
    rowClick(row, event, column) {
      // 列表中的行被点击后
      let param = { btnName: "rowClick", btnCode: "rowClick", bindData: row };
      this.$emit("onButtonClick", param);
    },
    selsChange(sels) {
      // 更新选中列表的值
      this.sels = sels;
      this.$emit("refreshSelList", sels);
    },
    //根据条件仍列表行变色
    tableRowClassName({ row, rowIndex }) {
      // console.log(this.$route.path)
      if (this.$route.path == "/MENU3252/MENU32036" && row.pIsverify == "2") {
        return "success-row";
      } else if (
        this.$route.path == "/MENU3252/MENU95693" &&
        row.fIsverify == "2"
      ) {
        return "success-row";
      }
    },
    closeds() {
      this.shows = false;
    },

    bigimg(index, num) {
      // console.log(index);
      this.shows = true;
      if (num == 1) {
        this.minscr = this.arr[index];
      } else {
        this.minscr = this.arr1[index];
      }

      // console.log(this.scr);
    },
    getScrollPosition() {
      // 表格头部的定位
      // this.$refs.czl.$el.style.display='none'
      // if (this.$route.path != "/MENU78649/MENU36446") {
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      // console.log(top);
      if (this.$route.path != "/MENU78649/MENU36446") {
        if (top >= 360) {
          // this.wrap = document.querySelector(".content");
          var el = document.querySelector(".el-table__header-wrapper");
          var el2 = document.querySelector(".el-table__fixed-right");
          var el3 = document.querySelector(".is-hidden");

          el.style.position = "fixed";
          el2.style.top = -el3.offsetHeight + "px";
          // console.log(el2.style.top);
          el2.style.height = this.heights;
          // el.style.top = 0
          // console.log(el);
        } else {
          var el = document.querySelector(".el-table__header-wrapper");
          var el2 = document.querySelector(".el-table__fixed-right");
          // el-table__fixed-right
          // console.log(el2.style.height);
          this.heights = el2.style.height;
          el2.style.top = "0px";
          // console.log(el);
          el.style.position = "";
        }
      }

      // 滚动条距左端距离
      //   let left =
      //     document.documentElement.scrollLeft || document.body.scrollLeft;
      // // }
      // 滚动条距顶部距离
    },
    //导出的方法
    exportExcel() {
      // console.log(this.listData);
      require.ensure([], () => {
        const { export_json_to_excel } = require("@/Excel/Export2Excel"); //注意这个Export2Excel路径
        const tHeader = this.tablewatch_label; // 上面设置Excel的表格第一行的标题
        const filterVal = this.tablewatch; // 上面的index、nickName、name是tableData里对象的属性key值
        const list = this.sels; //把要导出的数据tableData存到list

        for (var i = 0; i < list.length; i++) {
          if (list[i].materialSource == "0") {
            list[i].materialSource = "甲方提供";
          } else if (list[i].materialSource == "1") {
            list[i].materialSource = "乙方提供";
          } else if (list[i].materialSource == "2") {
            list[i].materialSource = "部分甲方提供";
          }
        }
        if (tHeader[0] != "序号") {
          tHeader.unshift("序号");
        }
        var data = this.formatJson(filterVal, list);
        for (var i = 0; i < data.length; i++) {
          // console.log(tHeader[0]);
          data[i].unshift(data.indexOf(data[i]) + 1);
        }

        export_json_to_excel(tHeader, data, "创元智造"); //最后一个是表名字
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map((v) => filterVal.map((j) => v[j]));
    },
  },
};
</script>
<style  lang="scss" type="text/scss" scoped>
/deep/ .el-upload-dragger {
  display: none;
}
/deep/.el-table__header-wrapper {
  /* position: fixed; */
  z-index: 100;
  top: 0;
}
/deep/.el-table__row {
  td {
    //  height: 40px !important;
  }
}
/deep/ .el-table .cell {
  /* overflow: visible; */
  padding-top: 10px;
  //  height: 40px !important;
   // line-height: 60px;
}
//
.el-badge__content {
}
.el-table__body tr.current-row > td {
  /* background-color: #51E0FF !important; */
  background-color: #409eff !important;

  color: black;
}

.el-table .success-row {
  background: #ff0000;
}
</style>
<style scoped>
div {
  font-size: 8px;
}
i {
  font-size: 15px;
  padding-left: 10px;
  cursor: pointer;
}
</style>