<template>
  <div  v-if="ishow">
    <el-form-item label="产品名称" v-if='$route.path !="/MENU3252/MENU71832"'>
      <el-input v-model="queryTemp.data"></el-input>
    </el-form-item>
    <el-form-item label="存货编码" v-else>
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
      ishow:true
    };
  },
  mounted() {
    this.queryTemp.data = this.data;
    // /MENU36962/MENU5712
    let arr =['/MENU22617/MENU45455','/MENU36962/MENU25210','/MENU36962/MENU5712','/MENU76444/MENU24450'
    ,'/MENU61719/MENU35235','/MENU3252/MENU32036','/MENU63907/MENU68233','/MENU63907/MENU38889','/MENU3252/MENU95693'
    ,'/MENU61719/MENU46542','/MENU36962/MENU47518','/MENU63907/MENU17914','/MENU3252/MENU71832']
     if(arr.includes(this.$route.path)){
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