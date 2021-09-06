<template>
<!-- echarts 组件 -->

    <div ref="myChart" class="chart"></div>

    
    
</template>
<script>
export default {
    props:['option'],
    data(){
        return{
            options:{}
        }
    },
    mounted(){
        
        this.init()
    },
    watch:{
        option(){
            this.init()
        }
    },
    methods:{
        init(){
            this.options = this.option
            this.chart = this.$echarts.init(this.$refs.myChart);
            this.chart.setOption(this.options);
        }
    }
}
</script>
<style lang="scss" type='text/scss' scoped>
.texts{
    text-align: center;
}
.chart{
    width: 100%;
    height: 95%;
}
</style>    