<template>
  <div>
    
    <div v-for="(item, index) in con" :key="index">
      <el-table-column
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
      >
      </el-table-column>
    </div>
     <el-table-column
      label="操作"  
      :border='true'
      >
      <template slot-scope="scope">
            <el-button v-for="(item,index) in btn" :key="index +1" @click="handleClick(scope.row,index)" type="text" size="small"> {{item}} </el-button>
      </template>
    </el-table-column>
  </div>
</template>
<script>
export default {
  props: ["cons",'btns'],
  mounted(){
    this.con = this.cons
    this.btn = this.btns

  },
  watch: {
    cons: {
      deep: true,
      handler(newValue) {
        this.con = newValue;
      },
    },
    btns(){
      this.btn = this.btns
    }
  },
  data() {
    return {
      con: [],
      btn:[]
    };
  },
  methods: {
      handleClick(row,index) {
        // console.log(row);
        let btnjson={
          id:row,
          code:index
        }
        // console.log(btnjson);
        this.$emit('btnClick',btnjson)
      }
    },
};
</script>