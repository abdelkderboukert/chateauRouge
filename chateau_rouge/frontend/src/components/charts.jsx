import React, { useMemo } from "react";
import Chart from "react-apexcharts";

const Charts = (props) => {
  const data1 = props.data1.map((value) => parseInt(value));
  console.log(data1, props.categories);
  const state = useMemo(
    () => ({
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
        title: {
          display: true,
          text: props.title,
          fontcolor: "red",
        },
      },
    }),
    [props.categories, data1, props.title]
  );
  const id = props.id;
  return (
    <>
      <div id={`chart-${id}`}
      style={{
        background:"#F0F8FF",
        borderRadius :"20px",
        margin : "5px"
        }}>
        <Chart
          options={state.options}
          series={state.series}
          type="area"
          height={350}
          width={"223%"}
        />
      </div>
      <div id={`html-dist-${id}`}></div>
    </>
  );
};

export default Charts;
