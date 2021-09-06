<template>
  <div class="p-BomMatching" style="height: 80vh; overflow: auto;" :class="action">
    <div class="p-BomMatching-box">
      <div class="p-BomMatching-conteiner">
        <!--<div class="p-BomMatching-header clearfix" style="width: 1522px;">
        <div class="foreign header pull-left" style="width:50%">
          <h3>BOM需求</h3><div class="operation-info foreign">
            <div>
              <span class="textbtn">AMPCB5001_主控板销售报价报价单明细20200827209165.xlsx</span><i class="iconfont icon-edit_ic"></i>
            </div>
          </div>
        </div>
        <div class="internal header pull-left" style="width: 50%;">
          <h3>报价工作台</h3>
          <div class="operation-info internal" style="width: 100%;">
            <el-upload class="upload-demo" action="http://39.106.96.105:8070/test/technics/readExcelAccFileB" :limit="1" :show-file-list="false" ref="upload" :on-success="handleFileSuccess">
              <el-button size="small" type="primary" style="padding:5px 10px;font-size:12px">上传BOM</el-button>
            </el-upload>
            <div class="znl-button znl-btn-default default" style="height: 24px; width: 64px; line-height: 24px;">
              <div title="" class="button" style="height: 22px; line-height: 22px; width: 100%;">
                <span class="text">
                  历史
                </span>
              </div>
            </div><div class="znl-button znl-btn-default default" style="height: 24px; width: 64px; line-height: 24px;">
              <div title="" class="button" style="height: 22px; line-height: 22px; width: 100%;">
                <span class="text">
                  设置
                </span>
              </div>
            </div>
            <div class="znl-button znl-btn-select znl-btn-default default" style="height: 24px; width: 64px; line-height: 24px;">
              <div title="" class="button" style="height: 22px; line-height: 22px; width: 100%; padding-right: 8px;"><span class="text">导出</span></div>
              <div class="icon"><i class="iconfont icon-arrow_unfold_btn" style="display: inline-block; height: 22px; line-height: 22px;"></i></div>
              <div tabindex="-1" class="znl-button-wrapper wj-right-menu" style="left: 1318.17px; top: 168.333px; position: fixed; width: 64px; display: none;">
                <ul>
                  <li>
                    <span class="menu-item"><i class="iconfont"></i>全部</span>
                  </li>
                  <li>
                    <span class="menu-item"><i class="iconfont"></i>模板</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>-->
        <div class="p-BomMatching-table" style="width: 1560px;margin:0 auto">
          <div class="c-BomMatchList">
            <div class="c-BomMatchList-header-container">
              <div class="c-BomMatchList-header" style="width: 1560px">
                <div class="cell c-list-header_cell-Index" style="width: 30px; flex: 0 0 auto; justify-content: center">
                  <span> </span>
                </div>
                <div class="cell" style="width: 90px; flex: 0 0 auto; justify-content: center">
                  <span title="选择">选择</span>
                </div>
                <div class="cell c-list-header_cell-BomPartNoSpecs"
                  style="width: 192px; flex: 0 0 auto; justify-content: start" v-if="action!='look'">
                  <span title="需求型号/规格">需求型号/规格</span>
                </div>
                <!-- <div class="cell c-list-header_cell-BomQty" style="width: 90px; flex: 0 0 auto; justify-content: center">
                  <span title="父项编号">父项编号</span>
                </div> -->
                <div class="cell" style="width: 90px; flex: 0 0 auto; justify-content: center">
                  <span title="存货编码">存货编码</span>
                </div>
                <div class="cell" style="width: 200px; flex: 0 0 auto; justify-content: start">
                  <span title="存货全名">存货全名</span>
                </div>
                <div class="cell" style="width: 50px; flex: 0 0 auto; justify-content: center">
                  <span title="数量">数量</span>
                </div>
                <div class="cell" style="width: 190px; flex: 0 0 auto; justify-content: center">
                  <span title="位号">位号</span>
                </div>
                <!-- <div class="cell" style="width: 60px; flex: 0 0 auto; justify-content: center">
                  <span title="基本单位">基本单位</span>
                </div> -->
                <div class="cell c-list-header_cell-PartNo"
                  style="width: 200px; flex: 0 0 auto; justify-content: start">
                  <span title="存货规格">存货规格</span>
                </div>
                <div class="cell c-list-header_cell-Brand" style="width: 60px; flex: 0 0 auto; justify-content: center">
                  <span title="封装">封装</span>
                </div>
                <div class="cell" style="width: 70px; flex: 0 0 auto; justify-content: start">
                  <span title="物料类型">物料类型</span>
                </div>
                <div class="cell" style="width: 110px; flex: 0 0 auto; justify-content: start">
                  <span title="物料品牌">物料品牌</span>
                </div>
                <div class="cell" style="width: 60px; flex: 0 0 auto; justify-content: center">
                  <span title="工序类型">工序类型</span>
                </div>
                <div class="cell" style="width: 60px; flex: 0 0 auto; justify-content: center">
                  <span title="焊点">焊点</span>
                </div>
                <div class="cell" style="width: 50px; flex: 0 0 auto; justify-content: center">
                  <span title="PDF">PDF</span>
                </div>
                <div class="cell" style="width: 47px; flex: 0 0 auto; justify-content: center">
                  <span title="操作">操作</span>
                </div>
              </div>
            </div>
            <div class="c-BomMatchList-body">
              <div data-rowindex="0" class="c-BomMatchList-row"
                :class="isFinish&&(!item.materieCode||!item.matchedPartNo)?'nomatch':''"
                v-for="(item,index) in tableData"
                v-show="(showCantMatch&&((tableData.length-getMatchDegree()>0)))?(!item.matchedPartNo):((showCantMatch1&&((tableData.length-getMatchDegree1()>0)))?(!item.materieCode):true)">
                <div data-celledit="false" data-rowindex="0" data-colfield="Index"
                  class="cell c-list-body_cell-Index disabled"
                  style="width: 30px; flex: 0 0 auto; justify-content: center;">
                  <div data-clicktype="bgcolorEdit" data-rowindex="0" class="iconfont">{{(index+1)}}</div>
                </div>
                <div data-celledit="true" data-rowindex="0" data-colfield="BomQty" class="cell c-list-body_cell-BomQty"
                  style="width: 90px; flex: 0 0 auto; justify-content: center;">
                  <div> <input type="checkbox" @change='bomindex(index)' :checked='item.flagState == 1'> </div>
                </div>
                <div data-celledit="false" data-rowindex="0" data-colfield="BomPartNoSpecs"
                  class="cell c-list-body_cell-BomPartNoSpecs disabled"
                  style="width: 192px; flex: 0 0 auto; justify-content: start; " v-if="action!='look'">
                  <div data-rowindex="0" title="点击修改匹配关键字" class="BomPartNoSpecsCell" @click="openEdit(item,index)">
                    <span closedelay="2000">
                      <div data-rowindex="0" data-clicktype="changeKeywotd"
                        class="reference hover el-popover__reference" aria-describedby="el-popover-788" tabindex="0">
                        <span data-rowindex="0" data-clicktype="changeKeywotd">{{item.bomPartNoSpecs}}</span>
                      </div>
                    </span>
                  </div>
                </div>
                <!-- <div data-celledit="true" data-rowindex="0" data-colfield="BomQty" class="cell c-list-body_cell-BomQty"
                  style="width: 90px; flex: 0 0 auto; justify-content: center;">
                  <div>{{item.parentCode}}</div>
                </div> -->
                <div data-celledit="true" data-rowindex="0" data-colfield="Qty" class="cell" style="width: 90px; flex: 0 0 auto; justify-content: center; ">
                  <div>
                    <span>{{item.materieCode}}  </span>
                  </div>
                </div>
                <div data-celledit="false" data-rowindex="0" data-colfield="Brand"
                  class="cell c-list-body_cell-Brand disabled"
                  style="width: 200px; flex: 0 0 auto; justify-content: start;">
                  <div class="hover"  data-clicktype="openReplaceDialog" :data-model="item.matchedPartNo"
                    data-rowindex="0" @click="openLocalEdit(item,index)">
                    <span :title="item.matchedPartNo"><span class="color-default" data-rowindex="0"
                        data-clicktype="openReplaceDialog" v-html="item.matchedPartNo">  </span></span>
                  </div>
                  <div class="matching" style="white-space: nowrap;"
                    v-if="!isFinish&&!item.matchedPartNo&&item.state===0">
                    <i class="el-icon-loading"></i> 正在匹配，请稍后...
                  </div>
                  <div class="cant-match"  data-rowindex="13"
                    v-if="(isFinish&&!item.matchedPartNo)||item.state==2" @click="openLocalEdit(item,index)">
                    关键词匹配失败
                  </div>
                </div>
                <div data-celledit="false" data-rowindex="0" data-colfield="Brand"
                  class="cell c-list-body_cell-Brand disabled"
                  style="width: 50px; flex: 0 0 auto; justify-content: center;">
                  <div>
                    <span :title="item.num">{{item.num}}</span>
                  </div>
                </div>
                <div data-celledit="false" data-rowindex="0" data-colfield="Brand"
                  class="cell c-list-body_cell-Brand disabled"
                  style="width: 190px; flex: 0 0 auto; justify-content: start;">
                  <div class="cellValue" @click="cellEdit($event)" style="width:100%;height:30px">
                    <span :title="item.bitNum">{{item.bitNum}}</span>
                  </div>
                  <div class="c-Editor" style="display: none;"><input type="text" :value="item.bitNum"
                      class="c-Editor-input" @blur="bitNumBlur(index,$event)"></div>
                </div>
                <!-- <div data-celledit="false" data-rowindex="0" data-colfield="Brand" class="cell c-list-body_cell-Brand disabled" style="width: 60px; flex: 0 0 auto; justify-content: center;">
                  <div>
                    <span :title="item.unit">{{item.unit}}</span>
                  </div>
                </div> -->
                <div data-celledit="false" data-rowindex="0" data-colfield="PartNo"
                  class="cell c-list-body_cell-PartNo disabled"
                  style="width: 200px; flex: 0 0 auto; justify-content: start;">
                  <div>
                    <span :title="item.materielSpecifications" v-html="item.materielSpecifications"></span>
                  </div>
                </div>
                <div data-celledit="false" data-rowindex="0" data-colfield="Brand"
                  class="cell c-list-body_cell-Brand disabled"
                  style="width: 60px; flex: 0 0 auto; justify-content: center;">
                  <div>
                    <span :title="item.packaging">{{item.packaging}}</span>
                  </div>
                </div>
                <div data-celledit="false" data-rowindex="0" data-colfield="Brand"
                  class="cell c-list-body_cell-Brand disabled"
                  style="width: 70px; flex: 0 0 auto; justify-content: start;">
                  <div style="width: 100%;">
                    <span :title="item.materieType">{{item.materieType}}</span>
                  </div>
                </div>
                <div data-celledit="false" data-rowindex="0" data-colfield="Brand"
                  class="cell c-list-body_cell-Brand disabled"
                  style="width: 110px; flex: 0 0 auto; justify-content: start;">
                  <div style="width: 100%;">
                    <span :title="item.brand">{{item.brand}}</span>
                  </div>
                </div>
                <div data-celledit="false" data-rowindex="0" data-colfield="Brand"
                  class="cell c-list-body_cell-Brand disabled"
                  style="width: 60px; flex: 0 0 auto; justify-content: center;">
                  <div>
                    <span :title="item.process" v-show="item.process">{{item.process==1?"SMT":"DIP"}}</span>
                  </div>
                </div>
                <div data-celledit="false" data-rowindex="0" data-colfield="Brand"
                  class="cell c-list-body_cell-Brand disabled"
                  style="width: 60px; flex: 0 0 auto; justify-content: center;">
                  <div>
                    <span :title="item.weldingSpot">{{item.weldingSpot}}</span>
                  </div>
                </div>
                <div data-celledit="false" data-rowindex="0" data-colfield="Brand"
                  class="cell c-list-body_cell-Brand disabled"
                  style="width: 50px; flex: 0 0 auto; justify-content: center; ">
                  <div>
                    <span :title="item.pdfLink" v-if="item.pdfLink" style="display:block;margin-top:12px;cursor:pointer"
                      @click="openPdf(item)"><svg t="1607022526781" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="3371" width="25" height="25">
                        <path
                          d="M749.942 901.944H278.8c-72.2 0-130.953-55.225-130.953-123.078V245.494c0-67.854 58.752-123.078 130.953-123.078h383.551c6.596 0 12.937 2.505 17.794 6.954l192.363 178.046c5.318 4.96 8.387 11.914 8.387 19.226v452.223c0 67.855-58.753 123.079-130.953 123.079zM278.8 174.777c-43.31 0-78.592 31.703-78.592 70.717v533.372c0 39.015 35.282 70.717 78.592 70.717h471.142c43.311 0 78.592-31.702 78.592-70.717v-440.77l-176.461-163.32H278.8z"
                          fill="#B4B4B5" p-id="3372"></path>
                        <path
                          d="M832.573 332.319H671.452c-14.471 0-26.181-11.709-26.181-26.18V156.982c0-14.471 11.71-26.18 26.181-26.18s26.181 11.709 26.181 26.18v122.976h134.94c14.471 0 26.181 11.71 26.181 26.181s-11.71 26.18-26.181 26.18z"
                          fill="#B4B4B5" p-id="3373"></path>
                        <path
                          d="M320.473 760.202c-10.227 0-20.197-3.067-29.708-9.051-22.448-14.163-25.106-33.083-24.646-43.104 0.818-19.687 12.221-51.083 99.199-98.074 15.34-59.979 25.566-137.446 26.845-203.613-47.094-48.781-66.882-87.387-60.388-117.862 2.25-10.584 10.073-29.913 36.969-40.14 16.567-6.392 34.055-2.557 46.583 10.073 7.107 7.107 28.174 28.277 29.248 126.299 47.759 45.815 117.402 97.563 178.763 132.793 23.316-4.244 43.821-6.392 61.104-6.392 68.979 0 77.672 36.663 78.234 52.463 0.512 16.056-5.932 26.231-11.402 31.958-5.829 5.983-16.517 13.091-34.669 13.091-23.368 0-57.576-12.067-101.908-35.947-64.173 14.011-142.407 41.93-204.994 73.172-22.859 76.904-52.107 114.334-89.23 114.334z m108.454-183.415l-0.767 2.762c38.708-16.823 80.381-32.01 120.164-43.771l-4.296-2.353 4.04-0.817c-36.049-23.777-72.047-50.725-103.698-77.672v3.579l-2.148-2.096c-2.965 40.907-8.539 82.989-16.158 121.85l2.863-1.482z"
                          fill="#B4B4B5" p-id="3374"></path>
                      </svg></span>
                  </div>
                </div>
                <div data-celledit="false" data-rowindex="0" data-colfield="Brand"
                  class="cell c-list-body_cell-Brand disabled"
                  style="width: 47px; flex: 0 0 auto; justify-content: center; ">
                  <div v-if="action!='look'"><span class="btn-remove" @click="removeItem(index)">移除</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </div>
    <div class="p-BomMatching-footer-buyinfo" style="left: 3px; width: auto;position: absolute;bottom: 0px;">
      <div class="container clearfix" style="width: 1560px">
        <div class="pull-left clearfix foreign" style="width: 50%;line-height:18px">
          <!--<div class="pull-left item">
          <div class="value">¥45068.85</div>
          <div class="label">销售总额(含税)</div>
        </div>
        <div class="pull-left item">
          <div class="value">¥40971.68</div>
          <div class="label">采购总额(含税)</div>
        </div>
        <div class="pull-left item">
          <div class="value">
            10%<i class="iconfont icon-edit_ic"></i>
          </div>
          <div class="label">毛利率</div>
        </div>
        <div class="pull-left item">
          <div class="value">¥4097.16</div>
          <div class="label">毛利</div>
        </div>-->
          <!--<span class="compatibility pull-left" style="padding-left:20px">
            <div class="value">{{(getMatchDegree()==0?'0':parseInt((getMatchDegree()/tableData.length)*100))}}%</div>
            <div class="label">匹配度 {{getMatchDegree()}}/{{tableData.length}}</div>
          </span>-->
          <span class="pull-left legend legend3" v-if="isFinish&&(tableData.length-getMatchDegree()>0)"
            @click="toggleCantMatch">
            <span class="header">{{tableData.length-getMatchDegree()}}</span><br /><span
              class="tiptext">线上库无法匹配</span>
          </span>
          <!--<span class="compatibility pull-left" style="padding-left:20px">
            <div class="value">{{(getMatchDegree1()==0?'0':parseInt((getMatchDegree1()/tableData.length)*100))}}%</div>
            <div class="label">本地库匹配度 {{getMatchDegree1()}}/{{tableData.length}}</div>
          </span>-->
          <span class="pull-left legend legend3" v-if="isFinish&&(tableData.length-getMatchDegree1()>0)"
            @click="toggleCantMatch1">
            <span class="header">{{tableData.length-getMatchDegree1()}}</span><br /><span
              class="tiptext">本地库无法匹配</span>
          </span>
        </div>
        <div class="clearfix internal pull-left" style="width: 50%">
    
          <div class="pull-right item" v-if="action!='look'">
            <div class="znl-button znl-btn-default minor" slot="reference"
              style="height: 24px; width: 74px; line-height: 24px" @click="saveCarft">
              <div title="" class="button" style="height: 22px; line-height: 22px; width: 100%">
                <span class="bombtn-bg bombtn-bg_shopping-cart"></span><span class="text">保存数据</span>
              </div>
            </div>
          </div>
          <div class="pull-right item" v-if="action!='look'">
            <div class="znl-button znl-btn-default minor" slot="reference"
              style="height: 24px; width: 94px; line-height: 24px" @click="saveTempCarft">
              <div title="" class="button" style="height: 22px; line-height: 22px; width: 100%">
                <span class="bombtn-bg bombtn-bg_shopping-cart"></span><span class="text">保存临时数据</span>
              </div>
            </div>
          </div>
          <div class="pull-right item" v-if="action!='look'">
            <div class="znl-button znl-btn-default minor" slot="reference"
              style="height: 24px; width: 84px; line-height: 24px" @click="selectBillOfMaterialByModel">
              <div title="" class="button" style="height: 22px; line-height: 22px; width: 100%">
                <span class="bombtn-bg bombtn-bg_shopping-cart"></span><span class="text">匹配本地库</span>
              </div>
            </div>
          </div>
          <div class="pull-right item">
            <div class="znl-button znl-btn-default minor" slot="reference"
              style="height: 24px; width: 84px; line-height: 24px" @click="exportData">
              <div title="" class="button" style="height: 22px; line-height: 22px; width: 100%">
                <span class="bombtn-bg bombtn-bg_shopping-cart"></span><span class="text">导出表格</span>
              </div>
            </div>
          </div>
          <div class="pull-right item">
            <div class="znl-button znl-btn-default minor" slot="reference"
              style="height: 24px; width: 84px; line-height: 24px" @click="cleanData">
              <div title="" class="button" style="height: 22px; line-height: 22px; width: 100%">
                <span class="bombtn-bg bombtn-bg_shopping-cart"></span><span class="text">清空表格</span>
              </div>
            </div>
          </div>
          <div class="pull-right item">
            <div class="znl-button znl-btn-default minor" slot="reference" style="height: 24px; width: 84px; line-height: 24px" @click="showGoodsupdata(0)">
              <div title="" class="button" style="height: 22px; line-height: 22px; width: 100%">
                <span class="bombtn-bg bombtn-bg_shopping-cart"></span><span class="text">新增存货档案</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
    <div v-if="showEdit">
      <el-dialog :title="editModel.title" :visible.sync="showEdit" width="800px" append-to-body
        :close-on-press-escape="false" :close-on-click-modal="false">

        <div class="c-ReplaceDialog">
          <!-- <button style="height: 28px; line-height: 28px; width: 100px;font-size: 12px;color: #000;border: 0px;border-radius: 20px;">新增存货档案</button> -->
          <div class="znl-button znl-btn-default main" style="height: 30px; line-height: 30px"  v-if="editModel.postUrl=='/technics/getInfoToken'">
            <div title="" class="button" style="height: 28px; line-height: 28px; width: 100%" @click="showGoodsupdata(1)">
              新增存货档案</div>

          </div>
          <div class="c-ReplaceDialog-header clearfix">
            <label>BOM表内容：</label><span><span class="el-popover__reference" aria-describedby="el-popover-6825"
                tabindex="0" v-if="editIndex!=null">{{tableData[editIndex].bomPartNoSpecs}}</span></span>
          </div>
          <div class="c-ReplaceDialog-input">
            <label>匹配关键词：</label><input type="text" v-model="editModel.keyword" placeholder="输入关键字"
              v-if="editModel.postUrl=='/technics/getInfoToken'" />
            <input type="text" style="width:150px" placeholder=" 输入型号" v-model="localEditModel.matchedPartNo"
              v-if="editModel.postUrl!='/technics/getInfoToken'" />
            <!-- <input type="text" style="width:150px" placeholder=" 输入规格" v-model="localEditModel.materielSpecifications"
              v-if="editModel.postUrl!='/technics/getInfoToken'" /> -->
            <input type="text" style="width:140px" placeholder=" 输入封装" v-model="localEditModel.packaging"
              v-if="editModel.postUrl!='/technics/getInfoToken'" />
            <input type="text" style="width:140px" placeholder=" 输入品牌" v-model="localEditModel.brand"
              v-if="editModel.postUrl!='/technics/getInfoToken'" />
            <div class="znl-button znl-btn-default main" style="height: 30px; line-height: 30px">
              <div title="" class="button" style="height: 28px; line-height: 28px; width: 100%" @click="reMatch">重新匹配
              </div>

            </div>
          </div>
          <div
            class="el-table BomMatching_Element-table el-table--fit el-table--enable-row-hover el-table--enable-row-transition">
            <div class="hidden-columns">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
            <div class="el-table__header-wrapper">
              <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width: 772px">
                <colgroup>
                  <col name="el-table_2_column_7" width="60" />
                  <col name="el-table_2_column_8" width="250" />
                  <col name="el-table_2_column_9" width="160" />
                  <col name="el-table_2_column_10" width="140" />
                  <col name="el-table_2_column_10" width="140" />
                  <col name="gutter" width="0" />
                </colgroup>
                <thead class="has-gutter">
                  <tr class="">
                    <th colspan="1" rowspan="1" class="el-table_2_column_7 table-checked-column is-leaf">
                      <div class="cell"></div>
                    </th>
                    <th colspan="1" rowspan="1" class="el-table_2_column_8 is-leaf">
                      <div class="cell">完整型号</div>
                    </th>
                    <th colspan="1" rowspan="1" class="el-table_2_column_9 is-leaf">
                      <div class="cell">规格</div>
                    </th>
                    <th colspan="1" rowspan="1" class="el-table_2_column_10 is-leaf">
                      <div class="cell">封装</div>
                    </th>
                    <th colspan="1" rowspan="1" class="el-table_2_column_9 is-leaf">
                      <div class="cell">品牌</div>
                    </th>
                    <th class="gutter" style="width: 0px; display: none"></th>
                  </tr>
                </thead>
              </table>
            </div>
            <div class="el-table__body-wrapper is-scrolling-none">
              <table cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 772px">
                <colgroup>
                  <col name="el-table_2_column_7" width="60" />
                  <col name="el-table_2_column_8" width="250" />
                  <col name="el-table_2_column_9" width="160" />
                  <col name="el-table_2_column_10" width="140" />
                  <col name="el-table_2_column_10" width="140" />
                  <col name="gutter" width="0" />
                </colgroup>
                <tbody>
                  <tr class="el-table__row active"
                    
                    v-if="editModel.postUrl=='/technics/getInfoToken'&&editModel.matchedPartNo"
                    @dblclick='dbupdata'
                    >
                    <td rowspan="1" colspan="1" class="el-table_2_column_7 table-checked-column">
                      <div class="cell"><span> 当前选择 </span></div>
                    </td>
                    <td rowspan="1" colspan="1" class="el-table_2_column_8">
                      <div class="cell" ref='matchedPartDom' v-html="editModel.matchedPartNo"></div>
                    </td>
                    <td rowspan="1" colspan="1" class="el-table_2_column_9">
                      <div class="cell" v-html="editModel.materielSpecifications"></div>
                    </td>
                    <td rowspan="1" colspan="1" class="el-table_2_column_9">
                      <div class="cell" >{{editModel.packaging}} </div>
                    </td>
                    <td rowspan="1" colspan="1" class="el-table_2_column_10">
                      <div class="cell">
                        <span>
                          <div class="el-popover__reference" aria-describedby="el-popover-3280" tabindex="0">
                            {{editModel.brand}}</div>
                        </span>
                      </div>
                    </td>
                  </tr>
                  <tr class="el-table__row" :class="localSelectIndex==index?'active':''" @click="localSelectIndex=index"
                  @dblclick='dbupdata'
                    v-if="editModel.postUrl=='/BillOfMaterial/selectBillOfMaterialByMatchedPartNo'"
                    v-for="(item,index) in localResults">
                    <td rowspan="1" colspan="1" class="el-table_2_column_7 table-checked-column">
                      <div class="cell"><span>{{localSelectIndex==index?'当前选择':'可选'}}</span></div>
                    </td>
                    <td rowspan="1" colspan="1" class="el-table_2_column_8">
                      <div class="cell" v-html="item.matchedPartNo"></div>
                    </td>
                    <td rowspan="1" colspan="1" class="el-table_2_column_9">
                      <div  contenteditable="true" v-html="item.materielSpecifications"></div>
                    </td>
                    <td rowspan="1" colspan="1" class="el-table_2_column_9">
                      <div class="cell">{{item.packaging}}</div>
                    </td>
                    <td rowspan="1" colspan="1" class="el-table_2_column_10">
                      <div class="cell">
                        <span>
                          <div class="el-popover__reference" aria-describedby="el-popover-3280" tabindex="0">
                            {{item.brand}}</div>
                        </span>
                      </div>
                    </td>
                  </tr>
                  <!---->
                </tbody>
              </table>
              <!---->
              <!---->
            </div>
            <!---->
            <!---->
            <!---->
            <!---->
            <div class="el-table__column-resize-proxy" style="display: none"></div>
            <div class="el-loading-mask" style="display: none">
              <div class="el-loading-spinner">
                <svg viewBox="25 25 50 50" class="circular">
                  <circle cx="50" cy="50" r="20" fill="none" class="path"></circle>
                </svg>
                <!---->
              </div>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showEdit = false" size="small">取 消</el-button>
          <el-button type="primary" @click="saveMatch" size="small">保 存</el-button>
        </span>
      </el-dialog>
    </div>
    <!--  -->
    <div>
      <el-dialog :title="'新增存货档案'" :visible.sync="showGoods" width="800px" append-to-body :close-on-press-escape="false"
        :close-on-click-modal="false">
        <div>
          <el-form ref="goodsForm" :rules="goodsRules" :model="goods" label-width="80px">
            <el-form-item label="物料类型" prop="materieType">
              <el-select v-model="goods.materieType" placeholder="请选择物料类型">
                <el-option :label="item.title" :value="item.title" v-for="item in goodsMaterieType"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="存货编码" prop="materieCode">
              <el-input v-model="goods.materieCode"></el-input>
            </el-form-item>
            <el-form-item label="存货名称" prop="materielShortName">
              <el-input v-model="goods.materielShortName"  ></el-input>
            </el-form-item>
            <el-form-item label="父项号" prop="parentCode">
              <el-input v-model="goods.parentCode" readonly></el-input>
            </el-form-item>
            <el-form-item label="完整型号" prop="materielName">
              <el-input v-model="goods.materielName" ></el-input>
            </el-form-item>
            <el-form-item label="规格" prop="materielSpecifications">
              <el-input v-model="goods.materielSpecifications" ></el-input>
            </el-form-item>

            <!-- materielShortName -->
            <el-form-item label="封装" prop="packaging">
              <el-input v-model="goods.packaging"></el-input>
            </el-form-item>
            <el-form-item label="单位" prop="unit">
              <el-input v-model="goods.unit"></el-input>
            </el-form-item>
            <el-form-item label="品牌" prop="brand">
              <el-input v-model="goods.brand"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onGoodsSubmit">立即创建</el-button>
              <el-button @click="showGoods=false">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-dialog>
    </div>
    <!--  -->
    <div v-if="dialogVisible">
      <el-dialog title="设置" :visible.sync="dialogVisible" width="880px" custom-class="c-BomMatching-SettingDialog"
        append-to-body :close-on-click-modal="false" :close-on-press-escape="false" :before-close="handleClose">
        <BomSeting ref="bomSetting"></BomSeting>
        <span slot="footer" class="dialog-footer">
          <el-checkbox label="保存并重新匹配" name="type"></el-checkbox>
          <el-button type="primary" @click="saveSeting" size="small">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import request from '@/utils/request';
  import BomSeting from '@/components/viewcomp/BomSeting'
  export default {
    data() {
      return {
        excelData: [],
        tableData: [],
        tableDataN: [],//首次未匹配到存货编码的数据
        qtysIndex: null,
        showEdit: false,
        editIndex: null,
        dialogVisible: false,
        loading: null,
        isFinish: false,
        showCantMatch: false,
        showCantMatch1: false,
        isMatchLocal: false,//是否已操作过匹配本地库
        editModel: {
          title: "",
          postUrl: "",
          keyword: "",
          matchedPartNo: "",
          brand: "",
          bitNum: "",
          materieCode: "",
          packaging: "",
          materielSpecifications: "",
          materieType: "",
          unit: ""
        },
        localEditModel: {
          matchedPartNo: "",
          packaging: "",
          materielSpecifications: "",
          brand: ""
        },
        localResults: [],
        localSelectIndex: -1,
        showGoods: false,//先增存货档案
        goods: {
          parentCode: "",
          materielName: "",
          materielSpecifications: "",
          packaging: "",
          unit: "个",
          materieType: "",
          brand: ""
        },
        goodsMaterieType: [{ title: "接插件", code: "YL001" }, { title: "PCB", code: "YL002" }, { title: "电感/磁珠", code: "YL003" }, { title: "贴片/直插电容", code: "YL004" }, { title: "芯片/模块/二三极管", code: "YL005" }, { title: "继电器/互感器", code: "YL006" }, { title: "晶振/保险", code: "YL007" }, { title: "贴片/直插电阻", code: "YL008" }, { title: "装配件", code: "YL009" }],
        goodsRules: {
          //parentCode:[{ required: true, message: '请填写父项号'}],
          materieType: [{ required: true, message: '请选择物料类型' }],
          materielName: [{ required: true, message: '请填写完整型号' }],
          materielSpecifications: [{ required: true, message: '请填写规格' }],
          // materieCode: [{ required: true, message: '请填写编码' }],
          packaging: [{ required: true, message: '请填写封装' }],
          unit: [{ required: true, message: '请填写单位' }],
          brand: [{ required: true, message: '请填写品牌' }],
        }
      }
    },
    props: ['fileRes', 'pkProduct', 'action'],
    components: { BomSeting },
    watch: {
      "showEdit"(val) {
        if (val == false) {
          this.editIndex = null;
        }
      },
      "localSelectIndex"(val) {
        if (val >= 0) {
          // console.log(this.localResults[val].matchedPartNo);
          this.editModel.matchedPartNo = this.localResults[val].matchedPartNo || this.editModel.matchedPartNo;
          this.editModel.pkOfMaterial=this.localResults[val].pkOfMaterial
          this.editModel.brand = this.localResults[val].brand || this.editModel.brand;
          this.editModel.bitNum = this.localResults[val].bitNum || this.editModel.bitNum;
          this.editModel.materieCode = this.localResults[val].materieCode;
          this.editModel.packaging = this.localResults[val].packaging;
          this.editModel.materieType = this.localResults[val].materieType;
          this.editModel.unit = this.localResults[val].unit;
          this.editModel.materielSpecifications = this.localResults[val].materielSpecifications;
        }
      },
      "goods.materieType"(val) {
        if (val) {
          for (let i = 0; i < this.goodsMaterieType.length; i++) {
            if (this.goodsMaterieType[i].title == val) {
              this.goods.parentCode = this.goodsMaterieType[i].code;
              break;
            }
          }
        }
      }
    },

    methods: {
      removeHtml:function(domsmit){
        //去掉标签保留内容
        return domsmit && domsmit.replace(/<(?:.|\n)*?>/gm, '')
            .replace(/(&rdquo;)/g, '\"')
            .replace(/&ldquo;/g, '\"')
            .replace(/&mdash;/g, '-')
            .replace(/&nbsp;/g, '')
            .replace(/&gt;/g, '>')
            .replace(/&lt;/g, '<')
            .replace(/<[\w\s"':=\/]*/, '');
      },
      onGoodsSubmit() {
        let _this = this;
        this.$refs['goodsForm'].validate((valid) => {
          if (valid) {
            axios.post(process.env.BASE_API + "/BillOfMaterial/insertMaterial", this.goods).then(function (ret) {
              console.log(ret)
              if (ret.data.success) {
                _this.$message({
                  message: '添加成功',
                  type: 'success'
                });
                _this.showGoods = false;
                _this.goods.parentCode = "";
                _this.goods.materielName = "";
                _this.goods.materielSpecifications = "";
                _this.goods.packaging = "";
                _this.goods.unit = "";
                _this.goods.materieType = "";
                _this.goods.brand = "";
              } else {
                _this.$message.error('保存失败');
              } 
            })
            // console.log(this.goods);
          } else {
            // console.log('error submit!!');
            return false;
          }
        });
      },
      bomindex(index){
        // console.log(this.tableData[index]);
        // console.log(index);
        if(this.tableData[index].flagState == 0 || this.tableData[index].flagState == undefined){
          this.tableData[index].flagState = 1
        }else{
          this.tableData[index].flagState = 0
        }
        // this.$forceUpdate()
      },
      handleFileSuccess(response) {
        //处理多条
        if (response.object) {
          var _arr = [];
          for (var i = 0; i < response.object.length; i++) {
            if (Array.isArray(response.object[i])) {
              _arr.push(response.object[i][0]);
            }
          }
          if (_arr.length > 0) {
            response.object = _arr;
          }
        }

        if (this.action == "look") {
          this.tableData = response.object;
        } else {
          for (var i = 0; i < response.object.length; i++) {
            response.object[i]["bomPartNoSpecs"] = (response.object[i].content.replace(/\|\|/g, " ")) || ""
            //if (response.object[i]["matchedPartNo"]) {
            //  response.object[i]["state"] = 1;
            //} else {
            //  response.object[i]["state"] = 2;
            //}
          }
          this.tableData = response.object;
          for (var i = 0; i < this.tableData.length; i++) {
            if (!this.tableData[i].materieCode) {
              var _obj = JSON.parse(JSON.stringify(this.tableData[i]));
              _obj["pindex"] = i;
              this.tableDataN.push(_obj);
              this.tableData[i]["state"] = 0;
            }
          }
          // console.log(this.tableDataN);
          return false;
          //---------------------------------------------------------
          if (response && response.success && response.object) {
            this.excelData = response.object;
            //var _param = { "Texts": [], "Qtys": [] };
            var _numberArr = [];

            for (var i = 0; i < this.excelData.length; i++) {
              var item = {};
              item["pkOfMaterial"] = null;//本地物料主键
              item["parentCode"] = null;//父项编号
              item["materieCode"] = null;//物料编号
              item["materielSpecifications"] = null;//存货规格
              item["packaging"] = null;//封装
              item["unit"] = null;//单位
              item["materieType"] = null;//物料类型
              item["brand"] = null;//物料品牌
              item["matchedPartNo"] = null;//完整型号
              item["process"] = null;//工序类型 1smt  2dip
              item["weldingSpot"] = null;//焊点数量
              item["bitNum"] = null;//位号
              item["pkProduct"] = null;//产品主键
              item["pdfLink"] = null;//PDF链接
              item["num"] = null;//数量
              item["state"] = 0;//状态 0未匹配 1匹配成功 2匹配失败

              item["bomPartNoSpecsSplit"] = this.excelData[i];//需求型号/规格
              var _arr = this.excelData[i].split("||");
              item["bomPartNoSpecs"] = _arr.join(" ");//需求型号/规格
              //_param.Texts.push(_arr);
              //查找数量索引
              for (var j = 0; j < _arr.length; j++) {
                if (!isNaN(_arr[j]) && _arr[j].indexOf("0") != 0) {
                  _numberArr.push(j);
                }
              }
              this.tableData.push(item);
            }
            // console.log(_numberArr);
            this.qtysIndex = this.findMost(_numberArr);
            for (var i = 0; i < this.excelData.length; i++) {
              this.tableData[i]["num"] = this.excelData[i].split("||")[this.qtysIndex];//数量
            }
            //for (var i = 0; i < this.excelData.length; i++) {
            //  _param.Qtys.push(numberIndex);
            //}
            //this.getInfoToken(_param);
            //this.getInfoToken(1);
          }
        }
      },
      getInfoToken(page) {
        //console.log(this.tableData);
        var _this = this;
        var _length = page * 5;
        var ii = 5 * (page - 1);
        _length = (_length > this.tableDataN.length) ? this.tableDataN.length : _length;
        if (_length == 0) {
          _this.isFinish = true;
          _this.loading.close();
          return false;
        }
        if (this.qtysIndex !== null || true) {
          var _param = { "Texts": [], "Qtys": [] };
          for (var i = ii; i < _length; i++) {
            _param.Texts.push(decodeURI(encodeURI(this.tableDataN[i]["content"]).replace(/%C2%A0/g, "")).split("||"));
            //_param.Qtys.push(this.qtysIndex);
          }
          axios.post(process.env.BASE_API + "/technics/getInfoToken", _param).then(function (ret) {

            _this.loading.close();
            if (ret.data && ret.data.success && ret.data.object) {
              for (var i = 0; i < ret.data.object.length; i++) {
                // console.log(ret.data.object[i]);
                _this.tableDataN[ii + i]["matchedPartNo"] = ret.data.object[i].matchedPartNo || _this.tableDataN[ii + i]["matchedPartNo"];
                if (ret.data.object[i].materielSpecifications) {
                  var materielSpecificationsArr = [];
                  var _obj = JSON.parse(ret.data.object[i].materielSpecifications);
                  for (var j in _obj) {
                    materielSpecificationsArr.push(_obj[j]);
                  }
                  _this.tableDataN[ii + i]["materielSpecifications"] = materielSpecificationsArr.join(",");
                  _this.tableData[_this.tableDataN[ii + i]["pindex"]]["materielSpecifications"] = materielSpecificationsArr.join(",");

                }
                if (!ret.data.object[i].matchedPartNo) {
                  _this.tableDataN[ii + i]["state"] = 2;
                } else {
                  _this.tableDataN[ii + i]["state"] = 1;
                }
                //_this.tableDataN[ii + i]["brand"] = ret.data.object[i].brand;
                //_this.tableDataN[ii + i]["packaging"] = ret.data.object[i].packaging;
                //_this.tableDataN[ii + i]["pdfLink"] = ret.data.object[i].pdfLink;
                //_this.tableDataN[ii + i]["bitNum"] = ret.data.object[i].bitNum;
                //覆盖
                _this.tableData[_this.tableDataN[ii + i]["pindex"]]["matchedPartNo"] = ret.data.object[i].matchedPartNo || _this.tableData[_this.tableDataN[ii + i]["pindex"]]["matchedPartNo"];

                //for (var j in _this.tableData[_this.tableDataN[ii + i]["pindex"]]) {
                //  _this.tableData[_this.tableDataN[ii + i]["pindex"]][j] = (_this.tableDataN[ii + i][j]) || (_this.tableData[_this.tableDataN[ii + i]["pindex"]][j])
                //}
              }
              if (page && _length < _this.tableDataN.length) {
                _this.getInfoToken(page + 1);
              } else {
                //首次解析完成
                _this.isFinish = true;
              }
            } else {
              _this.$message.error('物料解析失败');
            }
          }).catch(ret => {
            _this.loading.close();
            _this.$message.error('物料解析失败');
          });
        }
      },
      findMost(arr) {
        if (!arr.length) return;
        if (arr.length === 1) return 1;
        let maxName, maxNum = 0
        let res = arr.reduce((res, currentNum) => {
          res[currentNum] ? res[currentNum] += 1 : res[currentNum] = 1
          if (res[currentNum] > maxNum) {
            maxNum = res[currentNum]
            maxName = currentNum;
          }
          return res
        }, {});
        //console.log('出现次数最多的元素为:' + maxName + ', 出现次数为:' + maxNum);
        return maxName;
      },
      //匹配本地库
      selectBillOfMaterialByModel() {
        if (!this.isFinish) {
          this.$message.error('请先完成解析');
          return false;
        }
        var _this = this;
        var _param = [];
        for (var i = 0; i < this.tableData.length; i++) {
          _param.push({
            "matchedPartNo": this.tableData[i].matchedPartNo ? this.tableData[i].matchedPartNo.replace(/(<([^>]+)>)/ig, '') : null
          });
          //_param.push({
          //  "materielName": this.tableData[i].materielName || null,
          //  "packaging": this.tableData[i].packaging || null,
          //  "materielSpecifications": this.tableData[i].materielSpecifications ? this.tableData[i].materielSpecifications.replace(/(<([^>]+)>)/ig, ''): null,
          //  "brand": this.tableData[i].brand || null
          //})
        }
        axios.post(process.env.BASE_API + "/technics/selectBillOfMaterialByModel", _param).then(function (ret) {
          //axios.post(process.env.BASE_API + "/BillOfMaterial/selectBillOfMaterialByMatchedPartNo", _param).then(function (ret) {
          if (ret.data && ret.data.success && ret.data.object) {
            //处理多条
            //if (ret.data.object) {
            //  var _arr = [];
            //  for (var i = 0; i < ret.data.object.length; i++) {
            //    if (Array.isArray(ret.data.object[i])) {
            //      _arr.push(ret.data.object[i][0]);
            //    }
            //  }
            //  if (_arr.length > 0) {
            //    ret.data.object = _arr;
            //  }
            //}
            for (var i = 0; i < ret.data.object.length; i++) {
              _this.tableData[i]["parentCode"] = ret.data.object[i].parentCode;
              _this.tableData[i]["materieType"] = ret.data.object[i].materieType;
              _this.tableData[i]["materieCode"] = ret.data.object[i].materieCode;
              _this.tableData[i]["unit"] = ret.data.object[i].unit;
              _this.tableData[i]["pkOfMaterial"] = ret.data.object[i].pkOfMaterial;
              _this.tableData[i]["materielSpecifications"] = ret.data.object[i].materielSpecifications;
              _this.tableData[i]["process"] = ret.data.object[i].process;
              _this.tableData[i]["weldingSpot"] = ret.data.object[i].weldingSpot;
            }
            _this.isMatchLocal = true;
            _this.$message({
              message: '本地库匹配完成',
              type: 'success'
            });
          } else {
            _this.$message.error('本地库匹配失败');
          }
        });
      },
      openPdf(item) {
        window.open(item.pdfLink)
      },
      dbupdata(){
        // console.log(1);
        this.saveMatch()
      },
      showGoodsupdata(num) {
        //匹配中存货档案
        this.showGoods = true
        // console.log(this.editModel.materielSpecifications);
        // matchedPartNo  materielName
        if(num ==0){
          this.goods= {
          parentCode: null,
          materielName: null,
          materielSpecifications: null,
          packaging: null,
          unit: "个",
          materieType: null,
          brand: null
        }
        }else{
          this.editModel.materielName =this.removeHtml(this.editModel.matchedPartNo)
        this.editModel.materielSpecifications = this.removeHtml(this.editModel.materielSpecifications)
        this.goods = this.editModel
        }
       

      },
      //保存数据
      saveCarft() {
        var _this = this;
        if (!_this.isMatchLocal) {
          _this.$message.error('请先完成匹配本地库');
          return false;
        }
        if (this.tableData.length == 0) {
          _this.$message.error('暂无可保存的数据');
          return false;
        }
        var _param = [];
        var _flag = true;
        for (var i = 0; i < this.tableData.length; i++) {
          // console.log(this.tableData[15].pkOfMaterial);
          if (this.tableData[i].pkOfMaterial) {
            _param.push({
              pkProduct: this.pkProduct,
              pkOfMaterial: this.tableData[i].pkOfMaterial,
              bitNum: this.tableData[i].bitNum,
              pdfLink: this.tableData[i].pdfLink,
              num: this.tableData[i].num
            });
          } else {
            _flag = false;
          }
        }
        if (!_flag) {
          _this.$message.error('请完善物料表数据');
          return false;
        }

        request({
          url:"/technics/SaveCarft",
          method:"post",
          data:_param
        }).then(ret=>{
          if (ret && ret.success) {

            _this.$message({
              message: '数据保存成功',
              type: 'success'
            });
            setTimeout(function () {
              _this.$emit("complete", false);
            }, 1000);
          }
        })
        // axios.post(process.env.BASE_API + "/technics/SaveCarft",_param).then(function (ret) {
        //   if (ret.data && ret.data.success) {
        //     _this.$message({
        //       message: '数据保存成功',
        //       type: 'success'
        //     });
        //     setTimeout(function () {
        //       _this.$emit("complete", false);
        //     },1000);
        //   }
        // });
        
      },
      openEdit(item, index) {

        if (this.action == 'look') {
          return false;
        }
        // console.log(item);
        this.editIndex = index;
        this.showEdit = true;
        this.editModel.title = "需求型号/规格";
        this.editModel.postUrl = "/technics/getInfoToken";
        this.editModel.keyword = this.tableData[index].bomPartNoSpecs.replace(/(<([^>]+)>)/ig, '');
        this.editModel.matchedPartNo = this.tableData[index].matchedPartNo;
        this.editModel.brand = this.tableData[index].brand || null;
        this.editModel.bitNum = this.tableData[index].bitNum;
        this.editModel.packaging = this.tableData[index].packaging;
        this.editModel.materielSpecifications = this.tableData[index].materielSpecifications || null;
        this.editModel.materieCode = this.tableData[index].materieCode || null;
      },
      openLocalEdit(item, index) {
        if (this.action == 'look') {
          return false;
        }
        // console.log(this.tableData[index]);
        this.editIndex = index;
        this.showEdit = true;
        this.editModel.title = "存货全名";
        //this.editModel.postUrl = "/technics/selectBillOfMaterialByModel";
        this.editModel.postUrl = "/BillOfMaterial/selectBillOfMaterialByMatchedPartNo";
        this.editModel.keyword = this.tableData[index].matchedPartNo ? this.tableData[index].matchedPartNo.replace(/(<([^>]+)>)/ig, '') : null;
        this.editModel.matchedPartNo = this.tableData[index].matchedPartNo;
        this.editModel.brand = this.tableData[index].brand || null;
        this.editModel.bitNum = this.tableData[index].bitNum;
        this.editModel.packaging = this.tableData[index].packaging;
        this.editModel.materielSpecifications = this.tableData[index].materielSpecifications || null;
        this.editModel.materieCode = this.tableData[index].materieCode || null;
        //
        //this.localEditModel.matchedPartNo = this.editModel.matchedPartNo ? this.editModel.matchedPartNo.replace(/(<([^>]+)>)/ig, ''):"";
        this.localEditModel.matchedPartNo = this.tableData[this.editIndex].bomPartNoSpecs;//tableData[editIndex].bomPartNoSpecs
        this.localEditModel.packaging = null;
        // this.localEditModel.materielSpecifications = this.editModel.materielSpecifications ? this.editModel.materielSpecifications.replace(/(<([^>]+)>)/ig, '') : "";
        this.localEditModel.brand = null;
        //
        this.localSelectIndex = -1;
        this.localResults = [{
          "materieCode": this.editModel.materieCode,
          "materielSpecifications": this.editModel.materielSpecifications,
          "packaging": this.editModel.packaging,
          "brand": this.editModel.brand,
          "matchedPartNo": this.editModel.matchedPartNo,
          "bitNum": this.editModel.bitNum
        }];
        this.localSelectIndex = 0;
      },
      //重新匹配
      reMatch() {
        var _this = this;
        if (this.editModel.postUrl == "/technics/getInfoToken") {
          if (!this.editModel.keyword) {
            _this.$message({
              message: '请输入关键字',
              type: 'error'
            });
            return false;
          }
          var _param = { "Texts": [], "Qtys": [] };
          _param.Texts.push(decodeURI(encodeURI(this.editModel.keyword).replace(/%C2%A0/g, "")).split(" "));
          if (this.qtysIndex !== null) {
            _param.Qtys.push(this.qtysIndex);
          }
          axios.post(process.env.BASE_API + this.editModel.postUrl, _param).then(function (ret) {
            if (ret.data && ret.data.success && ret.data.object.length > 0) {
              // console.log(ret.data.object[15]);
              for (var i = 0; i < ret.data.object.length; i++) {
                
                _this.editModel.matchedPartNo = ret.data.object[i].matchedPartNo;


                if (ret.data.object[i].materielSpecifications) {
                  var materielSpecificationsArr = [];
                  var _obj = JSON.parse(ret.data.object[i].materielSpecifications);
                  for (var j in _obj) {
                    materielSpecificationsArr.push(_obj[j]);
                  }
                  _this.editModel.materielSpecifications = materielSpecificationsArr.join(",");

                }
                //_this.editModel.brand = ret.data.object[i].brand;
                //_this.editModel.bitNum = ret.data.object[i].bitNum || _this.editModel.bitNum;
              }
              if (!_this.editModel.matchedPartNo) {
                _this.$message({
                  message: '关键字匹配失败',
                  type: 'error'
                });
              } else {
                _this.$message({
                  message: '关键字匹配成功',
                  type: 'success'
                });
              }
            }
          });

        } else {
          //本地库
          var _this = this;
          //var _param = [{
          //  "matchedPartNo": this.editModel.keyword.replace(/(<([^>]+)>)/ig, '')
          //}];
          if (!this.localEditModel.matchedPartNo) {
            this.$message.error('请输入型号');
            return false;
          }
          //if (!this.localEditModel.packaging) {
          //  this.$message.error('请输入封装');
          //  return false;
          //}
          var _param = [{
            "materielName": this.localEditModel.matchedPartNo || null,
            "packaging": this.localEditModel.packaging || null,
            "materielSpecifications": this.localEditModel.materielSpecifications || null,
            "brand": this.localEditModel.brand || null
          }]
          this.localSelectIndex = -1;
          axios.post(process.env.BASE_API + this.editModel.postUrl, _param).then(function (ret) {
            if (ret.data && ret.data.success && ret.data.object) {
              if (ret.data.object[0].length == 1 && !ret.data.object[0][0].materieCode) {
                _this.$message.error('本地库匹配失败');
                _this.localResults = [];
                _this.localSelectIndex = -1;
                return false;
              }
              _this.localResults = ret.data.object[0];
              _this.localSelectIndex = 0;
              _this.$message({
                message: '本地库匹配完成',
                type: 'success'
              });
              //for (var i = 0; i < ret.data.object.length; i++) {
              //  _this.editModel.matchedPartNo = ret.data.object[i].matchedPartNo || _this.editModel.matchedPartNo;
              //  _this.editModel.brand = ret.data.object[i].brand || _this.editModel.brand;
              //  _this.editModel.bitNum = ret.data.object[i].bitNum || _this.editModel.bitNum;
              //  _this.editModel.materieCode = ret.data.object[i].materieCode;
              //}
              //if (!ret.data.object[0].materieCode) {
              //  _this.$message.error('本地库匹配失败');
              //} else {
              //  _this.$message({
              //    message: '本地库匹配完成',
              //    type: 'success'
              //  });
              //}
            } else {
              _this.$message.error('本地库匹配失败');
            }
          });
        }
      },
      saveMatch() {
        if (this.editModel.matchedPartNo) {
          // 需求型号/规格
          if (this.editModel.postUrl == "/technics/getInfoToken") {
            // this.tableData[this.editIndex]["bomPartNoSpecs"] = this.editModel.keyword;
            this.tableData[this.editIndex]["matchedPartNo"] = this.editModel.matchedPartNo;
            // this.tableData[this.editIndex]["pkOfMaterial"] = this.editModel.pkOfMaterial;
            //this.tableData[this.editIndex]["brand"] = this.editModel.brand || this.tableData[this.editIndex]["brand"];
            //this.tableData[this.editIndex]["bitNum"] = this.editModel.bitNum || this.tableData[this.editIndex]["bitNum"];
            //this.tableData[this.editIndex]["packaging"] = this.editModel.packaging || this.tableData[this.editIndex]["packaging"];
            console.log(this.editModel.materielSpecifications , this.tableData[this.editIndex]["materielSpecifications"]);
            this.tableData[this.editIndex]["materielSpecifications"] = this.editModel.materielSpecifications || this.tableData[this.editIndex]["materielSpecifications"];
            this.tableData[this.editIndex]["state"] = 1;
          } else {
            // this.tableData[this.editIndex]["bomPartNoSpecs"] = this.editModel.keyword;
            this.tableData[this.editIndex]["pkOfMaterial"] = this.editModel.pkOfMaterial;
            this.tableData[this.editIndex]["matchedPartNo"] = this.editModel.matchedPartNo;
            this.tableData[this.editIndex]["brand"] = this.editModel.brand || this.tableData[this.editIndex]["brand"];
            this.tableData[this.editIndex]["bitNum"] = this.editModel.bitNum || this.tableData[this.editIndex]["bitNum"];
            this.tableData[this.editIndex]["packaging"] = this.editModel.packaging || this.tableData[this.editIndex]["packaging"];
            console.log(this.editModel.materielSpecifications , this.tableData[this.editIndex]["materielSpecifications"]);
            this.tableData[this.editIndex]["materielSpecifications"] = this.editModel.materielSpecifications || this.tableData[this.editIndex]["materielSpecifications"];
            this.tableData[this.editIndex]["materieCode"] = this.editModel.materieCode || this.tableData[this.editIndex]["materieCode"];
            this.tableData[this.editIndex]["materieType"] = this.editModel.materieType || this.tableData[this.editIndex]["materieType"];
            this.tableData[this.editIndex]["unit"] = this.editModel.materieType || this.tableData[this.editIndex]["unit"];
            this.tableData[this.editIndex]["state"] = 1;
          }
        } else {
        }
        this.showEdit = false;
      },
      //获取匹配完成数
      getMatchDegree() {
        var count = 0;
        for (var i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].matchedPartNo) {
            count += 1;
          }
        }
        return count;
      },
      //本地库
      getMatchDegree1() {
        var count = 0;
        for (var i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].materieCode) {
            count += 1;
          }
        }
        return count;
      },
      //保存设置
      saveSeting() {
        this.$refs.bomSetting.saveSeting();
        this.dialogVisible = false;
        this.getInfoToken(1);
        this.loading = this.$loading({
          lock: true,
          text: 'BOM表解析中..',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.5)',
          customClass: 'bomLoading'
        });
      },
      handleClose() {
        this.dialogVisible = false;
        this.getInfoToken(1);
        this.loading = this.$loading({
          lock: true,
          text: 'BOM表解析中..',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.5)',
          customClass: 'bomLoading'
        });
      },
      toggleCantMatch() {
        if (this.showCantMatch) {
          this.showCantMatch = false;
        } else {
          this.showCantMatch = true;
          this.showCantMatch1 = false;
        }
      },
      toggleCantMatch1() {
        if (this.showCantMatch1) {
          this.showCantMatch1 = false;
        } else {
          this.showCantMatch1 = true;
          this.showCantMatch = false;
        }
      },
      //导出的方法
      exportData() {
        if (this.action != 'look') {
          if (!this.isFinish) {
            this.$message({
              message: '请先完成解析',
              type: 'error'
            });
            return false;
          }
          if (!this.isMatchLocal) {
            this.$message({
              message: '请先完成匹配本地库',
              type: 'error'
            });
            return false;
          }
        }
        //  console.log();
        require.ensure([], () => {

          const { export_json_to_excel } = require('@/Excel/Export2Excel');//注意这个Export2Excel路径
          var tHeader = ["是否选择","存货编码", "存货全名", "数量", "位号", "存货规格", "封装", "物料类型", "物料品牌", "工序类型", "焊点", "PDF"];   // 上面设置Excel的表格第一行的标题
          var tData = [];
          //const filterVal = this.tablewatch; // 上面的index、nickName、name是tableData里对象的属性key值
          //console.log(filterVal);
          //const list = this.sels;  //把要导出的数据tableData存到list
          //for (var i = 0; i < list.length; i++) {
          //  if (list[i].materialSource == "0") {
          //    list[i].materialSource = "甲方提供"
          //  } else if (list[i].materialSource == "1") {
          //    list[i].materialSource = "乙方提供"
          //  } else if (list[i].materialSource == "2") {
          //    list[i].materialSource = "部分甲方提供"
          //  }
          //}
          //const data = this.formatJson(filterVal, list);
          //export_json_to_excel(tHeader, data, '生产计划excel');//最后一个是表名字
          for (var i = 0; i < this.tableData.length; i++) {
            if (this.showCantMatch) {
              if (this.tableData[i].matchedPartNo) {
                continue;
              }
            }
            if(this.tableData[i].flagState==0){
              this.tableData[i].isflagState=''
            }else{
              this.tableData[i].isflagState='是否可以代用'
            }
            if (this.showCantMatch1) {
              if (this.tableData[i].materieCode) {
                continue;
              }
            }
            var _data = [];
            if (this.action != "look") {
              _data.push(this.tableData[i]["bomPartNoSpecs"]);
            }
            _data.push(this.tableData[i]["isflagState"]);
            _data.push(this.tableData[i]["parentCode"]);
            _data.push(this.tableData[i]["materieCode"]);
            _data.push(this.tableData[i]["matchedPartNo"] ? this.tableData[i]["matchedPartNo"].replace(/(<([^>]+)>)/ig, '') : "");
            _data.push(this.tableData[i]["num"]);
            _data.push(this.tableData[i]["bitNum"]);
            _data.push(this.tableData[i]["unit"]);
            _data.push(this.tableData[i]["materielSpecifications"] ? this.tableData[i]["materielSpecifications"].replace(/(<([^>]+)>)/ig, '') : "");
            _data.push(this.tableData[i]["packaging"]);
            _data.push(this.tableData[i]["materieType"]);
            _data.push(this.tableData[i]["brand"]);
            _data.push((this.tableData[i]["process"] == 1 ? "SMT" : (this.tableData[i]["process"] == 2 ? "DIP" : "")));
            _data.push(this.tableData[i]["weldingSpot"]);
            _data.push(this.tableData[i]["pdfLink"]);

            tData.push(_data);
          }
          if (this.action != "look") {
            tHeader.unshift("需求型号/规格");
          }
          export_json_to_excel(tHeader, tData, '物料解析');
        })
      },
      cleanData() {
        this.tableData = [];
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]))
      },
      cellEdit(evt) {
        if (this.action == 'look') {
          return false;
        }
        // console.log(evt.currentTarget);
        evt.currentTarget.style.display = "none";
        evt.currentTarget.nextElementSibling.style.display = "block";
        evt.currentTarget.nextElementSibling.firstChild.focus();
      },
      bitNumBlur(index, evt) {
        // console.log(evt.currentTarget);
        evt.currentTarget.parentElement.style.display = "none";
        evt.currentTarget.parentElement.previousElementSibling.style.display = "block";
        this.tableData[index].bitNum = evt.currentTarget.value;
      },
      saveTempCarft() {
        let _this = this;
        var _param = [];
        for (var i = 0; i < this.tableData.length; i++) {
          // console.log();
          _param.push({
            pkProduct: this.pkProduct,
            materielName: this.tableData[i].materielName,
            requirement: this.tableData[i].bomPartNoSpecs,//需求规格
            matchedpartNo: this.tableData[i].matchedPartNo,//完整型号
            bitNum: this.tableData[i].bitNum,
            pdfLink: this.tableData[i].pdfLink,
            brand: this.tableData[i].brand,
            packaging: this.tableData[i].packaging,
            weldingspot: this.tableData[i].weldingspot,
            materielSpecifications: this.tableData[i].materielSpecifications,
            num: this.tableData[i].num,
            materieCode: this.tableData[i].materieCode,
            pkOfMaterial:this.tableData[i].pkOfMaterial,
            flagState:this.tableData[i].flagState
          });
        }
        if (_param.length == 0) {
          _param.push({
            pkProduct: this.pkProduct
          })
        }
        // console.log(_param);
        axios.post(process.env.BASE_API + "/technics/insertBillOfMaterialCraftB", _param).then(ret => {
          _this.$message({
            message: '临时数据保存成功',
            type: 'success'
          });
        });
      },
      removeItem(index) {
        //var _tableData = JSON.parse(JSON.stringify(this.tableData));
        //_tableData.splice(this.tableData[index], 1);
        //console.log(_tableData);
        var _tempList = [];
        for (var i = 0; i < this.tableData.length; i++) {
          if (i != index) {
            _tempList.push(this.tableData[i])
          }
        }
        this.tableData = _tempList;
        // console.log(_tempList);
      }
    },
    mounted() {
      //处理临时数据编辑
      if (this.action == "temp") {
        for (var i = 0; i < this.fileRes.length; i++) {
          var item = {};
          item["pkOfMaterial"] = this.fileRes[i].pkOfMaterial || null;//本地物料主键
          item["parentCode"] = this.fileRes[i].parentCode || null;//父项编号
          item["materieCode"] = this.fileRes[i].materieCode || null;//物料编号
          item["materielSpecifications"] = this.fileRes[i].materielSpecifications;//存货规格
          item["packaging"] = this.fileRes[i].packaging;//封装
          item["unit"] = this.fileRes[i].unit || null;//单位
          item["materieType"] = this.fileRes[i].materieType || null;//物料类型
          item["brand"] = this.fileRes[i].brand || null;//物料品牌
          item["matchedPartNo"] = this.fileRes[i].matchedpartNo || null;//完整型号
          item["materielName"] = this.fileRes[i].matchedpartNo ? this.fileRes[i].matchedpartNo.replace(/(<([^>]+)>)/ig, '') : null;//将matchedpartNo赋给matchedpartNo
          item["process"] = this.fileRes[i].process || null;//工序类型 1smt  2dip
          item["weldingSpot"] = this.fileRes[i].weldingspot || null;//焊点数量
          item["bitNum"] = this.fileRes[i].bitNum || null;//位号
          item["pkProduct"] = this.fileRes[i].pkProduct || null;//产品主键
          item["pdfLink"] = this.fileRes[i].pdfLink || null;//PDF链接
          item["num"] = this.fileRes[i].num || null;//数量
          item["state"] = this.fileRes[i].matchedpartNo ? 1 : 2;//状态 0未匹配 1匹配成功 2匹配失败
          item["bomPartNoSpecs"] = this.fileRes[i].requirement || null;//需求型号/规格
          item["bomPartNoSpecsSplit"] = this.fileRes[i].requirement ? this.fileRes[i].requirement.replace(/ /g, "||") : "";//需求型号/规格
          item['flagState'] = this.fileRes[i].flagState ;
          // console.log(this.fileRes[i].flagState);
          // console.log(item);
          this.isMatchLocal = true;
          this.tableData.push(item);
        }
        this.isFinish = true;
        return false;
      }
      this.handleFileSuccess(this.fileRes);
      if (this.action == "look") {

      } else {
        var _this = this;
        setTimeout(function () {
          _this.dialogVisible = true;
        }, 500);
        this.isMatchLocal = true;
      }
    }
  }
