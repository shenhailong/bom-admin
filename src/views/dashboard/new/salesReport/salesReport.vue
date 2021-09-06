<template>
  <div class="pps">
    <h3>销售报表</h3>
    <hr />
    <div class="title">
      <chart :option="option"> </chart>
      <!-- <chart :option="option"></chart>
      <chart :option="option"></chart>
      <chart :option="option"></chart> -->
    </div>
    <div class="footer">
      <chart :option="option_two"></chart>
      <!-- <div ref="minchart"></div> -->
      <!-- <chartss :options="options" type="pie" :data="data"></chartss> -->
    </div>
  </div>
</template>
<script>
import chart from "@/components/echarts/echarts"; //echarts 插件的封装方法
import { selectAllCustomerAsNum } from "@/api/dashboard/dashboard";
// import chartss from '@/components/echarts/chart'
// import echarts from "echarts";
export default {
  data() {
    return {
      option: {},
      option_two: {},
      datasetWithFilters: [],
      seriesList: [],
      data: "lineChartData",
      options: {
        responsive: true,
        hoverMode: "index",
        stacked: false,
        title: {
          display: true,
          text: "Chart.js Line Chart - Multi Axis",
        },
        scales: {
          yAxes: [
            {
              type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
              display: true,
              position: "left",
              id: "y-axis-1",
            },
            {
              type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
              display: true,
              position: "right",
              id: "y-axis-2",

              // grid line settings
              gridLines: {
                drawOnChartArea: false, // only want the grid lines for one axis to show up
              },
            },
          ],
        },
      },
    };
  },

  mounted() {
    // this.init();
  
    // this.runs();
    
  },
  components: {
    chart,
    // chartss
  },
  methods: {
    runs(_rawData) {
      this.option_two = {
        title: {
          text: "对数轴示例",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c}",
        },
        legend: {
          left: "left",
          data: ["韩光", "", "程月", "钱龙", "毕伟"],
        },
        xAxis: {
          type: "category",
          // name: 'x',
          splitLine: { show: false },
          data: ["一", "二", "三", "四", "五", "六", "七"],
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        yAxis: {
          type: "log",
          // name: 'y',
          minorSplitLine: {
            show: true,
          },
        },
        series: [
          {
            name: "韩光",
            type: "line",
            data: [1, 3, 9, 12, 15, 17, 18],
          },
          {
            name: "程月",
            type: "line",
            data: [1, 2, 4, 8, 16, 32],
          },
          {
            name: "钱龙",
            type: "line",
            data: [1, 4, 8, 16, 32, 64],
          },
          {
            name: "毕伟",
            type: "line",
            data: [4, 1, 8, 16, 5, 4],
          },
        ],
      };
      //   this.chart = this.$echarts.init(this.$refs.minchart);
      // //   console.log(this.option_two);
      //     this.chart.setOption(option);
      // myChart.setOption(option);
    },
    init() {
    
      selectAllCustomerAsNum({ de: 0 }).then((res) => {
        // console.log(res.object);
        // 销售报表 客户总量
        let allCutmer = 0;
        allCutmer = res.object.total; //数量全部
        let OEM = res.object.oemNum //ODM数量
        let ODM = res.object .odmNum //ODM数量
        let processNum = res.object.processNum //加工数量
        this.option = {
          title: {
            text: allCutmer,
            subtext: "客户总量",
            x: "center",
            // bottom:'bottom'
          },
          tooltip: {
            trigger: "item",
          },
          legend: {
            //  orient: 'vertical',
            // top: "1%",
            x: "right", //可设定图例在左、右、居中
            y: "bottom", //可设定图例在上、下、居中
          },
          series: [
            {
              name: "访问来源",
              type: "pie",
              radius: ["40%", "70%"],
              avoidLabelOverlap: false,
              label: {
                show: false,
                position: "center",
              },
              emphasis: {
                label: {
                  show: true,
                  fontSize: "20",
                  // fontWeight: "bold",
                },
              },
              labelLine: {
                show: false,
              },
              data: [
                { value: OEM, name: "OEM" },
                { value: ODM, name: "ODM" },
                { value: processNum, name: "加工" },
                // { value: telnum, name: "自由态" },
              ],
            },
          ],
        };
        // this.options
      });
      // this.chart = this.$echarts.init(this.$refs.myChart);

      // this.chart.setOption(this.option);
    },
  },
};
</script>
<style lang="scss" type="text/scss" scoped>
.pps {
  padding-bottom: 40px;
  height: 680px;
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
.title {
  display: flex;
}
.title > div {
  width: 30%;
  height: 300px;
  font-size: 12px;
}

.footer {
  width: 100%;
  height: 300px;
}
.footer > div {
  width: 100%;
  height: 100%;
}
// .chart {
//   width: 30%;
//   height: 100px;
// }
</style>