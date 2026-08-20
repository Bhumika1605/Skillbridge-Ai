import { useEffect, useState } from "react";
import {
  FileText,
  CheckCircle2,
  ShieldCheck,
  Sparkles,
  AlertTriangle,
} from "lucide-react";

export default function ResumeStatus() {
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    loadAnalysis();

    window.addEventListener("resumeAnalysisUpdated", loadAnalysis);
    window.addEventListener("storage", loadAnalysis);

    return () => {
      window.removeEventListener(
        "resumeAnalysisUpdated",
        loadAnalysis
      );
      window.removeEventListener("storage", loadAnalysis);
    };
  }, []);

  const loadAnalysis = () => {
    const saved = localStorage.getItem("resumeAnalysis");

    if (!saved) {
      setAnalysis(null);
      return;
    }

    try {
      const data = JSON.parse(saved);
      setAnalysis(data.analysis || data);
    } catch (error) {
      console.error("Failed to load resume status:", error);
      setAnalysis(null);
    }
  };

  /* ================================================= */
  /* NO ANALYSIS */
  /* ================================================= */

  if (!analysis) {
    return (
      <section
        className="
          relative
          h-full
          min-h-[420px]
          overflow-hidden
          rounded-3xl
          border border-white/[0.08]
          bg-[#111827]
          p-6
        "
      >
        <div className="relative z-10 flex h-full flex-col">

          {/* Header */}

          <div className="flex items-center gap-3">

            <div
              className="
                flex h-11 w-11 items-center justify-center
                rounded-xl
                border border-cyan-400/10
                bg-cyan-400/[0.08]
              "
            >
              <FileText
                size={21}
                className="text-cyan-400"
              />
            </div>

            <div>
              <h2 className="text-lg font-bold text-white">
                Resume Health
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                Current resume performance
              </p>
            </div>

          </div>

          {/* Empty State */}

          <div
            className="
              mt-6
              flex flex-1
              flex-col
              items-center
              justify-center
              rounded-2xl
              border border-yellow-400/10
              bg-yellow-400/[0.03]
              p-6
              text-center
            "
          >

            <div
              className="
                flex h-14 w-14
                items-center justify-center
                rounded-2xl
                bg-yellow-400/10
              "
            >
              <AlertTriangle
                size={25}
                className="text-yellow-400"
              />
            </div>

            <h3 className="mt-4 text-base font-semibold text-white">
              Resume analysis required
            </h3>

            <p className="mt-2 max-w-xs text-sm leading-6 text-slate-500">
              Upload and analyze your resume to see your real
              resume health, ATS score, and quality checks.
            </p>

          </div>

        </div>
      </section>
    );
  }

  /* ================================================= */
  /* REAL DATA */
  /* ================================================= */

  const resumeScore =
    Number(analysis.resumeScore) || 0;

  const atsScore =
    Number(analysis.atsScore) || 0;

  const fileName =
    analysis.fileName ||
    analysis.resumeName ||
    analysis.filename ||
    "Analyzed Resume";

  const skillsFound =
    Array.isArray(analysis.skillsFound)
      ? analysis.skillsFound
      : [];

  const missingSkills =
    Array.isArray(analysis.missingSkills)
      ? analysis.missingSkills
      : [];

  /*
   * Quality checks are calculated from REAL analysis data.
   * No fixed fake labels.
   */

  const keywordStatus = getKeywordStatus(
    skillsFound,
    missingSkills
  );

  const formattingStatus =
    getFormattingStatus(analysis);

  const experienceStatus =
    getExperienceStatus(analysis);

  const projectStatus =
    getProjectStatus(analysis);

  const metrics = [
    keywordStatus,
    formattingStatus,
    experienceStatus,
    projectStatus,
  ];

  const healthStatus = getHealthStatus(
    resumeScore,
    atsScore
  );

  return (
    <section
      className="
        relative
        h-full
        min-h-[420px]
        overflow-hidden
        rounded-3xl
        border border-white/[0.08]
        bg-[#111827]
        p-6
      "
    >

      {/* Ambient glow */}

      <div
        className="
          pointer-events-none
          absolute
          -right-24
          -top-24
          h-48
          w-48
          rounded-full
          bg-cyan-500/[0.07]
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-24
          -left-24
          h-48
          w-48
          rounded-full
          bg-blue-500/[0.05]
          blur-3xl
        "
      />

      <div className="relative z-10 flex h-full flex-col">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="flex items-start justify-between">

          <div className="flex items-center gap-3">

            <div
              className="
                flex h-11 w-11 items-center justify-center
                rounded-xl
                border border-cyan-400/10
                bg-cyan-400/[0.08]
              "
            >
              <FileText
                size={21}
                className="text-cyan-400"
              />
            </div>

            <div>
              <h2 className="text-lg font-bold text-white">
                Resume Health
              </h2>

              <p className="mt-0.5 text-xs text-slate-500">
                Current resume performance
              </p>
            </div>

          </div>

          {/* REAL STATUS */}

          <div
            className={`
              flex items-center gap-1.5
              rounded-full
              border
              px-2.5 py-1
              ${healthStatus.className}
            `}
          >

            <span
              className={`
                h-1.5 w-1.5 rounded-full
                ${healthStatus.dot}
              `}
            />

            <span
              className="
                text-[10px]
                font-semibold
                uppercase
                tracking-wider
              "
            >
              {healthStatus.label}
            </span>

          </div>

        </div>

        {/* ================================================= */}
        {/* REAL RESUME FILE */}
        {/* ================================================= */}

        <div
          className="
            mt-6
            flex items-center gap-3
            rounded-2xl
            border border-white/[0.06]
            bg-white/[0.025]
            p-3
          "
        >

          <div
            className="
              flex h-10 w-10
              items-center justify-center
              rounded-lg
              bg-slate-800
            "
          >
            <FileText
              size={18}
              className="text-slate-300"
            />
          </div>

          <div className="min-w-0">

            <p className="truncate text-sm font-semibold text-slate-200">
              {fileName}
            </p>

            <div className="mt-1 flex items-center gap-1.5">

              <CheckCircle2
                size={12}
                className="text-emerald-400"
              />

              <span className="text-[11px] text-slate-500">
                Successfully analyzed
              </span>

            </div>

          </div>

        </div>

        {/* ================================================= */}
        {/* SCORE CARDS */}
        {/* ================================================= */}

        <div className="mt-6 grid grid-cols-2 gap-2">

          {/* Resume Score */}

          <ScoreCard
            title="Resume Score"
            score={resumeScore}
            icon={ShieldCheck}
            iconClass="text-cyan-400"
            gradient="from-cyan-400 to-blue-500"
          />

          {/* ATS Score */}

          <ScoreCard
            title="ATS Score"
            score={atsScore}
            icon={Sparkles}
            iconClass="text-violet-400"
            gradient="from-violet-400 to-purple-500"
          />

        </div>

        {/* ================================================= */}
        {/* RESUME QUALITY */}
        {/* ================================================= */}

        <div className="mt-6">

          <div className="mb-3 flex items-center justify-between">

            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-wider
                text-slate-500
              "
            >
              Resume Quality
            </p>

            <span className="text-[10px] text-slate-600">
              Based on analysis
            </span>

          </div>

          <div className="space-y-2">

            {metrics.map((metric) => (
              <QualityRow
                key={metric.label}
                {...metric}
              />
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}


/* ================================================= */
/* SCORE CARD */
/* ================================================= */

function ScoreCard({
  title,
  score,
  icon: Icon,
  iconClass,
  gradient,
}) {
  return (
    <div
      className="
        rounded-2xl
        border border-white/[0.06]
        bg-white/[0.025]
        p-4
      "
    >

      <div className="flex items-center justify-between">

        <span className="text-xs text-slate-500">
          {title}
        </span>

        <Icon
          size={15}
          className={iconClass}
        />

      </div>

      <div className="mt-2 flex items-end gap-1">

        <span className="text-2xl font-black text-white">
          {score}
        </span>

        <span className="mb-1 text-xs text-slate-500">
          /100
        </span>

      </div>

      <div className="mt-3 h-1 overflow-hidden rounded-full bg-slate-800">

        <div
          className={`
            h-full
            rounded-full
            bg-gradient-to-r
            ${gradient}
            transition-all
            duration-700
          `}
          style={{
            width: `${Math.min(
              Math.max(score, 0),
              100
            )}%`,
          }}
        />

      </div>

    </div>
  );
}


/* ================================================= */
/* QUALITY ROW */
/* ================================================= */

function QualityRow({
  label,
  value,
  color,
  dot,
}) {
  return (
    <div
      className="
        flex items-center justify-between
        rounded-xl
        border border-white/[0.04]
        bg-white/[0.02]
        px-3.5 py-2.5
      "
    >

      <div className="flex items-center gap-2">

        <span
          className={`
            h-1.5 w-1.5
            rounded-full
            ${dot}
          `}
        />

        <span className="text-xs text-slate-400">
          {label}
        </span>

      </div>

      <span
        className={`
          text-xs
          font-semibold
          ${color}
        `}
      >
        {value}
      </span>

    </div>
  );
}


/* ================================================= */
/* KEYWORD STATUS */
/* ================================================= */

function getKeywordStatus(
  skillsFound,
  missingSkills
) {
  const found = skillsFound.length;
  const missing = missingSkills.length;

  if (found === 0 && missing === 0) {
    return {
      label: "Keywords",
      value: "Not detected",
      color: "text-slate-500",
      dot: "bg-slate-500",
    };
  }

  if (missing === 0) {
    return {
      label: "Keywords",
      value: "Strong",
      color: "text-emerald-400",
      dot: "bg-emerald-400",
    };
  }

  if (found > missing) {
    return {
      label: "Keywords",
      value: "Good",
      color: "text-cyan-400",
      dot: "bg-cyan-400",
    };
  }

  return {
    label: "Keywords",
    value: "Needs improvement",
    color: "text-amber-400",
    dot: "bg-amber-400",
  };
}


/* ================================================= */
/* FORMATTING STATUS */
/* ================================================= */

function getFormattingStatus(analysis) {
  const formattingScore =
    Number(
      analysis.formattingScore ??
      analysis.formatScore ??
      analysis.resumeFormattingScore
    );

  if (Number.isFinite(formattingScore)) {
    return scoreToQuality(
      "Formatting",
      formattingScore
    );
  }

  return {
    label: "Formatting",
    value: "Not available",
    color: "text-slate-500",
    dot: "bg-slate-500",
  };
}


/* ================================================= */
/* EXPERIENCE STATUS */
/* ================================================= */

function getExperienceStatus(analysis) {
  const experienceScore =
    Number(
      analysis.experienceScore ??
      analysis.experienceStrength
    );

  if (Number.isFinite(experienceScore)) {
    return scoreToQuality(
      "Experience",
      experienceScore
    );
  }

  const experience =
    analysis.experience ||
    analysis.experienceLevel;

  if (experience) {
    return {
      label: "Experience",
      value: String(experience),
      color: "text-blue-400",
      dot: "bg-blue-400",
    };
  }

  return {
    label: "Experience",
    value: "Not available",
    color: "text-slate-500",
    dot: "bg-slate-500",
  };
}


/* ================================================= */
/* PROJECT STATUS */
/* ================================================= */

function getProjectStatus(analysis) {
  const projectScore =
    Number(
      analysis.projectScore ??
      analysis.projectsScore
    );

  if (Number.isFinite(projectScore)) {
    return scoreToQuality(
      "Projects",
      projectScore
    );
  }

  const projects =
    analysis.projects ||
    analysis.projectCount;

  if (Array.isArray(projects)) {
    return {
      label: "Projects",
      value:
        projects.length > 0
          ? `${projects.length} detected`
          : "None detected",
      color:
        projects.length > 0
          ? "text-violet-400"
          : "text-amber-400",
      dot:
        projects.length > 0
          ? "bg-violet-400"
          : "bg-amber-400",
    };
  }

  if (
    typeof projects === "number"
  ) {
    return {
      label: "Projects",
      value:
        projects > 0
          ? `${projects} detected`
          : "None detected",
      color:
        projects > 0
          ? "text-violet-400"
          : "text-amber-400",
      dot:
        projects > 0
          ? "bg-violet-400"
          : "bg-amber-400",
    };
  }

  return {
    label: "Projects",
    value: "Not available",
    color: "text-slate-500",
    dot: "bg-slate-500",
  };
}


/* ================================================= */
/* SCORE → QUALITY */
/* ================================================= */

function scoreToQuality(
  label,
  score
) {
  const safeScore = Math.min(
    Math.max(score, 0),
    100
  );

  if (safeScore >= 85) {
    return {
      label,
      value: "Excellent",
      color: "text-emerald-400",
      dot: "bg-emerald-400",
    };
  }

  if (safeScore >= 70) {
    return {
      label,
      value: "Strong",
      color: "text-cyan-400",
      dot: "bg-cyan-400",
    };
  }

  if (safeScore >= 50) {
    return {
      label,
      value: "Good",
      color: "text-blue-400",
      dot: "bg-blue-400",
    };
  }

  return {
    label,
    value: "Needs improvement",
    color: "text-amber-400",
    dot: "bg-amber-400",
  };
}


/* ================================================= */
/* HEALTH STATUS */
/* ================================================= */

function getHealthStatus(
  resumeScore,
  atsScore
) {
  const average =
    (resumeScore + atsScore) / 2;

  if (average >= 80) {
    return {
      label: "Healthy",
      className:
        "border-emerald-400/10 bg-emerald-400/[0.06] text-emerald-400",
      dot: "bg-emerald-400",
    };
  }

  if (average >= 60) {
    return {
      label: "Developing",
      className:
        "border-cyan-400/10 bg-cyan-400/[0.06] text-cyan-400",
      dot: "bg-cyan-400",
    };
  }

  return {
    label: "Needs Work",
    className:
      "border-amber-400/10 bg-amber-400/[0.06] text-amber-400",
    dot: "bg-amber-400",
  };
}