<template>


    <el-form-item label="有效合同" v-if="ishow">
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
          value: "0",
          label: "有",
        },
        {
          value: "1",
          label: "无",
        },
        
      ],
    };
  },
  mounted() {
    this.queryTemp.data = this.data;
    if (this.$route.path == "/MENU13775/MENU55129") {
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