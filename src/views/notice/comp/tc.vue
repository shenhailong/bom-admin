<template>
  <el-dialog title="公告设置" :visible.sync="onshow" @close="closeDialog">
    <el-tabs tab-position="top" style="width: 60%">
      <!--密码登录-->

      <el-form
        :inline="true"
        ref="dataForm"
        label-position="left"
        label-width="150px"
      >
        <el-form-item>
          <el-input v-model="from.title" placeholder="标题"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            type="textarea"
            v-model="from.content"
            placeholder="内容"
          ></el-input>
        </el-form-item>
        <br />
        <!-- <el-form-item label="确认新密码">
                <el-input></el-input>
              </el-form-item> -->
      </el-form>

      <el-button-group>
        <!-- <el-button   @click="resert()">重置</el-button> -->
        <el-button type="primary" @click="subclick">保存</el-button>
      </el-button-group>
    </el-tabs>
  </el-dialog>
</template>
<script>
import { mapGetters } from "vuex";
import {
  saveMsgSystemContentData,
  selectAllMsgSystemContentAsPage,
  deleteSystemContentData,
} from "@/api/notice/notice";
export default {
  props: ["ishow", "istab"],
  watch: {
    ishow() {
      this.from = this.istab;
      this.onshow=this.ishow 
    },
  },
  data() {
    return {
      onshow: false,
      from: {
      },
    };
  },
  computed: {
    ...mapGetters(["name"]),
  },
  methods: {
    closeDialog() {
      this.$emit("close");
    },
    subclick() {
      this.from.creatorShow = this.name;
      this.from.creationtime = this.dateFormat(new Date());
      // console.log(this.from.creationtime);
      if (this.from.title != null && this.from.content) {
        this.$confirm("是否确定设置?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          this.$message({
            type: "success",
            message: "设置成功!",
          });
          saveMsgSystemContentData(this.from).then((res) => {
            // location.reload();
            this.$emit("close");
          });
        //   this.$message.success("修改成功");
        });
      } else {
        this.$message.success("请填写完整");
      }
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
  },
};
</script>