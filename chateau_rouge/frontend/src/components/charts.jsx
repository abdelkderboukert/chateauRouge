import React, { useState } from "react";
import Chart from "react-apexcharts";

const Charts = () => {
  const [state, setstate] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [
          1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2002,
          2003, 2004, 1995, 2006, 2007, 2008, 2009,
        ],
      },
      stroke: {
        curve: "smooth",
      },
    },
    series: [
      {
        type: "line",
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91, 30, 40, 45, 50, 49, 60, 70, 91],
      },
      {
        type: "line",
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 78, 91, 30, 40, 55, 50, 47, 60, 70, 91],
      },
    ],
    title: {
      text: "Ajax Example",
    },
    noData: {
      text: "Loading...",
    },
  });
  return (
    <div>
      <Chart
      options={state.options}
      series={state.series}
      width="500"
        // type=""
      />
    </div>
  );
};

export default Charts;
