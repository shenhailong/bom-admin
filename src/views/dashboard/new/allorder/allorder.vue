<template>
  <div class="pps">
    <h3>SMT总订单</h3>
    <hr />
    <div class="body">
      <chart :option="option"></chart>
    </div>
  </div>
</template>
<script>
import chart from "@/components/echarts/echarts"; //echarts 插件的封装方法
export default {
  components: {
    chart,
  },
  data() {
    return {
      option: {
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          data: [
            "异常",
            "正在生产",
            "待生产",
            "已完成",
          ],
        },
        series: [
          {
            name: "SMT订单总量",
            type: "pie",
            selectedMode: "single",
            radius: [0, "30%"],
            label: {
              position: "inner",
              fontSize: 14,
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1548, name: "订单合计" },
            ],
          },
          {
            name: "访问来源",
            type: "pie",
            radius: ["45%", "60%"],
            labelLine: {
              length: 30,
            },
            // label: {
            //   formatter: "{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ",
            //   backgroundColor: "#F6F8FC",
            //   borderColor: "#8C8D8E",
            //   borderWidth: 1,
            //   borderRadius: 4,

            //   rich: {
            //     a: {
            //       color: "#6E7079",
            //       lineHeight: 22,
            //       align: "center",
            //     },
            //     hr: {
            //       borderColor: "#8C8D8E",
            //       width: "100%",
            //       borderWidth: 1,
            //       height: 0,
            //     },
            //     b: {
            //       color: "#4C5058",
            //       fontSize: 14,
            //       fontWeight: "bold",
            //       lineHeight: 33,
            //     },
            //     per: {
            //       color: "#fff",
            //       backgroundColor: "#4C5058",
            //       padding: [3, 4],
            //       borderRadius: 4,
            //     },
            //   },
            // },
            data: [
              { value: 1048, name: "异常" },
              { value: 335, name: "正在生产" },
              { value: 310, name: "待生产" },
              { value: 251, name: "已完成" },
            //   { value: 234, name: "联盟广告" },
            //   { value: 147, name: "必应" },
            //   { value: 135, name: "视频广告" },
            //   { value: 102, name: "其他" },
            ],
          },
        ],
      },
    };
  },
};
</script>
<style lang="scss" type="text/scss" scoped>
.pps {
  padding-bottom: 40px;
  height: 500px;
  background: #fff;
  border-radius: 20px;
  margin-top: 20px;
  h3 {
    margin: 0px 0px 0px 30px;
    padding: 20px 0 10px 0;
  }
  h5 {
    text-align: center;
  }
}
.body {
    width: 100%;
    height: 80%;
}
</style>