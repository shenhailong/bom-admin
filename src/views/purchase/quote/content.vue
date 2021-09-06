<template>
  <el-dialog
    :title="title"
    :visible.sync="contentVisiable"
    @close="closeDialog"
    width="88%"
  >
    <el-form
      :inline="true"
      ref="dataForm"
      :model="temp"
      :rules="rules"
      size="mini"
      label-position="left"
      label-width="89px"
    >
      <!--基本信息-->
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <el-form-item label="客户编号" prop="customerCode">
            <el-input
              v-model="temp.customerCode"
              placeholder="请输入客户编号"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="产品编号" prop="productCode">
            <el-input
              v-model="temp.productCode"
              placeholder="请输入产品编号"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="产品名称" prop="productName">
            <el-input
              v-model="temp.productName"
              placeholder="请输入产品名称"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="产品型号" prop="productModel">
            <el-input
              v-model="temp.productModel"
              placeholder="请输入产品型号"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="订单数量" prop="productNum">
            <el-input
              v-model="temp.productNum"
              placeholder="请输入订单数量"
              :disabled="true"
            ></el-input>
          </el-form-item>

          <el-form-item label="物料来源" prop="productMaterialSource">
            <el-select
              v-model="temp.productMaterialSource"
              placeholder="请选择物料来源"
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

          <!-- 产品类别 -->
          <el-form-item label="产品类别" prop="productType">
            <el-select
              @change="productSelct"
              v-model="temp.productType"
              placeholder="请选择产品类别"
              :disabled="true"
            >
              <el-option
                v-for="item in technicsStateOprion1"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="物料类别"
            prop="matterType"
            v-if="this.temp.productType == 4"
          >
            <el-select v-model="temp.matterType" placeholder="请选择产品类别">
              <el-option
                v-for="item in matterStateOprion"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="钢网来源" prop="productSteelMeshSource">
            <el-select
              v-model="temp.productSteelMeshSource"
              placeholder="请选择钢网来源"
              :disabled="true"
            >
              <el-option
                v-for="item in steelMeshSourceOption"
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
              placeholder="请选择业务员"
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
      <!-- 物料下单 -->
      <br />
      <el-tabs
        type="border-card"
        v-if="this.temp.productType == 4 && this.temp.matterType == '1'"
      >
        <el-tab-pane label="物料下单">
          <el-form-item label="封装" prop="encapsulation">
            <el-input
              v-model="temp.encapsulation"
              placeholder="请输入封装"
            ></el-input>
          </el-form-item>
          <el-form-item label="品牌" prop="brand">
            <el-input v-model="temp.brand" placeholder="请输入品牌"></el-input>
          </el-form-item>
          <el-form-item label="说明" prop="explains">
            <el-input
              v-model="temp.explains"
              placeholder="请输入说明"
            ></el-input>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
      <!-- /////////////////////////////////////////////////////// -->
      <br />
      <!--PCB参数-->
      <el-tabs
        type="border-card"
        v-if="
          this.temp.productType == 2 ||
          this.temp.productType == 3 ||
          (this.temp.productType == 4 && this.temp.matterType == '0')
        "
      >
        <el-tab-pane label="PCB参数">
          <el-form-item label="长" prop="pcbLong">
            <el-input
              v-model="temp.pcbLong"
              :max="9999"
              label="请输入长"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="宽" prop="pcbWide">
            <el-input
              v-model="temp.pcbWide"
              :max="9999"
              label="请输入宽"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item label="PCB来源" prop="pcbSource">
            <el-select
              v-model="temp.pcbSource"
              placeholder="请选择PCB来源"
              :disabled="true"
            >
              <el-option
                v-for="item in steelMeshSourceOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="板子厚度" prop="pcbThick">
            <el-select
              v-model="temp.pcbThick"
              placeholder="请选择板子厚度"
              :disabled="true"
            >
              <el-option
                v-for="item in pcbThickOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="阻焊颜色" prop="pcbResistColor">
            <el-select
              v-model="temp.pcbResistColor"
              placeholder="请选择阻焊颜色"
              :disabled="true"
            >
              <el-option
                v-for="item in pcbResistColorOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="字符颜色" prop="pcbCharColor">
            <el-select
              v-model="temp.pcbCharColor"
              placeholder="请选择字符颜色"
              :disabled="true"
            >
              <el-option
                v-for="item in pcbCharColorOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="阻焊覆盖" prop="pcbResistCover">
            <el-select
              v-model="temp.pcbResistCover"
              placeholder="请选择阻焊覆盖"
              :disabled="true"
            >
              <el-option
                v-for="item in pcbResistCoverOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="焊盘喷镀" prop="pcbPadSpary">
            <el-select
              v-model="temp.pcbPadSpary"
              placeholder="请选择焊盘喷镀"
              :disabled="true"
            >
              <el-option
                v-for="item in pcbPadSparyOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="铜厚" prop="pcbCopperThick">
            <el-select
              v-model="temp.pcbCopperThick"
              placeholder="请选择铜厚"
              :disabled="true"
            >
              <el-option
                v-for="item in pcbCopperThick"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="板材品牌" prop="pcbBoardBrand">
            <el-select
              v-model="temp.pcbBoardBrand"
              placeholder="请选择板材品牌"
              :disabled="true"
            >
              <el-option
                v-for="item in pcbBoardBrandOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="FR-4 TG值" prop="pcbFrTg">
            <el-select
              v-model="temp.pcbFrTg"
              placeholder="请选择FR-4 TG值"
              :disabled="true"
            >
              <el-option
                v-for="item in pcbFrTgOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="最小孔径" prop="pcbMinHole">
            <el-select
              v-model="temp.pcbMinHole"
              placeholder="请选择最小孔径"
              :disabled="true"
            >
              <el-option
                v-for="item in pcbMinHoleOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="阻抗" prop="pcbImpedance">
            <el-select
              v-model="temp.pcbImpedance"
              placeholder="请选择阻抗"
              :disabled="true"
            >
              <el-option
                v-for="item in pcbImpedanceOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="板子层数" prop="pcbFloors">
            <el-input
              v-model="temp.pcbFloors"
              label="请输入层"
              :disabled="true"
            ></el-input>
          </el-form-item>

          <el-form-item label="树脂塞孔" prop="pcbResinPlugHole">
            <el-select
              v-model="temp.pcbResinPlugHole"
              placeholder="请选择树脂塞孔"
              :disabled="true"
            >
              <el-option
                v-for="item in needOrNotNeed"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="金(锡)手指倒斜边"
            prop="pcbHypotenuse"
            label-width="130px"
          >
            <el-select
              v-model="temp.pcbHypotenuse"
              placeholder="请选择金(锡)手指倒斜边"
              :disabled="true"
            >
              <el-option
                v-for="item in needOrNotNeed"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="PCB备注" prop="pcbNote">
            <el-input v-model="temp.pcbNote" placeholder="pcb备注"></el-input>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
      <!--附件管理Controller-->
      <br />
      <el-tabs
        type="border-card"
        v-if="
          this.temp.productType == 1 ||
          this.temp.productType == 2 ||
          this.temp.productType == 3 ||
          (this.temp.productType == 4 && this.temp.matterType == '0') ||
          (this.temp.productType == 4 && this.temp.matterType == '1')
        "
      >
        <el-tab-pane label="附件上传">
          <!--BOM、PCB、工艺文件下载-->
          <!--BOM文件-->
          <el-col
            :span="6"
            v-if="
              this.temp.productType == 1 ||
              this.temp.productType == 2 ||
              this.temp.productType == 3 ||
              (this.temp.productType == 4 && this.temp.matterType == '1')
            "
          >
            <el-upload
              drag
              class="upload-demo"
              ref="BOMUpload"
              :action="uploadUrl"
              :file-list="BOMFileList"
              :on-preview="downloadProccessFile"
              :limit="1"
              :auto-upload="false"
              :disabled="true"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text"><span>BOM文件</span></div>
            </el-upload>
          </el-col>
          <!--PCB文件-->
          <el-col
            :span="6"
            v-if="
              this.temp.productType == 1 ||
              this.temp.productType == 2 ||
              this.temp.productType == 3 ||
              (this.temp.productType == 4 && this.temp.matterType == '0')
            "
          >
            <el-upload
              drag
              class="upload-demo"
              ref="BOMUpload"
              :action="uploadUrl"
              :file-list="PCBFileList"
              :on-preview="downloadProccessFile"
              :limit="1"
              :auto-upload="false"
              :disabled="true"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text"><span>PCB文件</span></div>
            </el-upload>
          </el-col>
          <!--工艺文件-->
          <el-col
            :span="6"
            v-if="
              this.temp.productType == 1 ||
              this.temp.productType == 2 ||
              this.temp.productType == 3 ||
              (this.temp.productType == 4 && this.temp.matterType == '0')
            "
          >
            <el-upload
              drag
              class="upload-demo"
              ref="BOMUpload"
              :action="uploadUrl"
              :file-list="GONGYIFileList"
              :on-preview="downloadProccessFile"
              :limit="1"
              :auto-upload="false"
              :disabled="true"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text"><span>工艺文件</span></div>
            </el-upload>
          </el-col>
          <span class="demo1">
            <el-col :span="6">
              <el-upload
                drag
                class="upload-demo"
                ref="BOMUpload"
                :action="uploadUrl"
                :file-list="PURFileList"
                :limit="1"
                :on-exceed="handleExceed"
                :on-change="PURFileChange"
                :before-remove="PURFileRemove"
                :on-preview="downloadProccessFile"
                :auto-upload="false"
                :disabled="title == '查看'"
              >
                <!--  -->
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  <span>采购报价文件</span><em>点击上传</em>
                </div>
                <!-- <div class="el-upload__tip" slot="tip">
	  		  1: 上传文件大小不得超过200M
	  		</div> -->
              </el-upload>
            </el-col>
          </span>
        </el-tab-pane>
      </el-tabs>
      <br />
      <el-tabs type="border-card" v-if="this.temp.isSteel == '1'">
        <el-tab-pane label="钢网文件">
          <el-upload
            drag
            class="upload-demo"
            ref="STEELUpload"
            :action="uploadUrl"
            :file-list="STEELFileList"
            :limit="1"
            :on-exceed="handleExceed"
            :on-change="STEELFileChange"
            :before-remove="STEELFileRemove"
            :on-preview="downloadProccessFile"
            :auto-upload="false"
            :disabled="title == '查看'"
          >
            <!--  -->
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              <span>钢网文件</span><em>点击上传</em>
            </div>
            <!-- <div class="el-upload__tip" slot="tip">
	  			  1: 上传文件大小不得超过200M
	  			</div> -->
          </el-upload>
        </el-tab-pane>
      </el-tabs>
      <br />
      <el-tabs type="border-card">
        <el-tab-pane label="报价信息">
          <el-form-item
            label="报价有效日期"
            prop="quoteEndDate"
            label-width="110px"
          >
            <el-date-picker
              v-model="temp.quoteEndDate"
              type="date"
              placeholder="选择日期"
              @change="dateFormat()"
              :disabled="title != '采购报价'"
            ></el-date-picker>
          </el-form-item>
          <el-form-item
            label="物料合计单价"
            prop="singlePrice"
            label-width="110px"
            style="margin-left: -60px"
          >
            <el-input
              v-model="temp.singlePrice"
              
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="物料合计总价"
            prop="zongPrice"
            label-width="110px"
          >
            <el-input
              v-model="temp.zongPrice"
              
              :disabled="true"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="物料成本单价"
            prop="purchasePrice"
            label-width="110px"
          >
            <el-input
              v-model="temp.purchasePrice"
              @keyup.native="temp.purchasePrice = oninput(temp.purchasePrice)"
              @change="priceCount('single')"
              placeholder="未税单价"
              :disabled="title != '采购报价'"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="物料成本总价"
            prop="purchaseTotal"
            label-width="110px"
          >
            <el-input
              v-model="temp.purchaseTotal"
              @keyup.native="temp.purchaseTotal = oninput(temp.purchaseTotal)"
              @change="priceCount('sum')"
              placeholder="未税总价"
              :disabled="title != '采购报价'"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="PCB成本单价"
            prop="productPcbPrice"
            label-width="110px"
          >
            <el-input
              v-model="temp.productPcbPrice"
              @keyup.native="
                temp.productPcbPrice = oninput(temp.productPcbPrice)
              "
              @change="pcbPriceCount('single')"
              placeholder="请输入PCB成本单价"
            ></el-input>
          </el-form-item>

          <el-form-item
            label="PCB成本总价"
            prop="productPcbTotal"
            label-width="110px"
          >
            <el-input
              v-model="temp.productPcbTotal"
              @keyup.native="
                temp.productPcbTotal = oninput(temp.productPcbTotal)
              "
              @change="pcbPriceCount('sum')"
              placeholder="请输入PCB成本总价"
            ></el-input>
          </el-form-item>
          <span v-if="this.temp.isSteel == '1'">
            <el-form-item
              label="采购钢网价格"
              prop="steelPrice"
              label-width="110px"
            >
              <el-input
                v-model="temp.steelPrice"
                @keyup.native="temp.steelPrice = oninput(temp.steelPrice)"
                placeholder="请输入采购钢网价格"
              ></el-input>
            </el-form-item>
          </span>
        </el-tab-pane>
      </el-tabs>
      <br />
      <el-form-item
        label="物料信息"
        prop="showMaterielData"
        label-width="200px"
      >
        <el-switch v-model="showMaterielData"></el-switch>
      </el-form-item>
      <el-tabs type="border-card" v-if="showMaterielData">
        <el-tab-pane label="物料信息">
          <el-table :data="temp.materielPoList" border style="width: 100%">
            <el-table-column prop="pkMateriel" v-if="false"></el-table-column>
            <el-table-column prop="pkProduct" v-if="false"></el-table-column>
            <el-table-column
              prop="pkPurchaseQuote"
              v-if="false"
            ></el-table-column>
            <el-table-column
              label="序号"
              prop="rowNum"
              width="120"
            ></el-table-column>
            <el-table-column
              label="物料类型"
              prop="itemType"
              width="120"
            ></el-table-column>
            <el-table-column
              label="型号"
              prop="model"
              width="120"
            ></el-table-column>
            <el-table-column
              label="物料名称"
              prop="materialName"
              width="120"
            ></el-table-column>
            <el-table-column
              label="存货全名"
              prop="materialFullname"
              width="120"
            ></el-table-column>
            <el-table-column
              label="存货型号"
              prop="potting"
              width="120"
            ></el-table-column>
            <el-table-column
              label="存货规格"
              prop="norms"
              width="120"
            ></el-table-column>
            <el-table-column
              label="位号"
              prop="placeNumber"
              width="120"
            ></el-table-column>
            <el-table-column
              label="焊点数"
              prop="weldingNumber"
              width="120"
            ></el-table-column>
            <el-table-column
              label="备注"
              prop="memo"
              width="120"
            ></el-table-column>
            <el-table-column
              label="品牌"
              prop="brand"
              width="120"
            ></el-table-column>
            <el-table-column
              label="单位"
              prop="usegUnit"
              width="120"
            ></el-table-column>
            <el-table-column
              label="用量"
              prop="usageNum"
              width="120"
            ></el-table-column>
            <el-table-column
              label="总用量"
              prop="usageTotal"
              width="120"
            ></el-table-column>
            <el-table-column
              label="配料数量"
              prop="batchingNumber"
              width="120"
            ></el-table-column>
            <el-table-column
              label="领料数量"
              prop="pickingNumber"
              width="120"
            ></el-table-column>
            <el-table-column
              label="退料数量"
              prop="backingNumber"
              width="120"
            ></el-table-column>
            <el-table-column
              label="采购单价"
              prop="purchaseUnitPrice"
              width="120"
            ></el-table-column>
            <el-table-column
              label="采购总价"
              prop="purchaseTotalPrice"
              width="120"
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

      <!--单据信息-->
      <br />
      <!-- <el-tabs type="border-card">
        <el-tab-pane label="单据信息">

          <el-form-item label="单据状态" prop="billState">
            <el-select v-model="temp.billState" placeholder="请选择" :disabled="true">
              <el-option
                v-for="item in billStateOprion"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="审批人" prop="approverShow">
            <el-input v-model="temp.approverShow" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="审批时间" prop="approvetime">
            <el-input v-model="temp.approvetime" :disabled="true"></el-input>
          </el-form-item>
        </el-tab-pane>
      </el-tabs> -->
    </el-form>

    <!--报价信息-->

    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="sureDialog" :disabled="title == '查看'"
        >保 存</el-button
      >
      <!--  -->
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
  parseRefKeyInt,
} from "@/utils/viewCompUtil";
import { savePurchaseFile } from "@/api/purchase/quote";
import { listBdPsndocAsRef } from "@/api/orgs/bdpsndoc";
import { downloadProductFile } from "@/api/pub/pub";

