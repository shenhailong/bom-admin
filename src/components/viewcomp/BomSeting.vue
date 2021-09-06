<template>
  <div class="c-BomMatching-SettingDialog">
    <div class="content">
      <div class="frombox">
        <div class="flexbox">
          <label class="label"> 采购套数： </label>
          <div class="znl-component-input znl-border-input left" style="width: 100px; height: 26px; line-height: 26px">
            <div class="el-input znl-input-type znl-input-default" style="width: auto; height: 26px; line-height: 26px; margin-left: 0px">
              <input tabindex="0" type="text" value="1" autocomplete="off" class="el-input__inner" />
            </div>
          </div>
          &nbsp;套
        </div>
        <div class="flexbox">
          <label class="label">应用等级： </label>
          <div class="value">
            <el-radio v-model="model.Level" :label="1">商业/工业级</el-radio>
            <el-radio v-model="model.Level" :label="2">汽车级</el-radio>
          </div>
        </div>
        <div class="flexbox">
          <label class="label"> 批量询价： </label>
          <div class="value">
            <el-checkbox>上传后系统立即向供应商发起询价</el-checkbox>
          </div>
        </div>
        <div class="flexbox">
          <label class="label"> 供应商类型： </label>
          <div class="value">
            <el-checkbox v-model="model.IsMatchECommerce">电商直供</el-checkbox>
            <el-checkbox v-model="MatchStockType">市场现货(需询价)</el-checkbox>
            <div class="radiobox" style="" v-if="MatchStockType">
              <el-radio v-model="model.MatchStockType" :label="1">仅限正品</el-radio>
              <el-radio v-model="model.MatchStockType" :label="0">全部</el-radio>
            </div>
          </div>
        </div>
      </div>
      <div class="preference-body">
        <div class="brand-title">被动件品牌偏好 :</div>
        <div class="brand-container">
          <div class="brand-user">
            <div class="brand-title">贴片电阻</div>
            <div class="brand-row-container">
              <div class="brand-row" v-for="item in getListByCateId(21)">
                {{nameFilter(item.BrandName)}}
                <i class="iconfont el-icon-upload2" @click="upTop(item)"></i>
              </div>
            </div>
          </div>
          <div class="brand-user">
            <div class="brand-title">贴片电容</div>
            <div class="brand-row-container">
              <div class="brand-row" v-for="item in getListByCateId(2)">
                {{nameFilter(item.BrandName)}}
                <i class="iconfont el-icon-upload2" @click="upTop(item)"></i>
              </div>
            </div>
          </div>
          <div class="brand-user">
            <div class="brand-title">贴片电解</div>
            <div class="brand-row-container">
              <div class="brand-row" v-for="item in getListByCateId(4)">
                {{nameFilter(item.BrandName)}}
                <i class="iconfont el-icon-upload2" @click="upTop(item)"></i>
              </div>
            </div>
          </div>
          <div class="brand-user">
            <div class="brand-title">钽电容</div>
            <div class="brand-row-container">
              <div class="brand-row" v-for="item in getListByCateId(3)">
                {{nameFilter(item.BrandName)}}
                <i class="iconfont el-icon-upload2" @click="upTop(item)"></i>
              </div>
            </div>
          </div>
          <div class="brand-user">
            <div class="brand-title">贴片电感</div>
            <div class="brand-row-container">
              <div class="brand-row" v-for="item in getListByCateId(333)">
                {{nameFilter(item.BrandName)}}
                <i class="iconfont el-icon-upload2" @click="upTop(item)"></i>
              </div>
            </div>
          </div>
          <div class="brand-user">
            <div class="brand-title">磁珠</div>
            <div class="brand-row-container">
              <div class="brand-row" v-for="item in getListByCateId(336)">
                {{nameFilter(item.BrandName)}}
                <i class="iconfont el-icon-upload2" @click="upTop(item)"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  export default {
    props:[],
    data() {
      return {
        MatchStockType: null,
        model: {
          Level: null,//应用等级（1-商业/工业级，2-汽车级）
          IsMatchECommerce: null,//是否匹配电商直供库存
          MatchStockType: null,//匹配现货类型（0-全部，1-仅限正品，空表示不匹配现货）
          Brands: [],//品牌偏好设置列表
          ID: null,//品牌偏好设置ID
          CategoryId: null,//分类ID
          CategoryName: null,//分类名称
          BrandId: null,//品牌ID
          BrandName: null,//品牌名称
          Sort: null//品牌排序（从小到大）
        }
      }
    },
    watch: {
      "MatchStockType"(val) {
        if (val === true && this.model.MatchStockType===null) {
          this.model.MatchStockType = 0;
        }
        if (val===false) {
          this.model.MatchStockType = null;
        }
      }
    },
    methods: {
      saveSeting() {
        //重新排序
        for (var i = 0; i < this.model.Brands.length; i++) {
          this.model.Brands[i].Sort = (i + 1);
        }
        // console.log(this.model);
        axios.post(process.env.BASE_API + "/technics/SaveMatchSet", this.model).then(function (ret) {
          // console.log(ret);
        });
      },
      getMatchSet() {
        var that = this;
        axios.post(process.env.BASE_API + "/technics/getMatchSet").then(ret => {
          if (ret.data && ret.data.success && ret.data.object) {
            that.model = JSON.parse(ret.data.object);
            if (that.model.MatchStockType != null) {
              that.MatchStockType = true;
            } else {
              that.MatchStockType = false;
            }
            // console.log(that.model);
          }
        });
      },
      getListByCateId(CategoryId) {
        var list = [];
        for (var i = 0; i < this.model.Brands.length; i++) {
          if (this.model.Brands[i].CategoryId == CategoryId) {
            list.push(this.model.Brands[i]);
          }
        }
        return list;
      },
      nameFilter(name) {
        if (name.match(/[^\(\)]+(?=\))/g)) {
          return name.match(/[^\(\)]+(?=\))/g)[0];
        } else {
          return name;
        }
      },
      upTop(item) {
        var list = [];
        var first = null;
        for (var i = 0; i < this.model.Brands.length; i++) {
          if (this.model.Brands[i].BrandId == item.BrandId && this.model.Brands[i].CategoryId == item.CategoryId) {
            first = this.model.Brands[i];
          } else {
            list.push(this.model.Brands[i]);
          }
        }
        list.unshift(first);
        this.model.Brands = list;
      }
    },
    mounted() {
      this.getMatchSet();


      //根据完整型号匹配本地物料信息
      axios.post(process.env.BASE_API + "/technics/selectBillOfMaterialByModel", [
        {
          "matchedPartNo": "C0805X103K501T",
          "brand": "HEC（HOLY STONE"
        },
        {
          "matchedPartNo": "0805B104M500NT",
          "brand": "FH"
        },
        {
          "matchedPartNo": "05K303FT",
          "brand": "FH"
        }
      ]).then(res => {
        // console.log(res);
        //本地物料主键
        //"pkOfMaterial": 53496,
        //
        //  父项编号
        //"parentCode": null,
        //
        //  物料编号
        //"materieCode": "444",
        //
        //
        //  物料规格
        //"materielSpecifications": null,
        //
        //  封装
        //"packaging": null,
        //
        //  单位
        //"unit": null,
        //
        //
        //  物料类型
        //"materieType": "电熔22",
        //
        //  物料品牌
        //"brand": "FH",
        //
        //
        //  完整型号
        //"matchedPartNo": "0805B104M500NT",
        //
        //  工序类型 1smt  2dip
        //"process": "1",
        //
        //  焊点数量
        //"weldingSpot": 12,
        //
        //  位号
        //"bitNum": null,
        //
        //  单板数量
        //"num": null,
        //
        //  产品主键
        //"pkProduct": null,
      });
      //

    }
  }
