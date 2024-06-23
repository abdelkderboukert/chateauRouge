// import React, { useMemo } from "react";
// import Chart from "react-apexcharts";

// const Charts = (props) => {
//   const data1 = props.data1.map((value) => parseInt(value));
//   console.log(data1, props.categories);
//   const state = useMemo(
//     () => ({
//       series: [
//         {
//           name: "series1",
//           data: data1,
//         },
//       ],
//       options: {
//         chart: {
//           type: "area",
//         },
//         dataLabels: {
//           enabled: false,
//         },
//         grid: {
//           show: false, // <--- Add this
//         },
//         stroke: {
//           curve: "smooth",
//         },
//         xaxis: {
//           type: "datetime",
//           categories: props.categories,
//           // show: false, // <--- Add this
//         },
//         yaxis: {
//           // show: false, // <--- Add this
//         },
//         toolbar: {
//           show: false, // <--- Add this
//         },
//         tooltip: {
//           x: {
//             format: "dd/MM/yy HH:mm",
//           },
//         },
//         title: {
//           display: true,
//           text: props.title,
//         },
//         colors: ["#ffffff"],
//       },
//     }),
//     [props.categories, data1, props.title]
//   );
//   const id = props.id;
//   return (
//     <>
//       <div
//         id={`chart-${id}`}
//         style={{
//           //background: "#b4febe",
//           //background: "#F0F8FF",
//           background: "",
//           borderRadius: "20px",
//           margin: "5px",
//         }}
//       >
//         <Chart
//           options={state.options}
//           series={state.series}
//           type="area"
//           height={350}
//           width={"223%"}
//         />
//       </div>
//       <div id={`html-dist-${id}`}></div>
//     </>
//   );
// };

// export default Charts;
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
          fill: {
            type: "gradient",
            gradient: {
              shadeIntensity: 1,
              opacityFrom: 1,
              opacityTo: 0,
              stops: [
                {
                  offset: 0,
                  color: "#ffffff",
                  opacity: 1,
                },
                {
                  offset: 100,
                  color: "#ffffff",
                  opacity: 0,
                },
              ],
            },
          },
        },
      ],
      options: {
        chart: {
          type: "area",
        },
        dataLabels: {
          enabled: false,
        },
        grid: {
          show: false,
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          type: "datetime",
          categories: props.categories,
        },
        yaxis: {
          // show: false,
        },
        toolbar: {
          show: false,
        },
        tooltip: {
          x: {
            format: "dd/MM/yy HH:mm",
          },
        },
        title: {
          display: true,
          text: props.title,
        },
        colors: ["#ffffff"],
      },
    }),
    [props.categories, data1, props.title]
  );
  const id = props.id;
  return (
    <>
      <div
        id={`chart-${id}`}
        style={{
          background: "",
          borderRadius: "20px",
          margin: "5px",
        }}
      >
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
