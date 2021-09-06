<template>
  <el-dialog
    :title="title"
    :visible.sync="contentVisiable"
    @close="closeDialog"
    ref="table"
    width="92%"
  >
    <el-form
      :inline="true"
      ref="dataForm"
      size="mini"
      :model="temp"
      label-position="left"
      label-width="90px"
    >
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <el-form-item label="人员名称" prop="customerName">
            <el-input v-model="temp.customerName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="联系人姓名" prop="customerName">
            <el-input v-model="temp.customerName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="联系人电话" prop="customerTel">
            <el-input v-model="temp.customerTel" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="公司地址" prop="corpaddress">
            <el-input v-model="temp.corpaddress" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="订单状态" prop="billState">
            <el-select
              v-model="temp.billState"
              placeholder="请选择"
              :disabled="true"
            >
              <el-option
                v-for="item in billStateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="业务员" prop="pkPsndoc">
            <el-select
              v-model="temp.pkPsndoc"
              placeholder="请选择"
              :disabled="true"
            >
              <el-option
                v-for="item in psndocOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
      <br />
      <!-- <el-tabs type="border-card">
        <el-tab-pane label="收货地址">
          
        </el-tab-pane>
      </el-tabs>
      <br/> -->
      <el-tabs type="border-card">
        <el-tab-pane label="订单信息">
          <el-form-item
            label="公司收货地址"
            label-width="100px"
            prop="pkTakeover"
          >
            <el-input v-model="temp.pkTakeoverShow" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="供料方式" prop="materialSource">
            <el-select
              clearable
              v-model="temp.materialSource"
              placeholder="请选择"
              :disabled="true"
            >
              <el-option
                v-for="item in materialSourceOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="税率" prop="taxinclud">
            <el-select
              clearable
              v-model="temp.taxinclud"
              placeholder="请选择"
              :disabled="true"
            >
              <el-option
                v-for="item in taxincludOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="是否加急" prop="urgent">
            <el-select
              clearable
              v-model="temp.urgent"
              placeholder="请选择"
              :disabled="true"
            >
              <el-option
                v-for="item in urgentOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="运输方式"
            prop="transportType"
            label-width="100px"
          >
            <el-select
              clearable
              v-model="temp.transportType"
              placeholder="请选择"
              :disabled="true"
            >
              <el-option
                v-for="item in transportTypeOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="付款方式" prop="paymentType">
            <el-select
              clearable
              v-model="temp.paymentType"
              placeholder="请选择"
              :disabled="true"
            >
              <el-option
                v-for="item in paymentTypeOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
      <br />
      <el-tabs type="border-card">
        <el-tab-pane label="订单产品信息">
          <el-table
            :data="temp.billProductOrderBPoList"
            border
            :summary-method="getSummaries"
            show-summary
            style="width: 100%"
            :row-class-name="getRowClass"
          >
            <el-table-column
              prop="pkProductOrderB"
              v-if="false"
            ></el-table-column>
            <el-table-column type="expand" ref="s11">
              <template slot-scope="scope">
                <div
                  v-for="(item, index) in temp.billProductOrderBPoList[
                    scope.$index
                  ].productOrderBHPos"
                  :key="index"
                >
                  <el-form label-position="left" class="demo-table-expand">
                    <el-form-item label="">
                      <span>{{ item.processType }}</span>
                    </el-form-item>
                    <el-form-item label="">
                      <span>{{ item.modelCode }}</span>
                    </el-form-item>
                    <el-form-item label="">
                      <span>{{ item.processParam }}</span>
                    </el-form-item>
                    <el-form-item label="">
                      <span>{{ item.saleUnitTotalOut }}</span>
                    </el-form-item>
                    <el-form-item label="">
                      <span>{{
                        item.processParam * item.saleUnitTotalOut
                      }}</span>
                    </el-form-item>
                  </el-form>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="产品名称"
              prop="orderProductName"
              width="200"
            >
            </el-table-column>
            <el-table-column
              label="产品编号"
              prop="orderProductCode"
              width="150"
            >
            </el-table-column>
            <el-table-column label="数量" prop="productNum" width="80">
            </el-table-column>
            <el-table-column
              label="产品单价"
              prop="productUnitPrice"
              width="100"
            >
              <template slot-scope="scope">
                <el-input
                  size="small"
                  v-model="scope.row.productUnitPrice"
                  :disabled="true"
                ></el-input>
              </template>
            </el-table-column>
            <el-table-column
              label="产品总价"
              prop="productTotalPrice"
              width="90"
            >
              <template slot-scope="scope">
                <el-input
                  size="small"
                  v-model="scope.row.productTotalPrice"
                  :disabled="true"
                ></el-input>
              </template>
            </el-table-column>

            <!-- 	<el-table-column  label="钢网编号" prop="steelCode"  width="140" >
				<template slot-scope="scope">
					<el-input size="small" v-model="scope.row.steelCode" :disabled="true"></el-input>
				</template>	
			  
			</el-table-column>
			
			<el-table-column   label="钢网价格" prop="steelUnitPrice"  width="120">
				<template slot-scope="scope">
					<el-input size="small"  v-model="scope.row.steelUnitPrice"  :disabled="true"></el-input>
				</template>		  
			</el-table-column> -->
            <el-table-column label="税率" prop="taxinclud" width="100">
              <template slot-scope="scope">
                <el-input
                  size="small"
                  v-model="temp.taxinclud"
                  :disabled="true"
                ></el-input>
              </template>
            </el-table-column>

            <el-table-column label="描述" prop="memo" width="180">
            </el-table-column>

            <el-table-column label="操作" width="180">
              <template slot-scope="scope">
                <el-button
                  @click="lookupMateriel(scope.$index, scope.row)"
                  type="text"
                  size="small"
                  >查看物料信息</el-button
                >
                <el-button
                  v-if="title != '查看'"
                  @click="deleteSubRow(scope.$index, scope.row)"
                  type="text"
                  size="small"
                  :disabled="true"
                  >移除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <br />
        </el-tab-pane>
      </el-tabs>
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button
        v-if="title != '查看' && temp.billState == 50"
        type="primary"
        @click="counterOrder"
        >反单</el-button
      >
      <el-button @click="closeDialog">取 消</el-button>
      <el-button
        v-if="title != '查看' && temp.billState == 30"
        type="primary"
        @click="passOverOrder"
        >完成订单报价</el-button
      >
      <el-button
        v-if="title != '查看' && temp.billState == 31"
        type="primary"
        @click="signedContract"
        >签订合同</el-button
      >
    </span>

    <el-dialog
      width="80%"
      title="物料信息"
      :visible.sync="innerVisible"
      append-to-body
    >
      <el-tabs type="border-card">
        <el-tab-pane label="物料信息">
          <el-table :data="materielList" border style="width: 100%">
            <el-table-column prop="pkMateriel" v-if="false"></el-table-column>
            <el-table-column prop="pkProduct" v-if="false"></el-table-column>
            <el-table-column
              prop="pkPurchaseQuote"
              v-if="false"
            ></el-table-column>
            <el-table-column
              label="物料名称"
              prop="materialName"
              width="120"
            ></el-table-column>
            <el-table-column
              label="型号"
              prop="model"
              width="100"
            ></el-table-column>
            <el-table-column
              label="封装"
              prop="potting"
              width="100"
            ></el-table-column>
            <el-table-column
              label="规格"
              prop="norms"
              width="120"
            ></el-table-column>
            <el-table-column
              label="用量"
              prop="usageNum"
              width="80"
            ></el-table-column>
            <el-table-column
              label="位号"
              prop="placeNumber"
              width="100"
            ></el-table-column>
            <el-table-column
              label="焊点数"
              prop="weldingNumber"
              width="80"
            ></el-table-column>
            <el-table-column
              label="总用量"
              prop="usageTotal"
              width="80"
            ></el-table-column>
            <el-table-column
              label="配料数量"
              prop="batchingNumber"
              width="95"
            ></el-table-column>
            <el-table-column
              label="领料数量"
              prop="pickingNumber"
              width="90"
            ></el-table-column>
            <el-table-column
              label="退料数量"
              prop="backingNumber"
              width="90"
            ></el-table-column>
            <el-table-column
              label="品牌"
              prop="brand"
              width="150"
            ></el-table-column>
            <el-table-column
              label="备注"
              prop="memo"
              width="180"
            ></el-table-column>
            <el-table-column
              label="物料类型"
              prop="itemType"
              width="100"
            ></el-table-column>

            <el-table-column label="图片预览" prop="itemType" width="100">
              <template slot-scope="scope">
                <div class="demo-image__preview">
                  <el-image
                    style="width: 80px; height: 80px"
                    :src="scope.row.previewUrlShow"
                    :preview-src-list="scope.row.previewUrlListShow"
                  >
                  </el-image>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>

    <el-dialog
      width="40%"
      title="合同签订"
      :visible.sync="singedContractVisiable"
      append-to-body
    >
      <el-tag>预计交货日期</el-tag>
      <!-- singedContractData.scheduledtime -->
      <!-- <el-input v-model=""></el-input> -->
      <el-date-picker
        v-model="singedContractData.scheduledtime"
        type="datetime"
        value-format="yyyy-MM-dd"
        placeholder="选择交货时间"
      >
      </el-date-picker>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="signedContractSure
        ">签 订</el-button>
        <el-button @click="singedContractVisiable = false">取 消</el-button>
      </span>
    </el-dialog>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import {
  initReplaceUpdateData,
  initReplaceAddData,
  parseTime,
  randomNum,
  parseRefKeyInt,
} from "@/utils/viewCompUtil";
import {
  selectTaskoverByPkCustomer,
  selectProductByPkCustomerAsRef,
  updateProductOrder,
  updateProductOrderStateByPk,
  updateProductOrderStateOutByPk,
  insertProductReorder,
} from "@/api/orders/orders";
import { listBdPsndocAsRef } from "@/api/orgs/bdpsndoc";
import { selectPurchaseMaterielByPkProduct } from "@/api/worktools/materieltool";

