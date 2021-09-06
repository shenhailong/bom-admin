<template>
<!-- 弹窗 -->
  <el-dialog
    :title="con.title"
    :visible.sync="con.contentVisiable"
    @close="closeDialog"
    :close-on-click-modal='false'
    append-to-body
    width="90%"
  >

    <slot></slot>
  </el-dialog>
</template>
<script>
export default {
  props: ["cons"],
  watch: {
    cons: {
      deep: true,
      handler(newValue) {
        this.con = newValue;
      },
    },
  },
  data() {
    return {
      con: {
        contentVisiable: false,
        title: null,
      },
    };
  },
  methods: {
    closeDialog() {},
  },
};
</script>