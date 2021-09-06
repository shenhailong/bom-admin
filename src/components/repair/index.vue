<template>
  <div class="app">
    <!--返修产品添加列表 -->
    <orderscon :show="show" :pkid="pkid" @close="closed" @closes="closes"  />
    <!-- 图片添加页面 -->
    <images  :ishow='ishow' :pkProductOrderB='pkProductOrderB' @close='minClose' />
    <el-dialog
      :title="cons.title"
      :visible.sync="cons.visiable"
      @close="closeDialog"
      width="88%"
    >
      <el-form
        ref="form"
        :model="form"
        size="mini"
        label-width="90px"
        :rules="rules"
      >
        <el-tabs type="border-card">
          <el-tab-pane label="基本信息" width="100%">
            <div class="form">
              <el-form-item label="客户编号" prop="name">
                <el-input v-model="customerCode" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="产品编号" prop="name">
                <el-select v-model="pkid" placeholder="请选择" :disabled="true">
                  <!-- {{codes}} -->
                  <el-option
                    v-for="(item, index) in codes"
                    :key="index"
                    :label="item.code"
                    :value="item.pkProduct"
                    @click.native="linkcode(index)"
                  ></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="产品名称" prop="name">
                <el-input v-model="name" :disabled="true"></el-input>
              </el-form-item>
              <el-form-item label="返修数量" prop="repairNum">
                <el-input
                  v-model="form.repairNum"
                  type="number"
                  :disabled="cons.type == 1 || cons.type == 2"
                ></el-input>
              </el-form-item>
            </div>
            <div class="form">
              <el-form-item label="快递方式" prop="transportType">
                <el-select 
                :width='0'
                class="selct"
                  v-model="form.transportType"
                  placeholder="请选择"
                  :disabled="cons.type == 1 || cons.type == 2"
                >
                  <!-- {{codes}} -->
                  <el-option label="自提" value="1"></el-option>
                  <el-option label="快递" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="快递单号" prop="transpostNo">
                <el-input
                  v-model="form.transpostNo"
                  :disabled="cons.type == 1 || cons.type == 2"
                ></el-input>
              </el-form-item>
              <br />
              <el-form-item label="备注" prop="note">
                <el-input
                  v-model="form.note"
                  :disabled="cons.type == 1 || cons.type == 2"
                ></el-input>
              </el-form-item>
              <el-form-item label="创建时间" prop="creationtime">
                <el-input v-model="form.creationtime" disabled=""></el-input>
              </el-form-item>
            </div>
            <div class="form">
              <!-- realityNum -->
              <el-form-item label="实际数量" prop="realityNum">
                <el-input
                  v-model="form.realityNum"
                  :disabled="cons.type == 2"
                ></el-input>
              </el-form-item >
                <el-form-item label="工价" v-if='cons.type ==3' >
                <el-input
                  v-model="form.labourCost "
                  
                ></el-input>
              </el-form-item>
               <el-form-item label="工时" v-if='cons.type ==3' >
                <el-input
                  v-model="form.manHour"
                ></el-input>
              </el-form-item>
            </div>
          </el-tab-pane>
        </el-tabs>
        <br />
        <el-tabs type="border-card">
          <el-tab-pane label="技术分析" class="form" width="100%">
          </el-tab-pane>
          <div>
            <el-table :data="tableData" style="width: 100%">
              <!-- contractNo -->
              <el-table-column prop="contractNo" label="合同编号" width="100">
              </el-table-column>
              <el-table-column prop="pkid" label="产品号" width="100">
              </el-table-column>
              <el-table-column prop="serialNum" label="产品序列号" width="120">
                <template slot-scope="scope">
                  <el-input
                    :disabled="cons.type == 1 "
                    v-model="tableData[scope.$index].serialNum"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="defectNote" label="不良现象" width="180">
                <template slot-scope="scope">
                  <el-input
                  type="textarea"
                    :disabled="cons.type == 1"
                    v-model="tableData[scope.$index].defectNote"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="reasonAnalysis" label="初步原因分析">
                <template slot-scope="scope">
                  <el-input
                  type="textarea"
                    v-model="tableData[scope.$index].reasonAnalysis"
                  ></el-input>
                </template>
              </el-table-column>
              <el-table-column prop="serviceLog" label="维修日志" v-if="cons.type ==3">
                <template slot-scope="scope">
                  <el-input

                  type="textarea"
                    
                    v-model="tableData[scope.$index].serviceLog"
                  ></el-input>
                </template>
              </el-table-column>
              
               <el-table-column prop="isPeriod" label="是否在报">
                <template slot-scope="scope">
                  <el-select
                    class="selct"
                    
                    v-model="tableData[scope.$index].isPeriod"
                    placeholder="请选择"
                  >
                    <el-option label="自由态" value="0"></el-option>
                    <el-option label="在保" value="1"></el-option>
                    <el-option label="脱保" value="2"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <!-- <el-table-column prop="repairState" label="状态">
                <template slot-scope="scope">
                 
                  <el-select
                    v-model="tableData[scope.$index].repairState"
                    placeholder="请选择"
                    
                  >
                    <el-option label="自由态" :value="0"></el-option>
                    <el-option label="入库中" :value="1"></el-option>
                    <el-option label="入库完成" :value="2"></el-option>
                  </el-select>
                </template>
              </el-table-column> -->
              <!-- <el-table-column
                prop="confirm"
                label="确认在报"
                v-if="cons.type == 2"
              >
                <template slot-scope="scope">
                  <el-select
                    v-model="tableData[scope.$index].confirm"
                    placeholder="请选择"
                  >
                    <el-option label="自由态" :value="0"></el-option>
                    <el-option label="在保" :value="1"></el-option>
                    <el-option label="脱保" :value="2"></el-option>
                  </el-select>
                </template>
              </el-table-column> -->
              <el-table-column
                prop="isService"
                label="可否维修"
                v-if="cons.type == 2"
              >
                <template slot-scope="scope">
                  <el-select
                    v-model="tableData[scope.$index].isService"
                    placeholder="请选择"
                  >
                    <el-option label="自由态" :value="0"></el-option>
                    <el-option label="可以" :value="1"></el-option>
                    <el-option label="不可以" :value="2"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <!-- isService -->
             <el-table-column
                prop="isQuality"
                label="是否合格"
                v-if="cons.type == 4"
              >
                <template slot-scope="scope">
                  <el-select
                    v-model="tableData[scope.$index].isQuality"
                    placeholder="请选择"
                  >
                    <el-option label="自由态" :value="0"></el-option>
                    <el-option label="合格" :value="1"></el-option>
                    <el-option label="不合格" :value="2"></el-option>
                  </el-select>
                </template>
              </el-table-column>
              <!-- serviceLog -->
              <el-table-column fixed="right" label="操作" width="100">
                <template slot-scope="scope">
                  <el-button
                    v-if=" cons.type == 2"
                   icon="el-icon-picture"
                    type="text"
                    size="small"
                    @click="imgclk(scope.$index)"
                    ></el-button
                  >
                  <el-button icon="el-icon-check" v-if="scope.row.repairState !=1 "  @click="handleClick(scope.row,2)" type="text"></el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-tabs>
      </el-form>
      <div>
        <!-- {{cons.type}} -->
        <el-button type="primary" v-if="cons.type != 10"  @click="submitForm"  >立即创建</el-button>
        <el-button @click="isshow">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import orderscon from "./item/input"; //添加页面
