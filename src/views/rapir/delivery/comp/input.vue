<template>
  <div>
    <el-form
      ref="form"
      :model="subInfoContent"
      label-width="110px"
      :inline="true"
      class="form"
    >
      <el-form-item label="工序名称">
        <el-select
          v-model="subInfoContent.procedureName"
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in procedureOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="序列号段">
        <el-input v-model="subInfoContent.sequenceNum"></el-input>
      </el-form-item>

      <el-form-item label="出库数量">
        <el-input v-model="subInfoContent.putoutNum"></el-input>
      </el-form-item>

      <el-form-item label="累计出库数量">
        <el-input
          v-model="subInfoContent.finishNum"
          :disabled="true"
        ></el-input>
      </el-form-item>

      <el-form-item label="快递单号">
        <!-- <el-input v-model="subInfoContent.trackingNumber" :disabled="true"></el-input> -->
        <el-input v-model="subInfoContent.trackingNumber"></el-input>
      </el-form-item>

      <el-form-item label="送货方式">
        <el-select
          v-model="subInfoContent.shippingMethod"
          clearable
          placeholder="请选择"
        >
          <el-option
            v-for="item in procedureOptions1"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <!--   <el-form-item label="附件名称">
          <el-input v-model="subInfoContent.fileName" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="附件全名称">
          <el-input v-model="subInfoContent.fileFullname" :disabled="true"></el-input>
        </el-form-item> -->

      <el-form-item label="经办人">
        <el-input
          v-model="subInfoContent.chargePsn"
          :disabled="true"
        ></el-input>
      </el-form-item>

      <el-form-item label="经办时间">
        <el-input
          v-model="subInfoContent.chargeTime"
          :disabled="true"
        ></el-input>
      </el-form-item>

      <el-form-item label="单据状态">
        <el-select
          v-model="subInfoContent.billState"
          clearable
          placeholder="请选择"
          :disabled="true"
        >
          <el-option
            v-for="item in billStateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </el-form-item>
       

      <!-- <el-form-item label="出库单回执">
		  <el-input v-model="subInfoContent.fileFullname" :disabled="true"></el-input>
		</el-form-item> -->
    </el-form>

    <el-row>
        <bigimg :ishow="shows" :scr="minsrc" @close="closeds"></bigimg>
      <el-col :span="8">
        <div v-if="subInfoContent.fileUrl == null">
          <el-upload
            drag
            style="margin-left: 50px"
            class="upload-demo"
            ref="FileUpLoad"
            :action="uploadUrl"
            :accept="'image/*'"
            :limit="1"
            :file-list="upFileFileList"
            :on-exceed="handleExceed"
            :on-change="upFileChange"
            :before-remove="upFileRemove"
            :on-preview="downloadProccessFile"
            :auto-upload="false"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              <span>文件</span><em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              1: 上传文件大小不得超过200M
            </div>
          </el-upload>
          <!-- {{subInfoContent.fileUrl}} -->
        </div>
        <div v-else>
          <p @click="deletes(0)" class="deletes">X</p>
          <img :src="subInfoContent.fileUrl" alt="" @click="bigimages(0)" style="width: 30%;height:100px" />
        </div>
      </el-col>
      <!-- receiptUrl -->
    
      <el-col :span="8">
        <div v-if="subInfoContent.receiptUrl == null">
          <el-upload
            drag
            style="margin-left: 50px"
            class="upload-demo"
            ref="receiptUpLoad"
            :action="uploadUrl"
            :accept="'image/*'"
            :limit="1"
            :file-list="receiptFileList"
            :on-exceed="handleExceed"
            :on-change="receiptChange"
            :before-remove="receiptRemove"
            :on-preview="downloadProccessFile"
            :auto-upload="false"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              <span>出库单回执文件</span><em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">
              1: 上传文件大小不得超过200M
            </div>
          </el-upload>
        </div>
        <div v-else>
          <p @click="deletes(1)" class="deletes">X</p>
          <img :src="subInfoContent.receiptUrl" alt=""  @click="bigimages(1)" style="width: 30%;height:100px" />
        </div>
      </el-col>
      
    </el-row>
   
    <span
      slot="footer"
      class="dialog-footer"
      style="display: block; float: right"
    >
      <el-button type="primary" @click="onButtonClick('SAVESUBDATA', null)"
        >保存</el-button
      >
    </span>
     
    <br />
  </div>
