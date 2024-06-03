import React, { useState } from "react";
import Chart from "react-apexcharts";

const Charts = (props) => {
  const data1 = props.data1.map((value) => parseInt(value));
  const [state] = useState({
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
          width={"250%"}
        />
      </div>
      <div id={`html-dist-${id}`}></div>
    </>
  );
};

export default Charts;
