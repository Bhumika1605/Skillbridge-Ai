import { useMemo, useState } from "react";
import {
  CheckCircle2,
  Clock3,
  BookOpen,
  Target,
  Trophy,
  ArrowRight,
  BriefcaseBusiness,
  Code2,
  GitBranch,
  FolderGit2,
  MonitorPlay,
  Sparkles,
} from "lucide-react";

function CareerRoadmap() {
  // ============================================================
  // USER CAREER
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
  // ROADMAP DATA
  // ============================================================

  const roadmapData = {
    "Frontend Development": [
      {
        title: "HTML & CSS Fundamentals",
        category: "Core Fundamentals",
        description:
          "Build strong foundations in semantic HTML, responsive layouts, Flexbox and CSS Grid.",
        icon: <Code2 size={21} />,
        resource: "HTML & CSS",
      },
      {
        title: "JavaScript Essentials",
        category: "Programming",
        description:
          "Learn DOM manipulation, events, functions, arrays, objects and modern JavaScript.",
        icon: <Code2 size={21} />,
        resource: "JavaScript",
      },
      {
        title: "React.js",
        category: "Framework",
        description:
          "Build component-based interfaces using React, hooks, props and state management.",
        icon: <MonitorPlay size={21} />,
        resource: "React.js",
      },
      {
        title: "Git & GitHub",
        category: "Developer Tools",
        description:
          "Learn version control, repositories, branching and professional collaboration.",
        icon: <GitBranch size={21} />,
        resource: "Git & GitHub",
      },
      {
        title: "API Integration",
        category: "Practical Skills",
        description:
          "Connect frontend applications with REST APIs and handle real-world data.",
        icon: <FolderGit2 size={21} />,
        resource: "REST APIs",
      },
      {
        title: "Build Real Projects",
        category: "Projects",
        description:
          "Create portfolio-ready applications that demonstrate your technical skills.",
        icon: <BriefcaseBusiness size={21} />,
        resource: "Projects",
      },
      {
        title: "Portfolio Development",
        category: "Career",
        description:
          "Present your projects, skills and achievements through a professional portfolio.",
        icon: <Target size={21} />,
        resource: "Portfolio",
      },
      {
        title: "Interview Preparation",
        category: "Placement",
        description:
          "Prepare technical, HR and project-based interview questions.",
        icon: <Trophy size={21} />,
        resource: "Interview Prep",
      },
    ],

    "Backend Development": [
      {
        title: "Programming Fundamentals",
        category: "Core Fundamentals",
        description:
          "Strengthen programming logic, functions, data structures and problem solving.",
        icon: <Code2 size={21} />,
        resource: "Programming",
      },
      {
        title: "Database Fundamentals",
        category: "Database",
        description:
          "Learn SQL, relational databases, queries and database design.",
        icon: <FolderGit2 size={21} />,
        resource: "SQL",
      },
      {
        title: "Backend Framework",
        category: "Framework",
        description:
          "Learn Node.js, Express and backend application architecture.",
        icon: <Code2 size={21} />,
        resource: "Node.js",
      },
      {
        title: "REST API Development",
        category: "APIs",
        description:
          "Build secure and scalable APIs for real-world applications.",
        icon: <GitBranch size={21} />,
        resource: "REST APIs",
      },
      {
        title: "Authentication",
        category: "Security",
        description:
          "Implement login systems, authentication and authorization.",
        icon: <Target size={21} />,
        resource: "Authentication",
      },
      {
        title: "Build Backend Projects",
        category: "Projects",
        description:
          "Create practical backend applications to demonstrate your skills.",
        icon: <BriefcaseBusiness size={21} />,
        resource: "Projects",
      },
      {
        title: "Deployment",
        category: "DevOps",
        description:
          "Learn how to deploy applications and manage production environments.",
        icon: <MonitorPlay size={21} />,
        resource: "Deployment",
      },
      {
        title: "Interview Preparation",
        category: "Placement",
        description:
          "Prepare backend, database and problem-solving interview questions.",
        icon: <Trophy size={21} />,
        resource: "Interview Prep",
      },
    ],

    "Full Stack Development": [
      {
        title: "HTML, CSS & JavaScript",
        category: "Frontend Foundations",
        description:
          "Build a strong frontend foundation before moving into full-stack development.",
        icon: <Code2 size={21} />,
        resource: "Frontend",
      },
      {
        title: "React.js",
        category: "Frontend",
        description:
          "Create modern interactive interfaces using React.",
        icon: <MonitorPlay size={21} />,
        resource: "React.js",
      },
      {
        title: "Node.js & Express",
        category: "Backend",
        description:
          "Build backend services and REST APIs using Node.js.",
        icon: <Code2 size={21} />,
        resource: "Node.js",
      },
      {
        title: "SQL & Database",
        category: "Database",
        description:
          "Store, retrieve and manage application data efficiently.",
        icon: <FolderGit2 size={21} />,
        resource: "SQL",
      },
      {
        title: "Authentication & APIs",
        category: "Integration",
        description:
          "Connect frontend and backend systems with secure authentication.",
        icon: <GitBranch size={21} />,
        resource: "APIs",
      },
      {
        title: "Full Stack Project",
        category: "Projects",
        description:
          "Build one complete application from frontend to database.",
        icon: <BriefcaseBusiness size={21} />,
        resource: "Full Stack Project",
      },
      {
        title: "Deployment",
        category: "Production",
        description:
          "Deploy your complete application and make it publicly accessible.",
        icon: <Target size={21} />,
        resource: "Deployment",
      },
      {
        title: "Interview Preparation",
        category: "Placement",
        description:
          "Prepare for full-stack technical and project-based interviews.",
        icon: <Trophy size={21} />,
        resource: "Interview Prep",
      },
    ],

    "UI/UX Designer": [
      {
        title: "Design Fundamentals",
        category: "Foundations",
        description:
          "Learn visual hierarchy, typography, spacing, color and composition.",
        icon: <Sparkles size={21} />,
        resource: "Design Fundamentals",
      },
      {
        title: "Figma",
        category: "Design Tool",
        description:
          "Learn professional UI design and prototyping using Figma.",
        icon: <MonitorPlay size={21} />,
        resource: "Figma",
      },
      {
        title: "User Research",
        category: "UX",
        description:
          "Understand users, their problems and how to design better experiences.",
        icon: <Target size={21} />,
        resource: "UX Research",
      },
      {
        title: "Wireframing",
        category: "UX Design",
        description:
          "Turn ideas into structured wireframes and user flows.",
        icon: <FolderGit2 size={21} />,
        resource: "Wireframing",
      },
      {
        title: "Design Systems",
        category: "Advanced",
        description:
          "Create reusable components, styles and consistent interfaces.",
        icon: <Code2 size={21} />,
        resource: "Design Systems",
      },
      {
        title: "Real World Projects",
        category: "Projects",
        description:
          "Design complete applications and document your design decisions.",
        icon: <BriefcaseBusiness size={21} />,
        resource: "Projects",
      },
      {
        title: "Portfolio",
        category: "Career",
        description:
          "Create a professional portfolio showcasing your strongest work.",
        icon: <Target size={21} />,
        resource: "Portfolio",
      },
      {
        title: "Design Interview Preparation",
        category: "Placement",
        description:
          "Prepare for portfolio reviews, design challenges and interviews.",
        icon: <Trophy size={21} />,
        resource: "Interview Prep",
      },
    ],

    "Data Scientist": [
      {
        title: "Python Fundamentals",
        category: "Programming",
        description:
          "Build strong Python programming and problem-solving skills.",
        icon: <Code2 size={21} />,
        resource: "Python",
      },
      {
        title: "Statistics",
        category: "Mathematics",
        description:
          "Learn probability, statistics and data interpretation.",
        icon: <Target size={21} />,
        resource: "Statistics",
      },
      {
        title: "Pandas & NumPy",
        category: "Data Analysis",
        description:
          "Clean, transform and analyze datasets using Python libraries.",
        icon: <FolderGit2 size={21} />,
        resource: "Pandas & NumPy",
      },
      {
        title: "Data Visualization",
        category: "Analytics",
        description:
          "Create meaningful visualizations and communicate data insights.",
        icon: <MonitorPlay size={21} />,
        resource: "Data Visualization",
      },
      {
        title: "Machine Learning",
        category: "AI / ML",
        description:
          "Understand supervised and unsupervised machine learning algorithms.",
        icon: <Sparkles size={21} />,
        resource: "Machine Learning",
      },
      {
        title: "Data Science Projects",
        category: "Projects",
        description:
          "Build real-world projects using datasets and machine learning.",
        icon: <BriefcaseBusiness size={21} />,
        resource: "Projects",
      },
      {
        title: "Portfolio & GitHub",
        category: "Career",
        description:
          "Publish your strongest data science projects and notebooks.",
        icon: <GitBranch size={21} />,
        resource: "GitHub",
      },
      {
        title: "Interview Preparation",
        category: "Placement",
        description:
          "Prepare statistics, Python, SQL and machine learning questions.",
        icon: <Trophy size={21} />,
        resource: "Interview Prep",
      },
    ],

    "AI Engineer": [
      {
        title: "Python Programming",
        category: "Programming",
        description:
          "Strengthen Python programming, data structures and problem solving.",
        icon: <Code2 size={21} />,
        resource: "Python",
      },
      {
        title: "Mathematics for AI",
        category: "Foundations",
        description:
          "Learn the mathematical concepts behind machine learning.",
        icon: <Target size={21} />,
        resource: "Math for AI",
      },
      {
        title: "Machine Learning",
        category: "AI / ML",
        description:
          "Understand machine learning algorithms and model evaluation.",
        icon: <Sparkles size={21} />,
        resource: "Machine Learning",
      },
      {
        title: "Deep Learning",
        category: "Advanced AI",
        description:
          "Learn neural networks, training and deep learning architectures.",
        icon: <MonitorPlay size={21} />,
        resource: "Deep Learning",
      },
      {
        title: "Generative AI",
        category: "Modern AI",
        description:
          "Explore LLMs, prompt engineering and AI application development.",
        icon: <Sparkles size={21} />,
        resource: "Generative AI",
      },
      {
        title: "AI Projects",
        category: "Projects",
        description:
          "Build practical AI applications that demonstrate your skills.",
        icon: <BriefcaseBusiness size={21} />,
        resource: "AI Projects",
      },
      {
        title: "Deploy AI Applications",
        category: "Production",
        description:
          "Learn how to integrate and deploy AI models into applications.",
        icon: <GitBranch size={21} />,
        resource: "AI Deployment",
      },
      {
        title: "AI Interview Preparation",
        category: "Placement",
        description:
          "Prepare machine learning, Python and AI system questions.",
        icon: <Trophy size={21} />,
        resource: "Interview Prep",
      },
    ],
  };

  // ============================================================
  // SELECT ROADMAP
  // ============================================================

  const roadmap = useMemo(() => {
    return (
      roadmapData[savedSubRole] ||
      roadmapData["Frontend Development"]
    );
  }, [savedSubRole]);

  // ============================================================
  // COMPLETED STAGES
  // ============================================================

  const [completed, setCompleted] = useState([0, 1, 2]);

  const toggleCompleted = (index) => {
    setCompleted((previous) => {
      if (previous.includes(index)) {
        return previous.filter((item) => item !== index);
      }

      return [...previous, index];
    });
  };

  // ============================================================
  // PROGRESS
  // ============================================================

  const progress = Math.round(
    (completed.length / roadmap.length) * 100
  );

  const currentIndex = roadmap.findIndex(
    (_, index) => !completed.includes(index)
  );

  const currentStage =
    currentIndex === -1
      ? roadmap[roadmap.length - 1]
      : roadmap[currentIndex];

  const completedCount = completed.length;

  // ============================================================
  // ACTION PLAN
  // ============================================================

  const actionPlan = [
    `Complete ${currentStage.title}`,
    `Practice ${currentStage.resource} with a small task`,
    "Add your work to your SkillBridge portfolio",
  ];

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="min-h-screen bg-slate-950 p-5 md:p-8 text-white">

      {/* ========================================================
          HEADER
      ======================================================== */}

      <div className="mb-8">

        <div className="flex flex-wrap items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-400/20">
            <Target
              size={22}
              className="text-cyan-400"
            />
          </div>

          <div>

            <div className="flex flex-wrap items-center gap-2">

              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
                Career Roadmap
              </h1>

              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-400">
                AI Personalized
              </span>

            </div>

            <p className="mt-1 text-sm text-slate-400">
              Your step-by-step path from learning to career readiness.
            </p>

          </div>

        </div>

      </div>

      {/* ========================================================
          HERO
      ======================================================== */}

      <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6 md:p-8">

        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-8">

          <div>

            <p className="text-xs uppercase tracking-[0.2em] text-cyan-400 font-semibold">
              Your Career Path
            </p>

            <h2 className="mt-3 text-3xl md:text-4xl font-bold">
              {savedSubRole}
            </h2>

            <p className="mt-3 max-w-2xl text-slate-400 leading-7">
              A personalized roadmap for{" "}
              <span className="text-white font-semibold">
                {savedCareer}
              </span>
              . Complete each stage to build the skills,
              projects and experience needed for your target role.
            </p>

            <div className="mt-5 flex flex-wrap gap-2">

              <span className="rounded-full bg-slate-800 px-3 py-1.5 text-xs text-slate-300">
                {savedCareer}
              </span>

              <span className="rounded-full bg-cyan-500/10 border border-cyan-400/20 px-3 py-1.5 text-xs text-cyan-400">
                {roadmap.length} stages
              </span>

            </div>

          </div>

          {/* Progress */}

          <div className="w-full xl:w-[360px]">

            <div className="flex items-end justify-between mb-3">

              <div>

                <p className="text-sm text-slate-500">
                  Overall Progress
                </p>

                <p className="mt-1 text-3xl font-bold text-white">
                  {progress}%
                </p>

              </div>

              <p className="text-xs text-slate-500">
                {completedCount} of {roadmap.length} completed
              </p>

            </div>

            <div className="h-3 w-full overflow-hidden rounded-full bg-slate-800">

              <div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500"
                style={{
                  width: `${progress}%`,
                }}
              />

            </div>

          </div>

        </div>

      </section>

      {/* ========================================================
          STATS
      ======================================================== */}

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

          <div className="flex items-center gap-3">

            <CheckCircle2
              size={20}
              className="text-green-400"
            />

            <p className="text-sm text-slate-400">
              Completed Stages
            </p>

          </div>

          <p className="mt-3 text-3xl font-bold">
            {completedCount}
          </p>

        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

          <div className="flex items-center gap-3">

            <Clock3
              size={20}
              className="text-cyan-400"
            />

            <p className="text-sm text-slate-400">
              Current Focus
            </p>

          </div>

          <p className="mt-3 text-xl font-bold text-white">
            {currentStage.title}
          </p>

        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-5">

          <div className="flex items-center gap-3">

            <Trophy
              size={20}
              className="text-yellow-400"
            />

            <p className="text-sm text-slate-400">
              Career Goal
            </p>

          </div>

          <p className="mt-3 text-xl font-bold text-white">
            Job Ready
          </p>

        </div>

      </div>

      {/* ========================================================
          MAIN CONTENT
      ======================================================== */}

      <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* ======================================================
            ROADMAP
        ====================================================== */}

        <section className="xl:col-span-2 rounded-3xl border border-slate-800 bg-slate-900 p-6">

          <div className="flex items-center justify-between mb-6">

            <div>

              <h2 className="text-xl font-bold">
                Learning Journey
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Complete each stage at your own pace.
              </p>

            </div>

            <BookOpen
              size={22}
              className="text-cyan-400"
            />

          </div>

          <div className="space-y-3">

            {roadmap.map((item, index) => {

              const isCompleted =
                completed.includes(index);

              const isCurrent =
                index === currentIndex;

              return (

                <div
                  key={item.title}
                  className={`relative rounded-2xl border p-4 transition-all ${
                    isCurrent
                      ? "border-cyan-400/30 bg-cyan-400/5"
                      : isCompleted
                      ? "border-green-400/10 bg-green-400/[0.03]"
                      : "border-slate-800 bg-slate-950/40"
                  }`}
                >

                  <div className="flex items-start gap-4">

                    {/* Number */}

                    <div
                      className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl ${
                        isCompleted
                          ? "bg-green-400/10 text-green-400"
                          : isCurrent
                          ? "bg-cyan-400/10 text-cyan-400"
                          : "bg-slate-800 text-slate-500"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 size={21} />
                      ) : (
                        item.icon
                      )}
                    </div>

                    {/* Content */}

                    <div className="min-w-0 flex-1">

                      <div className="flex flex-wrap items-center gap-2">

                        <span className="text-xs font-medium text-slate-500">
                          Stage {index + 1}
                        </span>

                        {isCurrent && (
                          <span className="rounded-full bg-cyan-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-cyan-400">
                            Current Focus
                          </span>
                        )}

                        {isCompleted && (
                          <span className="rounded-full bg-green-400/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-green-400">
                            Completed
                          </span>
                        )}

                      </div>

                      <h3 className="mt-1 text-base font-bold text-white">
                        {item.title}
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        {item.description}
                      </p>

                      <p className="mt-2 text-xs text-slate-600">
                        {item.category}
                      </p>

                    </div>

                    {/* Complete */}

                    <button
                      onClick={() =>
                        toggleCompleted(index)
                      }
                      className={`flex-shrink-0 rounded-xl px-3 py-2 text-xs font-semibold transition ${
                        isCompleted
                          ? "bg-green-400/10 text-green-400 hover:bg-red-400/10 hover:text-red-400"
                          : "bg-slate-800 text-slate-300 hover:bg-cyan-400/10 hover:text-cyan-400"
                      }`}
                    >
                      {isCompleted
                        ? "Completed"
                        : "Mark Done"}
                    </button>

                  </div>

                </div>

              );
            })}

          </div>

        </section>

        {/* ======================================================
            CURRENT FOCUS
        ====================================================== */}

        <section className="space-y-6">

          {/* Current Focus */}

          <div className="rounded-3xl border border-cyan-400/20 bg-cyan-400/[0.04] p-6">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10">

                <Sparkles
                  size={19}
                  className="text-cyan-400"
                />

              </div>

              <div>

                <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                  Recommended Focus
                </p>

                <p className="text-sm text-slate-500">
                  Based on your roadmap
                </p>

              </div>

            </div>

            <h2 className="mt-6 text-2xl font-bold">
              {currentStage.title}
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              {currentStage.description}
            </p>

            <div className="mt-5 rounded-2xl bg-slate-900 border border-slate-800 p-4">

              <p className="text-xs uppercase tracking-wider text-slate-500">
                Why this matters
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                Completing this stage strengthens your
                {` ${savedSubRole}`} profile and moves you
                closer to being ready for real opportunities.
              </p>

            </div>

          </div>

          {/* Action Plan */}

          <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

            <div className="flex items-center gap-3">

              <Target
                size={20}
                className="text-cyan-400"
              />

              <h2 className="text-lg font-bold">
                Your Action Plan
              </h2>

            </div>

            <div className="mt-5 space-y-3">

              {actionPlan.map((action, index) => (

                <div
                  key={action}
                  className="flex items-start gap-3 rounded-xl bg-slate-800/70 p-4"
                >

                  <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg bg-slate-700 text-xs font-bold text-cyan-400">
                    {index + 1}
                  </div>

                  <p className="text-sm leading-5 text-slate-300">
                    {action}
                  </p>

                </div>

              ))}

            </div>

          </div>

          {/* ====================================================
              CAREER READINESS — MOVED TO RIGHT SIDE ONLY
          ==================================================== */}

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

            <div className="flex items-center justify-between gap-4">

              <div>

                <h2 className="text-xl font-bold">
                  Career Readiness
                </h2>

                <p className="mt-4 text-sm text-slate-500">
                  Keep progressing through your roadmap to strengthen
                  your overall career profile.
                </p>

              </div>

              <div className="text-right flex-shrink-0">

                <p className="text-4xl font-bold text-cyan-400">
                  {progress}%
                </p>

                <p className="text-xs text-slate-500">
                  Roadmap completion
                </p>

              </div>

            </div>

            <div className="mt-5 grid grid-cols-1 gap-3">

              <div className="rounded-2xl bg-slate-950/60 border border-slate-800 p-4">

                <p className="text-sm text-slate-500">
                  Skills
                </p>

                <p className="mt-2 text-lg font-bold">
                  {completedCount} stages completed
                </p>

              </div>

              <div className="rounded-2xl bg-slate-950/60 border border-slate-800 p-4">

                <p className="text-sm text-slate-500">
                  Projects
                </p>

                <p className="mt-2 text-lg font-bold">
                  Build portfolio projects
                </p>

              </div>

              <div className="rounded-2xl bg-slate-950/60 border border-slate-800 p-4">

                <p className="text-sm text-slate-500">
                  Next milestone
                </p>

                <p className="mt-2 text-lg font-bold">
                  {currentStage.title}
                </p>

              </div>

            </div>

          </section>

        </section>

      </div>

      {/* ========================================================
          CONTINUE
      ======================================================== */}

      <section className="mt-6 rounded-3xl border border-slate-800 bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-transparent p-6 md:p-8">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          <div>

            <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              Next Milestone
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              {currentStage.title}
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
              Focus on this stage next. Once completed,
              your roadmap progress will update automatically.
            </p>

          </div>

          <button
            onClick={() => {
              if (currentIndex !== -1) {
                toggleCompleted(currentIndex);
              }
            }}
            disabled={currentIndex === -1}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
          >

            {currentIndex === -1
              ? "Roadmap Completed"
              : "Mark as Completed"}

            <ArrowRight size={17} />

          </button>

        </div>

      </section>

      {/* ========================================================
          COMPLETED MESSAGE
      ======================================================== */}

      {completedCount === roadmap.length && (

        <div className="mt-6 flex items-center gap-4 rounded-2xl border border-green-400/20 bg-green-400/5 p-5">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-400/10">

            <Trophy
              size={22}
              className="text-green-400"
            />

          </div>

          <div>

            <h3 className="font-bold text-green-400">
              Roadmap Completed 🎉
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              You've completed every stage of your
              {` ${savedSubRole}`} roadmap.
              Now focus on projects, internships and interviews.
            </p>

          </div>

        </div>

      )}

    </div>
  );
}

export default CareerRoadmap;