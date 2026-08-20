import { motion } from "framer-motion";
import {
  LayoutDashboard,
  User,
  FileText,
  Brain,
  Map,
  BarChart3,
  Briefcase,
  GraduationCap,
  Settings,
  ChevronRight,
  Sparkles,
  LogOut,
  X,
  Cpu,
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

/* ============================================================
   SKILLBRIDGE AI PROFESSIONAL LOGO
   ============================================================ */

function SkillBridgeLogo() {
  return (
    <div className="relative h-12 w-12 shrink-0">
      {/* Outer glow */}
      <div className="absolute inset-[-6px] rounded-2xl bg-cyan-400/10 blur-xl" />

      {/* Logo body */}
      <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-cyan-300/25 bg-[#0D1728] shadow-[0_8px_30px_rgba(0,0,0,0.35)]">

        {/* Subtle gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/[0.12] via-transparent to-violet-500/[0.14]" />

        {/* Circuit lines */}
        <div className="absolute left-[7px] top-[8px] h-[1px] w-3 bg-cyan-400/50" />
        <div className="absolute left-[7px] top-[8px] h-3 w-[1px] bg-cyan-400/50" />

        <div className="absolute bottom-[8px] right-[7px] h-[1px] w-3 bg-violet-400/50" />
        <div className="absolute bottom-[8px] right-[7px] h-3 w-[1px] bg-violet-400/50" />

        {/* Circuit nodes */}
        <span className="absolute left-[5px] top-[6px] h-1.5 w-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.9)]" />

        <span className="absolute bottom-[6px] right-[5px] h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_8px_rgba(167,139,250,0.9)]" />

        {/* Main bridge icon */}
        <svg
          viewBox="0 0 48 48"
          className="relative z-10 h-8 w-8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Bridge */}
          <path
            d="M7 30C13 30 15 18 24 18C33 18 35 30 41 30"
            stroke="url(#bridgeGradient)"
            strokeWidth="3.2"
            strokeLinecap="round"
          />

          {/* Bridge deck */}
          <path
            d="M6 31H42"
            stroke="#22D3EE"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Left pillar */}
          <path
            d="M11 31V36"
            stroke="#38BDF8"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* Right pillar */}
          <path
            d="M37 31V36"
            stroke="#A78BFA"
            strokeWidth="2"
            strokeLinecap="round"
          />

          {/* AI center node */}
          <circle
            cx="24"
            cy="18"
            r="3"
            fill="#0D1728"
            stroke="#67E8F9"
            strokeWidth="2"
          />

          <circle
            cx="24"
            cy="18"
            r="1"
            fill="#67E8F9"
          />

          {/* Gradient */}
          <defs>
            <linearGradient
              id="bridgeGradient"
              x1="7"
              y1="18"
              x2="41"
              y2="30"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#22D3EE" />
              <stop offset="0.5" stopColor="#38BDF8" />
              <stop offset="1" stopColor="#A78BFA" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

/* ============================================================
   SIDEBAR
   ============================================================ */

function Sidebar({
  sidebarOpen,
  setSidebarOpen,
  onLogout,
}) {
  const navigate = useNavigate();

  const menus = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      title: "Resume Analyzer",
      icon: Brain,
      path: "/resume-analyzer",
    },
    {
      title: "Resume Builder",
      icon: FileText,
      path: "/resume-builder",
    },
    {
      title: "Skill Gap",
      icon: Sparkles,
      path: "/skill-gap",
    },
    {
      title: "Career Roadmap",
      icon: Map,
      path: "/career-roadmap",
    },
    {
      title: "Analytics",
      icon: BarChart3,
      path: "/analytics",
    },
    {
      title: "Internships",
      icon: GraduationCap,
      path: "/internships",
    },
    {
      title: "Jobs",
      icon: Briefcase,
      path: "/jobs",
    },
    {
      title: "Profile",
      icon: User,
      path: "/profile",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/settings",
    },
  ];

  /* ==========================================================
     LOGOUT
     ========================================================== */

  const handleLogout = () => {
    try {
      /*
       * Clear application session data.
       * If you later use Firebase/AuthContext,
       * pass an onLogout function from the parent.
       */

      localStorage.removeItem("user");
      localStorage.removeItem("userData");
      localStorage.removeItem("currentUser");
      localStorage.removeItem("skillbridgeUser");
      localStorage.removeItem("authUser");
      localStorage.removeItem("token");
      localStorage.removeItem("authToken");

      sessionStorage.clear();

      /* Optional parent authentication handler */
      if (typeof onLogout === "function") {
        onLogout();
      }

      /* Close mobile sidebar */
      if (typeof setSidebarOpen === "function") {
        setSidebarOpen(false);
      }

      /* Redirect to login */
      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error("Logout failed:", error);

      /* Even if storage clearing fails, go to login */
      navigate("/login", {
        replace: true,
      });
    }
  };

  return (
    <>
      {/* ======================================================
          MOBILE OVERLAY
          ====================================================== */}

      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* ======================================================
          SIDEBAR
          ====================================================== */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-50
          flex
          h-screen
          w-[290px]
          flex-col
          overflow-hidden
          border-r
          border-slate-800/80
          bg-[#080F1C]
          shadow-[20px_0_60px_rgba(0,0,0,0.25)]
          transition-transform
          duration-300
          lg:static

          ${
            sidebarOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
      >

        {/* ====================================================
            BACKGROUND EFFECTS
            ==================================================== */}

        <div className="pointer-events-none absolute -left-36 -top-36 h-80 w-80 rounded-full bg-cyan-500/[0.07] blur-[120px]" />

        <div className="pointer-events-none absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-violet-500/[0.07] blur-[130px]" />

        <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/[0.025] blur-[100px]" />

        {/* ====================================================
            BRAND HEADER
            ==================================================== */}

        <div className="relative z-10 border-b border-slate-800/80 px-5 py-5">

          <div className="flex items-center justify-between">

            {/* Brand */}
            <div className="flex min-w-0 items-center gap-3">

              <SkillBridgeLogo />

              <div className="min-w-0">

                <h1 className="text-[17px] font-bold tracking-wide text-white">
                  SkillBridge
                  <span className="ml-1 bg-gradient-to-r from-cyan-300 via-sky-400 to-violet-400 bg-clip-text text-transparent">
                    AI
                  </span>
                </h1>

                <div className="mt-1.5 flex items-center gap-1.5">

                  <Cpu
                    size={11}
                    strokeWidth={2}
                    className="text-cyan-400"
                  />

                  <p className="truncate text-[9px] font-semibold uppercase tracking-[0.16em] text-slate-500">
                    Career Intelligence
                  </p>

                </div>

              </div>

            </div>

            {/* Mobile close */}
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="
                rounded-lg
                p-2
                text-slate-500
                transition
                hover:bg-slate-800
                hover:text-white
                lg:hidden
              "
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>

          </div>

        </div>

        {/* ====================================================
            NAVIGATION
            ==================================================== */}

        <nav className="sidebar-scroll relative z-10 flex-1 overflow-y-auto px-4 py-6">

          <p className="mb-4 px-2 text-[10px] font-bold uppercase tracking-[0.25em] text-slate-600">
            Main Menu
          </p>

          <div className="space-y-1.5">

            {menus.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.title}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className="block"
                >
                  {({ isActive }) => (
                    <motion.div
                      whileHover={{
                        x: 4,
                      }}
                      whileTap={{
                        scale: 0.985,
                      }}
                      className={`
                        group
                        relative
                        flex
                        items-center
                        justify-between
                        overflow-hidden
                        rounded-xl
                        border
                        px-3
                        py-2.5
                        transition-all
                        duration-200

                        ${
                          isActive
                            ? "border-cyan-400/20 bg-gradient-to-r from-cyan-500/15 via-sky-500/10 to-violet-500/10 shadow-lg shadow-cyan-500/5"
                            : "border-transparent hover:border-slate-700/60 hover:bg-slate-800/50"
                        }
                      `}
                    >

                      {/* Active glow */}
                      {isActive && (
                        <>
                          <motion.span
                            layoutId="activeSidebar"
                            className="
                              absolute
                              left-0
                              top-2
                              bottom-2
                              w-[3px]
                              rounded-r-full
                              bg-cyan-400
                              shadow-[0_0_10px_rgba(34,211,238,0.9)]
                            "
                          />

                          <span className="pointer-events-none absolute inset-0 bg-gradient-to-r from-cyan-400/[0.03] to-transparent" />
                        </>
                      )}

                      {/* Left content */}
                      <div className="relative z-10 flex min-w-0 items-center gap-3">

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
                            transition-all
                            duration-200

                            ${
                              isActive
                                ? "bg-cyan-400/15 text-cyan-300 shadow-[inset_0_0_12px_rgba(34,211,238,0.08)]"
                                : "bg-slate-800/70 text-slate-500 group-hover:bg-cyan-400/10 group-hover:text-cyan-300"
                            }
                          `}
                        >
                          <Icon
                            size={18}
                            strokeWidth={1.8}
                          />
                        </div>

                        {/* Title */}
                        <span
                          className={`
                            truncate
                            text-[14px]
                            font-medium
                            transition-colors

                            ${
                              isActive
                                ? "text-white"
                                : "text-slate-400 group-hover:text-slate-100"
                            }
                          `}
                        >
                          {item.title}
                        </span>

                      </div>

                      {/* Arrow */}
                      <ChevronRight
                        size={15}
                        className={`
                          relative
                          z-10
                          shrink-0
                          transition-all
                          duration-200

                          ${
                            isActive
                              ? "text-cyan-400"
                              : "text-slate-700 group-hover:translate-x-1 group-hover:text-cyan-400"
                          }
                        `}
                      />

                    </motion.div>
                  )}
                </NavLink>
              );
            })}

          </div>
        </nav>

        {/* ====================================================
            BOTTOM SECTION
            ==================================================== */}

        <div className="relative z-10 border-t border-slate-800/80">

          {/* Logout */}
          <div className="px-4 py-4">

            <motion.button
              type="button"
              whileTap={{
                scale: 0.97,
              }}
              onClick={handleLogout}
              className="
                group
                flex
                w-full
                items-center
                justify-center
                gap-2.5
                rounded-xl
                border
                border-slate-800
                bg-slate-900/60
                py-2.5
                text-sm
                font-medium
                text-slate-400
                transition-all
                duration-200
                hover:border-red-500/30
                hover:bg-red-500/10
                hover:text-red-400
                hover:shadow-lg
                hover:shadow-red-500/5
              "
            >

              <LogOut
                size={17}
                className="
                  transition-transform
                  duration-200
                  group-hover:-translate-x-0.5
                "
              />

              <span>Logout</span>

            </motion.button>

          </div>

          {/* Version */}
          <div className="border-t border-slate-800/60 px-5 py-3">

            <div className="flex items-center justify-center gap-2">

              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />

              <p className="text-[10px] font-medium tracking-wide text-slate-600">
                SkillBridge AI • v1.0
              </p>

            </div>

          </div>

        </div>

      </aside>
    </>
  );
}

export default Sidebar;