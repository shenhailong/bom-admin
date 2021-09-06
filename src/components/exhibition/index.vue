<template>
    <!-- 屏幕展示 -->
    <div class="box">
        <!-- <div>
            <table width='100%' border='1'>
                <tbody>
                    <tr>
                        <td>产品名称:接收版</td>
                        <td>生产编码：kh000001</td>
                        <td>制程:有铅</td>
                        <td>工序名称：插件</td>
                    </tr>
                    <tr>
                        <td>版本：A</td>
                        <td>生效日期：2021-01-02</td>
                        <td>工时：111s</td>
                        <td>当前部门:DIP</td>
                    </tr>
                </tbody>
            </table>
        </div> -->
        <div class="box_body">
            <div style="width: 90%;height: 500px;">
                <el-carousel :autoplay='false' indicator-position="outside" height='700px'>
                    <el-carousel-item v-for="(item,index ) in mindata" :key="index">
                        <!-- {{item}} -->
                        <div class="table_one" ref="table_one">
                            <div class="table_one_title1">
                              <!-- <p><img src="@/assets/cy/1.png" alt="" width="20px"></p> -->
                              <!-- <p style="text-align:center;"> 作业指导书</p> -->
                              <!-- <p></p> -->
                            </div>
                            <div class="table_one_item">
                              <span>产品名称: <var >{{isdata.productCode}}</var> </span>
                              <span>产品编码：<var >{{isdata.productName}}</var></span>
                              <span>制程:<var >{{isdata.sealTechnics}}</var></span>
                              <span>制作部门:<var >工艺部门</var></span>
                              <span>执行部门:<var >生产部门</var></span>
                            </div>
                            <div class="table_one_item">
                              <span>工序名称：<var 
                                  >{{item.process}}</var></span>
                              <span>面别:<var 
                                 >{{item.category}}</var></span>
                              <span>作业人数:(个)<var > {{item.peopleNum}}
                                 
                                </var></span>
                              <span>工时 (s):<var>
                                 {{item.manHour}}
                                </var></span>
                              <span>版本:<var 
                                  >{{item.versions}}</var></span>
                              <span>阶段标记:<var 
                                  >{{item.phaseMarker}}</var></span>
                              <span>生效日期:<var > {{item.creationtime}} </var></span>
                              <span>页码:<var>
                                  {{item.pageNum}}
                                </var></span>
                            </div>
                            <div class="table_one_title">
                              <p style="text-align: center">物料明细</p>
                            </div>
                            <div class="table_list">
                              <p class="table_one_item">
                                <span>名称</span><span>规格/型号</span><span>数量</span><span>位号</span>
                              </p>
                              <p :key="index" class="table_one_item" v-for="(item, index) in item.billOfMaterialCraftPos">
                                <span>
                                  {{item.materielName}}
                                </span>
                                <span v-text="item.materielSpecifications" 
                                  ></span>
                                <span v-text="item.num"></span>
                                <span v-text="item.bitNum"> </span>
                               
                              </p>
                            </div>
                            <div class="table_foot">
                              <div>
                                <div style="width: 100%">
                                  <p style="text-align: center; border: 1px solid #000">样图</p>
                                  <p style="text-align: center; border: 1px solid #000">
                                    <span id="tip">
                                      <input v-if="item.sopImgUrl == null" type="file" name="images" id="image_los" 
                                        accept="image/*" />
                                      <img :src="item.sopImgUrl" ref="convas_one" alt="" v-else width="100%" height="100%" class="fixed"
                                         />
                                    </span>
                                  </p>
                                </div>
                              </div>
                              <div>
                                <div style=" border: 1px solid #000">
                                  <h3>使用工具</h3>
                                  <p v-html='item.tool' >
                                   
                                  </p>
                                </div>
                                <div style=" border: 1px solid #000">
                                  <h3>操作步骤:</h3>
                                  <!-- operation -->
                                  <p  v-html='item.operation'>
                                    
                                  </p>
                                </div>
                                <div style=" border: 1px solid #000">
                                  <h3>注意事项说明:</h3>
                                  <!-- explain -->
                                  <p  v-html='item.explains'>
                                    
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                    </el-carousel-item>
                </el-carousel>
            </div>
            <div>
                <!-- <p>1:sdsadsadasd</p>
                <p>2:dsad</p>
                <p>3 :sdasdasd</p> -->
            </div>
        </div>
    </div>
