<template>
  <!-- 工艺sop -->
  <div>

    <!-- 钉钉通知 -->
    <add :cons="cons">
      <!-- 作业指导书 -->
      <button @click="tolistdata" v-if='istabletrue==0'>保存</button>
      <button @click="push_list" v-if='istabletrue==0'>添加</button>
      <button @click='toimagesm' v-if='istabletrue==0'>删除图片</button>
      <el-radio-group v-model="radio" v-if='istabletrue==0'>
        <el-radio :label="'DIP'">DIP</el-radio>
        <el-radio :label="'三防'">三防</el-radio>
        <el-radio :label="'组装'">组装</el-radio>
        <el-radio :label="'测试'">测试</el-radio>
        <el-radio :label="'老化'">老化</el-radio>
        <el-radio :label="'SMT'">SMT</el-radio>
      </el-radio-group>
      <div class="table_one" ref="table_one">
        <div class="table_one_item">
          <span>产品名称: <var :contenteditable="istabletrue==0" v-text='isdata.name'></var> </span>
          <span>产品编码：<var :contenteditable="istabletrue==0" v-text='isdata.code'></var></span>
          <span v-if='isdata.sealTechnics == 0'>制程:<var>无铅</var></span>
          <span v-if='isdata.sealTechnics == 1'>制程:<var>有铅</var></span>
          <span v-if='isdata.sealTechnics == 2'>制程:<var>RoSH</var></span>
          <span v-if='isdata.sealTechnics == 3'>制程:<var>无</var></span>
          <span>制作部门:<var :contenteditable="istabletrue==0">工艺部门</var></span>
          <span>执行部门:<var :contenteditable="istabletrue==0">生产部门</var></span>
        </div>
        <div class="table_one_item">
          <span>工序名称：<var :contenteditable="istabletrue==0" @blur='mindata.process = $event.target.innerText'
              v-text='mindata.process'></var></span>
          <span>面别:<var :contenteditable="istabletrue==0" @blur='mindata.category = $event.target.innerText'
              v-text='mindata.category'></var></span>
          <span>作业人数:(个)<var :contenteditable="istabletrue==0">
              <input style="float: right;width: 47%;border: 0px;" type="number" :disabled='!istabletrue==0' 
                v-model='mindata.peopleNum '>
            </var></span>
          <span>工时 (s):<var>
              <input style="float: right;width: 67%;border: 0px;" type="number" :disabled='!istabletrue==0' 
                v-model='mindata.manHour'>
            </var></span>
          <span>版本:<var :contenteditable="istabletrue==0" @blur='mindata.versions = $event.target.innerText'
              v-text='mindata.versions'></var></span>
          <span>阶段标记:<var :contenteditable="istabletrue==0" @blur='mindata.phaseMarker = $event.target.innerText'
              v-text='mindata.phaseMarker'></var></span>
          <span>生效日期:<var ></var></span>
          <span>页码:<var>
              <input style="float: right;width: 67%;border: 0px;" type="number" :disabled='!istabletrue==0' 
                v-model='mindata.pageNum'>
            </var></span>
        </div>
        <div class="table_one_title">
          <p style="text-align: center">物料明细</p>
        </div>
        <div class="table_list">
          <p class="table_one_item">
            <span>名称</span><span>规格/型号</span><span>数量</span><span>位号</span><span v-if='istabletrue==0'>取消</span>
          </p>
          <p :key="index" class="table_one_item" v-for="(item, index) in listData">
            <span :contenteditable="istabletrue==0" @blur="item.materielName = $event.target.innerText"
             >
              <el-select v-model="item.pkOfMaterialCraft" placeholder="选择名称" size='mini'>
                <el-option v-for='(items,indexs) in listDatas' v-if='!isdisabledlist.includes(items.pkOfMaterialCraft)'
                  ref="options" :key="indexs" @click.native='list_isindex(index,indexs)' :label="items.materielName"
                  :value='items.pkOfMaterialCraft'> {{items.pkOfMaterialCraft}} </el-option>
              </el-select>
            </span>
            <span v-text="item.materielSpecifications" 
              @blur="item.type = $event.target.innerText"></span>
            <span v-text="item.num"  @blur="item.num = $event.target.innerText"></span>
            <span v-text="item.bitNum"  @blur="item.bitNum = $event.target.innerText">
            </span>
            <span v-if='istabletrue==0'> <button @click='tabledelete(index)'>取消</button></span>
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
                  <img :src="htmlsrc" ref="convas_one" alt="" v-else width="100%" height="100%" class="fixed" />
                </span>
              </p>
            </div>
          </div>
          <div>
            <div style=" border: 1px solid #000">
              <h3>使用工具</h3>
              <p id="editor_dis"></p>
              <p id="editor">

              </p>
            </div>
            <div style=" border: 1px solid #000">
              <h3>操作步骤:</h3>
              <!-- operation -->
              <p id="editor_dis2"></p>
              <p id="editor_two">
              </p>
            </div>
            <div style=" border: 1px solid #000">
              <h3>注意事项说明:</h3>
              <!-- explain -->
              <p id="editor_dis3"></p>
              <p id="editor_three">

              </p>

            </div>
            <!-- <div ></div> -->
          </div>
        </div>
      </div>
    </add>
    <CommitDialog :visiable="commitDialogData.visiable" :paramData="commitDialogData.paramData"
      @close="closeCommitDialog" @commitMethod="executeDindDingInterface"></CommitDialog>
    <!-- 工艺查看 -->
    <add :cons="con_look">
      <el-button @click="deleteRow(1)" size="small">
        添加
      </el-button>
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
        <!-- 图片状态不使用状态 -->

        <el-table-column prop="creatorShow" label="工艺人" width="150">
        </el-table-column>
        <el-table-column prop="sopState" label="修改">
          <template slot-scope="scope">
            <!-- {{tableData_img[scope.$index].sopImgUrl}} -->
            <el-button type='mini' @click="text_push(scope.$index)" v-if='istabletrue ==0'> 编辑</el-button>
            <el-button type='mini' @click="text_push(scope.$index)" v-else> 查看</el-button>
          </template>
          <!-- sopImgUrl -->
        </el-table-column>
        <el-table-column prop="sopState" label="删除" v-if='istabletrue ==0'>
          <template slot-scope="scope">
            <!-- {{tableData_img[scope.$index].sopImgUrl}} -->
            <el-button type='mini' @click="text_dlete(scope.row)"> 删除</el-button>
          </template>
          <!-- sopImgUrl -->
        </el-table-column>
        <!-- <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">确定</el-button>
          </template>
        </el-table-column> -->

        <!-- :formatter="stateFormat" -->
      </el-table>
      <!-- <img src="@/assets/cy/1.png" @click="lookit('@/assets/cy/1.png')" alt=""> -->
    </add>
    <!-- 查看图片详情 -->

    <add :cons='con_look_con'>
      <img :src="minsrc" alt="" width="100%">
    </add>
    <!-- 画布 -->
    <add :cons='push_con'>
      <el-form ref="form" :model="form" label-width="80px" style="display:flex;">

        <el-form-item label="版本号">
          <el-input v-model="form.province"></el-input>
        </el-form-item>
        <br>

      </el-form>
      <button @click="push_it">提交</button>
    </add>
    <add :cons="cons_convas">
      <div id="convas_img" ref="convas_two"></div>
      <br>
      <button @click="fint">提交</button>
    </add>
    <!-- 列表 -->
    <el-button type="mini" @click="push_table">添加</el-button>
    <el-table :data="tableData" style="width: 100%" max-height="450">
      <el-table-column prop="" fixed type="index" label="序号" width="120"> </el-table-column>
      <el-table-column prop="editionNum" label="版本号" width="120">
      </el-table-column>
      <el-table-column prop="creatorShow" label="创建人" width="null"> </el-table-column>
      <el-table-column prop="isDefault" :formatter="stateFormat" label="是否默认" width="300">
      </el-table-column>
      <el-table-column prop="editionState" :formatter="iseditionState" label="审核状态" width="300">
      </el-table-column>
      <el-table-column prop="creationtime" label="创建日期" width="150">
      </el-table-column>
      <!-- <el-table-column prop="zip" label="邮编" width="120"> </el-table-column> -->
      <el-table-column fixed="right" label="操作" width="220">
        <template slot-scope="scope">
          <el-button @click.native.prevent="deleteRow(3, tableData,scope.$index)" type="text" size="small"
            v-if='tableData[scope.$index].editionState == 2'>
            <span v-if='tableData[scope.$index].isDefault == 0 ' class="el-icon-top"> </span> <span v-else
              class="el-icon-bottom"></span> <!-- 设为默认 -->
          </el-button>
          <el-button @click.native.prevent="deleteRow(0, tableData,scope.$index)" type="text" size="small">
            <span class='el-icon-view'></span> <!-- 查看 -->
          </el-button>
          <el-button @click.native.prevent="deleteRow(2, tableData,scope.$index)"
            v-if='!tableData[scope.$index].editionState == 0' type="text" size="small">
            <span class="el-icon-edit"></span> <!-- 修改版本号 -->
          </el-button>
          <!-- <el-button @click.native.prevent="deleteRow(4, tableData,scope.$index)"
            v-if='tableData[scope.$index].editionState == 0' type="text" size="small">
            <span class="el-icon-delete"></span> 
        </el-button> -->
          <!-- 删除 -->
          <el-button @click.native.prevent="deleteRow(4, tableData,scope.$index)" type="text" size="small">
            <span class="el-icon-download"></span> <!-- 复制 -->
          </el-button>
          <el-button @click.native.prevent="deleteRow(5, tableData,scope.$index)"
            v-if='tableData[scope.$index].editionState == 0 ' type="text" size="small">
            <span class="el-icon-bell"></span> <!-- 钉钉接口 -->
          </el-button>

        </template>
      </el-table-column>
    </el-table>
    <div id="sss"></div>
  </div>
