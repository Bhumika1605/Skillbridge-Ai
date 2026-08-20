import { useEffect, useState } from "react";
import {
  CheckCircle,
  AlertTriangle,
  Sparkles,
  Target,
  ArrowUpRight,
} from "lucide-react";

function SkillGapAnalysis() {
  const [analysis, setAnalysis] = useState(null);

  /* =====================================================
     LOAD REAL RESUME ANALYSIS
  ===================================================== */

  useEffect(() => {
    loadAnalysis();

    window.addEventListener(
      "resumeAnalysisUpdated",
      loadAnalysis
    );

    window.addEventListener(
      "storage",
      loadAnalysis
    );

    return () => {
      window.removeEventListener(
        "resumeAnalysisUpdated",
        loadAnalysis
      );

      window.removeEventListener(
        "storage",
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

      const actualAnalysis =
        data?.analysis || data;

      setAnalysis(actualAnalysis);
    } catch (error) {
      console.error(
        "Failed to load skill gap analysis:",
        error
      );

      setAnalysis(null);
    }
  };

  /* =====================================================
     REAL DATA FROM BACKEND
  ===================================================== */

  const skillsFound = Array.isArray(
    analysis?.skillsFound
  )
    ? analysis.skillsFound
    : [];

  const missingSkills = Array.isArray(
    analysis?.missingSkills
  )
    ? analysis.missingSkills
    : [];

  const technicalScore =
    Number(
      analysis?.technicalSkillsScore
    ) || 0;

  const careerGoal =
    analysis?.careerGoal ||
    analysis?.detectedRole ||
    "Your selected career";

  /* =====================================================
     SKILL TOTAL
  ===================================================== */

  const totalSkills =
    skillsFound.length +
    missingSkills.length;

  const skillCoverage =
    totalSkills > 0
      ? Math.round(
          (skillsFound.length /
            totalSkills) *
            100
        )
      : 0;

  /* =====================================================
     READINESS LABEL
  ===================================================== */

  const getReadinessLabel = () => {
    if (technicalScore >= 90)
      return "Excellent";

    if (technicalScore >= 80)
      return "Strong";

    if (technicalScore >= 70)
      return "Good";

    if (technicalScore >= 60)
      return "Developing";

    return "Needs Improvement";
  };

  /* =====================================================
     READINESS MESSAGE
  ===================================================== */

  const getReadinessMessage = () => {
    if (technicalScore >= 90) {
      return "Your technical skill profile is highly aligned with your career goal.";
    }

    if (technicalScore >= 80) {
      return "You have a strong technical foundation. Focus on the remaining skill gaps.";
    }

    if (technicalScore >= 70) {
      return "Your technical foundation is good, but some role-specific skills should be strengthened.";
    }

    if (technicalScore >= 60) {
      return "You are developing your technical foundation. Prioritize the missing skills below.";
    }

    return "Focus on building the core skills required for your selected career.";
  };

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-3xl
        border border-white/10
        bg-[#111827]
        shadow-[0_20px_60px_rgba(0,0,0,0.18)]
      "
    >

      {/* =====================================================
          BACKGROUND GLOW
      ===================================================== */}

      <div className="pointer-events-none absolute inset-0">

        <div
          className="
            absolute
            -left-24
            -top-24
            h-72
            w-72
            rounded-full
            bg-cyan-500/10
            blur-[120px]
          "
        />

        <div
          className="
            absolute
            -right-24
            top-20
            h-64
            w-64
            rounded-full
            bg-blue-500/10
            blur-[120px]
          "
        />

      </div>

      <div className="relative z-10 p-6 md:p-7">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div
          className="
            flex
            flex-col
            gap-4
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >

          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-11
                w-11
                items-center
                justify-center
                rounded-xl
                border
                border-cyan-400/20
                bg-cyan-400/10
              "
            >
              <Sparkles
                size={21}
                className="text-cyan-400"
              />
            </div>

            <div>

              <h2 className="text-xl font-bold tracking-tight text-white">
                Skill Gap Analysis
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Real skills detected from your analyzed resume
              </p>

            </div>

          </div>

          {analysis && (
            <div
              className="
                flex
                w-fit
                items-center
                gap-2
                rounded-full
                border
                border-emerald-400/10
                bg-emerald-400/5
                px-3
                py-1.5
              "
            >

              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />

              <span className="text-[11px] font-medium text-emerald-400">
                Analysis Active
              </span>

            </div>
          )}

        </div>

        {/* =====================================================
            EMPTY STATE
        ===================================================== */}

        {!analysis && (

          <div
            className="
              mt-6
              rounded-2xl
              border
              border-yellow-400/10
              bg-yellow-400/[0.03]
              p-8
              text-center
            "
          >

            <div
              className="
                mx-auto
                flex
                h-14
                w-14
                items-center
                justify-center
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

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
              Upload and analyze your resume first.
              Your real detected skills and skill gaps
              will appear here automatically.
            </p>

          </div>

        )}

        {/* =====================================================
            MAIN ANALYSIS
        ===================================================== */}

        {analysis && (

          <div className="mt-6">

            {/* =================================================
                CAREER TARGET
            ================================================= */}

            <div
              className="
                rounded-2xl
                border
                border-cyan-400/10
                bg-cyan-400/[0.035]
                p-5
              "
            >

              <div
                className="
                  flex
                  flex-col
                  gap-4
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-cyan-400/10
                    "
                  >
                    <Target
                      size={19}
                      className="text-cyan-400"
                    />
                  </div>

                  <div>

                    <p className="text-[11px] uppercase tracking-wider text-slate-600">
                      Target Career
                    </p>

                    <h3 className="mt-1 text-base font-bold text-white">
                      {careerGoal}
                    </h3>

                  </div>

                </div>

                <div className="sm:text-right">

                  <p className="text-[11px] text-slate-500">
                    Technical Readiness
                  </p>

                  <p className="mt-1 text-2xl font-black text-cyan-400">
                    {technicalScore}%
                  </p>

                </div>

              </div>

            </div>

            {/* =================================================
                OVERVIEW
            ================================================= */}

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">

              <OverviewCard
                title="Skills Found"
                value={skillsFound.length}
                description="Detected from resume"
                icon={CheckCircle}
                iconClass="text-emerald-400"
                bgClass="bg-emerald-400/10"
              />

              <OverviewCard
                title="Missing Skills"
                value={missingSkills.length}
                description="Recommended for target role"
                icon={AlertTriangle}
                iconClass="text-red-400"
                bgClass="bg-red-400/10"
              />

              <OverviewCard
                title="Skill Coverage"
                value={`${skillCoverage}%`}
                description="Current role alignment"
                icon={Target}
                iconClass="text-cyan-400"
                bgClass="bg-cyan-400/10"
              />

            </div>

            {/* =================================================
                SKILLS FOUND + MISSING SKILLS
            ================================================= */}

            <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">

              {/* =================================================
                  SKILLS FOUND
              ================================================= */}

              <div
                className="
                  rounded-2xl
                  border
                  border-emerald-400/10
                  bg-emerald-400/[0.025]
                  p-5
                "
              >

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-2">

                    <CheckCircle
                      size={19}
                      className="text-emerald-400"
                    />

                    <h3 className="text-base font-bold text-emerald-400">
                      Skills Found
                    </h3>

                  </div>

                  <span
                    className="
                      rounded-full
                      bg-emerald-400/10
                      px-2.5
                      py-1
                      text-[10px]
                      font-semibold
                      text-emerald-400
                    "
                  >
                    {skillsFound.length}
                  </span>

                </div>

                <p className="mt-1 text-xs text-slate-600">
                  Skills detected from your resume
                </p>

                {skillsFound.length > 0 ? (

                  <div className="mt-5 flex flex-wrap gap-2">

                    {skillsFound.map(
                      (skill, index) => (

                        <span
                          key={`${skill}-${index}`}
                          className="
                            rounded-xl
                            border
                            border-emerald-400/10
                            bg-emerald-400/5
                            px-3
                            py-2
                            text-xs
                            font-medium
                            text-emerald-300
                          "
                        >
                          <span className="mr-1.5 text-emerald-400">
                            ✓
                          </span>

                          {skill}

                        </span>

                      )
                    )}

                  </div>

                ) : (

                  <div className="mt-5 rounded-xl border border-white/5 bg-white/[0.02] p-4">

                    <p className="text-sm text-slate-500">
                      No recognized technical skills were detected.
                    </p>

                  </div>

                )}

              </div>

              {/* =================================================
                  MISSING SKILLS
              ================================================= */}

              <div
                className="
                  rounded-2xl
                  border
                  border-red-400/10
                  bg-red-400/[0.025]
                  p-5
                "
              >

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-2">

                    <AlertTriangle
                      size={19}
                      className="text-red-400"
                    />

                    <h3 className="text-base font-bold text-red-400">
                      Missing Skills
                    </h3>

                  </div>

                  <span
                    className="
                      rounded-full
                      bg-red-400/10
                      px-2.5
                      py-1
                      text-[10px]
                      font-semibold
                      text-red-400
                    "
                  >
                    {missingSkills.length}
                  </span>

                </div>

                <p className="mt-1 text-xs text-slate-600">
                  Recommended skills for your target career
                </p>

                {missingSkills.length > 0 ? (

                  <div className="mt-5 flex flex-wrap gap-2">

                    {missingSkills.map(
                      (skill, index) => (

                        <span
                          key={`${skill}-${index}`}
                          className="
                            rounded-xl
                            border
                            border-red-400/10
                            bg-red-400/5
                            px-3
                            py-2
                            text-xs
                            font-medium
                            text-red-300
                          "
                        >
                          <span className="mr-1.5 text-red-400">
                            +
                          </span>

                          {skill}

                        </span>

                      )
                    )}

                  </div>

                ) : (

                  <div
                    className="
                      mt-5
                      rounded-xl
                      border
                      border-emerald-400/10
                      bg-emerald-400/5
                      p-4
                    "
                  >

                    <p className="text-sm font-medium text-emerald-400">
                      Excellent!
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      No major recommended skill gaps were detected.
                    </p>

                  </div>

                )}

              </div>

            </div>

            {/* =================================================
                TECHNICAL READINESS
            ================================================= */}

            <div
              className="
                mt-4
                rounded-2xl
                border
                border-white/8
                bg-white/[0.025]
                p-5
              "
            >

              <div
                className="
                  flex
                  flex-col
                  gap-3
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >

                <div>

                  <p className="text-sm font-semibold text-white">
                    Technical Skill Readiness
                  </p>

                  <p className="mt-1 text-xs text-slate-600">
                    {getReadinessMessage()}
                  </p>

                </div>

                <div className="flex items-center gap-2">

                  <span
                    className="
                      rounded-full
                      bg-cyan-400/10
                      px-3
                      py-1
                      text-[10px]
                      font-semibold
                      text-cyan-400
                    "
                  >
                    {getReadinessLabel()}
                  </span>

                  <span className="text-lg font-black text-cyan-400">
                    {technicalScore}%
                  </span>

                </div>

              </div>

              <div className="mt-4">

                <div className="h-2.5 overflow-hidden rounded-full bg-slate-800">

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
                        Math.max(
                          technicalScore,
                          0
                        ),
                        100
                      )}%`,
                    }}
                  />

                </div>

                <div className="mt-2 flex justify-between text-[9px] text-slate-700">

                  <span>Starting</span>

                  <span>Developing</span>

                  <span>Strong</span>

                  <span>Excellent</span>

                </div>

              </div>

            </div>

            {/* =================================================
                ACTION / INSIGHT
            ================================================= */}

            {missingSkills.length > 0 && (

              <div
                className="
                  mt-4
                  flex
                  flex-col
                  gap-3
                  rounded-2xl
                  border
                  border-cyan-400/10
                  bg-cyan-400/[0.025]
                  p-4
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-cyan-400/10
                    "
                  >

                    <ArrowUpRight
                      size={17}
                      className="text-cyan-400"
                    />

                  </div>

                  <div>

                    <p className="text-xs font-semibold text-white">
                      Recommended next step
                    </p>

                    <p className="mt-1 text-[11px] text-slate-500">
                      Start with{" "}
                      <span className="font-medium text-cyan-400">
                        {missingSkills
                          .slice(0, 3)
                          .join(", ")}
                      </span>
                    </p>

                  </div>

                </div>

                <span
                  className="
                    w-fit
                    rounded-full
                    bg-cyan-400/10
                    px-3
                    py-1.5
                    text-[10px]
                    font-semibold
                    text-cyan-400
                  "
                >
                  Skill Development
                </span>

              </div>

            )}

          </div>

        )}

      </div>

    </section>
  );
}

/* =========================================================
   OVERVIEW CARD
========================================================= */

function OverviewCard({
  title,
  value,
  description,
  icon: Icon,
  iconClass,
  bgClass,
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-white/8
        bg-white/[0.025]
        p-4
        transition-all
        duration-300
        hover:border-white/15
        hover:bg-white/[0.04]
      "
    >

      <div className="flex items-center justify-between">

        <div
          className={`
            flex
            h-9
            w-9
            items-center
            justify-center
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
            text-xl
            font-black
            ${iconClass}
          `}
        >
          {value}
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

export default SkillGapAnalysis;