<template>
  <!-- 合同修改 -->
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
    <!-- 回款和发票 录入 -->
    <calculation
      :isdata="temp"
      :value ='value'
      @close='closese'
      v-if="value == '1' || value == '2'"
    ></calculation>
  <!-- 附件上传 -->
    <enclosure
     @closese='closese'
    :isdata="temp"
       v-if="value == '3' "
    ></enclosure>
    <contract

      @closese='closese'
      v-if="value == 4"
      :temp='temp'
    ></contract>
  </el-dialog>
</template>
<script>
import calculation from "./item/calculation";
import enclosure from './item/enclosure'
import contract from './item/contracttype'
export default {
  props: ["isshow",'temp'],
  components: {
    calculation,
    enclosure,
    contract
  },
  watch: {
    isshow() {
      this.contentVisiable = this.isshow;
    },
    value() {
      // console.log(value);
      if (this.value == 2) {
        this.tableDatas = this.tableDatap;
      }
    },
  },
  data() {
    return {
      contentVisiable: false,
      options: [
        {
          value: "1",
          label: "回款录入",
        },
        {
          value: "2",
          label: "发票录入",
        },
        {
          value: "3",
          label: "附件上传",
        },
        {
          value: "4",
          label: "合同状态",
        },
      ],
      value: "1",
      tableDatas: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
    };
  },
  methods: {
    closeDialog() {
      this.$emit("close");
    },
    closese(){
      this.$emit('close')
    }
  },
};
</script>
<style scoped>
</style>