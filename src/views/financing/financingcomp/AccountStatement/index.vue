<template>
  <!-- 财务对账单 -->
  <el-dialog
    :title="'对账单'"
    :visible.sync="contentVisiable"
    @close="closeDialog"
    width="90%"
  >
    <div class="tit">
      <div>客户名称:110</div>
      <div></div>
      <div>对账期间 :111111</div>
    </div>
    <el-table
      :data="tableData"
      border
      :summary-method="getSummaries"
      show-summary
    >
      <el-table-column prop="id" label="ID" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名"> </el-table-column>
      <el-table-column prop="amount1" label="数值 1（元）"> </el-table-column>
      <el-table-column prop="amount2" label="数值 2（元）"> </el-table-column>
      <el-table-column prop="amount3" label="数值 3（元）"> </el-table-column>
      <el-table-column prop="amount3" label="数值 3（元）"> </el-table-column>
    </el-table>
    <div>
      <el-button type="primary" @click="exportExcel">下载</el-button>
    </div>

   
  </el-dialog>
</template>
<script>
export default {
  props: ["visibles"],
  data() {
    return {
      contentVisiable: false,
      ss: 111111,
      s:{
        name:'sdasd'
      },
      tableData: [
        {
          id: "12987122",
          name: "王小虎",
          amount1: "234",
          amount2: "3.2",
          amount3: 10,
        },
        {
          id: "12987123",
          name: "王小虎",
          amount1: "165",
          amount2: "4.43",
          amount3: 12,
        },
        {
          id: "12987124",
          name: "王小虎",
          amount1: "324",
          amount2: "1.9",
          amount3: 9,
        },
        {
          id: "12987125",
          name: "王小虎",
          amount1: "621",
          amount2: "2.2",
          amount3: 17,
        },
        {
          id: "12987126",
          name: "王小虎",
          amount1: "539",
          amount2: "4.1",
          amount3: 15,
        },
      ],
      excelTitle:null
    };
  },
  watch: {
    visibles() {
      // console.log(11);
      this.contentVisiable = this.visibles; // 控制显示隐藏
      // console.log(this.convertToChinaNum(1111111111));
      // this.ss=1111111
    },
  },
  methods: {

    closeDialog() {
      this.$emit("close");
    },
  exportExcel(){
    //特殊表格的封装
        import('@/vendor/Export2Excel').then(excel => {
          const title = ['创元成业', '', '', '', '', '', '', '', '']  //标题
          const tHeader = ['因', '为', '我', '们', '相', '信', '有', '奇', '迹'] //表头
          const mi =  ['所','以','我','们','相','遇','在','这','里']
        //表头对应字段
          const filterVal =  ['id','name','amount1','amount2','amount3'];
          const list = [];
          const data = this.formatJson(filterVal, list)
          data.map(item => {
            // console.log(item)
            item.map((i, index) => {
              if (!i) {
                item[index] = ''
              }
            })
          })
          const merges = ['A1:I1'] //合并单元格
          excel.export_json_to_excel({
            title: title,
            header: tHeader,
            data,
            merges,
            mi,
            filename: '财务对账单',
            autoWidth: true,
            bookType: 'xlsx'
          })
        })
      },

    formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },

    //  计算数字的大写
    convertToChinaNum(num) {
      var arr1 = new Array(
        "零",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九"
      );
      var arr2 = new Array(
        "",
        "十",
        "百",
        "千",
        "万",
        "十",
        "百",
        "千",
        "亿",
        "十",
        "百",
        "千",
        "万",
        "十",
        "百",
        "千",
        "亿"
      ); //可继续追加更高位转换值
      if (!num || isNaN(num)) {
        return "零";
      }
      var english = num.toString().split("");
      var result = "";
      for (var i = 0; i < english.length; i++) {
        var des_i = english.length - 1 - i; //倒序排列设值
        result = arr2[i] + result;
        var arr1_index = english[des_i];
        result = arr1[arr1_index] + result;
      }
      //将【零千、零百】换成【零】 【十零】换成【十】
      result = result.replace(/零(千|百|十)/g, "零").replace(/十零/g, "十");
      //合并中间多个零为一个零
      result = result.replace(/零+/g, "零");
      //将【零亿】换成【亿】【零万】换成【万】
      result = result.replace(/零亿/g, "亿").replace(/零万/g, "万");
      //将【亿万】换成【亿】
      result = result.replace(/亿万/g, "亿");
      //移除末尾的零
      result = result.replace(/零+$/, "");
      //将【零一十】换成【零十】
      //result = result.replace(/零一十/g, '零十');//貌似正规读法是零一十
      //将【一十】换成【十】
      result = result.replace(/^一十/g, "十");
      return result;
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        let name = ["本期合计金额", "", "本期收款金额", "", "本期未收款金额"];
        let indexs = [0, 2, 4];
        if (indexs.includes(index)) {
          sums[index] = name[index];
          return;
        }
      });

      return sums;
    },
  },
};
</script>
<style  scoped>
.tit {
  display: flex;
  justify-content: space-between;
}
</style>