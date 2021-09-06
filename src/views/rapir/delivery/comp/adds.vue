<template>
  <div class="pps">
    <add :cons="comp_index">
      <div>
        <el-button type="primary" @click="onSubmit">录入</el-button>
      </div>
      <br />
      <!-- 子列表 -->
      <list :cons="mindatas">
        <column :cons="cs" :btns="btns" @btnClick="btnClick"></column>
      </list>
    </add>
    <add :cons="input_data">
      <inputs :cons="comp_index.updateRow" @close='close' />
    </add>
  </div>
</template>
<script>
import { parseTime } from "@/utils/viewCompUtil";
import column from "@/components/add/comp/column";
import add from "@/components/add/add"; //弹窗组件
import list from "@/components/add/comp/list"; //列表
import inputs from "./input";
import bus from "@/assets/bus/eventBus.js"; //eventBus 的引入
import { selectAllOrderPutoutAsPage ,deleteOrderPutoutByPks} from "@/api/rapir/rapir"; //返修url路径
// selectAllOrderPutoutAsPage
// import btns from "@/components/btnselect/index"; //状态按钮
export default {
  components: { column, add, list, inputs },
  mounted() {
    bus.$on("compdata", (data) => {
      // 数据的传递
      this.comp_index = data;
      console.log(this.comp_index.updateRow.pkRepairOrder);
      let jsons = {
        pkRepairOrder: this.comp_index.updateRow.pkRepairOrder,
        limit:100,
        page:1
      };
      // console.log(jsons);
      selectAllOrderPutoutAsPage(jsons).then((res) => {
        // console.log(res);
        this.mindatas = res.object
        for(let i of this.mindatas){
         let lok ={
            0:'快递',
            1:'货拉拉',
            3:"公司配送",
            4:"自提"
         }
          i.shippingMethod = lok[i.shippingMethod]
        }
      });
    });
  },
  data() {
    return {
      mindatas: [],
      con: [],
      btns: [ "编辑", "删除"],
      comp_index: {
        contentVisiable: false,
        title: "返修出库单上传",
      },
      input_data: {
        contentVisiable: false,
        title: "返修出库录入",
      },
      cs: [
        {
          prop: "productCode",
          label: "产品编号",
          width: null,
        },
        {
          prop: "sequenceNum",
          label: "序列号段",
          width: null,
        },
        {
          prop: "creationtime",
          label: "创建时间",
          width: null,
        },
        {
          prop: "shippingMethod",
          label: "送货方式",
          width: null,
        },
      ],
      upFileFileList: [],
      receiptFileList: [],
    };
  },
  methods: {
    btnClick(conent) {
      // console.log(conent);
      if (conent.code == 0) {
        this.onSubmit();
        this.comp_index.updateRow = conent.id;
      }
      if(conent.code ==1){
        // console.log(conent.id);conent.id.pkRepairPutout
        let jsons = {
         pkArr:conent.id.pkRepairPutout
        }
        // console.log(jsons);
        deleteOrderPutoutByPks(jsons)
      }
    },
    close(){
      this.input_data= {
        contentVisiable: false,
        title: "返修出库录入",
      }
       let jsons = {
        pkRepairOrder: this.comp_index.updateRow.pkRepairOrder,
         limit:100,
        page:1
      };
      // console.log(jsons);
      selectAllOrderPutoutAsPage(jsons).then((res) => {
        // console.log(res);
        this.mindatas = res.object
        for(let i of this.mindatas){
         let lok ={
            0:'快递',
            1:'闪送',
            2:'货拉拉',
            3:"公司配送",
            4:"自提"
         }
          i.shippingMethod = lok[i.shippingMethod]
        }
      });
    },
    onSubmit() {
      //点击录入按钮
      this.input_data = {
        contentVisiable: true,
        title: "返修出库录入",
      };
      this.comp_index.updateRow = {
        outImgName: null, //出库单名称
        outImgUrl: null, //出库单路径
        receiptImgUrl: null, //
        receiptImgName: null,
        pkRepairOrder:this.comp_index.updateRow.pkRepairOrder,
        pkOmgPrduFinishPutoutB: null, // 返修出库子表主键
        pkOmgPrduFinishPutout: null, // 返修出库主表主键
        billState: "0", // 单据状态
        procedureName: null, // 工序类型
        sequenceNum: null, // 序列号段
        putoutNum: null, // 出库数量
        finishNum: null, // 累计出库数量
        // fileName: null, // 文件名称
        // fileFullname: null, // 文件全名称
        chargePsn: null, // 经办人
        chargeTime: null, // 经办时间
        creator: null, // 创建人
        creatorShow: null, // 创建人
        shippingMethod: null, //出货方式
        trackingNumber: null, //订单号
        // receiptName: null, //回执单名称
        // receiptFullname: null, //回执单路径
        creationtime: parseTime(new Date()), // 创建时间
        dr: 0, // 删除标志
        ts: parseTime(new Date()), // 时间戳
        receiptUrl: null,
      };
    },
  },
};
</script>
<style  scoped>
* {
  /* margin: 0;padding: 0; */
}
</style>