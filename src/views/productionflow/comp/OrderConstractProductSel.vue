<template>
  <div class="div"  @mouseover='touchstart'>
 
    <el-dropdown class="wrap" @mouseover='touchstart'>
      <span class="el-dropdown-link"  @mouseover='touchstart'>
          全部 <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown" class="content" @mouseover='touchstart'>
        <el-dropdown-item
          @mouseover='touchstart'
          v-for="(item, index) in news"
          :key="index"
        >
        <el-badge v-if='item.productionState == 0' is-dot class="item.productionState">
          <span
          @mouseover='touchstart'
          @click="handleCommand(item)">
              {{ item.contractNo }}
          </span>
        </el-badge>
        <el-badge v-else>
          <span
          @mouseover='touchstart'
          @click="handleCommand(item)">
              {{ item.contractNo }}
          </span>
        </el-badge>
          
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <!-- </div> -->
    <!--合同订单详情数据-->
  </div>
</template>

<script>
import { selectOrderInfoAsRef } from "@/api/orderCompMage/orderCompMage";

export default {
  name: "OrderConstractProductSel",
  data() {
    return {
      menuFilterText: "", // 过滤条件
      contractOptionis: [
        {
          contractNo: "全部",
          children: [],
          pkProductOrder: null,
        },
      ], // 订单合同数据集合
      defaultProps: {
        children: "children",
        label: "contractNo",
      },
      news: null,
      pags: 1,
      pagslice: 15,
      srolls:0
    };
  },
  // created() {
  //      this.contractOptionis = [

  //     ]
  // },
  mounted() {
    // setTimeout(
    //   this.selecymin(),3000)
    this.selecymin();
    this.wrap = document.querySelector(".content");

    // console.log(this.wrap);  
    this.wrap.addEventListener("scroll", this.init);
    this.init()
  },
  // destoryed(){
  // 　　this.wrap.removeEventListener('scroll',this.initConstractAndOrderProductList);
  // },
  watch: {
    menuFilterText(val) {
      this.$refs.treeComp.filter(val);
    },
  },
  methods: {
    handleCommand(item) {
      
      this.$emit("refreshTableList", item);
      
      // this.$message('click on item ' + command);
    },
    init() {
      //未来可能滚动加载
      this.wrap = document.querySelector(".content");
      // this.wraps = document.querySelector(".el-tree-node__children");
      var clientHeight = this.wrap.clientHeight; // 客户区大小
      var scrollHeight = this.wrap.scrollHeight; // 没用滚动条的情况下，元素内容的总高度
      var scrollTop = this.wrap.scrollTop; // 被隐藏在内容区域上方的像素数
      this.srolls = scrollTop
      // this.wrap.scrollTop = this.srolls
      // console.log(scrollTop);
      // console.log(clientHeight, scrollHeight, scrollTop);
      if (scrollHeight - clientHeight <= scrollTop + 3) {
        //滚动条滚到最底部
        // console.log("1");
        this.pagslice += 5;
        // this.selecymin()
      }
    },
    selecymin() {
      let initOptionsParam = {
        dr: 0,
      };
      // console.log('ss');
      selectOrderInfoAsRef(initOptionsParam).then((response) => {
        // console.log(response.object[0]);
        this.news = response.object;
      });
    },
    touchstart(){
      // console.log('s');
      // this.init();
      this.wrap = document.querySelector(".content");
      this.wrap.scrollTop = this.srolls
      // console.log(this.srolls);
    }
  },
};
</script>

<style  lang="scss" type="text/scss" scoped>
/deep/ .el-tree-node__label {
  font-size: 8px;
}
/deep/ .input .el-input__inner {
  margin-top: 8px;
  height: 35px;
  margin-left: 5px;
  text-align: center;
  width: 120px;
}
.div {
  position: relative;
}
.wrap{
   margin-left: 25px;
  margin-top: 12px;
}
.content {
  position: absolute;
  z-index: 100;
  margin-left: 25px;
  margin-top: 12px;
  overflow-y: auto;
  overflow-x: scroll;
  height: 700px;
  /*width:200px;*/
}
/deep/ .el-tree-node__label {
  padding-right: 40px;
}
.el-tree {
  min-width: 100%;
  font-size: 14px;
  display: inline-block;
}
</style>
