<template>
    <el-form-item label="合同状态" v-if="ishow">
      <el-select  v-model="queryTemp.data" placeholder="请选择类型" clearable>
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </el-form-item>
  
</template>
<script>
export default {
  data() {
    return {
      queryTemp: {
        data: "",
      },
      ishow: "",
      options1: [
        {
          value: "65",
          label: "完成",
        },
        {
          value: "50",
          label: "未完成",
        },
        {
          value: null,
          label: "全部",
        },
      ],
    };
  },
  mounted() {
    this.queryTemp.data = this.data;
    let arr= ['/hiderouters/customersearch','/MENU13775/MENU55129']
    if (arr.includes(this.$route.path) ) {
      this.ishow = true;
    } else {
      this.ishow = false;
    }
  },
  props: {
    data: {
      type: Array,
    },
  },

  watch: {
    "queryTemp.data"(newValue) {
      // console.log(newValue);
      this.$emit("update:data", newValue);
    },
  },
};
</script>
<style scoped>
</style>