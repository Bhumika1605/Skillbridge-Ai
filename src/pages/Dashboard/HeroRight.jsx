import { motion } from "framer-motion";
import {
  ArrowUpRight,
  BarChart3,
  CheckCircle2,
  FileText,
  Target,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

/* =========================================================
   SCORE HELPER
========================================================= */

function getScore(...values) {
  for (const value of values) {
    if (typeof value === "number" && Number.isFinite(value)) {
      return Math.max(0, Math.min(100, Math.round(value)));
    }

    if (
      typeof value === "string" &&
      value.trim() !== "" &&
      !Number.isNaN(Number(value))
    ) {
      const number = Number(value);

      return Math.max(0, Math.min(100, Math.round(number)));
    }
  }

  return null;
}

/* =========================================================
   SCORE DISPLAY
========================================================= */

function ScoreValue({ value, suffix = "%" }) {
  if (value === null) {
    return (
      <span className="text-sm font-semibold text-slate-500">
        Not analyzed
      </span>
    );
  }

  return (
    <span className="font-bold text-white">
      {value}
      {suffix}
    </span>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

function HeroRight({ userData, loading }) {
  const navigate = useNavigate();

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <div className="min-h-[420px] animate-pulse rounded-[30px] border border-white/10 bg-white/[0.035] p-7">
        <div className="h-4 w-32 rounded bg-white/5" />

        <div className="mt-3 h-8 w-44 rounded bg-white/5" />

        <div className="mx-auto mt-8 h-44 w-44 rounded-full border-[14px] border-white/5" />

        <div className="mt-8 space-y-3">
          <div className="h-14 rounded-xl bg-white/5" />
          <div className="h-14 rounded-xl bg-white/5" />
          <div className="h-14 rounded-xl bg-white/5" />
        </div>
      </div>
    );
  }

  /* =========================================================
     READ REAL VALUES
  ========================================================= */

  const resumeScore = getScore(
    userData?.resumeScore,
    userData?.resumeAnalysis?.resumeScore,
    userData?.resumeAnalysis?.score,
    userData?.dashboard?.resumeScore
  );

  const atsScore = getScore(
    userData?.atsScore,
    userData?.atsCompatibility,
    userData?.resumeAnalysis?.atsScore,
    userData?.resumeAnalysis?.atsCompatibility,
    userData?.dashboard?.atsScore
  );

  const technicalSkillsScore = getScore(
    userData?.technicalSkillsScore,
    userData?.technicalSkillScore,
    userData?.skillScore,
    userData?.skillGapScore,
    userData?.dashboard?.technicalSkillsScore
  );

  const portfolioScore = getScore(
    userData?.portfolioScore,
    userData?.projectScore,
    userData?.dashboard?.portfolioScore
  );

  /* =========================================================
     CAREER READINESS
     
     IMPORTANT:
     This is calculated ONLY from scores that actually exist.
     No fake fallback numbers.
  ========================================================= */

  const availableScores = [
    resumeScore,
    atsScore,
    technicalSkillsScore,
    portfolioScore,
  ].filter((score) => score !== null);

  const readiness =
    availableScores.length > 0
      ? Math.round(
          availableScores.reduce((sum, score) => sum + score, 0) /
            availableScores.length
        )
      : null;

  /* =========================================================
     PLACEMENT
  ========================================================= */

  const placementProbability = getScore(
    userData?.placementProbability,
    userData?.placementChance,
    userData?.placementScore,
    userData?.dashboard?.placementProbability
  );

  /* =========================================================
     READINESS LABEL
  ========================================================= */

  const getReadinessLabel = () => {
    if (readiness === null) return "Not analyzed";

    if (readiness >= 85) return "Excellent";

    if (readiness >= 70) return "Strong";

    if (readiness >= 50) return "Developing";

    return "Needs Work";
  };

  /* =========================================================
     SVG
  ========================================================= */

  const radius = 76;
  const circumference = 2 * Math.PI * radius;

  const progressOffset =
    readiness === null
      ? circumference
      : circumference -
        (readiness / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, x: 35 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.7,
        ease: "easeOut",
      }}
      className="
        relative
        overflow-hidden
        rounded-[30px]
        border
        border-white/10
        bg-white/[0.035]
        p-6
        shadow-2xl
        shadow-black/20
        backdrop-blur-2xl
        md:p-7
      "
    >
      {/* ================= INNER GLOW ================= */}

      <div className="pointer-events-none absolute -right-24 -top-24 h-48 w-48 rounded-full bg-cyan-500/10 blur-[90px]" />

      {/* ================= HEADER ================= */}

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Target
              size={15}
              className="text-cyan-400"
            />

            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-500">
              Career Readiness
            </p>
          </div>

          <h2 className="mt-2 text-2xl font-bold tracking-tight text-white">
            AI Evaluation
          </h2>
        </div>

        <div className="rounded-xl border border-white/5 bg-white/[0.04] px-3 py-2">
          <span className="text-[11px] font-medium text-slate-500">
            Based on your data
          </span>
        </div>
      </div>

      {/* ================= SCORE ================= */}

      <div className="relative mt-7 flex justify-center">
        <div className="relative h-44 w-44">
          <svg
            className="h-full w-full -rotate-90"
            viewBox="0 0 180 180"
          >
            {/* Track */}

            <circle
              cx="90"
              cy="90"
              r={radius}
              fill="none"
              stroke="rgba(51,65,85,0.55)"
              strokeWidth="11"
            />

            {/* Progress */}

            {readiness !== null && (
              <motion.circle
                cx="90"
                cy="90"
                r={radius}
                fill="none"
                stroke="url(#readinessGradient)"
                strokeWidth="11"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{
                  strokeDashoffset: circumference,
                }}
                animate={{
                  strokeDashoffset: progressOffset,
                }}
                transition={{
                  duration: 1.4,
                  ease: "easeOut",
                }}
              />
            )}

            <defs>
              <linearGradient
                id="readinessGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop
                  offset="0%"
                  stopColor="#22D3EE"
                />

                <stop
                  offset="100%"
                  stopColor="#3B82F6"
                />
              </linearGradient>
            </defs>
          </svg>

          {/* Center */}

          <div className="absolute inset-0 flex flex-col items-center justify-center">
            {readiness !== null ? (
              <>
                <span className="text-5xl font-black tracking-tight text-white">
                  {readiness}%
                </span>

                <span className="mt-1 text-xs font-medium text-slate-500">
                  {getReadinessLabel()}
                </span>
              </>
            ) : (
              <>
                <BarChart3
                  size={27}
                  className="text-slate-600"
                />

                <span className="mt-2 text-xs font-medium text-slate-500">
                  Not analyzed
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ================= METRICS ================= */}

      <div className="relative mt-6 space-y-2.5">
        <Metric
          icon={FileText}
          title="Resume Score"
          value={resumeScore}
          color="cyan"
        />

        <Metric
          icon={CheckCircle2}
          title="ATS Compatibility"
          value={atsScore}
          color="emerald"
        />

        <Metric
          icon={BarChart3}
          title="Technical Skills"
          value={technicalSkillsScore}
          color="violet"
        />

        {portfolioScore !== null && (
          <Metric
            icon={Target}
            title="Portfolio Score"
            value={portfolioScore}
            color="blue"
          />
        )}

        {placementProbability !== null && (
          <Metric
            icon={ArrowUpRight}
            title="Placement Probability"
            value={placementProbability}
            color="amber"
          />
        )}
      </div>

      {/* ================= EMPTY STATE ================= */}

      {availableScores.length === 0 && (
        <div className="relative mt-5 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.04] p-4">
          <p className="text-sm font-semibold text-white">
            Your AI evaluation is waiting
          </p>

          <p className="mt-1 text-xs leading-5 text-slate-500">
            Analyze your resume to generate real career readiness
            metrics.
          </p>
        </div>
      )}

      {/* ================= ACTION ================= */}

      <button
        type="button"
        onClick={() => navigate("/resume-analyzer")}
        className="
          group
          relative
          mt-6
          flex
          w-full
          items-center
          justify-center
          gap-2
          overflow-hidden
          rounded-2xl
          bg-gradient-to-r
          from-cyan-500
          to-blue-600
          py-3.5
          text-sm
          font-bold
          text-white
          shadow-lg
          shadow-cyan-500/15
          transition-all
          duration-300
          hover:-translate-y-0.5
          hover:shadow-cyan-500/25
        "
      >
        <span>
          {availableScores.length === 0
            ? "Analyze My Resume"
            : "Update AI Evaluation"}
        </span>

        <ArrowUpRight
          size={17}
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </button>
    </motion.div>
  );
}

