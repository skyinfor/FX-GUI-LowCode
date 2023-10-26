/**
 * 公共图表配置
 * Created by Lzy on 2021/6/8.
 */
import echarts from "echarts";

export default function defaultSetting(config) {
  let option = [];

  switch (config.series.type) {
    case "customLegendPie":
      option = getCustomLegendPieOption(config);
      break;
    default:
      break;
  }
  return option;
}

function getTitle(config) {
  return config.title;
}

function getLegend(config) {
  const { scroll, ...rest } = config.legend;
  return {
    type: scroll ? "scroll" : "plain",
    ...rest,
  };
}

function getGrid(config) {
  return config.grid;
}

function getXAxis(config) {
  const { axisLine, axisTick, axisLabel, splitLine } = config.xAxis;
  const { data } = config;
  const { orient } = config.series;
  const { interval, ...rest } = axisLabel;
  return {
    type: orient == "vertical" ? "category" : "value",
    data: orient == "vertical" ? data.map((item) => item.name) : [],
    axisLine,
    axisTick,
    axisLabel: { interval: interval ? 0 : "auto", ...rest },
    splitLine,
  };
}

function getYAxis(config) {
  const { orient } = config.series;
  const { data } = config;
  return {
    type: orient == "vertical" ? "value" : "category",
    data: orient == "vertical" ? [] : data.map((item) => item.name),
    ...config.yAxis,
  };
}

function getDataZoom(config) {
  const { dataZoom } = config;
  if (dataZoom.show) {
    return [
      {
        type: dataZoom.type,
      },
    ];
  }
  return [];
}

function getStackedBarData(config) {
  const newData = [];
  const valueList = config.data.map((item) => item.value);
  for (let index = 0; index < valueList.length; index++) {
    for (let i = 0; i < valueList[index].length; i++) {
      if (!newData[i]) {
        newData.push({
          ...config.series,
          data: [],
          zlevel: valueList[index].length - i,
        });
      }
      newData[i].data.push(valueList[index][i]);
    }
  }
  return newData;
}

function getBarOption(config) {
  const title = getTitle(config);
  const grid = getGrid(config);
  const legend = getLegend(config);
  const xAxis = getXAxis(config);
  const yAxis = getYAxis(config);
  // const dataZoom = getDataZoom(config);
  const { series, data } = config;
  const {
    name,
    type,
    orient,
    barWidth,
    barBorderRadius,
    gradual,
    gradualColor,
    color,
    label,
    stack,
  } = series;
  let seriesConfig = [
    {
      name,
      type,
      data: data,
      barWidth,
      label,
      stack,
      itemStyle: {
        normal: {
          barBorderRadius: parseInt(barBorderRadius),
          color: gradual
            ? new echarts.graphic.LinearGradient(
                0,
                0,
                orient == "vertical" ? 0 : 1,
                orient == "vertical" ? 1 : 0,
                [
                  {
                    offset: 0,
                    color: gradualColor[0],
                  },
                  {
                    offset: 1,
                    color: gradualColor[1],
                  },
                ]
              )
            : color,
        },
      },
    },
  ];

  if (stack) {
    seriesConfig = getStackedBarData(config);
  }
  console.log("seriesConfig::::::::::::::::", seriesConfig);
  return {
    title,
    legend,
    grid,
    xAxis,
    yAxis,
    // dataZoom,
    series: seriesConfig,
  };
}

function getStackedLineSeries(config) {
  console.log("config:::::::::::::::22", config);
  const seriesNew = config.series.map((item, index) => {
    const series = config.series[index]
    return {
      data: item,
      ...config.data[index],
    };
  });
  return seriesNew;
}

function getLineOption(config) {
  const title = getTitle(config);
  const grid = getGrid(config);
  const legend = getLegend(config);
  const xAxis = getXAxis(config);
  const yAxis = getYAxis(config);
  // const dataZoom = getDataZoom(config);

  const { series, data, component } = config;

  console.log("config::::::::::::::::", config, component);

  if (component === "stackedLine") {
    switch (component) {
      case "stackedLine":
        getStackedLineSeries(config);
        break;
      default:
        break;
    }
    return;
  }

  const {
    name,
    type,
    smooth,
    symbolSize,
    showSymbol,
    label,
    itemStyle,
    lineWidth,
    orient,
    gradual,
    gradualColor,
    color,
    areaStyle,
  } = series;

  let seriesConfig = [
    {
      name,
      type,
      data: data,
      smooth,
      symbol: "circle",
      showSymbol,
      symbolSize,
      label,
      itemStyle,
      lineStyle: {
        normal: {
          width: lineWidth,
          color: gradual
            ? new echarts.graphic.LinearGradient(
                0,
                0,
                orient == "vertical" ? 0 : 1,
                orient == "vertical" ? 1 : 0,
                [
                  {
                    offset: 0,
                    color: gradualColor[0],
                  },
                  {
                    offset: 1,
                    color: gradualColor[1],
                  },
                ]
              )
            : color,
        },
      },
    },
  ];
  if (areaStyle.show) {
    seriesConfig[0].areaStyle = {
      normal: {
        color: new echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            {
              offset: 0,
              color: areaStyle.gradualColor[0],
            },
            {
              offset: 1,
              color: areaStyle.gradualColor[1],
            },
          ],
          false
        ),
      },
    };
  }
  return {
    title,
    legend,
    grid,
    xAxis,
    yAxis,
    // dataZoom,
    series: seriesConfig,
  };
}

function getCustomLegendPieOption(config) {
  const title = getTitle(config);
  let legend = getLegend(config);
  const { series, data } = config;
  legend.data = data.map((item) => item.name);
  console.log("config:::::::::::::::::", config);
  let {
    name,
    type,
    center,
    radius,
    solidRadius,
    solid,
    label,
    labelLine,
    smooth,
    roseType,
  } = series;

  if (solid) {
    radius = solidRadius;
  }
  if (roseType) {
    roseType = "radius";
  }

  return {
    title,
    legend,
    series: [
      {
        name,
        type,
        icon: "circle",
        center,
        radius,
        roseType,
        data,
        label,
        labelLine: {
          normal: {
            show: labelLine.show,
            length: labelLine.length,
            length2: labelLine.length2,
            smooth,
          },
        },
      },
    ],
  };
}

function getLiquidOption(config) {
  const { data } = config;
  return {
    data: data.map((item) => item.value),
  };
}

function getGaugeOption(config) {
  const { data } = config;
  const title = getTitle(config);
  return {
    data: data[0].value,
    title,
  };
}

function getWordOption(config) {
  const { data } = config;
  const title = getTitle(config);
  return {
    data,
    title,
  };
}

function getRadarOption(config) {
  const { data } = config;
  const title = getTitle(config);
  return {
    keyData: Object.keys(data),
    data1: data["2019"],
    data2: data["2020"],
    title,
  };
}

function getTreeOption(config) {
  const { data } = config;
  const title = getTitle(config);
  return {
    data,
    title,
  };
}

function getPowerBarOption(config) {
  const { data } = config;
  const title = getTitle(config);
  const grid = getGrid(config);
  return {
    title,
    grid,
    data,
  };
}
