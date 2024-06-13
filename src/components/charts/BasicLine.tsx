import HC_exporting from "highcharts/modules/exporting";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const BasicLineChart = ({ title, subtitle, data }: any) => {
  HC_exporting(Highcharts);

  const options = {
    accessibility: { enabled: false },
    // chart: {
    //   scrollablePlotArea: {
    //     minWidth: 700,
    //   },
    // },

    title: {
      text: title,
    },

    subtitle: {
      text: subtitle,
    },

    yAxis: {
      title: {
        text: "Number of Employees",
      },
    },

    xAxis: {
      accessibility: {
        rangeDescription: "Range: 2010 to 2017",
      },
    },

    // legend: {
    //   layout: 'vertical',
    //   align: 'left',
    //   verticalAlign: 'top',
    //   borderWidth: 0,
    // },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        pointStart: 2010,
      },
    },

    series: data,

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          // chartOptions: {
          //   legend: {
          //     layout: 'horizontal',
          //     align: 'center',
          //     verticalAlign: 'bottom',
          //   },
          // },
        },
      ],
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default BasicLineChart;
