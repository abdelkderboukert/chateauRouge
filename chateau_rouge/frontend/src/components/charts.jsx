import React, { useState } from "react";
import Chart from "react-apexcharts";

const Charts = (props) => {
  // console.log(props)
  const data1 = props.data1.map((value) => parseInt(value));
  const [state, setstate] = useState({
    series: [
      {
        name: "series1",
        data: data1,
      },
    ],
    options: {
      chart: {
        type: "area",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: props.categories,
        // [
        //   "2018-09-19T00:00:00.000Z",
        //   "2018-09-19T01:30:00.000Z",
        //   "2018-09-19T02:30:00.000Z",
        //   "2018-09-19T03:30:00.000Z",
        //   "2018-09-19T04:30:00.000Z",
        //   "2018-09-19T05:30:00.000Z",
        //   "2018-09-20T06:30:00.000Z",
        // ],
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
    },
  });
  const id = props.id;
  return (
    <>
      <div id={`chart-${id}`}>
        <Chart
          options={state.options}
          series={state.series}
          type="area"
          height={350}
          width={500}
        />
      </div>
      <div id={`html-dist-${id}`}></div>
    </>
  );
};

export default Charts;
