<template>
  <div  v-if="ishow">
    <el-form-item label="客户名称">
      <el-input v-model="queryTemp.data"></el-input>
    </el-form-item>
  </div>
</template>
<script>
export default {
  data() {
    return {
      queryTemp: {
        data: "",
      },
      ishow:''
    };
  },
  mounted() {
    this.queryTemp.data = this.data;
    if(this.$route.path =='/MENU36962/MENU9093'){
        this.ishow = true
    }else{
        this.ishow = false
    }
  },
  props: {
    data: {
      type: String,
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