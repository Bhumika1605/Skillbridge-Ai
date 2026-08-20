import { useEffect, useMemo, useState } from "react";
import { onSnapshot, doc } from "firebase/firestore";

import {
  Trophy,
  Medal,
  Award,
  Star,
  Lock,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

import { auth, db } from "../../firebase/firebase";

export default function RecentAchievements() {
  const [userData, setUserData] = useState(null);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =========================================================
     LOAD FIREBASE USER + RESUME ANALYSIS
  ========================================================= */

  useEffect(() => {
    let unsubscribeUser;

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
            "Achievements user listener error:",
            error
          );

          setLoading(false);
        }
      );
    };

    const loadAnalysis = () => {
      const saved =
        localStorage.getItem("resumeAnalysis");

      if (!saved) {
        setAnalysis(null);
        return;
      }

      try {
        const data = JSON.parse(saved);

        setAnalysis(
          data?.analysis || data
        );
      } catch (error) {
        console.error(
          "Failed to load achievement analysis:",
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
     REAL USER METRICS
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
      userData?.technicalSkills ??
      userData?.technicalSkillsScore
  );

  const placementScore = getNumber(
    analysis?.placementProbability ??
      userData?.placementReadiness ??
      userData?.placementProbability
  );

  const backendReadiness = getNumber(
    analysis?.careerReadiness ??
      analysis?.careerReadinessScore ??
      userData?.careerReadiness
  );

  const careerReadiness =
    backendReadiness > 0
      ? backendReadiness
      : calculateReadiness({
          resumeScore,
          atsScore,
          technicalScore,
          placementScore,
        });

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

  const hasResume =
    Boolean(analysis) ||
    Boolean(
      localStorage.getItem("resumeFile")
    );

  const careerGoal = Boolean(
    analysis?.careerRole ||
      analysis?.careerGoal ||
      analysis?.detectedRole ||
      userData?.targetCareer ||
      userData?.career ||
      userData?.desiredRole
  );

  /* =========================================================
     ACHIEVEMENTS
  ========================================================= */

  const achievements = useMemo(() => {
    return [
      {
        id: "resume-analyzed",
        icon: FileIcon,
        title: "Resume Analyzed",
        subtitle: hasResume
          ? "Resume successfully analyzed"
          : "Analyze your resume to unlock",
        unlocked: hasResume,
        color: "bg-cyan-500/10",
        iconColor: "text-cyan-400",
      },

      {
        id: "resume-strong",
        icon: ShieldIcon,
        title: "Resume Strong",
        subtitle:
          resumeScore >= 80
            ? `Resume Score reached ${resumeScore}%`
            : "Reach 80% Resume Score",
        unlocked: resumeScore >= 80,
        color: "bg-blue-500/10",
        iconColor: "text-blue-400",
      },

      {
        id: "ats-expert",
        icon: Trophy,
        title: "ATS Expert",
        subtitle:
          atsScore >= 90
            ? `ATS Score reached ${atsScore}%`
            : "Reach 90% ATS compatibility",
        unlocked: atsScore >= 90,
        color: "bg-yellow-500/10",
        iconColor: "text-yellow-400",
      },

      {
        id: "skill-builder",
        icon: Medal,
        title: "Skill Builder",
        subtitle:
          technicalScore >= 80
            ? `Technical readiness reached ${technicalScore}%`
            : "Reach 80% technical readiness",
        unlocked: technicalScore >= 80,
        color: "bg-emerald-500/10",
        iconColor: "text-emerald-400",
      },

      {
        id: "career-ready",
        icon: Award,
        title: "Career Ready",
        subtitle:
          careerReadiness >= 80
            ? `Career readiness reached ${careerReadiness}%`
            : "Reach 80% career readiness",
        unlocked: careerReadiness >= 80,
        color: "bg-violet-500/10",
        iconColor: "text-violet-400",
      },

      {
        id: "job-ready",
        icon: Star,
        title: "Job Ready",
        subtitle:
          careerReadiness >= 90
            ? "Reached 90%+ career readiness"
            : "Reach 90% career readiness",
        unlocked: careerReadiness >= 90,
        color: "bg-orange-500/10",
        iconColor: "text-orange-400",
      },

      {
        id: "skill-gap",
        icon: TargetIcon,
        title: "Skill Gap Closer",
        subtitle:
          missingSkills.length === 0 &&
          hasResume
            ? "No major skill gaps detected"
            : missingSkills.length > 0
            ? `${missingSkills.length} skills still to develop`
            : "Analyze your resume first",
        unlocked:
          hasResume &&
          missingSkills.length === 0,
        color: "bg-pink-500/10",
        iconColor: "text-pink-400",
      },

      {
        id: "career-profile",
        icon: Sparkles,
        title: "Career Profile",
        subtitle:
          careerGoal && hasResume
            ? "Career target and resume connected"
            : "Set a career target and analyze your resume",
        unlocked:
          careerGoal && hasResume,
        color: "bg-indigo-500/10",
        iconColor: "text-indigo-400",
      },
    ];
  }, [
    hasResume,
    resumeScore,
    atsScore,
    technicalScore,
    careerReadiness,
    missingSkills.length,
    careerGoal,
  ]);

  /* =========================================================
     SORT
     ========================================================= */

  const unlockedAchievements =
    achievements.filter(
      (item) => item.unlocked
    );

  const lockedAchievements =
    achievements.filter(
      (item) => !item.unlocked
    );

  /*
   * Show unlocked achievements first.
   * Maximum 4 on the dashboard so this component
   * doesn't become too tall.
   */

  const visibleAchievements = [
    ...unlockedAchievements,
    ...lockedAchievements,
  ].slice(0, 4);

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <section
        className="
          rounded-3xl
          border border-white/[0.08]
          bg-[#111827]
          p-5
        "
      >
        <div className="animate-pulse">

          <div className="h-5 w-48 rounded bg-slate-800" />

          <div className="mt-5 space-y-3">

            <div className="h-16 rounded-2xl bg-slate-900" />

            <div className="h-16 rounded-2xl bg-slate-900" />

            <div className="h-16 rounded-2xl bg-slate-900" />

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
          GLOW
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
          bg-yellow-500/[0.05]
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
          bg-cyan-500/[0.04]
          blur-3xl
        "
      />

      <div className="relative z-10">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                border
                border-yellow-400/10
                bg-yellow-400/[0.07]
              "
            >
              <Trophy
                size={19}
                className="text-yellow-400"
              />
            </div>

            <div>

              <h2 className="text-base font-bold text-white">
                Recent Achievements
              </h2>

              <p className="mt-0.5 text-[10px] text-slate-500">
                Your career milestones
              </p>

            </div>

          </div>

          {/* UNLOCKED COUNT */}

          <div
            className="
              flex
              items-center
              gap-1.5
              rounded-full
              border
              border-emerald-400/10
              bg-emerald-400/[0.05]
              px-2.5
              py-1
            "
          >

            <CheckCircle2
              size={11}
              className="text-emerald-400"
            />

            <span className="text-[9px] font-semibold text-emerald-400">
              {unlockedAchievements.length} unlocked
            </span>

          </div>

        </div>

        {/* =================================================
            ACHIEVEMENTS
        ================================================= */}

        <div className="mt-5 space-y-2.5">

          {visibleAchievements.map(
            (achievement) => {

              const Icon =
                achievement.icon;

              return (
                <AchievementRow
                  key={achievement.id}
                  achievement={achievement}
                />
              );
            }
          )}

        </div>



        </div>

    </section>
  );
}

/* =========================================================
   ACHIEVEMENT ROW
========================================================= */

function AchievementRow({
  achievement,
}) {
  const Icon = achievement.icon;

  if (!achievement.unlocked) {
    return (
      <div
        className="
          flex
          items-center
          gap-3
          rounded-2xl
          border
          border-white/[0.04]
          bg-white/[0.015]
          p-3
          opacity-60
        "
      >

        <div
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            bg-slate-800
          "
        >
          <Lock
            size={16}
            className="text-slate-500"
          />
        </div>

        <div className="min-w-0 flex-1">

          <div className="flex items-center gap-2">

            <h3 className="truncate text-xs font-semibold text-slate-400">
              {achievement.title}
            </h3>

            <span className="rounded-full bg-slate-800 px-1.5 py-0.5 text-[7px] font-semibold uppercase tracking-wider text-slate-600">
              Locked
            </span>

          </div>

          <p className="mt-1 truncate text-[9px] text-slate-600">
            {achievement.subtitle}
          </p>

        </div>

      </div>
    );
  }

  return (
    <div
      className="
        group
        flex
        items-center
        gap-3
        rounded-2xl
        border
        border-white/[0.05]
        bg-white/[0.025]
        p-3
        transition-all
        duration-300
        hover:border-cyan-400/10
        hover:bg-white/[0.04]
      "
    >

      <div
        className={`
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          ${achievement.color}
        `}
      >
        <Icon
          size={18}
          className={achievement.iconColor}
        />
      </div>

      <div className="min-w-0 flex-1">

        <div className="flex items-center gap-2">

          <h3 className="truncate text-xs font-semibold text-white">
            {achievement.title}
          </h3>

          <CheckCircle2
            size={11}
            className="shrink-0 text-emerald-400"
          />

        </div>

        <p className="mt-1 truncate text-[9px] text-slate-500">
          {achievement.subtitle}
        </p>

      </div>

      <div className="shrink-0">

        <span className="text-[8px] font-semibold uppercase tracking-wider text-emerald-400">
          Earned
        </span>

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
   READINESS CALCULATION
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
  ].filter(
    (value) => value > 0
  );

  if (values.length === 0) {
    return 0;
  }

  const total = values.reduce(
    (sum, value) => sum + value,
    0
  );

  return Math.round(
    total / values.length
  );
}

/* =========================================================
   ICON COMPONENTS
========================================================= */

function FileIcon(props) {
  return (
    <svg
      {...props}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function ShieldIcon(props) {
  return (
    <svg
      {...props}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <polyline points="9 12 11 14 15 10" />
    </svg>
  );
}

function TargetIcon(props) {
  return (
    <svg
      {...props}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  );
}