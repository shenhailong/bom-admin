<template>
  <el-dialog
    :title="title"
    :visible.sync="contentVisiable"
    @close="closeDialog"
    width="60%"
  >
    <el-form
      :inline="true"
      ref="dataForm"
      :model="temp"
      label-position="left"
      label-width="120px"
    >
      <el-form-item label="关联订单产品" prop="pkProductOrderB">
        <el-select v-model="temp.pkProductOrderB" placeholder="请选择">
          <el-option
            v-for="item in orderBProductSelOptions"
            :key="item.pkProductOrderB"
            :label="`${item.pkProductOrderB}-${item.name}-${item.code}`"
            :value="item.pkProductOrderB"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="排序" prop="sort">
        <el-input v-model="temp.sort"></el-input>
      </el-form-item>
      <el-form-item label="单据状态" prop="billState">
        <el-input v-model="temp.billState" :disabled="true"></el-input>
      </el-form-item>
      <!--  <el-form-item label="未税单价" prop="unitPrice">
	    <el-input v-model="temp.unitPrice"  @input='sumPrice'></el-input>
	  </el-form-item>
		<el-form-item label="未税合计" prop="totalPrices">
		  <el-input v-model="temp.totalPrices" :disabled="true"></el-input>
		</el-form-item>	 -->
      <el-form-item label="创建人" prop="creatorShow">
        <el-input v-model="temp.creatorShow" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="创建时间" prop="creationtime">
        <el-input v-model="temp.creationtime" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="物料需求日期" prop="materialTime">
        <el-date-picker
          v-model="temp.materialTime"
          type="datetime"
          value-format="yyyy-MM-dd HH:mm"
          placeholder="物料需求日期"
        >
        </el-date-picker>
      </el-form-item>
      <!-- <el-form-item label="预计齐料时间" prop="estimatedOverTime">
	  		 <el-date-picker
	  		      v-model="temp.estimatedOverTime"
	  		      type="datetime"
	  			  value-format="yyyy-MM-dd HH:mm"
	  		      placeholder="预计齐料时间">
	  		    </el-date-picker>
	  </el-form-item> -->
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="sureDialog">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import {
  initReplaceUpdateData,
  initReplaceAddData,
  parseTime,
  randomNum,
} from "@/utils/viewCompUtil";
import { selectOrderInfoAsRef } from "@/api/orderCompMage/orderCompMage";
import { updateOrderPlan } from "@/api/orderCompMage/OrderPlan";
import Tinymce from "@/components/Tinymce";

export default {
  name: "ProductionFlowOrderPlanContent",
  props: [
    "replace",
    "title",
    "visiable",
    "action",
    "updateRow",
    "pkProductOrder",
  ],
  computed: {
    ...mapGetters(["listData", "columns", "name"]),
  },
  data() {
    return {
      contentVisiable: false, // dialog 显示框
      orderBProductSelOptions: [
        // 选择关联订单字表数据
      ],
      temp: {
        pkOmgOrderPlan: undefined,
        pkProductOrderB: null,
        sort: null,
        billState: "",
        creator: "",
        unitPrice: "",
        totalPrices: "",
        materialTime: "", //物料需求日期
        estimatedOverTime: "", //预计齐料时间
        creatorShow: this.name,
        creationtime: parseTime(new Date()),
        dr: 0,
        ts: parseTime(new Date()),
      },
    };
  },
  watch: {
    visiable() {
      this.contentVisiable = this.visiable;
      if (this.title === "录入") {
        this.restTemp();
      }
      if (this.title === "修改" && this.updateRow) {
        this.temp = this.updateRow;
      }
      if (this.visiable === true) {
        // 每次打开重新加载当前选择订单的字表数据信息
        // this.initOrderBProductListInfo()
        if (this.updateRow) {
          this.orderBProductSelOptions = [
            {
              pkProductOrderB: this.updateRow.pkProductOrderB,
              name: this.updateRow.productName,
              code: this.updateRow.productCode,
            },
          ];
        }
      }
    },
  },
  methods: {
    closeDialog() {
      // 回调关闭Dialog
      this.$emit("close", null);
    },
    // 加载当前选择订单的字表数据信息
    initOrderBProductListInfo() {
      if (this.pkProductOrder) {
        let initQueryParam = {
          pkProductOrder: this.pkProductOrder,
        };
        selectOrderInfoAsRef(initQueryParam).then((response) => {
          if (response && response.success && response.object) {
            this.orderBProductSelOptions =
              response.object[0].orderCompMageProductPoList;
          } else {
            this.orderBProductSelOptions = [];
          }
        });
      }
    },
    sureDialog() {
      // 确定保存回调Dialog
      const actTemp = this.temp;
      // console.log(actTemp);

      // let acc={pkProductOrderB:this.temp.pkProductOrderB,billState:this.temp.billState,sort:this.temp.sort,creatorShow:this.temp.creatorShow,creationtime:this.temp.creationtime,
      //  materialTime:this.temp.materialTime,ts:this.temp.ts
      //  }
      // if (this.action) {
      //   initReplaceUpdateData(actTemp,this.replace)
      //   this.action(actTemp).then((response) => {
      //     if (response.primary) {
      //       actTemp.pkOmgOrderPlan = response.primary
      //     }
      //     if (response.success) {
      //       initReplaceAddData(actTemp, this.replace)
      //       this.$store.commit('HANDLE_LISTVIEW_DATA', actTemp)
      //       this.$message({ message: '操作成功', type: 'success' })

      //       // 预置一遍订单合同主键
      //       actTemp.pkProductOrder = this.pkProductOrder
      //       this.$emit('close', actTemp)
      //     } else {
      //       this.$message({ message: `操作失败:${response.message}`, type: 'error' })
      //     }
      //   })
      // }
      let acc = {
        pkOmgOrderPlan: this.temp.pkOmgOrderPlan,
        materialTime: this.temp.materialTime,
      };

      this.$confirm("是否确认修改?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "修改成功!",
          });
          updateOrderPlan(acc).then((response) => {
            this.$emit("close", null);
          // location.reload();
            // console.log(response);
            if (response.message == "操作成功") {
            }
          });
          
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改",
          });
        });
      //  this.$message({message:'修改成功'})
      //  this.$emit('close',null)

      // this.$emit("close", actTemp);
    },
    restTemp() {
      // 刷新本界面的数据
      this.temp = {
        pkOmgOrderPlan: undefined,
        pkProductOrderB: null,
        sort: null,
        billState: "",
        creator: "",
        unitPrice: "",
        totalPrices: "",
        materialTime: "", //物料需求日期
        estimatedOverTime: "", //预计齐料时间
        creatorShow: this.name,
        creationtime: parseTime(new Date()),
        dr: 0,
        ts: parseTime(new Date()),
      };
    },
  },
};
</script>



<style  lang="scss" type="text/scss" scoped>
.el-select /deep/ .el-input__inner {
  width: 190px;
}
.el-input /deep/ .el-input__inner {
  width: 190px;
}
</style>

