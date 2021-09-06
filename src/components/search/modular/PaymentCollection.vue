<template>
  <div  v-if="ishow">
    <div>回款情况</div>
      <br>
      <br>
	<el-select v-model="queryTemp.data" clearable placeholder="请选择">
            <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
            </el-option>
    </el-select>

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
      options: [
          {
          value: '2',
          label: '已回款'
        }, {
          value: '0',
          label: '未回款'
        },
        {
          value: '1',
          label: '部分回款'
        },
          
	  ],
    };
  },
  mounted() {
    this.queryTemp.data = this.data;
     if(this.$route.path =='/MENU36962/MENU47518'){
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