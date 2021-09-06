<template>
     <div class="block" v-if="ishow">
       <!-- <br> -->
    <div>交货日期</div>
    <br>
    <br>

    <el-date-picker
      v-model="queryTemp.data"
      type="date"
      placeholder="选择日期">
    </el-date-picker>
  </div>
</template>
<script>

export default {
    data(){
        return{
            queryTemp: {
                data: "",
            },
            ishow:false
        }
    },
    mounted(){
      this.queryTemp.data= this.data
       let arr = ['/MENU36962/MENU5712']
    if(arr.includes(this.$route.path)){
      this.ishow = true
    }else{
      this.ishow = false
    }
    },
    props:{
        data:{
            type:String
        }

    },
    
    watch:{
        'queryTemp.data'(newValue){
            this.$emit('update:data',newValue)
        }
    },
    methods:{
    //
    }
    
}
</script>
<style lang="scss" scoped>

</style>