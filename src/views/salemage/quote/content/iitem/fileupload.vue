<template>
  <div>
    <div class="file">
      <el-upload
        drag
        class="upload-demo"
        ref="BOMUpload"
        :action="uploadUrl"
        :file-list="PURFileList"
        :on-preview="downloadProccessFile"
        :limit="1"
        :auto-upload="false"
        :disabled="true"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          <span>采购物料</span><em>点击上传</em>
        </div>
      </el-upload>
      <!-- <span>采购物料报价文件</span> -->

      <!--物料报价文件-->

      <el-upload
        drag
        class="upload-demo"
        ref="BOMUpload"
        :action="uploadUrl"
        :file-list="MATTERFileList"
        :limit="1"
        :on-exceed="handleExceed"
        :on-change="MATTERFileChange"
        :on-preview="downloadProccessFile"
        :before-remove="MATTERFileRemove"
        :auto-upload="false"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          <span>销售物料</span><em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">
          <!-- <span>销售物料报价文件</span> -->
          <!-- 1: 上传文件大小不得超过200M -->
        </div>
      </el-upload>
      <el-upload
        drag
        class="upload-demo"
        ref="SYEELUpload"
        :action="uploadUrl"
        :file-list="STEELFileList"
        :limit="1"
        :on-exceed="handleExceed"
        :on-preview="downloadProccessFile"
        :auto-upload="false"
        :disabled="true"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          <span>钢网文件</span><em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">
          <!-- <span>销售物料报价文件</span> -->
          <!-- 1: 上传文件大小不得超过200M -->
        </div>
      </el-upload>
    </div>
    <br />
    <br />
    <div class="file">
      <el-upload
        drag
        class="upload-demo"
        ref="BOMUpload"
        :action="uploadUrl"
        :file-list="BOMFileList"
        :on-preview="downloadProccessFile"
        :limit="1"
        :auto-upload="false"
        :disabled="true"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text"><span>BOM文件</span></div>
      </el-upload>
      <el-upload
        drag
        class="upload-demo"
        ref="BOMUpload"
        :action="uploadUrl"
        :file-list="PCBFileList"
        :on-preview="downloadProccessFile"
        :limit="1"
        :auto-upload="false"
        :disabled="true"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text"><span>PCB文件</span></div>
      </el-upload>
      <el-upload
        drag
        class="upload-demo"
        ref="BOMUpload"
        :action="uploadUrl"
        :file-list="GONGYIFileList"
        :on-preview="downloadProccessFile"
        :limit="1"
        :auto-upload="false"
        :disabled="true"
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text"><span>工艺文件</span></div>
      </el-upload>
    </div>
  </div>
</template>
<script>
import { selectPurchaseMaterielByPkProduct } from "@/api/technics/tecaudit";
import { downloadProductFile } from "@/api/pub/pub";
import { parseTime } from "@/utils/viewCompUtil";
export default {
  props: ["mindatas"],
  data() {
    return {
      temp: {},
      uploadUrl: process.env.BASE_API + "/", // 上传地址
      // BOM文件
      BOMFileList: [],
      // PCB文件
      PCBFileList: [],
      // 工艺文件
      GONGYIFileList: [],
      // 采购报价文件
      PURFileList: [],
      PURFile: null,
      isSteel: localStorage.getItem("isSteel"),
      // 销售物料报价文件
      MATTERFileList: [],
      MATTERFile: null,
      //钢网文件
      STEELFileList: [],
      STEELFile: null,
      // 物料报价文件信息
      matterFilename: "",
      matterFileFullName: "",
      materielPoList: [],
    };
  },
  watch: {
    mindatas() {
      this.restTemp();
      this.des();
    },
  },
  created() {
    this.restTemp();
    this.des();
  },
  methods: {
    downloadProccessFile(file) {
      // console.log(file);
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
    MATTERFileChange(file, fileList) {
      // 记录文件变化

      this.MATTERFile = this.mindatas.matterFilename;

      this.MATTERFile = file;

      this.$emit("files", this.MATTERFile);
    },
    MATTERFileRemove(file, fileList) {
      // 文件删除事件

      this.MATTERFile = null;
      this.$emit("files", this.MATTERFile);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    des() {
      // 采购报价文件
      // console.log(this.temp.billPurchaseQuotePo);
      if (this.temp.billPurchaseQuotePo.fileName) {
        let purfile = {
          name: this.temp.billPurchaseQuotePo.fileName,
          fullName: this.temp.billPurchaseQuotePo.fileFullname,
        };
        this.PURFileList = [purfile];
        this.PURFile = purfile;
      }
      // 物料报价文件
      if (this.temp.matterFilename) {
        let matterfile = {
          name: this.temp.matterFilename,
          fullName: this.temp.matterFileFullName,
        };
        this.MATTERFileList = [matterfile];
        this.MATTERFile = matterfile;
        // console.log(this.MATTERFile);
        this.$emit("files", this.MATTERFile);
        // console.log(this.MATTERFile);
      }
      // BOM文件信息
      if (this.temp.bomFilename) {
        this.BOMFileList = [
          {
            name: this.temp.bomFilename,
            fullName: this.temp.bomFilefullname,
          },
        ];
      }
      // PCB文件信息
      if (this.temp.pcbFilename) {
        this.PCBFileList = [
          {
            name: this.temp.pcbFilename,
            fullName: this.temp.pcbFilefullname,
          },
        ];
      }
      // 工艺文件信息
      if (this.temp.craftFilename) {
        this.GONGYIFileList = [
          {
            name: this.temp.craftFilename,
            fullName: this.temp.craftFilefullname,
          },
        ];
      }

      //钢网文件信息
      if (this.temp.steelFilename) {
        this.STEELFileList = [
          {
            name: this.temp.steelFilename,
            fullName: this.temp.steelFilefullname,
          },
        ];
      }
      // 预制物料信息的图片URL信息
      let queryMaterielParam = {
        pkProduct: this.temp.pkProduct,
      };
      selectPurchaseMaterielByPkProduct(queryMaterielParam).then((response) => {
        if (response.success) {
          this.temp.materielPoList = response.object;
          let tempThis = this.temp;
          if (tempThis && tempThis.materielPoList) {
            let materielPoList = tempThis.materielPoList;
            for (let index in materielPoList) {
              let dataOne = materielPoList[index];
              if (dataOne && dataOne.previewUrl) {
                dataOne.previewUrlShow = this.uploadUrl + dataOne.previewUrl;
                let previewUrlListShow = [dataOne.previewUrlShow];
                dataOne.previewUrlListShow = previewUrlListShow;
              }
            }
          }
        }
      });
    },
    restTemp() {
      if (this.mindatas.billPurchaseQuotePo == null) {
        this.mindatas.billPurchaseQuotePo = {
          pkPurchaseQuote: 0,
          quoteEndDate: "",
          purchasePrice: 0,
          purchaseTotal: 0,
          purchasePriceSale: 0,
          purchaseTotalSale: 0,
          productPcbPriceSale: 0,
          productPcbTotalSale: 0,
          productPcbPrice: 0,
          zPrice: 0,
          gstPrice: 0,
          untPrice: 0,
          zPrice1: 0,
          fileName: "",
          fileFullname: "",
          steelPrice: 0, //钢网采购价格
          steelPriceSale: 0, //钢网销售价格
        };
      }
      this.temp = this.mindatas;
    },
  },
};
</script>
<style  lang="scss" type="text/scss"  scoped>
.file {
  display: flex;
  justify-content: space-around;
}
.upload-demo {
  width: 10%;
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