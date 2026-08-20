import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Brain,
  FileText,
  Briefcase,
  Target,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

function DashboardHero() {

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning ☀️"
      : hour < 17
      ? "Good Afternoon 🌤"
      : "Good Evening 🌙";

  const stats = [
    {
      title: "Resume Score",
      value: "92%",
      growth: "+8%",
      icon: FileText,
      color: "text-cyan-400",
      bg: "from-cyan-500/20 to-cyan-500/5",
      border: "border-cyan-500/20",
    },
    {
      title: "Career Score",
      value: "89%",
      growth: "+5%",
      icon: Target,
      color: "text-emerald-400",
      bg: "from-emerald-500/20 to-emerald-500/5",
      border: "border-emerald-500/20",
    },
    {
      title: "ATS Match",
      value: "95%",
      growth: "+12%",
      icon: TrendingUp,
      color: "text-purple-400",
      bg: "from-purple-500/20 to-purple-500/5",
      border: "border-purple-500/20",
    },
    {
      title: "Hiring Chance",
      value: "87%",
      growth: "+6%",
      icon: Briefcase,
      color: "text-yellow-400",
      bg: "from-yellow-500/20 to-yellow-500/5",
      border: "border-yellow-500/20",
    },
  ];

  return (
    <section className="relative overflow-hidden rounded-[32px] border border-slate-800 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-6 md:p-10">

      {/* Background Glow */}

      <div className="absolute -top-40 right-0 w-[450px] h-[450px] bg-cyan-500/10 blur-[140px] rounded-full"></div>

      <div className="absolute -bottom-40 -left-20 w-[400px] h-[400px] bg-blue-500/10 blur-[140px] rounded-full"></div>

      <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-purple-500/10 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>

      <div className="relative z-10 flex flex-col xl:flex-row gap-12 justify-between">

        {/* LEFT SIDE */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: .7 }}
          className="flex-1 max-w-3xl"
        >

          {/* AI Badge */}

          <div className="inline-flex items-center gap-3 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-5 py-2">

            <span className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse"></span>

            <Brain size={18} className="text-cyan-400" />

            <span className="text-cyan-300 font-medium">

              Gemini AI Connected

            </span>

          </div>

          {/* Greeting */}

          <motion.h1
            initial={{ opacity:0,y:15 }}
            animate={{ opacity:1,y:0 }}
            transition={{ delay:.2 }}
            className="mt-8 text-4xl md:text-6xl font-black text-white leading-tight"
          >

            {greeting}

            <br />

            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">

              Bhumika 👋

            </span>

          </motion.h1>

          <p className="mt-8 text-slate-400 text-lg leading-8 max-w-2xl">

            Welcome back to <span className="text-white font-semibold">SkillBridge AI</span>.
            Track your career progress, improve your resume, discover skill gaps,
            prepare for interviews and move one step closer to your dream job.

          </p>

          {/* Buttons */}

          <div className="mt-10 flex flex-wrap gap-4">

            <Link
              to="/dashboard/resume-analyzer"
              className="group inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-7 py-4 text-white font-semibold shadow-xl shadow-cyan-500/20 transition hover:scale-105"
            >

              Analyze Resume

              <ArrowRight
                size={18}
                className="transition group-hover:translate-x-1"
              />

            </Link>

            <Link
              to="/dashboard/roadmap"
              className="rounded-2xl border border-slate-700 bg-slate-900/60 px-7 py-4 text-white font-semibold hover:border-cyan-500 transition"
            >

              Career Roadmap

            </Link>

            <Link
              to="/dashboard/mock-interview"
              className="rounded-2xl border border-slate-700 bg-slate-900/60 px-7 py-4 text-white font-semibold hover:border-purple-500 transition"
            >

              Mock Interview

            </Link>

          </div>

                    {/* Small Achievement Cards */}

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-5">

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <Sparkles className="text-cyan-400 mb-3" size={24} />
              <h4 className="text-white font-semibold">
                AI Recommendations
              </h4>
              <p className="text-slate-400 text-sm mt-2">
                12 personalized suggestions waiting for you.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <TrendingUp className="text-green-400 mb-3" size={24} />
              <h4 className="text-white font-semibold">
                Weekly Growth
              </h4>
              <p className="text-slate-400 text-sm mt-2">
                Your career readiness increased this week.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
              <Briefcase className="text-purple-400 mb-3" size={24} />
              <h4 className="text-white font-semibold">
                Job Matches
              </h4>
              <p className="text-slate-400 text-sm mt-2">
                New opportunities matched with your profile.
              </p>
            </div>

          </div>

        </motion.div>

        {/* RIGHT SIDE */}

        <motion.div
          initial={{ opacity:0, x:30 }}
          animate={{ opacity:1, x:0 }}
          transition={{ duration:.7, delay:.2 }}
          className="w-full xl:w-[480px]"
        >

          <div className="grid grid-cols-2 gap-5">

            {stats.map((item, index) => {

              const Icon = item.icon;

              return (

                <motion.div
                  key={index}
                  whileHover={{
                    y: -8,
                    scale: 1.03,
                  }}
                  className={`
                    relative
                    overflow-hidden
                    rounded-3xl
                    border
                    ${item.border}
                    bg-gradient-to-br
                    ${item.bg}
                    backdrop-blur-xl
                    p-6
                  `}
                >

                  <div className="absolute -right-8 -top-8 w-24 h-24 rounded-full bg-white/5 blur-2xl"></div>

                  <div className={`inline-flex rounded-2xl p-3 bg-slate-900/60 ${item.color}`}>

                    <Icon size={28} />

                  </div>

                  <p className="text-slate-400 mt-6">

                    {item.title}

                  </p>

                  <h2 className="text-4xl font-black text-white mt-2">

                    {item.value}

                  </h2>

                  <div className="flex items-center justify-between mt-5">

                    <span className="text-green-400 text-sm font-semibold">

                      ▲ {item.growth}

                    </span>

                    <span className="text-slate-500 text-sm">

                      This Week

                    </span>

                  </div>

                  <div className="mt-5 h-2 rounded-full bg-slate-800">

                    <motion.div
                      initial={{ width:0 }}
                      animate={{ width:item.value }}
                      transition={{
                        duration:1,
                        delay:index*.2
                      }}
                      className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
                    />

                  </div>

                </motion.div>

              );

            })}

          </div>

                  </motion.div>

      </div>

      {/* Bottom Banner */}

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="relative mt-12 overflow-hidden rounded-3xl border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 p-6 md:p-8"
      >
        <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl"></div>

        <div className="relative flex flex-col md:flex-row items-start md:items-center justify-between gap-6">

          <div>

            <h3 className="text-2xl md:text-3xl font-bold text-white">
              🚀 You're closer to your dream job!
            </h3>

            <p className="mt-3 max-w-2xl text-slate-300 leading-7">
              Keep improving your resume, complete your learning roadmap,
              practice mock interviews, and let AI guide your career journey.
              Every small improvement increases your hiring potential.
            </p>

          </div>

          <Link
            to="/dashboard/skill-gap"
            className="inline-flex items-center gap-3 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-7 py-4 font-semibold text-white shadow-xl shadow-cyan-500/20 transition duration-300 hover:scale-105"
          >
            Explore Skill Gap

            <ArrowRight size={18} />

          </Link>

        </div>

      </motion.div>

    </section>
  );
}

export default DashboardHero;