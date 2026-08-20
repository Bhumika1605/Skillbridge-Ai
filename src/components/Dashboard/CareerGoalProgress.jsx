import { useEffect, useMemo, useState } from "react";
import { onSnapshot, doc } from "firebase/firestore";
import {
  Target,
  TrendingUp,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

import { auth, db } from "../../firebase/firebase";

export default function CareerGoalProgress() {
  const [userData, setUserData] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =========================================================
     LOAD FIREBASE USER + LOCAL RESUME ANALYSIS
  ========================================================= */

  useEffect(() => {
    let unsubscribeUser = null;

    const loadUser = () => {
      const user = auth.currentUser;

      if (!user) {
        setUserData(null);
        setLoading(false);
        return;
      }

      const userRef = doc(db, "users", user.uid);

      unsubscribeUser = onSnapshot(
        userRef,
        (snapshot) => {
          if (snapshot.exists()) {
            setUserData({
              ...snapshot.data(),
              uid: user.uid,
            });
          } else {
            setUserData({
              uid: user.uid,
            });
          }

          setLoading(false);
        },
        (error) => {
          console.error(
            "Career goal Firebase listener error:",
            error
          );

          setLoading(false);
        }
      );
    };

    const loadAnalysis = () => {
      const saved = localStorage.getItem("resumeAnalysis");

      if (!saved) {
        setAnalysis(null);
        return;
      }

      try {
        const data = JSON.parse(saved);

        setAnalysis(data?.analysis || data);
      } catch (error) {
        console.error(
          "Failed to load career analysis:",
          error
        );

        setAnalysis(null);
      }
    };

    loadUser();
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
      if (unsubscribeUser) {
        unsubscribeUser();
      }

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

  /* =========================================================
     CAREER GOAL
  ========================================================= */

  const careerGoal = useMemo(() => {
    return (
      analysis?.careerRole ||
      analysis?.careerGoal ||
      analysis?.detectedRole ||
      userData?.targetCareer ||
      userData?.career ||
      userData?.desiredRole ||
      "Career Goal"
    );
  }, [analysis, userData]);

  /* =========================================================
     REAL METRICS
  ========================================================= */

  const resumeScore = getNumber(
    analysis?.resumeScore ??
      userData?.resumeScore
  );

  const atsScore = getNumber(
    analysis?.atsScore ??
      userData?.atsScore
  );

  const technicalScore = getNumber(
    analysis?.technicalSkillsScore ??
      userData?.technicalSkillsScore ??
      userData?.technicalSkills
  );

  const placementScore = getNumber(
    analysis?.placementProbability ??
      userData?.placementProbability ??
      userData?.placementReadiness
  );

  /* =========================================================
     CAREER READINESS
  ========================================================= */

  const backendCareerReadiness = getNumber(
    analysis?.careerReadiness ??
      analysis?.careerReadinessScore ??
      userData?.careerReadiness ??
      userData?.careerReadinessScore
  );

  const careerReadiness =
    backendCareerReadiness > 0
      ? backendCareerReadiness
      : calculateReadiness({
          resumeScore,
          atsScore,
          technicalScore,
          placementScore,
        });

  /* =========================================================
     STATUS
  ========================================================= */

  const progressStatus =
    getProgressStatus(careerReadiness);

  const nextMilestone =
    getNextMilestone(careerReadiness);

  const pointsToNext =
    nextMilestone.score > careerReadiness
      ? nextMilestone.score - careerReadiness
      : 0;

  /* =========================================================
     LOADING STATE
  ========================================================= */

  if (loading) {
    return (
      <section
        className="
          relative
          overflow-hidden
          rounded-3xl
          border border-white/[0.08]
          bg-[#111827]
          p-5
        "
      >
        <div className="animate-pulse">
          <div className="h-5 w-40 rounded bg-slate-800" />

          <div className="mt-5 h-20 rounded-2xl bg-slate-900" />

          <div className="mt-5 h-3 rounded-full bg-slate-800" />

          <div className="mt-5 grid grid-cols-3 gap-2">
            <div className="h-16 rounded-xl bg-slate-900" />
            <div className="h-16 rounded-xl bg-slate-900" />
            <div className="h-16 rounded-xl bg-slate-900" />
          </div>
        </div>
      </section>
    );
  }

  /* =========================================================
     MAIN UI
  ========================================================= */

  return (
    <section
      className="
        relative
        overflow-hidden
        rounded-3xl
        border border-white/[0.08]
        bg-[#111827]
        p-5
        shadow-[0_20px_60px_rgba(0,0,0,0.18)]
      "
    >
      {/* =====================================================
          BACKGROUND GLOW
      ===================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-44
          w-44
          rounded-full
          bg-cyan-500/[0.07]
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-20
          -left-20
          h-40
          w-40
          rounded-full
          bg-blue-500/[0.05]
          blur-3xl
        "
      />

      <div className="relative z-10">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex items-center justify-between gap-3">

          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-10
                w-10
                shrink-0
                items-center
                justify-center
                rounded-xl
                border
                border-cyan-400/10
                bg-cyan-400/[0.08]
              "
            >
              <Target
                size={19}
                className="text-cyan-400"
              />
            </div>

            <div className="min-w-0">

              <h2 className="text-base font-bold text-white">
                Career Goal
              </h2>

              <p className="mt-0.5 text-[10px] text-slate-500">
                Your progress toward your target
              </p>

            </div>

          </div>

          <div
            className={`
              flex
              shrink-0
              items-center
              gap-1.5
              rounded-full
              border
              px-2.5
              py-1
              ${progressStatus.badge}
            `}
          >
            <span
              className={`
                h-1.5
                w-1.5
                rounded-full
                ${progressStatus.dot}
              `}
            />

            <span className="text-[9px] font-semibold">
              {progressStatus.label}
            </span>
          </div>

        </div>

        {/* =================================================
            CAREER TARGET
        ================================================= */}

        <div
          className="
            mt-5
            rounded-2xl
            border
            border-cyan-400/10
            bg-cyan-400/[0.025]
            p-4
          "
        >

          <div className="flex items-center justify-between gap-3">

            <div className="min-w-0">

              <p
                className="
                  text-[9px]
                  font-semibold
                  uppercase
                  tracking-[0.16em]
                  text-slate-600
                "
              >
                Target Role
              </p>

              <h3
                className="
                  mt-1.5
                  truncate
                  text-sm
                  font-bold
                  text-white
                "
                title={careerGoal}
              >
                {careerGoal}
              </h3>

            </div>

            <div className="shrink-0 text-right">

              <p className="text-[9px] text-slate-600">
                Readiness
              </p>

              <p className="mt-0.5 text-xl font-black text-cyan-400">
                {careerReadiness}%
              </p>

            </div>

          </div>

          {/* PROGRESS */}

          <div className="mt-4">

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

            <div className="mt-2 flex justify-between">

              <span className="text-[9px] text-slate-600">
                Starting
              </span>

              <span className="text-[9px] text-slate-600">
                Job Ready
              </span>

            </div>

          </div>

        </div>

        {/* =================================================
            QUICK METRICS
        ================================================= */}

        <div className="mt-4 grid grid-cols-3 gap-2">

          <MiniMetric
            label="Resume"
            value={resumeScore}
          />

          <MiniMetric
            label="Technical"
            value={technicalScore}
          />

          <MiniMetric
            label="ATS"
            value={atsScore}
          />

        </div>

        {/* =================================================
            NEXT MILESTONE
        ================================================= */}

        <div
          className="
            mt-4
            flex
            items-center
            justify-between
            gap-3
            rounded-xl
            border
            border-white/[0.06]
            bg-white/[0.02]
            px-3.5
            py-3
          "
        >

          <div className="flex min-w-0 items-center gap-2.5">

            <div
              className="
                flex
                h-8
                w-8
                shrink-0
                items-center
                justify-center
                rounded-lg
                bg-violet-400/10
              "
            >
              <TrendingUp
                size={15}
                className="text-violet-400"
              />
            </div>

            <div className="min-w-0">

              <p className="text-[9px] uppercase tracking-wider text-slate-600">
                Next milestone
              </p>

              <p className="mt-0.5 truncate text-xs font-semibold text-slate-300">
                {nextMilestone.label}
              </p>

            </div>

          </div>

          <div className="flex shrink-0 items-center gap-1">

            {pointsToNext > 0 ? (
              <>
                <span className="text-[10px] font-semibold text-cyan-400">
                  +{pointsToNext}
                </span>

                <ArrowUpRight
                  size={13}
                  className="text-cyan-400"
                />
              </>
            ) : (
              <CheckCircle2
                size={16}
                className="text-emerald-400"
              />
            )}

          </div>

        </div>

        {/* =================================================
            INSIGHT
        ================================================= */}

        <div className="mt-3 flex items-start gap-2">

          <Sparkles
            size={13}
            className="mt-0.5 shrink-0 text-cyan-400"
          />

          <p className="text-[10px] leading-4 text-slate-500">
            {getInsight(
              careerReadiness,
              technicalScore,
              atsScore
            )}
          </p>

        </div>

      </div>
    </section>
  );
}

/* =========================================================
   MINI METRIC
========================================================= */

function MiniMetric({
  label,
  value,
}) {
  const safeValue = Math.min(
    Math.max(Number(value) || 0, 0),
    100
  );

  return (
    <div
      className="
        rounded-xl
        border
        border-white/[0.05]
        bg-white/[0.02]
        p-3
      "
    >

      <div className="flex items-center justify-between">

        <span className="text-[9px] text-slate-600">
          {label}
        </span>

        <span className="text-[10px] font-bold text-slate-300">
          {safeValue}%
        </span>

      </div>

      <div className="mt-2 h-1 overflow-hidden rounded-full bg-slate-800">

        <div
          className="
            h-full
            rounded-full
            bg-slate-500
            transition-all
            duration-700
          "
          style={{
            width: `${safeValue}%`,
          }}
        />

      </div>

    </div>
  );
}

/* =========================================================
   NUMBER HELPER
========================================================= */

function getNumber(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return 0;
  }

  return Math.min(
    Math.max(Math.round(number), 0),
    100
  );
}

/* =========================================================
   CAREER READINESS CALCULATOR
========================================================= */

function calculateReadiness({
  resumeScore,
  atsScore,
  technicalScore,
  placementScore,
}) {
  const values = [
    resumeScore,
    atsScore,
    technicalScore,
    placementScore,
  ].filter((value) => value > 0);

  if (values.length === 0) {
    return 0;
  }

  const total = values.reduce(
    (sum, value) => sum + value,
    0
  );

  return Math.round(total / values.length);
}

/* =========================================================
   PROGRESS STATUS
========================================================= */

function getProgressStatus(score) {
  if (score >= 90) {
    return {
      label: "Excellent",
      badge:
        "border-emerald-400/10 bg-emerald-400/[0.06] text-emerald-400",
      dot: "bg-emerald-400",
    };
  }

  if (score >= 80) {
    return {
      label: "Strong",
      badge:
        "border-cyan-400/10 bg-cyan-400/[0.06] text-cyan-400",
      dot: "bg-cyan-400",
    };
  }

  if (score >= 70) {
    return {
      label: "Good",
      badge:
        "border-blue-400/10 bg-blue-400/[0.06] text-blue-400",
      dot: "bg-blue-400",
    };
  }

  if (score >= 50) {
    return {
      label: "Developing",
      badge:
        "border-yellow-400/10 bg-yellow-400/[0.06] text-yellow-400",
      dot: "bg-yellow-400",
    };
  }

  return {
    label: "Needs Work",
    badge:
      "border-red-400/10 bg-red-400/[0.06] text-red-400",
    dot: "bg-red-400",
  };
}

/* =========================================================
   NEXT MILESTONE
========================================================= */

function getNextMilestone(score) {
  if (score < 50) {
    return {
      score: 50,
      label: "Build your foundation",
    };
  }

  if (score < 70) {
    return {
      score: 70,
      label: "Reach developing level",
    };
  }

  if (score < 80) {
    return {
      score: 80,
      label: "Become strongly job ready",
    };
  }

  if (score < 90) {
    return {
      score: 90,
      label: "Reach excellent readiness",
    };
  }

  return {
    score: 100,
    label: "Achieve maximum readiness",
  };
}

/* =========================================================
   AI-STYLE INSIGHT
========================================================= */

function getInsight(
  readiness,
  technical,
  ats
) {
  if (readiness >= 90) {
    return "You are highly prepared. Focus on interviews, projects and real-world experience.";
  }

  if (technical < ats) {
    return "Your ATS profile is ahead of your technical readiness. Strengthening practical skills can improve your career score.";
  }

  if (ats < technical) {
    return "Your technical foundation is strong. Improving resume and ATS optimization can increase your opportunities.";
  }

  if (readiness >= 70) {
    return "You are making solid progress. Close your remaining skill gaps to move toward job readiness.";
  }

  if (readiness >= 50) {
    return "Your career foundation is developing. Focus on the highest-priority skills identified in your Skill Gap Analysis.";
  }

  return "Start by strengthening your core skills and improving your resume to build career readiness.";
}