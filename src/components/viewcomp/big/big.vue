<template>
    <el-dialog  :visible.sync="onshow" @close="closeDialog" class="min" :modal-append-to-body='false' :append-to-body='true'>
        <div style="width:40%,height:40%">
               <img :src="mimi" alt=""  class="min">
        </div>
     
    </el-dialog>
</template>
<script>
export default {
    props:['ishow','scr'],
    watch:{
        ishow(){
            // console.log('s');
            this.onshow = this.ishow 
            // console.log(this.scr);
            this.mimi = this.scr
        }
    },
    data(){
        return{
            onshow:false,
            mimi:null
        }
    },
    methods:{
        closeDialog(){
            this.$emit('close')
        }
    }
}
</script>
<style  scoped>
.min{
    width:100%;
    height: 100%;
}
</style>