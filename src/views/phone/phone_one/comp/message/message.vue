<template>
  <div>
   
    <h1 class="title">
      <div>留言信息</div>
    </h1>
    <div class="poty" @click="pushmi"><i class="el-icon-back"></i> 返回</div>
    <br />
    <div class="search">
      <input type="text" v-model="search_contents" placeholder="请输入产品编号">
      <span class="el-icon-search search_pos" @click="search_item"></span>
    </div>

    <div class="drawerlayoout">

      <!-- <div class="listul" style="width: 100%; border-right: 1px solid #000">
        <div v-for="(item, index) in listdata" :key="index">
          <div>
            <li class="list" @click="controContent(item, index)" ref="lis">
                <p>{{ item.contractNo }}</p>
                <p>{{ item.productCode }}</p>
                <p>{{ item.serial }}</p>
              </li>
          </div>
        </div>
      </div> -->
      <el-tabs v-model="activeName" @tab-click="handleClick" style="width: 100%">
       
        <el-tab-pane label="全部" name="first">
          <el-table ref="filterTable" :data="listdata" style="width: 100%" >
            <el-table-column prop="contractNo" label="合同名称"  >
            </el-table-column>
            <el-table-column prop="productCode" label="产品名称">
            </el-table-column>
            <el-table-column prop="serial" label="流水号"> </el-table-column>
            <el-table-column align="right" label="详情"  height='100px' show-overflow-tooltip>

              <template slot-scope="scope">
                <el-badge v-if='listdata[scope.$index].msgNumber != 0' :value="listdata[scope.$index].msgNumber" class="item" >
                  <el-button size="mini" @click="controContent( scope.row,scope.$index)">查看</el-button>
                </el-badge>
                <el-badge v-else class="item" >
                  <el-button size="mini" @click="controContent( scope.row,scope.$index)">查看</el-button>
                </el-badge>

              </template>
            </el-table-column>
          </el-table>

        </el-tab-pane>
        <el-tab-pane label="未签订" name="second">
          <el-table ref="filterTable" :data="listdata" style="width: 100%">
            <el-table-column prop="contractNo" label="合同名称"  style="width:100%">
            </el-table-column>
            <el-table-column prop="productCode" label="产品名称" width="">
            </el-table-column>
            <el-table-column prop="serial" label="流水号"> </el-table-column>
            <el-table-column align="right" label="详情">

              <template slot-scope="scope">
                <el-badge v-if='listdata[scope.$index].msgNumber != 0' :value="listdata[scope.$index].msgNumber" class="item" >
                  <el-button size="mini" @click="controContent( scope.row,scope.$index)">查看</el-button>
                </el-badge>
                <el-badge v-else class="item" >
                  <el-button size="mini" @click="controContent( scope.row,scope.$index)">查看</el-button>
                </el-badge>

              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="已签订" name="third">
          <el-table ref="filterTable" :data="listdata" style="width: 100%">
            <el-table-column prop="contractNo" label="合同名称"  style="width:100%">
            </el-table-column>
            <el-table-column prop="productCode" label="产品名称" width="">
            </el-table-column>
            <el-table-column prop="serial" label="流水号"> </el-table-column>
            <el-table-column align="right" label="详情">

              <template slot-scope="scope">
                <el-badge v-if='listdata[scope.$index].msgNumber != 0' :value="listdata[scope.$index].msgNumber" class="item" >
                  <el-button size="mini" @click="controContent( scope.row,scope.$index)">查看</el-button>
                </el-badge>
                <el-badge v-else class="item" >
                  <el-button size="mini" @click="controContent( scope.row,scope.$index)">查看</el-button>
                </el-badge>

              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        
      </el-tabs>

      <!-- <div style="width: 78%">
          <textarae :pkProductOrderB="pkProductOrderB" />
      </div> -->
    </div>
 
    <br /><br /><br /><br /><br /><br /><br />
  </div>
