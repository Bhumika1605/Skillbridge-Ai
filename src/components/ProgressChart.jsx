import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const data = [
  { month: "Jan", score: 60 },
  { month: "Feb", score: 68 },
  { month: "Mar", score: 74 },
  { month: "Apr", score: 82 },
  { month: "May", score: 88 },
  { month: "Jun", score: 92 },
];

function ProgressChart() {
  return (
    <div className="bg-slate-800 rounded-2xl p-6 h-96">

      <h2 className="text-white text-xl font-bold mb-6">
        Resume Progress
      </h2>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data}>

          <CartesianGrid stroke="#334155" />

          <XAxis
            dataKey="month"
            stroke="#94A3B8"
          />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="score"
            stroke="#06B6D4"
            strokeWidth={4}
          />

        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}

export default ProgressChart;