<template>
  <el-form ref="form" :model="form" label-width="80px">
    <div>
      <el-form-item label='有效合同'>
        <el-select v-model="value_one" placeholder="请选择活动区域">
          <el-option label="是" value="0"></el-option>
          <el-option label="否" value="1"></el-option>
        </el-select>
      </el-form-item>
      <div>
        <el-form-item label='合同状态'>
        <el-select v-model="value_two" placeholder="请选择活动区域">
          <el-option label="完成" value="65"></el-option>
          <el-option label="未完成" value="50"></el-option>
        </el-select>
      </el-form-item>
      </div>
      <div class="divs">
        <div>

        </div>
        <div>
             <el-button type="primary" @click="onSubmit">确定</el-button>
        </div>
      </div>
     
    </div>
  </el-form>
</template>
<script>
import {updateProductOrder} from "@/api/financing/flans";
export default {
  props:['temp'],
  data() {
    return {
      value_one: "1", //有效合同
      value_two: '50', //合同状态
      form:{

      }
    };
  },
  methods:{
    onSubmit(){
      // console.log(this.temp);
      //提交接口
      let dt = {
        pkProductOrder:this.temp.pkProductOrder,
        isValid:this.value_one,
        billState:this.value_two
      }
      this.$confirm("你是否确认如上操作?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
            this.$message({
              type: "success",
              message: "确认成功!",
            })
            updateProductOrder(dt).then((res)=>{
              
              this.$emit('closese') //回调关闭
            })
        })
      
    }
  }
};
</script>
<style  scoped>
.box {
  width: 50%;
  height: 500px;
  margin: 0 auto;
 display:flex
}
.box>div {
    display:inline-block;
    align-self:center;
     /* verticle-align:middle; */
}
.divs{
        display: flex;
        justify-content: space-between;
    }
</style>