</script>

<style type="text/css">
  .c-BomMatching-SettingDialog .el-checkbox__input.is-checked+.el-checkbox__label,.c-BomMatching-SettingDialog .el-radio__input.is-checked+.el-radio__label{color:#606266}
  .c-BomMatching-SettingDialog .el-dialog__body{padding:0 20px;line-height:24px}
  .c-BomMatching-SettingDialog .IsRepeatInquiry-tip{color:red;font-size:12px;position:absolute;left:90px;bottom:-5px}
  .c-BomMatching-SettingDialog .IsRepeatInquiry-tip .iconfont{font-size:12px}
  .c-BomMatching-SettingDialog .content{display:-webkit-box;display:-ms-flexbox;display:flex}
  .c-BomMatching-SettingDialog .frombox{-webkit-box-flex:1;-ms-flex:1;flex:1}
  .c-BomMatching-SettingDialog .preference-body{width:510px}
  .c-BomMatching-SettingDialog .preference-body .brand-title{color:rgba(0,0,0,.65);font-size:14px}
  .c-BomMatching-SettingDialog .preference-body .brand-container{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;font-size:12px}
  .c-BomMatching-SettingDialog .preference-body .brand-container .brand-user{width:80px;height:248px;border:1px solid #dbdbdb}
  .c-BomMatching-SettingDialog .preference-body .brand-container .brand-title{text-align:center;border-bottom:1px solid #dbdbdb;color:rgba(0,0,0,.65);font-weight:700;background:-webkit-gradient(linear,left top,left bottom,from(#fcfcfc),to(#f5f5f5));background:linear-gradient(180deg,#fcfcfc,#f5f5f5)}
  .c-BomMatching-SettingDialog .preference-body .brand-container .brand-row-container{height:224px;overflow-y:auto}
  .c-BomMatching-SettingDialog .preference-body .brand-container .brand-row{padding:0 5px;line-height:28px;position:relative}
  .c-BomMatching-SettingDialog .preference-body .brand-container .brand-row:hover .iconfont{display:block}
  .c-BomMatching-SettingDialog .preference-body .brand-container .iconfont{position:absolute;top:50%;right:0;-webkit-transform:translateY(-50%);transform:translateY(-50%);color:#409EFF;display:none;cursor:pointer;font-weight:bold;font-size:14px}
  .c-BomMatching-SettingDialog .flexbox{height:60px;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:start;-ms-flex-pack:start;justify-content:flex-start;-webkit-box-align:center;-ms-flex-align:center;align-items:center;position:relative}
  .c-BomMatching-SettingDialog .flexbox .label{width:90px;color:rgba(0,0,0,.65);font-size:14px}
  .c-BomMatching-SettingDialog .flexbox .radiobox{position:absolute;bottom:-20px;right:4px;background:#f0f0f0;padding:0 10px 0 5px;border-radius:4px;height:30px;line-height:30px}
  .c-BomMatching-SettingDialog .flexbox .radiobox:after{content:"";width:10px;height:10px;-webkit-transform:translatex(-50%) rotate(45deg);transform:translatex(-50%) rotate(45deg);position:absolute;top:-5px;left:50%;background:#f0f0f0}
  .c-BomMatching-SettingDialog .flexbox .radiobox .el-radio{margin-left:5px;margin-right:5px}
  .c-BomMatching-SettingDialog .footer{position:relative}
  .c-BomMatching-SettingDialog .footer .znl-button{margin-left:10px}
  .c-BomMatching-SettingDialog .el-input__inner{line-height:26px;height:26px;padding:0 5px}
  .c-BomMatching-SettingDialog .el-checkbox__label{padding-left:5px}
  .c-BomMatching-SettingDialog .el-checkbox{margin-right:20px}
  .c-BomMatching-SettingDialog .el-dialog__footer{padding:10px 20px 10px}
  .icon-top:before{content:"\e77b"}

</style>
