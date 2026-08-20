import { Target, CheckCircle2 } from "lucide-react";

const goals = [
  {
    title: "Reach ATS Score 95%",
    progress: 92,
    color: "bg-cyan-400",
  },
  {
    title: "Complete React Mastery",
    progress: 75,
    color: "bg-purple-500",
  },
  {
    title: "Solve 250 DSA Problems",
    progress: 46,
    color: "bg-orange-400",
  },
  {
    title: "Get Internship",
    progress: 68,
    color: "bg-green-400",
  },
];

export default function CareerGoals() {
  return (
    <div className="rounded-3xl bg-[#141B2D] border border-slate-700 p-6">

      <div className="flex items-center gap-3 mb-6">

        <Target
          className="text-cyan-400"
          size={24}
        />

        <h2 className="text-xl font-bold text-white">
          Career Goals
        </h2>

      </div>

      <div className="space-y-6">

        {goals.map((goal) => (

          <div key={goal.title}>

            <div className="flex justify-between mb-2">

              <div className="flex items-center gap-2">

                <CheckCircle2
                  size={16}
                  className="text-green-400"
                />

                <span className="text-white text-sm">
                  {goal.title}
                </span>

              </div>

              <span className="text-cyan-400 text-sm font-semibold">
                {goal.progress}%
              </span>

            </div>

            <div className="h-2 rounded-full bg-slate-800">

              <div
                className={`h-full rounded-full ${goal.color}`}
                style={{
                  width: `${goal.progress}%`,
                }}
              />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}