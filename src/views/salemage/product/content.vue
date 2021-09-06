<template>
  <el-dialog
    :title="title"
    :visible.sync="contentVisiable"
    @close="closeDialog"
    width="86%"
  >
    <el-form
      :inline="true"
      ref="dataForm"
      size="mini"
      :disabled="title == '查看'"
      :model="temp"
      :rules="rules"
      label-position="left"
      label-width="90px"
    >
      <!--基本信息-->
      <el-tabs type="border-card">
        <el-tab-pane label="产品信息">
          <el-form-item label="产品名称" prop="name">
            <el-input v-model="temp.name"></el-input>
          </el-form-item>
          <el-form-item label="产品编码" prop="code">
            <el-input v-model="temp.code" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="产品型号" prop="model">
            <el-input v-model="temp.model"></el-input>
          </el-form-item>
          <el-form-item label="产品类别" prop="productType">
            <el-select
              @change="productSelct"
              v-model="temp.productType"
              placeholder="请选择"
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
            v-if="this.temp.productType == 4"
            label="物料类别"
            prop="matterType"
          >
            <el-select v-model="temp.matterType" placeholder="请选择">
              <el-option
                v-for="item in matterStateOprion"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>

      <!--报价信息-->
      <br />
      <el-tabs type="border-card">
        <el-tab-pane label="客户信息">
          <el-form-item label="客户名称" prop="pkCustomer">
            <el-select
              v-model="temp.pkCustomer"
              placeholder="请选择"
              @change="customerChange()"
            >
              <el-option
                v-for="item in customerOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="采购联系人" prop="purchaseContacts">
            <el-select
              v-model="temp.purchaseContacts"
              placeholder="请选择"
              @change="customdocContactsChange('purchase')"
            >
              <el-option
                v-for="item in customdocOprion"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="采购联系电话"
            prop="purchaseContactsPhone"
            label-width="100px"
          >
            <el-input
              v-model="temp.purchaseContactsPhone"
              :disabled="true"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="采购联系电话"
            prop="purchaseContactsPhone"
            label-width="100px"
            style="visibility: hidden"
          >
            <el-input
              v-model="temp.purchaseContactsPhone"
              :disabled="true"
            ></el-input>
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
          <el-form-item label="技术联系人" prop="skillContacts">
            <el-select
              v-model="temp.skillContacts"
              placeholder="请选择"
              @change="customdocContactsChange('skill')"
            >
              <el-option
                v-for="item in customdocOprion"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item
            label="技术联系电话"
            prop="skillContactsPhone"
            label-width="100px"
          >
            <el-input
              v-model="temp.skillContactsPhone"
              :disabled="true"
            ></el-input>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>

      <!--加工工艺选项-->
      <br />
      <el-tabs
        type="border-card"
        v-if="
          this.temp.productType == 1 ||
          this.temp.productType == 2 ||
          this.temp.productType == 3
        "
      >
        <el-tab-pane label="加工工艺选项">
          <el-form-item label="组装" prop="isinstal">
            <el-select v-model="temp.isinstal" placeholder="请选择">
              <el-option
                v-for="item in yesOrNoOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="测试" prop="istest">
            <el-select v-model="temp.istest" placeholder="请选择">
              <el-option
                v-for="item in yesOrNoOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="老化" prop="isaging">
            <el-select v-model="temp.isaging" placeholder="请选择">
              <el-option
                v-for="item in yesOrNoOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="三防" prop="defense">
            <el-select v-model="temp.defense" placeholder="请选择">
              <el-option
                v-for="item in yesOrNoOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="焊接工艺" prop="sealTechnics">
            <el-select v-model="temp.sealTechnics" placeholder="请选择">
              <el-option
                v-for="item in sealTechnicsOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="物料来源" prop="materialSource">
            <el-select v-model="temp.materialSource" placeholder="请选择">
              <el-option
                v-for="item in materialSourceOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="执行标准" prop="exeStandard">
            <el-select v-model="temp.exeStandard" placeholder="请选择">
              <el-option
                v-for="item in exeStandardOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="钢网来源" prop="steelMeshSource">
            <el-select v-model="temp.steelMeshSource" placeholder="请选择">
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
      <br />
      <el-tabs
        type="border-card"
        v-if="this.temp.productType == 4 && this.temp.matterType == '1'"
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
            <el-select v-model="temp.pcbThick" placeholder="请选择">
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
            <el-select v-model="temp.pcbResistColor" placeholder="请选择">
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
            <el-select v-model="temp.pcbCharColor" placeholder="请选择">
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
            <el-select v-model="temp.pcbResistCover" placeholder="请选择">
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
            <el-select v-model="temp.pcbPadSpary" placeholder="请选择">
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
            <el-select v-model="temp.pcbCopperThick" placeholder="请选择">
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
            <el-select v-model="temp.pcbBoardBrand" placeholder="请选择">
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
            <el-select v-model="temp.pcbFrTg" placeholder="请选择">
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
            <el-select v-model="temp.pcbMinHole" placeholder="请选择">
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
            <el-select v-model="temp.pcbImpedance" placeholder="请选择">
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
            <el-input v-model="temp.pcbFloors" label="请输入层"></el-input>
          </el-form-item>

          <el-form-item label="树脂塞孔" prop="pcbResinPlugHole">
            <el-select v-model="temp.pcbResinPlugHole" placeholder="请选择">
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
            <el-select v-model="temp.pcbHypotenuse" placeholder="请选择">
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
      <br />
      <!--制具参数-->
      <el-tabs
        type="border-card"
        v-if="this.temp.productType == 1 || this.temp.productType == 2"
      >
        <el-tab-pane label="制具参数">
          <el-form-item label="DIP制具" prop="makeDip">
            <el-select v-model="temp.makeDip" placeholder="请选择">
              <el-option
                v-for="item in steelMeshSourceOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="测试制具" prop="makeTest">
            <el-select v-model="temp.makeTest" placeholder="请选择">
              <el-option
                v-for="item in steelMeshSourceOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="三防制具" prop="makeDefense">
            <el-select v-model="temp.makeDefense" placeholder="请选择">
              <el-option
                v-for="item in steelMeshSourceOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="老化制具" prop="makeAging">
            <el-select v-model="temp.makeAging" placeholder="请选择">
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
      <br />
      <!--附件上传-->
      <el-tabs
        type="border-card"
        v-if="
          (this.temp.productType == 4 && this.temp.matterType == '1') ||
          this.temp.productType == 1 ||
          this.temp.productType == 2 ||
          this.temp.productType == 3 ||
          (this.temp.productType == 4 && this.temp.matterType == '0')
        "
      >
        <el-tab-pane label="附件上传">
          <!--BOM文件-->
          <el-col
            :span="5"
            v-if="
              (this.temp.productType == 4 && this.temp.matterType == '1') ||
              this.temp.productType == 1 ||
              this.temp.productType == 2 ||
              this.temp.productType == 3
            "
          >
            <el-upload
              drag
              class="upload-demo"
              ref="BOMUpload"
              :action="uploadUrl"
              :file-list="BOMFileList"
              :limit="1"
              :on-exceed="handleExceed"
              :on-change="BOMFileChange"
              :before-remove="BOMFileRemove"
              :on-preview="downloadProccessFile"
              :auto-upload="false"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                <span>BOM文件</span><em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">
                1: BOM文件必须为.rar或是.zip格式压缩包文件。
                <br />
                2: 上传文件大小不得超过200M
              </div>
            </el-upload>
          </el-col>
          <!--PCB文件-->
          <el-col
            :span="5"
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
              ref="PCBUpload"
              :action="uploadUrl"
              :file-list="PCBFileList"
              :limit="1"
              :on-exceed="handleExceed"
              :on-change="PCBFileChange"
              :before-remove="PCBFileRemove"
              :on-preview="downloadProccessFile"
              :auto-upload="false"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                <span>PCB文件</span> <em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">
                1: pcb文件必须为.rar或是.zip格式压缩包文件。
                <br />
                2: 上传文件大小不得超过200M
              </div>
            </el-upload>
          </el-col>

          <!--工艺文件-->
          <el-col
            :span="5"
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
              ref="GONGYIUpload"
              :action="uploadUrl"
              :file-list="GONGYIFileList"
              :limit="1"
              :on-exceed="handleExceed"
              :on-change="GONGYIFileChange"
              :before-remove="GONGYIFileRemove"
              :on-preview="downloadProccessFile"
              :auto-upload="false"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                <span>工艺文件</span><em>点击上传</em>
              </div>
              <div class="el-upload__tip" slot="tip">
                1: 工艺文件必须为.rar或是.zip格式压缩包文件。
                <br />
                2: 上传文件大小不得超过200M
              </div>
            </el-upload>
          </el-col>
          <el-col
            :span="4"
            v-if="
              this.temp.productType == 1 ||
              this.temp.productType == 2 ||
              this.temp.productType == 3 ||
              (this.temp.productType == 4 && this.temp.matterType == '0')
            "
          >
            <el-upload
              action="uploadUrl"
              :class="uploadDisabled"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :http-request="uploadAvatar"
              :before-upload="beforeAvatarUpload"
              :file-list="fileList"
            >
              <i class="el-icon-plus"></i>
              <div class="el-upload__tip" slot="tip">
                1: 上传正面图片
                <br />
                2: 只能上传jpg/png文件，且不超过500kb
              </div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-col>
          <el-col
            :span="4"
            v-if="
              this.temp.productType == 1 ||
              this.temp.productType == 2 ||
              this.temp.productType == 3 ||
              (this.temp.productType == 4 && this.temp.matterType == '0')
            "
          >
            <el-upload
              action="uploadUrl"
              :class="uploadDisabled1"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview1"
              :on-remove="handleRemove1"
              :http-request="uploadimgUrlR"
              :before-upload="beforeAvatarUpload1"
              :file-list="fileList1"
            >
              <i class="el-icon-plus"></i>
              <div class="el-upload__tip" slot="tip">
                1: 上传反面图片
                <br />
                2: 只能上传jpg/png文件，且不超过500kb
              </div>
              <div slot="tip" class="el-upload__tip"></div>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-col>
        </el-tab-pane>
      </el-tabs>
    </el-form>

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
  initReplaceUpdateData,
  initReplaceAddData,
  parseTime,
  randomNum,
  parseRefKeyInt,
} from "@/utils/viewCompUtil";
import { saveProductFile } from "@/api/salemage/product";
import {
  listCustomerAsRef,
  selectCustomdocDefaultPsn,
  selectAllCustomdocAsRef,
} from "@/api/customer/customer";
import { listBdPsndocAsRef } from "@/api/orgs/bdpsndoc";
import { downloadProductFile } from "@/api/pub/pub";
import { saveProductImageFile } from "@/api/orderCompMage/AproductionPub";

