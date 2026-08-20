import { useMemo } from "react";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Target,
  Award,
  BriefcaseBusiness,
  GraduationCap,
  CheckCircle2,
  Clock3,
  Sparkles,
  ArrowUpRight,
  ArrowRight,
  Brain,
  Code2,
  FileText,
  FolderGit2,
  ShieldCheck,
  Zap,
  ChevronRight,
  AlertTriangle,
  Lightbulb,
  Rocket,
  Star,
  CircleCheck,
} from "lucide-react";

function Analytics() {
  // ============================================================
  // USER
  // ============================================================

  const user = JSON.parse(
    localStorage.getItem("skillbridgeUser") || "null"
  );

  const savedCareer =
    localStorage.getItem("course") ||
    user?.career ||
    "Computer Engineering";

  const savedSubRole =
    localStorage.getItem("careerSubRole") ||
    user?.careerSubRole ||
    "Frontend Development";

  // ============================================================
  // RESUME
  // ============================================================

  const resume = useMemo(() => {
    try {
      return JSON.parse(
        localStorage.getItem("skillbridgeResume") || "null"
      );
    } catch {
      return null;
    }
  }, []);

  const skillsCount = resume?.skills?.length || 0;

  const educationCount =
    resume?.education?.filter(
      (item) => item?.degree || item?.institution
    ).length || 0;

  const experienceCount =
    resume?.experience?.filter(
      (item) => item?.role || item?.company
    ).length || 0;

  const projectsCount =
    resume?.projects?.filter(
      (item) => item?.name || item?.description
    ).length || 0;

  const certificationsCount =
    resume?.certifications?.filter(
      (item) => item?.name || item?.issuer
    ).length || 0;

  // ============================================================
  // SCORES
  // ============================================================

  const resumeScore = Math.min(
    100,
    35 +
      (resume?.personal?.fullName ? 10 : 0) +
      (resume?.personal?.email ? 8 : 0) +
      (resume?.personal?.phone ? 5 : 0) +
      (resume?.personal?.jobTitle ? 7 : 0) +
      (resume?.summary ? 10 : 0) +
      Math.min(skillsCount * 2, 10) +
      Math.min(projectsCount * 2, 10) +
      Math.min(experienceCount * 2, 5)
  );

  const skillScore = Math.min(
    100,
    35 + skillsCount * 6 + projectsCount * 5
  );

  const projectScore = Math.min(
    100,
    25 + projectsCount * 15 + certificationsCount * 3
  );

  const profileScore = Math.min(
    100,
    30 +
      (educationCount > 0 ? 15 : 0) +
      (experienceCount > 0 ? 15 : 0) +
      (projectsCount > 0 ? 15 : 0) +
      (certificationsCount > 0 ? 10 : 0) +
      (skillsCount > 0 ? 15 : 0)
  );

  const roadmapProgress = 38;

  const careerScore = Math.round(
    resumeScore * 0.3 +
      skillScore * 0.25 +
      projectScore * 0.2 +
      profileScore * 0.15 +
      roadmapProgress * 0.1
  );

  const placementChance = Math.min(
    95,
    Math.round(careerScore * 0.82)
  );

  // ============================================================
  // HELPERS
  // ============================================================

  const getScoreLabel = (score) => {
    if (score >= 85) return "Excellent";
    if (score >= 70) return "Strong";
    if (score >= 55) return "Developing";
    return "Needs attention";
  };

  const getScoreColor = (score) => {
    if (score >= 85) return "text-emerald-400";
    if (score >= 70) return "text-cyan-400";
    if (score >= 55) return "text-yellow-400";
    return "text-red-400";
  };

  // ============================================================
  // SKILLS
  // ============================================================

  const skills = resume?.skills || [];

  const displaySkills =
    skills.length > 0
      ? skills.slice(0, 8)
      : [
          "React.js",
          "JavaScript",
          "HTML5",
          "CSS3",
          "Git",
          "UI/UX",
        ];

  // ============================================================
  // AI ACTIONS
  // ============================================================

  const actions = [];

  if (skillsCount < 5) {
    actions.push({
      icon: Code2,
      title: "Strengthen technical skills",
      description:
        "Add role-relevant technologies and demonstrate them through projects.",
      impact: "+8 readiness",
      type: "high",
    });
  }

  if (projectsCount < 2) {
    actions.push({
      icon: FolderGit2,
      title: "Build one strong project",
      description:
        "A polished project gives recruiters concrete evidence of your ability.",
      impact: "+7 readiness",
      type: "high",
    });
  }

  if (!resume?.summary) {
    actions.push({
      icon: FileText,
      title: "Improve your professional summary",
      description:
        "Create a focused summary aligned with your target role.",
      impact: "+5 ATS",
      type: "medium",
    });
  }

  if (experienceCount === 0) {
    actions.push({
      icon: BriefcaseBusiness,
      title: "Gain practical experience",
      description:
        "Internships, freelance work and real-world projects can strengthen your profile.",
      impact: "+6 profile",
      type: "medium",
    });
  }

  if (actions.length === 0) {
    actions.push({
      icon: Sparkles,
      title: "Keep your momentum",
      description:
        "Your profile is progressing well. Continue improving your strongest areas.",
      impact: "+5 readiness",
      type: "high",
    });
  }

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="min-h-screen bg-[#050914] text-white">

      {/* ======================================================
          AMBIENT BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[10%] top-[-180px] h-[420px] w-[420px] rounded-full bg-cyan-500/[0.06] blur-[140px]" />
        <div className="absolute right-[-120px] top-[15%] h-[420px] w-[420px] rounded-full bg-violet-500/[0.06] blur-[150px]" />
        <div className="absolute bottom-[-200px] left-[35%] h-[450px] w-[450px] rounded-full bg-blue-500/[0.04] blur-[150px]" />
      </div>

      <main className="relative mx-auto max-w-[1600px] px-4 py-6 sm:px-6 lg:px-8 xl:px-10">

        {/* ====================================================
            TOP HEADER
        ==================================================== */}

        <header className="mb-8">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <div className="mb-3 flex items-center gap-2">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10">
                  <BarChart3
                    size={18}
                    className="text-cyan-400"
                  />
                </div>

                <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-cyan-400">
                  Career Intelligence
                </span>

              </div>

              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                Your Career
                <span className="ml-2 bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 bg-clip-text text-transparent">
                  Intelligence
                </span>
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                A data-driven view of your career profile, skill strength
                and distance from your target role.
              </p>

            </div>

            {/* Target role */}

            <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-white/[0.025] px-4 py-3 backdrop-blur-xl">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-400/10">
                <Target
                  size={19}
                  className="text-violet-400"
                />
              </div>

              <div>

                <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-600">
                  Target role
                </p>

                <p className="mt-1 text-sm font-semibold text-white">
                  {savedSubRole}
                </p>

              </div>

              <ChevronRight
                size={16}
                className="ml-2 text-slate-700"
              />

            </div>

          </div>

        </header>

        {/* ====================================================
            HERO INTELLIGENCE PANEL
        ==================================================== */}

        <section className="relative overflow-hidden rounded-[30px] border border-cyan-400/10 bg-gradient-to-br from-[#0b1626] via-[#09111e] to-[#090d18] shadow-2xl shadow-black/30">

          <div className="absolute right-[-120px] top-[-160px] h-[420px] w-[420px] rounded-full bg-cyan-400/[0.07] blur-[100px]" />

          <div className="absolute bottom-[-180px] left-[25%] h-[350px] w-[350px] rounded-full bg-violet-500/[0.05] blur-[100px]" />

          <div className="relative grid lg:grid-cols-[1.15fr_0.85fr]">

            {/* LEFT */}

            <div className="border-b border-slate-800/70 p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">

              <div className="flex flex-col gap-8 sm:flex-row sm:items-center">

                {/* Score */}

                <div className="relative flex h-48 w-48 flex-shrink-0 items-center justify-center">

                  <div
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `conic-gradient(#22d3ee ${careerScore}%, #172033 ${careerScore}% 100%)`,
                    }}
                  />

                  <div className="absolute inset-[7px] rounded-full bg-[#09111e]" />

                  <div className="relative text-center">

                    <p className="text-5xl font-bold tracking-tight text-white">
                      {careerScore}
                    </p>

                    <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
                      Readiness
                    </p>

                  </div>

                </div>

                <div className="flex-1">

                  <div className="flex items-center gap-2">

                    <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                      {getScoreLabel(careerScore)}
                    </span>

                    <span className="flex items-center gap-1 text-xs text-emerald-400">
                      <TrendingUp size={13} />
                      Improving
                    </span>

                  </div>

                  <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
                    You're building a strong foundation.
                  </h2>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
                    Your current profile shows measurable progress toward
                    becoming a{" "}
                    <span className="font-semibold text-slate-300">
                      {savedSubRole}
                    </span>
                    . Focus on the highest-impact gaps to accelerate your
                    readiness.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">

                    <div className="rounded-xl border border-slate-800 bg-black/20 px-4 py-3">

                      <p className="text-[9px] uppercase tracking-wider text-slate-600">
                        Placement probability
                      </p>

                      <p className="mt-1 text-xl font-bold text-emerald-400">
                        {placementChance}%
                      </p>

                    </div>

                    <div className="rounded-xl border border-slate-800 bg-black/20 px-4 py-3">

                      <p className="text-[9px] uppercase tracking-wider text-slate-600">
                        Profile strength
                      </p>

                      <p className="mt-1 text-xl font-bold text-cyan-400">
                        {profileScore}%
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            {/* RIGHT — intelligence metrics */}

            <div className="grid grid-cols-2">

              <MetricTile
                icon={FileText}
                label="Resume"
                value={resumeScore}
                suffix="/100"
                color="blue"
              />

              <MetricTile
                icon={Code2}
                label="Skills"
                value={skillScore}
                suffix="%"
                color="purple"
              />

              <MetricTile
                icon={FolderGit2}
                label="Projects"
                value={projectScore}
                suffix="%"
                color="cyan"
              />

              <MetricTile
                icon={ShieldCheck}
                label="Profile"
                value={profileScore}
                suffix="%"
                color="emerald"
              />

            </div>

          </div>

        </section>

        {/* ====================================================
            CAREER POSITION
        ==================================================== */}

        <section className="mt-6 rounded-[28px] border border-slate-800 bg-[#080e19] p-6 sm:p-8">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>

              <div className="flex items-center gap-2">

                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-400/10">
                  <Brain
                    size={18}
                    className="text-violet-400"
                  />
                </div>

                <div>

                  <h2 className="text-lg font-bold">
                    Career Position
                  </h2>

                  <p className="text-xs text-slate-600">
                    Where you are compared with your target
                  </p>

                </div>

              </div>

            </div>

            <div className="rounded-full border border-slate-800 bg-slate-950 px-4 py-2 text-xs text-slate-500">
              {savedCareer} → {savedSubRole}
            </div>

          </div>

          <div className="mt-8">

            <div className="relative h-2 rounded-full bg-slate-800">

              <div
                className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500"
                style={{
                  width: `${careerScore}%`,
                }}
              />

              <div
                className="absolute top-1/2 h-6 w-6 -translate-y-1/2 rounded-full border-4 border-[#080e19] bg-cyan-400 shadow-[0_0_25px_rgba(34,211,238,0.5)]"
                style={{
                  left: `calc(${careerScore}% - 12px)`,
                }}
              />

            </div>

            <div className="mt-4 flex justify-between">

              <div>
                <p className="text-xs font-semibold text-slate-400">
                  Current foundation
                </p>
                <p className="mt-1 text-[10px] text-slate-600">
                  Skills & education
                </p>
              </div>

              <div className="text-right">
                <p className="text-xs font-semibold text-slate-300">
                  Target: {savedSubRole}
                </p>
                <p className="mt-1 text-[10px] text-slate-600">
                  Job-ready profile
                </p>
              </div>

            </div>

          </div>

        </section>

        {/* ====================================================
            SKILL INTELLIGENCE + PROFILE EVIDENCE
        ==================================================== */}

        <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.35fr_0.65fr]">

          {/* SKILL INTELLIGENCE */}

          <section className="rounded-[28px] border border-slate-800 bg-[#080e19] p-6 sm:p-8">

            <div className="flex items-center justify-between">

              <div>

                <div className="flex items-center gap-2">

                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/10">
                    <Code2
                      size={18}
                      className="text-cyan-400"
                    />
                  </div>

                  <div>

                    <h2 className="text-lg font-bold">
                      Skill Intelligence
                    </h2>

                    <p className="text-xs text-slate-600">
                      Strength relative to your target role
                    </p>

                  </div>

                </div>

              </div>

              <span className="rounded-full border border-cyan-400/10 bg-cyan-400/5 px-3 py-1.5 text-[10px] font-semibold text-cyan-400">
                {skillsCount} detected
              </span>

            </div>

            <div className="mt-7 space-y-5">

              {displaySkills.map((skill, index) => {

                const value = Math.min(
                  92,
                  Math.max(
                    52,
                    skillScore - index * 5
                  )
                );

                return (
                  <div key={`${skill}-${index}`}>

                    <div className="mb-2 flex items-center justify-between">

                      <div className="flex items-center gap-2">

                        <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />

                        <span className="text-sm text-slate-300">
                          {typeof skill === "string"
                            ? skill
                            : skill?.name || `Skill ${index + 1}`}
                        </span>

                      </div>

                      <span className="text-xs font-semibold text-slate-500">
                        {value}%
                      </span>

                    </div>

                    <div className="h-1.5 overflow-hidden rounded-full bg-slate-800">

                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                        style={{
                          width: `${value}%`,
                        }}
                      />

                    </div>

                  </div>
                );
              })}

            </div>

            <div className="mt-7 rounded-2xl border border-yellow-400/10 bg-yellow-400/[0.03] p-4">

              <div className="flex gap-3">

                <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-yellow-400/10">
                  <AlertTriangle
                    size={17}
                    className="text-yellow-400"
                  />
                </div>

                <div>

                  <p className="text-sm font-semibold text-slate-200">
                    Biggest opportunity
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-600">
                    Increase practical depth by connecting your skills
                    to real projects and measurable outcomes.
                  </p>

                </div>

              </div>

            </div>

          </section>

          {/* PROFILE EVIDENCE */}

          <section className="rounded-[28px] border border-slate-800 bg-[#080e19] p-6 sm:p-8">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-400/10">
                <Award
                  size={18}
                  className="text-emerald-400"
                />
              </div>

              <div>

                <h2 className="text-lg font-bold">
                  Profile Evidence
                </h2>

                <p className="text-xs text-slate-600">
                  Recruiter-visible signals
                </p>

              </div>

            </div>

            <div className="mt-6 space-y-3">

              <EvidenceRow
                icon={Code2}
                label="Technical skills"
                value={skillsCount}
              />

              <EvidenceRow
                icon={FolderGit2}
                label="Projects"
                value={projectsCount}
              />

              <EvidenceRow
                icon={BriefcaseBusiness}
                label="Experience"
                value={experienceCount}
              />

              <EvidenceRow
                icon={GraduationCap}
                label="Education"
                value={educationCount}
              />

              <EvidenceRow
                icon={Award}
                label="Certifications"
                value={certificationsCount}
              />

            </div>

          </section>

        </div>

        {/* ====================================================
            RESUME INTELLIGENCE
        ==================================================== */}

        <section className="mt-6 rounded-[28px] border border-slate-800 bg-[#080e19] p-6 sm:p-8">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-400/10">
                <FileText
                  size={19}
                  className="text-blue-400"
                />
              </div>

              <div>

                <h2 className="text-lg font-bold">
                  Resume Intelligence
                </h2>

                <p className="text-xs text-slate-600">
                  How recruiter-ready your resume currently appears
                </p>

              </div>

            </div>

            <div className="flex items-center gap-2 rounded-full border border-blue-400/10 bg-blue-400/5 px-3 py-1.5">

              <CircleCheck
                size={13}
                className="text-blue-400"
              />

              <span className="text-[10px] font-semibold text-blue-400">
                ATS compatible foundation
              </span>

            </div>

          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

            <ResumeMetric
              title="ATS Score"
              value={resumeScore}
              icon={ShieldCheck}
            />

            <ResumeMetric
              title="Content Strength"
              value={Math.min(100, resumeScore + 4)}
              icon={FileText}
            />

            <ResumeMetric
              title="Keyword Match"
              value={Math.min(100, skillScore + 2)}
              icon={Target}
            />

            <ResumeMetric
              title="Impact"
              value={Math.min(100, projectScore + 3)}
              icon={Zap}
            />

          </div>

        </section>

        {/* ====================================================
            AI ACTION CENTER
        ==================================================== */}

        <section className="mt-6 overflow-hidden rounded-[28px] border border-violet-400/10 bg-gradient-to-br from-[#110f20] via-[#0b0d18] to-[#080c15] p-6 sm:p-8">

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-3">

              <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-violet-400/10">

                <Sparkles
                  size={20}
                  className="text-violet-400"
                />

                <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-violet-400" />

              </div>

              <div>

                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-violet-400">
                  AI Priority Engine
                </p>

                <h2 className="mt-1 text-xl font-bold">
                  What should you do next?
                </h2>

              </div>

            </div>

            <span className="rounded-full border border-violet-400/10 bg-violet-400/5 px-3 py-1.5 text-[10px] text-violet-300">
              Personalized recommendations
            </span>

          </div>

          <div className="mt-7 grid grid-cols-1 gap-3 lg:grid-cols-2">

            {actions.slice(0, 4).map((action, index) => {

              const Icon = action.icon;

              return (
                <div
                  key={`${action.title}-${index}`}
                  className="group rounded-2xl border border-slate-800/80 bg-black/20 p-4 transition-all duration-300 hover:border-violet-400/20 hover:bg-violet-400/[0.03]"
                >

                  <div className="flex gap-4">

                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-slate-900 text-violet-400 transition group-hover:bg-violet-400/10">
                      <Icon size={18} />
                    </div>

                    <div className="min-w-0 flex-1">

                      <div className="flex items-start justify-between gap-3">

                        <h3 className="text-sm font-semibold text-white">
                          {action.title}
                        </h3>

                        <span
                          className={`flex-shrink-0 rounded-full px-2 py-1 text-[9px] font-bold ${
                            action.type === "high"
                              ? "bg-emerald-400/10 text-emerald-400"
                              : "bg-yellow-400/10 text-yellow-400"
                          }`}
                        >
                          {action.impact}
                        </span>

                      </div>

                      <p className="mt-1 text-xs leading-5 text-slate-600">
                        {action.description}
                      </p>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>

        </section>

        {/* ====================================================
            FINAL CTA
        ==================================================== */}

        <section className="relative mt-6 overflow-hidden rounded-[28px] border border-cyan-400/10 bg-gradient-to-r from-cyan-500/[0.08] via-blue-500/[0.04] to-violet-500/[0.08] p-6 sm:p-8">

          <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-cyan-400/[0.05] to-transparent" />

          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div className="max-w-2xl">

              <div className="flex items-center gap-2">

                <Rocket
                  size={17}
                  className="text-cyan-400"
                />

                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">
                  Next milestone
                </span>

              </div>

              <h2 className="mt-2 text-2xl font-bold">
                Close the gap. Become job ready.
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Your biggest gains will come from strengthening practical
                skills, building evidence through projects and continuously
                improving your resume.
              </p>

            </div>

            <div className="flex items-center gap-4">

              <div className="text-right">

                <p className="text-3xl font-bold text-cyan-400">
                  {100 - careerScore}
                </p>

                <p className="text-[9px] uppercase tracking-wider text-slate-600">
                  points to close
                </p>

              </div>

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">
                <ArrowRight
                  size={20}
                  className="text-cyan-400"
                />
              </div>

            </div>

          </div>

        </section>

        <p className="mt-6 pb-4 text-center text-[10px] text-slate-700">
          SkillBridge AI • Career Intelligence Engine • v1.0
        </p>

      </main>
    </div>
  );
}

// ================================================================
// COMPONENTS
// ================================================================

function MetricTile({
  icon: Icon,
  label,
  value,
  suffix,
  color,
}) {
  const colors = {
    blue: "text-blue-400 bg-blue-400/10",
    purple: "text-purple-400 bg-purple-400/10",
    cyan: "text-cyan-400 bg-cyan-400/10",
    emerald: "text-emerald-400 bg-emerald-400/10",
  };

  return (
    <div className="border-b border-r border-slate-800/70 p-5 transition hover:bg-white/[0.015] sm:p-6">

      <div
        className={`flex h-9 w-9 items-center justify-center rounded-xl ${colors[color]}`}
      >
        <Icon size={17} />
      </div>

      <p className="mt-5 text-xs text-slate-600">
        {label}
      </p>

      <div className="mt-1 flex items-baseline gap-1">

        <span className="text-2xl font-bold">
          {value}
        </span>

        <span className="text-xs text-slate-600">
          {suffix}
        </span>

      </div>

    </div>
  );
}

function EvidenceRow({
  icon: Icon,
  label,
  value,
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-800/70 bg-slate-950/40 px-3 py-3">

      <div className="flex items-center gap-3">

        <Icon
          size={16}
          className="text-slate-500"
        />

        <span className="text-xs text-slate-400">
          {label}
        </span>

      </div>

      <span
        className={`text-sm font-bold ${
          value > 0
            ? "text-white"
            : "text-slate-700"
        }`}
      >
        {value}
      </span>

    </div>
  );
}

function ResumeMetric({
  title,
  value,
  icon: Icon,
}) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-950/50 p-4">

      <div className="flex items-center justify-between">

        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900">
          <Icon
            size={15}
            className="text-cyan-400"
          />
        </div>

        <span className="text-[10px] font-semibold text-slate-600">
          /100
        </span>

      </div>

      <p className="mt-4 text-xs text-slate-600">
        {title}
      </p>

      <div className="mt-1 flex items-baseline gap-2">

        <span className="text-2xl font-bold text-white">
          {value}
        </span>

        <span
          className={`text-[10px] ${
            value >= 70
              ? "text-emerald-400"
              : "text-yellow-400"
          }`}
        >
          {value >= 70 ? "Strong" : "Improve"}
        </span>

      </div>

      <div className="mt-3 h-1 overflow-hidden rounded-full bg-slate-800">

        <div
          className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
          style={{
            width: `${value}%`,
          }}
        />

      </div>

    </div>
  );
}

export default Analytics;