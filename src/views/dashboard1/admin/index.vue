<template>
	<div class="content">
	    <div class="head1">
			<div class="head1_z" style="background:#53AAC6;">
				<div class="head1_z_1">
					<div class="head1_z_1_1"><img src="../../../assets/test/is-user.png"></div>
					<div class="head1_zi">销售任务</div>
				</div>
				<div class="head1_z_2">
					<div class="head1_z_zi1">
						<span>销售询价</span>
						<span>销售签单</span>
						<span>销售回款</span>
					</div>
					<div class="head1_z_zi2">
						<span>12</span>
						<span>10</span>
						<span>10</span>
					</div>
				</div>
			</div>
			<div class="head1_z" style="background:#D9534F;">
				<div class="head1_z_1">
					<div class="head1_z_1_1"><img src="../../../assets/test/is-document.png"></div>
					<div class="head1_zi">采购任务</div>
				</div>
				<div class="head1_z_2">
					<div class="head1_z_zi1">
						<span>采购报价</span>
						<span>采购任务</span>
						<span>采购入库</span>
					</div>
					<div class="head1_z_zi2">
						<span>12</span>
						<span>10</span>
						<span>10</span>
					</div>
				</div>
			</div>
			<div class="head1_z" style="background:#428BCA;">
				<div class="head1_z_1">
					<div class="head1_z_1_1"><img src="../../../assets/test/is-document.png"></div>
					<div class="head1_zi">工艺任务</div>
				</div>
				<div class="head1_z_2">
					<div class="head1_z_zi1">
						<span>售前工艺</span>
						<span>订单工艺</span>
						<span>产品工艺</span>
					</div>
					<div class="head1_z_zi2">
						<span>12</span>
						<span>10</span>
						<span>10</span>
					</div>
				</div>
			</div>
			<div class="head1_z" style="background:#1D2939;">
				<div class="head1_z_1">
					<div class="head1_z_1_1"><img src="../../../assets/test/is-money.png"></div>
					<div class="head1_zi">品质任务</div>
				</div>
				<div class="head1_z_2">
					<div class="head1_z_zi1">
						<span>来料质检</span>
						<span>过程质检</span>
						<span>成品质检</span>
					</div>
					<div class="head1_z_zi2">
						<span>12</span>
						<span>10</span>
						<span>10</span>
					</div>
				</div>
			</div>
		</div>
		 <div class="head2">
		 	<div class="head2_z" style="background:#F0AD4E;">
				<div class="head1_z_1">
					<div class="head1_z_1_1"><img src="../../../assets/test/is-user.png"></div>
					<div class="head1_zi">生产任务</div>
				</div>
				<div class="head1_z_2">
					<div class="head1_z_zi1">
						<span>生产报价</span>
						<span>生产计划</span>
						<span>生产中</span>
					</div>
					<div class="head1_z_zi2">
						<span>12</span>
						<span>10</span>
						<span>10</span>
					</div>
				</div>
			</div>
		 	<div class="head2_z" style="background:#428BCA;">
				<div class="head1_z_1">
					<div class="head1_z_1_1"><img src="../../../assets/test/is-document.png"></div>
					<div class="head1_zi">仓储任务</div>
				</div>
				<div class="head1_z_2">
					<div class="head1_z_zi1">
						<span>物料入库</span>
						<span>物料出库</span>
						<span>成品出库</span>
					</div>
					<div class="head1_z_zi2">
						<span>12</span>
						<span>10</span>
						<span>10</span>
					</div>
				</div>
			</div>
		 	<div class="head2_z" style="background:#D9534F;">
				<div class="head1_z_1">
					<div class="head1_z_1_1"><img src="../../../assets/test/is-document.png"></div>
					<div class="head1_zi">财务任务</div>
				</div>
				<div class="head1_z_2">
					<div class="head1_z_zi1">
						<span>应收账款</span>
						<span>应开票据</span>
						<span>利润报表</span>
					</div>
					<div class="head1_z_zi2">
						<span>12</span>
						<span>10</span>
						<span>10</span>
					</div>
				</div>
			</div>
		 	<div class="head2_z" style="background:#53AAC6;">
				<div class="head1_z_1">
					<div class="head1_z_1_1"><img src="../../../assets/test/is-money.png"></div>
					<div class="head1_zi">统计任务</div>
				</div>
				<div class="head1_z_2">
					<div class="head1_z_zi1">
						<span>订单明细</span>
						<span>客户明细</span>
						<span>产品明细</span>
					</div>
					<div class="head1_z_zi2">
						<span>12</span>
						<span>10</span>
						<span>10</span>
					</div>
				</div>
			</div>
		 </div>
		 <div class="head3">
			 <div class="head3_z1" id="myChart">
				 
			 </div>
			 <div class="head3_z2"></div>
		 </div>
		 <div class="head4">
			 <div class="head4_z1">
				 <el-table
				     :data="tableData1"
				     style="width: 100%"
				     :row-class-name="tableRowClassName">
				     <el-table-column
				       prop="date"
				       label="日期"
				       width="180">
				     </el-table-column>
				     <el-table-column
				       prop="name"
				       label="姓名"
				       width="180">
					  </el-table-column>
				     <el-table-column
				       prop="address"
				       label="地址">
				     </el-table-column>
				   </el-table>
			 </div>
			 <div class="head4_z2">
				 <div class="head4_z2_1"></div>
				 <div></div>
			 </div>
		 </div>
		 <div class="head5">
			 <el-table
			     :data="tableData"
			     style="width: 100%"
			     :row-class-name="tableRowClassName">
			     <el-table-column
			       prop="date"
			       label="日期"
			       width="180">
			     </el-table-column>
			     <el-table-column
			       prop="name"
			       label="姓名"
			       width="180">
			     </el-table-column>
				 <el-table-column
				   prop="name"
				   label="姓名"
				   width="180">
				 </el-table-column>
				 <el-table-column
				   prop="name"
				   label="姓名"
				   width="180">
				 </el-table-column>
				 <el-table-column
				   prop="name"
				   label="姓名"
				   width="180">
				 </el-table-column>
			     <el-table-column
			       prop="address"
			       label="地址">
			     </el-table-column>
			   </el-table>
		 </div>
	</div>
