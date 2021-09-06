<template>
  <el-dialog
    :visible.sync="onshow"
    @close="closeDialog"
    class="min"
    width="70%"
  >
    <!-- <div style="width:80%,height:40%">
      <img src="@/assets/thread/WechatIMG140.png" alt="" />
      <img src="@/assets/thread/WechatIMG141.png" alt="" />
      <img src="@/assets/thread/WechatIMG142.png" alt="" />
    </div> -->

     <bigimg :ishow="shows" :scr="minsrc" @close="closeds"></bigimg>
    <el-carousel type="card" height="200px" :autoplay="false">
      <!-- 跑马灯 -->
      <el-carousel-item v-for="(item,index) in fileList" :key="index">
        <div><img :src="item.imgUrl" alt="联系管理员" @click="bigimages(item.imgUrl)" /></div>
      </el-carousel-item>
    </el-carousel>
    <div>
      <el-upload
        drag
        class="upload-demo"
        :auto-upload="false"
        :action="uploadUrl"
        :limit="5"
        :on-change="receiptChange1"
        :on-remove="handleRemove"
        :accept="'image/*'"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          <span>质检合格</span><em>点击上传</em>
        </div>
      </el-upload>
      <el-button type="primary" @click="onSubmit">添加</el-button>
    </div>
  </el-dialog>
</template>
<script>
// saveRepairImage
import {
  saveRepairImage,
  insertRepairImg,
  selectAllRepairImgById,
} from "@/api/rapir/rapir";
import bigimg from '@/components/viewcomp/big/big'
export default {
   components:{bigimg},
  props: ["ishow", "pkProductOrderB"],
  watch: {
    ishow() {
      // console.log('s');
      this.onshow = this.ishow;
      this.pkid = this.pkProductOrderB;
      selectAllRepairImgById({ pkRepairOrderB: this.pkid }).then((res) => {
        this.fileList = res.object;
      });
    },
  },
  data() {
    return {
      onshow: false,
      mimi: null,
      uploadUrl: process.env.BASE_API + "/", // 上传地址
      pkid: null,
      file: [],
      fileList: [],
      shows:false,
      minsrc:'',
      mi: [],
    };
  },
  methods: {
    closeDialog() {
      this.$emit("close");
    },
    closeds(){
      this.shows =false
    },
     bigimages(conent){
           this.shows = true
           this.minsrc = conent
      // console.log(this.minsrc);
    },
    receiptChange1(file, fileList) {
      let s = []
      for (let i of fileList) {
        s.push(i.raw);
      }
      this.mi = s;
    },
    ss() {
      console.log(this.fileList);
    },
    handleRemove(file, fileList, idx) {},
    onSubmit() {
      let formData = new FormData();
      let s = [];
      for (let i of this.mi) {
        formData.append(`files`, i);
        // s.push(formData);
      }
      // console.log(formData);
      saveRepairImage(formData).then((res) => {
        // console.log(res);
        let imgName = [];
        // let imgUrl =[]
        for (let i of res.object) {
          let jsons = {
            pkRepairOrderB: this.pkid,
            imgUrl: i.imgUrl,
            imgName: i.imgName,
          };
          imgName.push(jsons);
        }
        insertRepairImg(imgName);
      });
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss"  scoped>
/* .min {
  width: 100%;
  height: 100%;
} */
img {
  width: 100%;
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
</style>