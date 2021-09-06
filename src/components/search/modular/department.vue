<template>
  <div v-if="ishow">
    <el-form-item label="填写部门">
      <el-select v-model="value" placeholder="请选择" clearable>
        <el-option
          v-for="(item,index) in options"
          :key="index"
          :label="item.label"
          :value="item.label"
        >
        </el-option>
      </el-select>
    </el-form-item>
  </div>
</template>
<script>
import { listBdPsndocAsRef } from "@/api/orgs/bdpsndoc";
export default {
  data() {
    return {
      options: [
          {label:'SMT'},
          {label:'DIP'},
          {label:'组装、测试、老化'},
          {label:'三防'}
      ],
      value: "",
      queryTemp: {
        data: "",
      },
      ishow: true,
    };
  },
  mounted() {
    this.queryTemp.data = this.data;
    let arr = [
      "/MENU61719/MENU52146",
     
    ];
    if (arr.includes(this.$route.path)) {
      this.ishow = true;
    } else {
      this.ishow = false;
    }
  },
  props: {
    data: {
      type: String,
    },
  },

  watch: {
    value(newValue) {
      // console.log(newValue);
      this.$emit("update:data", this.value);
    },
  },
};
</script>
<style scoped>
</style>