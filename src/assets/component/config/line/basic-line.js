export default {
  name:'基础折线图',
  show: true,
  lock: true,
  yAxis: {
      name: "",
      nameTextStyle: {
        fontSize: 12,
        color: "#f1f1f1",
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: "#f1f1f1",
          width: 1,
        },
      },
      axisTick: {
        show: true,
        lineStyle: {
          color: "#f1f1f1",
          width: 1,
        },
      },
      axisLabel: {
        show: true,
        color: "#f1f1f1",
        fontSize: 12,
      },
      splitLine: {
        show: false,
        lineStyle: {
          color: "#f1f1f1",
          width: 1,
        },
      },
    },
    series: {
      name: "",
      type: "line",
      gradual: true, //是否渐变色
      gradualColor: ["#5171fd", "#c97afd"], //渐变颜色
      color: "#5171fd", //非渐变色颜色
      orient: "vertical",
      smooth: true, //是否平滑显示
      showSymbol: true, //是否显示图标
      symbolSize: 6, //图标大小
      label: {
        show: false,
        color: "#f1f1f1",
        fontSize: 12,
        position: "outside",
      },
      itemStyle: {
        color: "#5171fd",
        borderColor: "#fff",
      },
      areaStyle: {
        show: false,
        gradualColor: ["#5171fd", "rgba(127,153,255,0.1)"],
      },
      lineWidth: 2,
    },
    data: [
      {
        name: "星期一",
        value: "60",
        id: 0,
      },
      {
        name: "星期二",
        value: "100",
        id: 1,
      },
      {
        name: "星期三",
        value: "140",
        id: 2,
      },
      {
        name: "星期四",
        value: "80",
        id: 3,
      },
    ],
  };
  