import { listOrderProduct } from "@/api/product/product";
import images from './item/images'
import { updateRepairOrder,updateRepairOrderB } from "@/api/rapir/rapir";
export default {
  props: ["content"],
  components: { orderscon ,images},
  watch: {
    //content 为数据变化执行录入所需的数据
    content: {
      deep: true,
      handler(newValue, oldValue) {
        // console.log(newValue);
        this.cons = newValue;
        let arr = [1,2,3,4,5,10]
        if (arr.includes(this.cons.type)) {
          this.tableData = this.cons.bindData.billRepairOrderBPoList;
          this.customerCode = this.cons.bindData.customerCode;
          this.form = this.cons.bindData;
          this.pkid = this.cons.bindData.productCode;
          this.name = this.cons.bindData.productName;
          for (let i of this.tableData) {
            i.pkid = this.pkid;
          }
        }
      },
    },
  },
  data() {
    return {
      cons: {}, // 接收数据变更的内容
      form: {
        pkProduct: null,
        pkCustomer: null,
        repairNum: 0,
        repairNo: null,
        transpostNo: null,
        creationtime: null,
        transportType: "1",
        billRepairOrderBPoList: [],
      },
      pkProductOrderB:null,
      ishow:false,
      btnshow:true,
      name: null, //
      customerCode: null,
      pkid: null,
      show: false,
      codes: [],
      orderProductInfo: {
        // 参照新建选择产品信息
        visiable: false,
      },
      tableData: [],
      rules: {
        // name: [
        //   { required: true, message: "请输入活动名称", trigger: "blur" },
        //   // { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        // ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
      },
    };
  },

  methods: {
    closeDialog() {},
    closes(con) {
      this.show = false;
    },
    minClose(){
      this.ishow = false
    },
    imgclk(index){
      this.ishow = true
      // console.log(this.tableData[index].pkRepairOrderB);
      this.pkProductOrderB = this.tableData[index].pkRepairOrderB
    },
    closed(con) {
      this.tableData = con;
      this.show = false;
    },
    tj() {
      if (this.pkid == null) {
        this.$message.error("检查产品选择");
      } else {
        this.show = !this.show;
      }

      //  console.log(this.form.code);
    },
    isshow() {
      this.$emit("close");
    },
     handleClick(row,num) {
        // console.log(row);
       
        this.$confirm("此操作将永久修改信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "成功!",
          });
          if(num == 2){
            let jsons = {
              pkProductOrderB: row.pkProductOrderB,
                pkRepairOrderB: row.pkRepairOrderB,
                repairState:1
            }
            updateRepairOrderB(jsons)
          }else{
            updateRepairOrderB(row)
          }
           
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
      },
    dateFormat(dateData) {
      //对日期进行的处理
      var date = new Date(dateData);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      const time = y + "-" + m + "-" + d;
      return time;
    },
    linkcode(index) {
      // console.log(index);
      // console.log(this.codes[index]);
      this.name = this.codes[index].name;
      this.form.pkProduct = this.codes[index].pkProduct;
    },
    initOrderProductListInfo() {},
    submitForm(formName) {
      // console.log(this.form);
      // console.log(this.tableData);
      let jsons = {
        pkCustomer: this.form.pkCustomer,
        pkProduct: this.form.pkProduct,
        repairNum: this.form.repairNum,
        repairNo: this.form.repairNo,
        labourCost :this.form.labourCost ,
        manHour:this.form.manHour,
        transpostNo: this.form.transpostNo,
        creationtime: this.form.creationtime,
        pkRepairOrder: this.form.pkRepairOrder,
        transportType: "1",
        billRepairOrderBPoList:this.tableData,
        realityNum: this.form.realityNum,
      };
      this.$confirm("此操作将永久修改信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "成功!",
          });
          updateRepairOrder(jsons).then((res) => {
            this.$emit("close");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },
  },
};
</script>
<style lang="scss" type="text/scss" scoped>
.form {
  display: flex;
}
/deep/.form .el-input__inner{
  width: 200px;
  padding: 0;
}
/deep/.el-form-item__label {
  width: 80px;
}
/deep/.selct{
  padding: 0;
}
</style>