import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function SkillChart() {
  const data = {
    labels: [
      "Frontend",
      "Backend",
      "AI / ML",
      "Database",
      "Cloud",
    ],
    datasets: [
      {
        data: [40, 20, 15, 15, 10],
        backgroundColor: [
          "#06b6d4",
          "#10b981",
          "#8b5cf6",
          "#f59e0b",
          "#ef4444",
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "#ffffff",
          padding: 20,
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">

      <h2 className="text-2xl font-bold text-white mb-6">
        Skill Distribution
      </h2>

      <div className="max-w-sm mx-auto">
        <Doughnut
          data={data}
          options={options}
        />
      </div>

    </div>
  );
}

export default SkillChart;