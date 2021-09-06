<template>
  <div class="pps">
    <h3>生产报表</h3>
    <hr />
    <div class="title">
      <chart :option="option"></chart>
      <chart :option="option_one"></chart>
      <chart :option="option_one"></chart>
      <chart :option="option_one"></chart>
      <chart :option="option_one"></chart>
    </div>
    <div class="footer">
      <chart :option="option_two"></chart>
    </div>
  </div>
</template>
<script>
import chart from "@/components/echarts/echarts"; //echarts 插件的封装方法
export default {
  data() {
    return {
      option_one: {
          title: {
              text: "待添加",
            //   subtext: "0",
              x: "center",
              // bottom:'bottom'
            },
        series: [
          {
            type: "gauge",
            progress: {
              show: true,
              width: 18,
            },
            axisLine: {
              lineStyle: {
                width: 18,
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              length: 15,
              lineStyle: {
                width: 2,
                color: "#999",
              },
            },
            // axisLabel: {
            //   distance: 25,
            //   color: "#999",
            //   fontSize: 20,
            // },
            anchor: {
              show: true,
              showAbove: true,
              //   size: 25,
              itemStyle: {
                borderWidth: 10,
              },
            },
            
            detail: {
              valueAnimation: true,
              //   fontSize: 80,
              offsetCenter: [0, "70%"],
            },
            data: [
              {
                value: 46,
              },
            ],
          },
        ],
      },
      option: {},
      option_two: {},
      allday: 0,
      arr: [],
    };
  },
  mounted() {
    this.allday = this.getCountDays();
    this.init();
    // console.log(this.getCountDays());

    //  console.log(this.option_two);
  },
  components: {
    chart,
  },
  methods: {
    init() {
      let jsons = [];
      console.log(this.allday);
      for (let i = 0; i < this.allday; i++) {
        //  console.log(i+1);
        jsons.push(i + 1);
      }
      // console.log(jsons);
        this.option_two = {
    title: {
        text: '对数轴示例',
        left: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c}'
    },
    legend: {
        left: 'left',
        data: ['2的指数', '3的指数']
    },
    xAxis: {
        type: 'category',
        name: 'x',
        splitLine: {show: false},
        data: jsons
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    yAxis: {
        type: 'log',
        name: 'y',
        minorSplitLine: {
            show: true
        }
    },
    series: [
        {
            name: '3的指数',
            type: 'line',
            data: [1, 3, 9, 12,15,17,18]
        },
        {
            name: '2的指数',
            type: 'line',
            data: [1, 2, 4, 8, 16, 32, 64, 128, 256]
        },
        {
            name: '1/2的指数',
            type: 'line',
            data: [1/2, 1/4, 1/8, 1/16, 1/32, 1/64, 1/128, 1/256, 1/512]
        }
    ]
};
      // console.log(this.option_two);
      // this.chart = this.$echarts.init(this.$refs.myChart);
      this.option = {
        title: {
          text: "客户总量",
          subtext: "1000",
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
              { value: 1048, name: "韩光" },
              { value: 735, name: "钱龙" },
              { value: 580, name: "程月" },
              { value: 484, name: "毕纬" },
            ],
          },
        ],
      };
      // this.chart.setOption(this.option);
    },
    getCountDays() {
      var curDate = new Date();
      /* 获取当前月份 */
      var curMonth = curDate.getMonth();
      /*  生成实际的月份: 由于curMonth会比实际月份小1, 故需加1 */
      curDate.setMonth(curMonth + 1);
      /* 将日期设置为0, 这里为什么要这样设置, 我不知道原因, 这是从网上学来的 */
      curDate.setDate(0);
      /* 返回当月的天数 */
      return curDate.getDate();
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
</style>