import { useEffect, useState } from "react";
import {
  Target,
  FileText,
  CheckCircle2,
  Code2,
  BriefcaseBusiness,
  TrendingUp,
  Sparkles,
} from "lucide-react";

/* =========================================================
   DASHBOARD HEADER
   Real data from localStorage
========================================================= */

function DashboardHeader() {
  const [userData, setUserData] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =========================================================
     LOAD DASHBOARD DATA
  ========================================================= */

  useEffect(() => {
    loadDashboardData();

    window.addEventListener(
      "resumeAnalysisUpdated",
      loadDashboardData
    );

    window.addEventListener(
      "storage",
      loadDashboardData
    );

    return () => {
      window.removeEventListener(
        "resumeAnalysisUpdated",
        loadDashboardData
      );

      window.removeEventListener(
        "storage",
        loadDashboardData
      );
    };
  }, []);

  /* =========================================================
     LOAD USER + RESUME ANALYSIS
  ========================================================= */

  function loadDashboardData() {
    setLoading(true);

    /* -----------------------------------------
       USER DATA
    ----------------------------------------- */

    try {
      const savedUser =
        localStorage.getItem("userData");

      if (savedUser) {
        const parsedUser =
          JSON.parse(savedUser);

        setUserData(parsedUser);
      } else {
        setUserData(null);
      }
    } catch (error) {
      console.error(
        "Failed to load user data:",
        error
      );

      setUserData(null);
    }

    /* -----------------------------------------
       RESUME ANALYSIS
    ----------------------------------------- */

    try {
      const savedAnalysis =
        localStorage.getItem(
          "resumeAnalysis"
        );

      if (!savedAnalysis) {
        setAnalysis(null);
        setLoading(false);
        return;
      }

      const parsedData =
        JSON.parse(savedAnalysis);

      /*
        Supports both:

        {
          analysis: {...}
        }

        and:

        {
          careerRole: "...",
          resumeScore: 80
        }
      */

      const actualAnalysis =
        parsedData?.analysis ||
        parsedData;

      setAnalysis(actualAnalysis);
    } catch (error) {
      console.error(
        "Failed to load resume analysis:",
        error
      );

      setAnalysis(null);
    }

    setLoading(false);
  }

  /* =========================================================
     USER NAME
  ========================================================= */

  function getFirstName() {
    if (userData?.displayName) {
      return userData.displayName
        .trim()
        .split(/\s+/)[0];
    }

    if (userData?.name) {
      return userData.name
        .trim()
        .split(/\s+/)[0];
    }

    if (userData?.fullName) {
      return userData.fullName
        .trim()
        .split(/\s+/)[0];
    }

    return "there";
  }

  /* =========================================================
     CAREER TARGET
  ========================================================= */

  const career =
    analysis?.careerRole ||
    analysis?.detectedRole ||
    analysis?.careerGoal ||
    userData?.targetCareer ||
    userData?.career ||
    userData?.desiredRole ||
    "Career Goal Not Set";

  /* =========================================================
     REAL SCORES
  ========================================================= */

  const resumeScore = getScore(
    analysis?.resumeScore
  );

  const atsScore = getScore(
    analysis?.atsScore
  );

  const technicalSkills = getScore(
    analysis?.technicalSkillsScore ??
      analysis?.technicalSkills
  );

  const placementReadiness = getScore(
    analysis?.placementProbability ??
      analysis?.placementReadiness
  );

  /* =========================================================
     CAREER READINESS
  ========================================================= */

  const careerReadiness =
    calculateCareerReadiness({
      resumeScore,
      atsScore,
      technicalSkills,
      placementReadiness,
    });

  /* =========================================================
     PROFILE STATUS
  ========================================================= */

  const profileActive =
    Boolean(analysis);

  /* =========================================================
     METRICS
  ========================================================= */

  const stats = [
    {
      label: "Career Readiness",
      value: careerReadiness,
      icon: Target,
      type: "cyan",
    },
    {
      label: "Resume Score",
      value: resumeScore,
      icon: FileText,
      type: "blue",
    },
    {
      label: "ATS Compatibility",
      value: atsScore,
      icon: CheckCircle2,
      type: "violet",
    },
    {
      label: "Technical Skills",
      value: technicalSkills,
      icon: Code2,
      type: "green",
    },
    {
      label: "Placement Readiness",
      value: placementReadiness,
      icon: BriefcaseBusiness,
      type: "orange",
    },
  ];

  /* =========================================================
     COLOR SYSTEM
  ========================================================= */

  const colorClasses = {
    cyan: {
      icon:
        "bg-cyan-400/10 text-cyan-400",
      value:
        "text-cyan-400",
      bar:
        "bg-cyan-400",
    },

    blue: {
      icon:
        "bg-blue-400/10 text-blue-400",
      value:
        "text-blue-400",
      bar:
        "bg-blue-400",
    },

    violet: {
      icon:
        "bg-violet-400/10 text-violet-400",
      value:
        "text-violet-400",
      bar:
        "bg-violet-400",
    },

    green: {
      icon:
        "bg-emerald-400/10 text-emerald-400",
      value:
        "text-emerald-400",
      bar:
        "bg-emerald-400",
    },

    orange: {
      icon:
        "bg-orange-400/10 text-orange-400",
      value:
        "text-orange-400",
      bar:
        "bg-orange-400",
    },
  };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-2xl
        border
        border-white/[0.07]
        bg-[#0D1528]
        shadow-[0_20px_60px_rgba(0,0,0,0.22)]
      "
    >
      {/* =====================================================
          BACKGROUND LIGHTING
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          inset-0
          overflow-hidden
        "
      >
        {/* Cyan glow */}

        <div
          className="
            absolute
            -left-32
            -top-32
            h-72
            w-72
            rounded-full
            bg-cyan-500/[0.055]
            blur-[110px]
          "
        />

        {/* Blue glow */}

        <div
          className="
            absolute
            right-0
            top-0
            h-64
            w-64
            rounded-full
            bg-blue-500/[0.045]
            blur-[110px]
          "
        />

        {/* Purple glow */}

        <div
          className="
            absolute
            bottom-0
            left-1/2
            h-52
            w-52
            -translate-x-1/2
            rounded-full
            bg-violet-500/[0.035]
            blur-[110px]
          "
        />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <div className="relative z-10">

        {/* ===================================================
            HEADER
        =================================================== */}

        <div
          className="
            flex
            flex-col
            gap-5
            border-b
            border-white/[0.065]
            px-5
            py-5
            sm:px-6
            md:px-7
            md:py-6
            lg:flex-row
            lg:items-center
            lg:justify-between
          "
        >
          {/* ================================================
              LEFT SIDE
          ================================================ */}

          <div className="min-w-0">

            {/* Label */}

            <div
              className="
                mb-2.5
                flex
                items-center
                gap-2
              "
            >
              <span
                className="
                  flex
                  h-7
                  w-7
                  shrink-0
                  items-center
                  justify-center
                  rounded-lg
                  border
                  border-cyan-400/10
                  bg-cyan-400/10
                "
              >
                <Sparkles
                  size={15}
                  strokeWidth={2}
                  className="text-cyan-400"
                />
              </span>

              <span
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.22em]
                  text-cyan-400
                "
              >
                Career Intelligence
              </span>
            </div>

            {/* Greeting */}

            <h1
              className="
                text-2xl
                font-bold
                leading-tight
                tracking-tight
                text-white
                sm:text-[28px]
                md:text-3xl
              "
            >
              Good {getGreeting()},{" "}

              <span className="text-cyan-400">
                {loading
                  ? "..."
                  : getFirstName()}
              </span>
            </h1>

            {/* Description */}

            <div
              className="
                mt-2.5
                flex
                flex-wrap
                items-center
                gap-x-2
                gap-y-1
                text-sm
                leading-6
                text-slate-400
              "
            >
              <span>
                {analysis
                  ? "Your career intelligence is updated."
                  : "Analyze your resume to activate your dashboard."}
              </span>

              <span
                className="
                  hidden
                  text-slate-600
                  md:inline
                "
              >
                •
              </span>

              <span className="text-slate-400">
                Target:
                {" "}
                <span
                  className="
                    font-semibold
                    text-cyan-400
                  "
                >
                  {career}
                </span>
              </span>
            </div>
          </div>

          {/* ================================================
              PROFILE STATUS
          ================================================ */}

          <div
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              border
              border-white/[0.07]
              bg-[#0A1222]/80
              px-4
              py-3
              sm:w-fit
            "
          >
            {/* Status Icon */}

            <div
              className={`
                flex
                h-9
                w-9
                shrink-0
                items-center
                justify-center
                rounded-lg
                ${
                  profileActive
                    ? "bg-emerald-400/10"
                    : "bg-yellow-400/10"
                }
              `}
            >
              <TrendingUp
                size={18}
                strokeWidth={2}
                className={
                  profileActive
                    ? "text-emerald-400"
                    : "text-yellow-400"
                }
              />
            </div>

            {/* Status Text */}

            <div className="min-w-0">

              <p
                className="
                  text-[10px]
                  font-semibold
                  uppercase
                  tracking-[0.12em]
                  text-slate-500
                "
              >
                Profile Status
              </p>

              <p
                className={`
                  mt-0.5
                  truncate
                  text-sm
                  font-semibold
                  ${
                    profileActive
                      ? "text-emerald-400"
                      : "text-yellow-400"
                  }
                `}
              >
                {profileActive
                  ? "Career Profile Active"
                  : "Resume Analysis Required"}
              </p>
            </div>
          </div>
        </div>

        {/* ===================================================
            METRICS
        =================================================== */}

        <div
          className="
            grid
            grid-cols-2
            bg-[#0A1222]/55
            md:grid-cols-3
            lg:grid-cols-5
          "
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;

            const colors =
              colorClasses[stat.type];

            return (
              <div
                key={stat.label}
                className={`
                  group
                  relative
                  px-5
                  py-5
                  transition-colors
                  duration-200
                  hover:bg-white/[0.015]
                  md:px-6
                  ${
                    index < 4
                      ? "border-b border-white/[0.055] lg:border-b-0 lg:border-r"
                      : "border-b border-white/[0.055] lg:border-b-0"
                  }
                  ${
                    index === 0
                      ? "md:border-r"
                      : ""
                  }
                `}
              >
                {/* =========================================
                    ICON + VALUE
                ========================================= */}

                <div
                  className="
                    flex
                    items-start
                    justify-between
                    gap-3
                  "
                >
                  {/* Icon */}

                  <div
                    className={`
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      ${colors.icon}
                    `}
                  >
                    <Icon
                      size={17}
                      strokeWidth={2}
                    />
                  </div>

                  {/* Value */}

                  <span
                    className={`
                      text-xl
                      font-bold
                      tracking-tight
                      sm:text-2xl
                      ${colors.value}
                    `}
                  >
                    {stat.value}%
                  </span>
                </div>

                {/* =========================================
                    LABEL
                ========================================= */}

                <p
                  className="
                    mt-3
                    min-h-[32px]
                    text-xs
                    font-medium
                    leading-5
                    text-slate-400
                  "
                >
                  {stat.label}
                </p>

                {/* =========================================
                    PROGRESS BAR
                ========================================= */}

                <div
                  className="
                    mt-2.5
                    h-1
                    w-full
                    overflow-hidden
                    rounded-full
                    bg-slate-800/90
                  "
                >
                  <div
                    className={`
                      h-full
                      rounded-full
                      ${colors.bar}
                      transition-all
                      duration-700
                      ease-out
                    `}
                    style={{
                      width: `${stat.value}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* =========================================================
   GET SCORE
========================================================= */

function getScore(value) {
  const score = Number(value);

  if (!Number.isFinite(score)) {
    return 0;
  }

  return Math.min(
    Math.max(
      Math.round(score),
      0
    ),
    100
  );
}

/* =========================================================
   CAREER READINESS
========================================================= */

function calculateCareerReadiness({
  resumeScore,
  atsScore,
  technicalSkills,
  placementReadiness,
}) {
  const scores = [
    resumeScore,
    atsScore,
    technicalSkills,
    placementReadiness,
  ].filter(
    (score) =>
      Number.isFinite(score) &&
      score > 0
  );

  if (scores.length === 0) {
    return 0;
  }

  const total = scores.reduce(
    (sum, score) =>
      sum + score,
    0
  );

  return Math.round(
    total / scores.length
  );
}

/* =========================================================
   GREETING
========================================================= */

function getGreeting() {
  const hour =
    new Date().getHours();

  if (hour < 12) {
    return "Morning";
  }

  if (hour < 17) {
    return "Afternoon";
  }

  return "Evening";
}

export default DashboardHeader;