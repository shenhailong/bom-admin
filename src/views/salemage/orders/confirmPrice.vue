<template>
  <el-dialog title="确认价格" 
    :visible.sync="contentVisiable" 
    @close="closeDialog"
    width="88%">
   <el-form :inline="true" ref="dataForm" size="mini" :model="temp" label-position="left" label-width="100px">
	   <el-tabs type="border-card">
	     <el-tab-pane label="基本信息">
			 <el-form-item label="产品名称" prop="productName">
			   <el-input v-model="temp.productName" :disabled="true"></el-input>
			 </el-form-item>
			 <el-form-item label="产品编码" prop="productCode">
			   <el-input v-model="temp.productCode" :disabled="true"></el-input>
			 </el-form-item>
			 <el-form-item label="税率" prop="taxinclud">
			   <el-input v-model="temp.taxinclud" :disabled="true"></el-input>
			 </el-form-item>
			 <el-form-item label="订单数量" prop="productNum">
			   <el-input v-model="temp.productNum" :disabled="true"></el-input>
			 </el-form-item>
		 </el-tab-pane>
	    </el-tabs>
		<br/>
		<el-tabs type="border-card">
		   <el-tag>工序报价</el-tag>
		   <!-- <span>工序报价</span> -->
		   <el-table :data="temp.billProduceQuoteBPoList" show-summary border >
		     <el-table-column prop="pkProduceQuoteB" v-if="false"></el-table-column>
		   	  <el-table-column prop="pkProductOrderB" v-if="false"></el-table-column>
		     <el-table-column prop="ismodel" v-if="false"></el-table-column>
		     <el-table-column prop="processType" label="工序类别" width="150"></el-table-column>
		     <el-table-column prop="processParam" label="工序参数" width="150"></el-table-column>
		     <!-- <el-table-column prop="unitTotalPriceSale" label="销售工序总价" width="160"></el-table-column> -->
			 <el-table-column label="销售工序总价" prop="saleTotalPriceOut" width="150">
			   <template slot-scope="scope">
			     <el-input size="mini" v-model="scope.row.saleTotalPriceOut" @change="gongxuChange(scope.row, '1')"></el-input>
			   </template>
			 </el-table-column>
		     <el-table-column label="销售订单合计" prop="saleUnitTotalOut" width="150">
		       <template slot-scope="scope">
		         <el-input size="mini" v-model="scope.row.saleUnitTotalOut" @change="gongxuChange(scope.row, '2')"></el-input>
		       </template>
		     </el-table-column>
		   </el-table>
			<div style="position:absolute;right:40px;top:12px;border-left:1px solid #DCDFE6;padding:0 0 0 20px;">
		   <el-tag>制具报价</el-tag>
		   <el-table :data="temp.modelQuoteBPoList" show-summary border>
		     <!-- <el-table-column prop="pkProduceQuoteB" v-if="false"></el-table-column>
		     <el-table-column prop="ismodel" v-if="false"></el-table-column> -->
		     <el-table-column prop="processType" label="工序类别" width="80"></el-table-column>
		     <el-table-column prop="processParam" label="工序数量" width="80"></el-table-column>
		     <el-table-column prop="processParam" label="工序总价" width="80"></el-table-column>
		     <el-table-column label="销售制具报价" prop="saleUnitTotalOut" width="180">
		       <template slot-scope="scope">
		         <el-input size="small" v-model="scope.row.saleUnitTotalOut" onkeyup="value=value.replace(/[^0-9.]/g,'')"  @change="zhijuChange(scope.row)"></el-input>
		       </template>
		     </el-table-column>
		   </el-table>
		   </div>
		</el-tabs>
		<br />
		<el-tabs type="border-card">
		  <el-tab-pane label="销售物料报价信息">
			  <el-form-item label="物料销售单价" prop="purchasePriceSale">
			    <el-input class="priceStyle" type="text" onkeyup="value=value.replace(/[^0-9.]/g,'')" v-model="temp.purchasePriceSale" @change="getpurchaseTotalSale"></el-input>
			  </el-form-item>
			  <el-form-item label="物料销售总价" prop="purchaseTotalSale">
			    <el-input class="priceStyle" type="text" onkeyup="value=value.replace(/[^0-9.]/g,'')" v-model="temp.purchaseTotalSale" @change="getpurchasePriceSale"></el-input>
			  </el-form-item>
			  <el-form-item label="PCB销售单价" prop="productPcbPriceSale">
			    <el-input class="priceStyle" type="text" onkeyup="value=value.replace(/[^0-9.]/g,'')" v-model="temp.productPcbPriceSale" @change="getproductPcbTotalSale"></el-input>
			  </el-form-item>
			  <el-form-item label="PCB销售总价" prop="productPcbTotalSale">
			    <el-input class="priceStyle" type="text" onkeyup="value=value.replace(/[^0-9.]/g,'')" v-model="temp.productPcbTotalSale" @change="getproductPcbPriceSale"></el-input>
			  </el-form-item>
			  <el-form-item label="钢网销售价格" prop="steelPriceSale" v-if="this.temp.isSteel=='1'">
			    <el-input class="priceStyle" type="text" onkeyup="value=value.replace(/[^0-9.]/g,'')" v-model="temp.steelPriceSale" ></el-input>
			  </el-form-item>
		  </el-tab-pane>
	    </el-tabs>
		<br />
		<el-tabs type="border-card">
		  <el-tab-pane label="产品合成价格">
			 <el-form-item label="钢网价格" prop="steelPriceSale">
			   <el-input type="text" onkeyup="value=value.replace(/[^0-9.]/g,'')" v-model="temp.steelPriceSale" :disabled="true"></el-input>
			 </el-form-item>
			 <el-form-item label="制具总价" prop="braceZprice">
			   <el-input type="text" onkeyup="value=value.replace(/[^0-9.]/g,'')" v-model="temp.braceZprice"  :disabled="true"></el-input>
			 </el-form-item>
			 <el-form-item label="订单单价" prop="productUnitPrice">
			   <el-input type="text" onkeyup="value=value.replace(/[^0-9.]/g,'')" v-model="temp.productUnitPrice" :disabled="true"></el-input>
			 </el-form-item>
			 <el-form-item label="订单总价" prop="productUnitZZrice">
			   <el-input type="text" onkeyup="value=value.replace(/[^0-9.]/g,'')" v-model="temp.productUnitZZrice" :disabled="true"></el-input>
			 </el-form-item>
		  </el-tab-pane>
		</el-tabs>
   </el-form>
		<span slot="footer" class="dialog-footer">
		  <el-button @click="closeDialog">取 消</el-button>
		  <el-button type="primary" @click="sureDialog" v-if="title!='查看'">确 定</el-button>
		</span>
  </el-dialog>
