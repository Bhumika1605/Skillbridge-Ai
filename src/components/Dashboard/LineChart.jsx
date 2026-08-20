import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
);

const data = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],

  datasets: [
    {
      label: "Career Progress",

      data: [58, 64, 72, 78, 83, 90, 94],

      borderColor: "#06b6d4",

      backgroundColor: "rgba(6,182,212,0.15)",

      fill: true,

      tension: 0.4,

      pointRadius: 5,

      pointHoverRadius: 8,

      pointBackgroundColor: "#22d3ee",
    },
  ],
};

const options = {
  responsive: true,

  plugins: {
    legend: {
      display: false,
    },
  },

  scales: {
    x: {
      ticks: {
        color: "#94a3b8",
      },

      grid: {
        display: false,
      },
    },

    y: {
      ticks: {
        color: "#94a3b8",
      },

      grid: {
        color: "#334155",
      },

      min: 40,

      max: 100,
    },
  },
};

function LineChart() {
  return <Line data={data} options={options} />;
}

export default LineChart;