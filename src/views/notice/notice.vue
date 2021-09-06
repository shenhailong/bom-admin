<template>
  <!-- 公告通知 -->
  <div class="pps">
    <div
      class="avatar-container"
      style="margin-right: 130px"
      v-if="name == 'admin' || name == '沈成宇'"
    >
      <div class="avatar-wrapper">
        <el-button style="height: 25px; padding: 0" @click="istc">
          公告设置</el-button
        >
      </div>
    </div>
    <con :ishow="isshow" :con="cons" @close="close"> </con>
    <tc :ishow="tcshow" :istab="istab" @close="dc"></tc>
    <ul class="list">
      <li v-for="(item, index) in list_one" :key="index" class="lis">
        <div @click="conclk(index)" class="ling2">
          <h3>
            {{ item.title }}
          </h3>
          <div class="time">
            <b> {{ item.creationtime }} </b>
            <!-- <div class="del">删除</div> -->
          </div>
          <br />
        </div>
        <div class="ling" v-if="name == 'admin' || name == '沈成宇'">
          <div @click="setk(index)">修改</div>
          <div @click="del(index)">删除</div>
        </div>
      </li>
    </ul>
    <div class="block">
      <!-- <span class="demonstration">完整功能</span> -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.page"
        :page-sizes="[20, 20, 30, 40]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tm"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  saveMsgSystemContentData,
  selectAllMsgSystemContentAsPage,
  deleteSystemContentData,
} from "@/api/notice/notice";
import con from "./comp/content";
import tc from "./comp/tc";
export default {
  mounted() {
    this.init();
  },
  components: {
    con,
    tc,
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "name", "userid"]),
  },
  data() {
    return {
      page: {
        dr: 0,
        limit: 20,
        page: 1,
      },
      istab: {
        title: null,
        content: null,
        pkSystemContent: null,
        creatorShow: null,
        creationtime: null,
      },
      list_one: [],
      tm: 0,
      isshow: false,
      cons: null,
      tcshow: false,
    };
  },
  methods: {
    handleSizeChange(val) {
      this.page.limit = val;
      this.init();
    },
    dc() {
      this.tcshow = false;
    },
    del(index) {
      this.istab = this.list_one[index];
      // console.log(this.istab.pkArr);
      this.$confirm("是否确认字表数据?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "确认成功!",
          });
          // saveProductionSub(deleteParam).then((response) => {
            // if (response && response.success) {
              deleteSystemContentData(this.istab.pkArr);
            // } else {
              // this.$message({
              //   message: `确认失败:${response.message}`,
              //   type: "error",
              // });
            // }
          // });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消确认",
          });
        });
    },
    setk(index) {
      this.istab = this.list_one[index];
      this.istc();
    },
    handleCurrentChange(val) {
      this.page.page = val;
      this.init();
    },
    istabs(index) {
      this.istab = this.lists_one[index];
      // console.log(this.istab);
      // this.istc();
    },
    init() {
      //初始化页面
      selectAllMsgSystemContentAsPage(this.page).then((response) => {
        this.list_one = response.object;
        this.tm = response.total;
      });
    },
    conclk(index) {
      this.isshow = true;

      this.cons = this.list_one[index].content;
    },
    close() {
      this.isshow = false;
    },
    istc() {
      //打开设置
      this.tcshow = true;
      // this.list_one
      this.istab = this.istab;
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
}
.pps {
  width: 100%;
}
ul {
  width: 100%;
  height: 80%;
  display: flex;
  flex-wrap: wrap;
  min-height: 800px;
  // justify-content: space-around;
  // margin: 0 auto;
}
li {
  list-style: none;
  width: 45%;
  height: 50px;
  margin-top: 30px;
  margin-left: 40px;
  cursor: pointer;
  background: rgb(245, 245, 245);
}
.time {
  float: right;
  font-size: 12px;
}
.del {
  // float: right;
  display: block;
  font-size: 13px;
  color: red;
  cursor: pointer;
}
.lis {
}
// .lis div:nth-child(1){

// }
.ling {
  display: flex;
  margin-top: 10px;
  font-size: 12px;
  // width: 70%;
  justify-content: space-between;
}
.ling2 {
  //  width: 70%;
}
// .lis div:nth-child(2){
//   display: flex;
// }
// .lis>div{
//   font-size: 12px;
// }
// .lis div:nth-child(2){
//   width: 10%;
// }
// .block{
//   position: fixed;
//   bottom: 30px;
// }
</style>