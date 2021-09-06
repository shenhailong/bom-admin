<template>
  <div  v-if="ishow">
    <el-form-item label="客户编号">
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
    let arr = ['/MENU76444/MENU2591','/MENU76444/MENU24450','/MENU76444/MENU70309','/MENU76444/MENU22290','/MENU77127/MENU53406','/MENU63907/MENU17914','/MENU13775/MENU49822',
    ,'/MENU77127/MENU60952','/MENU63907/MENU68233','/MENU63907/MENU38889','/MENU61719/MENU54527','/MENU22617/MENU45455','/MENU61719/MENU7214' ,'/MENU13775/MENU55129','/MENU13775/MENU57636'
    ,'/MENU61719/MENU35235','/MENU22617/MENU54309','/MENU61719/MENU70148','/MENU36962/MENU25210','/MENU36962/MENU9093','/MENU61719/MENU46542','/MENU61719/MENU90813',
    '/MENU3252/MENU38757','/MENU36962/MENU47518','/MENU13775/MENU83320','/MENU61719/MENU30865','/MENU76444/MENU4162','/MENU36962/MENU5712']
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