export default {
  name: "Productcontent",
  props: ["replace", "title", "visiable", "action", "updateRow"],
  computed: {
    ...mapGetters(["listData", "columns", "name", "userid"]),
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
      // BOM文件相关
      BOMFileList: [],
      BOMFile: null,
      // PCB文件相关
      PCBFileList: [],
      PCBFile: null,
      // 工艺文件相关
      GONGYIFileList: [],
      GONGYIFile: null,
      ///////
      uploadDisabled: "",
      dialogImageUrl: "",
      dialogVisible: false,
      picList: [],
      fileList: [],
      fileList1: [],
      uploadDisabled1: "",
      ////////
      temp: {
        pkProduct: undefined,
        name: "",
        code: "CP" + randomNum(100 * 1000),
        model: "",
        imgUrlF: "",
        imgUrlR: "",
        materialSwitch: "否",
        pkPsndoc: null,
        purchaseContacts: null,
        purchaseContactsPhone: null, // 采购联系人电话
        skillContacts: null,
        skillContactsPhone: null, // 技术联系人电话
        smt: null,
        dip: null,
        isinstal: "0",
        instalMin: null,
        istest: "0",
        productType: 1, //产品下单
        matterType: "1", //物料下单
        encapsulation: "", //封装
        brand: "", //品牌
        explains: "", //说明
        testMin: null,
        isaging: "0",
        agingMin: null,
        defense: "0",
        defenseArea: null,
        sealTechnics: "1",
        materialSource: "1",
        exeStandard: "0",
        steelMeshSource: "0",
        ispcb: "否",
        pcbSource: "1",
        pcbLong: null,
        pcbWide: null,
        pcbThick: 1.6,
        pcbResistColor: "绿色",
        pcbCharColor: "白色",
        pcbResistCover: "0",
        pcbPadSpary: "0",
        pcbCopperThick: "0",
        pcbFloors: 2, // 板子层数-add
        pcbFrTg: "", // FR-4 TG值-add
        pcbBoardBrand: "", // 板材品牌-add
        pcbMinHole: "", // 最小孔径-add
        pcbImpedance: "", // 阻抗-add
        pcbResinPlugHole: "0", // 树脂塞孔0不需要1需要-add
        pcbHypotenuse: "0", // 金（锡）手指倒斜边0不需要1需要-add
        pkCustomer: null,
        orderNumber: null,
        bomFilename: "",
        bomFilefullname: "",
        pcbFilename: "",
        pcbFilefullname: "",
        craftFilename: "",
        craftFilefullname: "",
        ismakeTool: "否",
        makeSteelMesh: "2",
        makeDip: "0",
        makeTest: "2",
        makeDefense: "2",
        makeAging: "2",
        technicsState: 20,
        creator: "",
        creatorShow: this.name,
        creationtime: parseTime(new Date()),
        modifier: "",
        modifierShow: this.name,
        modifiedtime: parseTime(new Date()),
        dr: 0,
        ts: parseTime(new Date()),
      },

      // 页面填写数据规则校验
      rules: {
        // 订单数量
        // orderNumber: [
        //   {required: true, message: '订单数量不能为空', trigger: 'blur' },
        //   {validator: checkNumberAsInt, trigger: 'blur' }
        // ],
        // 组装时间
        instalMin: [{ validator: checkNumberAsInt, trigger: "blur" }],
        // 测试时间
        testMin: [{ validator: checkNumberAsInt, trigger: "blur" }],
        // 老化时间
        agingMin: [{ validator: checkNumberAsInt, trigger: "blur" }],
        // 三防面积
        defenseArea: [{ validator: checkNumberAsInt, trigger: "blur" }],
        // 产品名称
        name: [
          { required: true, message: "产品名称不能为空", trigger: "blur" },
          // {validator: (rule, value, callback) => {
          //   if (value && value.endsWith('板')) {
          //     callback()
          //   } else {
          //     return callback(new Error('名称格式错误,请以xx板格式为标准'))
          //   }
          // }, trigger: 'blur' }
        ],
      },
      yesOrNoOption: [
        { value: "0", label: "否" },
        { value: "1", label: "是" },
      ],
      sealTechnicsOption: [
        // 焊接工艺
        { value: "0", label: "无铅" },
        { value: "1", label: "有铅" },
        { value: "2", label: "RoSH" },
        { value: "3", label: "无" },
      ],
      //产品类别
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
      materialSourceOption: [
        // 物料来源
        { value: "1", label: "甲方提供" },
        { value: "2", label: "乙方提供" },
        { value: "3", label: "部分甲方提供" },
      ],
      exeStandardOption: [
        // 执行标准
        { value: "0", label: "民用" },
        { value: "1", label: "医疗" },
        { value: "2", label: "军工宇航" },
        { value: "3", label: "工业" },
      ],
      steelMeshSourceOption: [
        // 钢网来源
        { value: "0", label: "无" },
        { value: "1", label: "甲方提供" },
        { value: "2", label: "乙方提供" },
      ],
      pcbThickOption: [
        // 板子厚度
        { value: 0.4, label: "0.4" },
        { value: 0.6, label: "0.6" },
        { value: 0.8, label: "0.8" },
        { value: 1.0, label: "1.0" },
        { value: 1.2, label: "1.2" },
        { value: 1.6, label: "1.6" },
        { value: 2.0, label: "2.0" },
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
      technicsStateOprion: [
        { value: 0, label: "自由态" },
        { value: 20, label: "已申请" },
        { value: 21, label: "工艺审核中" },
        { value: 22, label: "工艺审核完成" },
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
      // 客户信息参照
      customerOption: [],
      // 客户人员档案信息参照
      customdocOprion: [],
      // 人员信息参照
      psndocOption: [],
    };
  },
  watch: {
    visiable() {
      this.contentVisiable = this.visiable;
      // 录入事件
      if (this.title === "录入") {
        this.restTemp();
        this.temp.creatorShow = this.name;
      }
      // 修改事件
      if (this.title === "修改" && this.updateRow) {
        this.temp = this.updateRow;
        this.temp.modifier = this.name;
        this.initCustomdocDefaultPsn();
        if (this.updateRow.bomFilename) {
          let BOMFileName = {
            name: this.updateRow.bomFilename,
            fullName: this.updateRow.bomFilefullname,
          };
          this.BOMFileList = [BOMFileName];
        }
        if (this.updateRow.pcbFilename) {
          let PCBFileName = {
            name: this.updateRow.pcbFilename,
            fullName: this.updateRow.pcbFilefullname,
          };
          this.PCBFileList = [PCBFileName];
        }
        if (this.updateRow.craftFilename) {
          let CRAFTFileName = {
            name: this.updateRow.craftFilename,
            fullName: this.updateRow.craftFilefullname,
          };
          this.GONGYIFileList = [CRAFTFileName];
        }

        if (this.temp.imgUrlF) {
          let imgUrlFName = {
            name: this.updateRow.PRODUCT_IMAGE_FILE_NAME,
            url: process.env.BASE_API + "/" + this.updateRow.imgUrlF,
          };
          this.fileList = [imgUrlFName];
          this.uploadDisabled = "disabled";
        }
        if (this.temp.imgUrlR) {
          let imgUrlRName = {
            name: this.updateRow.PRODUCT_IMAGE_FILE_NAME,
            url: process.env.BASE_API + "/" + this.updateRow.imgUrlR,
          };
          this.fileList1 = [imgUrlRName];
          this.uploadDisabled1 = "disabled";
        }
      }
      // 查看事件
      if (this.title === "查看" && this.updateRow) {
        this.temp = this.updateRow;
        this.temp.modifier = this.name;
        this.initCustomdocDefaultPsn();
        if (this.updateRow.bomFilename) {
          let BOMFileName = {
            name: this.updateRow.bomFilename,
            fullName: this.updateRow.bomFilefullname,
          };
          this.BOMFileList = [BOMFileName];
        }
        if (this.updateRow.pcbFilename) {
          let PCBFileName = {
            name: this.updateRow.pcbFilename,
            fullName: this.updateRow.pcbFilefullname,
          };
          this.PCBFileList = [PCBFileName];
        }
        if (this.updateRow.craftFilename) {
          let CRAFTFileName = {
            name: this.updateRow.craftFilename,
            fullName: this.updateRow.craftFilefullname,
          };
          this.GONGYIFileList = [CRAFTFileName];
        }

        if (this.temp.imgUrlF) {
          let imgUrlFName = {
            name: this.updateRow.PRODUCT_IMAGE_FILE_NAME,
            url: process.env.BASE_API + "/" + this.updateRow.imgUrlF,
          };
          this.fileList = [imgUrlFName];
          this.uploadDisabled = "disabled";
        }
        if (this.temp.imgUrlR) {
          let imgUrlRName = {
            name: this.updateRow.PRODUCT_IMAGE_FILE_NAME,
            url: process.env.BASE_API + "/" + this.updateRow.imgUrlR,
          };
          this.fileList1 = [imgUrlRName];
          this.uploadDisabled1 = "disabled";
        }
      }
    },
  },
  created() {
    // 初始客户信息参照
    listCustomerAsRef().then((response) => {
      this.customerOption = response.object;
      parseRefKeyInt(this.customerOption);
    });
    // 初始人员信息参照
    let psndocRefParam = { pkPsntypeName: "销售人员" };
    listBdPsndocAsRef(psndocRefParam).then((response) => {
      this.psndocOption = response.object;
      parseRefKeyInt(this.psndocOption);
    });
  },
  methods: {
    /////////
    handleRemove(file, fileList) {
      this.uploadDisabled = "";
      this.temp.imgUrlF = "";
    },
    uploadAvatar(item) {
      var type = "0";
      let fd = new FormData(); //通过form数据格式来传
      fd.append("file", item.file); //传文件
      fd.append("type", type);
      saveProductImageFile(fd).then((response) => {
        // console.log(response);
        if (response.message == "操作成功") {
          this.uploadDisabled = "disabled";
          this.temp.imgUrlF = response.object.IMAGE_REF_FILE_PATH;
        }
      });
    },
    beforeAvatarUpload(file) {},
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    /////////
    handleRemove1(file, fileList) {
      this.uploadDisabled1 = "";
      this.temp.imgUrlR = "";
    },
    uploadimgUrlR(item) {
      var type = "1";
      let fd = new FormData(); //通过form数据格式来传
      fd.append("file", item.file); //传文件
      fd.append("type", type);
      saveProductImageFile(fd).then((response) => {
        // console.log(response);
        if (response.message == "操作成功") {
          this.uploadDisabled1 = "disabled";
          this.temp.imgUrlR = response.object.IMAGE_REF_FILE_PATH_R;
        }
      });
    },
    beforeAvatarUpload1(file) {},
    handlePictureCardPreview1(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    //////////
    // PCB开关变化
    pcbSwitch() {
      if (this.temp.ispcb && this.temp.ispcb === "否") {
        this.temp.pcbSource = "1";
      }
      if (this.temp.ispcb && this.temp.ispcb === "是") {
        this.temp.pcbSource = "2";
      }
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
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    BOMFileChange(file, fileList) {
      // 记录BOM文件
      this.BOMFile = file;
    },
    BOMFileRemove(file, fileList) {
      // BOM文件删除
      this.BOMFile = null;
    },
    PCBFileChange(file, fileList) {
      // 记录PCB文件
      this.PCBFile = file;
    },
    PCBFileRemove(file, fileList) {
      // PCB文件删除
      this.PCBFile = null;
    },
    GONGYIFileChange(file, fileList) {
      // 记录工艺文件
      this.GONGYIFile = file;
    },
    GONGYIFileRemove(file, fileList) {
      // 工艺文件删除
      this.GONGYIFile = null;
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
      this.$confirm("是否确定操作该项?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        // 确定保存回调Dialog
        let formData = new FormData();
        // if (this.title === '录入' && (this.BOMFile == null || this.PCBFile == null || this.GONGYIFile == null)) {
        if (
          this.title === "录入" &&
          (this.BOMFile == null || this.PCBFile == null)
        ) {
          this.$message.warning("上传文件不完整!请选择需要上传的文件。");
          return;
        } else {
          if (this.BOMFile) {
            formData.append(`bomfile`, this.BOMFile.raw);
          }
          if (this.PCBFile) {
            formData.append(`pcbfile`, this.PCBFile.raw);
          }
          if (this.GONGYIFile) {
            formData.append(`gongyifile`, this.GONGYIFile.raw);
          }
          formData.append(`productCode`, this.temp.code);
        }

        this.$refs.dataForm
          .validate((valid) => {
            if (valid) {
              // 保存上传的文件
              saveProductFile(formData).then((response) => {
                if (response.object) {
                  this.temp.bomFilename = response.object.BOM_FILE_NAME;
                  this.temp.bomFilefullname =
                    response.object.BOM_FILE_FULL_NAME;
                  this.temp.pcbFilename = response.object.PCB_FILE_NAME;
                  this.temp.pcbFilefullname =
                    response.object.PCB_FILE_FULL_NAME;
                  this.temp.craftFilename = response.object.CRAFT_FILE_NAME;
                  this.temp.craftFilefullname =
                    response.object.CRAFT_FILE_FULL_NAME;

                  const actTemp = this.temp;
                  if (this.action) {
                    // 处理PCB来源
                    if (actTemp.ispcb === "否") {
                      actTemp.pcbSource = "1";
                    }
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

                    this.$message({
                      type: "success",
                      message: "操作成功!",
                    });
                    initReplaceUpdateData(actTemp, this.replace, this.userid);
                    this.action(actTemp).then((response) => {
                      if (response.primary) {
                        actTemp.pkProduct = response.primary;
                      }
                      if (response.success) {
                        initReplaceAddData(actTemp, this.replace, this.name);
                        this.$store.commit("HANDLE_LISTVIEW_DATA", actTemp);
                        this.$emit("close", actTemp);
                        this.$emit("refreshList", null);
                        // location.reload();
                      } else {
                        this.$message({
                          message: `操作失败:${response.message}`,
                          type: "error",
                        });
                      }
                    });

                    // this.$message({ message: '操作成功', type: 'success' })
                    // this.$emit('close', actTemp)
                    // this.$emit('refreshList', null)
                  }
                }
              });
            } else {
              this.$message.warning("表单验证未通过!");
              return false;
            }
          })
          
      }).catch(() => {
            this.$message({
              type: "info",
              message: "已取消操作",
            });
          });
      
    },
    // 选择客户信息后 级联带出默认采购联系人及技术联系人
    customerChange() {
      let queryParam = { pkCustomer: this.temp.pkCustomer };
      selectAllCustomdocAsRef(queryParam).then((response) => {
        if (response.object) {
          this.customdocOprion = response.object;

          selectCustomdocDefaultPsn(queryParam).then((response) => {
            if (response.object) {
              for (let index in response.object) {
                let custondocOne = response.object[index];
                if (custondocOne && custondocOne.customtype === "1") {
                  // 采购联系人
                  this.temp.purchaseContacts = custondocOne.pkCustomdoc + "";
                  this.temp.purchaseContactsPhone = custondocOne.telnum;
                }
                if (custondocOne && custondocOne.customtype === "2") {
                  // 技术联系人
                  this.temp.skillContacts = custondocOne.pkCustomdoc + "";
                  this.temp.skillContactsPhone = custondocOne.telnum;
                }
              }
            }
          });
        }
      });

      let customerOption = this.customerOption;
      let pkCustomer = this.temp.pkCustomer;
      customerOption.forEach((element) => {
        if (element && element.value === pkCustomer) {
          this.temp.pkPsndoc = element.pkPsndoc;
        }
      });
    },
    // 选择联系人后带出联系人电话
    customdocContactsChange(type) {
      let customdocOprion = this.customdocOprion;
      // 采购联系人
      if ("purchase" === type) {
        let purchaseContacts = this.temp.purchaseContacts;
        for (let index in customdocOprion) {
          if (
            customdocOprion[index] &&
            purchaseContacts == customdocOprion[index].value
          ) {
            this.temp.purchaseContactsPhone = customdocOprion[index].defStr;
          }
        }
      }
      // 技术联系人
      if ("skill" === type) {
        let skillContacts = this.temp.skillContacts;
        for (let index in customdocOprion) {
          if (
            customdocOprion[index] &&
            skillContacts == customdocOprion[index].value
          ) {
            this.temp.skillContactsPhone = customdocOprion[index].defStr;
          }
        }
      }
    },
    // 初始客户联系人参照
    initCustomdocDefaultPsn() {
      let queryParam = { pkCustomer: this.temp.pkCustomer };
      selectAllCustomdocAsRef(queryParam).then((response) => {
        if (response.object) {
          this.customdocOprion = response.object;
          parseRefKeyInt(this.customdocOprion);
        }
      });
    },
    restTemp() {
      // 刷新本界面的数据
      this.temp = {
        pkProduct: undefined,
        name: "",
        code: "CP" + randomNum(100 * 1000),
        model: "",
        imgUrlF: "",
        imgUrlR: "",
        pkPsndoc: null,
        purchaseContacts: null,
        skillContacts: null,
        smt: null,
        dip: null,
        materialSwitch: "否",
        isinstal: "0",
        instalMin: null,
        istest: "0",
        testMin: null,
        isaging: "0",
        agingMin: null,
        defense: "0",
        defenseArea: null,
        sealTechnics: "1",
        materialSource: "1",
        exeStandard: "0",
        steelMeshSource: "0",
        ispcb: "否",
        pcbSource: "1",
        pcbLong: null,
        pcbWide: null,
        pcbThick: 1.6,
        productType: 1, //产品下单
        matterType: "1", //物料下单
        encapsulation: "", //封装
        brand: "", //品牌
        explains: "", //说明
        pcbResistColor: "绿色",
        pcbCharColor: "白色",
        pcbResistCover: "0",
        pcbPadSpary: "0",
        pcbCopperThick: "0",
        pcbFloors: 2, // 板子层数-add
        pcbFrTg: "", // FR-4 TG值-add
        pcbBoardBrand: "", // 板材品牌-add
        pcbMinHole: "", // 最小孔径-add
        pcbImpedance: "", // 阻抗-add
        pcbResinPlugHole: "0", // 树脂塞孔0不需要1需要-add
        pcbHypotenuse: "0", // 金（锡）手指倒斜边0不需要1需要-add
        pkCustomer: null,
        orderNumber: null,
        bomFilename: "",
        bomFilefullname: "",
        pcbFilename: "",
        pcbFilefullname: "",
        craftFilename: "",
        craftFilefullname: "",
        ismakeTool: "否",
        makeSteelMesh: "2",
        makeDip: "0",
        makeTest: "2",
        makeDefense: "2",
        makeAging: "2",
        technicsState: 20,
        creator: "",
        creatorShow: this.name,
        creationtime: parseTime(new Date()),
        modifier: "",
        modifierShow: this.name,
        modifiedtime: parseTime(new Date()),
        dr: 0,
        ts: parseTime(new Date()),
      };
      this.BOMFileList = [];
      this.BOMFile = null;
      this.PCBFileList = [];
      this.PCBFile = null;
      this.GONGYIFileList = [];
      this.GONGYIFile = null;
      this.fileList = [];
      this.fileList1 = [];
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
.disabled /deep/ .el-upload--picture-card {
  display: none;
}

/deep/ .el-upload-dragger {
  width: 130px;
  height: 30px;
  background: #409eff;
  border: solid 1px #409eff;
  margin-top: 50px;
}
/deep/ .el-upload__tip {
  width: 130px;
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
</style>
