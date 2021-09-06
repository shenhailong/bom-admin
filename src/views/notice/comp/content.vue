<template>
  <el-dialog
    :title="'详细内容'"
    :visible.sync="contentVisiable"
    @close="closeDialog"
    width="60%"
  >
    <div>
      {{content}}
    </div>
  </el-dialog>
</template>

<script>


export default {
  props: ['ishow','con'],
  created(){
  // console.log(this.ishow);
  },
  watch:{
    ishow(){
      // console.log(this.ishow);
        this.contentVisiable = this.ishow
        this.content = this.con
    }
  },
  data() {
    return {
      contentVisiable:false,
      content:null
    };
  },
  methods: {
    closeDialog(){
      // this.contentVisiable = false
      this.$emit('close')
    }
  },
};
</script>

<style  lang="scss" type="text/scss" scoped>

</style>
