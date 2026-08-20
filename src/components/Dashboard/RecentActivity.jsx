import {
  FileCheck2,
  BrainCircuit,
  Briefcase,
  Trophy,
  Clock3,
} from "lucide-react";

const activities = [
  {
    icon: FileCheck2,
    title: "Resume analyzed successfully",
    time: "10 min ago",
    color: "text-cyan-400",
  },
  {
    icon: BrainCircuit,
    title: "AI generated a new roadmap",
    time: "30 min ago",
    color: "text-purple-400",
  },
  {
    icon: Briefcase,
    title: "Applied to Microsoft Internship",
    time: "2 hrs ago",
    color: "text-green-400",
  },
  {
    icon: Trophy,
    title: "Career Readiness reached 89%",
    time: "Yesterday",
    color: "text-yellow-400",
  },
];

export default function RecentActivity() {
  return (
    <div className="rounded-3xl bg-[#141B2D] border border-slate-700 p-6">

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-xl font-bold text-white">
          Recent Activity
        </h2>

        <button className="text-sm text-cyan-400 hover:text-cyan-300">
          View All
        </button>

      </div>

      <div className="space-y-5">

        {activities.map((item, index) => {

          const Icon = item.icon;

          return (

            <div
              key={index}
              className="flex gap-4 items-start"
            >

              <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center">

                <Icon
                  className={item.color}
                  size={18}
                />

              </div>

              <div className="flex-1">

                <h3 className="text-white text-sm font-medium">
                  {item.title}
                </h3>

                <div className="flex items-center gap-2 mt-1">

                  <Clock3
                    size={12}
                    className="text-slate-500"
                  />

                  <span className="text-xs text-slate-500">
                    {item.time}
                  </span>

                </div>

              </div>

            </div>

          );

        })}

      </div>

    </div>
  );
}