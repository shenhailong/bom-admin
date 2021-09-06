<template>
    <div>
      <div class="div">
          <div>
            <el-upload
            drag
            class="upload-demo"
            ref="BOMUpload"
            :action="uploadUrl"
            
            :limit="1"
            :on-change="BOMFileChange"
            :auto-upload="false"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">出库单上传</div>
          </el-upload>
        </div>
        <div>
            <el-upload
            drag
            class="upload-demo"
            ref="BOMUpload"
            :action="uploadUrl"
            
            :limit="1"
            :on-change="BOMFileChange2"
            :auto-upload="false"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">合同上传</div>
          </el-upload>
        </div>
      </div>
        
        <div class="divs">
          <div>

          </div>
          <div>
            <el-button type="primary" @click="onSubmit">确定</el-button>
          </div>
          
        </div>
    </div>
</template>
<script>
import {
  saveFinancePaymentFile,
  saveFinancePaymen
} from "@/api/financing/flans";
export default {
  props: ["isdata"],
  data(){
    return{
      file:{
        raw:null
      },
      file2:{
        raw:null
      },
      uploadUrl: process.env.BASE_API + "/", // 上传地址
    }
  },
    methods:{
      BOMFileChange(file){
        this.file = file //合同上传
      },
      BOMFileChange2(file){
        this.file2 = file//出库单
      },
      onSubmit(){
        //提交接口
        let froms = new FormData();
        froms.append('file',this.file.raw)//出库单
        froms.append('failfile',this.file2.raw)//合同
        let  day1 = new Date();//当前时间
        froms.append("customerCode", this.isdata.customerCode)
        this.$confirm("你是否确认如上操作?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(()=>{
            saveFinancePaymentFile(froms).then((res)=>{ //文件上传
              let jsons = {
                failfileFullname: res.object.SALE_FAIL_FILE_FA_NAME,// 合同名称
                fileFullname:res.object.SALE_FILE_FA_NAME,// 出库单名称
                failfileName:res.object.SALE_FAIL_FILE_FA_FULL_NAME, // 合同路径
                fileName:res.object.SALE_FILE_FA_FULL_NAME,// 出库单路径
                pkCustomer: this.isdata.pkCustomer,
                pkProductOrder: this.isdata.pkProductOrder,
                creationtime:this.dateFormat(day1),
                paymentType : '4'
              }
              console.log(jsons);
              saveFinancePaymen(jsons).then((res)=>{
               
                this.$emit('closese')
              }) //保存
            })
            
        })
        
      },
      dateFormat(dateData) {
      //时间的计算
      var date = new Date(dateData);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      // console.log(date.getHours());
      var p = date.getHours();
      var o = date.getMinutes();
      var g = date.getSeconds();
      const time = y + "-" + m + "-" + d + " " + p + ":" + o + ":" + g;
      return time;
    },
    }
}
</script>
<style  scoped>
    .div{
        display: flex;
        justify-content: space-around;
    }
    .divs{
        display: flex;
        justify-content: space-between;
    }
</style>