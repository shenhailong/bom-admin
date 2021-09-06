<template>
  <!-- 帮助中心 -->
  <div>
    <div class="topwindow">
      <div class="box">
        <p class="box_one" @click="showleft" v-if="!lofig">
          <el-link icon="el-icon-arrow-left"></el-link>
        </p>
        <p class="box_one" @click="showleft" v-else>
          <el-link icon="el-icon-arrow-right"></el-link>
        </p>
        <p class="box_one"  v-if="lofig">
          <el-link icon="el-icon-picture" @click="imgs"></el-link>
        </p>
        <p class="box_one"  v-if="lofig">
          <el-link icon="el-icon-collection" @click="drawers"></el-link>
        </p>
        <!-- <div class="minimage">
          <el-link icon="el-icon-picture-outline"></el-link>
          <div class="images">
            <img src="@/assets/thread/WechatIMG140.png" alt="" />
            <img src="@/assets/thread/WechatIMG141.png" alt="" />
            <img src="@/assets/thread/WechatIMG142.png" alt="" />
          </div>
        </div> -->
        <!-- <div class="minimage">
          <el-link icon="el-icon-document-copy" @click="drawers"></el-link>
        </div> -->
      </div>
      <!-- <el-link
        v-if="isshow"
        icon="el-icon-caret-top"
        class="tops"
        @click="windowsTop"
      >
      </el-link> -->
    </div>
    <!-- 抽屉柜 -->
    <big :ishow="shows"  @close="closeds" />
    <drawer :drawer="drawer" @closer='drawers' :listdata='listdata' :quto='null' />
  </div>
</template>
<script>
import {
  selectAllOrderSaleStartAsPage,
  selectAllOrderSaleStartB,
} from "@/api/orderCompMage/orderStart";
import { selectAllMsgUserOrderB } from "@/api/dashboard/dashboard";
import big from "./big/big";
import drawer from "./item/drawer";

export default {
  components: {
    big,
    drawer,
  },
  data() {
    return {
      isshow: false,
      drawer: false,

     
      
      listdata: [],
      information: [],
      pkProductOrderB: null,
      // minscr:['@/assets/thread/WechatIMG140.png','@/assets/thread/WechatIMG141.png','@/assets/thread/WechatIMG142.png'],
      shows: false,
      lofig: false, //控制左右图标
    };
  },
  mounted: function () {
    window.addEventListener("scroll", this.getScrollPosition, false);
  },

  methods: {
    imgs() {
      this.shows = true;
    },
    closeds() {
      this.shows = false;
    },
    showleft() {
      this.lofig = !this.lofig;
    },
    
    drawers() {
      //列表的渲染
      this.drawer = !this.drawer
      selectAllMsgUserOrderB({ dr: 0 }).then((res) => {
        // console.log(res);
        this.listdata = res.object;
      });
    },
    
    getScrollPosition: function () {
      // 滚动条距顶部距离
      let top = document.documentElement.scrollTop || document.body.scrollTop;
      // console.log(top);
      //  控制回到顶部的显示隐藏
      if (top >= 400) {
        // this.isshow = true;
      } else {
        // this.isshow = false;
      }
      // 滚动条距左端距离
      let left =
        document.documentElement.scrollLeft || document.body.scrollLeft;
    },
    windowsTop() {
      document.documentElement.scrollTop = 0;
    },
  },
};
</script>
<style scoped>

p {
  margin: 0;
  padding: 0;
}
.topwindow {
  position: fixed;
  top: 120px;
  right: 0px;
  z-index: 100;
  display: none;
}
.tops {
  border: 1px solid #000;
  /* border-radius: 50%; */
}
/* li:hover{
    color: red;
} */
.images {
  position: absolute;
  display: none;
}
.box {
  /* width: 20px; */
  display: flex;
  position: fixed;
  right: 0;
  top: 50px;
  /* height: 50px; */
  /* background: rgb(248, 234, 234); */
  border: 1px solid #000;
}

.box_one {
  width: 20px;
  font-size: 30px;
  /* line-height: 50px; */
  /* border-left: 1px solid #000; */
  /* height: 60px; */
}

.minimage {
  position: relative;
  display: none;
}
.minimage:hover .images {
  transition: 2s;
  display: block;
  position: absolute;
  left: -900px;
  top: 0px;
}

</style>