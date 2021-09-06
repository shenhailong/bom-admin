<template>
    
    <div v-if="ishow">
        <div></div>
        <el-form-item label="日期区间 ">
            <el-date-picker
            width="30%"
            v-model="queryTemp.data"
            type="daterange"
            range-separator="至"
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
      let arr = ["/MENU61719/MENU35235",
      "/MENU36962/MENU25210","/MENU36962/MENU5712",'/MENU3252/MENU32036','/MENU13775/MENU83320']
    if(arr.includes(this.$route.path)){
      this.ishow = false
    }else{
      this.ishow = true
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