<template>
  <!-- 首页进度查询 -->
  <div>
    <h5>
      <div class="ProgressFlowChart">
        <!-- <br> -->
        <h3>进度查询</h3>
        <hr />
        <div class="title">
          <div class="offer">
            <h5>报价流程</h5>
            <div class="btns">
              <div>
                <btns
                  :num="a"
                  :paths="'/MENU36962/MENU25210'"
                  :istype="'warning'"
                  :name="'销售报价'"
                  :dis="orderShowLi.includes('/MENU36962/MENU25210')"
                ></btns>
              </div>
              <div>
                <btns
                  :num="b"
                  :paths="'/MENU3252/MENU32036'"
                  :istype="'warning'"
                  :name="'产品工艺审核'"
                  :dis="orderShowLi.includes('/MENU3252/MENU32036')"
                ></btns>
              </div>
              <div>
                <btns
                  :num="c"
                  :paths="'/MENU63907/MENU38889'"
                  :istype="'warning'"
                  :name="'采购报价'"
                  :dis="orderShowLi.includes('/MENU63907/MENU38889')"
                ></btns>
              </div>
              <div>
                <btns
                  :num="d"
                  :paths="'/MENU61719/MENU35235'"
                  :istype="'warning'"
                  :name="'生产报价'"
                  :dis="orderShowLi.includes('/MENU61719/MENU35235')"
                ></btns>
              </div>
            </div>
          </div>
          <div class="Rework">
            <h5>返修流程</h5>
            <div class="btns">
              <div>
                <btns
                  :num="'0'"
                  :paths="'/MENU67699/MENU91552'"
                  :istype="'success'"
                  :name="'入库'"
                  :dis="orderShowLi.includes('/MENU67699/MENU91552')"
                ></btns>
              </div>
              <div>
                <btns
                  :num="'0'"
                  :paths="'/MENU67699/MENU83418'"
                  :istype="'success'"
                  :name="'判定'"
                  :dis="orderShowLi.includes('/MENU67699/MENU83418')"
                ></btns>
              </div>
              <div>
                <btns
                  :num="'0'"
                  :paths="'/MENU67699/MENU66840'"
                  :istype="'success'"
                  :name="'维修'"
                  :dis="orderShowLi.includes('/MENU67699/MENU66840')"
                ></btns>
              </div>
              <div>
                <btns
                  :num="'0'"
                  :paths="'/MENU67699/MENU94572'"
                  :istype="'success'"
                  :name="'质检'"
                  :dis="orderShowLi.includes('/MENU67699/MENU94572')"
                ></btns>
              </div>
              <div>
                <btns
                  :num="'0'"
                  :paths="'/MENU67699/MENU11652'"
                  :istype="'success'"
                  :name="'出库'"
                  :dis="orderShowLi.includes('/MENU67699/MENU11652')"
                ></btns>
              </div>
            </div>
          </div>
        </div>
        <div class="footer">
          <h5>生产流程</h5>
          <div class="btns_two">
            <div>
              <btns
                :num="productionCountNumInfo.startCount"
                :paths="'/MENU36962/MENU5712'"
                :istype="'primary'"
                :name="'销售发起'"
                :dis="orderShowLi.includes('/MENU36962/MENU5712')"
              ></btns>
            </div>
            <div>
              <btns
                :num="productionCountNumInfo.technicsCount"
                :paths="'/MENU3252/MENU38757'"
                :istype="'primary'"
                :name="'工艺审核'"
                :dis="orderShowLi.includes('/MENU3252/MENU38757')"
              ></btns>
            </div>
            <div>
              <btns
                :num="productionCountNumInfo.houseCount"
                :paths="'/MENU76444/MENU2591'"
                :istype="'primary'"
                :name="'库房备料'"
                :dis="orderShowLi.includes('/MENU76444/MENU2591')"
              ></btns>
            </div>
            <div>
              <btns
                :num="productionCountNumInfo.planCount"
                :paths="'/MENU61719/MENU7214'"
                :istype="'primary'"
                :name="'生产计划'"
                :dis="orderShowLi.includes('/MENU61719/MENU7214')"
              ></btns>
            </div>
            <div>
              <btns
                :num="productionCountNumInfo.purchaseCount"
                :paths="'/MENU63907/MENU68233'"
                :istype="'primary'"
                :name="'物料采购'"
                :dis="orderShowLi.includes('/MENU63907/MENU68233')"
              ></btns>
            </div>
            <div>
              <btns
                :num="productionCountNumInfo.qualityCount"
                :paths="'/MENU77127/MENU60952'"
                :istype="'primary'"
                :name="'来料质检'"
                :dis="orderShowLi.includes('/MENU77127/MENU60952')"
              ></btns>
            </div>
            <div>
              <btns
                :num="productionCountNumInfo.putinCount"
                :paths="'/MENU76444/MENU22290'"
                :istype="'primary'"
                :name="'物料入库'"
                :dis="orderShowLi.includes('/MENU76444/MENU22290')"
              ></btns>
            </div>
            <div>
              <btns
                :num="productionCountNumInfo.smtCount"
                :paths="'/MENU61719/MENU70148'"
                :istype="'primary'"
                :name="'SMT生产'"
                :dis="orderShowLi.includes('/MENU61719/MENU70148')"
              ></btns>
            </div>
            <div>
              <btns
                :num="productionCountNumInfo.dipCount"
                :paths="'/MENU61719/MENU54527'"
                :istype="'primary'"
                :name="'DIP生产'"
                :dis="orderShowLi.includes('/MENU61719/MENU54527')"
              ></btns>
            </div>
            <div>
              <btns
                :num="productionCountNumInfo.defenseCount"
                :paths="'/MENU61719/MENU90813'"
                :istype="'primary'"
                :name="'三防涂覆'"
                :dis="orderShowLi.includes('/MENU61719/MENU90813')"
              ></btns>
            </div>
            <div>
              <btns
                :num="productionCountNumInfo.testCount"
                :paths="'/MENU61719/MENU30865'"
                :istype="'primary'"
                :name="'老化测试'"
                :dis="orderShowLi.includes('/MENU61719/MENU30865')"
              ></btns>
            </div>
            <div>
              <btns
                :num="productionCountNumInfo.becomeCount"
                :paths="'/MENU77127/MENU53406'"
                :istype="'primary'"
                :name="'成品质检'"
                :dis="orderShowLi.includes('/MENU77127/MENU53406')"
              ></btns>
            </div>
            <div>
              <btns
                :num="productionCountNumInfo.finishPutinCount"
                :paths="'/MENU76444/MENU70309'"
                :istype="'primary'"
                :name="'成品入库'"
                :dis="orderShowLi.includes('/MENU76444/MENU70309')"
              ></btns>
            </div>
            <div>
              <btns
                :num="productionCountNumInfo.putoutCount"
                :paths="'/MENU76444/MENU24450'"
                :istype="'primary'"
                :name="'成品出库'"
                :dis="orderShowLi.includes('/MENU76444/MENU24450')"
              ></btns>
            </div>
          </div>
        </div>
      </div>
    </h5>
  </div>
