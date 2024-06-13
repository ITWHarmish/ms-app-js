import HC_exporting from "highcharts/modules/exporting";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const BasicColumnChart = ({
  title,
  subtitle,
  data,
  categories,
  xTitle,
  yTitle,
}: any) => {
  HC_exporting(Highcharts);

  const options = {
    accessibility: { enabled: false },
    chart: {
      type: "column",
    },
    colors:["#1890ff","#515253"],
    title: {
      text: title,
    },
    subtitle: {
      text: subtitle,
    },
    xAxis: {
      categories: categories,
      crosshair: true,
      title: {
        text: xTitle,
      },
    },
    yAxis: {
      min: 0,
      title: {
        text: yTitle,
      },
    },
    tooltip: {
      headerFormat: "<span style=\"font-size:12px\">{point.key}</span><table>",
      pointFormat:
        "<tr><td style=\"color:{series.color};padding:0\">{series.name}: </td>" +
        "<td style=\"padding:0\"><b>{point.y} " +
        yTitle +
        "</b></td></tr>",
      footerFormat: "</table>",
      valueDecimals: 2,
      borderRadius:15,
      shared: true,
      useHTML: true,
    },
    plotOptions: {
      series: {
        pointWidth: 22,
      },
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
      },
    },
    series: data,
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default BasicColumnChart;
