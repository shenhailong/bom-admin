<template>
    <div class="pps">
        <h3>订单详情</h3>
        <hr>
        <br>
        <table style="text-align:center" >
            <thead>
                <tr style="color:red" >
                    <td>序号</td>
                    <td>合同编号</td>
                    <td>客户编号</td>
                    <td>预计交货日期</td>
                    <td>剩余日期</td>
                    <td>订单进度</td>
                    <td>进度流程</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>1</td>
                    <td>SD21-001</td>
                    <td>KH1231231</td>
                    <td>2021-09-01</td>
                    <td>90</td>
                    <td>工艺进度</td>
                    <td>
            <el-badge :value="12" class="item" >
             
                  <i class="el-icon-collection"></i>
           
            </el-badge>
          </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" type="text/scss" scoped>
*{margin: 0;padding: 0;}
.pps {
  padding-bottom: 40px;
  height: 500px;
  background: #fff;
  border-radius: 20px;
  margin-top: 20px;
  h3 {
    margin: 0px 0px 0px 30px;
    padding: 20px 0 10px 0;
  }
  h5 {
    text-align: center;
  }
}
table{
    width: 100%;
}
// tr{
//     display: flex;
//     justify-content: space-around;
// }
li{
    list-style: none;
}
</style>