</template>


<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
	export default {
		name:'admin',
		 data () {
			return {
			  msg: 'Welcome to Your Vue.js App',
			  tableData: [{
			            date: '2016-05-02',
			            name: '王小虎',
			            address: '上海市普陀区金沙江路 1518 弄',
			          }, {
			            date: '2016-05-04',
			            name: '王小虎',
			            address: '上海市普陀区金沙江路 1518 弄'
			          }, {
			            date: '2016-05-01',
			            name: '王小虎',
			            address: '上海市普陀区金沙江路 1518 弄',
			          },
					  {
					    date: '2016-05-01',
					    name: '王小虎',
					    address: '上海市普陀区金沙江路 1518 弄',
					  }, {
			            date: '2016-05-01',
			            name: '王小虎',
			            address: '上海市普陀区金沙江路 1518 弄',
			          }, {
			            date: '2016-05-01',
			            name: '王小虎',
			            address: '上海市普陀区金沙江路 1518 弄',
			          }, {
			            date: '2016-05-01',
			            name: '王小虎',
			            address: '上海市普陀区金沙江路 1518 弄',
			          },{
			            date: '2016-05-03',
			            name: '王小虎',
			            address: '上海市普陀区金沙江路 1518 弄'
			    }],
				tableData1: [{
				          date: '2016-05-02',
				          name: '王小虎',
				          address: '上海市普陀区金沙江路 1518 弄',
				        }, {
				          date: '2016-05-04',
				          name: '王小虎',
				          address: '上海市普陀区金沙江路 1518 弄'
				        }, {
				          date: '2016-05-01',
				          name: '王小虎',
				          address: '上海市普陀区金沙江路 1518 弄',
				        },{
				          date: '2016-05-01',
				          name: '王小虎',
				          address: '上海市普陀区金沙江路 1518 弄',
				        },{
				          date: '2016-05-03',
				          name: '王小虎',
				          address: '上海市普陀区金沙江路 1518 弄'
				  }]
			}
		  },
		 mounted() {
		 	this.drawLine();
		 },
		 methods: {
		     drawLine(){
		         // 基于准备好的dom，初始化echarts实例
		         let myChart = this.$echarts.init(document.getElementById('myChart'))
		         // 绘制图表
		         myChart.setOption({
		             // title: { text: '销售报表、采购报表、工艺报表、品质报表、生产报表、仓储报表、财务报表' },
		             tooltip: {
		                     trigger: 'axis',
		                     axisPointer: {
		                         type: 'cross',
		                         label: {
		                             backgroundColor: '#6a7985'
		                         }
		                     }
		                 },
		                 legend: {
		                     data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
		                 },
		                 toolbox: {
		                     feature: {
		                         saveAsImage: {}
		                     }
		                 },
		                 grid: {
		                     left: '3%',
		                     right: '4%',
		                     bottom: '3%',
		                     containLabel: true
		                 },
		                 xAxis: [
		                     {
		                         type: 'category',
		                         boundaryGap: false,
		                         data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
		                     }
		                 ],
		                 yAxis: [
		                     {
		                         type: 'value'
		                     }
		                 ],
		                 series: [
		                     {
		                         name: '邮件营销',
		                         type: 'line',
		                         stack: '总量',
		                         areaStyle: {},
		                         data: [120, 132, 101, 134, 90, 230, 210]
		                     },
		                     {
		                         name: '联盟广告',
		                         type: 'line',
		                         stack: '总量',
		                         areaStyle: {},
		                         data: [220, 182, 191, 234, 290, 330, 310]
		                     },
		                     {
		                         name: '视频广告',
		                         type: 'line',
		                         stack: '总量',
		                         areaStyle: {},
		                         data: [150, 232, 201, 154, 190, 330, 410]
		                     },
		                     {
		                         name: '直接访问',
		                         type: 'line',
		                         stack: '总量',
		                         areaStyle: {},
		                         data: [320, 332, 301, 334, 390, 330, 320]
		                     },
		                     {
		                         name: '搜索引擎',
		                         type: 'line',
		                         stack: '总量',
		                         label: {
		                             normal: {
		                                 show: true,
		                                 position: 'top'
		                             }
		                         },
		                         areaStyle: {},
		                         data: [820, 932, 901, 934, 1290, 1330, 1320]
		                     }
		                 ]
		         });
		    },
			tableRowClassName({row, rowIndex}) {
				if (rowIndex === 1) {
				  return 'warning-row';
				} else if (rowIndex === 3) {
				  return 'success-row';
				}
				return '';
			}
		}
	}
