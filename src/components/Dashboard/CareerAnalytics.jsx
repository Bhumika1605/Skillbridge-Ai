import { useEffect, useState } from "react";
import {
  TrendingUp,
  Target,
  FileText,
  ShieldCheck,
  Code2,
  BriefcaseBusiness,
  ArrowUpRight,
} from "lucide-react";

function CareerAnalytics() {
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    loadAnalysis();

    window.addEventListener("resumeAnalysisUpdated", loadAnalysis);

    return () => {
      window.removeEventListener(
        "resumeAnalysisUpdated",
        loadAnalysis
      );
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
      console.error("Unable to load career analytics:", error);
      setAnalysis(null);
    }
  };

  const resumeScore = Number(analysis?.resumeScore) || 0;
  const atsScore = Number(analysis?.atsScore) || 0;
  const technicalScore =
    Number(analysis?.technicalSkillsScore) || 0;
  const placementProbability =
    Number(analysis?.placementProbability) || 0;

  const careerReadiness = analysis
    ? Math.round(
        (resumeScore +
          atsScore +
          technicalScore +
          placementProbability) /
          4
      )
    : 0;

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-3xl
        border border-white/10
        bg-slate-950/80
        shadow-[0_20px_70px_rgba(0,0,0,0.25)]
      "
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute -right-20 top-10 h-64 w-64 rounded-full bg-blue-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 p-6 md:p-7">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-center gap-3">

            <div
              className="
                flex h-11 w-11 items-center justify-center
                rounded-xl
                border border-cyan-400/20
                bg-cyan-400/10
              "
            >
              <TrendingUp
                size={21}
                className="text-cyan-400"
              />
            </div>

            <div>
              <h2 className="text-xl font-bold tracking-tight text-white">
                Career Analytics
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Your current career profile performance
              </p>
            </div>

          </div>

          {analysis && (
            <div
              className="
                flex items-center gap-2
                rounded-full
                border border-emerald-400/10
                bg-emerald-400/5
                px-3 py-1.5
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

              <span className="text-[11px] font-medium text-emerald-400">
                Profile Updated
              </span>
            </div>
          )}

        </div>

        {/* ================================================= */}
        {/* EMPTY STATE */}
        {/* ================================================= */}

        {!analysis && (
          <div
            className="
              mt-6
              rounded-2xl
              border border-white/10
              bg-white/[0.025]
              p-8
              text-center
            "
          >
            <div
              className="
                mx-auto flex h-12 w-12
                items-center justify-center
                rounded-xl
                bg-cyan-400/10
              "
            >
              <FileText
                size={22}
                className="text-cyan-400"
              />
            </div>

            <h3 className="mt-4 text-base font-semibold text-white">
              Resume analysis required
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Upload and analyze your resume to see your
              career performance metrics here.
            </p>
          </div>
        )}

        {/* ================================================= */}
        {/* MAIN ANALYTICS */}
        {/* ================================================= */}

        {analysis && (
          <div className="mt-6">

            {/* TOP SCORE */}
            <div
              className="
                rounded-2xl
                border border-cyan-400/15
                bg-gradient-to-br
                from-cyan-400/[0.07]
                via-blue-500/[0.035]
                to-transparent
                p-5
              "
            >

              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <div className="flex items-center gap-2">
                    <Target
                      size={16}
                      className="text-cyan-400"
                    />

                    <span className="text-xs font-medium text-slate-400">
                      Career Readiness
                    </span>
                  </div>

                  <div className="mt-2 flex items-end gap-2">
                    <span className="text-4xl font-black tracking-tight text-white">
                      {careerReadiness}
                    </span>

                    <span className="mb-1 text-lg font-bold text-cyan-400">
                      %
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-slate-500">
                    Overall profile strength
                  </p>

                </div>

                <div
                  className="
                    flex h-20 w-20 shrink-0
                    items-center justify-center
                    rounded-full
                    border border-cyan-400/20
                    bg-slate-950/70
                  "
                >
                  <div className="text-center">
                    <p className="text-lg font-black text-cyan-400">
                      {careerReadiness}%
                    </p>

                    <p className="text-[9px] uppercase tracking-wider text-slate-600">
                      Ready
                    </p>
                  </div>
                </div>

              </div>

              {/* Progress */}
              <div className="mt-5">

                <div className="h-2 overflow-hidden rounded-full bg-slate-800">

                  <div
                    className="
                      h-full
                      rounded-full
                      bg-gradient-to-r
                      from-cyan-400
                      via-blue-400
                      to-indigo-500
                      transition-all
                      duration-1000
                    "
                    style={{
                      width: `${Math.min(
                        Math.max(careerReadiness, 0),
                        100
                      )}%`,
                    }}
                  />

                </div>

                <div className="mt-2 flex justify-between text-[10px] text-slate-600">
                  <span>Starting</span>
                  <span>Developing</span>
                  <span>Strong</span>
                  <span>Excellent</span>
                </div>

              </div>

            </div>

            {/* ================================================= */}
            {/* METRICS */}
            {/* ================================================= */}

            <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">

              <MetricCard
                icon={FileText}
                title="Resume Score"
                value={resumeScore}
                description="Profile quality"
                iconClass="text-cyan-400"
                bgClass="bg-cyan-400/10"
              />

              <MetricCard
                icon={ShieldCheck}
                title="ATS Score"
                value={atsScore}
                description="ATS compatibility"
                iconClass="text-violet-400"
                bgClass="bg-violet-400/10"
              />

              <MetricCard
                icon={Code2}
                title="Technical Skills"
                value={technicalScore}
                description="Skill strength"
                iconClass="text-blue-400"
                bgClass="bg-blue-400/10"
              />

              <MetricCard
                icon={BriefcaseBusiness}
                title="Placement Readiness"
                value={placementProbability}
                description="Career potential"
                iconClass="text-emerald-400"
                bgClass="bg-emerald-400/10"
              />

            </div>

            {/* ================================================= */}
            {/* PERFORMANCE SUMMARY */}
            {/* ================================================= */}

            <div
              className="
                mt-4
                flex flex-col gap-3
                rounded-2xl
                border border-white/8
                bg-white/[0.025]
                p-4
                sm:flex-row
                sm:items-center
                sm:justify-between
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    flex h-9 w-9
                    items-center justify-center
                    rounded-lg
                    bg-white/5
                  "
                >
                  <ArrowUpRight
                    size={17}
                    className="text-cyan-400"
                  />
                </div>

                <div>
                  <p className="text-xs font-semibold text-white">
                    Profile Performance
                  </p>

                  <p className="mt-0.5 text-[11px] text-slate-500">
                    {getCareerMessage(careerReadiness)}
                  </p>
                </div>

              </div>

              <span
                className={`
                  w-fit
                  rounded-full
                  px-3 py-1
                  text-[10px]
                  font-semibold
                  ${
                    careerReadiness >= 80
                      ? "bg-emerald-400/10 text-emerald-400"
                      : careerReadiness >= 60
                      ? "bg-cyan-400/10 text-cyan-400"
                      : "bg-amber-400/10 text-amber-400"
                  }
                `}
              >
                {getReadinessLabel(careerReadiness)}
              </span>

            </div>

          </div>
        )}

      </div>
    </section>
  );
}

