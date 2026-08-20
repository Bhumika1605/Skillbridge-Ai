import {
  BrainCircuit,
  TrendingUp,
  AlertTriangle,
  Sparkles,
} from "lucide-react";

const insights = [
  {
    icon: TrendingUp,
    title: "Resume Score Improved",
    text: "+8% ATS score after your latest update.",
    color: "text-green-400",
  },
  {
    icon: AlertTriangle,
    title: "Missing Skill",
    text: "Next.js is required in 72% of matching jobs.",
    color: "text-orange-400",
  },
  {
    icon: Sparkles,
    title: "AI Recommendation",
    text: "Build one full-stack React project this week.",
    color: "text-cyan-400",
  },
  {
    icon: TrendingUp,
    title: "Placement Readiness",
    text: "Your readiness increased from 84% to 89%.",
    color: "text-emerald-400",
  },
  {
    icon: AlertTriangle,
    title: "Portfolio Alert",
    text: "Add 2 live deployed projects to strengthen your profile.",
    color: "text-yellow-400",
  },
  {
    icon: TrendingUp,
    title: "Interview Tip",
    text: "Practice React Hooks and JavaScript closures today.",
    color: "text-purple-400",
  },
  {
    icon: Sparkles,
    title: "Career Match",
    text: "You are an 89% match for Frontend Developer roles.",
    color: "text-pink-400",
  },
];

export default function AIInsights() {
  return (
    <div className="rounded-3xl bg-[#141B2D] border border-slate-700 p-6 h-[660px] flex flex-col">

      {/* Header */}

      <div className="flex items-center gap-3 mb-5">

        <BrainCircuit
          className="text-cyan-400"
          size={24}
        />

        <h2 className="text-xl font-bold text-white">
          AI Insights
        </h2>

      </div>

      {/* Content */}

      <div className="flex-1 space-y-3">

        {insights.map((item) => {

          const Icon = item.icon;

          return (

            <div
              key={item.title}
              className="flex items-start gap-3 rounded-xl bg-slate-800/50 p-3 border border-slate-700"
            >

              <Icon
                className={item.color}
                size={18}
              />

              <div>

                <h3 className="text-white text-sm font-semibold">
                  {item.title}
                </h3>

                <p className="text-slate-400 text-xs mt-1">
                  {item.text}
                </p>

              </div>

            </div>

          );

        })}

      </div>

    </div>
  );
}