</template>
<script>
import { parseTime } from "@/utils/viewCompUtil";
import { saveOrderPutoOutImage } from "@/api/orderCompMage/AproductionPub";
import { saveRepairOrderPutout } from "@/api/rapir/rapir"; //返修url路径
import { downloadProductFile } from "@/api/pub/pub";
import bigimg from '@/components/viewcomp/big/big'
// saveRepairOrderPutout
export default {
  components:{bigimg},
  props: ["cons"],
  mounted() {
    this.subInfoContent = this.cons;
  },
  watch: {
    cons: {
      deep: true,
      handler(newValue) {
        console.log(newValue.pkRepairOrder);
        this.subInfoContent = newValue;
      },
    },
  },
  data() {
    return {
      minsrc:'',
      shows:false,
      subInfoContent: {
        outImgName: null, //出库单名称
        outImgUrl: null, //出库单路径
        receiptImgUrl: null, //
        receiptImgName: null,
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
      },
      procedureOptions: [
        // 工序选择options
        { value: "返修", label: "返修" },
      ],
      receiptFileList: [], //出库单回执文件集合
      uploadUrl: process.env.BASE_API + "/", // 上传地址
      upFileFileList: [], // 文件存储List集合
      procedureOptions1: [
        // 工序选择options
        { value: "0", label: "快递" },
        { value: "1", label: "闪送" },
        { value: "2", label: "货拉拉" },
        { value: "3", label: "公司配送" },
        { value: "4", label: "自提" },
      ],
      billStateOptions: [
        { value: "0", label: "自由态" },
        { value: "1", label: "进行中" },
        { value: "2", label: "已完成" },
      ],
    };
  },
  methods: {
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 20 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    deletes(num){
      if(num ==0){
        this.subInfoContent.fileUrl = null
      }
      if(num ==1){
         this.subInfoContent.receiptUrl = null
      }
    },
    upFileChange(file, fileList) {
      // 记录工艺文件
      this.upFileTemp = file;
    },
    upFileRemove(file, fileList) {
      // 工艺文件删除
      this.upFileTemp = null;
    },

    receiptChange(file, fileList) {
      // 记录出库回执单文件
      this.receiptFileTemp = file;
    },

    receiptRemove(file, fileList) {
      //出库回执单文件删除
      this.receiptFileTemp = null;
    },
    bigimages(num){
           this.shows = true
      if(num == 0 ){
        this.minsrc = this.subInfoContent.fileUrl
      }
      if(num ==1 ){
        this.minsrc = this.subInfoContent.receiptUrl
      }
      // console.log(this.minsrc);
    },
    closeds(){
      this.shows =false
    },
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
    onButtonClick(btnCode, rowData) {
      if (btnCode === "SAVESUBDATA") {
        // 保存生产计划子表数据
        let formData = new FormData();
        //
        formData.append(
          `file`,
          this.upFileTemp == null ? null : this.upFileTemp.raw
        );
        formData.append(
          `failfile`,
          this.receiptFileTemp == null ? null : this.receiptFileTemp.raw
        );
        // formData.append(`constractNo`, this.updateRow.contractNo);

        saveOrderPutoOutImage(formData).then((response) => {
          if (response && response.success && response.object) {

            this.subInfoContent.fileUrl = response.object.outImgUrl;
            this.subInfoContent.receiptUrl = response.object.receiptImgUrl;
            this.subInfoContent.fileName = response.object.outImgName; // 上传文件名称
            // this.subInfoContent.fileFullname =
            //   response.object.SALE_PROCPRODUCTION_FULL_NAME == ""
            //     ? null
            //     : response.object.SALE_PROCPRODUCTION_FULL_NAME; // 上传文件名称
            this.subInfoContent.pkRepairOrder = this.cons.pkRepairOrder;
            // console.log(this.subInfoContent.pkRepairOrder);
            
            // console.log(this.subInfoContent.pkRepairOrder);
            this.subInfoContent.receiptName = response.object.receiptImgName;
            // this.subInfoContent.receiptFullname = response.object.SALE_FAIL_PROCPRODUCTION_FULL_NAME = ""
            //   ? null
            //   : response.object.SALE_FAIL_PROCPRODUCTION_FULL_NAME;
            // IMAGE_REF_FILE_PATH_R
            this.$confirm("是否操作该项?", "提示", {
              confirmButtonText: "确定",
              cancelButtonText: "取消",
              type: "warning",
            }).then(() => {
              this.$message({
                type: "success",
                message: "操作成功!",
              });
              saveRepairOrderPutout(this.subInfoContent)
                .then((response) => {
                  if (response) {
                    this.$emit('close')
                  } else {
                    this.$message({
                      message: `操作失败:${response.message}`,
                      type: "error",
                    });
                  }
                })
                .catch(() => {
                  this.$message({
                    type: "info",
                    message: "已取消操作",
                  });
                });

              // this.$message({ message: "操作成功", type: "success" });
            });
          } else {
            this.$message({
              message: `操作失败:${response.message}`,
              type: "error",
            });
          }
        });
      }
    },
  },
};
</script>
<style  lang="scss" type="text/scss" scoped>
// .form{
//     display: flex;
//     flex-wrap: wrap;
// }

/deep/ .el-dialog__body {
  padding: 5px;
}
.el-select /deep/.el-input__inner {
  width: 195px;
}

/deep/ .el-upload-dragger {
  width: 150px;
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
.deletes{
  cursor: pointer;
}
</style>