</template>

<script>
import { updateProductOrderB,selectAllProductOrderByPkOrderBId,updateProductOrderBH} from '@/api/orders/orders'


export default {
  name: 'ConfirmPriceContent',
  props: ['visiable', 'updateRow'],
  data() {
    return {
      contentVisiable: false,
      temp: {
        pkProductOrderB: null, // 订单字表主键
        productName: '', // 产品名称
        productCode: '', // 产品编码
        taxinclud: null, // 税率
        productNum: null, // 订单数量
        countProductPriceUnit: null, // 单价
        countProductPriceTotal: null, // 订单总价 
		steelUnitPrice:null,  //钢网价格
		isSteel:'',
		billProduceQuoteBPoList: [],// 生产报价
		modelQuoteBPoList: [],// 制具报价
		productPcbPriceSale:null,  //PCB单价
		productPcbTotalSale:null,  //PCB总价
		purchasePriceSale:null,  //物料单价
		purchaseTotalSale:null, //物料总价
		steelPriceSale:null,   //钢网价格
		braceZprice:0,    //支具总价
		productUnitPrice:0,  //订单单价
		productUnitZZrice:0,//订单总价
		pkBillProductOrderBB:'',
		productOrderBHPos:[],
		a1:0,
		a2:0,
		a3:0,
		a4:0,
		b1:0,
		b2:0,
		b3:0,
		b4:0,
		
      }
    }
  },
  watch: {
    visiable() {
      this.contentVisiable = this.visiable
	  // console.log(this.updateRow)
      if (this.visiable == true && this.updateRow) {
        this.temp.pkProductOrderB = this.updateRow.pkProductOrderB
        this.temp.productName = this.updateRow.name
        this.temp.productCode = this.updateRow.code
        this.temp.taxinclud = this.updateRow.taxinclud
        this.temp.productNum = this.updateRow.productNum
        this.temp.countProductPriceTotal = this.updateRow.productPrice
        this.temp.isSteel = this.updateRow.isSteel
      }
	  let param={pkProductOrderB:this.temp.pkProductOrderB}
	  selectAllProductOrderByPkOrderBId(param).then((response)=>{
		 this.temp.pkBillProductOrderBB=response.object.pkBillProductOrderBB
		 this.temp.productOrderBHPos=response.object.productOrderBHPos
		  this.temp.billProduceQuoteBPoList=[]
		  this.temp.modelQuoteBPoList=[]
		  this.temp.productPcbPriceSale=response.object.productPcbPriceSale
		  this.temp.productPcbTotalSale=response.object.productPcbTotalSale
		  this.temp.purchasePriceSale=response.object.purchasePriceSale
		  this.temp.purchaseTotalSale=response.object.purchaseTotalSale
		  this.temp.steelPriceSale=response.object.steelPriceSale
		 let list=response.object.productOrderBHPos
		 //计算支具总价格
		 //计算销售工序总价合计
		 for(var i=0;i<list.length;i++){
			 if(list[i].processType=='SMT'||list[i].processType=='DIP'||list[i].processType=='三防'||list[i].processType=='组装测试老化'){
				 this.temp.billProduceQuoteBPoList.push(list[i])
			 }else{
				 this.temp.modelQuoteBPoList.push(list[i])
			 }
			 
			 if(list[i].processType=="DIP制具"){
			 	let saleUnitTotalOut = Number.parseFloat(list[i].saleUnitTotalOut)
			 	this.temp.a1=saleUnitTotalOut
			 }else if(list[i].processType=="测试制具"){
			 	let saleUnitTotalOut = Number.parseFloat(list[i].saleUnitTotalOut)
			 	this.temp.a2=saleUnitTotalOut
			 }else if(list[i].processType=="三防制具"){
			 	let saleUnitTotalOut = Number.parseFloat(list[i].saleUnitTotalOut)
			 	this.temp.a3=saleUnitTotalOut
			 }else if(list[i].processType=="老化制具"){
			 	let saleUnitTotalOut = Number.parseFloat(list[i].saleUnitTotalOut)
			 	this.temp.a4=saleUnitTotalOut
			 }
			 if(list[i].processType=="SMT"){
			 	let saleUnitTotalOut = Number.parseFloat(list[i].saleTotalPriceOut)
			 	this.temp.b1=saleUnitTotalOut
			 }else if(list[i].processType=="DIP"){
			 	let saleUnitTotalOut = Number.parseFloat(list[i].saleTotalPriceOut)
			 	this.temp.b2=saleUnitTotalOut
			 }else if(list[i].processType=="三防"){
			 	let saleUnitTotalOut = Number.parseFloat(list[i].saleTotalPriceOut)
			 	this.temp.b3=saleUnitTotalOut
			 }else if(list[i].processType=="组装测试老化"){
			 	let saleUnitTotalOut = Number.parseFloat(list[i].saleTotalPriceOut)
			 	this.temp.b4=saleUnitTotalOut
			 }
		 }
		   //计算制具总价
		   this.temp.braceZprice=(this.temp.a1+this.temp.a2+this.temp.a3+this.temp.a4).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
		  //计算订单合成单价this.temp.b3+this.temp.b4+this.temp.productPcbPriceSale
		   let   productPcbPriceSale=parseFloat(this.temp.productPcbPriceSale)
		   let   purchasePriceSale=parseFloat(this.temp.purchasePriceSale)
		   this.temp.productUnitPrice=parseFloat(this.temp.b1+this.temp.b2+this.temp.b3+this.temp.b4+productPcbPriceSale+purchasePriceSale).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
		  //计算订单合成总价
		  this.temp.productUnitZZrice=parseFloat(this.temp.productUnitPrice*this.temp.productNum).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
		  
	  })
    },
  },
  methods: {
    closeDialog() { // 回调关闭Dialog
      this.$emit('close', null)
    },
	zhijuChange(row){
		// console.log(row)
		if(row.processType=="DIP制具"){
			let saleUnitTotalOut = Number.parseFloat(row.saleUnitTotalOut)
			this.temp.a1=saleUnitTotalOut
		}else if(row.processType=="测试制具"){
			let saleUnitTotalOut = Number.parseFloat(row.saleUnitTotalOut)
			this.temp.a2=saleUnitTotalOut
		}else if(row.processType=="三防制具"){
			let saleUnitTotalOut = Number.parseFloat(row.saleUnitTotalOut)
			this.temp.a3=saleUnitTotalOut
		}else if(row.processType=="老化制具"){
			let saleUnitTotalOut = Number.parseFloat(row.saleUnitTotalOut)
			this.temp.a4=saleUnitTotalOut
		}
       this.temp.braceZprice=parseFloat(this.temp.a1+this.temp.a2+this.temp.a3+this.temp.a4).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
	   
	},
	// 工序报价计算公式
	gongxuChange(row, type) {
		
		if(type==="1"){
			//计算销售订单合计
			row.saleUnitTotalOut=(row.saleTotalPriceOut * this.temp.productNum).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
			if(row.processType=="SMT"){
				let saleUnitTotalOut = Number.parseFloat(row.saleTotalPriceOut)
				this.temp.b1=saleUnitTotalOut
			}else if(row.processType=="DIP"){
				let saleUnitTotalOut = Number.parseFloat(row.saleTotalPriceOut)
				this.temp.b2=saleUnitTotalOut
			}else if(row.processType=="三防"){
				let saleUnitTotalOut = Number.parseFloat(row.saleTotalPriceOut)
				this.temp.b3=saleUnitTotalOut
			}else if(row.processType=="组装测试老化"){
				let saleUnitTotalOut = Number.parseFloat(row.saleTotalPriceOut)
				this.temp.b4=saleUnitTotalOut
			}
			  let productPcbPriceSale=Number.parseFloat(this.temp.productPcbPriceSale)
			  let purchasePriceSale=Number.parseFloat(this.temp.purchasePriceSale)
			  this.temp.productUnitPrice=parseFloat(this.temp.b1+this.temp.b2+this.temp.b3+this.temp.b4+productPcbPriceSale+purchasePriceSale).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
			  this.temp.productUnitZZrice=parseFloat(this.temp.productUnitPrice*this.temp.productNum).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
		}
		if(type==="2"){
			//计算销售订单合计
			row.saleTotalPriceOut=(row.saleUnitTotalOut/this.temp.productNum).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
			if(row.processType=="SMT"){
				let saleUnitTotalOut = Number.parseFloat(row.saleTotalPriceOut)
				this.temp.b1=saleUnitTotalOut
			}else if(row.processType=="DIP"){
				let saleUnitTotalOut = Number.parseFloat(row.saleTotalPriceOut)
				this.temp.b2=saleUnitTotalOut
			}else if(row.processType=="三防"){
				let saleUnitTotalOut = Number.parseFloat(row.saleTotalPriceOut)
				this.temp.b3=saleUnitTotalOut
			}else if(row.processType=="组装测试老化"){
				let saleUnitTotalOut = Number.parseFloat(row.saleTotalPriceOut)
				this.temp.b4=saleUnitTotalOut
			}
			  let productPcbPriceSale=Number.parseFloat(this.temp.productPcbPriceSale)
			  let purchasePriceSale=Number.parseFloat(this.temp.purchasePriceSale)
			  this.temp.productUnitPrice=parseFloat(this.temp.b1+this.temp.b2+this.temp.b3+this.temp.b4+productPcbPriceSale+purchasePriceSale).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
			  this.temp.productUnitZZrice=parseFloat(this.temp.productUnitPrice*this.temp.productNum).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
		}
	},
	//计算物料单价
	getpurchasePriceSale(){
	   this.temp.purchasePriceSale=parseFloat(this.temp.purchaseTotalSale/this.temp.productNum).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
	   let productPcbPriceSale=Number.parseFloat(this.temp.productPcbPriceSale)
	   let purchasePriceSale=Number.parseFloat(this.temp.purchasePriceSale)
	   this.temp.productUnitPrice=parseFloat(this.temp.b1+this.temp.b2+this.temp.b3+this.temp.b4+productPcbPriceSale+purchasePriceSale).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
	   this.temp.productUnitZZrice=(this.temp.b1+this.temp.b2+this.temp.b3+this.temp.b4+productPcbPriceSale+purchasePriceSale*this.temp.productNum).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
	},
	//计算物料总价
	getpurchaseTotalSale(){
	   this.temp.purchaseTotalSale=parseFloat(this.temp.purchasePriceSale*this.temp.productNum).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
	   let productPcbPriceSale=Number.parseFloat(this.temp.productPcbPriceSale)
	   let purchasePriceSale=Number.parseFloat(this.temp.purchasePriceSale)
	   this.temp.productUnitPrice=parseFloat(this.temp.b1+this.temp.b2+this.temp.b3+this.temp.b4+productPcbPriceSale+purchasePriceSale).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
	   this.temp.productUnitZZrice=((this.temp.b1+this.temp.b2+this.temp.b3+this.temp.b4+productPcbPriceSale+purchasePriceSale)*this.temp.productNum).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
	},
	//计算PCB单价
	getproductPcbPriceSale(){
	   this.temp.productPcbPriceSale=parseFloat(this.temp.productPcbTotalSale/this.temp.productNum).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
	   let productPcbPriceSale=Number.parseFloat(this.temp.productPcbPriceSale)
	   let purchasePriceSale=Number.parseFloat(this.temp.purchasePriceSale)
	   this.temp.productUnitPrice=parseFloat(this.temp.b1+this.temp.b2+this.temp.b3+this.temp.b4+productPcbPriceSale+purchasePriceSale).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
	   this.temp.productUnitZZrice=((this.temp.b1+this.temp.b2+this.temp.b3+this.temp.b4+productPcbPriceSale+purchasePriceSale)*this.temp.productNum).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
	},
	//计算PCB总价
	getproductPcbTotalSale(){
	   this.temp.productPcbTotalSale=parseFloat(this.temp.productPcbPriceSale*this.temp.productNum).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
	   let productPcbPriceSale=Number.parseFloat(this.temp.productPcbPriceSale)
	   let purchasePriceSale=Number.parseFloat(this.temp.purchasePriceSale)
	   this.temp.productUnitPrice=parseFloat(this.temp.b1+this.temp.b2+this.temp.b3+this.temp.b4+productPcbPriceSale+purchasePriceSale).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
	   this.temp.productUnitZZrice=((this.temp.b1+this.temp.b2+this.temp.b3+this.temp.b4+productPcbPriceSale+purchasePriceSale)*this.temp.productNum).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1')
	},
    sureDialog() { // 确定保存回调Dialog
      
        let updateParam = {
          pkProductOrderB: this.temp.pkProductOrderB,
          productUnitPrice: this.temp.productUnitPrice,
          billState: 7,
		  steelPriceSale:this.temp.steelPriceSale,
		  pkBillProductOrderBB:this.temp.pkBillProductOrderBB,
		  productOrderBHPos:this.temp.productOrderBHPos,
		  productPcbPriceSale:this.temp.productPcbPriceSale,
		  productPcbTotalSale:this.temp.productPcbTotalSale,
		  productUnitPrice: this.temp.productUnitPrice,
		  purchasePriceSale: this.temp.purchasePriceSale,
		  purchaseTotalSale: this.temp.purchaseTotalSale,
		  steelPriceSale: this.temp.steelPriceSale,
		  productUnitPrice:this.temp.productUnitPrice
        }
        // updateProductOrderB(updateParam).then((response) => {
        //   if (response && response.success) {
        //     this.$emit('close', null)
        //     this.$message({ type: 'success', message: '确认成功!' })
        //   }
        // })
		updateProductOrderBH(updateParam).then((response) => {
		  if (response && response.success) {
		    this.$emit('close', null)
		    this.$message({ type: 'success', message: '确认成功!' })
		  }
		})
    },
    // 监听单价变化后级联计算出总价
    countProductPriceUnitChage() {
      let productNum = this.temp.productNum // 数量
      let countProductPriceUnit = this.temp.countProductPriceUnit // 单价
      if (productNum && countProductPriceUnit) {
        this.temp.countProductPriceTotal = ( (countProductPriceUnit * 100000) * productNum ) / 100000
      }
    },
	// 监听单价变化后级联计算出总价
	getPrice() {
	  let productNum = this.temp.productNum // 数量
	  let  Zprice = this.temp.countProductPriceTotal// 总价
	  if (productNum && Zprice) {
	   this.temp.countProductPriceUnit=(( (Zprice * 100) / productNum ) / 100).toFixed(2)
	  }
	},
  },
}
</script>

<style  lang="scss" type="text/scss" scoped>
.el-select /deep/ .el-input__inner{
  width: 160px;
}

.el-input /deep/ .el-input__inner{
  width: 160px;
}

.priceStyle /deep/ .el-input__inner{
  width: 115px;
}

.el-table--border td{
   border-right: none;
   }
 .el-table::before{
  height:0;
}
 .base .el-table__body{
  border-top: 1px solid #CCCCCC;
}

</style>