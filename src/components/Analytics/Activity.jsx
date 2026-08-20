import {
  CheckCircle2,
  FileText,
  BrainCircuit,
  Map,
} from "lucide-react";

function Activity() {
  const activities = [
    {
      icon: <FileText size={22} className="text-cyan-400" />,
      title: "Resume Uploaded",
      time: "2 hours ago",
    },
    {
      icon: <BrainCircuit size={22} className="text-green-400" />,
      title: "Skill Gap Analysis Completed",
      time: "Yesterday",
    },
    {
      icon: <Map size={22} className="text-yellow-400" />,
      title: "Career Roadmap Generated",
      time: "2 days ago",
    },
    {
      icon: <CheckCircle2 size={22} className="text-purple-400" />,
      title: "Dashboard Updated",
      time: "Just now",
    },
  ];

  return (
    <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">

      <h2 className="text-2xl font-bold text-white mb-6">
        Recent Activity
      </h2>

      <div className="space-y-5">

        {activities.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b border-slate-700 pb-4"
          >
            <div className="flex items-center gap-4">
              {item.icon}

              <div>
                <h3 className="text-white font-semibold">
                  {item.title}
                </h3>

                <p className="text-slate-400 text-sm">
                  {item.time}
                </p>
              </div>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default Activity;