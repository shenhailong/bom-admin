<template>
  <div>
    <!-- v-if="rolename=='全权角色'" -->
    <div>
      <el-row>
        <el-col v-if="this.roles[0].roleName=='全权角色'||this.roles[0].roleName=='销售角色'" :span="4">
			  <el-card class="box-card">
			    <div slot="header" class="clearfix">
			      <span>销售报价</span>
			      <i>{{a}}</i>
			    </div>
			    <div class="text-item">
			      <span @click="skit('/MENU36962/MENU25210')">点击查看</span>
			    </div>
			  </el-card>
			</el-col>
			<el-col v-if="this.roles[0].roleName=='全权角色'||this.roles[0].roleName=='工艺角色'"  :span="4" :offset="1">
			  <el-card class="box-card">
			    <div slot="header" class="clearfix">
			      <span>产品工艺审核</span>
			      <i>{{b}}</i>
			    </div>
			    <div class="text-item">
			      <span @click="skit('/MENU3252/MENU32036')">点击查看</span>
			    </div>
			  </el-card>
			</el-col>
			<el-col v-if="this.roles[0].roleName=='全权角色'||this.roles[0].roleName=='采购角色'" :span="4" :offset="1">
			  <el-card class="box-card">
			    <div slot="header" class="clearfix">
			      <span>采购报价</span>
			      <i>{{c}}</i>
			    </div>
			    <div class="text-item">
			      <span @click="skit('/MENU63907/MENU38889')">点击查看</span>
			    </div>
			  </el-card>
			</el-col>
			<el-col v-if="this.roles[0].roleName=='全权角色'||this.roles[0].roleName=='生产角色'" :span="4" :offset="1">
			  <el-card class="box-card">
			    <div slot="header" class="clearfix">
			      <span>生产报价</span>
			      <i>{{d}}</i>
			    </div>
			    <div class="text-item">
			      <span @click="skit('/MENU61719/MENU35235')">点击查看</span>
			    </div>
			  </el-card>
			</el-col>
		 </el-row>
	  </div>
	<div>
		<div style="padding: 10px;"></div>
	 <hr />
	 <el-row>
    <el-col :span="4">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>销售发起</span>
          <i>{{productionCountNumInfo.startCount}}</i>
        </div>
        <div class="text-item">
          <span @click="skit('/MENU36962/MENU5712')">点击查看</span>
        </div>
      </el-card>
    </el-col>

    <el-col :span="4" :offset="1">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>工艺审核</span>
          <i>{{productionCountNumInfo.technicsCount}}</i>
        </div>
        <div class="text-item">
          <span @click="skit('/MENU3252/MENU38757')">点击查看</span>
        </div>
      </el-card>
    </el-col>

    <el-col :span="4" :offset="1">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>生产计划</span>
          <i>{{productionCountNumInfo.planCount}}</i>
        </div>
        <div class="text-item">
          <span @click="skit('/MENU61719/MENU7214')">点击查看</span>
        </div>
      </el-card>
    </el-col>

    <el-col :span="4" :offset="1">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>库房备料</span>
          <i>{{productionCountNumInfo.houseCount}}</i>
        </div>
        <div class="text-item">
          <span @click="skit('/MENU76444/MENU2591')">点击查看</span>
        </div>
      </el-card>
    </el-col>

    <el-col :span="4" :offset="1">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>物料采购</span>
          <i>{{productionCountNumInfo.purchaseCount}}</i>
        </div>
        <div class="text-item">
          <span @click="skit('/MENU63907/MENU68233')">点击查看</span>
        </div>
      </el-card>
    </el-col>

    <el-col :span="4">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>来料质检</span>
          <i>{{productionCountNumInfo.qualityCount}}</i>
        </div>
        <div class="text-item">
          <span @click="skit('/MENU77127/MENU60952')">点击查看</span>
        </div>
      </el-card>
    </el-col>

    <el-col :span="4" :offset="1">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>物料入库</span>
          <i>{{productionCountNumInfo.putinCount}}</i>
        </div>
        <div class="text-item">
          <span @click="skit('/MENU76444/MENU22290')">点击查看</span>
        </div>
      </el-card>
    </el-col>

    <el-col :span="4" :offset="1">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>SMT生产</span>
          <i>{{productionCountNumInfo.smtCount}}</i>
        </div>
        <div class="text-item">
          <span @click="skit('/MENU61719/MENU70148')">点击查看</span>
        </div>
      </el-card>
    </el-col>

    <el-col :span="4" :offset="1">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>DIP生产</span>
          <i>{{productionCountNumInfo.dipCount}}</i>
        </div>
        <div class="text-item">
          <span @click="skit('/MENU61719/MENU54527')">点击查看</span>
        </div>
      </el-card>
    </el-col>
    <el-col :span="4" :offset="1">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>三防</span>
          <i>{{productionCountNumInfo.defenseCount}}</i>
        </div>
        <div class="text-item">
          <span @click="skit('/MENU61719/MENU90813')">点击查看</span>
        </div>
      </el-card>
    </el-col>
    <el-col :span="4" >
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>老化,测试</span>
          <i>{{productionCountNumInfo.testCount}}</i>
        </div>
        <div class="text-item">
          <span @click="skit('/MENU61719/MENU30865')">点击查看</span>
        </div>
      </el-card>
    </el-col>

    <el-col :span="4" :offset="1">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>成品质检</span>
          <i>{{productionCountNumInfo.becomeCount}}</i>
        </div>
        <div class="text-item">
          <span @click="skit('/MENU77127/MENU53406')">点击查看</span>
        </div>
      </el-card>
    </el-col>

    <el-col :span="4" :offset="1">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>成品入库</span>
          <i>{{productionCountNumInfo.finishPutinCount}}</i>
        </div>
        <div class="text-item">
          <span @click="skit('/MENU76444/MENU70309')">点击查看</span>
        </div>
      </el-card>
    </el-col>

    <el-col :span="4" :offset="1">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>成品出库</span>
          <i>{{productionCountNumInfo.putoutCount}}</i>
        </div>
        <div class="text-item">
          <span @click="skit('/MENU76444/MENU24450')">点击查看</span>
        </div>
      </el-card>
    </el-col>

    <el-col :span="4" :offset="1">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>通知开票</span>
          <i>{{productionCountNumInfo.invoiceCount}}</i>
        </div>
        <div class="text-item">
          <span @click="skit('/MENU13775/MENU53840')">点击查看</span>
        </div>
      </el-card>
    </el-col> 

        <!-- <el-col :span="4" :offset="1">
		  <el-card class="box-card">
		    <div slot="header" class="clearfix">
		      <span>测试</span>
		      <i>{{productionCountNumInfo.invoiceCount}}</i>
		    </div>
		    <div class="text-item">
		      <span @click="skit('/hiderouters/quote3')">点击查看</span>
		    </div>
		  </el-card>
		</el-col>
       <div class="title">
          <div class="ProgressFlowChart">
            <h3>进度查询</h3>
            <hr />
            <div class="title">
              <div class="offer">
                <h5>报价流程</h5>
                <div class="btns">
                  <div>1</div>
                  <div>1</div>
                  <div>2</div>
                  <div>3</div>
                </div>
              </div>
              <div>
                <h5>返修流程</h5>
                <div class="btns">
                  <div>1</div>
                  <div>1</div>
                  <div>2</div>
                </div>
              </div>
            </div>
          </div>
          <div class="UrgentList"></div>
        </div> -->
      </el-row>
    </div>
  </div>
