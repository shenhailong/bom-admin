<template>
  <el-dialog
    :title="title"
    :visible.sync="contentVisiable"
    @close="closeDialog"
    width="85%"
  >
    <el-form
      :inline="true"
      ref="dataForm"
      :disabled="title == '查看'"
      :model="temp"
      label-position="left"
      label-width="140px"
    >
      <!--生产报价产品基本信息-->
      <el-tabs type="border-card">
        <el-tab-pane label="基本信息">
          <el-form-item label="客户编码" prop="customerCode">
            <el-input v-model="temp.customerCode" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="产品编码" prop="productCode">
            <el-input v-model="temp.productCode" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="产品名称" prop="productName">
            <el-input v-model="temp.productName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="产品型号" prop="productModel">
            <el-input v-model="temp.productModel" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="订单数量" prop="productNum">
            <el-input v-model="temp.productNum" :disabled="true"></el-input>
          </el-form-item>

          <el-form-item label="销售负责人" prop="pkPsndoc">
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

          <el-form-item label="物料来源" prop="productMaterialSource">
            <el-select
              v-model="temp.productMaterialSource"
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
          <!-- 产品类别 -->
          <el-form-item label="产品类别" prop="productType">
            <el-select
              @change="productSelct"
              v-model="temp.productType"
              placeholder="请选择"
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
          <el-form-item label="钢网来源" prop="productSteelMeshSource">
            <el-select
              v-model="temp.productSteelMeshSource"
              placeholder="请选择"
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
        </el-tab-pane>
      </el-tabs>
      <!-- 物料下单 -->
      <br />
      <el-form-item label="物料下单" prop="materialSwitch" label-width="200px">
        <el-switch
          v-model="temp.materialSwitch"
          active-value="是"
          inactive-value="否"
        ></el-switch>
      </el-form-item>
      <el-tabs
        type="border-card"
        v-if="temp.materialSwitch === '是' ? true : false"
      >
        <el-tab-pane label="物料下单">
          <el-form-item label="封装" prop="encapsulation">
            <el-input v-model="temp.encapsulation"></el-input>
          </el-form-item>
          <el-form-item label="品牌" prop="brand">
            <el-input v-model="temp.brand"></el-input>
          </el-form-item>
          <el-form-item label="说明" prop="explains">
            <el-input v-model="temp.explains"></el-input>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
      <br />
      <el-form-item label="PCB" prop="ispcb" label-width="200px">
        <el-switch
          v-model="temp.ispcb"
          active-value="是"
          inactive-value="否"
          :disabled="a1"
        ></el-switch>
      </el-form-item>

      <!--PCB参数-->
      <el-tabs type="border-card" v-if="temp.ispcb === '是' ? true : false">
        <el-tab-pane label="PCB参数">
          <el-form-item label="PCB来源" prop="pcbSource">
            <el-select
              v-model="temp.pcbSource"
              placeholder="请选择"
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
              placeholder="请选择"
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
              placeholder="请选择"
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
              placeholder="请选择"
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
              placeholder="请选择"
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
              placeholder="请选择"
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
              placeholder="请选择"
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
              placeholder="请选择"
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
              placeholder="请选择"
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
              placeholder="请选择"
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
              placeholder="请选择"
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
            <el-input-number
              v-model="temp.pcbFloors"
              :min="1"
              :max="9999"
              label="请输入层"
              :disabled="true"
            ></el-input-number>
          </el-form-item>

          <el-form-item label="树脂塞孔" prop="pcbResinPlugHole">
            <el-select
              v-model="temp.pcbResinPlugHole"
              placeholder="请选择"
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

          <el-form-item label="金(锡)手指倒斜边" prop="pcbHypotenuse">
            <el-select
              v-model="temp.pcbHypotenuse"
              placeholder="请选择"
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

      <!--报价信息-->
      <br />
      <el-tabs type="border-card">
        <el-tab-pane label="报价信息">
          <el-tag>工序报价</el-tag>
          <el-table :data="temp.billProduceQuoteBPoList" show-summary>
            <el-table-column
              prop="pkProduceQuoteB"
              v-if="false"
            ></el-table-column>
            <el-table-column prop="ismodel" v-if="false"></el-table-column>
            <el-table-column
              prop="type"
              label="工序类别"
              width="180"
            ></el-table-column>
            <el-table-column
              prop="param"
              label="工序参数"
              width="180"
            ></el-table-column>

            <el-table-column
              label="外协工序单价"
              prop="unitPriceOut"
              width="180"
            >
              <template slot-scope="scope">
                <el-input
                  size="small"
                  v-model="scope.row.unitPriceOut"
                  @change="gongxuChange(scope.row, '1')"
                ></el-input>
              </template>
            </el-table-column>

            <el-table-column
              prop="unitTotalPriceOut"
              label="外协工序总价"
              width="180"
            ></el-table-column>

            <el-table-column
              label="外协订单合计"
              prop="unitTotalOut"
              width="180"
            >
              <template slot-scope="scope">
                <el-input
                  size="small"
                  v-model="scope.row.unitTotalOut"
                  @change="gongxuChange(scope.row, '2')"
                ></el-input>
              </template>
            </el-table-column>
          </el-table>

          <br />
          <el-tag>制具报价</el-tag>
          <el-table :data="temp.modelQuoteBPoList" show-summary>
            <el-table-column
              prop="pkProduceQuoteB"
              v-if="false"
            ></el-table-column>
            <el-table-column prop="ismodel" v-if="false"></el-table-column>
            <el-table-column
              prop="type"
              label="工序类别"
              width="180"
            ></el-table-column>

            <el-table-column label="单价" prop="param" width="180">
              <template slot-scope="scope">
                <el-input
                  size="small"
                  v-model="scope.row.param"
                  @change="zhijuChange(scope.row)"
                ></el-input>
              </template>
            </el-table-column>

            <el-table-column label="数量" prop="unitPriceOut" width="180">
              <template slot-scope="scope">
                <el-input
                  size="small"
                  v-model="scope.row.unitPriceOut"
                  @change="zhijuChange(scope.row)"
                ></el-input>
              </template>
            </el-table-column>

            <el-table-column
              prop="unitTotalPriceOut"
              label="总价"
              width="180"
            ></el-table-column>
          </el-table>

          <br />
          <el-tag>特殊工艺</el-tag>
          <el-table :data="temp.specialQuoteBPoList" show-summary>
            <el-table-column
              prop="pkProduceQuoteB"
              v-if="false"
            ></el-table-column>
            <el-table-column prop="ismodel" v-if="false"></el-table-column>
            <el-table-column
              prop="type"
              label="报价项"
              width="180"
            ></el-table-column>

            <el-table-column label="单板收费" prop="param" width="180">
              <template slot-scope="scope">
                <el-input
                  size="small"
                  v-model="scope.row.param"
                  @change="specialChange(scope.row)"
                ></el-input>
              </template>
            </el-table-column>

            <el-table-column
              prop="unitTotalPriceOut"
              label="总价"
              width="180"
            ></el-table-column>

            <el-table-column label="备注" prop="memo" width="180">
              <template slot-scope="scope">
                <el-input size="small" v-model="scope.row.memo"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>

      <!--单据信息-->
      <br />
      <el-tabs type="border-card">
        <el-tab-pane label="单据信息">
          <el-form-item label="单据状态" prop="billState">
            <el-select
              v-model="temp.billState"
              placeholder="请选择"
              :disabled="true"
            >
              <el-option
                v-for="item in billStateOprion"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="创建人" prop="creatorShow">
            <el-input v-model="temp.creatorShow" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="创建时间" prop="creationtime">
            <el-input v-model="temp.creationtime" :disabled="true"></el-input>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>

    <!--文件信息Controller-->
    <br />
    <el-tabs type="border-card">
      <el-tab-pane label="文件信息">
        <!--BOM、PCB、工艺文件下载-->
        <!--BOM文件-->
        <el-col :span="8">
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
            <div class="el-upload__text">BOM文件</div>
          </el-upload>
        </el-col>
        <!--PCB文件-->
        <el-col :span="8">
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
            <div class="el-upload__text">PCB文件</div>
          </el-upload>
        </el-col>
        <!--工艺文件-->
        <el-col :span="8">
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
            <div class="el-upload__text">工艺文件</div>
          </el-upload>
        </el-col>
      </el-tab-pane>
    </el-tabs>

    <span slot="footer" class="dialog-footer">
      <el-button @click="closeDialog">取 消</el-button>
      <el-button type="primary" @click="sureDialog" v-if="title != '查看'"
        >确 定</el-button
      >
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters } from "vuex";
import {
  initReplaceAddData,
  parseTime,
  randomNum,
  parseRefKeyInt,
} from "@/utils/viewCompUtil";
import { updateBatchProduceQuoteB } from "@/api/produce/quote";
import { listBdPsndocAsRef } from "@/api/orgs/bdpsndoc";
import { downloadProductFile } from "@/api/pub/pub";