</script>

<style type="text/css">
  .bomLoading .el-loading-spinner i {
    color: white;
    font-size: 30px;
  }

  .bomLoading .el-loading-spinner .el-loading-text {
    color: white;
    font-size: 16px;
    margin-top: 10px
  }

  .clearfix:after,
  .clearfix:before {
    content: " ";
    display: table
  }

  .clearfix:after {
    clear: both
  }

  .clearfix span {
    font-size: 12px;
  }

  .p-BomMatching-box {
    padding-bottom: 40px;
    position: relative
  }

  .p-BomMatching-box .progress-box {
    position: absolute;
    width: 100%;
    height: 5px
  }

  .p-BomMatching-box .progress-box .actual-progress {
    height: 100%;
    background-color: green;
    z-index: 1;
    position: absolute;
    left: 0;
    top: 0
  }

  .p-BomMatching-box .p-BomMatching-help {
    position: absolute;
    top: 6px;
    right: 22px;
    color: #ccc;
    font-size: 12px;
    cursor: pointer;
    z-index: 10
  }

  .p-BomMatching-box .c-BomMatchList-notopen-wapper {
    position: absolute;
    top: 20px;
    left: 50%;
    bottom: 40px;
    -webkit-transform: translateX(-50%);
    transform: translateX(-50%);
    z-index: 10;
    background: -webkit-gradient(linear, left bottom, left top, from(hsla(0, 0%, 100%, .9)), color-stop(80%, transparent));
    background: linear-gradient(0deg, hsla(0, 0%, 100%, .9), transparent 80%);
    text-align: center
  }

  .p-BomMatching-box .c-BomMatchList-notopen-wapper .notopen-tip {
    font-size: 20px;
    font-weight: 700;
    width: 100%;
    line-height: 30px;
    color: #333;
    position: absolute;
    bottom: 80px
  }

  .p-BomMatching-box .c-BomMatchList-notopen-wapper .notopen-button {
    width: 100%;
    position: absolute;
    bottom: 20px
  }

  .p-BomMatching-box .c-BomMatchList-notopen-wapper .notopen-button .znl-button:first-child {
    margin-right: 10px
  }

  .p-BomMatching {
    width: 100%
  }

  .p-BomMatching .p-BomMatching-conteiner {
    margin: 0 auto 0;
    position: relative;
    top: 1px;
    padding-bottom: 10px
  }

  .p-BomMatching .p-BomMatching-header {
    position: relative;
    z-index: 1;
    margin: 0 auto
  }

  .p-BomMatching .p-BomMatching-header .header {
    -webkit-box-sizing: border-box;
    box-sizing: border-box
  }

  .p-BomMatching .p-BomMatching-header .header h3 {
    text-align: center;
    margin: 0;
    padding: 30px 0 10px;
    font-size: 24px;
    color: #fff
  }

  .p-BomMatching .p-BomMatching-header .header.foreign {
    position: relative
  }

  .p-BomMatching .p-BomMatching-header .header.foreign:after {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    width: 1px;
    height: 110px;
    background-color: grey
  }

  .p-BomMatching .p-BomMatching-header .header.internal {
    position: relative
  }

  .p-BomMatching .p-BomMatching-header .header.internal .compatibility {
    position: absolute;
    top: 10px;
    right: 0;
    font-size: 12px;
    color: #abb1ba
  }

  .p-BomMatching .p-BomMatching-header .header .operation-info {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding-bottom: 14px;
    font-size: 12px
  }

  .p-BomMatching .p-BomMatching-header .header .operation-info .textbtn:hover {
    text-decoration: underline
  }

  .p-BomMatching .p-BomMatching-header .header .operation-info>span {
    display: inline-block;
    height: 24px;
    line-height: 24px
  }

  .p-BomMatching .p-BomMatching-header .header .operation-info.foreign {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 38px
  }

  .p-BomMatching .p-BomMatching-header .header .operation-info.foreign div {
    color: #fff;
    margin: 0 15px
  }

  .p-BomMatching .p-BomMatching-header .header .operation-info.foreign .icon-edit_ic {
    position: relative;
    top: 2px;
    cursor: pointer
  }

  .p-BomMatching .p-BomMatching-header .header .operation-info.internal {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center
  }

  .p-BomMatching .p-BomMatching-header .header .operation-info.internal .znl-button {
    margin: 0 5px;
    border-radius: 2px
  }

  .p-BomMatching .p-BomMatching-header .header .operation-info.internal .bombtn-bg {
    display: inline-block;
    width: 16px;
    height: 16px;
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 100% 100%;
    position: relative;
    top: 4px
  }

  .p-BomMatching .p-BomMatching-header .el-date-editor {
    width: 156px
  }

  .p-BomMatching .p-BomMatching-table {
    padding: 0 0;
    position: relative;
    z-index: 0;
    border-top: 1px solid #dadada;
    border-left: 1px solid #dadada;
  }

  .bompage-component__scroll {
    height: 100%
  }

  .bompage-component__scroll .el-scrollbar__wrap {
    overflow-x: auto
  }

  .bompage-component__scroll .el-scrollbar__thumb {
    background-color: rgba(144, 147, 153, .6)
  }

  .bompage-component__scroll .el-scrollbar__bar {
    z-index: 100
  }

  .bompage-component__scroll .el-scrollbar__bar.is-horizontal {
    height: 8px
  }

  .p-BomMatching-helpPopper {
    padding: 0;
    height: 250px
  }

  .c-BomMatchList {
    font-size: 12px;
    position: relative
  }

  .c-BomMatchList {
    font-size: 12px;
    position: relative
  }

  .c-BomMatchList .color-red {
    color: red
  }

  .c-BomMatchList .color-default {
    color: #333
  }

  .c-BomMatchList .cell {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 5px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    word-break: break-all;
    position: relative;
    border-right: 1px solid #d8d8d8;
    height: 30px;
    line-height: 30px
  }

  .c-BomMatchList .cell.active-cell {
    border: 2px solid #099246;
    border-right-width: 3px;
    padding-left: 3px;
    padding-right: 3px;
    border-right-width: 2px;
    position: relative;
    z-index: 2
  }

  .c-BomMatchList .cell.active-cell.disabled {
    border-color: #9b9b9b
  }

  .c-BomMatchList .cell.active-cell .ierror {
    line-height: 26px
  }

  .c-BomMatchList .cell:active {
    background-color: #f0f3f8 !important
  }

  .c-BomMatchList .cell.c-list-body_cell-Operation,
  .c-BomMatchList .cell.c-list-body_cell-Qty,
  .c-BomMatchList .cell.c-list-body_cell-Specs,
  .c-BomMatchList .cell.c-list-header_cell-Operation,
  .c-BomMatchList .cell.c-list-header_cell-Qty,
  .c-BomMatchList .cell.c-list-header_cell-Specs {
    border-right-color: #4d4d4d
  }

  .c-BomMatchList .cell.c-list-body_cell-Specs>div {
    width: 100%
  }

  .c-BomMatchList .cell.c-list-body_cell-BuyQty .buyQty-input {
    width: 100%;
    height: 100%;
    border: none;
    background-color: transparent
  }

  .c-BomMatchList .cell div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
  }

  .c-BomMatchList .c-list-body_cell-SubTotal {
    padding-left: 0;
    padding-right: 0
  }

  .c-BomMatchList .c-list-body_cell-SubTotal .value {
    padding: 0 5px;
    position: relative;
    z-index: 1
  }

  .c-BomMatchList .c-list-body_cell-SubTotal .total-proportion {
    background-color: #f2f2f2;
    height: 100%;
    width: 0;
    position: absolute;
    top: 0;
    left: 0
  }

  .c-BomMatchList .keywords-exact-match {
    color: #e70
  }

  .c-BomMatchList .c-BomMatchList-header-container.fixed {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10
  }

  .c-BomMatchList .c-BomMatchList-header {
    margin: 0 auto;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    background: -webkit-gradient(linear, left top, left bottom, from(#fcfcfc), to(#f5f5f5));
    background: linear-gradient(180deg, #fcfcfc, #f5f5f5);
    border-bottom: 1px solid #d8d8d8
  }

  .c-BomMatchList .c-BomMatchList-header .cell {
    height: 30px;
    line-height: 30px
  }

  .c-BomMatchList .c-BomMatchList-header .cell .icon-shield_btn1 {
    font-size: 12px;
    color: #999;
    position: relative;
    top: 0;
    left: 2px
  }

  .c-BomMatchList .c-BomMatchList-header .cell:hover .selectAllPriceIcon {
    color: #139c25
  }

  .c-BomMatchList .c-BomMatchList-header .c-list-header_cell-Index {
    position: relative;
    overflow: hidden
  }

  .c-BomMatchList .c-BomMatchList-header .c-list-header_cell-Index:before {
    content: "";
    position: absolute;
    right: 5px;
    top: -24px;
    width: 30px;
    height: 50px;
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    z-index: 10;
    background: -webkit-gradient(linear, left top, left bottom, from(#fcfcfc), to(#f5f5f5));
    background: linear-gradient(180deg, #fcfcfc, #f5f5f5)
  }

  .c-BomMatchList .c-BomMatchList-header .c-list-header_cell-Index:after {
    content: "";
    position: absolute;
    right: 4px;
    bottom: 4px;
    width: 30px;
    height: 30px;
    background-color: #d8d8d8
  }

  .c-BomMatchList .c-BomMatchList-header .col-resize {
    position: absolute;
    top: 0;
    right: 0;
    width: 5px;
    height: 30px;
    background-color: red;
    cursor: col-resize
  }

  .c-BomMatchList .c-BomMatchList-header .titleHelp {
    color: #666;
    position: absolute;
    top: 1px;
    right: 14px;
    font-size: 12px;
    -webkit-transform: scale(.9);
    transform: scale(.9)
  }

  .c-BomMatchList .c-BomMatchList-header .selectAllPriceIcon {
    color: #666;
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer
  }

  .c-BomMatchList .c-BomMatchList-body {
    background-color: #fff
  }

  .c-BomMatchList .c-BomMatchList-body .cant-match {
    color: #999;
    overflow: inherit;
    cursor: pointer;
    position: relative;
    z-index: 1
  }

  .c-BomMatchList .c-BomMatchList-body .cell {
    padding-top: 5px;
    padding-bottom: 5px
  }

  .c-BomMatchList .c-BomMatchList-body .cell .hide-suppername,
  .c-BomMatchList .c-BomMatchList-body .cell .matching {
    color: rgba(0, 0, 0, .45)
  }

  .c-BomMatchList .c-BomMatchList-body .cell.c-list-body_cell-Operation {
    padding-top: 0;
    padding-bottom: 0
  }

  .c-BomMatchList .c-BomMatchList-body .cell.c-list-body_cell-Operation .operation-cell {
    width: 100%;
    height: 100%;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: distribute;
    justify-content: space-around;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center
  }

  .c-BomMatchList .c-BomMatchList-body .cell.c-list-body_cell-Operation .operation-cell .bom-radio {
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    border-radius: 50%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    cursor: pointer;
    position: relative
  }

  .c-BomMatchList .c-BomMatchList-body .cell.c-list-body_cell-Operation .operation-cell .bom-radio:after {
    content: "";
    position: absolute;
    border: 1px solid #ccc;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    left: 3px;
    top: 3px;
    border-radius: 50%;
    width: 16px;
    height: 16px
  }

  .c-BomMatchList .c-BomMatchList-body .cell.c-list-body_cell-Operation .operation-cell .bom-radio.IsCheck:after {
    border-color: green
  }

  .c-BomMatchList .c-BomMatchList-body .cell.c-list-body_cell-Operation .operation-cell .bom-radio .iconfont {
    width: 14px;
    height: 14px;
    color: green;
    position: absolute;
    left: 2px;
    top: -1px;
    text-align: center
  }

  .c-BomMatchList .c-BomMatchList-body .cell.c-list-body_cell-Operation .operation-cell .button,
  .c-BomMatchList .c-BomMatchList-body .cell.c-list-body_cell-Operation .operation-cell .znl-button {
    background-color: transparent
  }

  .c-BomMatchList .c-BomMatchList-body .cell.c-list-body_cell-NoTaxPrice .UpdatePriceType0,
  .c-BomMatchList .c-BomMatchList-body .cell.c-list-body_cell-NoTaxPrice .UpdatePriceType1,
  .c-BomMatchList .c-BomMatchList-body .cell.c-list-body_cell-TaxPrice .UpdatePriceType0,
  .c-BomMatchList .c-BomMatchList-body .cell.c-list-body_cell-TaxPrice .UpdatePriceType1 {
    color: #333
  }

  .c-BomMatchList .c-BomMatchList-body .cell.c-list-body_cell-NoTaxPrice .UpdatePriceType2,
  .c-BomMatchList .c-BomMatchList-body .cell.c-list-body_cell-TaxPrice .UpdatePriceType2 {
    color: green
  }

  .c-BomMatchList .c-BomMatchList-body .icon-down-associated,
  .c-BomMatchList .c-BomMatchList-body .ierror {
    display: none;
    text-decoration: none;
    position: absolute;
    top: 0;
    bottom: 0;
    text-align: center;
    color: #666;
    font-size: 12px;
    cursor: pointer
  }

  .c-BomMatchList .c-BomMatchList-body .icon-down-associated.downloadPdf,
  .c-BomMatchList .c-BomMatchList-body .ierror.downloadPdf {
    background-size: 14px 14px;
    background-repeat: no-repeat;
    background-position: 50%
  }

  .c-BomMatchList .c-BomMatchList-body .ierror {
    right: 0;
    width: 30px;
    background: #eef4ff;
    color: red
  }

  .c-BomMatchList .c-BomMatchList-body .downloadPdf {
    display: block;
    background-color: #fff
  }

  .c-BomMatchList .c-BomMatchList-body .icon-down-associated {
    right: 30px;
    width: 30px;
    background: -webkit-gradient(linear, left top, right top, from(transparent), to(#eef4ff));
    background: linear-gradient(90deg, transparent, #eef4ff)
  }

  .c-BomMatchList .c-BomMatchList-body .stype-tag {
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 30px;
    text-align: right;
    padding-right: 5px;
    background: -webkit-gradient(linear, left top, right top, from(transparent), to(#f0f0f0));
    background: linear-gradient(90deg, transparent, #f0f0f0)
  }

  .c-BomMatchList .c-BomMatchList-body .stype-tag .stype4,
  .c-BomMatchList .c-BomMatchList-body .stype-tag .stype6 {
    line-height: 16px;
    height: 16px;
    padding: 0 2px;
    border-radius: 2px;
    position: absolute;
    top: 6px;
    right: 2px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box
  }

  .c-BomMatchList .c-BomMatchList-body .stype-tag .stype4 {
    background: #f20;
    border: 1px solid #f20;
    color: #fff
  }

  .c-BomMatchList .c-BomMatchList-body .stype-tag .stype6 {
    background: #fdf7a0;
    border: 1px solid #fa0;
    color: #f20
  }

  .c-BomMatchList .c-BomMatchList-body .c-BomMatchList-row {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    border-bottom: 1px solid #d8d8d8;
    position: relative
  }

  .c-BomMatchList .c-BomMatchList-body .c-BomMatchList-row.active:after,
  .c-BomMatchList .c-BomMatchList-body .c-BomMatchList-row.active:before {
    content: "";
    width: 100%;
    height: 1px;
    background-color: #e70;
    position: absolute;
    left: 0;
    z-index: 1
  }

  .c-BomMatchList .c-BomMatchList-body .c-BomMatchList-row.active:before {
    top: 0
  }

  .c-BomMatchList .c-BomMatchList-body .c-BomMatchList-row.active:after {
    bottom: 0
  }

  .c-BomMatchList .c-BomMatchList-body .c-BomMatchList-row .cell .select-price-cell {
    width: 100%
  }

  .c-BomMatchList .c-BomMatchList-body .c-BomMatchList-row .cell:after {
    content: attr(data-inventory) "\A"attr(data-inventorytime);
    position: absolute;
    top: 32px;
    left: 0;
    background-color: #eef4ff;
    z-index: 3;
    width: 100%;
    height: 0;
    line-height: 15px;
    white-space: pre-wrap;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 0 2px;
    color: #666;
    font-size: 10px;
    overflow: hidden;
    -webkit-transition: height .1s;
    transition: height .1s
  }

  .c-BomMatchList .c-BomMatchList-body .c-BomMatchList-row:last-child .cell:after {
    top: auto;
    bottom: 31px
  }

  .c-BomMatchList .c-BomMatchList-body .c-BomMatchList-row:hover {
    background-color: #eef4ff;
    -webkit-box-shadow: 0 0 8px 0 rgba(0, 0, 0, .2), 0 -1px 0 0 #d4d4d4;
    box-shadow: 0 0 8px 0 rgba(0, 0, 0, .2), 0 -1px 0 0 #d4d4d4
  }

  .c-BomMatchList .c-BomMatchList-body .c-BomMatchList-row:hover .cell {
    background-color: #eef4ff !important
  }

  .c-BomMatchList .c-BomMatchList-body .c-BomMatchList-row:hover .selection {
    background-color: #c5eab2 !important
  }

  .c-BomMatchList .c-BomMatchList-body .c-BomMatchList-row:hover .icon-down-associated,
  .c-BomMatchList .c-BomMatchList-body .c-BomMatchList-row:hover .ierror {
    display: block
  }

  .c-BomMatchList .c-BomMatchList-body .c-BomMatchList-row:hover .downloadPdf {
    background-color: #eef4ff
  }

  .c-BomMatchList .c-BomMatchList-body .c-BomMatchList-row:hover .hover {
    cursor: pointer;
    text-decoration: underline
  }

  .c-BomMatchList .c-BomMatchList-body .c-BomMatchList-row:hover .c-list-body_cell-Index .iconfont {
    cursor: pointer
  }

  /*.c-BomMatchList .c-BomMatchList-body .c-BomMatchList-row:hover .c-list-body_cell-Index .iconfont:before{content:"\E75D";position:absolute;top:5px;left:0;width:100%;background:-webkit-gradient(linear,left top,right top,from(#fcfcfc),to(#f5f5f5));background:linear-gradient(90deg,#fcfcfc,#f5f5f5)}*/
  .c-BomMatchList .c-BomMatchList-body .c-BomMatchList-row:hover .add-supplier-btn,
  .c-BomMatchList .c-BomMatchList-body .c-BomMatchList-row:hover .enquiry-btn {
    display: block
  }

  .c-BomMatchList .c-BomMatchList-body .c-BomMatchList-row:hover .SupplierName {
    font-weight: 700;
    color: #28c;
    cursor: pointer
  }

  .c-BomMatchList .c-BomMatchList-body .c-BomMatchList-row.alternative .cell {
    background: #fff repeating-linear-gradient(-30deg, #f2f2f2, #f2f2f2 5px, transparent 0, transparent 9px)
  }

  .c-BomMatchList .c-BomMatchList-body .c-BomMatchList-row .BomPartNoSpecsCell {
    width: 100%
  }

  .c-BomMatchList .c-BomMatchList-body .c-BomMatchList-row .add-supplier-btn,
  .c-BomMatchList .c-BomMatchList-body .c-BomMatchList-row .enquiry-btn {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    width: 50px;
    height: 30px;
    text-align: right;
    padding-right: 5px
  }

  .c-BomMatchList .c-BomMatchList-body .c-BomMatchList-row .add-supplier-btn.addbtn,
  .c-BomMatchList .c-BomMatchList-body .c-BomMatchList-row .enquiry-btn.addbtn {
    right: auto;
    left: 0;
    width: 24px
  }

  .c-BomMatchList .c-BomMatchList-body .c-BomMatchList-row .add-supplier-btn.qq,
  .c-BomMatchList .c-BomMatchList-body .c-BomMatchList-row .enquiry-btn.qq {
    display: block;
    width: 19px;
    height: 18px;
    background-repeat: no-repeat;
    background-position: -447px -28px;
    top: 7px;
    right: -4px;
    padding-right: 0;
    cursor: pointer
  }

  .c-BomMatchList .c-BomMatchList-body .c-BomMatchList-row .add-supplier-btn i,
  .c-BomMatchList .c-BomMatchList-body .c-BomMatchList-row .enquiry-btn i {
    color: #28c;
    background-color: #f2f2f2;
    cursor: pointer
  }

  .c-BomMatchList .c-BomMatchList-body .c-BomMatchList-row .enquiry-btn {
    right: 30px
  }

  .c-BomMatchList .c-BomMatchList-body .c-BomMatchList-row.nomatch {
    background: rgb(255, 230, 230)
  }

  .c-BomMatchList .c-BomMatchList-body .c-list-body_cell-Index {
    padding-left: 0;
    padding-right: 0;
    background: -webkit-gradient(linear, left top, right top, from(#fcfcfc), to(#f5f5f5));
    background: linear-gradient(90deg, #fcfcfc, #f5f5f5)
  }

  .c-BomMatchList .c-BomMatchList-body .c-list-body_cell-Index .iconfont {
    width: 100%;
    height: 100%;
    font-size: 12px;
    text-align: center;
    line-height: 20px
  }

  .c-BomMatchList .c-BomMatchList-body .c-list-body_cell-Index .iconfont:before {
    color: #9bb4cc;
    font-size: 16px
  }

  .c-BomMatchList .c-BomMatchList-body .cell-switIsUnfold {
    width: 12px;
    height: 12px;
    line-height: 8px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border: 1px solid #666;
    color: #666;
    display: inline-block;
    border-radius: 2px;
    text-align: center;
    cursor: pointer;
    position: relative;
    margin-right: 16px
  }

  .c-BomMatchList .c-BomMatchList-body .cell-switIsUnfold:after {
    content: attr(data-number);
    width: 16px;
    height: 12px;
    position: absolute;
    top: 0;
    right: -16px;
    z-index: 1;
    text-align: center
  }

  .c-BomMatchList .c-BomMatchList-body .insufficientQuantity {
    width: 100%;
    height: 100%;
    color: #f20;
    font-weight: 700;
    text-align: center;
    line-height: 20px
  }

  .c-BomMatchList .title-attr {
    position: relative;
    overflow: inherit !important
  }

  .c-BomMatchList .title-attr:before {
    position: absolute;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    border: 1px solid #e6e6e6;
    background: #303133;
    color: #fff;
    border-radius: 4px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-align: center;
    padding: 3px;
    z-index: 10
  }

  .c-BomMatchList .title-attr.titleisyun:hover:before {
    content: attr(data-titleisyun)
  }

  .c-BomMatchList .title-attr.titleisyun:before {
    left: -210px;
    width: 206px;
    line-height: 20px
  }

  .c-BomMatchList .title-attr.titleiscomponenttip:hover:before {
    content: attr(data-titleisyun)
  }

  .c-BomMatchList .title-attr.titleiscomponenttip:before {
    left: -110px;
    width: 105px;
    line-height: 20px
  }

  .c-BomMatchList .fixedCell {
    position: absolute;
    z-index: 10;
    background-color: #fff
  }

  .p-BomMatching-footer-buyinfo {
    height: 50px;
    font-size: 12px;
  }

  .p-BomMatching-footer-buyinfo .icon-edit_ic {
    position: absolute;
    right: -20px;
    top: 9px;
    color: #999;
    cursor: pointer
  }

  .p-BomMatching-footer-buyinfo.isFixed {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #fff;
    z-index: 10;
    -webkit-box-shadow: 0 -4px 8px 0 rgba(0, 0, 0, .1);
    box-shadow: 0 -4px 8px 0 rgba(0, 0, 0, .1)
  }

  .p-BomMatching-footer-buyinfo.isFixed .internal {
    position: relative
  }

  .p-BomMatching-footer-buyinfo.isFixed .internal .znl-button {
    top: 0
  }

  .p-BomMatching-footer-buyinfo.isFixed .internal:after {
    content: "";
    width: 1000px;
    height: 100%;
    position: absolute;
    top: 0;
    right: -1000px;
    background-color: #f2f2f2
  }

  .p-BomMatching-footer-buyinfo .item {
    position: relative
  }

  .p-BomMatching-footer-buyinfo .container {
    margin: 0 auto;
    height: 100%;
    background-color: #f2f2f2;
    border: 1px solid #dadada
  }

  .p-BomMatching-footer-buyinfo .foreign,
  .p-BomMatching-footer-buyinfo .internal {
    height: 100%
  }

  .p-BomMatching-footer-buyinfo .foreign {
    -webkit-box-sizing: border-box;
    box-sizing: border-box
  }

  .p-BomMatching-footer-buyinfo .foreign .item {
    margin: 0 25px
  }

  .p-BomMatching-footer-buyinfo .foreign .label {
    color: #7f8fa4
  }

  .p-BomMatching-footer-buyinfo .foreign .value {
    font-size: 14px;
    color: #000;
    font-weight: 700;
    margin-top: 10px
  }

  .p-BomMatching-footer-buyinfo .foreign .compatibility {
    margin-right: 10px
  }

  .p-BomMatching-footer-buyinfo .foreign .compatibility .value {
    text-align: right
  }

  .p-BomMatching-footer-buyinfo .internal {
    background-color: #f2f2f2;
    line-height: 50px;
    overflow: hidden;
    padding-right: 20px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  .p-BomMatching-footer-buyinfo .internal.vip-internal {
    padding-left: 0
  }

  .p-BomMatching-footer-buyinfo .internal .item {
    margin-left: 20px;
    height: 100%;
    line-height: 50px
  }

  .p-BomMatching-footer-buyinfo .internal .item .Price {
    font-size: 24px;
    color: #f20;
    font-weight: 700;
    vertical-align: middle;
    margin-left: 5px
  }

  .p-BomMatching-footer-buyinfo .internal .item .CheckedDatas {
    color: #ed6f00
  }

  .p-BomMatching-footer-buyinfo .legend {
    height: 100%;
    display: inline-block;
    padding: 0 15px;
    text-align: center;
    color: #7f8fa4;
    cursor: pointer
  }

  .p-BomMatching-footer-buyinfo .legend .header {
    display: inline-block;
    width: 30px;
    height: 16px;
    line-height: 16px;
    border-width: 1px;
    border-style: solid;
    margin-top: 8px;
    font-size: 13px
  }

  .p-BomMatching-footer-buyinfo .legend .tiptext {
    line-height: 16px;
    margin-top: 2px;
    display: inline-block
  }

  .p-BomMatching-footer-buyinfo .legend.legend3 .header {
    background-color: #ffe6e6;
    border-color: #fa5f65;
    color: #ed6f00
  }

  .p-BomMatching-footer-buyinfo .legend.legend4 .header {
    background-color: #fffac2;
    border-color: #ed9e00;
    color: #ff2d55
  }

  .p-BomMatching-footer-buyinfo .permissions-tip {
    color: #999
  }

  .vip-BomMatching-footer-buyinfo {
    min-width: auto
  }

  .vip-BomMatching-footer-buyinfo .container {
    width: 1239px !important;
    background-color: #fff
  }

  .vip-BomMatching-footer-buyinfo .foreign {
    width: 400px !important;
    border-right: none;
    line-height: 50px
  }

  .vip-BomMatching-footer-buyinfo .foreign .el-checkbox {
    margin: 0 20px 0 8px
  }

  .vip-BomMatching-footer-buyinfo .internal {
    width: 365px !important;
    background-color: #fff
  }

  .pull-left {
    float: left;
  }

  .pull-right {
    float: right;
  }

  .znl-button {
    display: inline-block;
    position: relative;
    font-size: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 0 5px;
    text-align: center;
    cursor: pointer
  }

  .znl-button.default {
    border: 1px solid #ced0da;
    background-color: #fff
  }

  .znl-button.default .button {
    color: #333
  }

  .znl-button.default .button button {
    border: none !important
  }

  .znl-button.default .button .iconfont {
    color: #333;
    font-size: 12px
  }

  .znl-button.default .button .icon .iconfont {
    color: #333
  }

  .znl-button.default:hover {
    background-color: #e6e6e6
  }

  .znl-button.main {
    border: 1px solid #ed9e00;
    background-color: #ed9e00;
    color: #fff
  }

  .znl-button.main:hover {
    background-color: #e70
  }

  .znl-button.main .icon .iconfont {
    color: #fff
  }

  .znl-button.main .znl-button-menu {
    background-color: #ed9e00;
    color: #fff
  }

  .znl-button.main .znl-button-menu:hover {
    background-color: #e70
  }

  .znl-button.main .znl-button-menu.menu-disabled {
    color: #ffe173
  }

  .znl-button.main .znl-button-menu.menu-disabled:hover {
    background-color: #ed9e00
  }

  .znl-button.minor {
    border: 1px solid #ED9E00;
    background-color: #FFE4D0;
    color: #E70
  }

  .znl-button.minor:hover {
    background-color: #FFE174
  }

  .znl-button.green {
    border: 1px solid #4caf50;
    background-color: #4caf50;
    color: #fff
  }

  .znl-button.green:hover {
    background-color: #429946
  }

  .znl-button.green .icon .iconfont {
    color: #fff
  }

  .znl-button.green .znl-button-menu {
    background-color: #4caf50;
    color: #fff
  }

  .znl-button.green .znl-button-menu:hover {
    background-color: #429946
  }

  .znl-button.green .znl-button-menu.menu-disabled,
  .znl-button.green .znl-button-menu.menu-disabled:hover {
    background-color: #4caF5099
  }

  .znl-btn-select .button button {
    border-radius: 4px 0 0 4px !important;
    height: 22px !important
  }

  .c-ReplaceDialog .znl-dialog__body {
    padding-top: 0
  }

  .c-ReplaceDialog .keywords-exact-match {
    color: #e70
  }

  .c-ReplaceDialog .color-main {
    color: #e70;
    font-weight: 700
  }

  .c-ReplaceDialog .light-color {
    color: rgba(0, 0, 0, .45)
  }

  .c-ReplaceDialog .c-ReplaceDialog-header {
    line-height: 30px;
    font-size: 12px
  }

  .c-ReplaceDialog .c-ReplaceDialog-header span {
    display: inline-block;
    width: 600px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    line-height: 30px;
    vertical-align: bottom
  }

  .c-ReplaceDialog .c-ReplaceDialog-header label,
  .c-ReplaceDialog .c-ReplaceDialog-input label {
    font-size: 12px;
    display: inline-block;
    width: 80px;
    text-align: right;
    color: #7f8fa4;
    line-height: 30px;
    vertical-align: bottom
  }

  .c-ReplaceDialog .c-ReplaceDialog-input {
    padding: 5px 0
  }

  .c-ReplaceDialog .c-ReplaceDialog-input input {
    margin: 0;
    padding: 0;
    height: 30px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 580px;
    font-size: 12px
  }

  .c-ReplaceDialog .c-ReplaceDialog-input .znl-button {
    margin-left: 10px
  }

  .c-ReplaceDialog .footer {
    text-align: right
  }

  .c-ReplaceDialog .footer .znl-button {
    margin-right: 10px;
    margin-top: 10px
  }

  .BomMatching_Element-table.el-table {
    border-left-color: #e6e6e6;
    border-top-color: #e6e6e6;
    color: #000;
    border-left: none;
    border-top: none
  }

  .BomMatching_Element-table.el-table td,
  .BomMatching_Element-table.el-table th.is-leaf {
    border-right: none;
    border-bottom-color: #e6e6e6
  }

  .BomMatching_Element-table.el-table .el-table__body,
  .BomMatching_Element-table.el-table .el-table__header {
    border-left: 1px solid #e6e6e6
  }

  .BomMatching_Element-table.el-table td {
    border-right: 1px solid #e6e6e6
  }

  .BomMatching_Element-table.el-table th>.cell {
    height: 30px;
    line-height: 30px;
    background: -webkit-gradient(linear, left top, left bottom, from(#fcfcfc), to(#f5f5f5));
    background: linear-gradient(180deg, #fcfcfc, #f5f5f5);
    color: rgba(0, 0, 0, .65);
    font-weight: 700;
    font-size: 12px;
    padding: 0 5px
  }

  .BomMatching_Element-table.el-table .el-table__header th {
    border-top: 1px solid #e6e6e6;
    border-right: 1px solid #e6e6e6
  }

  .BomMatching_Element-table.el-table .el-table__row .cell {
    padding: 5px 5px
  }

  .BomMatching_Element-table.el-table .el-table__row .cell,
  .BomMatching_Element-table.el-table .el-table__row .cell div {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap
  }

  .BomMatching_Element-table.el-table .el-table__row.active {
    background-color: #f3fee4;
    border: 1px solid #529642
  }

  .BomMatching_Element-table.el-table .el-table__row.active .table-checked-column {
    background: #f3fee4;
    color: #529642
  }

  .BomMatching_Element-table.el-table .el-table__row.active td {
    border-top: 1px solid #529642;
    border-bottom: 1px solid #529642
  }

  .BomMatching_Element-table.el-table .el-table__row.active td:first-child {
    border-left: 1px solid #529642
  }

  .BomMatching_Element-table.el-table .el-table__row.active td:last-child {
    border-right: 1px solid #529642
  }

  .BomMatching_Element-table.el-table .cell p {
    line-height: 18px
  }

  .BomMatching_Element-table.el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #eef4ff
  }

  .BomMatching_Element-table .table-checked-column {
    background: -webkit-gradient(linear, left top, right top, from(#fcfcfc), to(#f5f5f5));
    background: linear-gradient(90deg, #fcfcfc, #f5f5f5);
    text-align: center
  }

  .BomMatching_Element-table .table-checked-column span {
    cursor: pointer
  }

  .BomMatching_Element-table .column-Trend {
    text-align: center
  }

  .BomMatching_Element-table .column-Trend .iconfont {
    color: #666;
    font-size: 12px
  }

  .BomMatching_Element-table .price-span {
    color: #e70;
    font-weight: 700
  }

  .BomMatching_Element-table .description-span {
    color: #666
  }

  .BomMatching_Element-table.el-table td,
  .BomMatching_Element-table.el-table th {
    padding: 0
  }

  .znl-button .button {
    font-size: 12px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    white-space: nowrap
  }

  .c-Editor {
    background-color: #fff;
    width: 100%;
    height: 100%;
    line-height: 26px;
    font-size: 12px;
    padding: 0 5px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1
  }

  .c-Editor .c-Editor-input {
    width: 100%;
    height: 100%;
    border: none;
    resize: none;
    background-color: transparent;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    font-size: 12px
  }

  .c-Editor .c-Editor-input:focus {
    outline: none;
    border-color: #ccc
  }

  .p-BomMatching.look .c-BomMatchList .c-BomMatchList-header,
  .p-BomMatching.look .p-BomMatching-table,
  .p-BomMatching.look .p-BomMatching-footer-buyinfo .container {
    width: 1350px !important
  }

  .p-BomMatching.look .p-BomMatching-footer-buyinfo .foreign .compatibility {
    display: none
  }

  .btn-remove {
    cursor: pointer;
  }

  .btn-remove:hover {
    color: red
  }
</style>