/* ================================================= */
/* METRIC CARD */
/* ================================================= */

function MetricCard({
  icon: Icon,
  title,
  value,
  description,
  iconClass,
  bgClass,
}) {
  return (
    <div
      className="
        group
        rounded-2xl
        border border-white/8
        bg-white/[0.025]
        p-4
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:border-white/15
        hover:bg-white/[0.04]
      "
    >

      <div className="flex items-center justify-between">

        <div
          className={`
            flex h-9 w-9
            items-center justify-center
            rounded-lg
            ${bgClass}
          `}
        >
          <Icon
            size={17}
            className={iconClass}
          />
        </div>

        <span
          className={`
            text-lg
            font-black
            ${iconClass}
          `}
        >
          {value}%
        </span>

      </div>

      <p className="mt-3 text-xs font-semibold text-slate-300">
        {title}
      </p>

      <p className="mt-1 text-[10px] text-slate-600">
        {description}
      </p>

    </div>
  );
}

/* ================================================= */
/* MESSAGE */
/* ================================================= */

function getCareerMessage(score) {
  if (score >= 90) {
    return "Excellent overall profile performance.";
  }

  if (score >= 80) {
    return "Strong profile with good career readiness.";
  }

  if (score >= 70) {
    return "Good progress with opportunities to improve.";
  }

  if (score >= 60) {
    return "Developing profile — focus on your key gaps.";
  }

  return "Profile needs improvement before competitive applications.";
}

/* ================================================= */
/* READINESS LABEL */
/* ================================================= */

function getReadinessLabel(score) {
  if (score >= 90) return "Excellent";
  if (score >= 80) return "Strong";
  if (score >= 70) return "Good Progress";
  if (score >= 60) return "Developing";
  return "Needs Improvement";
}

export default CareerAnalytics;