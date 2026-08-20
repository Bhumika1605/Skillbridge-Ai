import { useEffect, useState } from "react";
import {
  CalendarDays,
  Clock3,
  Video,
  ArrowRight,
  BriefcaseBusiness,
  AlertCircle,
} from "lucide-react";

export default function UpcomingInterview() {
  const [interview, setInterview] = useState(null);
  const [daysLeft, setDaysLeft] = useState(null);

  useEffect(() => {
    loadInterview();

    window.addEventListener("interviewUpdated", loadInterview);

    return () => {
      window.removeEventListener("interviewUpdated", loadInterview);
    };
  }, []);

  useEffect(() => {
    if (!interview?.date) {
      setDaysLeft(null);
      return;
    }

    calculateDays();

    const timer = setInterval(calculateDays, 60000);

    return () => clearInterval(timer);
  }, [interview]);

  const loadInterview = () => {
    const saved = localStorage.getItem("upcomingInterview");

    if (!saved) {
      setInterview(null);
      return;
    }

    try {
      const data = JSON.parse(saved);

      if (!data || !data.date) {
        setInterview(null);
        return;
      }

      setInterview(data);
    } catch (error) {
      console.error("Failed to load interview:", error);
      setInterview(null);
    }
  };

  const calculateDays = () => {
    if (!interview?.date) return;

    const interviewDate = new Date(
      `${interview.date}T${interview.time || "00:00"}`
    );

    const now = new Date();

    const difference =
      interviewDate.getTime() - now.getTime();

    if (difference <= 0) {
      setDaysLeft(0);
      return;
    }

    setDaysLeft(
      Math.ceil(difference / (1000 * 60 * 60 * 24))
    );
  };

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(`${date}T00:00:00`).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "long",
        year: "numeric",
      }
    );
  };

  return (
    <div
      className="
        rounded-3xl
        bg-[#141B2D]
        border border-slate-700
        p-6
        h-[535px]
      "
    >

      {/* ================================================= */}
      {/* HEADER */}
      {/* ================================================= */}

      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-2xl font-bold text-white">
            Upcoming Interview
          </h2>

          <p className="text-xs text-slate-500 mt-1">
            Your scheduled interviews
          </p>
        </div>

        {interview && (
          <button
            type="button"
            className="
              text-xs
              border border-slate-600
              hover:border-cyan-500
              hover:text-cyan-400
              transition
              px-4
              py-2
              rounded-xl
              text-slate-300
            "
          >
            View
          </button>
        )}

      </div>


      {/* ================================================= */}
      {/* NO REAL INTERVIEW */}
      {/* ================================================= */}

      {!interview && (

        <div className="h-[400px] flex items-center justify-center">

          <div className="text-center">

            <div
              className="
                mx-auto
                w-16
                h-16
                rounded-2xl
                bg-cyan-500/10
                border border-cyan-500/20
                flex
                items-center
                justify-center
              "
            >
              <CalendarDays
                size={28}
                className="text-cyan-400"
              />
            </div>

            <h3 className="text-white font-semibold text-lg mt-5">
              No upcoming interviews
            </h3>

            <p className="text-slate-500 text-sm mt-2 max-w-xs mx-auto leading-6">
              Your scheduled interviews will appear here
              when you add or receive one.
            </p>

            <div
              className="
                mt-5
                flex
                items-center
                justify-center
                gap-2
                text-xs
                text-slate-500
              "
            >
              <AlertCircle size={14} />

              <span>
                No placeholder interview data
              </span>
            </div>

          </div>

        </div>
      )}


      {/* ================================================= */}
      {/* REAL INTERVIEW */}
      {/* ================================================= */}

      {interview && (

        <>

          {/* Company / Role */}

          <div className="flex items-center gap-4">

            <div
              className="
                w-14
                h-14
                rounded-xl
                bg-cyan-500/10
                border border-cyan-500/10
                flex
                items-center
                justify-center
              "
            >
              <BriefcaseBusiness
                size={25}
                className="text-cyan-400"
              />
            </div>

            <div className="min-w-0">

              <h3 className="text-white font-semibold text-lg truncate">
                {interview.role || "Interview"}
              </h3>

              <p className="text-slate-400 truncate">
                {interview.company || "Company not specified"}
              </p>

            </div>

          </div>


          {/* Interview Details */}

          <div className="mt-8 space-y-4">

            <div className="flex items-center gap-3 text-slate-300">

              <CalendarDays
                size={18}
                className="text-cyan-400"
              />

              <span>
                {formatDate(interview.date)}
              </span>

            </div>


            {interview.time && (

              <div className="flex items-center gap-3 text-slate-300">

                <Clock3
                  size={18}
                  className="text-cyan-400"
                />

                <span>
                  {interview.time}
                </span>

              </div>

            )}


            {interview.mode && (

              <div className="flex items-center gap-3 text-slate-300">

                <Video
                  size={18}
                  className="text-cyan-400"
                />

                <span>
                  {interview.mode}
                </span>

              </div>

            )}

          </div>


          {/* Countdown */}

          <div
            className="
              mt-8
              rounded-2xl
              bg-slate-800
              p-4
              border border-slate-700
            "
          >

            <p className="text-slate-400 text-sm">
              {daysLeft === 0
                ? "Interview Status"
                : "Starts In"}
            </p>

            <h1 className="text-white text-3xl font-bold mt-2">

              {daysLeft === 0
                ? "Today / Started"
                : `${daysLeft} ${
                    daysLeft === 1 ? "Day" : "Days"
                  }`}

            </h1>

          </div>


          {/* Prepare Button */}

          <button
            type="button"
            className="
              mt-8
              w-full
              h-12
              rounded-2xl
              bg-gradient-to-r
              from-cyan-500
              to-blue-600
              hover:scale-[1.02]
              transition
              text-white
              font-semibold
              flex
              items-center
              justify-center
              gap-2
            "
          >
            Prepare Now

            <ArrowRight size={18} />

          </button>

        </>

      )}

    </div>
  );
}