<template>
  <div>
	  <el-tabs type="border-card">

		  <!-- <el-tab-pane label="匹配BOM文件">
=======
		  <el-tab-pane label="匹配BOM文件">

		  	<el-col>
		  	 <el-upload drag
		  	   class="upload-demo"
		  	   ref="FileUpLoad"
		  	   :action="uploadUrl"
		  	   :limit="1"
		  	   :file-list="BOMFileList1"
		  	   :on-exceed="handleExceed"
		  	   :on-change="BOMFileChange1"
		  	   :before-remove="BOMFileRemove1"
		  	   :auto-upload="false">
		  	   <i class="el-icon-upload"></i>
		  	   <div class="el-upload__text"><span>匹配BOM文件</span><em>点击上传</em></div>
		  	 </el-upload>
		  	</el-col>
<<<<<<< HEAD
		  </el-tab-pane> -->

	

	    <el-tab-pane label="BOM文件">
			<div class="button">
			 <el-col >
			 <el-upload drag
			   class="upload-demo"
			   ref="FileUpLoad"
			   :action="uploadUrl"
			   :limit="1"
			   :file-list="BOMFileList"
			   
			   :on-change="BOMFileChange"
			   :before-remove="BOMFileRemove"
			   :auto-upload="false">
			   <i class="el-icon-upload"></i>
			   <div class="el-upload__text"><span>BOM文件</span><em>点击上传</em></div>
			 </el-upload>
			 </el-col>
			</div>
			<!-- 工艺审核 -->
			<Table 
			  :columns="columns" 
			  :select="select" 
			  :top_btn="top_btn"
			  @onButtonClick="onButtonClick">
			</Table>
		</el-tab-pane>
	  </el-tabs>
	<!-- 匹配数据 -->
	<el-dialog title="匹配物料" :visible.sync="dialogTableVisible" width="70%">
		<div style="position:absolute;top:45px;right:5px;">
			 <download-excel
			       class = "export-excel-wrapper"
			       :data = "json_data"
			       :fields = "json_fields"
			       name = "匹配物料解析.xls">
			       <!-- 上面可以自定义自己的样式，还可以引用其他组件button -->
			       <el-button type="primary" size="mini">导出EXCEL</el-button>
			 </download-excel>
		</div>
	  <el-table :data="materieData" border  height="500" @selection-change="handleSelectionChange">
		   <el-table-column
		        type="selection"
		        width="55">
		   </el-table-column>
		<el-table-column
		        label="序号"
		        type="index"
		        width="50"
		        align="center">
		</el-table-column>
	    <el-table-column property="parentCode" label="父项编号" width="120"></el-table-column>
		 <el-table-column property="materieCode" label="存货编号" width="120"></el-table-column>
	    <el-table-column property="materielName" label="存货全名" width="120"></el-table-column>
	    <el-table-column property="size" label="规格" width="120"></el-table-column>
	    <el-table-column property="model" label="封装" width="120"></el-table-column>
	    <el-table-column property="brand" label="品牌" width="120"></el-table-column>
		<el-table-column label="操作" align="center" min-width="100">
			<template  slot-scope="scope">
				　<el-button :disabled="scope.row.comment==null" type="primary" size="mini" @click="checkSearch(scope.row,scope.$index)">查</el-button>
			</template>
		</el-table-column>
	  </el-table>
	</el-dialog>
	
	<!-- 匹配数据具体数据 -->
	<el-dialog title="详细查询" :visible.sync="searchVisible"    width="60%">
	 <el-table ref="multipleTable" :data="searchData" border height="200" @selection-change="searchChange"  @select="select1" @select-all="selectAll">
		   <el-table-column
		        type="selection"
		        width="55">
		   </el-table-column>
		<el-table-column
		        label="序号"
		        type="index"
		        width="50"
		        align="center">
		</el-table-column>
	    <el-table-column property="parentCode" label="父项编号" width="120"></el-table-column>
		 <el-table-column property="materieCode" label="存货编号" width="120"></el-table-column>
	    <el-table-column property="materielName" label="存货全名" width="120"></el-table-column>
	    <el-table-column property="size" label="规格" width="120"></el-table-column>
	    <el-table-column property="model" label="封装" width="120"></el-table-column>
	    <el-table-column property="brand" label="品牌" width="120"></el-table-column>
		<el-table-column label="操作" align="center" min-width="100">
		</el-table-column>
	  </el-table>
	   <span slot="footer" class="dialog-footer">
	     <el-button type="primary" @click="sureDialog" >保 存</el-button>
	   </span>
	</el-dialog>
	<searchs
	:visiable="content.visiable"
	@search_ts="search_one"
	@colsed="colsed"
  >
  </searchs>
  </div>
</template>

<script>
import Table from '@/components/viewcomp/Table'
import searchs from "@/components/search/index";
// selectBillOfMaterialAsPage  
import {selectBillOfMaterialAsPage, readExcelAccFile,readExcelAccFileB} from '@/api/technics/tecaudit'


