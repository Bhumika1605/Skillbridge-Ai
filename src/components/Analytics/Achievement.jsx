import {
  Trophy,
  Star,
  Medal,
  Rocket,
} from "lucide-react";

function Achievement() {
  const achievements = [
    {
      icon: <Trophy size={24} className="text-yellow-400" />,
      title: "Resume Score Above 90%",
      description: "Excellent ATS optimized resume.",
    },
    {
      icon: <Star size={24} className="text-cyan-400" />,
      title: "Career Readiness Reached 91%",
      description: "You're almost placement ready.",
    },
    {
      icon: <Medal size={24} className="text-green-400" />,
      title: "Completed 3 Learning Modules",
      description: "Keep learning consistently.",
    },
    {
      icon: <Rocket size={24} className="text-purple-400" />,
      title: "Placement Journey Started",
      description: "Great progress toward your dream job.",
    },
  ];

  return (
    <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6">

      <h2 className="text-2xl font-bold text-white mb-6">
        Achievements
      </h2>

      <div className="space-y-5">

        {achievements.map((item, index) => (
          <div
            key={index}
            className="flex items-start gap-4 p-4 rounded-xl bg-slate-900 hover:bg-slate-700 transition"
          >
            <div>
              {item.icon}
            </div>

            <div>
              <h3 className="text-white font-semibold">
                {item.title}
              </h3>

              <p className="text-slate-400 text-sm mt-1">
                {item.description}
              </p>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default Achievement;