import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", score: 55 },
  { month: "Feb", score: 63 },
  { month: "Mar", score: 70 },
  { month: "Apr", score: 78 },
  { month: "May", score: 85 },
  { month: "Jun", score: 92 },
];

function CareerChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        mt-8
        rounded-[32px]
        border
        border-white/10
        bg-white/5
        backdrop-blur-2xl
        p-6
      "
    >
      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-2xl font-bold text-white">
            Career Growth
          </h2>

          <p className="mt-1 text-slate-400">
            AI performance tracking
          </p>

        </div>

        <span className="rounded-xl bg-cyan-500/10 px-4 py-2 text-cyan-400 text-sm">
          Last 6 Months
        </span>

      </div>

      <div className="mt-8 h-[300px]">

        <ResponsiveContainer width="100%" height="100%">

          <AreaChart data={data}>

            <defs>

              <linearGradient
                id="careerFill"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >

                <stop
                  offset="0%"
                  stopColor="#22D3EE"
                  stopOpacity={0.7}
                />

                <stop
                  offset="100%"
                  stopColor="#22D3EE"
                  stopOpacity={0}
                />

              </linearGradient>

            </defs>

            <CartesianGrid
              stroke="#1E293B"
              strokeDasharray="4 4"
            />

            <XAxis
              dataKey="month"
              stroke="#94A3B8"
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              contentStyle={{
                background: "#0F172A",
                border: "1px solid #334155",
                borderRadius: "16px",
                color: "#fff",
              }}
            />

            <Area
              type="monotone"
              dataKey="score"
              stroke="#22D3EE"
              strokeWidth={4}
              fill="url(#careerFill)"
            />

          </AreaChart>

        </ResponsiveContainer>

      </div>

    </motion.div>
  );
}

export default CareerChart;