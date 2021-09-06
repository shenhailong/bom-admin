<template>
<!-- 进度查询的按钮 -->
  <div>
    <p>
      <el-button :type="istype" circle @click='$router.push(paths)' :disabled='!dis'> {{num}} </el-button>
    </p>
    <p>{{name}}</p>
  </div>
</template>
<script>
export default {
    props:['num','paths','istype','name','dis'],
};
</script>
<style lang="scss" type="text/scss" scoped>
p{
    text-align: center;
}
button{
  width: 3.5em;
  height: 3.5em;
}
</style>