export default {
  name: "materiaAnalysis",
  components: { Table, searchs},
  data() {
    return {
	  dialogTableVisible:false,  //匹配数据弹窗
	  searchVisible:false,  //匹配详细数据
	  materieData:{},   //匹配物料数据
	  json_fields:{
		 "父项编号":"parentCode",
		 "存货编号":"materieCode",
		 "存货全名":"materielName",
		 "规格":"size",
		 "封装":"model",
		 "品牌":"brand"
	  },
	  content: {
        visiable: false, // 内容界面显示控制
        title: "", // 标题
        action: null, // 执行Action
        updateRow: null, // 更新时带过来的temp
      },
	  json_data:[],
	  orderNumber:'',
	  multipleSelection:[], //选择数据
	  searchData:[], //查询详细数据
	  searchSelection:[],//选择详细数据
	  json_meta: [
		  [
			{
			  " key ": " charset ",
			  " value ": " utf- 8 "
			}
		  ]
	   ],
	   param:null,
	  commentList:null,
	  
	  uploadUrl: process.env.BASE_API + '/', // 上传地址
	  BOMFileList: [],
	  BOMFile: null,
	  BOMFileList1:[],
	  BOMFile1:null,
      columns: [
        {prop: 'pkOfMaterial', label: '主键', width: '10', primary: true},
		{prop: 'parentCode', label: '父项编号', width: '120'},
        {prop: 'materieCode', label: '存货编号', width: '120'},
        {prop: 'materielName', label: '存货全名', width: '120'},
        {prop: 'materieType', label: '存货简名', width: '120'},
		{prop: 'materielSpecifications', label: '存货规格', width: '120'},
		{prop: 'unit', label: '基本单位', width: '120'},
        {prop: 'packaging', label: '存货型号', width: '120'},
		// creationtime
		{prop: 'creationtime', label: '创建时间', width: '120'},
        {prop: 'brand', label: '品牌', width: '120'},
      ],
      select: {
        'select': selectBillOfMaterialAsPage,
		'queryParam': {dr: 0}
	  },
	  top_btn: [
        {
          name: "搜索",
          code: "ADD",
          // action: addSmMenu,
        },
      
      ],
	}
	
  },
  methods: {
	  BOMFileChange(file){
		 this.BOMFile=file
		 let fd = new FormData();//通过form数据格式来传
		 fd.append("file",file.raw); //传文件
		 readExcelAccFile(fd).then((response)=>{
		 })
	  },
	  BOMFileRemove(file){
		  
	  },
	  BOMFileChange1(file){
	  		 this.BOMFile1=file.raw
	  		 let fd = new FormData();//通过form数据格式来传
	  		 fd.append("fileB",file.raw); //传文件
	  		 readExcelAccFileB(fd).then((response)=>{
				 if(response.message=="操作成功"){
					this.dialogTableVisible=true
					this.materieData=response.object
					this.json_data=response.object
				 }
	  		 })
	  },
    onButtonClick(param) { // 监控页面中所有的按钮点击事件
		if (param.btnCode === "ADD") {
        this.content.visiable = true;
      }
    },
	//匹配物料选择数据
	handleSelectionChange(val){
		// console.log(val)
		this.multipleSelection=val
	},
	//匹配物料更详细数据
	checkSearch(row,index){
	    // console.log(index)
		// console.log(row)
		this.orderNumber=index
		this.searchVisible=true
	    let param={limit:10,page:1,comment:row.comment}
		selectBillOfMaterialAsPage(param).then((response)=>{
			// console.log(response)
			this.searchData=response.object
		})
	},
	//限制选择长度
	select1(selection,row){
		if(selection.length>1){
			let del_row=selection.shift();
			this.$refs.multipleTable.toggleRowSelection(del_row, false)
		}
	},
	selectAll(selection){
		if(selection.length>1){
			selection.length=1
		}
	},
	colsed(data) {
      // 弹窗的显示隐藏
      this.content.visiable = data;
    },
	search_one(data) {
      this.content.visiable = false;
      console.log(data);
     let mindata = {
       creationdateBegin: data['开始时间'],
        creationdateEnd: data['结束时间'],
		materieCode:data['产品名称']//存货编码
		// 产品名称
      };
      this.select = {
        select: this.select.select,
        queryParam: mindata,
      };
      
    },
	// 选择详细数据
	searchChange(val){
		this.param={parentCode:val[0].parentCode,materieCode:val[0].materieCode,materielName:val[0].materielName,size:val[0].size,model:val[0].model,brand:val[0].brand,comment:val[0].comment}
		// console.log(this.param)
	    this.searchSelection=val
	},
	//确定
	sureDialog(){
		this.$set(this.materieData,this.orderNumber,this.param)
		this.searchVisible=false
	},
    queryListData(queryParam) { // 刷新界面数据
      // if (queryParam) {
      //   let queryDialogParam ={
      //     productCode: queryParam.productCode,
      //     pkPsndoc: queryParam.pkPsndoc,
      //     customShortName: queryParam.customShortName,
      //     technicsState: queryParam.technicsState,
      //     creationdateBegin: queryParam.creationdateBegin,
      //     creationdateEnd: queryParam.creationdateEnd
      //   }
      //   let newSelect = {select: this.select.select, queryParam: queryDialogParam }
      //   this.select = newSelect
      // } else {
      //   let newSelect = {select: this.select.select, queryParam: this.select.queryParam }
      //   this.select = newSelect
      // }
    },
  }
}
</script>

<style  lang="scss" type="text/scss" scoped>
.icon{
  float: right;
  margin-top: 20px;
  margin-right: 50px;
  color: #409EFF;
}

/deep/ .el-upload-dragger{
	width:130px;
	height:30px;
	background:#409EFF;
	border:solid 1px #409EFF;
	margin-top:40px;
}
/deep/ .el-upload__tip{
	width:130px;
}

/deep/ .el-upload-dragger .el-icon-upload {
    font-size: 30px;
	color:#FFFEFF;
	float:left;
    margin: -10px 3px 16px;
    line-height: 50px;
	
}

/deep/ .el-upload__text span{
	color: white;
	margin-top:7px;
	display: inline-block;
}
</style>
