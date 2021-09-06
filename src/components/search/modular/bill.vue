<template>
  <div  v-if="ishow">
	  <div>单据状态</div>
      <br>
      <br>
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
      queryTemp: {
        data: "",
      },
      ishow:'',
      options1: [
	  		{
	  		  value: '单据状态',
	  		  label: '单据状态',
	  		  children: [{
	  			value: '30',
	  			label: '订单报价中'
	  		  },{
	  			value: '31',
	  			label: '完成订单报价'
	  		  },{
	  			value: '50',
	  			label: '合同签订成功'
	  		  }] 
	  		},
			{
			  value: '生产流程状态',
			  label: '生产流程状态',
			  children: [{
				value: '0',
				label: '自由态'
			  },{
				value: '1',
				label: '生产中'
			  },{
				value: '2',
				label: '暂停生产'
			  },{
				value: '3',
				label: '生成完成'
			  },{
				value: '4',
				label: '一键暂停'
			  },] 
			},
	  ],
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