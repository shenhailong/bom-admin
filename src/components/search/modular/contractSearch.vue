<template>
  <div v-if="ishow">
    <el-form-item label="合同编号">
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
      ishow:false
    };
  },
  mounted() {
    this.queryTemp.data = this.data;
    // 存在的位置
    let arr = ['/MENU76444/MENU2591','/MENU76444/MENU24450','/MENU76444/MENU70309','/MENU76444/MENU22290','/MENU77127/MENU53406','/MENU13775/MENU57636',
    ,'/MENU77127/MENU60952','/MENU63907/MENU68233','/MENU36962/MENU47518','/MENU63907/MENU17914','/MENU13775/MENU55129','/MENU13775/MENU49822',
    '/MENU13775/MENU22912','/MENU61719/MENU7214','/MENU61719/MENU70148','/MENU13775/MENU6859','/MENU61719/MENU90813','/MENU76444/MENU4162','/MENU36962/MENU5712'
    ,'/MENU61719/MENU54527','/MENU36962/MENU9093','/MENU61719/MENU46542','/MENU61719/MENU30865','/hiderouters/customersearch','/MENU61719/MENU52146']
    if(arr.includes(this.$route.path)){
      this.ishow = true
    }else{
      this.ishow = false
    }
    // if(this.$route.path =='/MENU76444/MENU2591'||this.$route.path =='/MENU76444/MENU24450'
    // ||this.$route.path =='/MENU76444/MENU70309'||this.$route.path =='/MENU76444/MENU22290'||this.$route.path =='/MENU77127/MENU53406'
    // ||this.$route.path =='/MENU77127/MENU60952'||this.$route.path =='/MENU63907/MENU68233'||this.$route.path =='/MENU13775/MENU22912'
    // ||this.$route.path=='/MENU61719/MENU7214' ||this.$route.path=='/MENU61719/MENU70148'||this.$route.path=='/MENU61719/MENU54527'
    // ||this.$route.path == '/MENU36962/MENU9093'){
    //     this.ishow = true
    // }else{
    //     this.ishow = true
    // }
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