export default {
  name: "Customdoccontent",
  props: ["replace", "title", "visiable", "action", "updateRow"],
  computed: {
    ...mapGetters([
      "listData",
      "columns",
      "name",
      "userid",
      "corpaddress",
      "pkPsndoc",
      "customerTel",
    ]),
  },
  data() {
    return {
      contentVisiable: false, // dialog 显示框
      innerVisible: false,
      singedContractVisiable: false, // 签订合同Dialog
      singedContractData: {
        scheduledtime: "", // 预计交货时间
        signScheduledtime  :null
      },
      uploadUrl: process.env.BASE_API + "/", // 上传地址
      zPrice: 0,
      temp: {
        pkProductOrder: undefined,
        pkPsndoc: null,
        pkCustomer: null,
        customerName: "",
        customerTel: "",
        corpaddress: "",
        pkTakeover: "",
        materialSource: "",
        taxinclud: "",
        urgent: "",
        transportType: "",
        paymentType: "",
        creator: null,
        creatorShow: "",
        creationtime: parseTime(new Date()),
        modifier: null,
        modifierShow: "",
        modifiedtime: parseTime(new Date()),
        dr: 0,
        ts: parseTime(new Date()),
        billState: 0,
        billProductOrderBPoList: [],
        productOrderBHPos: [],
      },
      // 人员信息参照
      psndocOption: [],
      takeOverList: [], // 客户收货地址信息
      customProductList: [], // 客户维护的产品信息
      billStateOptions: [
        { value: 30, label: "报价进行中" },
        { value: 31, label: "报价完成" },
      ],
      materialSourceOption: [
        // 供料方式
        { value: "0", label: "甲方提供" },
        { value: "1", label: "乙方提供" },
      ],
      yesOrNoOption: [
        { value: "是", label: "是" },
        { value: "否", label: "否" },
      ],
      taxincludOptions: [
        // 是否含税
        { value: 1, label: "不含税" },
        { value: 1.13, label: "含税" },
      ],
      urgentOption: [
        { value: "0", label: "否" },
        { value: "1", label: "料齐三天发货(费用：1000元)" },
        { value: "2", label: "料齐三天发货(费用：500元)" },
      ],
      transportTypeOption: [
        { value: "0", label: "甲方负责" },
        { value: "1", label: "乙方负责" },
      ],
      paymentTypeOption: [
        { value: "0", label: "线下付款" },
        { value: "1", label: "账户扣款" },
      ],
      materielList: [], // 产品物料数据
    };
  },
  watch: {
    visiable() {
      this.contentVisiable = this.visiable;
      this.temp = this.updateRow;
      var list = this.temp.billProductOrderBPoList;
      // console.log(list)
      var sum1 = 0;
      var sum2 = 0;
      if (list !== undefined && list.length > 0 && list !== null) {
        list.forEach((item) => {
          if (item == null) {
            sum1 = 0;
          } else {
            if (item.productTotalPrice == null) {
              sum1 = 0;
            }
            sum1 += parseInt(item.productTotalPrice);
            if (sum1 == null || sum1 == "NaN") {
              sum1 = 0;
            }
          }
        });
      }
      if (list !== undefined && list.length > 0 && list !== null) {
        list.forEach((item) => {
          if (item == null) {
            sum2 = 0;
          } else {
            if (item.steelUnitPrice == null) {
              item.steelUnitPrice = 0;
            }
            sum2 += parseInt(item.steelUnitPrice);
            if (sum2 == null || sum2 == "NaN") {
              sum2 = 0;
            }
          }
        });
      }

      let sum = 0;
      for (var i = 0; i < list.length; i++) {
        let code = list[i].productOrderBHPos;
        for (var j = 0; j < code.length; j++) {
          // console.log(code[j]);
          if (code[j] != null) {
            if (code[j].saleUnitTotalOut == null) {
              code[j].saleUnitTotalOut = 0;
            } else if (code[j].processParam == null) {
              code[j].processParam = 1;
            }
            sum += code[j].saleUnitTotalOut * code[j].processParam;
          }
        }
      }
      var zong = 0;
      zong = parseInt(sum1 + sum2 + sum).toFixed(2);
      if (zong == null || zong == "NaN") {
        zong = 0;
      }
      this.zPrice = zong;
    },
  },
  created() {
    let queryParam = { pkCustomer: this.userid };
    // 初始客户收货地址信息
    selectTaskoverByPkCustomer(queryParam).then((response) => {
      if (response.success && response.object) {
        this.takeOverList = response.object;
      }
    });

    // 初始客户产品信息
    selectProductByPkCustomerAsRef(queryParam).then((response) => {
      if (response.success && response.object) {
        this.customProductList = response.object;
      }
    });

    // 初始人员信息参照
    let psndocRefParam = { pkPsntypeName: "销售人员" };
    listBdPsndocAsRef(psndocRefParam).then((response) => {
      this.psndocOption = response.object;
      parseRefKeyInt(this.psndocOption);
    });
  },
  methods: {
    getRowClass(row, index) {
      if (
        row.row.productOrderBHPos != undefined &&
        row.row.productOrderBHPos.length > 0
      ) {
        this.$refs.s11.columnConfig.type = "expand";
        return "";
      } else {
        this.$refs.s11.columnConfig.type = "";
        return "row-expand-cover";
      }
    },
    closeDialog() {
      // 回调关闭Dialog
      this.$emit("close", null);
    },
    // 初始化界面参照信息
    initViewNeedUsedRefInfo() {
      let queryParam = { pkCustomer: this.userid };
      // 初始客户收货地址信息
      selectTaskoverByPkCustomer(queryParam).then((response) => {
        if (response.success && response.object) {
          this.takeOverList = response.object;
        }
      });

      // 初始客户产品信息
      selectProductByPkCustomerAsRef(queryParam).then((response) => {
        if (response.success && response.object) {
          this.customProductList = parseRefKeyInt(response.object);
        }
      });

      // 初始人员信息参照
      let psndocRefParam = { pkPsntypeName: "销售人员" };
      listBdPsndocAsRef(psndocRefParam).then((response) => {
        this.psndocOption = parseRefKeyInt(response.object);
      });
    },
    // 完成订单
    passOverOrder() {
      this.$confirm("是否确认完成订单报价?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          let updateParam = {
            pkProductOrder: this.temp.pkProductOrder,
            billState: 31,
          };
          updateProductOrder(updateParam).then((response) => {
            if (response.success) {
              this.$message({ type: "success", message: "已完成!" });
              this.$emit("close", null);
              this.$emit("queryListData", null);
              // location.reload();
            }
          });
          
        })
        .catch(() => {
          this.$message({ type: "info", message: "已取消!" });
        });
    },
    // 签订合同
    signedContract() {
      this.singedContractVisiable = true;
      this.singedContractData.scheduledtime = ""; // 预计交货时间预制空
      // this.singedContractData.signScheduledtime  =this.singedContractData.scheduledtime
    },
    signedContractSure() {
      this.$confirm("是否确认与客户签订合同?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(() => {
          let updateParam = {
            pkProductOrder: this.temp.pkProductOrder,
            scheduledtime: this.singedContractData.scheduledtime,
            signScheduledtime  :this.singedContractData.scheduledtime
          };

          updateProductOrderStateByPk(updateParam).then((response) => {
            if (response.success) {
              this.$message({ type: "success", message: "签订成功!" });
              this.singedContractVisiable = false;
              this.$emit("close", null);
              this.$emit("queryListData", null);
              //  location.reload();
            }
          });
         
        })
        .catch(() => {
          this.$message({ type: "info", message: "已取消!" });
        });
    },
    subBtnClick(btnCode) {
      if (btnCode === "ADD") {
        let addNewProduct = {
          pkProductOrderB: undefined,
          pkProductOrder: this.temp.pkProductOrder,
          pkProduct: null,
          productNum: null,
          memo: "",
          creator: null,
          creationtime: parseTime(new Date()),
          dr: 0,
          ts: parseTime(new Date()),
        };
        this.temp.billProductOrderBPoList.push(addNewProduct);
      }
    },
    // 删除子表数据
    deleteSubRow(index, row) {
      this.temp.billProductOrderBPoList.splice(index, 1);
      // console.log(this.temp.billProductOrderBPoList);
    },
    // 查询物料数据
    lookupMateriel(index, row) {
      let pkProduct = row.pkProduct;
      let queryForm = new FormData();
      queryForm.append("pkProduct", pkProduct);
      selectPurchaseMaterielByPkProduct(queryForm).then((response) => {
        this.innerVisible = true;
        if (response.success) {
          let materielList = response.object;
          this.initDataImageUrl(materielList);
          this.materielList = materielList;
        } else {
          this.materielList = [];
        }
      });
    },
    initDataImageUrl(dataObject) {
      if (dataObject) {
        for (let index in dataObject) {
          let dataOne = dataObject[index];
          if (dataOne && dataOne.previewUrl) {
            dataOne.previewUrlShow = this.uploadUrl + dataOne.previewUrl;
            let previewUrlList = [dataOne.previewUrlShow];
            dataOne.previewUrlList = previewUrlList;
          }
        }
      }
      return dataObject;
    },
    //反单
    counterOrder() {
      const actTemp = this.temp;
      this.$confirm("确定要反单吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          insertProductReorder(actTemp).then((response) => {
            if (response.message == "操作成功") {
              this.contentVisiable = false;
              // location.reload();
            }
          });
          
        })
        .catch(() => {});
    },
    // 自实现计算合计列中的数据
    getSummaries(param) {
      const { columns, data } = param;
      const sums = []; // 返回合计列数据
      sums[0] = "合计";
      //     sums[2] = ''
      //     sums[5] = ''
      //     sums[6] = ''
      //     // 数量合计结果
      //     let sumCountNum = 0
      //     // 产品单价计算结果
      //     let sumUnitPirce = 0
      //     // 产品总价计算结果
      //     let sumTotalPrice = 0
      //  //钢网总价计算结果
      //  let steelPrice=0
      //     columns.forEach((column, index) => {
      //       const values = data.map(item => item[column.property])
      //       if (index === 1) { // 数量
      //         values.forEach((valueOne) => {
      //           if (valueOne && !Number.isNaN(Number(valueOne))) {
      //             let valueOneNum = Number(valueOne)
      //             sumCountNum = sumCountNum + valueOneNum
      //           }
      //         })
      //       }
      //       if (index === 4) { // 产品单价
      //         values.forEach((valueOne) => {
      //           if (valueOne && !Number.isNaN(Number(valueOne))) {
      //             let valueOneNum = Number(valueOne)
      //             sumUnitPirce = sumUnitPirce + valueOneNum
      //           }
      //         })
      //       }
      //       if (index === 3) { // 产品总价
      //         values.forEach((valueOne) => {
      //           if (valueOne && !Number.isNaN(Number(valueOne))) {
      //             let valueOneNum = Number(valueOne)
      //             sumTotalPrice = sumTotalPrice + valueOneNum
      //           }
      //         })
      //       }

      // if (index === 5) { // 钢网价格
      //   values.forEach((valueOne) => {
      //     if (valueOne && !Number.isNaN(Number(valueOne))) {
      //       let valueOneNum = Number(valueOne)
      //       steelPrice = steelPrice + valueOneNum
      //     }
      //   })
      // }
      //     })
      //     sums[1] = sumCountNum
      //     sums[4] = sumUnitPirce
      //     sums[3] = sumTotalPrice
      //  sums[5] = steelPrice
      columns.forEach((item, index) => {
        if (index == 4) {
          sums[index] = 0;
          // console.log(data);
          for (var i = 0; i < data.length; i++) {
            // console.log(data[i].productTotalPric);
            if (data[i].productOrderBHPos[0] != null) {
              // console.log(data[i].productOrderBHPos);

              for (let s of data[i].productOrderBHPos) {
                s.allprice = s.processParam * s.saleUnitTotalOut;
                var allprice = s.allprice;
              }
              sums[index] += Number(data[i].productTotalPrice) + allprice;
            } else {
              //   console.log(data[i].productTotalPrice);

              sums[index] += Number(data[i].productTotalPrice);
              // var s = 0
              // 	s += data[i].productTotalPrice
              //   console.log(s);
            }
          }
        }
      });
      // sums[8] =this.zPrice
      return sums;
    },
    restTemp() {
      // 刷新本界面的数据
      this.temp = {
        pkProductOrder: undefined,
        pkPsndoc: this.pkPsndoc,
        pkCustomer: this.userid,
        customerName: this.name,
        customerTel: this.customerTel,
        corpaddress: this.corpaddress,
        pkTakeover: "",
        materialSource: "",
        taxinclud: "",
        urgent: "",
        transportType: "",
        paymentType: "",
        creator: null,
        creatorShow: "",
        creationtime: parseTime(new Date()),
        modifier: null,
        modifierShow: "",
        modifiedtime: parseTime(new Date()),
        dr: 0,
        ts: parseTime(new Date()),
        billState: 0,
        billProductOrderBPoList: [],
      };
    },
  },
};
</script>
<style>
.demo-table-expand {
  font-size: 0;
  display: flex;
}
.demo-table-expand label {
  width: 80px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: -19%;
  margin-bottom: 0;
  width: 30%;
}
</style>
<style  lang="scss" type="text/scss" scoped>
.el-select /deep/ .el-input__inner {
  width: 190px;
}
.el-input /deep/ .el-input__inner {
  width: 190px;
}
.el-table td,
.el-table /deep/ th {
  padding: 5px 0;
}

/deep/ .el-table .row-expand-cover .el-table__expand-column .el-icon {
  visibility: hidden;
}
</style>