</template>
<script>
  import textarae from "@/components/newtab/item/item/textaear";
  import { selectAllMsgUserOrderB } from "@/api/dashboard/dashboard";
  import information from "@/components/newtab/item/item/information";
  export default {
    components: {
      textarae,
      information,
    },
    watch:{
      activeName(item){
        // console.log(item);
      }
    },
    data() {
      return {
        listdata: [],
        pkProductOrderB: null,
        activeName: 'first',
        search_contents:null
      };
    },
    beforeCreate() {
      selectAllMsgUserOrderB({ dr: 0 }).then((res) => {
        this.listdata = res.object;
      });
    },
    methods: {
      
      search_item(){
      // 搜索列表内容
        let minsdata =   this.listdata 
        this.listdata = []
      minsdata.forEach((item,index)=> {  
      
          if(item.productCode.includes(this.search_contents)){
            // console.log(item);
            
            this.listdata.push(item)
            console.log(this.listdata);
          }
      });
    },
     
   
      handleClick(tab, event) {
        // console.log(tab, event);
        if(tab.paneName == 'first'){
          selectAllMsgUserOrderB({ dr: 0 }).then((res) => {
            this.listdata = res.object;
          });
        }
        // "second"
        if(tab.paneName == "second"){
          this.listdata = []
          selectAllMsgUserOrderB({ dr: 0 }).then((res) => {
            for(let i of res.object){
              if(i.contractNo == ''){
                this.listdata.push(i)
              }
            }
            // this.listdata = res.object;
          });
        }
        // third
        if(tab.paneName == "third"){
          this.listdata = []
          selectAllMsgUserOrderB({ dr: 0 }).then((res) => {
            for(let i of res.object){
              if(i.contractNo != ''){
                this.listdata.push(i)
              }
            }
            // this.listdata = res.object;
          });
        }
      },
      controContent(item, index) {
        // 点击每个li
        // for (let i = 0; i < this.$refs.lis.length; i++) {
        //   this.$refs.lis[i].style.color = "#000";
        // }

        // this.$refs.lis[index].style.color = "#ccc"; //点击的足迹
        this.pkProductOrderB = item.pkProductOrderB;
        selectAllMsgUserOrderB({ dr: 0 }).then((res) => {
          //更新未读标记
          // console.log(res);
          this.listdata = res.object;
        });
        this.$router.push({
          path: "info",
          query: { name: this.pkProductOrderB },
        });
      },
      pushmi() {
        //返回按钮
        this.$router.go(-1);
      },
    },
  };
</script>
<style lang="scss" type="text/scss" scoped>
  .title>div {
    width: 25%;
    margin: 0 auto;
  }

  .poty {
    font-size: 1.5rem;
  }
  /deep/ .el-table .cell {
  overflow: visible;
  //  height: 40px !important;
  //  line-height: 60px;
}
  .drawerlayoout {
    display: flex;
    justify-content: space-between;
  }

  p {
    margin: 0;
    padding: 0;
  }

  .list {
    cursor: pointer;
    font-size: 1.5rem;
    margin: auto;
    padding: 1.5rem;
  }

  /* .listul {
  display: flex;
  flex-wrap: wrap;
} */
  .listul>div {
    width: 30%;
    height: 80px;
    margin-left: 1rem;
    background: rgb(242, 243, 241);
    border-radius: 20px;
    text-align: center;
    margin-top: 2rem;
  }

  li {
    list-style: none;
  }

  .item {
    width: 100%;
  }

  ul {
    margin: 0;
    padding: 0;
    font-size: 0.5rem;
  }
  .search{
  position: relative;
  input{
    width: 100%;
    height: 30px;
  }
}
.list {
  cursor: pointer;
  font-size: 15px;
}
.search_pos{
  position:absolute;
  top: 0.4rem;
    left: 35.2rem;
    font-size: 2rem;
  cursor: pointer;
  // color: rgb(244,244,244);
}
</style>