export default {
  name: "Producequotecontent",
  props: ["replace", "title", "visiable", "action", "updateRow"],
  computed: {
    ...mapGetters(["listData", "columns"]),
  },
  data() {
    return {
      contentVisiable: false, // dialog 显示框
      uploadUrl: process.env.BASE_API + "/", // 上传地址
      // BOM文件
      BOMFileList: [],
      // PCB文件
      PCBFileList: [],
      a1: false,
      // 工艺文件
      GONGYIFileList: [],
      temp: {
        pkProduceQuoteH: undefined,
        contractno: "",
        pkCustomer: null,
        customerCode: "",
        pkProduct: null,
        materialSwitch: "否",
        productType: 0,
        encapsulation: "",
        brand: "",
        explain: "",
        productCode: "",
        productName: "",
        productModel: "",
        productNum: "",
        ispcb: "否",
        pcbSource: "",
        pcbLong: null,
        pcbWide: null,
        pcbThick: null,
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
        productMaterialSource: "",
        productSteelMeshSource: "",
        unitPriceOut: null,
        unitTotalOut: null,
        billProduceQuoteBPoList: [],
        modelQuoteBPoList: [],
        specialQuoteBPoList: [],
        billState: null,
        creator: "",
        creatorShow: "",
        creationtime: parseTime(new Date()),
        dr: 0,
        ts: parseTime(new Date()),
      },
      steelMeshSourceOption: [
        // 钢网来源
        { value: "0", label: "无" },
        { value: "1", label: "甲方提供" },
        { value: "2", label: "乙方提供" },
      ],
      //物料下单类别
      technicsStateOprion1: [
        { value: 0, label: "自由态" },
        { value: 1, label: "加工" },
        { value: 2, label: "OEM" },
        { value: 3, label: "ODM" },
        { value: 4, label: "物料" },
      ],
      materialSourceOption: [
        // 物料来源
        { value: "1", label: "甲方提供" },
        { value: "2", label: "乙方提供" },
        { value: "3", label: "部分甲方提供" },
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
      billStateOprion: [
        { value: 0, label: "自由态" },
        { value: 1, label: "报价流程进行中" },
        { value: 2, label: "已认领" },
        { value: 3, label: "采购报价完成" },
        { value: 4, label: "工艺审核完成" },
        { value: 5, label: "生产报价完成" },
        { value: 6, label: "销售报价完成" },
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
      // 报价事件
      if (this.title === "生产报价" && this.updateRow) {
        this.restTemp();
        this.temp = this.updateRow;
        // BOM文件信息
        this.BOMFileList = [
          {
            name: this.updateRow.bomFilename,
            fullName: this.updateRow.bomFilefullname,
          },
        ];
        // PCB文件信息
        this.PCBFileList = [
          {
            name: this.updateRow.pcbFilename,
            fullName: this.updateRow.pcbFilefullname,
          },
        ];
        // 工艺文件信息
        this.GONGYIFileList = [
          {
            name: this.updateRow.craftFilename,
            fullName: this.updateRow.craftFilefullname,
          },
        ];
      }
      // 查看事件
      if (this.title === "查看" && this.updateRow) {
        this.restTemp();
        this.temp = this.updateRow;
        // BOM文件信息
        this.BOMFileList = [
          {
            name: this.updateRow.bomFilename,
            fullName: this.updateRow.bomFilefullname,
          },
        ];
        // PCB文件信息
        this.PCBFileList = [
          {
            name: this.updateRow.pcbFilename,
            fullName: this.updateRow.pcbFilefullname,
          },
        ];
        // 工艺文件信息
        this.GONGYIFileList = [
          {
            name: this.updateRow.craftFilename,
            fullName: this.updateRow.craftFilefullname,
          },
        ];
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
      const billProduceQuoteBPoList =
        this.temp.billProduceQuoteBPoList == null
          ? []
          : this.temp.billProduceQuoteBPoList;
      const modelQuoteBPoList =
        this.temp.modelQuoteBPoList == null ? [] : this.temp.modelQuoteBPoList;
      const specialQuoteBPoList =
        this.temp.specialQuoteBPoList == null
          ? []
          : this.temp.specialQuoteBPoList;
      let updateBList = billProduceQuoteBPoList
        .concat(modelQuoteBPoList)
        .concat(specialQuoteBPoList);
      // 这里只更新报价信息

      this.$confirm("此操作将保存该回调Dialog, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "操作成功!",
          });
          updateBatchProduceQuoteB(updateBList).then((response) => {
            if (response.success) {
              initReplaceAddData(billProduceQuoteBPoList, this.replace);
            } else {
              this.$message({
                message: `操作失败:${response.message}`,
                type: "error",
              });
            }
            // location.reload();
          });
          
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作",
          });
        });

      this.$emit("close", billProduceQuoteBPoList);
    },
    // 工序报价计算公式
    gongxuChange(row, type) {
      if ("1" === type) {
        let sourceUnitPriceOut = Number.parseFloat(row.unitPriceOut);
        if (isNaN(sourceUnitPriceOut)) {
          row.unitPriceOut = 0;
        } else {
          row.unitPriceOut = sourceUnitPriceOut
            .toFixed(3)
            .replace(/(\d)(?=(\d{3})+\.)/g, "$1");
        }
        // 外协工序总价 = 工序参数 * 外协工序单价
        row.unitTotalPriceOut = (row.param * row.unitPriceOut)
          .toFixed(3)
          .replace(/(\d)(?=(\d{3})+\.)/g, "$1");
        // 外协订单合计 = 外协工序总价 * 订单数量
        row.unitTotalOut = (row.unitTotalPriceOut * this.temp.productNum)
          .toFixed(3)
          .replace(/(\d)(?=(\d{3})+\.)/g, "$1");
      }
      if ("2" === type) {
        let sourceUnitTotalOut = Number.parseFloat(row.unitTotalOut);
        if (isNaN(sourceUnitTotalOut)) {
          row.unitTotalOut = 0;
        } else {
          row.unitTotalOut = sourceUnitTotalOut
            .toFixed(3)
            .replace(/(\d)(?=(\d{3})+\.)/g, "$1");
        }
        // 外协工序总价 = 外协订单合计 / 数量
        row.unitTotalPriceOut = (row.unitTotalOut / this.temp.productNum)
          .toFixed(3)
          .replace(/(\d)(?=(\d{3})+\.)/g, "$1");
        if (row.unitTotalPriceOut === "Infinity") {
          row.unitTotalPriceOut = 0.0;
        }
        // 外协工序单价 = 外协工序总价 / 工序参数
        row.unitPriceOut = (row.unitTotalPriceOut / row.param)
          .toFixed(3)
          .replace(/(\d)(?=(\d{3})+\.)/g, "$1");
        if (row.unitPriceOut === "Infinity") {
          row.unitPriceOut = 0.0;
        }
      }
    },
    // 制具报价计算公式
    zhijuChange(row) {
      // 工时
      let sourceParam = Number.parseFloat(row.param);
      if (isNaN(sourceParam)) {
        row.param = 0;
      } else {
        row.param = sourceParam.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1");
      }
      // 数量
      let sourceUnitPriceOut = Number.parseFloat(row.unitPriceOut);
      if (isNaN(sourceUnitPriceOut)) {
        row.unitPriceOut = 0;
      } else {
        row.unitPriceOut = sourceUnitPriceOut
          .toFixed(2)
          .replace(/(\d)(?=(\d{3})+\.)/g, "$1");
      }
      // 总价 = 工时 * 数量
      row.unitTotalPriceOut = (row.param * row.unitPriceOut)
        .toFixed(2)
        .replace(/(\d)(?=(\d{3})+\.)/g, "$1");
    },
    // 特殊工艺报价计算公式
    specialChange(row) {
      // 订单数量
      let orderNum = this.temp.productNum;
      if (isNaN(orderNum)) {
        orderNum = 0;
      }
      // 单板收费
      let sourceParam = Number.parseFloat(row.param);
      if (isNaN(sourceParam)) {
        row.param = 0;
      } else {
        row.param = sourceParam.toFixed(3).replace(/(\d)(?=(\d{3})+\.)/g, "$1");
      }
      // 总价 = 单板收费 * 订单数量
      row.unitTotalPriceOut = (row.param * orderNum)
        .toFixed(3)
        .replace(/(\d)(?=(\d{3})+\.)/g, "$1");
    },
    restTemp() {
      // 刷新本界面的数据
      this.temp = {
        pkProduceQuoteH: undefined,
        contractno: "",
        pkCustomer: null,
        customerCode: "",
        pkProduct: null,
        productCode: "",
        productName: "",
        productModel: "",
        productNum: "",
        ispcb: "否",
        pcbSource: "",
        materialSwitch: "否",
        productType: 0,
        encapsulation: "",
        brand: "",
        explain: "",
        pcbLong: null,
        pcbWide: null,
        pcbThick: null,
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
        productMaterialSource: "",
        productSteelMeshSource: "",
        unitPriceOut: null,
        unitTotalOut: null,
        billProduceQuoteBPoList: [],
        modelQuoteBPoList: [],
        specialQuoteBPoList: [],
        billState: null,
        creator: "",
        creatorShow: "",
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
  width: 206px;
}
</style>
