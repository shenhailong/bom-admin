<template>
    
    <div v-if="ishow">
        <div></div>
        <el-form-item label="出库日期区间 ">
            <el-date-picker
            width="30%"
            v-model="queryTemp.data"
            type="daterange"
            range-separator="~"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            
            >
            </el-date-picker>
            
        </el-form-item>
    </div>
    
</template>
<script>

export default {
    data(){
        return{
            queryTemp: {
                data: "",
            },
            ishow:true
        }
    },
    mounted(){
      this.queryTemp.data= this.data
      let arr = ['/MENU36962/MENU47518']
    if(arr.includes(this.$route.path)){
      this.ishow = true
    }else{
      this.ishow = false
    }
    },
    props:{
        data:{
            type:Array
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