import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.gammel";
ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

const ChartComponent = ({ data }) => {
  const chartConfigs = {
    type: "column2d", // The chart type
    width: "100%", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      chart: {
        caption: "Most Popular",
        yAxisName: "Stars",
        xAxisName: "Repos",
        yAxisNameFontSize: "16px",
        xAxisNameFontSize: "16px",
        theme: "gammel",
      },
      data,
    },
  };
  return (
    <>
      <ReactFC {...chartConfigs} />
    </>
  );
};

export default ChartComponent;