</script>

<style scoped="scoped">
 .content{
	 width:100%;
	 background:#E4E7EA;
 }
 .head1{
	 width:100%;
	 display:flex;
	 justify-content: space-around;
	 box-sizing: border-box;
 }
.head1_z{
 	 width: 23%;
	 height:230px;
	 margin:10px;
	 border-radius:5px 0;
	 border: solid 1px yellow;
 }
 
 .head2{
	 width: 100%;
	 display:flex;
	 justify-content: space-around;
	 box-sizing: border-box;
 }
 
 .head2_z{
  	 width: 23%;
 	 height:230px;
 	 margin:10px;
	 border-radius:5px 0;
 	 border: solid 1px yellow;
  }
  
  .head3{
	  width:100%;
	  display: flex;
	  margin-top: 20px;
	  justify-content: space-around;
	  box-sizing: border-box;
  }
  
  .head3_z1{
	  width: 70%;
	  height:450px;
	  border-radius:5px 0;
	  background: white;
	  border: solid 1px yellow;
  }
  .head3_z2{
  	  width: 20%;
  	  height:400px;
  	  border-radius:5px 0;
	  background: white;
  	  border: solid 1px yellow;
  }
  .head4{
	  width: 100%;
	  display: flex;
	  margin-top: 20px;
	  justify-content: space-around;
	  box-sizing: border-box;
  }
  .head4_z1{
	  width:60%;
	  height:300px;
	  background: white;
	  border-radius:5px 0;
	  border: solid 1px yellow;
  }
  .head4_z2{
  	  width:30%;
  	  height:350px;
	  background: white;
  	  border-radius:5px 0;
  	  border: solid 1px yellow;
  }
  .head5{
	  width:90%;
	  margin: 0 auto;
	  height: 500px;
	  margin-top: 20px;
	  border-radius:5px 0;
	  background: white;
	  border: solid 1px yellow;
  }
  
  .head1_z_1{
	  width: 80%;
	  display: flex;
	  margin: 15px;
	  justify-content: space-around;
	  align-items: center;
	  box-sizing: border-box;
  }
  
  .head1_z_1_1{
	  width: 25%;
	  margin: 20px;
  }
  .head1_z_1_1 img{
	  width:100%;
	  display: block;
  }
  .head1_zi{
	  width:65%;
	  font-size: 30px;
	  color: white;
  }
  
  .head1_z_2{
  	  width: 80%;
	  margin: 19px;
  }
  
  .head1_z_zi1{
	  display: flex;
	  justify-content: space-around;
	  color: white;
   }
   .head1_z_zi1 span{
	   width:30%;
	   display: inline-block;
   }
   
   .head1_z_zi2{
   	  display: flex;
   	  
    }
    .head1_z_zi2 span{
   	   width:30%;
	   color: white;
	   margin-top: 15px;
	   font-size: 25px;
	   margin-left:10%;
    }
	
	.head4_z2_1{
		width: 100%;
		height: 280px;
		background:#1CAF9A;
		border-bottom: solid 1px 1CAF9A;
	}
	
	 .el-table .warning-row {
	    background: oldlace;
	  }
	
	  .el-table .success-row {
	    background: #f0f9eb;
	  }
</style>
