<template>
  <div class="pps">
    <h3>SMT报表</h3>
    <hr />
    <div class="body"></div>
    <chart :option="option"></chart>
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
        dataset: [
          {
            // id: "raw",
            source: [
              //黑色盒子第1组
              ["1日", 1, 5, 13, 14, 16, ],
              //黑色盒子第2组
              ["2日", 3, 6, 12, 16, 18],
              // [960, 940, 960, 940, 880, 800, 850, ],
              // //黑色盒子第3组
              ["3日", 3, 4, 10, 16, 21],
              // [890, 810, 810, 820, 800, 770, 760, ],
              // //黑色盒子第4组
              ["4日", 1, 2, 10, 14, 16, ],
              ["5日", 1, 2, 10, 14, 16],
              ["6日", 1, 2, 10, 14, 16],
              ["7日", 1, 2, 10, 14, 16],
              ["8日", 1, 2, 10, 14, 16],
              ["9日", 1, 2, 10, 14, 16],
              ["10日", 1, 2, 10, 14, 16],
              ["11日", 1, 2, 10, 14, 16],
              ["12日", 1, 2, 10, 14, 16],
              ["13日", 1, 2, 10, 14, 16],
              ["14日", 1, 2, 10, 14, 16],
              ["16日", 1, 2, 10, 14, 16],
              ["16日", 1, 2, 10, 14, 16],
              ["17日", 1, 2, 10, 14, 16],
              ["18日", 1, 2, 10, 14, 16],
              ["19日", 1, 2, 10, 14, 16],
              ["20日", 1, 2, 10, 14, 16],
              ["21日", 1, 2, 10, 14, 16],
              ["22日", 1, 2, 10, 14, 16],
              ["23日", 1, 2, 10, 14, 16],
              ["24日", 1, 2, 10, 14, 16],
              ["25日", 1, 2, 10, 14, 16],
              ["26日", 1, 2, 10, 14, 16],
              ["27日", 1, 2, 10, 14, 16],
              ["28日", 1, 2, 10, 14, 16],
              ["29日", 1, 2, 10, 14, 16],
              ["30日", 8.5, 9, 12, 14, 17.5],
              // [850, 840, 780, 810, 760, 810, 790, ]
            ],
          },
          //   {
          //     id: "income_aggregate",
          //     fromDatasetId: "since_year",
          //     transform: [
          //     //   {
          //     //     type: "boxplot",
          //     //     config: {
          //     //       resultDimensions: [
          //     //         { name: "min", from: "Income", method: "min" },
          //     //         { name: "Q1", from: "Income", method: "Q1" },
          //     //         { name: "median", from: "Income", method: "median" },
          //     //         { name: "Q3", from: "Income", method: "Q3" },
          //     //         { name: "max", from: "Income", method: "max" },
          //     //         { name: "Country", from: "Country" },
          //     //       ],
          //     //       groupBy: "Country",
          //     //     },
          //     //   },
          //     //   {
          //     //     type: "sort",
          //     //     config: {
          //     //       dimension: "Q3",
          //     //       order: "asc",
          //     //     },
          //     //   },
          //     ],
          //   },
        ],
        // title: {
        //   text: "Income since 1950",
        // },
        tooltip: {
          trigger: "axis",
          confine: true,
        },
        xAxis: {
          //   name: "Income",
        //   type: 'value',
        axisTick:{show:true},
          nameLocation: "left",
          //   data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24],
          nameGap: 30,
          scale: true,
        },
        yAxis: {
          type: "category",
        },
        // grid: {
        //   bottom: 100,
        // },
        // legend: {
        //   selected: { detail: false },
        // },
        // dataZoom: [
        //   {
        //     type: "inside",
        //     // start: 0,
        //     // end: 24,
        //   },
        //   {
        //     show: true,
        //     type: "slider",
        //     top: "90%",
        //     xAxisIndex: [0],
        //     // start: 0,
        //     // end: 24,
        //   },
        // ],
        series: [
          {
            name: "boxplot",
            type: "boxplot",
            datasetId: "income_aggregate",
            itemStyle: {
              color: "#b8c5f2",
            },
            encode: {
              x: ["min", "Q1", "median", "Q3", "max"],
              y: "Country",
              itemName: ["Country"],
              tooltip: ["min", "Q1", "median", "Q3", "max"],
            },
          },
          //   {
          //     name: "detail",
          //     type: "scatter",
          //     datasetId: "since_year",
          //     symbolSize: 6,
          //     tooltip: {
          //       trigger: "item",
          //     },
          //     label: {
          //       show: true,
          //       position: "top",
          //       align: "left",
          //       verticalAlign: "middle",
          //       rotate: 90,
          //       fontSize: 12,
          //     },
          //     itemStyle: {
          //       color: "#d00000",
          //     },
          //     encode: {
          //       x: "Income",
          //       y: "Country",
          //       label: "Year",
          //       itemName: "Year",
          //       tooltip: ["Country", "Year", "Income"],
          //     },
          //   },
        ],
      },
    };
  },
};
</script>
<style lang="scss" type="text/scss" scoped>
.pps {
  padding-bottom: 40px;
  height: 680px;
  background: #fff;
  border-radius: 20px;
  //   margin-bottom: 20px;
  margin-top: 20px;
  h3 {
    margin: 0px 0px 0px 30px;
    padding: 20px 0 10px 0;
  }
  h5 {
    text-align: center;
  }
}
.footer {
  width: 100%;
  height: 300px;
}
.footer > div {
  width: 100%;
  height: 100%;
}
</style>