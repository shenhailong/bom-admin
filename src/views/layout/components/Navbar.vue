<template>
  <div class="navbar">
    <hamburger
      :toggle-click="toggleSideBar"
      :is-active="sidebar.opened"
      class="hamburger-container"
    />
    <breadcrumb />
    <big :ishow="shows" @close="closeds" />
    <drawer
      :drawer="drawer"
      :listdata="listdata"
      :quto="null"
      @closer="drawers"
    />
    <!-- <el-badge class="item" :value="200" :max="99">消息</el-badge> -->
    <!-- <div>111</div> -->
    <el-dropdown class="avatar-container" trigger="click">
      <div class="avatar-wrapper">
        <i class="el-icon-s-custom"/>
        <i class="el-icon-caret-bottom" />
      </div>
      <el-dropdown-menu slot="dropdown" class="user-dropdown">
        <router-link class="inlineBlock" to="/">
          <el-dropdown-item>
            <i class="el-icon-s-home"/>首页
          </el-dropdown-item>
        </router-link>
        <el-dropdown-item>
          <i class="el-icon-s-custom"/> {{ name }}
        </el-dropdown-item>
        <div @click="imgs">
          <el-dropdown-item>
            <i class="el-icon-picture"/> 流程图
          </el-dropdown-item>
        </div>

        <!-- <router-link class="inlineBlock" >
          <el-dropdown-item>
            <i class="el-icon-setting"></i>修改密码
          </el-dropdown-item>
        </router-link> -->
        <el-dropdown-item divided>
          <span style="display: block" @click="logout">
          <i class="el-icon-switch-button"/>登出</span
          >
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div
      class="avatar-container"
      style="right: 0; left: 330px; width: 300px; line-height: 200px"
    >
      <div class="avatar-wrapper" style="margin-top: 14px" @click="conclk">
        <i
          class="el-icon-chat-square"
          style="
            font-size: 15px;
            padding: 0;
            margin: 0;
            width: 15px;
            height: 15px;
          "
        />
        公告: <span style="color: red"> {{ notice.title }} </span>
      </div>
    </div>
    <!-- 内容组件 -->
    <con :ishow="isshow" :con="cons" @close="closes"/>
    <div
      class="avatar-container"
      style="
        margin-right: 70px;
        font-size: 12px;
        line-height: 16px;
        padding-top: 10px;
      "
      @click="goMessage"
    >
      <el-badge :hidden="nmbbadge === 0" :value="nmbbadge" :max="99" class="item">
        <el-button size="mini" round>公共消息</el-button>
      </el-badge>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import drawer from '@/components/newtab/item/drawer'
