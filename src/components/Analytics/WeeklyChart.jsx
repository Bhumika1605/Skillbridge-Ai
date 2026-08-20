import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

function WeeklyChart() {
  const data = {
    labels: [
      "Week 1",
      "Week 2",
      "Week 3",
      "Week 4",
      "Week 5",
      "Week 6",
    ],
    datasets: [
      {
        label: "Career Progress",
        data: [20, 35, 48, 60, 78, 91],
        borderColor: "#22d3ee",
        backgroundColor: "rgba(34,211,238,0.2)",
        tension: 0.4,
        fill: true,
        pointRadius: 5,
        pointBackgroundColor: "#22d3ee",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "#ffffff",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "#94a3b8",
        },
        grid: {
          color: "#334155",
        },
      },
      y: {
        ticks: {
          color: "#94a3b8",
        },
        grid: {
          color: "#334155",
        },
      },
    },
  };

  return (
    <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">

      <h2 className="text-2xl font-bold text-white mb-6">
        Weekly Progress
      </h2>

      <Line data={data} options={options} />

    </div>
  );
}

export default WeeklyChart;