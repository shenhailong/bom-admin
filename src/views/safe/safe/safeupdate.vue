<template>
  <div class="app-container">

      <div>
        <el-tabs tab-position="top" style="height: 200px">
          <!--密码登录-->
          <el-tab-pane label="密码登录信息">
            <el-form
              :inline="true"
              ref="dataForm"
              label-position="left"
              label-width="150px"
            >
              <el-form-item label="原密码" prop="password">
                <el-input
                  type="password"
                  v-model="userSignInfo.password"
                ></el-input>
              </el-form-item>
              <br />
              <el-form-item label="新密码" prop="password">
                <el-input
                  type="password"
                  v-model="userSignInfo.newPassword"
                ></el-input>
              </el-form-item>
              <br />
              <el-form-item label="确认新密码" prop="password">
                <el-input
                  type="password"
                  v-model="userSignInfo.confirmNewPassword"
                ></el-input>
              </el-form-item>
            </el-form>
          </el-tab-pane>

          <el-button-group>
            <!-- <el-button   @click="resert()">重置</el-button> -->
            <el-button type="primary" @click="updatePassword()">保存</el-button>
          </el-button-group>
        </el-tabs>
      </div>
     
    </div>
</template>

<script>
import { safeupdate } from "@/api/safe/safe";
import { saveMsgSystemContentData } from "@/api/notice/notice";
export default {
  data() {
    return {
      // 用户密码登录信息
      userSignInfo: {
        password: "",
        newPassword: "",
        confirmNewPassword: "",
      },
      
    };
  },
  methods: {
   
    updatePassword() {
      if (
        this.userSignInfo.newPassword === this.userSignInfo.confirmNewPassword
      ) {
        let updateParam = {
          userid: this.$store.getters.userid,
          oldPassword: this.userSignInfo.password,
          newPassword: this.userSignInfo.newPassword,
        };

        this.$confirm("是否确定修改?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$message({
              type: "success",
              message: "修改成功!",
            });
            safeupdate(updateParam).then((response) => {
              if (response.success) {
                // location.reload();
              } else {
                this.$message.success(response.message);
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消修改",
            });
          });
        // this.$message.success('修改成功')
        this.userSignInfo = {};
      } else {
        this.$message.warning("两次输入的新密码不一致!");
      }
    },
    resert() {
      this.userSignInfo = {};
    },
  },
};
</script>

<style>
.flexs {
  display: flex;
  /* justify-content: space-around; */
}
.flexs > div {
  width: 50%;
}
</style>
