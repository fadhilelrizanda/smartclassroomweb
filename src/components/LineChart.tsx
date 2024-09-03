import React from "react";
import { Line } from "react-chartjs-2";

// Function to generate a random color
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

interface LineChartProps {
  data: any;
  label: any;
  xtitle: string;
  title: string;
}

const LineChart: React.FC<LineChartProps> = ({
  data,
  label,
  xtitle,
  title,
}) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
    scales: {
      y: {
        title: {
          display: true,
          text: xtitle,
        },
      },
    },
  };

  const dataChart = {
    labels: label,
    datasets: [
      {
        label: title,
        data: data,
        borderColor: getRandomColor(), // Use random color here
        backgroundColor: "rgb(240, 255, 240)",
        tension: 0.3,
      },
    ],
  };

  return <Line data={dataChart} options={options} />;
};

export default LineChart;
