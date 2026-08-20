import {
  ArrowRight,
  BriefcaseBusiness,
  FileSearch,
  FileText,
  GraduationCap,
  Map,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function CareerActionCenter() {
  const navigate = useNavigate();

  const actions = [
    {
      title: "Analyze Your Resume",
      description:
        "Check your resume score, ATS compatibility, skills and improvement areas.",
      icon: FileSearch,
      label: "Analyze Resume",
      path: "/resume-analyzer",
      badge: "AI",
    },
    {
      title: "Build Your Resume",
      description:
        "Create a professional, job-ready resume using the SkillBridge Resume Builder.",
      icon: FileText,
      label: "Build Resume",
      path: "/resume-builder",
      badge: "Recommended",
    },
    {
      title: "Identify Skill Gaps",
      description:
        "Discover the skills you need to develop for your target career.",
      icon: Target,
      label: "View Skill Gaps",
      path: "/skill-gap",
      badge: "Skills",
    },
    {
      title: "Follow Your Career Roadmap",
      description:
        "Track the skills, learning steps and milestones needed to reach your career goal.",
      icon: Map,
      label: "View Roadmap",
      path: "/career-roadmap",
      badge: "Career",
    },
    {
      title: "Find Internships",
      description:
        "Explore internship opportunities that can help you gain practical experience.",
      icon: GraduationCap,
      label: "Explore Internships",
      path: "/internships",
      badge: "Opportunities",
    },
    {
      title: "Find Jobs",
      description:
        "Explore relevant job opportunities and manage your applications.",
      icon: BriefcaseBusiness,
      label: "Explore Jobs",
      path: "/jobs",
      badge: "Jobs",
    },
    {
      title: "Practice Interviews",
      description:
        "Improve your interview performance with technical, aptitude, HR and mock interviews.",
      icon: Users,
      label: "Start Practice",
      path: "/interview",
      badge: "Practice",
    },
  ];

  return (
    <section className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 p-5 sm:p-6 lg:p-7">

      {/* =====================================================
          BACKGROUND EFFECT
      ===================================================== */}

      <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-500/5 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-blue-500/5 blur-3xl" />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

        <div className="flex items-start gap-3">

          <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">

            <Sparkles
              size={20}
              className="text-cyan-400"
            />

          </div>

          <div>

            <div className="flex flex-wrap items-center gap-2">

              <h2 className="text-lg font-bold text-white sm:text-xl">
                Career Action Center
              </h2>

              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-cyan-400">
                Next Steps
              </span>

            </div>

            <p className="mt-1 max-w-2xl text-xs leading-5 text-slate-500 sm:text-sm">
              Take the next step toward your career goal. Choose an action
              below to continue building your career profile.
            </p>

          </div>

        </div>

      </div>

      {/* =====================================================
          ACTION GRID
      ===================================================== */}

      <div className="relative z-10 mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

        {actions.map((action) => {

          const Icon = action.icon;

          return (
            <button
              key={action.path}
              type="button"
              onClick={() => navigate(action.path)}
              className="group relative flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-950/60 p-4 text-left transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/30 hover:bg-slate-950"
            >

              {/* =================================================
                  TOP
              ================================================= */}

              <div className="flex items-start justify-between gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-700 bg-slate-900 text-slate-400 transition group-hover:border-cyan-400/30 group-hover:bg-cyan-400/10 group-hover:text-cyan-400">

                  <Icon size={18} />

                </div>

                <span className="rounded-lg border border-slate-800 bg-slate-900 px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-slate-500 group-hover:border-cyan-400/20 group-hover:text-cyan-400">

                  {action.badge}

                </span>

              </div>

              {/* =================================================
                  CONTENT
              ================================================= */}

              <div className="mt-4 flex-1">

                <h3 className="text-sm font-bold text-white transition group-hover:text-cyan-400">
                  {action.title}
                </h3>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  {action.description}
                </p>

              </div>

              {/* =================================================
                  ACTION
              ================================================= */}

              <div className="mt-4 flex items-center justify-between border-t border-slate-800 pt-3">

                <span className="text-xs font-semibold text-slate-400 transition group-hover:text-cyan-400">
                  {action.label}
                </span>

                <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-800 text-slate-600 transition group-hover:border-cyan-400/30 group-hover:bg-cyan-400/10 group-hover:text-cyan-400">

                  <ArrowRight
                    size={14}
                    className="transition-transform duration-300 group-hover:translate-x-0.5"
                  />

                </div>

              </div>

            </button>
          );
        })}

      </div>

      {/* =====================================================
          CAREER JOURNEY FOOTER
      ===================================================== */}

      <div className="relative z-10 mt-5 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.03] p-4">

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex items-start gap-3">

            <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-cyan-400/10 text-cyan-400">

              <Sparkles size={15} />

            </div>

            <div>

              <p className="text-xs font-semibold text-slate-300">
                Your career journey starts here.
              </p>

              <p className="mt-1 text-[11px] leading-5 text-slate-600">
                Analyze → Improve → Learn → Practice → Apply → Get Hired
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={() => navigate("/career-roadmap")}
            className="flex items-center justify-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2.5 text-xs font-semibold text-cyan-400 transition hover:bg-cyan-400/20"
          >
            View Career Roadmap
            <ArrowRight size={14} />
          </button>

        </div>

      </div>

    </section>
  );
}

export default CareerActionCenter;