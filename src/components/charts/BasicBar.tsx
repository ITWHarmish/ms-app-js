import React, { useEffect } from "react";

import HC_exporting from "highcharts/modules/exporting";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

export type IBasicBarChart = {
  title: string;
  subtitle: string;
  category: Array<string>;
  series: Array<Object>;
};

const BasicBarChart = ({
  title,
  subtitle,
  category,
  series,
}: IBasicBarChart) => {
  const chart: any = React.createRef();

  HC_exporting(Highcharts);

  const options = {
    accessibility: { enabled: false },
    chart: {
      type: "bar",
      load() {
        this.showLoading();
        setTimeout(this.hideLoading.bind(this), 2000);
      },
    },
    title: {
      text: title,
    },
    subtitle: {
      text: subtitle,
    },
    xAxis: {
      categories: category,
      title: {
        text: null,
      },
      crosshair: true,
    },
    yAxis: {
      min: 0,
      title: {
        text: "Hours",
        align: "high",
      },
      labels: {
        overflow: "justify",
      },
    },
    legend: {
      layout: "vertical",
      align: "right",
      verticalAlign: "top",
      floating: true,
      borderWidth: 1,
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || "#FFFFFF",
      shadow: true,
    },
    tooltip: {
      valueSuffix: " Hours",
    },
    plotOptions: {
      bar: {
        dataLabels: {
          enabled: true,
        },
      },
    },
    credits: {
      enabled: false,
    },
    series: series,
  };

  useEffect(() => {
    const chartObj = chart.current.chart;
    chartObj.showLoading();
    setTimeout(() => chartObj.hideLoading(), 2000);
  }, [chart]);

  return (
    <HighchartsReact highcharts={Highcharts} options={options} ref={chart} />
  );
};

export default BasicBarChart;
