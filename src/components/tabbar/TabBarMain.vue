<template>
	<Tabbar>
    <!--  在html中使用别名:
     1:~assets/images/tabbar/jinpai.png
     2:@/assets/images/tabbar/home.png -->
          <tabbar-item path="/app/home" >
            <p slot="item_title">我的应用</p>
          </tabbar-item>
          <tabbar-item path="/app/fen" >
            <p slot="item_title">我的</p>
          </tabbar-item>
          <!-- <tabbar-item path="/app/seen">
            <p slot="item_title">3</p>
          </tabbar-item> -->
          <!-- <tabbar-item path="/app/me">
            <p slot="item_title">4</p>
          </tabbar-item> -->
    </Tabbar>
</template>
<script>
let Tabbar = ()=>import ("./TabBar");
let TabbarItem = ()=>import ("./TabBarItem");
	export default {
		name:"TabBarMain",
		components:{
          Tabbar,
          TabbarItem
       }
	}
</script>
<style scoped>
</style>