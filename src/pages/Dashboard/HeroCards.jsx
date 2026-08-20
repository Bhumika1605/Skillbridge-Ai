import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FileText,
  ShieldCheck,
  Rocket,
  Code2,
} from "lucide-react";

function HeroCards() {
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    const savedAnalysis = localStorage.getItem("resumeAnalysis");

    if (savedAnalysis) {
      try {
        const data = JSON.parse(savedAnalysis);

        // Backend response contains the actual AI result
        setAnalysis(data.analysis || data);
      } catch (error) {
        console.error("Unable to read resume analysis:", error);
      }
    }
  }, []);

  const cards = [
    {
      title: "Resume Score",
      score: analysis?.resumeScore ?? 0,
      status: getStatus(analysis?.resumeScore),
      color: "cyan",
      icon: FileText,
    },
    {
      title: "ATS Compatibility",
      score: analysis?.atsScore ?? 0,
      status: getStatus(analysis?.atsScore),
      color: "purple",
      icon: ShieldCheck,
    },
    {
      title: "Placement Probability",
      score: analysis?.placementProbability ?? 0,
      status: getStatus(analysis?.placementProbability),
      color: "blue",
      icon: Rocket,
    },
    {
      title: "Technical Skills",
      score: analysis?.technicalSkillsScore ?? 0,
      status: getStatus(analysis?.technicalSkillsScore),
      color: "green",
      icon: Code2,
    },
  ];

  const colorClasses = {
    cyan: {
      border: "border-cyan-500/20",
      bg: "bg-cyan-500/10",
      text: "text-cyan-400",
      bar: "bg-cyan-400",
    },

    purple: {
      border: "border-purple-500/20",
      bg: "bg-purple-500/10",
      text: "text-purple-400",
      bar: "bg-purple-500",
    },

    blue: {
      border: "border-blue-500/20",
      bg: "bg-blue-500/10",
      text: "text-blue-400",
      bar: "bg-blue-500",
    },

    green: {
      border: "border-green-500/20",
      bg: "bg-green-500/10",
      text: "text-green-400",
      bar: "bg-green-500",
    },
  };

  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

      {cards.map((card, index) => {
        const Icon = card.icon;
        const c = colorClasses[card.color];

        const score = Number(card.score) || 0;

        return (
          <motion.div
            key={card.title}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{
              y: -6,
              scale: 1.02,
            }}
            className={`rounded-3xl border ${c.border} bg-white/5 backdrop-blur-xl p-6`}
          >

            {/* Top */}
            <div className="flex items-center justify-between">

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${c.bg}`}
              >
                <Icon
                  className={c.text}
                  size={22}
                />
              </div>

              {analysis && (
                <span className="text-sm text-green-400 font-semibold">
                  AI
                </span>
              )}

            </div>

            {/* Title */}
            <p className="mt-5 text-slate-400 text-sm">
              {card.title}
            </p>

            {/* Score */}
            <h2
              className={`mt-2 text-4xl font-black ${c.text}`}
            >
              {score}%
            </h2>

            {/* Status */}
            <p
              className={`mt-1 font-medium ${c.text}`}
            >
              {analysis ? card.status : "Not analyzed"}
            </p>

            {/* Progress */}
            <div className="mt-5">

              <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">

                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${score}%` }}
                  transition={{
                    duration: 1,
                    delay: index * 0.15,
                  }}
                  className={`h-full rounded-full ${c.bar}`}
                />

              </div>

            </div>

          </motion.div>
        );
      })}

    </div>
  );
}


/* -------------------------------- */
/* Status */
/* -------------------------------- */

function getStatus(score) {

  const value = Number(score);

  if (!value) return "Not analyzed";

  if (value >= 90) return "Outstanding";

  if (value >= 80) return "Excellent";

  if (value >= 70) return "Good";

  if (value >= 60) return "Needs Improvement";

  return "Needs Attention";
}


export default HeroCards;