export default {
  name: "Purchasequotecontent",
  props: ["replace", "title", "visiable", "action", "updateRow"],
  computed: {
    ...mapGetters(["listData", "columns"]),
  },
  data() {
    // 整数类型校验
    let checkNumberAsInt = (rule, value, callback) => {
      if (value || isNaN(value)) {
        let numVal = Number.parseInt(value);
        if (value && Number.isFinite(numVal)) {
          callback();
        } else {
          return callback(new Error("订单数量必须为数字类型"));
        }
      } else {
        callback();
      }
    };
    return {
      contentVisiable: false, // dialog 显示框
      uploadUrl: process.env.BASE_API + "/", // 上传地址
      showMaterielData: false, // 是否显示物料信息
      // BOM文件
      BOMFileList: [],
      // PCB文件
      PCBFileList: [],
      // 工艺文件
      GONGYIFileList: [],
      // 采购报价文件
      PURFileList: [],
      //钢网文件
      STEELFileList: [],
      a1: false,
      PURFile: null,
      temp: {
        pkPurchaseQuote: undefined,
        contractno: "",
        pkCustomer: null,
        customerCode: "",
        materialSwitch: "否",
        productType: 0,
        matterType: "1",
        encapsulation: "",
        isSteel: localStorage.getItem("isSteel"),
        brand: "",
        explain: "",
        pkPsndoc: null,
        pkProduct: null,
        productCode: "",
        productName: "",
        productModel: "",
        productNum: null,
        productMaterialSource: "",
        productSteelMeshSource: "",
        ispcb: "否",
        pcbSource: "",
        pcbLong: null,
        pcbWide: null,
        pcbThick: null,
        steelPrice: null, //采购钢网价格
        pcbResistColor: "",
        pcbCharColor: "",
        pcbResistCover: "",
        pcbPadSpary: "",
        pcbCopperThick: "",
        pcbFloors: null, // 板子层数-add
        pcbFrTg: "", // FR-4 TG值-add
        pcbBoardBrand: "", // 板材品牌-add
        pcbMinHole: "", // 最小孔径-add
        pcbImpedance: "", // 阻抗-add
        pcbResinPlugHole: "0", // 树脂塞孔0不需要1需要-add
        pcbHypotenuse: "0", // 金（锡）手指倒斜边0不需要1需要-add
        quoteEndDate: "",
        purchasePrice: null,
        purchaseTotal: null,
        materielPoList: [],
        fileName: "",
        fileFullname: "",
        billState: 0,
        approver: "",
        approverShow: "",
        singlePrice: 0,
        zongPrice: 0,
        approvetime: parseTime(new Date()),
        dr: 0,
        ts: parseTime(new Date()),
      },
      // 页面填写数据规则校验
      rules: {
        // 采购单价
        purchasePrice: [
          { required: true, message: "采购单价不能为空", trigger: "blur" },
          { validator: checkNumberAsInt, trigger: "blur" },
        ],
        // 采购总价
        purchaseTotal: [
          { required: true, message: "采购总价不能为空", trigger: "blur" },
          { validator: checkNumberAsInt, trigger: "blur" },
        ],
        //采购日期
        quoteEndDate: [
          { required: true, message: "采购日期不能为空", trigger: "blur" },
        ],
      },
      materialSourceOption: [
        // 物料来源
        { value: "1", label: "甲方提供" },
        { value: "2", label: "乙方提供" },
        { value: "3", label: "部分甲方提供" },
      ],
      //产品下单类别
      technicsStateOprion1: [
        { value: 1, label: "加工" },
        { value: 2, label: "OEM" },
        { value: 3, label: "ODM" },
        { value: 4, label: "物料" },
      ],
      //物料类别
      matterStateOprion: [
        { value: "0", label: "PCB" },
        { value: "1", label: "物料" },
      ],
      billStateOprion: [
        { value: 0, label: "自由态" },
        { value: 1, label: "报价流程进行中" },
        { value: 2, label: "已认领" },
        { value: 3, label: "采购报价完成" },
        { value: 4, label: "工艺审核完成" },
        { value: 5, label: "生产报价完成" },
        { value: 6, label: "销售报价完成" },
      ],
      steelMeshSourceOption: [
        // 钢网来源
        { value: "0", label: "无" },
        { value: "1", label: "甲方提供" },
        { value: "2", label: "乙方提供" },
      ],
      pcbThickOption: [
        // 板子厚度
        { value: 0.4, label: "0.4mm" },
        { value: 0.6, label: "0.6mm" },
        { value: 0.8, label: "0.8mm" },
        { value: 1.0, label: "1.0mm" },
        { value: 1.2, label: "1.2mm" },
        { value: 1.6, label: "1.6mm" },
        { value: 2.0, label: "2.0mm" },
      ],
      pcbResistColorOption: [
        // 阻焊颜色
        { value: "绿色", label: "绿色" },
        { value: "红色", label: "红色" },
        { value: "黄色", label: "黄色" },
        { value: "蓝色", label: "蓝色" },
        { value: "白色", label: "白色" },
        { value: "黑色", label: "黑色" },
      ],
      pcbCharColorOption: [
        // 字符颜色
        { value: "白色", label: "白色" },
      ],
      pcbResistCoverOption: [
        // 阻焊覆盖
        { value: "0", label: "过孔盖油" },
        { value: "1", label: "过孔开窗" },
      ],
      pcbPadSparyOption: [
        // 焊盘喷镀
        { value: "0", label: "有铅喷锡" },
        { value: "1", label: "无铅喷锡" },
        { value: "2", label: "沉金" },
      ],
      pcbCopperThick: [
        // 铜厚
        { value: "0", label: "0.5盎司" },
        { value: "1", label: "1盎司" },
        { value: "2", label: "2盎司" },
      ],
      needOrNotNeed: [
        // 需要 不需要 Option
        { value: "0", label: "不需要" },
        { value: "1", label: "需要" },
      ],
      pcbBoardBrandOption: [
        // 板材品牌optoin
        { value: "1", label: "FR-4生益" },
        { value: "2", label: "FR-4建滔" },
        { value: "3", label: "FR-4国纪" },
      ],
      pcbFrTgOption: [
        // FRT4G option
        { value: "1", label: "TG140" },
        { value: "2", label: "TG150" },
        { value: "3", label: "TG170" },
      ],
      pcbMinHoleOption: [
        // 最小孔径 optoin
        { value: "1", label: "0.25mm" },
        { value: "2", label: "0.3mm" },
        { value: "3", label: "0.35mm" },
        { value: "4", label: "0.4mm" },
      ],
      pcbImpedanceOption: [
        // 阻抗 optoin
        { value: "1", label: " 无" },
        { value: "2", label: "50Ω" },
        { value: "3", label: "90Ω" },
        { value: "4", label: "100Ω" },
      ],
      // 人员档案
      psndocOption: [],
    };
  },
  watch: {
    visiable() {
      this.contentVisiable = this.visiable;
      if (this.updateRow) {
        this.restTemp();
        this.temp = this.updateRow;
        // console.log(this.temp);
        // 采购文件信息
        if (this.updateRow.fileName) {
          let purfile = {
            name: this.updateRow.fileName,
            fullName: this.updateRow.fileFullname,
          };
          this.PURFileList = [purfile];
          this.PURFile = purfile;
        }

        // BOM文件信息
        if (this.updateRow.bomFilename) {
          this.BOMFileList = [
            {
              name: this.updateRow.bomFilename,
              fullName: this.updateRow.bomFilefullname,
            },
          ];
        }
        // PCB文件信息
        if (this.updateRow.pcbFilename) {
          this.PCBFileList = [
            {
              name: this.updateRow.pcbFilename,
              fullName: this.updateRow.pcbFilefullname,
            },
          ];
        }
        // 工艺文件信息
        if (this.updateRow.craftFilename) {
          this.GONGYIFileList = [
            {
              name: this.updateRow.craftFilename,
              fullName: this.updateRow.craftFilefullname,
            },
          ];
        }

        //工艺文件信息
        if (this.updateRow.steelFilename) {
          this.STEELFileList = [
            {
              name: this.updateRow.steelFilename,
              fullName: this.updateRow.steelFilefullname,
            },
          ];
        }

        // 预制物料信息的图片URL信息
        let tempThis = this.temp;
        if (tempThis && tempThis.materielPoList) {
          let materielPoList = tempThis.materielPoList;
          for (let index in materielPoList) {
            let dataOne = materielPoList[index];
            if (dataOne && dataOne.previewUrl) {
              dataOne.previewUrlShow = this.uploadUrl + dataOne.previewUrl;
              let previewUrlListShow = [dataOne.previewUrlShow];
              dataOne.previewUrlListShow = previewUrlListShow;
            }
          }
        }
      }
    },
  },
  created() {
    // 初始人员信息参照
    listBdPsndocAsRef().then((response) => {
      this.psndocOption = response.object;
      parseRefKeyInt(this.psndocOption);
    });
  },
  methods: {
    STEELFileRemove(){},
    STEELFileChange(){},
    //正则验证
    oninput(num) {
      var str = num;
      var len1 = str.substr(0, 1);
      var len2 = str.substr(1, 1);
      //如果第一位是0，第二位不是点，就用数字把点替换掉
      if (str.length > 1 && len1 == 0 && len2 != ".") {
        str = str.substr(1, 1);
      }
      //第一位不能是.
      if (len1 == ".") {
        str = "";
      }
      //限制只能输入一个小数点
      if (str.indexOf(".") != -1) {
        var str_ = str.substr(str.indexOf(".") + 1);
        if (str_.indexOf(".") != -1) {
          str = str.substr(0, str.indexOf(".") + str_.indexOf(".") + 1);
        }
      }
      //正则替换
      str = str.replace(/[^\d^\.]+/g, ""); // 保留数字和小数点
      str = str.replace(/\.\d\d\d$/, ""); // 小数点后只能输两位
      return str;
    },
    //下拉
    productSelct(val) {
      if (val == 4) {
        this.temp.materialSwitch = "是";
        this.a1 = true;
      } else {
        this.temp.materialSwitch = "否";
        this.a1 = false;
      }
    },
    // 解析日期
    dateFormat() {
      if (this.temp.quoteEndDate) {
        this.temp.quoteEndDate = parseTime(
          this.temp.quoteEndDate,
          "{y}-{m}-{d}"
        );
      }
    },
    priceCount(flag) {
      if (flag === "single") {
        // 采购总价 = 采购单价 * 数量
        this.temp.purchasePrice = Number.parseFloat(this.temp.purchasePrice)
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+\.)/g, "$1");
        if (this.temp.purchasePrice === "NaN") {
          this.temp.purchasePrice = 0;
        }
        this.temp.singlePrice = this.temp.purchasePrice;
        let countPurchaseTotal = (
          this.temp.purchasePrice * this.temp.productNum
        )
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+\.)/g, "$1");

        this.temp.zongPrice = countPurchaseTotal;
        this.temp.purchaseTotal = countPurchaseTotal;
        if (this.temp.purchaseTotal === "NaN") {
          this.temp.purchaseTotal = 0;
        }
      }
      if (flag === "sum") {
        // 采购单价 = 采购总价 / 数量
        this.temp.purchaseTotal = Number.parseFloat(this.temp.purchaseTotal)
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+\.)/g, "$1");
        if (this.temp.purchaseTotal == "NaN") {
          this.temp.purchaseTotal = 0;
        }
        let countPurchasePrice = (
          this.temp.purchaseTotal / this.temp.productNum
        )
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+\.)/g, "$1");
        this.temp.purchasePrice = countPurchasePrice;
        if (this.temp.purchasePrice === "Infinity") {
          this.temp.purchasePrice = 0.0;
        } else if (this.temp.purchasePrice == "NaN") {
          this.temp.purchasePrice = 0.0;
        }
      }
    },
    pcbPriceCount(flag) {
      if (flag === "single") {
        // PCB成本总价 = PCB成本单价 * 数量
        this.temp.productPcbPrice = Number.parseFloat(this.temp.productPcbPrice)
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+\.)/g, "$1");
        if (
          this.temp.productPcbPrice == "NaN" ||
          this.temp.productPcbPrice == "Infinity"
        ) {
          this.temp.productPcbPrice = 0;
        }

        this.temp.singlePrice =
          Number.parseFloat(this.temp.singlePrice) +
          Number.parseFloat(this.temp.productPcbPrice);
        let countProductPcbTotal = (
          this.temp.productPcbPrice * this.temp.productNum
        )
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+\.)/g, "$1");
        this.temp.zongPrice =
          Number.parseFloat(this.temp.zongPrice) +
          Number.parseFloat(countProductPcbTotal);
        this.temp.productPcbTotal = countProductPcbTotal;
        if (
          this.temp.productPcbTotal == "NaN" ||
          this.temp.productPcbTotal == "Infinity"
        ) {
          this.temp.productPcbTotal = 0;
        }
      }
      if (flag === "sum") {
        // PCB成本单价 = PCB成本总价 / 数量
        this.temp.productPcbTotal = Number.parseFloat(this.temp.productPcbTotal)
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+\.)/g, "$1");
        if (
          this.temp.productPcbTotal == "NaN" ||
          this.temp.productPcbTotal == "Infinity"
        ) {
          this.temp.productPcbTotal = 0;
        }
        let countProductPcbPrice = (
          this.temp.productPcbTotal / this.temp.productNum
        )
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+\.)/g, "$1");
        this.temp.productPcbPrice = countProductPcbPrice;
        if (
          this.temp.productPcbPrice === "Infinity" ||
          this.temp.productPcbPrice === "NaN"
        ) {
          this.temp.productPcbPrice = 0;
        }
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    PURFileChange(file, fileList) {
      // 记录文件变化
      this.PURFile = file;
      // console.log(this.PURFile);
    },
    PURFileRemove(file, fileList) {
      // 采购报价文件删除
      this.PURFile = null;
    },
    // 文件下载
    downloadProccessFile(file) {
      let fileName = file.name;
      let fileFullName = file.fullName;
      if (fileName && fileFullName) {
        let downLoadParma = { fileName: fileName, fileFullName: fileFullName };
        downloadProductFile(downLoadParma).then((response) => {
          const blob = response.data;
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onload = (e) => {
            const a = document.createElement("a");
            if (fileName) {
              a.download = fileName;
            } else {
              a.download = fileName;
            }
            a.href = e.target.result;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
          };
        });
      }
    },
    closeDialog() {
      // 回调关闭Dialog
      this.$emit("close", null);
    },
    sureDialog() {
      // 确定保存回调Dialog

      let formData = new FormData();
      if (this.title === "采购报价" && this.PURFile == null) {
        this.$message.warning("上传文件不完整!请选择需要上传的文件。");
        return;
      }
      formData.append(`purfile`, this.PURFile.raw);
      formData.append(`productCode`, this.temp.productCode);
      console.log(formData);
      // 表单校验
      this.$refs.dataForm.validate((valid) => {
        if (valid) {

          savePurchaseFile(formData).then((response) => {
            if (response.object) {
              this.temp.fileName = response.object.PURCHASE_FILE_NAME;
              this.temp.fileFullname = response.object.PURCHASE_FILE_FULL_NAME;
            }

            const actTemp = this.temp;
            if (this.action) {
              if (actTemp.productType == 1) {
                actTemp.encapsulation = null;
                actTemp.brand = null;
                actTemp.explains = null;
                actTemp.pcbSource = null;
                actTemp.pcbLong = null;
                actTemp.pcbWide = null;
                actTemp.pcbThick = null;
                actTemp.makeupNum = null;
                actTemp.processSide = null;
                actTemp.pcbResistColor = null;
                actTemp.pcbCharColor = null;
                actTemp.pcbResistCover = null;
                actTemp.pcbPadSpary = null;
                actTemp.pcbCopperThick = null;
                actTemp.pcbBoardBrand = null;
                actTemp.pcbFrTg = null;
                actTemp.pcbFloors = null;
                actTemp.pcbMinHole = null;
                actTemp.pcbImpedance = null;
                actTemp.pcbResinPlugHole = null;
                actTemp.pcbHypotenuse = null;
              } else if (actTemp.productType == 2) {
                actTemp.encapsulation = null;
                actTemp.brand = null;
                actTemp.explains = null;
              } else if (actTemp.productType == 3) {
                actTemp.encapsulation = null;
                actTemp.brand = null;
                actTemp.explains = null;
                actTemp.makeDip = null;
                actTemp.makeTest = null;
                actTemp.makeDefense = null;
                actTemp.makeAging = null;
              } else if (
                actTemp.productType == 4 &&
                actTemp.matterType == "1"
              ) {
                actTemp.pcbSource = null;
                actTemp.pcbLong = null;
                actTemp.pcbWide = null;
                actTemp.pcbThick = null;
                actTemp.makeupNum = null;
                actTemp.processSide = null;
                actTemp.pcbResistColor = null;
                actTemp.pcbCharColor = null;
                actTemp.pcbResistCover = null;
                actTemp.pcbPadSpary = null;
                actTemp.pcbCopperThick = null;
                actTemp.pcbBoardBrand = null;
                actTemp.pcbFrTg = null;
                actTemp.pcbFloors = null;
                actTemp.pcbMinHole = null;
                actTemp.pcbImpedance = null;
                actTemp.pcbResinPlugHole = null;
                actTemp.pcbHypotenuse = null;
                actTemp.makeDip = null;
                actTemp.makeTest = null;
                actTemp.makeDefense = null;
                actTemp.makeAging = null;
              } else if (
                actTemp.productType == 4 &&
                actTemp.matterType == "0"
              ) {
                actTemp.encapsulation = null;
                actTemp.brand = null;
                actTemp.explains = null;
                actTemp.makeDip = null;
                actTemp.makeTest = null;
                actTemp.makeDefense = null;
                actTemp.makeAging = null;
              }

              this.$confirm("是否确定该项?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
              })
                .then(() => {
                  this.$message({
                    type: "success",
                    message: "操作成功!",
                  });
                  initReplaceUpdateData(actTemp, this.replace);
                  this.action(actTemp).then((response) => {
                    if (response.primary) {
                      actTemp.pkProvince = response.primary;
                    }
                    if (response.success) {
                      initReplaceAddData(actTemp, this.replace);
                      this.$store.commit("HANDLE_LISTVIEW_DATA", actTemp);
                      this.$emit("close", actTemp);
                      // location.reload();
                    } else {
                      this.$message({
                        message: `操作失败:${response.message}`,
                        type: "error",
                      });
                    }
                  });
                 
                })
                .catch(() => {
                  this.$message({
                    type: "info",
                    message: "已取消操作",
                  });
                });
              // this.$message({ message: '操作成功', type: 'success' })
              // this.$emit("close", actTemp);
            }
          });
        } else {
          this.$message.warning("表单验证未通过!");
          return false;
        }
      });
    },
    restTemp() {
      // 刷新本界面的数据
      this.temp = {
        pkPurchaseQuote: undefined,
        contractno: "",
        pkCustomer: null,
        customerCode: "",
        pkPsndoc: null,
        pkProduct: null,
        materialSwitch: "否",
        productType: 0,
        matterType: "1",
        encapsulation: "",
        brand: "",
        explain: "",
        productCode: "",
        productName: "",
        productModel: "",
        productNum: null,
        productMaterialSource: "",
        productSteelMeshSource: "",
        ispcb: "否",
        pcbSource: "",
        pcbLong: null,
        isSteel: localStorage.getItem("isSteel"),
        pcbWide: null,
        pcbThick: null,
        pcbResistColor: "",
        pcbCharColor: "",
        pcbResistCover: "",
        pcbPadSpary: "",
        steelPrice: null, //采购钢网价格
        pcbCopperThick: "",
        pcbFloors: null, // 板子层数-add
        pcbFrTg: "", // FR-4 TG值-add
        pcbBoardBrand: "", // 板材品牌-add
        pcbMinHole: "", // 最小孔径-add
        pcbImpedance: "", // 阻抗-add
        pcbResinPlugHole: "0", // 树脂塞孔0不需要1需要-add
        pcbHypotenuse: "0", // 金（锡）手指倒斜边0不需要1需要-add
        quoteEndDate: "",
        purchasePrice: null,
        purchaseTotal: null,
        materielPoList: [],
        fileName: "",
        fileFullname: "",
        billState: 0,
        approver: "",
        approverShow: "",
        approvetime: parseTime(new Date()),
        dr: 0,
        ts: parseTime(new Date()),
      };
      this.PURFileList = [];
      this.PURFile = null;
      this.showMaterielData = false;
    },
  },
};
</script>

<style  lang="scss" type="text/scss" scoped>
.el-select /deep/ .el-input__inner {
  width: 160px;
}
.el-input /deep/ .el-input__inner {
  width: 160px;
}

/deep/ .upload-demo {
  display: inline;
}

/deep/ .el-upload-dragger {
  width: 130px;
  height: 30px;
  background: #409eff;
  border: solid 1px #409eff;
}

/deep/ .el-upload-list {
  width: 240px;
}

/deep/ .el-upload-dragger .el-icon-upload {
  font-size: 30px;
  // color: #C0C4CC;
  color: #fffeff;
  float: left;
  margin: -10px 3px 16px;
  line-height: 50px;
}

/deep/ .el-upload__text span {
  color: white;
  margin-top: 10px;
  display: inline-block;
}

/deep/ .el-upload__tip {
  width: 200px;
}
/deep/ .demo1 {
  width: 200px;
  height: 50px;
  display: inline-block;
  background: #f5f7fa;
  border: solid 1px #f5f7fa;
  margin-top: -15px;
}
/deep/ .demo1 .el-upload-dragger {
  margin-top: 3px;
  margin-left: 25px;
}
</style>
