import { motion } from "framer-motion";

import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

const progressData = [
  { month: "Jan", score: 52 },
  { month: "Feb", score: 61 },
  { month: "Mar", score: 70 },
  { month: "Apr", score: 76 },
  { month: "May", score: 84 },
  { month: "Jun", score: 92 },
];

const skillData = [
  { name: "Frontend", value: 35 },
  { name: "Programming", value: 25 },
  { name: "Communication", value: 15 },
  { name: "Problem Solving", value: 15 },
  { name: "Others", value: 10 },
];

const COLORS = [
  "#06B6D4",
  "#3B82F6",
  "#8B5CF6",
  "#22C55E",
  "#F59E0B",
];

function DashboardAnalytics() {
  return (
    <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">

      {/* Left Chart */}

      <motion.div
        whileHover={{ y: -5 }}
        className="
          xl:col-span-2
          rounded-[30px]
          border
          border-white/10
          bg-white/5
          backdrop-blur-2xl
          p-7
        "
      >

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold text-white">
              Career Progress
            </h2>

            <p className="mt-1 text-slate-400">
              Performance over the last 6 months
            </p>

          </div>

          <button
            className="
              rounded-xl
              border
              border-white/10
              bg-slate-900/70
              px-4
              py-2
              text-sm
              text-slate-300
            "
          >
            Last 6 Months
          </button>

        </div>

        {/* Chart Placeholder */}

        <div
          className="
            mt-10
            flex
            h-[320px]
            items-center
            justify-center
            rounded-3xl
            border
            border-dashed
            border-slate-700
            bg-slate-900/40
          "
        >

          <ResponsiveContainer width="100%" height="100%">

<LineChart data={progressData}>

<CartesianGrid
stroke="#334155"
strokeDasharray="3 3"
/>

<XAxis
dataKey="month"
stroke="#94A3B8"
/>

<YAxis
stroke="#94A3B8"
/>

<Tooltip />

<Line
type="monotone"
dataKey="score"
stroke="#06B6D4"
strokeWidth={4}
dot={{
r:6,
fill:"#06B6D4"
}}
activeDot={{
r:8
}}
/>

</LineChart>

</ResponsiveContainer>

        </div>

      </motion.div>

      {/* Right */}

      <motion.div
        whileHover={{ y: -5 }}
        className="
          rounded-[30px]
          border
          border-white/10
          bg-white/5
          backdrop-blur-2xl
          p-7
        "
      >

        <h2 className="text-2xl font-bold text-white">
          Skill Distribution
        </h2>

        <p className="mt-1 text-slate-400">
          Current strengths
        </p>

        <div
          className="
            mt-10
            flex
            h-[320px]
            items-center
            justify-center
            rounded-3xl
            border
            border-dashed
            border-slate-700
            bg-slate-900/40
          "
        >

          <ResponsiveContainer width="100%" height="100%">

<PieChart>

<Pie
data={skillData}
cx="50%"
cy="50%"
innerRadius={60}
outerRadius={95}
paddingAngle={4}
dataKey="value"
>

{skillData.map((entry,index)=>(
<Cell
key={index}
fill={COLORS[index]}
/>
))}

</Pie>

<Tooltip/>

</PieChart>

</ResponsiveContainer>

        </div>

      </motion.div>

    </section>
  );
}

export default DashboardAnalytics;