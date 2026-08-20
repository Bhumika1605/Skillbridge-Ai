import { motion } from "framer-motion";
import {
  Bot,
  Sparkles,
  Circle,
  ArrowRight,
} from "lucide-react";

function AIPanel() {
  return (
    <div className="space-y-6">

      {/* ================= AI COACH ================= */}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: .6 }}
        className="
          relative
          overflow-hidden
          rounded-[30px]
          border
          border-white/10
          bg-white/5
          backdrop-blur-2xl
          p-7
        "
      >

        {/* Glow */}

        <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="relative">

          {/* AI Avatar */}

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-4">

              <div className="relative">

                <div
                  className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-3xl
                  bg-gradient-to-br
                  from-cyan-400
                  via-sky-500
                  to-blue-600
                  shadow-xl
                  shadow-cyan-500/30
                "
                >

                  <Bot
                    size={30}
                    className="text-white"
                  />

                </div>

                <span
                  className="
                  absolute
                  -bottom-1
                  -right-1
                  flex
                  h-5
                  w-5
                  items-center
                  justify-center
                  rounded-full
                  bg-green-500
                  border-2
                  border-[#0B1220]
                "
                >
                  <Circle
                    size={8}
                    fill="white"
                    className="text-white"
                  />
                </span>

              </div>

              <div>

                <h2 className="text-xl font-bold text-white">
                  AI Career Coach
                </h2>

                <p className="text-sm text-cyan-400">
                  Online • Ready to Assist
                </p>

              </div>

            </div>

          </div>

          {/* Greeting */}

          <div className="mt-8">

            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2">

              <Sparkles
                size={16}
                className="text-cyan-400"
              />

              <span className="text-sm font-medium text-cyan-300">
                Personalized AI Guidance
              </span>

            </div>

            <h3 className="mt-6 text-3xl font-bold leading-tight text-white">

              Hello Bhumika 👋

            </h3>

            <p className="mt-4 leading-7 text-slate-400">

              I'm ready to help you improve your resume,
              discover internships, build new skills,
              prepare for interviews and guide your career.

            </p>

          </div>

          {/* CTA */}

          <button
            className="
              mt-8
              flex
              w-full
              items-center
              justify-center
              gap-3
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              py-4
              font-semibold
              text-white
              transition
              duration-300
              hover:scale-[1.02]
              hover:shadow-xl
              hover:shadow-cyan-500/30
            "
          >

            Start AI Conversation

            <ArrowRight size={18} />

          </button>

        </div>

      </motion.div>

      {/* ================= Suggested AI Prompts ================= */}

<motion.div
  initial={{ opacity: 0, y: 25 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.15 }}
  className="
    rounded-[30px]
    border
    border-white/10
    bg-white/5
    backdrop-blur-2xl
    p-7
  "
>
  <h2 className="text-xl font-bold text-white">
    AI Suggestions
  </h2>

  <p className="mt-1 text-sm text-slate-400">
    Ask AI instantly
  </p>

  <div className="mt-6 space-y-4">

    {[
      "Analyze my resume",
      "Recommend internships",
      "Generate interview questions",
      "Improve communication skills",
    ].map((item, index) => (

      <button
        key={index}
        className="
          w-full
          rounded-2xl
          border
          border-white/10
          bg-slate-900/60
          px-5
          py-4
          text-left
          text-slate-300
          transition-all
          duration-300
          hover:border-cyan-400/30
          hover:bg-cyan-500/10
          hover:text-white
        "
      >
        {item}
      </button>

    ))}

  </div>

</motion.div>

{/* ================= Quick Actions ================= */}

<motion.div
  initial={{ opacity: 0, y: 25 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.25 }}
  className="
    rounded-[30px]
    border
    border-white/10
    bg-white/5
    backdrop-blur-2xl
    p-7
  "
>

  <h2 className="text-xl font-bold text-white">
    Quick Actions
  </h2>

  <div className="mt-6 grid grid-cols-2 gap-4">

    {[
      "Upload Resume",
      "Analyze Resume",
      "Skill Gap",
      "Career Roadmap",
    ].map((item, index) => (

      <button
        key={index}
        className="
          rounded-2xl
          bg-slate-900/60
          border
          border-white/10
          py-5
          font-medium
          text-slate-300
          transition-all
          duration-300
          hover:border-cyan-400/30
          hover:bg-cyan-500/10
          hover:text-white
        "
      >
        {item}
      </button>

    ))}

  </div>

</motion.div>

{/* ================= Today's Goals ================= */}

<motion.div
  initial={{ opacity: 0, y: 25 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.35 }}
  className="
    rounded-[30px]
    border
    border-white/10
    bg-white/5
    backdrop-blur-2xl
    p-7
  "
>

  <h2 className="text-xl font-bold text-white">
    Today's Goals
  </h2>

  <p className="mt-1 text-sm text-slate-400">
    Stay consistent every day
  </p>

  <div className="mt-6 space-y-5">

    {[
      {
        task: "Complete Resume Analysis",
        done: true,
      },
      {
        task: "Practice DSA (30 min)",
        done: true,
      },
      {
        task: "Improve Communication",
        done: false,
      },
      {
        task: "Apply for 2 Internships",
        done: false,
      },
    ].map((goal, index) => (

      <div
        key={index}
        className="flex items-center gap-4"
      >

        <div
          className={`
            h-6
            w-6
            rounded-full
            flex
            items-center
            justify-center
            border

            ${
              goal.done
                ? "bg-green-500 border-green-500"
                : "border-slate-500"
            }
          `}
        >

          {goal.done && (
            <CheckCircle2
              size={15}
              className="text-white"
            />
          )}

        </div>

        <span
          className={`
            ${
              goal.done
                ? "text-white"
                : "text-slate-400"
            }
          `}
        >
          {goal.task}
        </span>

      </div>

    ))}

  </div>

</motion.div>

{/* ================= Daily Progress ================= */}

<motion.div
  initial={{ opacity: 0, y: 25 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, delay: 0.45 }}
  className="
    rounded-[30px]
    border
    border-white/10
    bg-gradient-to-br
    from-cyan-500/10
    to-blue-600/10
    backdrop-blur-2xl
    p-7
  "
>

  <div className="flex items-center justify-between">

    <div>

      <h2 className="text-xl font-bold text-white">
        Today's Progress
      </h2>

      <p className="text-slate-400">
        3 of 5 Tasks Completed
      </p>

    </div>

    <div className="text-right">

      <h2 className="text-4xl font-black text-cyan-400">
        68%
      </h2>

    </div>

  </div>

  <div className="mt-8">

    <div className="h-4 overflow-hidden rounded-full bg-slate-800">

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: "68%" }}
        transition={{ duration: 1.5 }}
        className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-sky-500 to-blue-600"
      />

    </div>

  </div>

  <div className="mt-8 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-5">

    <h3 className="font-semibold text-white">
      🔥 Weekly Streak
    </h3>

    <p className="mt-2 text-slate-300">
      You're on a <span className="font-bold text-cyan-400">12-day</span> learning streak.
      Keep it going to unlock new AI recommendations.
    </p>

  </div>

</motion.div>

    </div>
  );
}

export default AIPanel;