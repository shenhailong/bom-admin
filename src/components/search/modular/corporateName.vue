<template>
  <div  v-if="ishow">
    <el-form-item label="公司名称">
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
    let arr = ['/MENU22617/MENU54309','/MENU13775/MENU49822',
    '/MENU61719/MENU46542','/MENU36962/MENU47518','/MENU63907/MENU17914','/MENU13775/MENU83320','/MENU13775/MENU55129']
    if(arr.includes(this.$route.path) ){
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