<template>
  <div class="pps">
    <h3>pk榜单</h3>
    <hr />
    <div>
      <div class="titles">
        <div>
          <p>
            <img src="@/assets/title/1.png" alt="">
          </p>
          <p class="name">韩光</p>
        </div>
        <div>
          <p>
             <img src="@/assets/title/2.png" alt="">
          </p>
          <p class="name">钱龙</p>
        </div>
        <div>
          <p>
             <img src="@/assets/title/3.png" alt="">
          </p>
          <p class="name">程月</p>
        </div>
      </div>
      <!-- <span>钱龙</span>
            <span></span> -->
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" type="text/scss" scoped>
// "
* {
  margin: 0;
  padding: 0;
}
.pps {
  padding-bottom: 40px;
  height: 150px;
  background: #fff;
  border-radius: 20px;
  margin-top: 25px;
  h3 {
    margin: 0px 0px 0px 30px;
    padding: 20px 0 10px 0;
  }
  h5 {
    text-align: center;
  }
}
.titles {
  display: flex;
  justify-content: space-around;
}
.titles div {
  width: 30%;
  display: flex;
  img {
    width: 100%;
    height: 100%;
  }
  p {
   width: 50%;

  }
  .name{
    padding-top: 25%;
  }
}
</style>