<template>
  <el-dialog :visible.sync="onshow" @close="closeDialog" class="min" width="70%">
    <div style="width:80%,height:40%">
      <img src="@/assets/thread/WechatIMG140.png" alt="" />
      <img src="@/assets/thread/WechatIMG141.png" alt="" />
      <img src="@/assets/thread/WechatIMG142.png" alt="" />
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: ["ishow", ],
  watch: {
    ishow() {
      // console.log('s');
      this.onshow = this.ishow;

    },
  },
  data() {
    return {
      onshow: false,
      mimi: null,
    };
  },
  methods: {
    closeDialog() {
      this.$emit("close");
    },
  },
};
</script>
<style  scoped>
/* .min {
  width: 100%;
  height: 100%;
} */
img {
  width: 100%;
}
</style>