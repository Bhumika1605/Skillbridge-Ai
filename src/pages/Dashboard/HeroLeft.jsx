import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

function HeroLeft({ userData, loading }) {
  const navigate = useNavigate();

  /* =========================
     USER NAME
  ========================= */

  const getName = () => {
    if (userData?.name?.trim()) {
      return userData.name.trim();
    }

    if (userData?.fullName?.trim()) {
      return userData.fullName.trim();
    }

    if (userData?.displayName?.trim()) {
      return userData.displayName.trim();
    }

    if (userData?.firstName?.trim()) {
      return userData.firstName.trim();
    }

    return "there";
  };

  /* =========================
     CAREER GOAL
  ========================= */

  const getCareerGoal = () => {
    return (
      userData?.careerGoal ||
      userData?.career ||
      userData?.targetCareer ||
      userData?.dreamJob ||
      userData?.desiredRole ||
      ""
    );
  };

  const name = getName();
  const careerGoal = getCareerGoal();

  /* =========================
     REAL CURRENT TIME
  ========================= */

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 18) {
    greeting = "Good Afternoon";
  }

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <div className="flex min-h-[420px] items-center">
        <div className="w-full animate-pulse">
          <div className="h-9 w-44 rounded-full bg-white/5" />

          <div className="mt-8 h-16 w-3/4 rounded-xl bg-white/5" />

          <div className="mt-3 h-16 w-1/2 rounded-xl bg-white/5" />

          <div className="mt-8 h-5 w-52 rounded-lg bg-white/5" />

          <div className="mt-7 h-5 w-full max-w-2xl rounded-lg bg-white/5" />

          <div className="mt-3 h-5 w-4/5 max-w-2xl rounded-lg bg-white/5" />

          <div className="mt-10 flex gap-4">
            <div className="h-14 w-44 rounded-2xl bg-white/5" />
            <div className="h-14 w-40 rounded-2xl bg-white/5" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[420px] flex-col justify-center">
      {/* ================= BADGE ================= */}

      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/[0.07] px-4 py-2.5"
      >
        <Sparkles
          size={15}
          className="text-cyan-400"
          strokeWidth={1.8}
        />

        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-cyan-300">
          AI Career Intelligence
        </span>
      </motion.div>

      {/* ================= HEADING ================= */}

      <motion.h1
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.65,
          delay: 0.1,
        }}
        className="mt-7 text-5xl font-black leading-[1.05] tracking-[-0.03em] text-white sm:text-6xl"
      >
        {greeting},
        <br />

        <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
          {name}
        </span>
      </motion.h1>

      {/* ================= CAREER ================= */}

      {careerGoal ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-5"
        >
          <span className="text-sm font-semibold uppercase tracking-[0.16em] text-slate-500">
            Target Career
          </span>

          <p className="mt-1.5 text-lg font-semibold text-cyan-400">
            {careerGoal}
          </p>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-5"
        >
          <p className="text-sm text-slate-500">
            Your target career has not been added yet.
          </p>
        </motion.div>
      )}

      {/* ================= DESCRIPTION ================= */}

      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.35,
        }}
        className="mt-7 max-w-2xl text-base leading-7 text-slate-400 md:text-lg"
      >
        Your career workspace brings your resume, skills, learning progress
        and career goals together so you can clearly see what to improve
        next.
      </motion.p>

      {/* ================= ACTIONS ================= */}

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          delay: 0.45,
        }}
        className="mt-9 flex flex-wrap gap-4"
      >
        <button
          type="button"
          onClick={() => navigate("/career-roadmap")}
          className="
            group
            flex
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-gradient-to-r
            from-cyan-500
            to-blue-600
            px-7
            py-3.5
            text-sm
            font-bold
            text-white
            shadow-lg
            shadow-cyan-500/20
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:shadow-cyan-500/30
          "
        >
          Continue Journey

          <ArrowRight
            size={17}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </button>

        <button
          type="button"
          onClick={() => navigate("/career-roadmap")}
          className="
            flex
            items-center
            justify-center
            gap-2
            rounded-2xl
            border
            border-white/10
            bg-white/[0.035]
            px-7
            py-3.5
            text-sm
            font-semibold
            text-slate-200
            backdrop-blur-xl
            transition-all
            duration-300
            hover:border-cyan-400/20
            hover:bg-cyan-400/[0.06]
            hover:text-white
          "
        >
          View Roadmap

          <ArrowRight size={17} />
        </button>
      </motion.div>
    </div>
  );
}

export default HeroLeft;