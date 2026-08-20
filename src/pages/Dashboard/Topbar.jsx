import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  ChevronDown,
  Menu,
  Search,
  Settings,
  User,
  LogOut,
  X,
  Briefcase,
  GraduationCap,
  Sparkles,
  FileText,
  AlertCircle,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/* ============================================================
   TOPBAR
============================================================ */

function Topbar({ setSidebarOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  const notificationRef = useRef(null);
  const profileRef = useRef(null);
  const searchRef = useRef(null);

  const [notificationOpen, setNotificationOpen] =
    useState(false);

  const [profileOpen, setProfileOpen] =
    useState(false);

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [notifications, setNotifications] =
    useState([
      {
        id: 1,
        type: "internship",
        title: "New internship opportunity",
        message:
          "New Frontend Developer internships are available.",
        time: "Just now",
        read: false,
        icon: GraduationCap,
      },

      {
        id: 2,
        type: "job",
        title: "New job matches your profile",
        message:
          "A Software Engineer opportunity matches your skills.",
        time: "10 min ago",
        read: false,
        icon: Briefcase,
      },

      {
        id: 3,
        type: "resume",
        title: "Resume analysis completed",
        message:
          "Your latest resume analysis is ready to review.",
        time: "1 hour ago",
        read: false,
        icon: FileText,
      },

      {
        id: 4,
        type: "skill",
        title: "Skill gap updated",
        message:
          "Your career skill recommendations have been updated.",
        time: "3 hours ago",
        read: true,
        icon: Sparkles,
      },
    ]);

  /* ============================================================
     PAGE TITLE
  ============================================================ */

  const pageTitle = useMemo(() => {
    const pathname = location.pathname;

    if (pathname === "/dashboard") {
      return "Dashboard";
    }

    if (pathname.includes("resume-analyzer")) {
      return "Resume Analyzer";
    }

    if (pathname.includes("resume-builder")) {
      return "Resume Builder";
    }

    if (pathname.includes("skill-gap")) {
      return "Skill Gap";
    }

    if (pathname.includes("career-roadmap")) {
      return "Career Roadmap";
    }

    if (pathname.includes("analytics")) {
      return "Analytics";
    }

    if (pathname.includes("internships")) {
      return "Internships";
    }

    if (pathname.includes("jobs")) {
      return "Jobs";
    }

    if (pathname.includes("notifications")) {
      return "Notifications";
    }

    if (pathname.includes("profile")) {
      return "Profile";
    }

    if (pathname.includes("settings")) {
      return "Settings";
    }

    return "Dashboard";
  }, [location.pathname]);

  /* ============================================================
     UNREAD COUNT
  ============================================================ */

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  /* ============================================================
     CLOSE MENUS WHEN CLICKING OUTSIDE
  ============================================================ */

  useEffect(() => {
    function handleOutsideClick(event) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationOpen(false);
      }

      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileOpen(false);
      }

      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setSearchOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  /* ============================================================
     ESC KEY
  ============================================================ */

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        setNotificationOpen(false);
        setProfileOpen(false);
        setSearchOpen(false);
      }
    }

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  /* ============================================================
     SEARCH
  ============================================================ */

  const searchItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      keywords: "dashboard home career",
    },
    {
      name: "Resume Analyzer",
      path: "/resume-analyzer",
      keywords: "resume cv ats analyzer",
    },
    {
      name: "Resume Builder",
      path: "/resume-builder",
      keywords: "resume cv create builder",
    },
    {
      name: "Skill Gap",
      path: "/skill-gap",
      keywords: "skills missing skills",
    },
    {
      name: "Career Roadmap",
      path: "/career-roadmap",
      keywords: "career roadmap learning",
    },
    {
      name: "Analytics",
      path: "/analytics",
      keywords: "analytics progress statistics",
    },
    {
      name: "Internships",
      path: "/internships",
      keywords: "internship opportunities",
    },
    {
      name: "Jobs",
      path: "/jobs",
      keywords: "jobs employment careers",
    },
    {
      name: "Profile",
      path: "/profile",
      keywords: "profile account",
    },
    {
      name: "Settings",
      path: "/settings",
      keywords: "settings preferences",
    },
  ];

  const searchResults = searchItems.filter(
    (item) => {
      if (!search.trim()) return true;

      const text =
        `${item.name} ${item.keywords}`.toLowerCase();

      return text.includes(
        search.toLowerCase()
      );
    }
  );

  function handleSearchNavigation(path) {
    navigate(path);
    setSearch("");
    setSearchOpen(false);
  }

  /* ============================================================
     NOTIFICATION FUNCTIONS
  ============================================================ */

  function toggleNotifications() {
    setNotificationOpen(
      (previous) => !previous
    );

    setProfileOpen(false);
    setSearchOpen(false);
  }

  function markNotificationRead(id) {
    setNotifications((previous) =>
      previous.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              read: true,
            }
          : notification
      )
    );
  }

  function markAllRead() {
    setNotifications((previous) =>
      previous.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  }

  function openNotification(notification) {
    markNotificationRead(
      notification.id
    );

    setNotificationOpen(false);

    if (
      notification.type ===
      "internship"
    ) {
      navigate("/internships");
      return;
    }

    if (
      notification.type === "job"
    ) {
      navigate("/jobs");
      return;
    }

    if (
      notification.type === "resume"
    ) {
      navigate("/resume-analyzer");
      return;
    }

    if (
      notification.type === "skill"
    ) {
      navigate("/skill-gap");
      return;
    }
  }

  /* ============================================================
     PROFILE
  ============================================================ */

  function toggleProfile() {
    setProfileOpen(
      (previous) => !previous
    );

    setNotificationOpen(false);
    setSearchOpen(false);
  }

  function goToProfile() {
    navigate("/profile");
    setProfileOpen(false);
  }

  function goToSettings() {
    navigate("/settings");
    setProfileOpen(false);
  }

  function handleLogout() {
    /*
      Add your Firebase/Auth logout logic here later.

      Example:
      await signOut(auth);
      navigate("/login");
    */

    setProfileOpen(false);
  }

  /* ============================================================
     NOTIFICATION ICON
  ============================================================ */

  function NotificationIcon({
    notification,
  }) {
    const Icon =
      notification.icon ||
      Bell;

    return (
      <div
        className={`
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-xl
          ${
            notification.type ===
            "internship"
              ? "bg-cyan-400/10 text-cyan-400"
              : notification.type ===
                "job"
              ? "bg-violet-400/10 text-violet-400"
              : notification.type ===
                "resume"
              ? "bg-blue-400/10 text-blue-400"
              : "bg-amber-400/10 text-amber-400"
          }
        `}
      >
        <Icon
          size={18}
          strokeWidth={1.8}
        />
      </div>
    );
  }

  return (
    <header
      className="
        sticky
        top-0
        z-40
        flex
        h-[76px]
        w-full
        items-center
        border-b
        border-slate-800/80
        bg-[#080F1C]/90
        px-4
        backdrop-blur-xl
        sm:px-6
        lg:px-8
      "
    >
      {/* ======================================================
          LEFT SIDE
      ====================================================== */}

      <div className="flex min-w-0 items-center gap-3">
        {/* Mobile Menu */}
        <button
          onClick={() =>
            setSidebarOpen(
              (previous) =>
                !previous
            )
          }
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-slate-800
            bg-slate-900/70
            text-slate-400
            transition
            hover:border-cyan-400/30
            hover:bg-cyan-400/10
            hover:text-cyan-400
            lg:hidden
          "
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>

        {/* Page title */}
        <div className="min-w-0">
          <p className="hidden text-[10px] font-semibold uppercase tracking-[0.22em] text-cyan-400 sm:block">
            SkillBridge AI
          </p>

          <h1 className="truncate text-lg font-semibold text-white sm:text-xl">
            {pageTitle}
          </h1>
        </div>
      </div>

      {/* ======================================================
          RIGHT SIDE
      ====================================================== */}

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        {/* ====================================================
            SEARCH
        ==================================================== */}

        <div
          ref={searchRef}
          className="relative"
        >
          <button
            onClick={() => {
              setSearchOpen(
                (previous) =>
                  !previous
              );

              setNotificationOpen(
                false
              );

              setProfileOpen(false);
            }}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-slate-800
              bg-slate-900/70
              text-slate-400
              transition
              hover:border-cyan-400/30
              hover:bg-cyan-400/10
              hover:text-cyan-400
              sm:hidden
            "
            aria-label="Search"
          >
            <Search size={19} />
          </button>

          <div className="hidden w-[230px] md:block lg:w-[280px]">
            <div className="relative">
              <Search
                size={17}
                className="
                  absolute
                  left-3.5
                  top-1/2
                  -translate-y-1/2
                  text-slate-600
                "
              />

              <input
                value={search}
                onFocus={() =>
                  setSearchOpen(true)
                }
                onChange={(event) =>
                  setSearch(
                    event.target.value
                  )
                }
                placeholder="Search SkillBridge..."
                className="
                  h-10
                  w-full
                  rounded-xl
                  border
                  border-slate-800
                  bg-slate-900/60
                  pl-10
                  pr-4
                  text-sm
                  text-white
                  outline-none
                  placeholder:text-slate-600
                  transition
                  focus:border-cyan-400/30
                  focus:bg-slate-900
                  focus:ring-1
                  focus:ring-cyan-400/10
                "
              />
            </div>
          </div>

          {/* Mobile Search */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -8,
                  scale: 0.98,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -8,
                  scale: 0.98,
                }}
                className="
                  absolute
                  right-0
                  top-12
                  z-50
                  w-[300px]
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-800
                  bg-[#0B1424]
                  shadow-2xl
                  shadow-black/50
                "
              >
                <div className="border-b border-slate-800 p-3">
                  <div className="relative">
                    <Search
                      size={16}
                      className="absolute left-3 top-3 text-slate-600"
                    />

                    <input
                      autoFocus
                      value={search}
                      onChange={(event) =>
                        setSearch(
                          event.target.value
                        )
                      }
                      placeholder="Search..."
                      className="
                        h-10
                        w-full
                        rounded-xl
                        border
                        border-slate-800
                        bg-slate-950
                        pl-9
                        pr-3
                        text-sm
                        text-white
                        outline-none
                        placeholder:text-slate-600
                        focus:border-cyan-400/30
                      "
                    />
                  </div>
                </div>

                <div className="max-h-[330px] overflow-y-auto p-2">
                  {searchResults.length >
                  0 ? (
                    searchResults.map(
                      (item) => (
                        <button
                          key={
                            item.path
                          }
                          onClick={() =>
                            handleSearchNavigation(
                              item.path
                            )
                          }
                          className="
                            flex
                            w-full
                            items-center
                            rounded-xl
                            px-3
                            py-2.5
                            text-left
                            text-sm
                            text-slate-300
                            transition
                            hover:bg-cyan-400/10
                            hover:text-white
                          "
                        >
                          {item.name}
                        </button>
                      )
                    )
                  ) : (
                    <div className="p-5 text-center text-sm text-slate-500">
                      No results found.
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ====================================================
            NOTIFICATION
        ==================================================== */}

        <div
          ref={notificationRef}
          className="relative"
        >
          <button
            onClick={toggleNotifications}
            className={`
              relative
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              transition-all
              duration-200
              ${
                notificationOpen
                  ? "border-cyan-400/30 bg-cyan-400/10 text-cyan-400"
                  : "border-slate-800 bg-slate-900/70 text-slate-400 hover:border-cyan-400/30 hover:bg-cyan-400/10 hover:text-cyan-400"
              }
            `}
            aria-label="Notifications"
          >
            <Bell
              size={19}
              strokeWidth={1.8}
            />

            {/* Unread dot */}
            {unreadCount > 0 && (
              <>
                <span className="absolute right-2 top-2 h-2 w-2 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.9)]" />

                <span className="absolute -right-1 -top-1 flex min-h-[18px] min-w-[18px] items-center justify-center rounded-full border-2 border-[#080F1C] bg-cyan-400 px-1 text-[9px] font-bold text-slate-950">
                  {unreadCount >
                  9
                    ? "9+"
                    : unreadCount}
                </span>
              </>
            )}
          </button>

          {/* Notification Dropdown */}
          <AnimatePresence>
            {notificationOpen && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -10,
                  scale: 0.98,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                  scale: 0.98,
                }}
                transition={{
                  duration: 0.18,
                }}
                className="
                  absolute
                  right-0
                  top-12
                  z-50
                  w-[350px]
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-800
                  bg-[#0B1424]
                  shadow-2xl
                  shadow-black/60
                  sm:w-[390px]
                "
              >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-800 px-4 py-4">
                  <div>
                    <h3 className="text-sm font-semibold text-white">
                      Notifications
                    </h3>

                    <p className="mt-0.5 text-xs text-slate-500">
                      {unreadCount > 0
                        ? `${unreadCount} unread notification${
                            unreadCount !==
                            1
                              ? "s"
                              : ""
                          }`
                        : "You're all caught up"}
                    </p>
                  </div>

                  {unreadCount >
                    0 && (
                    <button
                      onClick={
                        markAllRead
                      }
                      className="
                        flex
                        items-center
                        gap-1.5
                        rounded-lg
                        px-2
                        py-1.5
                        text-[11px]
                        font-medium
                        text-cyan-400
                        transition
                        hover:bg-cyan-400/10
                      "
                    >
                      <CheckCheck
                        size={14}
                      />
                      Mark all read
                    </button>
                  )}
                </div>

                {/* Notifications */}
                <div className="max-h-[390px] overflow-y-auto">
                  {notifications.length >
                  0 ? (
                    notifications.map(
                      (
                        notification
                      ) => (
                        <button
                          key={
                            notification.id
                          }
                          onClick={() =>
                            openNotification(
                              notification
                            )
                          }
                          className={`
                            relative
                            flex
                            w-full
                            gap-3
                            border-b
                            border-slate-800/70
                            p-4
                            text-left
                            transition
                            hover:bg-slate-800/40
                            ${
                              !notification.read
                                ? "bg-cyan-400/[0.025]"
                                : ""
                            }
                          `}
                        >
                          {/* Unread indicator */}
                          {!notification.read && (
                            <span className="absolute left-1 top-5 h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_7px_rgba(34,211,238,0.8)]" />
                          )}

                          <NotificationIcon
                            notification={
                              notification
                            }
                          />

                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <p
                                className={`
                                  text-sm
                                  font-medium
                                  ${
                                    notification.read
                                      ? "text-slate-300"
                                      : "text-white"
                                  }
                                `}
                              >
                                {
                                  notification.title
                                }
                              </p>

                              {!notification.read && (
                                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400" />
                              )}
                            </div>

                            <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-500">
                              {
                                notification.message
                              }
                            </p>

                            <p className="mt-2 text-[10px] text-slate-600">
                              {
                                notification.time
                              }
                            </p>
                          </div>
                        </button>
                      )
                    )
                  ) : (
                    <div className="px-5 py-10 text-center">
                      <Bell
                        size={28}
                        className="mx-auto text-slate-700"
                      />

                      <p className="mt-3 text-sm text-slate-400">
                        No notifications
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="border-t border-slate-800 p-3">
                  <button
                    onClick={() => {
                      setNotificationOpen(
                        false
                      );
                      navigate(
                        "/notifications"
                      );
                    }}
                    className="
                      flex
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-xl
                      border
                      border-slate-800
                      bg-slate-900/60
                      py-2.5
                      text-xs
                      font-medium
                      text-slate-300
                      transition
                      hover:border-cyan-400/20
                      hover:bg-cyan-400/10
                      hover:text-cyan-400
                    "
                  >
                    View all notifications
                    <ChevronDown
                      size={14}
                      className="-rotate-90"
                    />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ====================================================
            DIVIDER
        ==================================================== */}

        <div className="hidden h-8 w-px bg-slate-800 sm:block" />

        {/* ====================================================
            PROFILE
        ==================================================== */}

        <div
          ref={profileRef}
          className="relative"
        >
          <button
            onClick={toggleProfile}
            className="
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-transparent
              px-1.5
              py-1
              transition
              hover:border-slate-800
              hover:bg-slate-900/70
            "
          >
            {/* Avatar */}
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-sky-500 to-violet-500 text-sm font-bold text-white shadow-lg shadow-cyan-500/10">
              B
            </div>

            {/* Name */}
            <div className="hidden text-left lg:block">
              <p className="max-w-[110px] truncate text-xs font-semibold text-white">
                Bhumika
              </p>

              <p className="text-[10px] text-slate-500">
                Student
              </p>
            </div>

            <ChevronDown
              size={15}
              className={`
                hidden
                text-slate-600
                transition-transform
                lg:block
                ${
                  profileOpen
                    ? "rotate-180"
                    : ""
                }
              `}
            />
          </button>

          {/* Profile dropdown */}
          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{
                  opacity: 0,
                  y: -8,
                  scale: 0.98,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -8,
                  scale: 0.98,
                }}
                className="
                  absolute
                  right-0
                  top-12
                  z-50
                  w-[230px]
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-800
                  bg-[#0B1424]
                  p-2
                  shadow-2xl
                  shadow-black/60
                "
              >
                {/* User header */}
                <div className="mb-1 flex items-center gap-3 rounded-xl bg-slate-900/70 p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 via-sky-500 to-violet-500 font-bold text-white">
                    B
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      Bhumika
                    </p>

                    <p className="truncate text-[11px] text-slate-500">
                      Career Explorer
                    </p>
                  </div>
                </div>

                {/* Profile */}
                <button
                  onClick={goToProfile}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-2.5
                    text-sm
                    text-slate-400
                    transition
                    hover:bg-slate-800
                    hover:text-white
                  "
                >
                  <User size={17} />
                  Profile
                </button>

                {/* Settings */}
                <button
                  onClick={goToSettings}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-2.5
                    text-sm
                    text-slate-400
                    transition
                    hover:bg-slate-800
                    hover:text-white
                  "
                >
                  <Settings size={17} />
                  Settings
                </button>

                <div className="my-1 border-t border-slate-800" />

                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="
                    flex
                    w-full
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-2.5
                    text-sm
                    text-slate-400
                    transition
                    hover:bg-red-500/10
                    hover:text-red-400
                  "
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}

export default Topbar;