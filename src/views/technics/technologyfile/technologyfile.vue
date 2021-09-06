<template>
  <div>
		<div class="icon">
			<i  class="el-icon-circle-check"><span>未送审到管理员</span></i>
			<i  class="el-icon-refresh-right"><span>重新审核</span></i>
			<i  class="el-icon-warning-outline"><span>退回</span></i>
			<i class="el-icon-folder-opened"><span>工艺文件</span></i>
		</div>
    <el-row>
      <Table 
        :columns="columns" 
        :select="select" 
        :top_btn="top_btn" 
        :act_btn="act_btn" 
        :replace="replace"
        @onButtonClick="onButtonClick">
      </Table>
    </el-row>

    <TechnologyFileDetailsDialog
      :visiable="content.visiable"
      :updateRow="content.updateRow"
      @close="() => { content.visiable = false }">
    </TechnologyFileDetailsDialog>

    <!--查询模板界面-->
    <ProductQueryDialog
      :visiable="queryDialog.visiable"
      @close="queryDialog.visiable = false"
      @refreshList="queryListData">
    </ProductQueryDialog>
  </div>
</template>

<script>
import Table from '@/components/viewcomp/Table'
import ProductQueryDialog from '@/views/salemage/product/queryDialog'
import TechnologyFileDetailsDialog from '@/views/technics/technologyfile/filedetails'
// 引入接口
import { listTecaudit, updateTecaudit, overTechnicsProccess } from '@/api/technics/tecaudit'
import {mapGetters} from 'vuex'
export default {
  name: "TechnologyFile",
  components: { Table, TechnologyFileDetailsDialog, ProductQueryDialog },
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  },
  data() {
    return {
      content: {
        visiable: false,
        updateRow: null
      },
	  fIsverify:0,
	  viewDefaultBillState:"",
      queryDialog: {
        visiable: false
      },
      columns: [
		{prop: 'pkProduct', label: '主键', width: '10', primary: true},
		{prop: 'code', label: '产品编码', width: '120'},
        {prop: 'name', label: '产品名称', width: '120'},
        {prop: 'model', label: '产品型号', width: '120'},
		{prop: 'pcbSource', label: 'PCB来源', width: '100'},
		{prop: 'pkPsndocShow', label: '业务员', width: '100'},
		
        // {prop: 'purchaseContactsName', label: '采购联系人', width: '120'},
        // {prop: 'purchaseContactsPhone', label: '采购联系电话', width: '120'},
        {prop: 'skillContactsName', label: '技术联系人', width: '120'},
		{prop: 'skillContactsPhone', label: '技术联系电话', width: '120'},
		{prop: 'technicsState', label: '单据状态', width: '140'},
		{prop: 'modifierShow', label: '最后修改人',width: '90'},
		{prop: 'modifiedtime', label: '最后修改时间',width: '140'},
        {prop: 'bomFilename', label: 'BOM文件名称', width: '120', show: false},
        {prop: 'bomFilefullname', label: 'BOM文件全路径名称', width: '120', show: false},
        {prop: 'pcbFilename', label: 'PCB文件名称', width: '120', show: false},
        {prop: 'pcbFilefullname', label: 'PCB文件全路径名称', width: '120', show: false},
        {prop: 'craftFilename', label: '工艺文件名称', width: '120', show: false},
        {prop: 'craftFilefullname', label: '工艺文件全路径名称', width: '120', show: false},
        
        // {prop: 'technicsState', label: '销售负责人', width: '140'},
        // {prop: 'technicsState', label: '工艺负责人', width: '140'},
		
        {prop: 'creationtime', label: '创建时间',width: '140'},
		
      ],
      select: {
        'select': listTecaudit,
        // 'queryParam': { technicsState: 22,dr: 0 }   //前面开发的数据
		'queryParam': {technicsState: 22, dr: 0 } 
      },
      top_btn: [
        {
          name: '查询',
          code: 'QUERYDIALOG',
          action: listTecaudit,
         
        }
      ],
      act_btn: [
        {
          name: '工艺文件维护',
          code: 'FILEDETAILS',
          action: null,
          btnSize: 'mini',
          iconPic: 'el-icon-folder-opened',
          typeLess: 'itag',
        },
		{
		  name: '送审',
		  code: 'EXAMINE',
		  when: {'fIsverify':'0'}, 
		  action: null,
		  btnSize:'mini',
		  typeLess: 'itag',
		  iconPic: 'el-icon-circle-check',
		}, 
		  {
		  name: '重新审核',
		  code: 'RETURN2',
		  when: {'fIsverify':'2'}, 
		  action: null,
		  btnSize:'mini',
		  typeLess: 'itag',
		  iconPic: 'el-icon-refresh-right',
		},
		{
		  name: '退回',
		  code: 'RETURN1',
		  when: {'fIsverify':'1'}, 
		  action: null,
		  btnSize:'mini',
		  typeLess:'itag',
		  iconPic:'el-icon-warning-outline',
		}
      ],
      replace: [
        {
          name: 'technicsState',
          replace: { 22: "工艺审核完成",0:"自由态",20:"已申请",21:"工艺审核中" }
        },
        {
          name: 'pcbSource',
          replace: { 0: '无', 1: '甲方提供', 2: '乙方提供'}
        }
      ]
    }
  },
  methods: {
    onButtonClick(param) { // 监控页面中所有的按钮点击事件
      if (param.btnCode == 'FILEDETAILS') {
        // 弹出工艺文件维护界面
        this.content.visiable = true
        this.content.updateRow = param.bindData
      }
      // 查询界面
      if (param.btnCode === 'QUERYDIALOG') {
        this.queryDialog.visiable = true
      }
	  //送审
	  if (param.btnCode === 'EXAMINE') {
		  let param1={fIsverify:'1',pkProduct:param.bindData.pkProduct}
		  if(this.name=="admin"){
		  	alert("工艺人员未提交,请本人操作")
		  }else{
		  	this.$confirm('您确定要提交审核吗?', '提示', {
		  	         confirmButtonText: '确定',
		  	         cancelButtonText: '取消',
		  	         type: 'warning'
		  	       }).then(() => {
		  			  updateTecaudit(param1).then((response=>{
		  			//    console.log(response)
		  			   let queryParam={dr:0}
		  			   // 触发查询接口 -- 主动触发Table组件中的查询逻辑
		  			   let newSelect = {select: this.select.select, queryParam: queryParam }
		  			   this.select = newSelect
						}))
						// location.reload();
		  	       }).catch(() => {
		  	         this.$message({
		  	           type: 'info',
		  	           message: '已取消提交'
		  	         });          
		  	       });
		  }
	  }
	  //重新审核
	  if (param.btnCode === 'RETURN2') {
		  let param1={fIsverify:'1',pkProduct:param.bindData.pkProduct}
		  if(this.name=="admin"){
		  	alert("工艺人员未提交,请本人操作")
		  }else{
		  	this.$confirm('您确定要提交审核吗?', '提示', {
		  	         confirmButtonText: '确定',
		  	         cancelButtonText: '取消',
		  	         type: 'warning'
		  	       }).then(() => {
		  			  updateTecaudit(param1).then((response=>{
		  			//    console.log(response)
		  			   let queryParam={dr:0}
		  			   // 触发查询接口 -- 主动触发Table组件中的查询逻辑
		  			   let newSelect = {select: this.select.select, queryParam: queryParam }
		  			   this.select = newSelect
						}))
						// location.reload();
		  	       }).catch(() => {
		  	         this.$message({
		  	           type: 'info',
		  	           message: '已取消提交'
		  	         });          
		  	       });
		  }
	  }
	  //退回
	  if (param.btnCode === 'RETURN1') {
			let param1={fIsverify:'2',pkProduct:param.bindData.pkProduct}
		 if(this.name=="admin"){
		 	this.$confirm('您确定要退回吗?', '提示', {
		 	         confirmButtonText: '确定',
		 	         cancelButtonText: '取消',
		 	         type: 'warning'
		 	       }).then(() => {
		 			  updateTecaudit(param1).then((response=>{
		 			//    console.log(response)
		 			   let queryParam={dr:0}
		 			   // 触发查询接口 -- 主动触发Table组件中的查询逻辑
		 			   let newSelect = {select: this.select.select, queryParam: queryParam }
		 			   this.select = newSelect
					   }))
					//    location.reload();
		 	       }).catch(() => {
		 	         this.$message({
		 	           type: 'info',
		 	           message: '已取消退回!'
		 	         });          
		 	       });
		 }else{
		 	alert("您不是管理员无法审核!!")
		 }
	  }
    },
	// 条件查询列表数据
	queryViewListDataByWhere(whereParam) {
	  this.viewDefaultBillState = whereParam
	  let queryParam = { dr: 0 }
	  if (whereParam == 'ALL') { // 全部
	    this.viewDefaultBillState = null
	    queryParam.technicsState = null
	  } else {
	    queryParam.technicsState = this.viewDefaultBillState
	  }
	
	  // 触发查询接口 -- 主动触发Table组件中的查询逻辑
	  let newSelect = {select: this.select.select, queryParam: queryParam }
	  this.select = newSelect
	//   console.log(this.select)
	},
	
    queryListData(queryParam) { // 刷新界面数据
      if (queryParam) {
        let queryDialogParam ={
          productCode: queryParam.productCode,
          pkPsndoc: queryParam.pkPsndoc,
          customShortName: queryParam.customShortName,
          technicsState: queryParam.technicsState,
          creationdateBegin: queryParam.creationdateBegin,
          creationdateEnd: queryParam.creationdateEnd,
		  name:queryParam.name
        }
        let newSelect = {select: this.select.select, queryParam: queryDialogParam }
        this.select = newSelect
      } else {
        let newSelect = {select: this.select.select, queryParam: this.select.queryParam }
        this.select = newSelect
      }
    },
  }
}
</script>

<style scoped="scoped">
.icon{
  float: right;
  margin-top: 20px;
  margin-right: 50px;
  color: #409EFF;
  font-size:10px;
}
</style>
