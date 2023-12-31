export default {
  width: 300,
  height: 300,
  left: 0,
  top: 0,
  name: "玫瑰图",
  show: true,
  lock: true,
  // 标题
  // 标题
  title: {
    show: false,
    text: "",
    textAlign: "center",
    textStyle: {
      color: "#f1f1f1",
      fontSize: 16,
      titletText: '',
      titleColor: "#f1f1f1",
      titleFontSize: 16,
      totalColor: "#f1f1f1",
      totalFontSize: 16,
      unitText: "个",
      unitcColor: "#f1f1f1",
      unitFontSize: 16,
      // unit: {
      //   text: "个",
      //   color: "#f1f1f1",
      //   fontSize: 16,
      // },
    },
    left: "",
    top: "",
  },
  //图例
  legend: {
    show: false,
    textStyle: {
      color: "#f1f1f1",
      fontSize: 16,
    },
    width: 80,
    height: 20,
    itemGap: 10,
    backgroundColor: "rgba(108, 128, 151, 0.1)",
    padding: "5, 5, 5, 5",
    left: 0,
    top: 10,
    icon: "circle",
    orient: "horizontal",
    scroll: false,
    unit: "个",
    unitColor: "#99B3C8",
    unitFontSize: "14",
    totalColor: "#ffffff",
    totalFontSize: 14,
  },
  series: {
    name: "",
    type: "pie",
    center: ["48%", "55%"],
    radius: ["35%", "53%"],
    solidRadius: "53%",
    solid: true,
    label: {
      show: true,
      color: "",
      fontSize: 14,
      position: "outside",
    },
    roseType: true,
    smooth: false,
    labelLine: {
      show: true,
      length: 15,
      length2: 10,
    },
  },
  data: [
    {
      name: "Vue",
      value: 75,
      id: 0,
    },
    {
      name: "Echarts",
      value: 85,
      id: 1,
    },
    {
      name: "TypeScript",
      value: 70,
      id: 2,
    },
    {
      name: "Webpack",
      value: 75,
      id: 3,
    },
    {
      name: "Node",
      value: 45,
      id: 4,
    },
    {
      name: "jQuery",
      value: 65,
      id: 5,
    },
  ],
};