/* =========================================================
   METRIC
========================================================= */

function Metric({
  icon: Icon,
  title,
  value,
  color,
}) {
  const colorClasses = {
    cyan: {
      icon: "bg-cyan-400/10 text-cyan-400",
      value: "text-cyan-400",
    },

    emerald: {
      icon: "bg-emerald-400/10 text-emerald-400",
      value: "text-emerald-400",
    },

    violet: {
      icon: "bg-violet-400/10 text-violet-400",
      value: "text-violet-400",
    },

    blue: {
      icon: "bg-blue-400/10 text-blue-400",
      value: "text-blue-400",
    },

    amber: {
      icon: "bg-amber-400/10 text-amber-400",
      value: "text-amber-400",
    },
  };

  const theme =
    colorClasses[color] || colorClasses.cyan;

  return (
    <div
      className="
        group
        flex
        items-center
        justify-between
        rounded-xl
        border
        border-white/[0.06]
        bg-white/[0.025]
        px-3.5
        py-3
        transition-all
        duration-200
        hover:border-white/10
        hover:bg-white/[0.045]
      "
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${theme.icon}`}
        >
          <Icon size={15} strokeWidth={1.8} />
        </div>

        <span className="text-xs font-medium text-slate-400">
          {title}
        </span>
      </div>

      <div className="text-sm">
        {value === null ? (
          <span className="text-[11px] font-semibold text-slate-600">
            Not analyzed
          </span>
        ) : (
          <span className={theme.value}>
            {value}%
          </span>
        )}
      </div>
    </div>
  );
}

export default HeroRight;