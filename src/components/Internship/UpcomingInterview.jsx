import {
  Calendar,
  Clock3,
  MapPin,
  Video,
} from "lucide-react";

function UpcomingInterview() {
  const interviews = [
    {
      company: "Google",
      role: "Frontend Developer Intern",
      date: "15 July 2026",
      time: "10:00 AM",
      mode: "Online",
    },
    {
      company: "Microsoft",
      role: "Software Engineer Intern",
      date: "18 July 2026",
      time: "2:30 PM",
      mode: "Offline",
    },
    {
      company: "Adobe",
      role: "React Developer Intern",
      date: "22 July 2026",
      time: "11:00 AM",
      mode: "Online",
    },
  ];

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">

      <h2 className="text-2xl font-bold text-white mb-6">
        Upcoming Interviews
      </h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

        {interviews.map((item, index) => (

          <div
            key={index}
            className="bg-slate-900 border border-slate-700 rounded-2xl p-6 hover:border-cyan-500 hover:-translate-y-1 transition-all duration-300"
          >

            <h3 className="text-xl font-bold text-white">
              {item.company}
            </h3>

            <p className="text-cyan-400 mt-2">
              {item.role}
            </p>

            <div className="mt-6 space-y-3">

              <div className="flex items-center gap-3 text-slate-300">
                <Calendar size={18} className="text-cyan-400" />
                {item.date}
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                <Clock3 size={18} className="text-yellow-400" />
                {item.time}
              </div>

              <div className="flex items-center gap-3 text-slate-300">
                {item.mode === "Online" ? (
                  <Video size={18} className="text-green-400" />
                ) : (
                  <MapPin size={18} className="text-red-400" />
                )}

                {item.mode}
              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default UpcomingInterview;