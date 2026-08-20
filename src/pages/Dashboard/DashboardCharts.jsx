import { motion } from "framer-motion";
import {
  TrendingUp,
  BarChart3,
} from "lucide-react";

function DashboardCharts() {
  return (
    <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">

  {/* ================= Placement Trend ================= */}

  <motion.div
    initial={{ opacity: 0, y: 25 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    className="rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-2xl p-7 relative overflow-hidden"
  >
    <div className="absolute -right-20 -bottom-20 h-56 w-56 rounded-full bg-green-500/10 blur-[120px]" />

    <div className="relative">

      <div className="flex items-center justify-between">

        <div>

          <h2 className="text-xl font-bold text-white">
            Placement Trend
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            AI Prediction
          </p>

        </div>

        <span className="rounded-full bg-green-500/10 px-4 py-2 text-green-400 text-sm font-semibold">
          +18%
        </span>

      </div>

      <div className="mt-10 flex items-end justify-between h-56">

        {[20, 35, 42, 60, 74, 88].map((v, i) => (

          <div
            key={i}
            className="flex flex-col items-center"
          >

            <motion.div
              initial={{ height: 0 }}
              animate={{ height: `${v}%` }}
              transition={{
                duration: 1,
                delay: i * .12,
              }}
              className="w-8 rounded-full bg-gradient-to-t from-green-500 to-emerald-400"
            />

            <span className="mt-3 text-xs text-slate-500">
              {["Jan","Feb","Mar","Apr","May","Jun"][i]}
            </span>

          </div>

        ))}

      </div>

    </div>

  </motion.div>

  {/* ================= Recent Applications ================= */}

  <motion.div
    initial={{ opacity: 0, y: 25 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: .1 }}
    className="rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-2xl p-7"
  >

    <h2 className="text-xl font-bold text-white">
      Recent Applications
    </h2>

    <p className="mt-1 text-sm text-slate-400">
      Latest Activity
    </p>

    <div className="mt-8 space-y-5">

      {[
        {
          company: "Google",
          role: "Frontend Intern",
          status: "Applied",
          color: "text-yellow-400",
        },
        {
          company: "Microsoft",
          role: "Software Intern",
          status: "Interview",
          color: "text-cyan-400",
        },
        {
          company: "Amazon",
          role: "SDE Intern",
          status: "Shortlisted",
          color: "text-green-400",
        },
        {
          company: "Adobe",
          role: "UI Developer",
          status: "Pending",
          color: "text-slate-400",
        },
      ].map((item, index) => (

        <div
          key={index}
          className="flex items-center justify-between rounded-2xl bg-slate-900/60 border border-white/10 p-5"
        >

          <div>

            <h3 className="font-semibold text-white">
              {item.company}
            </h3>

            <p className="text-sm text-slate-400">
              {item.role}
            </p>

          </div>

          <span className={`font-semibold ${item.color}`}>
            {item.status}
          </span>

        </div>

      ))}

    </div>

  </motion.div>

</section>

  );
}

export default DashboardCharts;