<template>
  <div  v-if="ishow">
    <el-form-item label="填写业务员">
       <el-select v-model="value" placeholder="请选择" clearable>
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.label">
        </el-option>
      </el-select>
    </el-form-item>
  </div>
</template>
<script>
import { listBdPsndocAsRef } from "@/api/orgs/bdpsndoc";
export default {
  data() {
    return {
        options: [{
        }],
      value: '',
      queryTemp: {
        data: "",
      },
      ishow:true
    };
  },
  mounted() {
   
    this.queryTemp.data = this.data;
    let arr = ['/MENU76444/MENU2591','/MENU76444/MENU24450','/MENU76444/MENU70309','/MENU77127/MENU53406','/MENU76444/MENU22290','/MENU13775/MENU49822',
    ,'/MENU77127/MENU60952','/MENU61719/MENU54527','/MENU61719/MENU70148','/MENU63907/MENU68233','/MENU36962/MENU9093','/MENU61719/MENU7214','/MENU13775/MENU57636'
    ,'/MENU22617/MENU54309' ,'/MENU36962/MENU25210','/MENU22617/MENU45455','/MENU36962/MENU5712','/MENU61719/MENU35235','/MENU61719/MENU46542'
    ,'/MENU3252/MENU32036','/MENU63907/MENU17914','/MENU63907/MENU38889','/MENU3252/MENU95693','/MENU3252/MENU38757','/MENU61719/MENU46542','/MENU13775/MENU55129'
    ,'/MENU36962/MENU47518','/MENU63907/MENU17914','/MENU13775/MENU83320','/MENU61719/MENU70148','/MENU61719/MENU90813'
    ,'/MENU61719/MENU30865','/hiderouters/customersearch']
     if(arr.includes(this.$route.path)){
        this.ishow = true
         listBdPsndocAsRef({pkPsntype:'6'}).then((res)=>{
            this.options =res.object
          })
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
    "value"(newValue) {
        // console.log(newValue);
      this.$emit("update:data", this.value);
    },
  },
};
</script>
<style scoped>
</style>