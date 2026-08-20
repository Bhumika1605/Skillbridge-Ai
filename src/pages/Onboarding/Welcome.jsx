import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Welcome() {

const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#08111f] flex items-center justify-center px-6">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="w-full max-w-4xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10"
      >

        {/* Badge */}

        <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 px-4 py-2">

          <Sparkles className="text-cyan-400" size={18} />

          <span className="text-cyan-300 text-sm font-medium">
            Welcome to SkillBridge AI
          </span>

        </div>

        {/* Heading */}

        <h1 className="mt-8 text-5xl font-black text-white">

          Your Personal

          <br />

          <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">

            Career Intelligence Platform

          </span>

        </h1>

        {/* Description */}

        <p className="mt-6 text-lg text-slate-400 leading-8 max-w-2xl">

          Before we build your personalized dashboard,
          let's understand your profile and career goals.

          This will help our AI generate accurate
          recommendations, resume analysis and learning roadmap.

        </p>

        {/* Features */}

        <div className="mt-10 grid md:grid-cols-2 gap-5">

          <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-5 text-white">
            ✅ AI Resume Analysis
          </div>

          <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-5 text-white">
            ✅ ATS Score
          </div>

          <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-5 text-white">
            ✅ Skill Gap Detection
          </div>

          <div className="rounded-2xl bg-slate-900/60 border border-white/10 p-5 text-white">
            ✅ Personalized Roadmap
          </div>

        </div>

        {/* Button */}

        <button
  onClick={() => navigate("/profile-setup")}
  className="
    mt-12
    rounded-2xl
    bg-gradient-to-r
    from-cyan-500
    to-blue-600
    px-8
    py-4
    text-white
    font-semibold
    flex
    items-center
    gap-3
    hover:scale-105
    transition
  "
>
  Get Started
</button>

      </motion.div>

    </div>
  );
}

export default Welcome;