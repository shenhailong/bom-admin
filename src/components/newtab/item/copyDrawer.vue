<template>
  <el-drawer
    :visible.sync="drawers"
    :direction="direction"
    :before-close="handleClose"
    :with-header="false"
    :size="size"
  >
    <div v-if="quto == null" class="drawerlayoout">
      <div class="listul" style="width: 20%">
        <!-- <br> -->
        <div class="search">
          <input v-model="search_contents" type="text" placeholder="请输入产品编号">
          <span class="el-icon-search search_pos" @click="search_item"/>
        </div>

        <div v-for="(item, index) in listdatas" :key="index" class="list_updata">

          <el-badge
            v-if="item.msgNumber != 0"
            :value="item.msgNumber"
            class="item"
          >
            <ul ref="lis" @click="controContent(item, index)">
              <li>{{ item.contractNo }}</li>
              <li>{{ item.productCode }}</li>
              <li>{{ item.serial }}</li>
            </ul>
            <!--  -->
            <!-- <div class="item_hr"></div> -->
          </el-badge>
          <el-badge v-else class="item">
            <ul ref="lis" @click="controContent(item, index)">
              <li>{{ item.contractNo }}</li>
              <li>{{ item.productCode }}</li>
              <li>{{ item.serial }}</li>
            </ul>
            <!-- <div class="item_hr"></div> -->
          </el-badge>
        </div>
        <!-- <ul v-for="(item, index) in listdatas" :key="index">
          <el-badge
            :value="item.msgNumber"
            v-if="item.msgNumber != 0"
            class="item"
          >
            <li class="list" @click="controContent(item, index)" ref="lis">
              <p>{{ item.contractNo }}</p>
              <p>{{ item.productCode }}</p>
              <p>{{ item.serial }}</p>
            </li>
          </el-badge>
          <el-badge v-else class="item">
            <li class="list" @click="controContent(item, index)" ref="lis">
              <p>{{ item.contractNo }}</p>
              <p>{{ item.productCode }}</p>
              <p>{{ item.serial }}</p>
            </li>
          </el-badge>
        </ul> -->
      </div>
      <div style="width: 78%">
        <el-tabs v-model="activeName">
          <el-tab-pane label="内容" name="first">
            <information :information="pkProductOrderB" />
          </el-tab-pane>
          <el-tab-pane label="留言板" name="second">
            <textarae :pk-product-order-b="pkProductOrderB" />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div v-else class="drawerlayoout">
      <div style="width: 100%">
        <el-tabs v-model="activeName">
          <el-tab-pane label="内容" name="first">
            <information :information="pkProductOrderB" />
          </el-tab-pane>
          <el-tab-pane label="留言板" name="second">
            <textarae :pk-product-order-b="pkProductOrderB" />
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </el-drawer>
</template>
<script>
import { selectAllMsgUserOrderB } from '@/api/dashboard/dashboard'
import textarae from './item/textaear'
import information from './item/information'
export default {
  components: {
    information,
    textarae
  },
  props: ['drawer', 'listdata', 'quto'],
  data() {
    return {
      direction: 'rtl',
      size: '1000px', // 调整抽屉的宽度
      pkProductOrderB: null,
      listdatas: [],
      activeName: 'first',
      drawers: false,
      search_contents: null
    }
  },
  watch: {
    listdata: {
      deep: true,
      handler(newvalue) {
        // console.log(newvalue);

        this.listdatas = newvalue
      }
    },
    drawer() {
      this.drawers = this.drawer
    },
    quto() {
      this.pkProductOrderB = this.quto
      // console.log(this.pkProductOrderB);
    }
  },

  methods: {
    handleClose(done) {
      this.$emit('closer')
      // 推出确认
      // this.$confirm("确认关闭？")
      //   .then((_) => {
      //     done();
      //
      //   })
      //   .catch((_) => {});
    },
    search_item() {
      // 搜索列表内容
      const minsdata = this.listdata
      this.listdata = []
      minsdata.forEach((item, index) => {
        if (item.productCode.includes(this.search_contents)) {
          // console.log(item);

          this.listdata.push(item)
          console.log(this.listdata)
        }
      })
    },
    controContent(item, index) {
      // console.log(item.pkProductOrderB);
      // console.log(this.$refs.lis.length);
      // 点击每个li
      for (let i = 0; i < this.$refs.lis.length; i++) {
        this.$refs.lis[i].style.color = '#000'
      }
      this.$refs.lis[index].style.color = '#ccc' // 点击的足迹
      this.pkProductOrderB = item.pkProductOrderB
      selectAllMsgUserOrderB({ dr: 0 }).then((res) => {
        // 更新未读标记
        // console.log(res);
        this.listdatas = res.object
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.drawerlayoout {
  display: flex;
  /* justify-content: space-between; */
}
p {
  margin: 0;
  padding: 0;
  height: 16px;
  /* margin- */
}
.search{
  position: relative;
}
.list {
  cursor: pointer;
  font-size: 15px;
}
.listul {
  /* width: 40%; */
  overflow-y: auto;
  overflow-x: scroll;
  height: 800px;
}
li {
  list-style: none;
}
.item {
  width: 80%;
  // margin-top: 20px;
  li{
    height: 16px;
  }
}
ul {
  margin: 0;
  padding-bottom: 20px;
  // margin-top: 20px;
  /* padding: 0; */
}
.search_pos{
  position:absolute;
  top: 17px;
  left: 160px;
  cursor: pointer;
  // color: rgb(244,244,244);
}
.item_hr{
  width: 80%;
  margin:0 auto;
  // float: right;
  border-bottom: 1px solid #ccc;
}
</style>