</template>
<script>
  import html2canvas from "html2canvas";//页面截图的组件
  import add from "@/components/add/add";//公共的弹窗
  import CommitDialog from "@/components/Commitdingding/CommitDialog";//钉钉
  import {
    saveSopEdition, selectSopEditionByPkProduct, defaultSopEdition,
    delSopEditionById, saveSopImg, saveSopImage, selectSopImgByPkEdition, selectAllBillOfMaterialByPkId,
    selectSopParameterByProductId, selectSopParameterBySopEditionId, selectAllBillOfMaterialById,
    saveSopParameter, selectSopImgByPkProduct, copySopEdition, delSopParameterById
  } from '@/api/sop/book' //sop接口
  import { sendDingMsgByPsndoc } from "@/api/pub/pub"; // 调用钉钉后端API接口
  import wangeditor from "wangeditor"
  // const editor = new E(document.getElementById('div1'))
  // editor.create()
  // import { saveOrderPutoOutImage } from "@/api/orderCompMage/AproductionPub";
  export default {
    components: { add, CommitDialog },
    props: ['instructions_cons', 'instructions_cons_sop'],
    created() {
      this.listDataclk()
      this.int()
    },
    mounted() {
      // console.log(document.getElementById('#editor'));

    },
    watch: {
      instructions_cons: {
        deep: true,
        handler(newValue) {
          // 点击新的产品更新数据
          this.listDataclk()
          this.listData = []
          this.htmlsrc = null
        }
      }
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
        iseditor_show: 0,
        isdisabledlist: [],//判断select 下拉后的禁用标示集合
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
          explains: '',//注意事项
          processType: null,//工序类型
        },
        isdata: {}//指导书的主列表数据
      };
    },
   
    methods: {
      int() {
        this.isdata = this.instructions_cons //渲染主表格的数据
      },
      executeDindDingInterface(sendMsgParam) {
        let jsons = {
          pkSopEdition: this.pkSopEdition,
          editionState: 1
        }
        // 调用钉钉接口   
        sendDingMsgByPsndoc(sendMsgParam).then((response) => {
          // 钉钉接口的毁掉
          if (response && response.data.success) {
            // 调用接口后处理
            this.$message({
              type: "success",
              message: "操作成功!",
            });
            saveSopEdition(jsons).then((res) => {
              selectSopEditionByPkProduct({ pkProduct: this.instructions_cons.pkProduct }).then((res) => {
                this.tableData = res.object //主表单的数据进行赋值
              })
            })

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
        let jsons = { pkProduct: this.instructions_cons.pkProduct }
        //根据页面判断列表的数据请求需求
        selectSopEditionByPkProduct(jsons).then((res) => {
          this.tableData = res.object //主表单的数据进行赋值
        })

      },
      issopstate(row) {
        //  根据数据返回提交的状态  暂时停用
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
        this.isdisabledlist.splice(index, 1)//删除标示禁用
      },
      lookit(con) {
        // 图片的缩略图
        this.minsrc = con
        this.con_look_con = {
          contentVisiable: true,
          title: null,
        }
      },

      tolistdata() {
        //将列表里面的数据提交
        const formData = new FormData()
        this.mindata.pkOfMaterialCraft = '' //
        this.mindata.processType = this.radio//工序类别
        this.mindata.pkProduct = this.instructions_cons.pkProduct //产品主键
        this.mindata.pkSopEdition = this.pkSopEdition  // 列表主键
        // console.log(document.getElementById('editor_three').getElementsByClassName('w-e-text')[0].innerHTML);
        // console.log(this.file);
        if (this.file) { //是否选择了文件
          // console.log(1);
          formData.append('file', this.file[0]) //列表图片
         
          for (let i of this.listData) {
            if (i.pkOfMaterialCraft) {
              this.mindata.pkOfMaterialCraft += ',' + i.pkOfMaterialCraft //物料明细的集合
              if (this.mindata.pkOfMaterialCraft[0] == ',') {
                this.mindata.pkOfMaterialCraft = this.mindata.pkOfMaterialCraft.substr(1) //物料明细的集合
              }
            }
           
          }
          if(this.mindata.pkOfMaterialCraft == ''){
            this.mindata.pkOfMaterialCraft = null
           }
           //将填写的语句标签添加到接口中
           this.mindata.tool = document.getElementById('editor').innerHTML + ''
          this.mindata.operation = document.getElementById('editor_two').innerHTML + ''
          this.mindata.explains = document.getElementById('editor_three').innerHTML + ''
          // console.log(this.mindata);
          saveSopImage(formData).then((res) => {//上传照片的接口
            this.mindata.sopImgUrl = res.object.imgUrl //列表图片的url
            let jsons = {
              pkSopEdition: this.pkSopEdition
            }
            saveSopParameter(this.mindata).then((res) => { //列表集合
              this.cons.contentVisiable = false
              this.intimages()
              // console.log(res.object); 
            })
          })
        } else {
          //没有选择图片的接口传递null不改变 更改数据
          this.mindata.sopImgUrl = null //列表图片的url
         
          for (let i of this.listData) {
            if (i.pkOfMaterialCraft) {
              this.mindata.pkOfMaterialCraft += ',' + i.pkOfMaterialCraft //物料明细的集合
              if (this.mindata.pkOfMaterialCraft[0] == ',') {
                this.mindata.pkOfMaterialCraft = this.mindata.pkOfMaterialCraft.substr(1) //物料明细的集合
              }
            }
            
          }
         
          if(this.mindata.pkOfMaterialCraft == ''){
            this.mindata.pkOfMaterialCraft = null
           }
           //将填写的语句标签添加到接口中
          this.mindata.tool = document.getElementById('editor').innerHTML + ''
          this.mindata.operation = document.getElementById('editor_two').innerHTML + ''
          this.mindata.explains = document.getElementById('editor_three').innerHTML + ''
          // console.log(this.mindata);
          saveSopParameter(this.mindata).then((res) => { //列表集合
            this.intimages()
            this.cons.contentVisiable = false
          })
        }



      },
      toimagesm() {
        // 第一个参数是需要生成截图的元素,第二个是自己需要配置的参数,宽高等
        this.htmlsrc = null
        this.file = null
      },
      // 页面元素转图片
      sendUrl() {
        // 如果图片需要formData格式,就自己组装一下,主要看后台需要什么参数
        // 图片上传服务器   将base64 转换为图片提交后台  谨慎使用  
        //原计划
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
        // console.log(index);
        this.listData[index] = this.listDatas[indexs]
        this.isdisabledlist[index]=this.listDatas[indexs].pkOfMaterialCraft
        this.$forceUpdate()
        console.log(this.isdisabledlist);
        // console.log(this.isdisabledlist.includes(this.listDatas[indexs].pkOfMaterialCraft));
      },
      intimages() {
        // 刷新作业指导书的列表
        selectSopParameterBySopEditionId({
          pkSopEdition: this.pkSopEdition
        }).then((res) => {
          this.tableData_img = res.object
          this.tableData_img = res.object
          var min;
          //按照页码排列
          for (var i = 0; i < this.tableData_img.length; i++) {
            for (var j = i; j < this.tableData_img.length; j++) {
              if (this.tableData_img[i].pageNum != null) {
                if (this.tableData_img[i].pageNum > this.tableData_img[j].pageNum) {
                  min = this.tableData_img[j];
                  this.tableData_img[j] = this.tableData_img[i];
                  this.tableData_img[i] = min;
                }
              }

            }
          }
          // pageNum
        })
      },
      text_dlete(item) {
        // console.log(item);
        this.$confirm("是否删除吗?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
          let jsons = { pkSopParameter: item.pkSopParameter }
          delSopParameterById(jsons).then((res) => {
            this.$message({
              type: "success",
              message: "成功!",
            });
            this.intimages()
          })
        })
      },
      text_push(index) {
        //二级弹窗
        this.cons = {
          contentVisiable: true,
          title: null,
        };
        this.file = null
        //缓存二级表单需要的数据
        if (this.tableData_img[index].billOfMaterialCraftPos == null) {//物料明细的数据
          this.listData = []
        } else {
          this.listData = this.tableData_img[index].billOfMaterialCraftPos
        }

        this.mindata = this.tableData_img[index]//mindata提交的数据
        this.radio = this.mindata.processType
        // console.log(this.mindata);
        this.editordis(
          {
            one: this.mindata.tool,
            two: this.mindata.operation,
            three: this.mindata.explains
          }
        )
        // let image = new Image();
        this.htmlsrc = this.tableData_img[index].sopImgUrl //图片的数据
        this.pkSopParameter = this.tableData_img[index].pkSopParameter //表单主键
        // console.log(this.tableData[index]);
      },
      editordis(item) {
        //
        // console.log(item);
        //作业指导书中的工作文本
        setTimeout(() => {
          // console.log(document.getElementById('editor').data-we-id);
          // console.log(this.iseditor_show);
          this.iseditor_show++ //
          if (this.iseditor_show == 1) {
            var editor = new wangeditor('#editor_dis2', document.getElementById('editor'))
            var editor2 = new wangeditor('#editor_dis', document.getElementById('editor_two'))
            var editor3 = new wangeditor('#editor_dis3', document.getElementById('editor_three'))
          }
          document.getElementById('editor').innerHTML = item.one
          document.getElementById('editor_two').innerHTML = item.two
          document.getElementById('editor_three').innerHTML = item.three
          if (this.iseditor_show == 1) {
            editor.create()
            editor2.create()
            editor3.create()
          }


        }, 2000)
      },
      deleteRow(index, rows, ind) {
        // console.log(s);
        // console.log(rows[ind]);
        if (index == 0) {
          // console.log(1);
          //编辑提交的按钮
          this.pkSopEdition = rows[ind].pkSopEdition

          // console.log('s');
          let jsons = {
            pkSopEdition: this.pkSopEdition
          }
          this.istabletrue = rows[ind].editionState
          selectAllBillOfMaterialById({ pkProduct: this.instructions_cons.pkProduct, pkSopEdition: this.pkSopEdition }).then((res) => {
            if (res.object == null) {
              this.listDatas = []
            } else {
              this.listDatas = res.object //物料明细的调取接口
            }
            this.isdisabledlist = []
          })
          //
          this.intimages(

          )
          this.con_look = {
            contentVisiable: true,
            title: null,
          };

        }
        // 打开工艺列表
        if (index == 1) {
          // console.log(1);
          //点击添加按钮 将数据全部清空

          this.mindata = {//提交数据
            pkProduct: null,//产品主键
            pkOfMaterialCraft: '',// 物料主键
            process: null,//工序名称
            category: null,//面别
            peopleNum: null,//作业人数
            manHour: null,//工时
            versions: null,//版本
            phaseMarker: null,//阶段标记
            pageNum: null,//页数
            process: '',//工序
            operation: null,// 操作流程
            tool: null,//实用工具
            explains: '',//注意事项
            processType: null,//工序类型
            pkSopParameter:null
          },
            this.listData = []
          this.htmlsrc = null

          this.cons = {
            contentVisiable: true,
            title: null,
          };
          this.editordis(
            {
              one: '<div class=\"w-e-text-container\" style=\"z-index:10000;\"><div contenteditable=\"true\" style=\"width:100%; height:100%;\" class=\"w-e-text\" id=\"text-elem003865175185570946\"><p>2</p></div><div class=\"placeholder\" style=\"display:none;\">请输入正文</div><div class=\"w-e-img-drag-mask\" style=\"display:none;\">\n            <div class=\"w-e-img-drag-show-size\"></div>\n            <div class=\"w-e-img-drag-rb\"></div>\n         </div></div>',
              two: '<div class=\"w-e-text-container\" style=\"z-index:10000;\"><div contenteditable=\"true\" style=\"width:100%; height:100%;\" class=\"w-e-text\" id=\"text-elem003865175185570946\"><p>2</p></div><div class=\"placeholder\" style=\"display:none;\">请输入正文</div><div class=\"w-e-img-drag-mask\" style=\"display:none;\">\n            <div class=\"w-e-img-drag-show-size\"></div>\n            <div class=\"w-e-img-drag-rb\"></div>\n         </div></div>',
              three: '<div class=\"w-e-text-container\" style=\"z-index:10000;\"><div contenteditable=\"true\" style=\"width:100%; height:100%;\" class=\"w-e-text\" id=\"text-elem003865175185570946\"><p>1、生产作业过程中必须佩戴放静电手环；</p><p>2、烙铁温度为 320℃±20℃，单点焊接时间不超过 3s；</p><p>2、烙铁温度为 320℃±20℃，单点焊接时间不超过 3s；</p><p>3、元件焊接要到位,焊锡要饱满，焊接过程不要造成周围器件损坏；</p><p>4、检验标准参照IPC610 Ⅱ级,锡炉温度设定在285-305℃，时间控制在7s±1s; </p></div><div class=\"placeholder\" style=\"display:none;\">请输入正文</div><div class=\"w-e-img-drag-mask\" style=\"display:none;\">\n            <div class=\"w-e-img-drag-show-size\"></div>\n            <div class=\"w-e-img-drag-rb\"></div>\n         </div></div>'
            }
          )

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
        if (index == 4) {
          //复制-----
          // opySopEdition({pkSopEdition: rows[ind].pkSopEdition}).then((res)=>{
          //   this.listDataclk()
          // })
          let jsons = { pkSopEdition: rows[ind].pkSopEdition }
          this.$confirm("是否复制吗?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.$message({
                type: "success",
                message: "复制成功!",
              });
              // console.log(jsons);  将接口改为delSopEditionById 为删除按钮
              copySopEdition(jsons).then((res) => {
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
        imgs.id = 'images_int'
        imgs.onclick = this.image_convas
        this.appendshow = false
        tip.innerHTML = ''
        tip.append(imgs)
      },
      stateFormat(row, column) {
        // 判断主表数据的渲染
        if (row.isDefault == 0) {
          return '否'
        } else {
          return '是'
        }
      },

      push_list() {
        //物料明细添加新的数据
        // console.log(this.listData);
        this.listData.push({})
      },
      push_table() {
        //列表添加数据
        this.push_con = {
          contentVisiable: true,
          title: null,
        }
        this.instructions_cons.pkSopEdition = null
        this.pkSopEdition = null
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

  #editor_dis,
  #editor_dis2,
  #editor_dis3 {
    display: none !important;
  }

  /* .w-e-menu{
    display: flex;
  } */
  /* #sss{
      width: 500px;
      height: 200px;
    } */
</style>