</template>

<script>
import { OmgCount } from "@/api/dashboard/dashboard";
import { listProduceQuote } from "@/api/produce/quote"; //生产报价
import { listTecaudit } from "@/api/technics/tecaudit"; //工艺管理
import { listPurchase } from "@/api/purchase/quote"; //采购报价
import { listSaleQuote } from "@/api/salemage/salequote"; //销售报价
import { mapGetters } from "vuex";

export default {
  name: "",
  components: "",
  computed: {
    ...mapGetters(["name", "roles", "userid", "pkCorp", "pkPsndoc"]),
    
  },
  data() {
    return {
      productionCountNumInfo: {}, // 成品质检数量-默认0
      a: 0,
      b: 0,
      c: 0,
      d: 0,
      listQuery: {
        // 分页查询
        page: 1,
        limit: 10,
        dr: 0,
        billState: "2",
      },
      // technicsState
      listQuery1: {
        // 分页查询
        page: 1,
        limit: 10,
        dr: 0,
        technicsState: "21",
      },
      rolename: "",
    };
  },
  created() {
    
    // console.log("我是卡片页面")
    // console.log(this.roles);   //角色ID
    // console.log(this.pkCorp)
    if (this.roles.length > 0) {
      for (var i = 0; i < this.roles.length; i++) {
        this.rolename = this.roles[i].roleName;
      }
    }

    // console.log(this.rolename)

    // 调用后端接口查询数量
    OmgCount().then((response) => {
      if (response && response.success && response.object) {
        this.productionCountNumInfo = response.object;
      }
    });

    //查询销售报价数量
    listSaleQuote(this.listQuery).then((response) => {
      this.a = response.total;
    });

    // 查产品工艺审核自由态数量
    // listTecaudit
    listTecaudit(this.listQuery1).then((response) => {
      this.b = response.total;
    });

    //查询采购报价数量
    // listPurchase
    listPurchase(this.listQuery).then((response) => {
      this.c = response.total;
    });

    //查询生产报价数量
    // listPurchase
    listProduceQuote(this.listQuery).then((response) => {
      this.d = response.total;
    });
  },
  methods: {
    skit(path) {
      this.$router.push(path);
    },
  },
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.title,
.btns {
  display: flex;
  justify-content: space-around;
}
.title > div {
  width: 47%;

  /* border: 1px solid #000; */
  background: #fff;
  border-radius: 20px;
}
.title > div {
  h3 {
    margin-left: 30px;
  }
  h5 {
    text-align: center;
  }
}
.ProgressFlowChart,
.UrgentList {
  height: 400px;
}
.UrgentList {
}
.offer{
  // background: ;
}
.box-card {
  margin-top: 30px;
  text-align: center;
}
.clearfix span {
  color: darkslategrey;
  font-size: 16px;
}
.box-card i {
  font-style: normal;
  font-size: 20px;
  color: #f56c6c;
  padding-left: 10px;
}
.text-item {
  text-align: center;
  cursor: pointer;
}
.text-item span {
  color: rgb(64, 201, 198);
  font-size: 14px;
}
</style>