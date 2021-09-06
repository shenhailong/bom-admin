<template>
  <el-table
    :data="siteRecharge"
    height="700"
    :cell-style="{ padding: '1px' }"
    :cell-class-name="yellowBg"
    style="width: 100%"
  >
    <el-table-column prop="creationtime" label="发表时间" width="180">
      <template slot-scope="scope">
        <span> {{ scope.row.creationtime }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="content" label="评论内容" align="left">
      <template slot-scope="scope">
        <span> {{ scope.row.content }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="chargePsnShow" label="创建人" align="left">
      <template slot-scope="scope">
        <span> {{ scope.row.chargePsnShow }}</span>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作" width="100">
      <template slot-scope="scope">
        <el-button
          v-if="scope.row.sort == '0'"
          class="el-icon-top"
          @click="handleClick(scope.row)"
          type="text"
          size="small"
        ></el-button>
        <el-button
          v-if="scope.row.sort == '1'"
          class="el-icon-bottom"
          @click="handleClick1(scope.row)"
          type="text"
          size="small"
        ></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import {
  insertOrderSaleStartB,
  selectAllOrderSaleStartB,
  updateOrderSaleStartB,
} from "@/api/orderCompMage/orderStart";
export default {
  props: ["information"],
  watch: {
    information() {
      //   = this.information;
      // console.log(1);
      let data = { pkProductOrderB: this.information };
      this.siteRecharge = [];
      selectAllOrderSaleStartB(data).then((res) => {
        // this.siteRecharge  = res.object;
        if (res.object != null) {
          for (let i of res.object) {
            if (i.msgType == 0) {
              this.siteRecharge.push(i);
            }
          }
        }

        // console.log(res);
      });
    },
  },
  created() {
    this.siteRecharge = [];
    let data = { pkProductOrderB: this.information };
    selectAllOrderSaleStartB(data).then((res) => {
      // this.siteRecharge  = res.object;
      if (res.object != null) {
        for (let i of res.object) {
          if (i.msgType == 0) {
            this.siteRecharge.push(i);
          }
        }
      }
      // console.log(res);
    });
  },
  data() {
    return {
      siteRecharge: [],
    };
  },
  methods: {
    yellowBg({ row, column, rowIndex, columnIndex }) {
      if (row.sort == 1) {
        return "cell-grey";
      }
    },
    handleClick(row) {
      // console.log(row);
      let param = { pkOrderSaleStartB: row.pkOrderSaleStartB, sort: 1 };
      let param1 = { pkProductOrderB: this.information };
      updateOrderSaleStartB(param).then((response) => {
        if (response.message == "操作成功") {
          selectAllOrderSaleStartB(param1).then((response1) => {
            // this.siteRecharge = response1.object;
            if (response1.object != null) {
              this.siteRecharge = [];
              for (let i of response1.object) {
                if (i.msgType == 0) {
                  this.siteRecharge.push(i);
                }
              }
              // for (var i = 0; i < this.siteRecharge.length; i++) {
              //   this.siteRecharge[i].zong =
              //     this.siteRecharge[i].chargePsnShow +
              //     "       " +
              //     this.siteRecharge[i].creationtime;
            }
          });
        }
      });
    },
    //取消置顶
    handleClick1(row) {
      let param = { pkOrderSaleStartB: row.pkOrderSaleStartB, sort: 0 };
      let param1 = { pkProductOrderB: this.information };
      updateOrderSaleStartB(param).then((response) => {
        if (response.message == "操作成功") {
          selectAllOrderSaleStartB(param1).then((response1) => {
            if (response1.object != null) {
              this.siteRecharge = [];
              for (let i of response1.object) {
                if (i.msgType == 0) {
                  this.siteRecharge.push(i);
                }
              }
            }
            // this.siteRecharge = response1.object;
            // for (var i = 0; i < this.siteRecharge.length; i++) {
            //   this.siteRecharge[i].zong =
            //     this.siteRecharge[i].chargePsnShow +
            //     "       " +
            //     this.siteRecharge[i].creationtime;
            // }
          });
        }
      });
    },
  },
};
</script>
<style  scoped>
</style>