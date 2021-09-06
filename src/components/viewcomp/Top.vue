<template>
  <div>
    <hr />
    <el-button type="primary" @click="minexportExcel" class="expel"
      >点击导出</el-button
    >
    <el-button type="primary" @click="actionbar" class="expel"
      >操作拦</el-button
    >
    <el-button-group
      style="margin-left: 1rem"
      :key="index"
      v-for="(btn, index) in topBtns"
    >
      <el-button
        :style="btn.styleAttr == null ? '' : btn.styleAttr"
        :size="btn.btnSize == null ? '' : btn.btnSize"
        type="primary"
        @click="clickBtn(btn.name, btn.code, btn.action)"
      >
        {{ btn.name }}
      </el-button>
    </el-button-group>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "Top",
  props: ["fastFilter", "search_columns"],
  computed: {
    ...mapGetters(["topBtns"]),
  },
  data() {
    return {
      search_val: "",
      select_val: "",
      fastFilterVal: {},
      options: [
        {
          name: "选项1",
          label: "联系人",
        },
        {
          value: "选项2",
          label: "客户名称",
        },
        {
          value: "选项3",
          label: "客户编码",
        },
      ],
    };
  },
  methods: {
    //调用list里面的导出方法
    minexportExcel() {
      this.$emit("refreshList");
    },
    actionbar() {
      this.$emit("actionbar");
    },
    clickBtn(name, code, action) {
      let param = { btnName: name, btnCode: code, btnAction: action };
      this.$emit("onButtonClick", param);
    },
  },

  ///////
};
</script>

<style scoped>
/* 将导出放置左面 */
.expel {
  /* float: right; */
}
</style>