<template>
  <div>
	 <comment  :is="currentRole"></comment>
  </div>
</template>

<script>
import { OmgCount } from '@/api/dashboard/dashboard'
import {mapGetters} from 'vuex'
import  admin from './admin'
import  cusromer from './cusromer'
import  business from './business'
import  technology from './technology'
import  product from './product'
import  finance from './finance'
import  keepGrain from './keepGrain'
import  quality from './quality'

export default {
	name:'dashboard1',
	components:{admin,cusromer,business,technology,product,finance,keepGrain,quality},
	computed: {
	  ...mapGetters([
	    'name',
	    'roles'
	  ])
	},
  data() {
    return {
	   currentRole:''
    }
  },
  created() {
	      var roleNumber=""
	    // console.log("我是卡片页面")
		// console.log(this.roles);   //角色ID
		if(this.roles.length>0){
			for(var i=0;i<this.roles.length;i++){
				roleNumber=this.roles[i].pkRole
			}
		}
		let  roleName=this.roles[0].roleName
		// console.log(roleName)
		
		if(roleName=="全权角色"){
			this.currentRole="admin"
		}else if(roleName=="销售角色"){
			this.currentRole="cusromer"
		}else if(roleName=="采购角色"){
			this.currentRole="business"
		}else if(roleName=="工艺角色"){
			this.currentRole="technology"
		}else if(roleName=="生产角色"){
			this.currentRole="product"
		}else if(roleName=="财务角色"){
			this.currentRole="finance"
		}else if(roleName=="仓储角色"){
			this.currentRole="keepGrain"
		}else if(roleName=="质检角色"){
			this.currentRole="quality"
		}
			
  },
  methods: {
    
  }
};
</script>

<style>

</style>