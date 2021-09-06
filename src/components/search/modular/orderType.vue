<template>
  <div  v-if="ishow">
	  <br>
      <div>  {{isname}}</div>
      <!-- <el-option v-model="queryTemp.data" :options="options1"></el-option> -->
      <el-cascader
			size="small"
			v-model="queryTemp.data"
			:options="options1"
			placeholder="请选择类型"
			></el-cascader>

  </div>
</template>
<script>
export default {
  data() {
    return {
      isname:'合同类型',
      queryTemp: {
        data: "",
      },
      ishow:'',
      options1: [
	  		 { value: 0, label: "自由态" },
            { value: 1, label: "加工" },
            { value: 2, label: "OEM" },
            { value: 3, label: "ODM" },
            { value: 4, label: "物料" },
	  ],
    };
  },
  mounted() {
    this.queryTemp.data = this.data;
    var arr = ['/MENU63907/MENU17914','/MENU61719/MENU46542','/MENU63907/MENU68233']
    if(arr.includes(this.$route.path)){
      this.ishow = true
    }else{
      this.ishow = false
    }
    if(this.$route.path =='/MENU63907/MENU68233'){
      this.isname ='产品类型'
    }
    else{
         this.isname ='合同类型'
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