</template>
<script>
    import { mapGetters } from "vuex";
    import { selectSopTaskByPkPsndoc } from "@/api/sop/book"; //主表的路径
    export default {
        data() {
            return {
                minimg: [
                    'https://ss0.baidu.com/-Po3dSag_xI4khGko9WTAnF6hhy/baike/pic/item/6609c93d70cf3bc73446f09adc00baa1cd112a05.jpg',
                    'https://ss0.baidu.com/-Po3dSag_xI4khGko9WTAnF6hhy/baike/pic/item/6609c93d70cf3bc73446f09adc00baa1cd112a05.jpg',
                    'https://ss0.baidu.com/-Po3dSag_xI4khGko9WTAnF6hhy/baike/pic/item/6609c93d70cf3bc73446f09adc00baa1cd112a05.jpg',

                ],
                isdata:[],
                mindata:[]
            }
        },
        computed: {
            ...mapGetters([
                "pkPsndoc"
            ]),
        },
        mounted() {

            //隐藏导航栏
            // console.log(1);
            // console.log(this.$route.query.pkProductOrderB);
            // console.log(this.pkPsndoc);
            let datajson = {
                pkPsndoc:this.pkPsndoc,
                pkProductOrderB:this.$route.query.pkProductOrderB,
                // isDefault:1
                // this.pkProductOrderB = param.bindData.pkProduct
                // selectSopTaskByPkPsndoc
            }
            this.minimg = []
            selectSopTaskByPkPsndoc(datajson).then((res)=>{
                // console.log(res);
                // this.isdata.name = 's'
                // this.isdata.code = '11'
                if(res.object[0]){
                    this.isdata=res.object[0].billSopParameterPos[0]
                    if(this.isdata.sealTechnics == 0){
                        this.isdata.sealTechnics ='有铅'
                    }else{
                        this.isdata.sealTechnics ='无铅'
                    }
                    // this.isdata=res.object[0]
                    this.mindata =[]
                    // this.mindata=res.object[0].billSopParameterPos
                    for(let i of res.object[0].billSopParameterPos){
                      for(let s of this.$route.query.type){
                        // console.log(s);
                        if(i.processType ==s){
                            this.mindata.push(i)
                        }
                      }
                        
                    }
                }
                
                // this.minimg = res.object[0].billSopImgPoList
            })
            let navbar = document.getElementsByClassName('navbar')[0]
            // console.log(navbar);
            navbar.style.display = 'none'
            // main-container
            let maincontainer = document.getElementsByClassName('main-container')[0]
            maincontainer.style.margin = '0'
            let sidebarcontainer = document.getElementsByClassName('sidebar-container')[0]
            sidebarcontainer.style.display = 'none'
        },

        destroyed() {
            let navbar = document.getElementsByClassName('navbar')[0]
            navbar.style.display = 'block'
            let maincontainer = document.getElementsByClassName('main-container')[0]
            maincontainer.style.marginLeft = '154px'
            // console.log(maincontainer);
            let sidebarcontainer = document.getElementsByClassName('sidebar-container')[0]
            sidebarcontainer.style.display = 'block'
        },
    }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
    * {
        margin: 0;
        padding: 0;
    }

    .box_body {
        display: flex;
    }

  .table_one * {
    margin: 0;
    padding: 0;
  }

  .table_one_item {
    display: flex;

    span {
      flex: 1;
      border: 1px solid #000;
    }
  }

  .table_one_right {
    border-right: 1px solid #000;
  }

  .table_one>div {
    width: 100%;
  }

  .table_one_title {
    border: 1px solid #000;
  }

  .table_list {
    text-align: center;
  }

  .table_foot {
    width: 100%;
    display: flex;
  }

  .table_one_title1 {
    display: flex;
    justify-content: space-between;
    border: 0px;

    p {
      width: 33%;
    }
  }

  .table_foot>div {
    width: 50%;
  }

  #image_los {
    margin: 0 auto;
    width: 100px;
  }

  .fiexd {
    top: 0;
    position: fixed;
    z-index: 100;
    background: #fff;
    padding: 36px;

  }
    /* .box_body>div{
    width: 50%;
} */
</style>