import { motion } from "framer-motion";
import {
  BrainCircuit,
  Lightbulb,
  CheckCircle2,
  Trophy,
  ArrowRight,
} from "lucide-react";

function DashboardBottom() {
  return (
    <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">

      {/* ================= AI Insights ================= */}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .6 }}
        className="
          rounded-[30px]
          border
          border-white/10
          bg-white/5
          backdrop-blur-2xl
          p-7
          relative
          overflow-hidden
        "
      >

        <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="relative">

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/10">

              <BrainCircuit
                className="text-cyan-400"
                size={28}
              />

            </div>

            <div>

              <h2 className="text-2xl font-bold text-white">
                AI Insights
              </h2>

              <p className="text-slate-400">
                Personalized Recommendations
              </p>

            </div>

          </div>

          <div className="mt-8 space-y-5">

            {[
              "Improve Communication skills to increase interview performance.",
              "Build one React portfolio project this week.",
              "Practice DSA for at least 30 minutes daily.",
              "Optimize your resume for ATS keywords.",
            ].map((item, index) => (

              <div
                key={index}
                className="flex items-start gap-4 rounded-2xl border border-white/10 bg-slate-900/50 p-5"
              >

                <Lightbulb
                  className="mt-1 text-yellow-400"
                  size={20}
                />

                <p className="leading-7 text-slate-300">
                  {item}
                </p>

              </div>

            ))}

          </div>

        </div>

      </motion.div>

      {/* ================= Learning Roadmap ================= */}

      <motion.div
        initial={{ opacity:0,y:25 }}
        animate={{ opacity:1,y:0 }}
        transition={{ duration:.6,delay:.1 }}
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
          Learning Roadmap
        </h2>

        <p className="mt-1 text-slate-400">
          Your Next Milestones
        </p>

        <div className="mt-8 space-y-5">

          {[
            {
              step:"01",
              title:"Master React",
              status:"Completed",
            },
            {
              step:"02",
              title:"Improve DSA",
              status:"In Progress",
            },
            {
              step:"03",
              title:"Build Portfolio",
              status:"Pending",
            },
            {
              step:"04",
              title:"Mock Interviews",
              status:"Pending",
            },
          ].map((item,index)=>(

            <div
              key={index}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/60 p-5"
            >

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/10">

                  <span className="font-bold text-cyan-400">
                    {item.step}
                  </span>

                </div>

                <div>

                  <h3 className="font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="text-sm text-slate-400">
                    {item.status}
                  </p>

                </div>

              </div>

              <ArrowRight
                className="text-slate-500"
                size={18}
              />

            </div>

          ))}

        </div>

      </motion.div>

    </section>
  );
}

{/* ================= SECOND ROW ================= */}

<section className="mt-6 grid grid-cols-1 xl:grid-cols-2 gap-6">

  {/* ================= Recent Achievements ================= */}

  <motion.div
    initial={{ opacity: 0, y: 25 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: .6 }}
    className="
      rounded-[30px]
      border
      border-white/10
      bg-white/5
      backdrop-blur-2xl
      p-7
      relative
      overflow-hidden
    "
  >

    <div className="absolute -left-20 -bottom-20 h-56 w-56 rounded-full bg-yellow-500/10 blur-[120px]" />

    <div className="relative">

      <div className="flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-500/10">

          <Trophy
            className="text-yellow-400"
            size={28}
          />

        </div>

        <div>

          <h2 className="text-2xl font-bold text-white">
            Achievements
          </h2>

          <p className="text-slate-400">
            Your latest milestones
          </p>

        </div>

      </div>

      <div className="mt-8 space-y-5">

        {[
          "Resume Score reached 89%",
          "Completed React Roadmap",
          "5 Day Learning Streak",
          "Portfolio Uploaded",
        ].map((item, index) => (

          <div
            key={index}
            className="
              flex
              items-center
              gap-4
              rounded-2xl
              border
              border-white/10
              bg-slate-900/60
              p-5
            "
          >

            <CheckCircle2
              size={22}
              className="text-green-400"
            />

            <span className="text-slate-300">
              {item}
            </span>

          </div>

        ))}

      </div>

    </div>

  </motion.div>

  {/* ================= Career Goals ================= */}

  <motion.div
    initial={{ opacity: 0, y: 25 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: .6, delay: .1 }}
    className="
      rounded-[30px]
      border
      border-white/10
      bg-white/5
      backdrop-blur-2xl
      p-7
      relative
      overflow-hidden
    "
  >

    <div className="absolute -right-20 top-0 h-56 w-56 rounded-full bg-cyan-500/10 blur-[120px]" />

    <div className="relative">

      <h2 className="text-2xl font-bold text-white">
        Career Goals
      </h2>

      <p className="mt-1 text-slate-400">
        Weekly Targets
      </p>

      <div className="mt-8 space-y-6">

        {[
          {
            title: "Complete React Project",
            progress: 85,
          },
          {
            title: "Practice DSA",
            progress: 60,
          },
          {
            title: "Improve Communication",
            progress: 45,
          },
          {
            title: "Apply for Internships",
            progress: 70,
          },
        ].map((goal, index) => (

          <div key={index}>

            <div className="mb-3 flex justify-between">

              <span className="font-medium text-white">
                {goal.title}
              </span>

              <span className="text-cyan-400">
                {goal.progress}%
              </span>

            </div>

            <div className="h-3 overflow-hidden rounded-full bg-slate-800">

              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${goal.progress}%`,
                }}
                transition={{
                  duration: 1,
                  delay: index * .15,
                }}
                className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600"
              />

            </div>

          </div>

        ))}

      </div>

    </div>

  </motion.div>

</section>

export default DashboardBottom;