import { selectAllMsgUserOrderB } from '@/api/dashboard/dashboard'
import big from '@/components/newtab/big/big'
// import tc from "./Sidebar/tc";
import {
  saveMsgSystemContentData,
  selectAllMsgSystemContentAsPage,
  deleteSystemContentData
} from '@/api/notice/notice'
import con from '@/views/notice/comp/content'
export default {
  components: {
    Breadcrumb,
    Hamburger,
    con,
    drawer,
    big
  },
  data() {
    return {
      lists: [],
      page: 1,
      shows: false,
      ishow: false,
      listdata: [],
      con: [],
      istab: {
        title: null,
        content: null,
        pkSystemContent: null,
        creatorShow: null,
        creationtime: null
      },
      nmbbadge: 0,
      notice: { title: null },
      isshow: false,
      cons: null,
      drawer: false
    }
  },
  computed: {
    ...mapGetters(['sidebar', 'avatar', 'name', 'userid'])
  },

  created() {
    // this.drawers()
    this.drawer = false
    this.lodinglist()
    const con = {
      dr: 0,
      limit: 1,
      page: 1
    }
    selectAllMsgSystemContentAsPage(con).then((res) => {
      // console.log(res);
      if (res.total != 0) {
        this.notice = res.object[0]
      }
    })
  },
  methods: {
    goMessage() {
      this.$router.push('/MENU13775/MENU48591')
    },
    imgs() {
      this.shows = true
      console.log(this.shows)
    },
    closeds() {
      this.shows = false
    },
    conclk(index) {
      this.isshow = true
      this.cons = this.notice.content
    },
    closes() {
      this.isshow = false
    },
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    drawers() {
      // 列表的渲染
      this.drawer = !this.drawer
      selectAllMsgUserOrderB({ dr: 0 }).then((res) => {
        // console.log(res);
        this.listdata = res.object
        this.nmbbadge = 0
        for (const i of this.listdata) {
          this.nmbbadge += i.msgNumber
          // console.log(i.msgNumber);
        }
      })
    },
    close() {
      // 推出刷新页面
      this.ishow = false
      this.istab = {
        title: null,
        content: null,
        pkSystemContent: null,
        creatorShow: null,
        creationtime: null
      }
    },
    deletes() {
      // 删除该条消息
      this.$confirm('是否确定删除该消息?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        // deleteSystemContentData(this.con[0].pkArr);
      })
    },
    lodings() {
      // 点击加载更多
      this.page++
      this.lodinglist()
    },
    istabs(index) {
      this.istab = this.lists[index]
      console.log(this.istab)
      this.istc()
    },
    titleshow(index) {
      // 内容的渲染
      const arr = []
      arr.push(this.lists[index])
      // let i = arr.length-1
      this.con = arr
    },
    lodinglist() {
      // 加载数据
      const datas = {
        pkSystemContent: null,
        dr: 0,
        limit: 10,
        page: this.page
      }
    },
    istc() {
      // 打开设置
      this.ishow = true
    },
    logout() {
      // 推出登陆
      this.$store.dispatch('LogOut').then(() => {
        this.$router.push('/login')
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }

  .screenfull {
    position: absolute;
    right: 90px;
    top: 16px;
    color: red;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 8px;
      position: relative;
      line-height: initial;
      i {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        font-size: 30px;
      }
      .el-icon-caret-bottom {
        position: absolute;
        right: -27px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
  .item {
    // margin-top: 10px;
    margin-right: 30px;
  }
  .avatar-container1 {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 100px;
    padding: 0 20px;
    text-align: center;
    border-right: solid 1px #eeeeee;
    border-left: solid 1px #eeeeee;
    // padding: 0 50px;
    // line-height:50px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 8px;
      position: relative;
      line-height: initial;
      i {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        font-size: 30px;
      }
      .userPng {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 30px;
      }

      .el-icon-caret-bottom {
        position: absolute;
        right: -15px;
        top: 23px;
        font-size: 12px;
      }
    }
  }
  .small /deep/.el-icon-chat-dot-round {
    font-size: 12px;
  }
  .avatar-container2 {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 200px;
    padding: 0 10px;
    text-align: center;
    border-left: solid 1px #eeeeee;
    // padding: 0 50px;
    // line-height:50px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 8px;
      position: relative;
      left: 10px;
      line-height: initial;
      i {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        font-size: 20px;
      }
      .userPng {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 30px;
      }

      .el-icon-caret-bottom {
        position: absolute;
        right: -15px;
        top: 23px;
        font-size: 12px;
      }
    }
  }

  .avatar-container3 {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 280px;
    padding: 0 10px;
    text-align: center;
    border-left: solid 1px #eeeeee;
    // padding: 0 50px;
    // line-height:50px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 8px;
      position: relative;
      left: 10px;
      line-height: initial;
      i {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        font-size: 30px;
      }
      .userPng {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 30px;
      }

      .el-icon-caret-bottom {
        position: absolute;
        right: -15px;
        top: 23px;
        font-size: 12px;
      }
    }
  }

  .avatar-container4 {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 360px;
    padding: 0 10px;
    text-align: center;
    border-left: solid 1px #eeeeee;
    // padding: 0 50px;
    // line-height:50px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 8px;
      position: relative;
      left: 10px;
      line-height: initial;
      i {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        font-size: 30px;
      }
      .userPng {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 30px;
      }

      .el-icon-caret-bottom {
        position: absolute;
        right: -15px;
        top: 23px;
        font-size: 12px;
      }
    }
  }

  .avatar-container5 {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 450px;
    padding: 0 10px;
    text-align: center;
    border-left: solid 1px #eeeeee;
    // padding: 0 50px;
    // line-height:50px;
    .avatar-wrapper {
      cursor: pointer;
      margin-top: 8px;
      position: relative;
      left: 10px;
      line-height: initial;
      i {
        width: 40px;
        height: 40px;
        border-radius: 10px;
        font-size: 30px;
      }
      .userPng {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        font-size: 30px;
      }

      .el-icon-caret-bottom {
        position: absolute;
        right: -15px;
        top: 23px;
        font-size: 12px;
      }
    }
  }
}
p {
  margin: 0;
  padding: 0;
}
</style>