</template>
<script>
import btns from "./item/btns";
import { OmgCount } from "@/api/dashboard/dashboard";
import { listProduceQuote } from "@/api/produce/quote"; //生产报价
import { listTecaudit } from "@/api/technics/tecaudit"; //工艺管理
import { listPurchase } from "@/api/purchase/quote"; //采购报价
import { listSaleQuote } from "@/api/salemage/salequote"; //销售报价
import { mapGetters } from "vuex";

export default {
  components: {
    btns,
  },
  computed: {
    ...mapGetters(["name", "roles", "userid", "pkCorp", "pkPsndoc", "sidebar"]),
    routes() {
      // console.log(this.$router);
      return this.$router.options.routes;
    },
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
      orderShowLi: [],
    };
  },
  created() {
    // console.log(this.$router.options.routes);

    for (let i of this.$router.options.routes) {
      // console.log(i);
      let paths = "";
      // paths = i.path
      // console.log(i);
      if (i.children) {
        for (let m of i.children) {
          paths = i.path + "/" + m.path; // 首页按钮 用户有哪些路由
          // console.log(paths);
          // console.log(m);
          this.orderShowLi.push(paths);

          // console.log(this.orderShowLi);
        }
      }

      // this.orderShowLi.push(i.path +'/'+i.name)
    }
    // console.log(this.orderShowLi);
    //角色ID
    // if (this.roles.length > 0) {
    //   for (var i = 0; i < this.roles.length; i++) {
    //     this.rolename = this.roles[i].roleName;
    //   }
    // }
    // console.log(this.rolename, this.rolename !='销售角色' ||this.rolename !='全权角色');
    // 接口数据查询
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
};
</script>
<style lang="scss" type="text/scss" scoped>
.btns {
  display: flex;
  justify-content: space-around;
}
.title {
  display: flex;
  justify-content: space-between;
}
.btns_two {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}
.btns_two > div {
  margin-left: 40px;
  // background: #ccc;
}
.ProgressFlowChart {
  h3 {
    margin: 0px 0px 0px 30px;
    padding: 20px 0 10px 0;
  }
  h5 {
    text-align: center;
  }
}
.title > div {
  width: 45%;
  // padding: 5px 0px 30px 0px;
  margin: 15px 0px 0px 0;
}
.ProgressFlowChart,
.UrgentList {
  // height: 400px;
  padding-bottom: 40px;
  background: #fff;
  border-radius: 20px;
}
.offer {
  background: rgb(254, 247, 245);
}
.Rework {
  background: rgb(249, 252, 244);
}
.title,
.footer {
  width: 90%;
  margin: 0 auto;
}
.footer {
  //  width: 90%;
  //   margin: 0 auto;
  background: rgb(245, 252, 250);
}
</style>