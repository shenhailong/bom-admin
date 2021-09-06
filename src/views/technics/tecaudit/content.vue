<template>
  <div>
    <el-dialog
      :title="title"
      :visible.sync="contentVisiable"
      @close="closeDialog"
      width="83%"
    >
      <el-form
        :inline="true"
        ref="dataForm"
        :disabled="title == '查看'"
        :model="temp"
        :rules="rules"
        size="mini"
        label-position="left"
        label-width="90px"
      >
        <!--基本信息-->
        <el-tabs type="border-card">
          <el-tab-pane label="基本信息">
            <el-form-item label="产品名称" prop="name">
              <el-input v-model="temp.name" :disabled="false"></el-input>
            </el-form-item>
            <el-form-item label="产品编码" prop="code">
              <el-input v-model="temp.code" :disabled="false"></el-input>
            </el-form-item>
            <el-form-item label="产品型号" prop="model">
              <el-input v-model="temp.model" :disabled="false"></el-input>
            </el-form-item>
            <!--  <el-form-item label="销售负责人" prop="pkPsndocShow">
              <el-input v-model="temp.pkPsndocShow"  :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="创建时间" prop="creationtime">
              <el-input v-model="temp.creationtime" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="修改人" prop="modifierShow">
              <el-input v-model="temp.modifierShow" :disabled="true"></el-input>
            </el-form-item> -->
            <!-- <el-form-item label="最后修改时间" prop="modifiedtime">
              <el-input v-model="temp.modifiedtime" :disabled="true"></el-input>
            </el-form-item> -->
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
            <!-- <el-form-item label="单据状态" prop="technicsState">
              <el-select v-model="temp.technicsState" placeholder="请选择" :disabled="true">
                <el-option
                  v-for="item in technicsStateOprion"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item> -->
          </el-tab-pane>
        </el-tabs>

        <!--客户信息-->
        <br />
        <!-- <el-tabs type="border-card">
          <el-tab-pane label="客户信息">

            <el-form-item label="客户" prop="pkCustomer">
              <el-select v-model="temp.pkCustomer" placeholder="请选择" :disabled="true">
                <el-option
                  v-for="item in customerOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="采购联系人" prop="purchaseContacts" v-if="refshCustomDocOpflag">
              <el-select v-model="temp.purchaseContacts" placeholder="请选择" :disabled="true">
                <el-option
                  v-for="item in customdocOprion"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="技术联系人" prop="skillContacts"  v-if="refshCustomDocOpflag">
              <el-select v-model="temp.skillContacts" placeholder="请选择" :disabled="true">
                <el-option
                  v-for="item in customdocOprion"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="销售负责人" prop="pkPsndoc">
              <el-select v-model="temp.pkPsndoc" placeholder="请选择" :disabled="true">
                <el-option
                  v-for="item in psndocOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

          </el-tab-pane>
        </el-tabs> -->
        <!-- 物料下单 -->
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
        <!--工艺选项-->
        <br />
        <el-tabs
          type="border-card"
          v-if="
            this.temp.productType == 1 ||
            this.temp.productType == 2 ||
            this.temp.productType == 3
          "
        >
          <el-tab-pane label="工艺选项">
            <el-form-item label="SMT焊点" prop="smt">
              <el-input
                v-model="temp.smt"
                placeholder="SMT焊点"
                :disabled="temp.productType == '4'"
              ></el-input>
            </el-form-item>
            <el-form-item label="DIP焊点" prop="dip">
              <el-input
                v-model="temp.dip"
                placeholder="DIP焊点"
                :disabled="temp.productType == '4'"
              ></el-input>
            </el-form-item>

            <el-form-item label="组装" prop="isinstal">
              <el-select
                v-model="temp.isinstal"
                placeholder="请选择"
                :disabled="temp.productType == '4'"
              >
                <el-option
                  v-for="item in yesOrNoOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              label="组装时间"
              prop="instalMin"
              v-if="this.temp.isinstal == '1'"
            >
              <!-- <el-input v-model="temp.instalMin" :disabled="temp.isinstal === '0' ? true : false"></el-input> -->
              <el-input
                v-model="temp.instalMin"
                :disabled="temp.productType == '4'"
              ></el-input>
            </el-form-item>

            <el-form-item label="测试" prop="istest">
              <el-select
                v-model="temp.istest"
                placeholder="请选择"
                :disabled="temp.productType == '4'"
              >
                <el-option
                  v-for="item in yesOrNoOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              label="测试时间"
              prop="testMin"
              v-if="this.temp.istest == '1'"
            >
              <!-- <el-input v-model="temp.testMin" :disabled="temp.istest === '0' ? true : false"></el-input> -->
              <el-input
                v-model="temp.testMin"
                :disabled="temp.productType == '4'"
              ></el-input>
            </el-form-item>

            <el-form-item label="老化" prop="isaging">
              <el-select
                v-model="temp.isaging"
                placeholder="请选择"
                :disabled="temp.productType == '4'"
              >
                <el-option
                  v-for="item in yesOrNoOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              label="老化时间"
              prop="agingMin"
              v-if="this.temp.isaging == '1'"
            >
              <!-- <el-input v-model="temp.agingMin" :disabled="temp.isaging === '0' ? true : false"></el-input> -->
              <el-input
                v-model="temp.agingMin"
                :disabled="temp.productType == '4'"
              ></el-input>
            </el-form-item>

            <el-form-item label="三防" prop="defense">
              <el-select
                v-model="temp.defense"
                placeholder="请选择"
                :disabled="temp.productType == '4'"
              >
                <el-option
                  v-for="item in yesOrNoOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item
              label="三防面积"
              prop="defenseArea"
              v-if="this.temp.defense == '1'"
            >
              <!-- <el-input v-model="temp.defenseArea" :disabled="temp.defense === '0' ? true : false"></el-input> -->
              <el-input
                v-model="temp.defenseArea"
                :disabled="temp.productType == '4'"
              ></el-input>
            </el-form-item>

            <el-form-item label="焊接工艺" prop="sealTechnics">
              <el-select
                v-model="temp.sealTechnics"
                placeholder="请选择"
                :disabled="temp.productType == '4'"
              >
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
              <el-select
                v-model="temp.materialSource"
                placeholder="请选择"
                :disabled="temp.productType == '4'"
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

            <el-form-item label="执行标准" prop="exeStandard">
              <el-select
                v-model="temp.exeStandard"
                placeholder="请选择"
                :disabled="temp.productType == '4'"
              >
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
              <el-select
                v-model="temp.steelMeshSource"
                placeholder="请选择"
                :disabled="temp.productType == '4'"
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

            <!-- <el-form-item label="特殊工艺" prop="specialTechnics">
              <el-select v-model="temp.specialTechnics" placeholder="请选择" :disabled="temp.productType=='4'">
                <el-option
                  v-for="item in specialTechnicsOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item> -->
          </el-tab-pane>
        </el-tabs>

        <br />
        <el-tabs
          type="border-card"
          v-if="
            (this.temp.steelMeshSource == '2' && this.temp.productType == 1) ||
            (this.temp.steelMeshSource == '2' && this.temp.productType == 2) ||
            (this.temp.steelMeshSource == '2' && this.temp.productType == 3)
          "
        >
          <el-tab-pane label="钢网参数">
            <el-form-item label="钢网编码" prop="steelCode">
              <el-input v-model="temp.steelCode" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="钢网分类" prop="steelType">
              <el-select
                v-model="temp.steelType"
                placeholder="请选择"
                :disabled="false"
              >
                <el-option
                  v-for="item in steelTypeOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="钢网制作方式"
              prop="steelMake"
              label-width="100px"
            >
              <el-select
                v-model="temp.steelMake"
                placeholder="请选择"
                :disabled="false"
              >
                <el-option
                  v-for="item in steelMakeOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="特殊工艺" prop="steelCraft">
              <el-select
                v-model="temp.steelCraft"
                placeholder="请选择"
                :disabled="false"
              >
                <el-option
                  v-for="item in steelCraftOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="钢网尺寸" prop="steelSize">
              <el-select
                v-model="temp.steelSize"
                placeholder="请选择"
                :disabled="false"
              >
                <el-option
                  v-for="item in steelSizeOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="钢网厚度" prop="steelMesh">
              <el-select
                v-model="temp.steelMesh"
                placeholder="请选择"
                :disabled="false"
              >
                <el-option
                  v-for="item in steelMeshOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="钢网文件上传" label-width="100px">
              <el-upload
                drag
                class="upload-demo"
                ref="steelUpload"
                :action="uploadUrl"
                :file-list="STEELFileList"
                :limit="1"
                :on-exceed="handleExceed"
                :on-change="STEELFileChange"
                :before-remove="STEELFileRemove"
                :on-preview="downloadProccessFile"
                :auto-upload="false"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">
                  <span>钢网文件</span><em>点击上传</em>
                </div>
                <!-- <div class="el-upload__tip" slot="tip">
                  1: 工艺文件必须为.rar或是.zip格式压缩包文件。
                  <br/>
                  2: 上传文件大小不得超过200M
                </div> -->
              </el-upload>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
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
            <el-form-item label="PCB来源" prop="pcbSource">
              <el-select
                v-model="temp.pcbSource"
                placeholder="请选择"
                :disabled="false"
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
            <el-form-item label="长（mm）" prop="pcbLong">
              <el-input
                v-model="temp.pcbLong"
                placeholder="单位：mm"
                @change="pubWidthLongChange('pcbLong')"
              ></el-input>
            </el-form-item>
            <el-form-item label="宽（mm）" prop="pcbWide">
              <el-input
                v-model="temp.pcbWide"
                placeholder="单位：mm"
                @change="pubWidthLongChange('pcbWide')"
              ></el-input>
            </el-form-item>

            <el-form-item label="板子厚度" prop="pcbThick">
              <el-select
                v-model="temp.pcbThick"
                placeholder="请选择"
                :disabled="false"
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
                :disabled="false"
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
                :disabled="false"
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
                :disabled="false"
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
                :disabled="false"
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
                :disabled="false"
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
                :disabled="false"
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
                :disabled="false"
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

            <el-form-item label="板子层数" prop="pcbFloors">
              <el-input
                v-model="temp.pcbFloors"
                label="请输入层"
                :disabled="false"
              ></el-input>
            </el-form-item>

            <el-form-item label="最小孔径" prop="pcbMinHole">
              <el-select
                v-model="temp.pcbMinHole"
                placeholder="请选择"
                :disabled="false"
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
                :disabled="false"
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

            <el-form-item label="树脂塞孔" prop="pcbResinPlugHole">
              <el-select
                v-model="temp.pcbResinPlugHole"
                placeholder="请选择"
                :disabled="false"
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
              label-width="120px"
            >
              <el-select
                v-model="temp.pcbHypotenuse"
                placeholder="请选择"
                :disabled="false"
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

        <br />
        <el-tabs
          type="border-card"
          v-if="this.temp.productType == 1 || this.temp.productType == 2"
        >
          <el-tab-pane label="制具参数">
            <!-- <el-form-item label="钢网制具" prop="makeSteelMesh">
              <el-select v-model="temp.makeSteelMesh" placeholder="请选择">
                <el-option
                  v-for="item in steelMeshSourceOption"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item> -->

            <el-form-item label="DIP制具" prop="makeDip">
              <el-select
                v-model="temp.makeDip"
                placeholder="请选择"
                :disabled="false"
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

            <el-form-item label="测试制具" prop="makeTest">
              <el-select
                v-model="temp.makeTest"
                placeholder="请选择"
                :disabled="false"
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

            <el-form-item label="三防制具" prop="makeDefense">
              <el-select
                v-model="temp.makeDefense"
                placeholder="请选择"
                :disabled="false"
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

            <el-form-item label="老化制具" prop="makeAging">
              <el-select
                v-model="temp.makeAging"
                placeholder="请选择"
                :disabled="false"
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

        <!--附件上传-->
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
            <!--BOM文件-->
            <el-col
              :span="5"
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
              <!-- btn -->
              <br />
              <el-button type="primary" plain size="small" @click="openBomTable"
                >查看物料解析</el-button
              >
              <!--//btn  -->
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
                  <span>PCB文件</span><em>点击上传</em>
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
            <el-table :data="allBillOfMaterialList" border style="width: 100%">
              <el-table-column
                label="物料主键"
                prop="pkOfMaterial"
                width="120"
              ></el-table-column>
              <el-table-column
                label="物料编号"
                prop="materieCode"
                width="120"
              ></el-table-column>
              <el-table-column
                label="完整型号"
                prop="materielName"
                width="120"
              ></el-table-column>
              <el-table-column
                label="需求规格"
                prop="materielSpecifications"
                width="120"
              ></el-table-column>
              <el-table-column
                label="封装"
                prop="packaging"
                width="120"
              ></el-table-column>
              <el-table-column
                label="单位"
                prop="unit"
                width="100"
              ></el-table-column>
              <el-table-column
                label="物料类型"
                prop="materieType"
                width="100"
              ></el-table-column>
              <el-table-column
                label="品牌"
                prop="brand"
                width="120"
              ></el-table-column>
              <el-table-column
                label="位号"
                prop="bitNum"
                width="120"
              ></el-table-column>
              <el-table-column
                label="数量"
                prop="num"
                width="100"
              ></el-table-column>
              <el-table-column
                label="PDF"
                prop="pdfLink"
                width="120"
              ></el-table-column>
              <el-table-column
                label="备注"
                prop="note"
                width="120"
              ></el-table-column>
              
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </el-form>

      <br />
      <el-form>
        <!-- <el-form-item label="物料信息" prop="showMaterielData" label-width="200px">
          <el-switch v-model="showMaterielData"></el-switch>
        </el-form-item>
        <el-tabs type="border-card" v-if="showMaterielData">
          <el-tab-pane label="物料信息">
            <el-table
            :data="temp.materielPoList"
            border
            style="width: 100%">
            <el-table-column prop="pkMateriel" v-if="false"></el-table-column>
            <el-table-column prop="pkProduct" v-if="false"></el-table-column>
            <el-table-column prop="pkPurchaseQuote" v-if="false"></el-table-column>
            <el-table-column label="序号" prop="rowNum" width="120"></el-table-column>
            <el-table-column label="物料类型" prop="itemType" width="120"></el-table-column>
            <el-table-column label="型号" prop="model" width="120"></el-table-column>
            <el-table-column label="物料名称" prop="materialName" width="120"></el-table-column>
            <el-table-column label="存货全名" prop="materialFullname" width="120"></el-table-column>
            <el-table-column label="存货型号" prop="potting" width="120"></el-table-column>
            <el-table-column label="存货规格" prop="norms" width="120"></el-table-column>
            <el-table-column label="位号" prop="placeNumber" width="120"></el-table-column>
            <el-table-column label="焊点数" prop="weldingNumber" width="120"></el-table-column>
            <el-table-column label="备注" prop="memo" width="120"></el-table-column>
            <el-table-column label="品牌" prop="brand" width="120"></el-table-column>
            <el-table-column label="单位" prop="usegUnit" width="120"></el-table-column>
            <el-table-column label="用量" prop="usageNum" width="120"></el-table-column>
            <el-table-column label="总用量" prop="usageTotal" width="120"></el-table-column>
            <el-table-column label="配料数量" prop="batchingNumber" width="120"></el-table-column>
            <el-table-column label="领料数量" prop="pickingNumber" width="120"></el-table-column>
            <el-table-column label="退料数量" prop="backingNumber" width="120"></el-table-column>
            <el-table-column label="采购单价" prop="purchaseUnitPrice" width="120"></el-table-column>
            <el-table-column label="采购总价" prop="purchaseTotalPrice" width="120"></el-table-column>

            <el-table-column label="图片预览" prop="itemType" width="100">
              <template slot-scope="scope">
                <div class="demo-image__preview">
                  <el-image
                    style="width: 80px; height: 80px"
                    :src="scope.row.previewUrlShow"
                    :preview-src-list="scope.row.previewUrlListShow">
                  </el-image>
                </div>
              </template>
            </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs> -->
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="sureDialog" v-if="title != '查看'"
          >保 存</el-button
        >
      </span>
    </el-dialog>
    <!-- 物料解析 表格 -->
    <div v-if="bomTableVisible">
      <el-dialog
        title="物料解析"
        :visible.sync="bomTableVisible"
        width="1428px"
        :before-close="bomTableHandleClose"
        top="1%"
        :close-on-press-escape="false"
        :close-on-click-modal="false"
      >
        <div>
          <BomTable
            :file-res="fileRes"
            :pk-product="temp.pkProduct"
            :action="'look'"
            v-on:complete="bomTableHandleClose"
          ></BomTable>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            @click="bomTableVisible = false"
            size="small"
            >关 闭</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
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
  listCustomerAsRef,
  selectCustomdocDefaultPsn,
  selectAllCustomdocAsRef,
} from "@/api/customer/customer";
import { saveProductFile } from "@/api/salemage/product";
import { downloadProductFile } from "@/api/pub/pub";
import { listBdPsndocAsRef } from "@/api/orgs/bdpsndoc";
import { selectPurchaseMaterielByPkProduct } from "@/api/technics/tecaudit";
import { saveProductImageFile } from "@/api/orderCompMage/AproductionPub";
import BomTable from "@/components/viewcomp/BomTable";
import axios from "axios";
import request from '@/utils/request';
export default {
  name: "Tecauditcontent",
  props: ["replace", "title", "visiable", "action", "updateRow"],
  components: { BomTable },
  computed: {
    ...mapGetters(["listData", "columns"]),
  },
  data() {
    // 整数类型校验
    let checkNumberAsInt = (rule, value, callback) => {
      if (value || isNaN(value)) {
        // let numVal = Number.parseFloat(value)
        // if (numVal && Number.isFinite(numVal) && Number.isInteger(numVal)) {
        //   callback()
        // } else {
        //   return callback(new Error('订单数量必须为整数数字类型'))
        // }
        let re = /^[0-9]+.?[0-9]*/;
        if (!re.test(value)) {
          return callback(new Error("订单数量必须为整数数字类型"));
        } else {
          callback();
        }
      } else {
        callback();
      }
    };
    return {
      fileRes: null,
      bomTableVisible: false,
      contentVisiable: false, // dialog 显示框
      showMaterielData: false, // 是否显示物料信息
      uploadUrl: process.env.BASE_API + "/", // 上传地址
      // BOM文件相关
      BOMFileList: [],
      ///////
      uploadDisabled: "",
      dialogImageUrl: "",
      dialogVisible: false,
      picList: [],
      fileList: [],
      fileList1: [],
      uploadDisabled1: "",
      ////////
      BOMFile: null,
      // PCB文件相关
      PCBFileList: [],
      PCBFile: null,
      // 工艺文件相关
      GONGYIFileList: [],
      GONGYIFile: null,
      //钢网文件相关
      STEELFileList: [],
      STEELFile: null,
      a1: false,
      temp: {
        pkProduct: undefined,
        name: "",
        code: "CP" + randomNum(100 * 1000),
        model: "",
        materialSwitch: "否",
        productType: 0,
        matterType: "1", //物料类别 默认为1
        encapsulation: "",
        brand: "",
        imgUrlF: "",
        imgUrlR: "",
        explain: "",
        pkPsndoc: null,
        purchaseContacts: null,
        skillContacts: null,
        smt: 0,
        dip: 0,
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
        pcbSource: "0",
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
        //钢网字段
        steelCode: "", //钢网编码
        steelType: "0", //钢网分类
        steelMake: "2", //钢网制作方式
        steelSize: "5", //钢网尺寸
        steelMesh: "1", //钢网厚度
        steelCraft: "0", //钢网特殊工艺
        steelFilename: "", //钢网文件路径
        steelFilefullname: "", //钢网文件名字
        ismakeTool: "是",
        makeSteelMesh: "1",
        makeDip: "0",
        makeTest: "1",
        makeDefense: "1",
        makeAging: "1",
        technicsState: 20,
        creator: "",
        creatorShow: "",
        creationtime: parseTime(new Date()),
        modifier: "",
        modifierShow: "",
        modifiedtime: parseTime(new Date()),
        dr: 0,
        ts: parseTime(new Date()),
        materielPoList: [],
      },
      // 页面填写数据规则校验
      rules: {
        // smt数据校验
        smt: [
          { validator: checkNumberAsInt, trigger: "blur" },
          { required: true, message: "请输入SMT焊点", trigger: "blur" },
        ],
        // dip数据校验
        dip: [
          { validator: checkNumberAsInt, trigger: "blur" },
          { required: true, message: "请输入DIP焊点", trigger: "blur" },
        ],
        // 组装时间
        instalMin: [{ validator: checkNumberAsInt, trigger: "blur" }],
        // 测试时间
        testMin: [{ validator: checkNumberAsInt, trigger: "blur" }],
        // 老化时间
        agingMin: [{ validator: checkNumberAsInt, trigger: "blur" }],
        // 三防面积
        defenseArea: [{ validator: checkNumberAsInt, trigger: "blur" }],
        // PCB长数据校验
        pcbLong: [
          // {trigger: 'blur' }
        ],
        // PCB宽校验
        pcbWide: [
          // {trigger: 'blur' }
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
      steelTypeOption: [
        // 钢网分类
        { value: "0", label: "自由态" },
        { value: "1", label: "印锡膏模板" },
        { value: "2", label: "红胶模板" },
      ],
      steelMakeOption: [
        // 钢网制作方式
        { value: "0", label: "自由态" },
        { value: "1", label: "蚀刻模板" },
        { value: "2", label: "激光模板" },
        { value: "3", label: "电铸模板" },
      ],
      steelCraftOption: [
        // 特殊工艺
        { value: "0", label: "无" },
        { value: "1", label: "阶梯模板" },
        { value: "2", label: "绑定模板" },
        { value: "3", label: "铜网" },
        { value: "4", label: "塑料模板" },
      ],
      steelSizeOption: [
        // 钢网尺寸
        { value: "0", label: "30*40" },
        { value: "1", label: "37*47" },
        { value: "2", label: "42*52" },
        { value: "3", label: "45*55" },
        { value: "4", label: "52*52" },
        { value: "5", label: "58*58" },
        { value: "6", label: "55*65" },
        { value: "7", label: "60*60" },
        { value: "8", label: "65*65" },
        { value: "9", label: "60*65" },
        { value: "10", label: "73.6*73.6" },
      ],
      steelMeshOption: [
        //钢网厚度
        { value: "0", label: "0.1mm" },
        { value: "1", label: "0.12mm" },
        { value: "2", label: "0.13mm" },
        { value: "3", label: "0.14mm" },
        { value: "4", label: "0.15mm" },
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
      technicsStateOprion: [
        { value: 0, label: "自由态" },
        { value: 20, label: "已申请" },
        { value: 21, label: "工艺审核中" },
        { value: 22, label: "工艺审核完成" },
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
      specialTechnicsOption: [
        { value: "0", label: "无特殊工艺" },
        { value: "1", label: "有特殊工艺" },
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
      //查询客户人员参照后重新刷新客户人员数据标志
      refshCustomDocOpflag: false,
      //正式库物料列表
      allBillOfMaterialList:[]
    };
  },
  watch: {
    visiable() {
      this.contentVisiable = this.visiable;
      // 审核动作
      if (this.title === "产品工艺详情" && this.updateRow) {
        this.restTemp();
        this.temp = this.updateRow;
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
        if (this.updateRow.steelFilename) {
          let STEELFileName = {
            name: this.updateRow.steelFilename,
            fullName: this.updateRow.steelFilefullname,
          };
          this.STEELFileList = [STEELFileName];
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
        // 初始客户人员参照信息
        let queryParam = { pkCustomer: this.temp.pkCustomer };
        selectAllCustomdocAsRef(queryParam).then((response) => {
          if (response.object) {
            this.customdocOprion = response.object;
            parseRefKeyInt(this.customdocOprion);
            this.refshCustomDocOpflag = true;
          }
        });
      }
      // 查看动作
      if (this.title === "查看" && this.updateRow) {
        this.restTemp();
        this.temp = this.updateRow;
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
        if (this.updateRow.steelFilename) {
          let STEELFileName = {
            name: this.updateRow.steelFilename,
            fullName: this.updateRow.steelFilefullname,
          };
          this.GONGYIFileList = [STEELFileName];
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
        // 初始客户人员参照信息
        let queryParam = { pkCustomer: this.temp.pkCustomer };
        selectAllCustomdocAsRef(queryParam).then((response) => {
          if (response.object) {
            this.customdocOprion = response.object;
            parseRefKeyInt(this.customdocOprion);
            this.refshCustomDocOpflag = true;
          }
        });

        // 预制物料信息的图片URL信息
        let queryMaterielParam = {
          pkProduct: this.temp.pkProduct,
        };
        selectPurchaseMaterielByPkProduct(queryMaterielParam).then(
          (response) => {
            if (response.success) {
              this.temp.materielPoList = response.object;
              let tempThis = this.temp;
              if (tempThis && tempThis.materielPoList) {
                let materielPoList = tempThis.materielPoList;
                for (let index in materielPoList) {
                  let dataOne = materielPoList[index];
                  if (dataOne && dataOne.previewUrl) {
                    dataOne.previewUrlShow =
                      this.uploadUrl + dataOne.previewUrl;
                    let previewUrlListShow = [dataOne.previewUrlShow];
                    dataOne.previewUrlListShow = previewUrlListShow;
                  }
                }
              }
            }
          }
        );
      }
    },
    showMaterielData(val){
      if(val&&this.temp.pkProduct){
        this.selectAllBillOfMaterialByPkId()
      }
    }
  },
  created() {
    // 初始客户信息参照
    listCustomerAsRef().then((response) => {
      this.customerOption = response.object;
      parseRefKeyInt(this.customerOption);
    });
    // 初始人员信息参照
    listBdPsndocAsRef().then((response) => {
      this.psndocOption = response.object;
      parseRefKeyInt(this.psndocOption);
    });
    this.selectAllBillOfMaterialByPkId()
  },
  mounted(){
    
  },
  methods: {
    selectAllBillOfMaterialByPkId(){
      // axios.post(process.env.BASE_API + "/technics/selectAllBillOfMaterialByPkId",{pkProduct:this.temp.pkProduct}).then(ret=>{
      //   if(ret.data.success&&ret.data.object){
      //     this.allBillOfMaterialList=ret.data.object;
      //     console.log(this.allBillOfMaterialList);
      //   }
      // })
      request({
        url: '/technics/selectAllBillOfMaterialByPkId',
        method: 'post',
        data:{pkProduct:this.temp.pkProduct}
      }).then(ret=>{
        if(ret.success&&ret.object){
          this.allBillOfMaterialList=ret.object;
          console.log(this.allBillOfMaterialList);
        }
      })
      
    },
    /////////
    handleRemove(file, fileList) {
      // console.log(fileList);
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
    handleRemove1(file, fileList1) {
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

    STEELFileChange(file, fileList) {
      //记录钢网文件
      this.STEELFile = file;
    },
    STEELFileRemove(file, fileList) {
      //钢网文件删除
      this.STEELFile = null;
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
      this.showMaterielData=false;
      this.$emit("close", null);
    },
    // PCB长宽数据格式
    pubWidthLongChange(pcblet) {
      // PCB长
      if (pcblet === "pcbLong") {
        let sourcepcbLong = Number.parseFloat(this.temp.pcbLong);
        if (isNaN(sourcepcbLong)) {
          this.temp.pcbLong = 0;
        } else {
          this.temp.pcbLong = sourcepcbLong
            .toFixed(2)
            .replace(/(\d)(?=(\d{3})+\.)/g, "$1");
        }
      }
      // PCB宽
      if (pcblet === "pcbWide") {
        let sourcepcbWide = Number.parseFloat(this.temp.pcbWide);
        if (isNaN(sourcepcbWide)) {
          this.temp.pcbWide = 0;
        } else {
          this.temp.pcbWide = sourcepcbWide
            .toFixed(2)
            .replace(/(\d)(?=(\d{3})+\.)/g, "$1");
        }
      }
    },
    sureDialog() {
      // 确定保存回调Dialog
      let formData = new FormData();
      if (
        this.title === "录入" &&
        (this.BOMFile == null ||
          this.PCBFile == null ||
          this.GONGYIFile == null)
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
        if (this.STEELFile) {
          formData.append(`steelfile`, this.STEELFile.raw);
        }
        formData.append(`productCode`, this.temp.code);
      }

      // 表单校验
      this.$refs.dataForm.validate((valid) => {
        if (valid) {
          // 保存上传的文件
          saveProductFile(formData).then((response) => {
            if (response.object) {
              this.temp.bomFilename = response.object.BOM_FILE_NAME;
              this.temp.bomFilefullname = response.object.BOM_FILE_FULL_NAME;
              this.temp.pcbFilename = response.object.PCB_FILE_NAME;
              this.temp.pcbFilefullname = response.object.PCB_FILE_FULL_NAME;
              this.temp.craftFilename = response.object.CRAFT_FILE_NAME;
              this.temp.craftFilefullname =
                response.object.CRAFT_FILE_FULL_NAME;
              this.temp.steelFilename = response.object.STEEL_FILE_NAME;
              this.temp.steelFilefullname =
                response.object.STEEL_FILE_FULL_NAME;

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

                this.$confirm("是否确定该操作?", "提示", {
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
                         this.$emit("close", null);
                        this.$emit("refreshList", null);
                        location.reload();
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
                // this.$emit('close', null)
                // this.$emit('refreshList', null)
              }
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
        pkProduct: undefined,
        name: "",
        code: "CP" + randomNum(100 * 1000),
        model: "",
        imgUrlF: "",
        imgUrlR: "",
        pkPsndoc: null,
        purchaseContacts: null,
        skillContacts: null,
        smt: 0,
        dip: 0,
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
        pcbSource: "0",
        pcbLong: null,
        materialSwitch: "否",
        productType: 0,
        matterType: "1", //物料类别 默认为1
        encapsulation: "",
        brand: "",
        explain: "",
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
        //钢网字段
        steelCode: "", //钢网编码
        steelType: "0", //钢网分类
        steelMake: "2", //钢网制作方式
        steelSize: "5", //钢网尺寸
        steelMesh: "1", //钢网厚度
        steelCraft: "0", //钢网特殊工艺
        steelFilename: "", //钢网文件路径
        steelFilefullname: "", //钢网文件名字
        ismakeTool: "是",
        makeSteelMesh: "1",
        makeDip: "0",
        makeTest: "1",
        makeDefense: "1",
        makeAging: "1",
        technicsState: 20,
        creator: "",
        creatorShow: "",
        creationtime: parseTime(new Date()),
        modifier: "",
        modifierShow: "",
        modifiedtime: parseTime(new Date()),
        dr: 0,
        ts: parseTime(new Date()),
        materielPoList: [],
      };
      this.BOMFileList = [];
      this.BOMFile = null;
      this.PCBFileList = [];
      this.PCBFile = null;
      this.GONGYIFileList = [];
      this.GONGYIFile = null;
      this.STEELFileList = [];
      this.STEELFile = null;
      this.fileList = [];
      this.fileList1 = [];
    },
    //打开物料解析界面
    openBomTable() {
      var _this = this;
      var _param = {
        pkProduct: 2,
        page: 1,
        limit: 100000,
      };
      axios
        .post(
          process.env.BASE_API +
            "/technics/selectAllBillOfMaterialByPkIdAsPage",
          _param
        )
        .then(function (ret) {
          _this.fileRes = ret.data;
          _this.bomTableVisible = true;
        });
      //
    },
    bomTableHandleClose() {
      this.bomTableVisible = false;
    },
  },
};
</script>

<style lang="scss" type="text/scss" scoped>
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
  margin-top: 40px;
}

/deep/ .el-upload__tip {
  width: 130px;
}

/deep/ .el-upload-dragger .el-icon-upload {
  font-size: 30px;
  color: #fffeff;
  float: left;
  margin: -10px 3px 16px;
  line-height: 50px;
}

/deep/ .el-upload__text span {
  color: white;
  margin-top: 7px;
  display: inline-block;
}
</style>
