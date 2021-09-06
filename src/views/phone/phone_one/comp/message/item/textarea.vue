<template>
  <div class="app">
    <h1 class="title">
      <div>创元留言板</div>
    </h1>
    <div class="poty" @click="pushmi"><i class="el-icon-back"></i> 返回</div>
    <br />
    <el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm">
      <!-- <p>留言内容</p> -->
      <el-form-item prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc" @input="texts" @blur="outtext" placeholder="请填写留言内容">
        </el-input>
        <el-button type="primary" @click="submitForm" style="float: right">发表</el-button>
      </el-form-item>
      <hr />
      <el-tabs v-model="activeName" @tab-click="handleClick" style="width: 100%">

        <el-tab-pane label="系统" name="first">
          <el-table :data="siteRecharge"  :cell-style="{ padding: '1px' }" :cell-class-name="yellowBg"
            style="width: 100%">
            <el-table-column prop="creationtime" label="发表时间" width="170">
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
            <el-table-column  label="操作" width="null">
              <template slot-scope="scope">
                
                <el-button v-if="scope.row.sort == '0'" class="el-icon-top" @click="handleClick(scope.row)" type="text"
                  size="small"></el-button>
                <el-button v-if="scope.row.sort == '1'" class="el-icon-bottom" @click="handleClick(scope.row)"
                  type="text" size="small"></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="留言" name="js">
          <div>
            <ol>
              <li v-for="(item, index) in ullist" :key="index">
                <div class="ol_title">
                  <p>
                    <span style="font-size:25px" class="el-icon-s-check"></span>
                  </p>
                  <div style="font-size:7px">
                    <p> {{item.chargePsnShow}} &nbsp; &nbsp; &nbsp; {{item.creationtime}}</p>
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
        </el-tab-pane>
      </el-tabs>



    </el-form>
    <br><br><br> <br><br><br>
  </div>
</template>
<script>
  
  import {
  insertOrderSaleStartB,
  selectAllOrderSaleStartB,
  updateOrderSaleStartB,
} from "@/api/orderCompMage/orderStart";
  export default {
    // created(){
    //     selectAllOrderSaleStartB
    // },
    created() {
      this.pkProductOrderB = this.$route.query.name;
    },
    data() {
      return {
        ruleForm: {
          desc: "",
        },
        ullist: [],
        activeName: 'first',
        pkProductOrderB: null,
        siteRecharge: []
        //   rules: {
        //     desc: [{ required: true, message: "请填写内容", trigger: "blur" }],
        //   },
      };
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
              }
              else {
                this.siteRecharge.push(i)
              }
            }
            //   console.log(res);
          }
        );
      },
    },

    methods: {
      yellowBg({ row, column, rowIndex, columnIndex }) {
        if (row.sort == 1) {
          return "cell-grey";
        }
      },
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
            var r = confirm("确定提交？");
            if (r) {
              this.ullist = [];
              insertOrderSaleStartB(param).then((res) => {
                //   console.log(res);
                selectAllOrderSaleStartB({
                  pkProductOrderB: this.pkProductOrderB,
                }).then((res) => {
                  for (let i of res.object) {
                    if (i.msgType == 1) {
                      this.ullist.push(i);
                    } else {
                      this.siteRecharge.push(i)
                    }
                  }
                });
              });
            }
          } else {
            this.$message({ type: "warning", message: "注意填写内容" });
          }
        } else {
          // alert("未选择产品");
          this.$message({ type: "warning", message: "未选择产品" });
        }
      },
      handleClick(row) {
        // console.log(this.pkProductOrderB);
        let sorts = 0
        if(row.sort == 0){
          sorts=1
        }else{
          sorts=0
        }
      let param = { pkOrderSaleStartB:row.pkOrderSaleStartB, sort: sorts };
      let param1 = { pkProductOrderB: this.pkProductOrderB};
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
      pushmi() {
        //返回按钮
        this.$router.go(-1);
      },
    },
  };
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  /* *{
  margin: 0;padding: 0;
} */
  .poty {
    font-size: 1.5rem;
  }

  li {
    list-style: none;
    border: 1px solid #333;
    border-radius: 10px;
    background: rgb(248, 248, 248);
    margin-top: 10px;
    /* font-size: 1.2rem; */
    /* line-height: 30px; */
  }

  ol {
    overflow-y: auto;
    overflow-x: scroll;
    height: 600px;
    padding: 0;
  }

  .timeimg {
    float: right;
    color: #333;
    font-size: 1.2rem;
  }

  .items {
    font-size: 1.2rem;
  }

  .title>div {
    width: 30%;
    margin: 0 auto;
  }

  li {
    list-style: none;
    border: 2px solid rgb(244, 244, 244);
    border-radius: 10px;
    /* background: rgb(248, 248, 248); */
    margin-top: 10px
      /* line-height: 30px; */
  }

  ol {
    overflow-y: auto;
    overflow-x: scroll;
    height: 600px;
    padding: 0;
  }

  .ol_title {
    display: flex;

    /* background: rgb(244, 244, 244); */
    p {
      margin-left: 20px;
      height: 16px;
    }
  }

  .timeimg {
    float: right;
    color: #333;
    font-size: 12px;

  }

  /* p{
  margin: 0;
} */
  .items {
    font-size: 15px;
  }
</style>