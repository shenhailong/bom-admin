<template>
  <div>
    <!-- 物料采购 -->
    <el-row>
      <el-col :span="24">
        <el-row>
          <el-col :span="2">
            <!-- 选择合同及合同子表中的产品信息 -->
            <OrderConstractProductSel @refreshTableList="refreshTableList">
            </OrderConstractProductSel>
          </el-col>
          <el-col :span="4" :offset="3">
            <el-tag class="ordre-tag"
              >当前选择订单合同:{{
                selectedConstractData == null
                  ? ""
                  : selectedConstractData.contractNo
              }}</el-tag
            >
          </el-col>
          <el-col :span="8" class="button" :offset="0">
            <btns @label="label"></btns>
            <!-- <el-button
              size="mini"
              type="primary"
              plain
              @click="queryViewListDataByWhere('0')"
              >自由态</el-button
            >
            <el-button
              size="mini"
              type="primary"
              plain
              @click="queryViewListDataByWhere('1')"
              >进行中</el-button
            >
            <el-button
              size="mini"
              type="primary"
              plain
              @click="queryViewListDataByWhere('2')"
              >已完成</el-button
            >
            <el-button
              size="mini"
              type="primary"
              plain
              @click="queryViewListDataByWhere('ALL')"
              >全部显示</el-button
            > -->
          </el-col>

          <el-col :span="14" class="icon">
            <i class="el-icon-view"><span>查看详情</span></i>
            <i class="el-icon-edit"><span>编辑</span></i>
            <i class="el-icon-delete"><span>删除</span></i>
            <i class="el-icon-finished"><span>完成采购</span></i>
            <i class="el-icon-s-promotion"><span>查看进度条</span></i>
            <i class="el-icon-bell"><span>通知钉钉</span></i>
            <i class="el-icon-tickets"><span>工艺参数</span></i>
            <i class="el-icon-folder-opened"><span>工艺文件</span></i>
            <i class="el-icon-collection"><span>查看主题</span></i>
          </el-col>
        </el-row>
        <div style="display: flex; padding: 11px; height: 60px"></div>
        <!--销售发起备忘录数据-->
        <searchs
          :visiable="visiables"
          @colsed="colsed"
          @search_ts="search_ts"
        ></searchs>
        <Table
          :columns="columns"
          :select="select"
          :top_btn="top_btn"
          :act_btn="act_btn"
          :replace="replace"
          @onButtonClick="onButtonClick"
        >
        </Table>
      </el-col>
    </el-row>

    <!--物料采购维护-->
    <ProductionFlowOrderProcurementContent
      :replace="replace"
      :visiable="content.visiable"
      :title="content.title"
      :action="content.action"
      :updateRow="content.updateRow"
      :pkProductOrder="content.pkProductOrder"
      @close="closeContent"
    >
    </ProductionFlowOrderProcurementContent>

    <!--送审框Dialog通知钉钉-->
    <CommitDialog
      :visiable="commitDialogData.visiable"
      :paramData="commitDialogData.paramData"
      @close="closeCommitDialog"
      @commitMethod="executeDindDingInterface"
    ></CommitDialog>

    <!--订单字表详情数据-->
    <OrderProductInfoDetails
      :visiable="orderProductInfoDetails.visiable"
      :pkProductOrderB="orderProductInfoDetails.pkProductOrderB"
      @close="
        () => {
          orderProductInfoDetails.visiable = false;
        }
      "
    >
    </OrderProductInfoDetails>

    <!--进度条-->
    <ProductionFlowStepsView
      :visiable="stepsInfo.visiable"
      :pkProductOrderB="stepsInfo.pkProductOrderB"
      @close="() => (stepsInfo.visiable = false)"
    >
    </ProductionFlowStepsView>

    <!--工艺审核详情Dialog-->
    <ProductionFlowOrderAuditFileDetails
      :replace="replace"
      :visiable="productionFlowOrderAuditFileDetails.visiable"
      :title="content.title"
      :action="content.action"
      :updateRow="content.updateRow"
      :pkProductOrder="content.pkProductOrder"
      @close="closeproductionFlowOrderAuditFileDetailst"
    >
    </ProductionFlowOrderAuditFileDetails>

    <!--订单字表详情数据-->
    <!-- <Cont
	    :visiable="cont.visiable"
		:pkProductOrderB="orderProductInfoDetails.pkProductOrderB"
	    @close="() => { cont.visiable = false }">
	  </Cont> -->

    <!-- -->

    <!-- 弹框 -->
    <el-dialog :visible.sync="contentVisiable" title="物料采购" width="88%">
      <el-form
        :inline="true"
        size="mini"
        :model="temp"
        label-position="left"
        label-width="90px"
      >
        <!--基本信息-->
        <el-tabs type="border-card">
          <el-tab-pane label="基本信息">
            <el-form-item label="产品名称" prop="name">
              <el-input
                v-model="temp.name"
                placeholder="请输入产品名称"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="产品编码" prop="code">
              <el-input
                v-model="temp.code"
                placeholder="请输入产品编码"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="产品型号" prop="model">
              <el-input
                v-model="temp.model"
                placeholder="请输入产品型号"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="业务员" prop="pkPsndocShow">
              <el-input
                v-model="temp.pkPsndocShow"
                placeholder="请输入业务员"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="创建时间" prop="creationtime">
              <el-input
                v-model="temp.creationtime"
                placeholder="请输入创建时间"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="修改人" prop="modifierShow">
              <el-input
                v-model="temp.modifierShow"
                placeholder="请输入修改人"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <!-- <el-form-item label="最后修改时间" prop="modifiedtime">
		             <el-input v-model="temp.modifiedtime" :disabled="true"></el-input>
		           </el-form-item> -->
            <el-form-item label="产品类别" prop="productType">
              <el-select
                :disabled="true"
                class="el-1"
                @change="productSelct"
                v-model="temp.productType"
                placeholder="请选择产品类别"
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
            <el-form-item label="单据状态" prop="technicsState">
              <el-select
                v-model="temp.technicsState"
                placeholder="请选择单据状态"
                :disabled="true"
              >
                <el-option
                  v-for="item in technicsStateOprion"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
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
        <el-form-item
          label="物料下单"
          prop="materialSwitch"
          label-width="200px"
        >
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
              <el-input
                v-model="temp.encapsulation"
                :disabled="true"
                placeholder="请输入封装"
              ></el-input>
            </el-form-item>
            <el-form-item label="品牌" prop="brand">
              <el-input
                v-model="temp.brand"
                :disabled="true"
                placeholder="请输入品牌"
              ></el-input>
            </el-form-item>
            <el-form-item label="说明" prop="explains">
              <el-input
                v-model="temp.explains"
                :disabled="true"
                placeholder="请输入说明"
              ></el-input>
            </el-form-item>
          </el-tab-pane>
        </el-tabs>
        <!-- /////////////////////////////////////////////////////// -->
        <!--工艺选项-->
        <br />
        <el-tabs type="border-card">
          <el-tab-pane label="工艺选项">
            <el-form-item label="SMT焊点" prop="smt">
              <el-input
                v-model="temp.smt"
                placeholder="SMT焊点"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="DIP焊点" prop="dip">
              <el-input
                v-model="temp.dip"
                placeholder="DIP焊点"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="组装" prop="isinstal">
              <el-select
                class="zz1"
                v-model="temp.isinstal"
                placeholder="请选择组装"
                :disabled="true"
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
            <el-form-item label="组装时间" prop="instalMin">
              <!-- <el-input v-model="temp.instalMin" :disabled="temp.isinstal === '0' ? true : false"></el-input> -->
              <el-input
                v-model="temp.instalMin"
                placeholder="请输入组装时间"
                :disabled="true"
              ></el-input>
            </el-form-item>

            <el-form-item label="测试" prop="istest">
              <el-select
                class="zz1"
                v-model="temp.istest"
                placeholder="请选择测试"
                :disabled="true"
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
            <el-form-item label="测试时间" prop="testMin">
              <!-- <el-input v-model="temp.testMin" :disabled="temp.istest === '0' ? true : false"></el-input> -->
              <el-input
                v-model="temp.testMin"
                placeholder="请输入测试时间"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="老化" prop="isaging">
              <el-select
                class="zz1"
                v-model="temp.isaging"
                placeholder="请选择老化"
                :disabled="true"
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
            <el-form-item label="老化时间" prop="agingMin">
              <!-- <el-input v-model="temp.agingMin" :disabled="temp.isaging === '0' ? true : false"></el-input> -->
              <el-input
                v-model="temp.agingMin"
                placeholder="请输入老化时间"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="三防" prop="defense">
              <el-select
                class="zz1"
                v-model="temp.defense"
                placeholder="请选择三防"
                :disabled="true"
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
            <el-form-item label="三防面积" prop="defenseArea">
              <!-- <el-input v-model="temp.defenseArea" :disabled="temp.defense === '0' ? true : false"></el-input> -->
              <el-input
                v-model="temp.defenseArea"
                placeholder="请输入三防面积"
                :disabled="true"
              ></el-input>
            </el-form-item>
            <el-form-item label="焊接工艺" prop="sealTechnics">
              <el-select
                class="zz1"
                v-model="temp.sealTechnics"
                placeholder="请选择焊接工艺"
                :disabled="true"
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
                class="zz1"
                v-model="temp.materialSource"
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
            <el-form-item label="执行标准" prop="exeStandard">
              <el-select
                class="zz1"
                v-model="temp.exeStandard"
                placeholder="请选择执行标准"
                :disabled="true"
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
                class="zz1"
                v-model="temp.steelMeshSource"
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
            <el-form-item label="特殊工艺" prop="specialTechnics">
              <el-select
                class="zz1"
                v-model="temp.specialTechnics"
                placeholder="请选择特殊工艺"
                :disabled="true"
              >
                <el-option
                  v-for="item in specialTechnicsOption"
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
            <el-form-item label="长（mm）" prop="pcbLong">
              <el-input
                :disabled="true"
                v-model="temp.pcbLong"
                placeholder="单位：mm"
                @change="pubWidthLongChange('pcbLong')"
              ></el-input>
            </el-form-item>
            <el-form-item label="宽（mm）" prop="pcbWide">
              <el-input
                :disabled="true"
                v-model="temp.pcbWide"
                placeholder="单位：mm"
                @change="pubWidthLongChange('pcbWide')"
              ></el-input>
            </el-form-item>

            <el-form-item label="PCB来源" prop="pcbSource">
              <el-select
                class="zz1"
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
                class="zz1"
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
                class="zz1"
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
                class="zz1"
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
                class="zz1"
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
                class="zz1"
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

            <el-form-item label="板子层数" prop="pcbFloors">
              <el-input
                class="zz1"
                v-model="temp.pcbFloors"
                label="请输入板子层数"
                :disabled="true"
              ></el-input>
            </el-form-item>

            <el-form-item label="最小孔径" prop="pcbMinHole">
              <el-select
                class="zz1"
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
                class="zz1"
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
                placeholder="请选择金(锡)手指倒斜"
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

        <br />
        <el-form-item
          label="制具(默认乙方提供)"
          prop="ismakeTool"
          label-width="200px"
        >
          <el-switch
            v-model="temp.ismakeTool"
            active-value="是"
            inactive-value="否"
            :disabled="a1"
          ></el-switch>
        </el-form-item>
        <el-tabs
          type="border-card"
          v-if="temp.ismakeTool === '是' ? true : false"
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
                class="zz1"
                v-model="temp.makeDip"
                placeholder="请选择DIP制具"
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

            <el-form-item label="测试制具" prop="makeTest">
              <el-select
                class="zz1"
                v-model="temp.makeTest"
                placeholder="请选择测试制具"
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

            <el-form-item label="三防制具" prop="makeDefense">
              <el-select
                class="zz1"
                v-model="temp.makeDefense"
                placeholder="请选择三防制具"
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

            <el-form-item label="老化制具" prop="makeAging">
              <el-select
                class="zz1"
                v-model="temp.makeAging"
                placeholder="请选择老化制具"
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

        <!--附件上传-->
        <br />
        <el-tabs type="border-card">
          <el-tab-pane label="附件上传">
            <!--BOM、PCB、工艺文件下载-->
            <!--BOM文件-->
            <el-col :span="6">
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
                :disabled="title == '查看'"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text"><span>BOM文件</span></div>
              </el-upload>
            </el-col>
            <!--PCB文件-->
            <el-col :span="6">
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
                :disabled="title == '查看'"
              >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text"><span>PCB文件</span></div>
              </el-upload>
            </el-col>
            <!--工艺文件-->
            <el-col :span="6">
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
                :disabled="title == '查看'"
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
                  :on-exceed="handleExceed"
                  :on-change="PURFileChange"
                  :before-remove="PURFileRemove"
                  :limit="1"
                  :on-preview="downloadProccessFile"
                  :auto-upload="false"
                >
                  <!--  -->
                  <i class="el-icon-upload"></i>
                  <div class="el-upload__text"><span>采购报价</span></div>
                  <!-- <div class="el-upload__tip" slot="tip">
		      	  1: 上传文件大小不得超过200M
		      	</div> -->
                </el-upload>
              </el-col>
            </span>
          </el-tab-pane>
        </el-tabs>
        <!-- <br/>
			  <el-tabs type="border-card">
			    <el-tab-pane label="报价信息">
			      <el-form-item label="预计交货" prop="estimatedOverTime" label-width="110px">
			        <el-date-picker  v-model="temp.estimatedOverTime" type="date" placeholder="选择日期" @change="dateFormat()" ></el-date-picker>
			      </el-form-item>
				  <el-form-item label="需求日期" prop="materialTime"  style="margin-left:-40px;">
				    <el-date-picker  v-model="temp.materialTime" type="date" placeholder="选择日期" ></el-date-picker>
				  </el-form-item>
				  <el-form-item label="物料单价" prop="costUnitPriceNt" style="margin-left:-40px;">
				    <el-input v-model="temp.costUnitPriceNt" placeholder="请输入物料成本单价" ></el-input>
				  </el-form-item>
				  <el-form-item label="物料合计" prop="purchasePrice"  label-width="110px" >
				    <el-input v-model="temp.purchasePrice"   placeholder="请输入物料成本单价" ></el-input>
				  </el-form-item>
			      <el-form-item label="物料成本单价" prop="purchasePrice" label-width="110px">
			        <el-input v-model="temp.purchasePrice"   placeholder="请输入物料成本单价" ></el-input>
			      </el-form-item>

			      <el-form-item label="物料成本总价" prop="purchaseTotal" label-width="110px">
			        <el-input v-model="temp.purchaseTotal"  placeholder="请输入物料成本总价" ></el-input>
			      </el-form-item>

			      <el-form-item label="PCB成本单价" prop="productPcbPrice" label-width="110px">
			        <el-input v-model="temp.productPcbPrice"  placeholder="请输入PCB成本单价" ></el-input>
			      </el-form-item>

			      <el-form-item label="PCB成本总价" prop="productPcbTotal" label-width="110px">
			        <el-input v-model="temp.productPcbTotal"  placeholder="请输入PCB成本总价" ></el-input>
			      </el-form-item>
			    </el-tab-pane>
			  </el-tabs> -->
      </el-form>
      <br />
      <!--  <span slot="footer" class="dialog-footer">
		       <el-button @click="closeDialog">取 消</el-button>
		       <el-button type="primary" @click="sureDialog" v-if="title!='查看'">保 存</el-button>
		     </span> -->
    </el-dialog>
    <!--  -->

    <!-- 查看主题弹窗 -->
    <!-- <el-dialog :visible.sync="centerDialogVisible" width="48%" @closed="handleClose">
     
      <div>
        <el-table
          :data="siteRecharge"
          height="450"
          :cell-style="{ padding: '1px' }"
          :cell-class-name="yellowBg"
          style="width: 100%"
        >
          <el-table-column prop="zong" label="发表时间" width="180">
            <template slot-scope="scope">
              <span> {{ scope.row.zong }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="content" label="评论内容" align="left">
            <template slot-scope="scope">
              <span> {{ scope.row.content }}</span>
            </template>
          </el-table-column>
          <el-table-column fixed="right" label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                v-if="scope.row.sort == '0'"
                class="el-icon-top"
                @click="handleClick(scope.row)"
                type="text"
                size="small"
              ></el-button>
              <el-button
                v-if="scope.row.sort == '1'"
                class="el-icon-bottom"
                @click="handleClick1(scope.row)"
                type="text"
                size="small"
              ></el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
  
      <div class="iconRepert">
        <el-button
          v-if="this.showx == 0"
          class="showDiv"
          size="mini"
          type="primary"
          @click="showDiv"
          >开启留言</el-button
        >
        <el-button
          v-if="this.showx == 1"
          class="closeDiv"
          size="mini"
          type="info"
          @click="closeDiv"
          >关闭留言</el-button
        >
      </div>
      <div v-if="this.showx == 1">
        <div style="padding: 15px 0">
          <el-input
            :rows="5"
            :autosize="{ minRows: 5, maxRows: 10 }"
            type="textarea"
            v-model="textarea1"
          ></el-input>
        </div>
        <div style="width: 100%; padding: 15px">
          <div class="btnQ">
            <span class="bq" @click="qreport">取消</span>
          </div>
          <div class="btnF">
            <span class="bf" @click="report">发表</span>
          </div>
        </div>
      </div>
     
    </el-dialog> -->
    <drawer :drawer="drawer" @closer="drawers" :quto="siteRecharge" />
  </div>
</template>

<script>
import Table from "@/components/viewcomp/Table";
import drawer from "@/components/newtab/item/drawer"; //消息中心
import ProductionFlowOrderProcurementContent from "@/views/productionflow/OrderProcurement/content";
import OrderConstractProductSel from "@/views/productionflow/comp/OrderConstractProductSel";
import OrderProductInfoDetails from "@/views/productionflow/comp/OrderProductInfoDetails";
import CommitDialog from "@/components/Commitdingding/CommitDialog";
import ProductionFlowStepsView from "@/views/productionflow/comp/productionFlowSteps"; // 进度条
import { sendDingMsgByPsndoc } from "@/api/pub/pub"; // 调用钉钉后端API接口
import { orderSaleDoStartProccess } from "@/api/orderCompMage/orderCompMage";
// import TechnologyFileDetailsDialog from '@/views/technics/technologyfile/filedetails'
import ProductionFlowOrderAuditFileDetails from "@/views/productionflow/OrderProcurement/filedetails";
import {
  selectAllMaterielPutchaseAsPage,
  insertMaterielPurchase,
  deleteMaterielPurchaseByPks,
  updateMaterielPurchase,
} from "@/api/orderCompMage/OrderProcurement";
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
import btns from "@/components/btnselect/index"; //状态按钮
import {
  insertOrderSaleStartB,
  selectAllOrderSaleStartB,
  updateOrderSaleStartB,
} from "@/api/orderCompMage/orderStart";
import {
  listTecaudit,
  selectPurchaseMaterielByPkProduct,
} from "@/api/technics/tecaudit";
import searchs from "@/components/search/index";
///详情页
// import  Cont  from  '@/views/productionflow/OrderProcurement/content1'
export default {
  name: "ProductionFlowOrderProcurementView",
  components: {
    Table,
    ProductionFlowOrderProcurementContent,
    CommitDialog,
    OrderConstractProductSel,
    OrderProductInfoDetails,
    ProductionFlowStepsView,
    ProductionFlowOrderAuditFileDetails,
    searchs,
    btns,
    drawer,
  },
  data() {
    return {
      visiables: false,
      drawer: false, //消息显示隐藏
      content: {
        visiable: false, // 内容界面显示控制
        title: "", // 标题
        action: null, // 执行Action
        updateRow: null, // 更新时带过来的temp
        pkProductOrder: null, // 单据业务属性 合同订单主键
      },
      title:'',
      value11: "",
      options1: [
        { value: "", label: "请选择" },
        { value: "0", label: "请选择日期范围" },
        { value: "1", label: "请选择合同编号" },
        { value: "2", label: "请选择客户编号" },
        { value: "3", label: "请选择产品编号" },
        { value: "5", label: "请选择销售员" },
      ],

      contractNo: "", //合同编号
      customerCode: "", //客户编号
      constractPsnname: "", //销售负责人
      productCode: "", //产品编号
      startTime: "", //开始时间
      endTime: "", //结束时间
      options: [
        {
          value: "单据状态",
          label: "单据状态",
          children: [
            {
              value: null,
              label: "全部显示",
            },
            {
              value: "0",
              label: "自由态",
            },
            {
              value: "2",
              label: "已任领",
            },
            {
              value: "3",
              label: "采购报价完成",
            },
          ],
        },
        {
          value: "订单类型",
          label: "订单类型",
          children: [
            {
              value: "0",
              label: "普通合同",
            },
            {
              value: "1",
              label: "生产订单",
            },
            {
              value: "2",
              label: "OEM",
            },
            {
              value: "3",
              label: "DEM",
            },
            {
              value: "4",
              label: "贸易模式",
            },
          ],
        },
        {
          value: "PCB来源",
          label: "PCB来源",
          children: [
            {
              value: "0",
              label: "无",
            },
            {
              value: "1",
              label: "甲方提供",
            },
            {
              value: "2",
              label: "乙方提供",
            },
          ],
        },
        {
          value: "钢网来源",
          label: "钢网来源",
          children: [
            {
              value: "0",
              label: "无",
            },
            {
              value: "1",
              label: "甲方提供",
            },
            {
              value: "2",
              label: "乙方提供",
            },
          ],
        },
        {
          value: "物料来源",
          label: "物料来源",
          children: [
            {
              value: "0",
              label: "无",
            },
            {
              value: "1",
              label: "甲方提供",
            },
            {
              value: "2",
              label: "乙方提供",
            },
          ],
        },
      ],
      a1: false,
      value: [],
      siteRecharge: [], //主题列表
      saleTheme: "", //主题
      pkProductOrderB: "", //添加主题ID
      showx: 0, //控制评论按钮
      centerDialogVisible: false, //弹窗
      textarea1: "", //评论内容
      stepsInfo: {
        // 进度条控制相关
        visiable: false,
        pkProductOrderB: null, // 订单子表主键
      },
      //控制工艺文件维护页面打开关闭
      productionFlowOrderAuditFileDetails: {
        visiable: false,
        paramData: null,
      },
      /////
      contentVisiable: false, // dialog 显示框
      showMaterielData: false, // 是否显示物料信息
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
      //采购文件
      PURFileList: [],
      PURFile: null,
      temp: {
        pkProduct: undefined,
        name: "",
        code: "CP" + randomNum(100 * 1000),
        model: "",
        materialSwitch: "否",
        productType: 0,
        encapsulation: "",
        brand: "",
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
        pcbFloors: null, // 板子层数-add
        pcbFrTg: "", // FR-4 TG值-add
        pcbBoardBrand: "", // 板材品牌-add
        pcbMinHole: "", // 最小孔径-add
        pcbImpedance: "", // 阻抗-add
        pcbResinPlugHole: "0", // 树脂塞孔0不需要1需要-add
        pcbHypotenuse: "0", // 金（锡）手指倒斜边0不需要1需要-add
        pkCustomer: null,
        orderNumber: null,
        //文件名字
        bomFilename: "",
        bomFilefullname: "",
        pcbFilename: "",
        pcbFilefullname: "",
        craftFilename: "",
        craftFilefullname: "",
        purFilefullname: "",
        purFilename: "",

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

        costUnitPriceNt: "",
        materialTime: "",
        estimatedOverTime: "",
        constractProductNum: "",
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
        { value: "0", label: "1盎司" },
        { value: "1", label: "2盎司" },
      ],
      technicsStateOprion: [
        { value: 0, label: "自由态" },
        { value: 20, label: "已申请" },
        { value: 21, label: "工艺审核中" },
        { value: 22, label: "工艺审核完成" },
      ],
      //物料下单类别
      technicsStateOprion1: [
        { value: 0, label: "自由态" },
        { value: 1, label: "加工" },
        { value: 2, label: "OEM" },
        { value: 3, label: "ODM" },
        { value: 4, label: "物料" },
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
      /////

      columns: [
        { prop: "pkProductOrderB", label: "合同子表主键", show: false },
        { prop: "materialTime", label: "物料需求日期", width: "130" },
        { prop: "scheduledtime", label: "预计交货日期", width: "100" },
        { prop: "contractNo", label: "合同编号", width: "80" },
        { prop: "productCode", label: "产品编号", width: "120" },
        { prop: "productName", label: "产品名称", width: "150" },
        { prop: "constractProductNum", label: "数量", width: "50" },
        { prop: "constractPsnname", label: "业务员", width: "60" },
        { prop: "billState", label: "单据状态", width: "80" },
        { prop: "chargePsnShow", label: "经办人", width: "80" },
        { prop: "productType", label: "产品类型", width: "80" },
        { prop: "pkOmgMaterielPurchase", label: "物料采购主键", primary: true },

        { prop: "estimatedOverTime", label: "预计齐料时间", width: "110" },
        { prop: "productionState", label: "生产状态", width: "80" },
        { prop: "costUnitPriceNt", label: "成本单价", width: "80" },
        { prop: "steelPrice", label: "钢网价格", width: "80" },
        { prop: "makePrice", label: "制具总价", width: "80" },
        // {prop: 'finishAmountNt', label: '成品金额（未税）', width: '150'},
        // { prop: "priceTaxTotal", label: "价税合计", width: "80" },

        { prop: "model", label: "型号", width: "70" },
        // {prop: 'taxUnitPrice', label: '产品未税单价',width:'110'},
        // {prop: 'taxtotalPrice', label: '产品未税合计',width:'110'},
      ],
      select: {
        select: selectAllMaterielPutchaseAsPage,
        queryParam: { dr: 0, billState: "1" },
      },
      top_btn: [
        {
          name: "搜索",
          code: "search",
        },
        // {
        //   name: '录入',
        //   code: 'ADDSALESTART',
        //   action: insertMaterielPurchase,
        //   btnSize: 'small',
        // }
      ],
      act_btn: [
        {
          width: 230,
          name: "查看产品数据",
          code: "LOOKORDERBPRODUCT",
          action: null,
          btnSize: "mini",
          iconPic: "el-icon-view",
          typeLess: "itag",
        },
        {
          name: "查看",
          code: "LOOKUP",
          action: null,
          btnSize: "mini",
          typeLess: "itag",
          iconPic: "el-icon-tickets",
        },
        {
          name: "修改",
          code: "UPDATESALESTART",
          typeLess: "itag",
          action: updateMaterielPurchase,
          iconPic: "el-icon-edit",
          when: { billState: [0, 1, 2] },
          btnSize: "mini",
        },
        // {
        //   name: '删除',
        //   code: 'DELETESALESTART',
        //   action: deleteMaterielPurchaseByPks,
        //   typeLess: 'itag',
        //   iconPic: 'el-icon-delete',
        //   btnSize: 'mini'
        // },
        {
          name: "完成采购",
          code: "OVERPROCUREMENT",
          when: { billState: [0, 1] },
          action: null,
          btnSize: "mini",
          typeLess: "itag",
          iconPic: "el-icon-finished",
        },
        {
          name: "进度",
          code: "LOOKUPSTEPS",
          action: null,
          typeLess: "itag",
          iconPic: "el-icon-s-promotion",
          btnSize: "mini",
        },
        {
          name: "通知钉钉",
          code: "COMMITDINGDING",
          action: null,
          typeLess: "itag",
          iconPic: "el-icon-bell",
          btnSize: "mini",
        },
        {
          name: "工艺文件维护",
          code: "FILEDETAILS",
          action: null,
          btnSize: "mini",
          iconPic: "el-icon-folder-opened",
          typeLess: "itag",
        },
        {
          name: "查看主题",
          code: "READTHEME",
          action: null,
          typeLess: "itag",
          iconPic: "el-icon-collection",
          btnSize: "mini",
        },
      ],
      replace: [
        {
          name: "billState",
          replace: { 0: "自由态", 1: "进行中", 2: "已完成" },
        },
        {
          name: "productType",
          replace: { 0: "自由态", 1: "加工", 2: "OEM", 3: "ODM", 4: "物料" },
        },
        {
          name: "productionState",
          replace: {
            0: "自由态",
            1: "生产中",
            2: "暂停(未启用)",
            3: "生产完成",
            4: "一键暂停",
          },
        },
      ],
      commitDialogData: {
        // 控制钉钉Dialog显示
        visiable: false,
        paramData: null,
      },
      orderProductInfoDetails: {
        visiable: false,
        pkProductOrderB: null, // 订单子表主键
      },
      cont: {
        visiable: false,
        pkProductOrderB: null, // 订单子表主键
      },
      selectedConstractData: null, // 当前选中的订单合同
      viewDefaultBillState: "1", // 界面默认单据状态条件
      ressl: { dr: 0, billState: "1" }, //保留刷新
    };
  },
  // created() {
  //  // console.log(this.pid)
  //  // let param={pkProduct:this.pid,page:1,limit:10}
  //  // listTecaudit(param).then((response)=>{
  //  //  console.log(response.object)
  //  // })
  // },
  methods: {
    label(data) {
      this.ressl = data;
      let newSelect = { select: this.select.select, queryParam: data };
      this.select = newSelect;
    },
    handleClose() {
      this.label(this.ressl);
    },
    colsed(data) {
      this.visiables = data;
    },
    search_ts(data) {
      this.visiables = false;
      // console.log(data.productType);
      let mindata = {
        creationdateBegin: data["开始时间"],
        creationdateEnd: data["结束时间"],
        contractNo: data["合同编号"],
        productCode: data["产品编码"],
        customerCode: data["客户编号"],
        constractPsnname: data["业务员"],
        orderType: data["选择类型"][1],
        productType: data["合同类型"][0],
        // billState: null,
        productName: data["产品名称"],
      };
      this.ressl = mindata;
      this.select = {
        select: this.select.select,
        queryParam: mindata,
      };
    },
    drawers() {
      //消息中心的调用
      this.drawer = !this.drawer;
      this.label(this.ressl);
    },
    // 调用接口获取界面数据
    refreshTableList(constractData) {
      this.selectedConstractData = constractData;
      this.ressl.pkProductOrder = constractData.pkProductOrder
      let queryParam = {
        billState: this.viewDefaultBillState,
        dr: 0,
      };
      if (constractData) {
        queryParam.pkProductOrder = constractData.pkProductOrder;
      }
      let newSelect = { select: this.select.select, queryParam: queryParam };
      this.select = newSelect;
    },

    // 监听按钮
    onButtonClick(param, btnCode, unexParam) {
      if (param.btnCode === "ADDSALESTART") {
        // 录入销售发起数据
        // 校验是否选择订单信息
        if (
          this.selectedConstractData &&
          this.selectedConstractData.pkProductOrder
        ) {
          this.content.pkProductOrder = this.selectedConstractData.pkProductOrder;
          this.openContent("录入", param.btnAction);
        } else {
          this.$message({
            showClose: true,
            message: "请先选择订单信息!",
            type: "warning",
          });
        }
      }
      if (param.btnCode == "FILEDETAILS") {
        // 弹出工艺文件维护界面
        this.content.updateRow = param.bindData;
        this.openproductionFlowOrderAuditFileDetails();
      }
      if (param.btnCode === "UPDATESALESTART") {
        // 修改销售发起数据
        this.openContent("修改", param.btnAction);
        this.content.updateRow = param.bindData;
      }
      if (param.btnCode === "search") {
        this.visiables = true;
      }
      if (param.btnCode === "LOOKORDERBPRODUCT") {
        // 查看订单中的产品详情
        this.orderProductInfoDetails.pkProductOrderB =
          param.bindData.pkProductOrderB;
        // console.log(param.bindData.pkProductOrderB);
        this.orderProductInfoDetails.visiable = true;
      }

      //查看工艺参数
      if (param.btnCode === "LOOKUP") {
        if (param.bindData.pkProductOrderB) {
          let mrpParam = {
            pkProduct: param.bindData.pkProductOrderB,
            limit: 10,
            page: 1,
          };
          listTecaudit(mrpParam).then((response) => {
            // console.log(response.object);
            let list = response.object[0];
            this.temp.name = list.name;
            this.temp.code = list.code;
            this.temp.model = list.model;
            this.temp.technicsState = list.technicsState;
            this.temp.ismakeTool = list.ismakeTool;
            this.temp.pcbFloors = list.pcbFloors;
            this.temp.productType = list.productType;
            this.temp.encapsulation = list.encapsulation;
            this.temp.brand = list.brand;
            this.temp.explain = list.explain;
            this.temp.pkPsndoc = list.pkPsndoc;
            this.temp.purchaseContacts = list.purchaseContacts;
            this.temp.skillContacts = list.skillContacts;
            this.temp.smt = list.smt;
            this.temp.dip = list.dip;
            this.temp.isinstal = list.isinstal;
            this.temp.instalMin = list.instalMin;
            this.temp.istest = list.istest;
            this.temp.testMin = list.testMin;
            this.temp.isaging = list.isaging;
            this.temp.agingMin = list.agingMin;
            this.temp.defense = list.defense;
            this.temp.defenseArea = list.defenseArea;
            this.temp.sealTechnics = list.sealTechnics;
            this.temp.materialSource = list.materialSource;
            this.temp.exeStandard = list.exeStandard;
            this.temp.steelMeshSource = list.steelMeshSource;
            this.temp.ispcb = list.ispcb;
            this.temp.pcbSource = list.pcbSource;
            this.temp.pcbLong = list.pcbLong;
            this.temp.pcbWide = list.pcbWide;
            this.temp.pcbThick = list.pcbThick;
            this.temp.pcbResistColor = list.pcbResistColor;
            this.temp.pcbCharColor = list.pcbCharColor;
            this.temp.pcbResistCover = list.pcbResistCover;
            this.temp.pcbPadSpary = list.pcbPadSpary;
            this.temp.pcbCopperThick = list.pcbCopperThick;
            this.temp.pcbFloors = list.pcbFloors;
            this.temp.pcbFrTg = list.pcbFrTg;
            this.temp.pcbBoardBrand = list.pcbBoardBrand;
            this.temp.pcbMinHole = list.pcbMinHole;
            this.temp.pcbImpedance = list.pcbImpedance;
            this.temp.pcbImpedance = list.pcbImpedance;
            this.temp.pcbHypotenuse = list.pcbHypotenuse;
            this.temp.pkCustomer = list.pkCustomer;
            this.temp.orderNumber = list.orderNumber;
            this.temp.bomFilename = list.bomFilename;
            this.temp.bomFilefullname = list.bomFilefullname;
            this.temp.pcbFilename = list.pcbFilename;
            this.temp.pcbFilefullname = list.pcbFilefullname;
            this.temp.craftFilename = list.craftFilename;
            this.temp.craftFilefullname = list.craftFilefullname;
            this.temp.purFilename = list.purFilename;
            this.temp.purFilefullname = list.purFilefullname;
            this.temp.ismakeTool = list.ismakeTool;
            this.temp.makeSteelMesh = list.makeSteelMesh;
            this.temp.makeDip = list.makeDip;
            this.temp.makeTest = list.makeTest;
            this.temp.makeDefense = list.makeDefense;
            this.temp.makeAging = list.makeAging;
            this.temp.technicsState = list.technicsState;
            this.temp.creator = list.creator;
            this.temp.creatorShow = list.creatorShow;
            this.temp.creationtime = list.creationtime;
            this.temp.modifier = list.modifier;
            this.temp.modifierShow = list.modifierShow;
            this.temp.modifiedtime = list.modifiedtime;

            this.temp.costUnitPriceNt = list.costUnitPriceNt;
            this.temp.materialTime = list.materialTime;
            this.temp.estimatedOverTime = list.estimatedOverTime;

            let BOMFileName = {
              name: list.bomFilename,
              fullName: list.bomFilefullname,
            };
            this.BOMFileList = [BOMFileName];
            let PCBFileName = {
              name: list.pcbFilename,
              fullName: list.pcbFilefullname,
            };
            this.PCBFileList = [PCBFileName];
            let CRAFTFileName = {
              name: list.craftFilename,
              fullName: list.craftFilefullname,
            };
            this.GONGYIFileList = [CRAFTFileName];
          });
        }
        this.contentVisiable = true;
      }

      if (param.btnCode === "COMMITDINGDING") {
        // 推送消息到钉钉
        this.commitDialogData.visiable = true;
        this.commitDialogData.paramData = param
      }
      if (param.btnCode === "OVERPROCUREMENT") {
        // 完成采购
        if (param.bindData.pkOmgMaterielPurchase) {
          let mrpParam = {
            pkOmgMaterielPurchase: param.bindData.pkOmgMaterielPurchase,
            chargePsn: this.$store.getters.userid,
            billState: "2",
            pkProductOrderB: param.bindData.pkProductOrderB,
          };

          this.$confirm("此操作将永久完成该采购, 是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning",
          })
            .then(() => {
              this.$message({
                type: "success",
                message: "采购成功!",
              });

              // this.refreshTableList(this.selectedConstractData);
              updateMaterielPurchase(mrpParam).then((res) => {
                this.label(this.ressl);
                // location.reload();
              });
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消采购",
              });
            });

          // this.$message({
          //   showClose: true,
          //   message: "操作成功!",
          //   type: "success",
          // });
          // this.refreshTableList(this.selectedConstractData);
        } else {
          this.$message({
            showClose: true,
            message: `${response.errorMessage}!`,
            type: "warning",
          });
        }
      }
      if (param.btnCode === "LOOKUPSTEPS") {
        // look steps
        this.stepsInfo.pkProductOrderB = param.bindData.pkProductOrderB;
        this.stepsInfo.visiable = true;
      }

      //查看主题弹窗
      if (param.btnCode === "READTHEME") {
        if (param.bindData.pkProductOrderB) {
          this.drawer = !this.drawer;
          this.siteRecharge = param.bindData.pkProductOrderB;
          // this.centerDialogVisible = true;
          // this.saleTheme = param.bindData.saleTheme;
          // this.pkProductOrderB = param.bindData.pkProductOrderB;
          // let mrpParam = { pkProductOrderB: param.bindData.pkProductOrderB };
          // selectAllOrderSaleStartB(mrpParam).then((response) => {
          //   this.siteRecharge = response.object;
          //   for (var i = 0; i < this.siteRecharge.length; i++) {
          //     this.siteRecharge[i].zong =
          //       this.siteRecharge[i].chargePsnShow +
          //       "         " +
          //       this.siteRecharge[i].creationtime;
          //   }
          // });
        }
      }
    },
    ///文件
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
    PURFileChange(file, fileList) {
      // 采购文件删除
      this.PURFile = file;
    },
    PURFileRemove(file, fileList) {
      //采购文件删除
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
    openContent(title, action) {
      // 打开内容界面Dialog
      this.content.visiable = true;
      this.content.title = title;
      this.content.action = action;
    },
    closeContent() {
      // 关闭内容界面Dialog
      this.content.visiable = false;
    },
    closeCommitDialog() {
      this.commitDialogData.visiable = false;
    },
    //根据状态改变颜色
    yellowBg({ row, column, rowIndex, columnIndex }) {
      if (row.sort == 1) {
        return "cell-grey";
      }
    },
    //打开评论
    showDiv() {
      this.showx = 1;
    },
    //关闭留言按钮
    closeDiv() {
      this.showx = 0;
    },
    //打开文件管理
    openproductionFlowOrderAuditFileDetails() {
      this.productionFlowOrderAuditFileDetails.visiable = true;
    },
    //关闭文件管理
    closeproductionFlowOrderAuditFileDetailst() {
      this.productionFlowOrderAuditFileDetails.visiable = false;
    },
    // 条件查询列表数据
    queryViewListDataByWhere(whereParam) {
      this.viewDefaultBillState = whereParam;
      let queryParam = { dr: 0 };
      if (whereParam == "ALL") {
        // 全部
        this.viewDefaultBillState = null;
        queryParam.billState = null;
      } else {
        queryParam.billState = this.viewDefaultBillState;
      }

      // 触发查询接口 -- 主动触发Table组件中的查询逻辑
      let newSelect = { select: this.select.select, queryParam: queryParam };
      this.select = newSelect;
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
    executeDindDingInterface(sendMsgParam) {
      // 调用钉钉接口
      // console.log(sendMsgParam); 
       if (sendMsgParam.paramData.bindData) {
            let publicDingMsgInfo = {
              customerCode: sendMsgParam.paramData.bindData.customerCode,
              productCode: sendMsgParam.paramData.bindData.productCode,
              productName: sendMsgParam.paramData.bindData.productName,
              orderNumber: sendMsgParam.paramData.bindData.productOrderNumber,
              pkPsndoc: 1,
              // pkPsndocShow:sendMsgParam.paramData.bindData.constractPsnname,
              constractno: sendMsgParam.paramData.bindData.contractNo,
              orderNumber: sendMsgParam.paramData.bindData.constractProductNum,
              quoreOrderDate: this.dateFormat(new Date()),
              orderType: sendMsgParam.paramData.bindData.orderType,
              expectDeliDate: sendMsgParam.paramData.bindData.scheduledtime,
            };
            sendMsgParam.publicDingMsgInfo = publicDingMsgInfo;
          }
          // 消息发送节点
          sendMsgParam.sendTagName = "物料采购";
      sendDingMsgByPsndoc(sendMsgParam).then((response) => {
        if (response && response.data.success) {
          // 调用接口后处理
          alert("调用钉钉接口成功");
        } else {
          alert("调用钉钉接口失败");
        }
      });
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
/deep/ .zDate {
  width: 165px;
}

i {
  font-size: 15px;
  padding-left: 10px;
  cursor: pointer;
}
.ordre-tag {
  margin-left: 10px;
  margin-top: 10px;
}
.icon {
  margin-top: 32px;
  color: #409eff;
  position: absolute;
  right: 0;
  margin-right: -25px;
  margin-top: 80px;
}
i span {
  font-size: 8px;
  padding-left: 5px;
}
/deep/ i:hover {
  color: #409eff;
  cursor: pointer;
}
.button {
  margin-top: 10px;
}
///文件样式

/deep/ .upload-demo {
  display: inline;
}

/deep/ .el-upload-list {
  width: 240px;
}
/deep/ .el-upload-dragger {
  width: 130px;
  height: 30px;
  background: #409eff;
  border: solid 1px #409eff;
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
  height: 55px;
  display: inline-block;
  background: #f5f7fa;
  border: solid 1px #f5f7fa;
}
/deep/ .demo1 .el-upload-dragger {
  margin-top: 3px;
  margin-left: 25px;
}
///////
/deep/ .button-p {
  position: absolute;
  margin-left: 5px;
}

.readClass {
  width: 100%;
  height: 40px;
  border: solid 1px #e9e5df;
  background: #e9e5df;
  margin-top: 12px;
}
.readZi {
  color: #92887d;
  line-height: 40px;
  font-size: 15px;
  margin-left: 15px;
}

.btnQ {
  width: 100px;
  height: 30px;
  border: solid 1px #01553d;
  background: #01553d;
  text-align: center;
  border-radius: 5px;
  position: absolute;
  cursor: pointer;
  right: 0;
  margin-right: 130px;
}

.bq {
  color: white;
  line-height: 30px;
  font-size: 16px;
}
.bq:hover {
  color: black;
}
.btnF {
  width: 100px;
  height: 30px;
  cursor: pointer;
  border: solid 1px #01553d;
  background: #01553d;
  text-align: center;
  border-radius: 5px;
  position: absolute;
  right: 0;
  margin-right: 18px;
}
.bf {
  color: white;
  line-height: 30px;
  font-size: 16px;
}

.bf:hover {
  color: black;
}

.iconRepert {
  width: 6%;
  height: 40px;
  float: right;
  padding: 1px 0 0 0;
}
/deep/ .showDiv {
  position: absolute;
  right: 0;
}

/deep/ .closeDiv {
  position: absolute;
  right: 0;
}

/deep/ .cell-grey {
  background: red;
}
</style>
