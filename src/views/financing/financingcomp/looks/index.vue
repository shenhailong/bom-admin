<template>
  <!-- 附件上传信息 -->
  <el-dialog
    :title="''"
    :visible.sync="contentVisiable"
    @close="closeDialog"
    width="80%"
  >
    <div>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" type="index" width="50"> </el-table-column>
      <el-table-column prop="paymentTime" label="上传时间" width="180">
      </el-table-column>
      <el-table-column label="附件" width="180">
        <template slot-scope="scope">
          <div
            v-for="(item, index) in tableData[scope.$index].upFileFileList"
            :key="index"
          >
            <div>{{ item.name }}</div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="下载">
        <template slot-scope="scope">
          <div>
            <el-upload
              drag
              style="margin-left: 50px"
              class="upload-demo"
              :action="uploadUrl"
              ref="FileUpLoad"
              :limit="1"
              :on-preview="downloadProccessFile"
              :file-list="tableData[scope.$index].upFileFileList"
              :auto-upload="false"
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                <span>文件</span><em>点击上传</em>
              </div>
            </el-upload>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="fileFullname"
        label="附件类型"
        width="180"
        :formatter="
          (row, column) => {
            if (row.paymentType == '2') {
              return '回款';
            }
            if (row.paymentType == '3') {
              return '开票';
            }
            if (row.paymentType == '4') {
              return '出库，合同';
            }
          }
        "
      >
      </el-table-column>
      <el-table-column prop="memo" label="备注" width="180"> </el-table-column>
    </el-table>
  </el-dialog>
</template>
<script>
import { selectAllFileByContract } from "@/api/financing/flans";
import { downloadProductFile } from "@/api/pub/pub";
export default {
  props: ["isshow", "temp"],
  watch: {
    isshow() {
      // console.log(this.temp);
      this.contentVisiable = this.isshow;
      this.init()
    },
    value() {
      // console.log(this.value);
      let arr = []; // 按钮的条件切换
      if (this.value == "1") {
        this.init();
        // this.tableData = this.list;
      }
      if (this.value == "2") {
        for (let i of this.list) {
          // this.tableData = [];
          if (i.paymentType == "2") {
            arr.push(i);
          }
          this.tableData = arr;
        }
      }
      if (this.value == "3") {
        for (let i of this.list) {
          if (i.paymentType == "3") {
            arr.push(i);
          }
          this.tableData = arr;
        }
      }
      if (this.value == "4") {
        // console.log('aa');
        // i.upFileFileList = i.upFileFileList[0]

        for (let i of this.list) {
          let me = [];
          me.push(i.upFileFileLists[0]);
          i.upFileFileList = me;
          if (i.paymentType == "4") {
            arr.push(i);
          }
          this.tableData = arr;
        }
      }
      if (this.value == "5") {
        // console.log('aa');
        for (let i of this.list) {
          // console.log(i.upFileFileList[0]);
          let me = [];
          me.push(i.upFileFileLists[1]);
          // i.upFileFileList = i.upFileFileList[1]
          i.upFileFileList = me;
          if (i.paymentType == "4") {
            arr.push(i);
          }
          this.tableData = arr;
        }
      }
    },
  },

  data() {
    return {
      contentVisiable: false,
      options: [
        {
          value: "1",
          label: "全部",
        },
        {
          value: "2",
          label: "回款",
        },
        {
          value: "3",
          label: "开票",
        },
        {
          value: "4",
          label: "出库单",
        },
        {
          value: "5",
          label: "合同",
        },
      ],
      value: "1",
      tableData: [],
      list: [],
      upFileFileList: [], //文件保存
      uploadUrl: process.env.BASE_API + "/", // 上传地址
    };
  },
  methods: {
    closeDialog() {
      this.$emit("close");
    },
    init() {
      // console.log(1);
      selectAllFileByContract({
        pkProductOrder: this.temp.pkProductOrder,
      }).then((res) => {
        this.list = res.object;
        for (let i of this.list) {
          if (i.fileName) {
            if (i.paymentType == "4") {
              //判断渲染几挑文件
               i.upFileFileList = [
                { name: i.fileFullname, fullName: i.fileName },
                { name: i.failfileFullname, fullName: i.failfileName },
              ];
              i.upFileFileLists = [
                { name: i.fileFullname, fullName: i.fileName },
                { name: i.failfileFullname, fullName: i.failfileName },
              ];
            } else {
              i.upFileFileList = [
                { name: i.fileFullname, fullName: i.fileName },
              ];
            }

            // console.log(this.list);
          } else {
            i.upFileFileList = [];
          }
        }
        this.tableData = this.list;
      });
    },
    downloadProccessFile(file) {
      //文件下载的方法

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
  },
};
</script>
<style  lang="scss" type="text/scss" scoped>
/deep/ .el-dialog__body {
  padding: 5px;
}
.el-select /deep/.el-input__inner {
  width: 195px;
}

/deep/ .el-upload-dragger {
  display: none;
}
</style>