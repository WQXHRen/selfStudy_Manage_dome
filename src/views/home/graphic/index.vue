<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>详情分析</span>
      </div>
      <!-- 卡片内容 -->

      <el-radio-group size="small" v-model="dateType">
        <el-radio-button label="今日"></el-radio-button>
        <el-radio-button label="本周"></el-radio-button>
        <el-radio-button label="本月"></el-radio-button>
      </el-radio-group>

      <!-- 日期选择 -->
      <el-date-picker
        class="date-picker"
        v-model="choosedDate"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="-"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions"
      ></el-date-picker>

      <!-- 简单卡片 -->

      <el-row :gutter="20" class="my-el-row">
        <el-col :span="8">
          <el-card class="box-card">
            <div class="my-el-card">
              <i class="iconfont icon-fensi"></i>
              <div class="span-wrap">
                <span class="firstSpan">30个</span>
                <span>粉丝数</span>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card">
            <div class="my-el-card">
              <i class="iconfont icon-ico_yueduliang"></i>
              <div class="span-wrap">
                <span class="firstSpan">22%</span>
                <span>粉丝累计阅读量</span>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card class="box-card">
            <div class="my-el-card">
              <i class="iconfont icon-leijishouyi"></i>
              <div class="span-wrap">
                <span class="firstSpan">1.2元</span>
                <span>粉丝收益</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <!-- 图表 -->
      <div class="my_echarts" ref="my_echarts"></div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dateType: "今日",
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      choosedDate: "",
      option: {
        title: {
          text: "头条粉丝"
        },
        tooltip: {
          trigger: "axis"
        },
        
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Web", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            name: "粉丝数",
            type: "line",
            stack: "总量",
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
    };
  },
  mounted() {
    let myChart = this.$echarts.init(this.$refs.my_echarts);
    myChart.setOption(this.option);
  }
};
</script>

<style>
.date-picker {
  margin-left: 20px;
}
.my-el-row {
  margin-top: 20px;
}
.my-el-card {
  text-align: center;
}
.my-el-card i {
  font-size: 50px;
}
.span-wrap {
  display: flex;
  flex-direction: column;
  /* text-align: left */
}
.firstSpan {
  font-size: 25px;
}
.my_echarts {
  width: 100%;
  height: 500px;
  margin-top: 20px;
}
</style>