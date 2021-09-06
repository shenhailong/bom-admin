<template>
  <el-form
    :model="ruleForm"
    ref="ruleForm"
  
    class="demo-ruleForm"
  >
  <!-- <p>留言内容</p> -->
    <el-form-item prop="desc">
      <el-input
        type="textarea"
        v-model="ruleForm.desc"
        @input="texts"
        @blur="outtext"
        placeholder="请填写留言内容"
      ></el-input>
      <el-button type="primary" @click="submitForm" style="float:right">发表</el-button>
      
    </el-form-item>
    <hr>
    <el-form-item>
      
    </el-form-item>
    <div>
      <ol>
        <li v-for="(item, index) in ullist" :key="index">
            <div class="ol_title">
              <p >
                <span style="font-size:25px" class="el-icon-s-check"></span>
              </p>
             <div style="font-size:7px">
               <p > {{item.chargePsnShow}} &nbsp; &nbsp; &nbsp;  {{item.creationtime}}</p>
               <p>
                 创元成业科技有限公司
               </p>
             </div>
            </div>
            <div style="padding:10px 0 10px 20px">
                 {{ item.content }}
            </div>
            <div></div>
        </li>
        <!-- <li v-for="(item, index) in ullist" :key="index">
          
          <p class="items">
             {{item.chargePsnShow}} : 
             &nbsp;
             {{ item.content }}
             <br>
             <span  class="timeimg" style="">
                {{item.creationtime}}
             </span>
          </p>
       
        </li> -->
      </ol>
    </div>
  </el-form>
</template>
<script>
import {
  insertOrderSaleStartB,
  selectAllOrderSaleStartB
} from "@/api/orderCompMage/orderStart";
export default {
  props: ["pkProductOrderB"],
  // created(){
  //     selectAllOrderSaleStartB
  // },

  data() {
    return {
      ruleForm: {
        desc: "",
      },
      ullist: [],
      //   rules: {
      //     desc: [{ required: true, message: "请填写内容", trigger: "blur" }],
      //   },
    };
  },
  created() {
    selectAllOrderSaleStartB({ pkProductOrderB: this.pkProductOrderB }).then(
        (res) => {
          //   this.ullist = res.object;
          this.ullist = [];
          for (let i of res.object) {
            if (i.msgType == 1) {
              this.ullist.push(i);
              // console.log(this.ullist);/
            }
          }
          //   console.log(res);
        }
      );
  },
  watch: {
    pkProductOrderB() {
      selectAllOrderSaleStartB({ pkProductOrderB: this.pkProductOrderB }).then(
        (res) => {
          //   this.ullist = res.object;
          this.ullist = [];
          for (let i of res.object) {
            if (i.msgType == 1) {
              this.ullist.push(i);
              console.log(this.ullist);
            }
          }
          //   console.log(res);
        }
      );
    },
  },

  methods: {
    texts() {
      this.enterKeyup();
    },
    outtext() {
      this.enterKeyupDestroyed();
    },
    enterKeyupDestroyed() {
      //销毁键盘事件
      document.removeEventListener("keyup", this.enterKey);
    },
    enterKeyup() {
      //添加键盘事件
      document.addEventListener("keyup", this.enterKey);
    },
    enterKey(event) {
      //键盘回车
      const componentName = this.$options.name;
      const code = event.keyCode
        ? event.keyCode
        : event.which
        ? event.which
        : event.charCode;
      //如果按下回车键 执行确定事件
      if (code == 13) {
        this.submitForm();
      }
    },
    submitForm() {
      //提交表单
      if (this.pkProductOrderB != undefined) {
        if (this.ruleForm.desc != "") {
          let param = {
            pkProductOrderB: this.pkProductOrderB,
            content: this.ruleForm.desc,
            msgType: 1,
            // creatorShow:'admin'
          };
          this.$confirm("是否确认发布?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "info",
          }).then(() => {
              this.ullist = [];
            insertOrderSaleStartB(param).then((res) => {
              //   console.log(res);
              selectAllOrderSaleStartB({
                pkProductOrderB: this.pkProductOrderB,
              }).then((res) => {
                for (let i of res.object) {
                  if (i.msgType == 1) {
                    this.ullist.push(i);
                    // console.log(this.ullist);
                  }
                }
              });
            });
          });
        } else {
          this.$message({ type: "warning", message: "注意填写内容" });
          
        }
      } else {
        // alert("未选择产品");
        this.$message({ type: "warning", message: "未选择产品" });
      }
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
/* *{
  margin: 0;padding: 0;
} */
li {
  list-style: none;
  border: 2px solid rgb(244, 244, 244);
  border-radius: 10px;
  /* background: rgb(248, 248, 248); */
  margin-top:10px
  /* line-height: 30px; */
}
ol {
  overflow-y: auto;
  overflow-x: scroll;
  height: 600px;
  padding: 0;
}
.ol_title{
  display: flex;
  /* background: rgb(244, 244, 244); */
  p{
    margin-left: 20px;
     height: 16px;
  }
}
.timeimg{
float:right;color:#333;font-size:12px;

}
/* p{
  margin: 0;
} */
.items{
  font-size: 15px;
}
</style>