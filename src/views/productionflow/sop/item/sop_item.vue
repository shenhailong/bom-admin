<template>
    <!-- 工艺sop -->
    <div>
      <!-- 钉钉通知 -->
      <add :cons="cons">
        <!-- 作业指导书 -->
      <div class="table_one" ref="table_one">
          <div class="table_one_title1">
            <!-- <p><img src="@/assets/cy/1.png" alt="" width="20px"></p> -->
            <!-- <p style="text-align:center;"> 作业指导书</p> -->
            <p></p>
          </div>
          <div class="table_one_item">
            <span>产品名称: <var :contenteditable="istabletrue==0">{{mindata.productCode}}</var> </span>
            <span>产品编码：<var :contenteditable="istabletrue==0">{{mindata.productName}}</var></span>
            
            <span v-if='mindata.sealTechnics == 0'>制程:<var>无铅</var></span>
          <span v-if='mindata.sealTechnics == 1'>制程:<var>有铅</var></span>
          <span v-if='mindata.sealTechnics == 2'>制程:<var>RoSH</var></span>
          <span v-if='mindata.sealTechnics == 3'>制程:<var>无</var></span>
            <span>制作部门:<var :contenteditable="istabletrue==0">工艺部门</var></span>
            <span>执行部门:<var :contenteditable="istabletrue==0">生产部门</var></span>
          </div>
          <div class="table_one_item">
            <span>工序名称：<var :contenteditable="istabletrue==0"
                @blur='mindata.process = $event.target.innerText'>{{mindata.process}}</var></span>
            <span>面别:<var :contenteditable="istabletrue==0"
                @blur='mindata.category = $event.target.innerText'>{{mindata.category}}</var></span>
            <span>作业人数:(个)<var :contenteditable="istabletrue==0">
                <input style="float: right;width: 47%;border: 0px;" type="number" :disabled='istabletrue==0'
                  v-model='mindata.peopleNum '>
              </var></span>
            <span>工时 (s):<var>
                <input style="float: right;width: 67%;border: 0px;" type="number" :disabled='istabletrue==0'
                  v-model='mindata.manHour'>
              </var></span>
            <span>版本:<var :contenteditable="istabletrue==0"
                @blur='mindata.versions = $event.target.innerText'>{{mindata.versions}}</var></span>
            <span>阶段标记:<var :contenteditable="istabletrue==0"
                @blur='mindata.phaseMarker = $event.target.innerText'>{{mindata.phaseMarker}}</var></span>
            <span>生效日期:<var :contenteditable="istabletrue==0"></var></span>
            <span>页码:<var>
                <input style="float: right;width: 67%;border: 0px;" type="number" :disabled='istabletrue==0'
                  v-model='mindata.pageNum'>
              </var></span>
          </div>
          <div class="table_one_title">
            <p style="text-align: center">物料明细</p>
          </div>
          <div class="table_list">
            <p class="table_one_item">
              <span>名称</span><span>规格/型号</span><span>数量</span><span>位号</span>
            </p>
            <p :key="index" class="table_one_item" v-for="(item, index) in listData">
              <span>
                {{item.materielName}}
              </span>
              <span v-text="item.materielSpecifications" :contenteditable="istabletrue==0"
                @blur="item.type = $event.target.innerText"></span>
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
                    <input v-if="htmlsrc == null" type="file" name="images" id="image_los" @change="images"
                      accept="image/*" />
                    <img :src="htmlsrc" ref="convas_one" alt="" v-else width="100%" height="100%" class="fixed"
                      @click="image_convas" />
                  </span>
                </p>
              </div>
            </div>
            <div>
              <div style=" border: 1px solid #000">
                <h3>使用工具</h3>
                <p v-html='mindata.tool'>
               
                </p>
              </div>
              <div style=" border: 1px solid #000">
                <h3>操作步骤:</h3>
                <!-- operation -->
                <p v-html='mindata.operation'>
                  
                </p>
              </div>
              <div style=" border: 1px solid #000">
                <h3>注意事项说明:</h3>
                <!-- explain -->
                <p v-html='mindata.explains'>
                  
                </p>
              </div>
            </div>
          </div>
        </div>
      </add>
      <CommitDialog :visiable="commitDialogData.visiable" :paramData="commitDialogData.paramData"
        @close="closeCommitDialog" @commitMethod="executeDindDingInterface"></CommitDialog>
      <!-- 工艺查看 -->
        <el-table :data="tableData_img" style="width: 100%" max-height="450">
          <el-table-column prop="pageNum" label="页码" width="150">
          </el-table-column>
          <el-table-column prop="productName" label="产品名称" width="150">
          </el-table-column>
          <el-table-column prop="process" label="工序名称" width="150">
          </el-table-column>
          <!-- productCode -->
          <el-table-column prop="processType" label="工序类型" width="150">
          </el-table-column>
          <el-table-column prop="sopState" label="图片">
            <template slot-scope="scope">
              <img :src="tableData_img[scope.$index].sopImgUrl" @click="lookit(tableData_img[scope.$index].sopImgUrl)"
                alt="" style="width: 100%; height: 100px">
            </template>
            <!-- sopImgUrl -->
          </el-table-column>
          <!-- finalImgUrl -->
          <el-table-column prop="creatorShow" label="工艺人" width="150">
          </el-table-column>

          </el-table-column>
          <el-table-column prop="sopState" label="查看">
            <template slot-scope="scope">
              <!-- {{tableData_img[scope.$index].sopImgUrl}} -->
              <el-button type='mini' @click="text_push(scope.$index)"> 查看</el-button>
            </template>
            <!-- sopImgUrl -->
          </el-table-column>
        </el-table>  
    </div>
  </template>
  <script>
    import html2canvas from "html2canvas";//页面截图的组件
    import add from "@/components/add/add";//公共的弹窗
    import CommitDialog from "@/components/Commitdingding/CommitDialog";//钉钉
    import {
      saveSopEdition, selectSopEditionByPkProduct, defaultSopEdition,
      delSopEditionById, saveSopImg, saveSopImage, selectSopImgByPkEdition, selectAllBillOfMaterialByPkId,
      selectSopParameterByProductId, selectSopParameterBySopEditionId,
      saveSopParameter, selectSopImgByPkProduct
    } from '@/api/sop/book' //sop接口
    import { sendDingMsgByPsndoc } from "@/api/pub/pub"; // 调用钉钉后端API接口
    // import { saveOrderPutoOutImage } from "@/api/orderCompMage/AproductionPub";
    export default {
      components: { add, CommitDialog },
      props: [ 'instructions_cons_sop'],
      created() {
        // console.log(this.instructions_cons_sop);
          // console.log(this.instructions_cons_sop);
          let jsons = [this.instructions_cons_sop]
          // console.log(jsons[0]);
          this.deleteRow(0,jsons,0)
        this.int()
        
  
      },
      watch: {
        instructions_cons_sop: {
          deep: true,
          handler(newValue) {
            // console.log(11);
          }
        },
        listData: {
          deep: true,
          handler(newValue) {
            this.listData[this.isindex] = this.listDatas[this.isindex_two]
            this.int();
          },
        },

      },
      data() {
        return {
          isindex: null,//物料明细的角标渲染
          isindex_two: null,//物料明细的角标渲染
          radio: 'DIP', //工序类别
          listDatas: [],//物料明细下拉选择
          form: { //版本号提交  name使用 
            name: '',
            date: '',
            city: '',
            address: '',
            province: ''
          },
          commitDialogData: {
            // 控制钉钉Dialog显示
            visiable: false,
            paramData: null,
          },
          pkSopEdition: null,//主键
          cons: { //第一个弹窗的显示
            contentVisiable: false,
            title: null,
          },
          push_con: { //版本号添加弹窗
            contentVisiable: false,
            title: null,
          },
          text_tool: '防静电手环,成型器,镊子', //操作步骤
          cons_convas: { //画布的显示
            contentVisiable: false,
            title: null,
          },
          con_look: {//工艺查看弹窗
            contentVisiable: false,
            title: null,
          },
          con_look_con: { //控制缩略图的现实隐藏
            contentVisiable: false,
            title: null,
          },
          htmlsrc: null,//下角标的src图片路径
          logsrc: null,//转换图片的base64编码
          appendshow: true,//画布的图片判断
          tableData_img: [],//子表单的数据 赋值留用
          minsrc: '',//图片的src缩略图
          listData: [],//物料明细的空数组
          istabletrue: null,//图片子表数据进行判断
          file_one: null,//图片上传
          jsons: [0, 0, 0, 0],//画布的四个角标
          tableData: [],
          mindata: {//提交数据
            pkProduct: null,//产品主键
            pkOfMaterialCraft: '',// 物料主键
            process: null,//工序名称
            category: null,//面别
            peopleNum: null,//作业人数
            manHour: null,//工时
            versions: null,//版本
            phaseMarker: null,//阶段标记
            pageNum: null,//页数
            operation: null,// 操作流程
            tool: null,//实用工具
            explain: null,//注意事项
            processType: null,//工序类型
          },
          isdata: {}//指导书的主列表数据
        };
      },
      methods: {
        int() {
          this.isdata = this.instructions_cons_sop //渲染主表格的数据
        },
        executeDindDingInterface(sendMsgParam) {
          let jsons = {
            pkSopEdition: this.pkSopEdition,
            editionState: 1
          }
          saveSopEdition(jsons)
          // 调用钉钉接口   sendMsgParam的数据提交进去
          sendDingMsgByPsndoc(sendMsgParam).then((response) => {
            // 钉钉接口的毁掉
            if (response && response.data.success) {
              // 调用接口后处理
              alert("调用钉钉接口成功");
            } else {
              alert("调用钉钉接口失败");
            }
          });
        },
        closeCommitDialog() {
          this.commitDialogData.visiable = false;
        },
        iseditionState(row, column) {
          // 图片的判断进行解析
          if (row.editionState == 0) {
            return '自由态'
          } else if (row.editionState == 1) {
            return '审核中'
          } else {
            return '审核完成'
          }
        },
        handleEdit(index, item) {
          //图片状态接口 暂时不用
          // 修改状态
          this.$confirm("是否提交吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.$message({
                type: "success",
                message: "提交成功!",
              });
              //接口
              saveSopImg(item).then((res) => {
                // console.log(res);
              })
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消提交",
              });
            });
  
        },
        listDataclk() {
          //  列表数据 
          let jsons = {}
          //根据页面判断列表的数据请求需求
         
          selectSopEditionByPkProduct({ pkProduct: this.instructions_cons.pkProduct }).then((res) => {
            // console.log(res);
            this.tableData = res.object //主表单的数据进行赋值
          })
  
        },
        issopstate(row) {
          //  根据数据返回提交的状态 
          if (row.sopState == 0) {
            return '自由态'
          } else if (row.sopState == 1) {
            return "审核通过"
          } else {
            return "已暂停"
          }
        },
        images(file, files) {
          // input 选择图片  
          this.file = file.target.files
          let f = document.getElementById("image_los").files[0];
          this.htmlsrc = window.URL.createObjectURL(f); //本地渲染src
        },
        tabledelete(index) {
          this.listData.splice(index, 1)//删除物料明细的方法
        },
        lookit(con) {
          // 图片的缩略图
          this.minsrc = con
          this.con_look_con = {
            contentVisiable: true,
            title: null,
          }
        },
  
        
        toimagesm() {
          // 第一个参数是需要生成截图的元素,第二个是自己需要配置的参数,宽高等
          // console.log(this.$refs.table_one);
          html2canvas(this.$refs.table_one, {
            // backgroundColor: null,
            // useCORS:true
          }).then((canvas) => {
            // // console.log(canvas);
            // let sss = document.getElementById('sss')
            // console.log(sss);
            // sss.appendChild(canvas)
            let url = canvas.toDataURL("image/png");
            // console.log(url);
            this.logsrc = url; // 把生成的base64位图片上传到服务器,生成在线图片地址
            this.sendUrl();
          });
        },
        // 页面元素转图片
        sendUrl() {
          // 如果图片需要formData格式,就自己组装一下,主要看后台需要什么参数
          // 图片上传服务器   将base64 转换为图片提交后台  谨慎使用
          const data = window.atob(this.logsrc.split(',')[1]);
          ;
          const formData = new FormData()
          const ia = new Uint8Array(data.length);
          for (let i = 0; i < data.length; i++) {
            ia[i] = data.charCodeAt(i);
          }
          const blob = new Blob([ia], { type: 'image/png' });
          formData.append('file', blob, new Date().getTime() + '.png')
  
          saveSopImage(formData).then((res) => {
            let jsons = {
              // pkSopEdition: this.pkSopEdition,
              // sopImgName: this.radio,
              finalImgUrl: res.object.imgUrl,
              pkSopParameter: this.pkSopParameter
            }
            saveSopParameter(jsons).then((res) => {
              this.listDataclk()
            })
  
          })
          //------------------
        },
        list_isindex(index, indexs) {
          //  物料明细的角标获取 进行数据的渲染
          this.isindex = index
          this.isindex_two = indexs
          // Access-Control-Allow-Origin Access-Control-Allow-Origin
        },
        text_push(index) {
          //二级弹窗
          this.cons = {
            contentVisiable: true,
            title: null,
          };
          //缓存二级表单需要的数据
          this.listData = this.tableData_img[index].billOfMaterialCraftPos //物料明细的数据
          this.mindata = this.tableData_img[index]//mindata提交的数据
          console.log(this.mindata);
          // let image = new Image();
          this.htmlsrc = this.tableData_img[index].sopImgUrl //图片的数据
          this.pkSopParameter = this.tableData_img[index].pkSopParameter //表单主键
          // console.log(this.tableData[index]);
        },
        deleteRow(index, rows, ind) {
          // console.log(s);
          // console.log(rows[ind]);
          if (index == 0) {
            // console.log(1);
            //编辑提交的按钮
            this.pkSopEdition = rows[ind].pkSopEdition
            this.con_look = {
              contentVisiable: true,
              title: null,
            };
            // console.log('s');
            let jsons = {
              pkSopEdition: this.pkSopEdition
            }
            // console.log(rows[ind].editionState);
            this.istabletrue = rows[ind].editionState
            //
            selectSopParameterBySopEditionId(jsons).then((res) => {
              // console.log(res);
              this.tableData_img = res.object
            })
          }
          // 打开工艺列表
          if (index == 1) {
            this.cons = {
              contentVisiable: true,
              title: null,
            };
            this.listData.pkSopParameter = null
            this.htmlsrc = null
          }
          //修改按钮
          if (index == 2) {
            this.push_con = {
              contentVisiable: true,
              title: null,
            }
            this.pkSopEdition = rows[ind].pkSopEdition
          }
          //设置为默认
          if (index == 3) {
            // console.log();
            this.pkSopEdition = rows[ind].pkSopEdition
            let jsons
            if (rows[ind].isDefault == 0) {
  
              jsons = {
                pkProduct: this.instructions_cons.pkProduct,
                pkSopEdition: this.pkSopEdition,
                isDefault: "1"
              }
            } else {
              this.pkSopEdition = rows[ind].pkSopEdition
              jsons = {
                pkProduct: this.instructions_cons.pkProduct,
                pkSopEdition: this.pkSopEdition,
                isDefault: "0"
              }
            }
  
            defaultSopEdition(jsons).then((res) => { //设置为默认
              this.listDataclk()
            })
          }
          //删除
          if (index == 4) {
            let jsons = { pkSopEdition: rows[ind].pkSopEdition }
            this.$confirm("是否删除吗?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            })
              .then(() => {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
                delSopEditionById(jsons).then((res) => {
                  this.listDataclk()
                })
              })
              .catch(() => {
                this.$message({
                  type: "info",
                  message: "已取消",
                });
              });
            // console.log(jsons);
  
          }
          if (index == 5) {
            //钉钉弹窗
            this.pkSopEdition = rows[ind].pkSopEdition
            this.commitDialogData.visiable = true;
          }
        },
        fint() {
          //更替工艺图片
          this.cons_convas = {//
            contentVisiable: false,
            title: null,
          }
          let imgs = this.convertCanvasToImage(ctx)
          imgs.onclick = this.image_convas
          this.appendshow = false
          tip.innerHTML = ''
          tip.append(imgs)
        },
        convertCanvasToImage(canvas) {
          // 将convas转换图片
          var image = new Image();
          image.src = canvas.toDataURL("image/jpg");
          return image;
        },
        // 画布方法
        convertImageToCanvas(image) {
          // 画布中进行图片的方法
          let canvas = document.createElement("canvas");
          canvas.id = "ctx";
          canvas.width = image.width;
          canvas.height = image.height;
          canvas.getContext("2d").drawImage(image, 0, 0);
  
          return canvas;
        },
        stateFormat(row, column) {
          // 判断主表数据的渲染
          if (row.isDefault == 0) {
            return '否'
          } else {
            return '是'
          }
        },
        image_convas() {
          // 点击图片后跳出修改
          let _this = this;
          let ctx;
          //将图片生成画布后对方法进行判断
          ctx = this.convertImageToCanvas(this.$refs.convas_one);
          this.cons_convas = {
            contentVisiable: true,
            title: null,
          };
          // 图片生成需要时间进行异步操作
          setTimeout(function () {
            if (_this.appendshow) {
              convas_img.append(ctx);
              _this.appendshow = false;
            }
          }, 2000);
          // 画布中画出矩形
          ctx.onmouseup = function (ev) {
            let rect = ctx.getBoundingClientRect();
            _this.jsons[2] = ev.clientX;
            _this.jsons[3] = ev.clientY;
            _this.jsons[2] -= rect.left;
            _this.jsons[3] -= rect.top;
            _this.jsons[2] = _this.jsons[2] - _this.jsons[0];
            _this.jsons[3] = _this.jsons[3] - _this.jsons[1];
            _this.drawScreen();
          };
          ctx.onmousedown = function (ev) {
            _this.jsons[0] = ev.clientX;
            _this.jsons[1] = ev.clientY;
            let rect = ctx.getBoundingClientRect();
            _this.jsons[0] -= rect.left;
            _this.jsons[1] -= rect.top;
          };
        },
        push_list() {
          //物料明细添加新的数据
          this.listData.push({})
        },
        drawScreen(mindata) {
          // 生成画布
          let _this = this;
          let ctx = document.getElementById("ctx");
          let contex = ctx.getContext("2d");
          contex.strokeStyle = "red";
          // convas 画线
          contex.strokeRect(
            _this.jsons[0],
            _this.jsons[1],
            _this.jsons[2],
            _this.jsons[3]
          );
          contex.stroke();
          // ctx.draw()
        },
        push_table() {
          this.push_con = {
            contentVisiable: true,
            title: null,
          }
          this.instructions_cons.pkSopEdition = null
        },
        push_it(ispush) {
          //向列表添加版本号
          let pushs_it
          pushs_it = {
            pkProduct: this.instructions_cons.pkProduct,
            editionNum: this.form.province,
            pkSopEdition: this.pkSopEdition
          }
          saveSopEdition(pushs_it).then((res) => {
            this.listDataclk()
            this.push_con = {
              contentVisiable: false,
              title: null,
            }
          })
        }
      },
    };
  </script>
  <style rel="stylesheet/scss" lang="scss" scoped>
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
  
    /* #sss{
        width: 500px;
        height: 200px;
      } */
  </style>