import {
  FileText,
  Briefcase,
  BadgeCheck,
  Rocket,
} from "lucide-react";

function StatCard({ title, value, subtitle, color }) {
  const styles = {
    cyan: {
      border: "border-cyan-500",
      text: "text-cyan-400",
      bg: "bg-cyan-500/10",
      icon: <FileText size={28} />,
    },

    green: {
      border: "border-green-500",
      text: "text-green-400",
      bg: "bg-green-500/10",
      icon: <Briefcase size={28} />,
    },

    yellow: {
      border: "border-yellow-500",
      text: "text-yellow-400",
      bg: "bg-yellow-500/10",
      icon: <BadgeCheck size={28} />,
    },

    purple: {
      border: "border-purple-500",
      text: "text-purple-400",
      bg: "bg-purple-500/10",
      icon: <Rocket size={28} />,
    },
  };

  const current = styles[color];

  return (
  <div
    className={`
      relative
      overflow-hidden
      bg-gradient-to-br
      from-slate-800
      to-slate-900
      rounded-3xl
      p-6
      border
      ${current.border}
      transition-all
      duration-300
      hover:-translate-y-2
      hover:shadow-2xl
      hover:shadow-cyan-500/20
      hover:scale-[1.03]
    `}
  >
    {/* Glow */}
    <div className="absolute -top-10 -right-10 w-28 h-28 bg-cyan-500/10 rounded-full blur-3xl"></div>

    {/* Top Row */}
    <div className="flex justify-between items-start">

      <div
        className={`
          w-14
          h-14
          rounded-2xl
          flex
          items-center
          justify-center
          ${current.bg}
          ${current.text}
        `}
      >
        {current.icon}
      </div>

      <div className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-semibold">
        ↑ +4%
      </div>

    </div>

    {/* Title */}

    <h3 className="text-slate-400 mt-6 text-lg">
      {title}
    </h3>

    {/* Score */}

    <h2 className="text-5xl font-bold text-white mt-2">
      {value}
    </h2>

    <p className="text-green-400 text-sm mt-2">
      Excellent Performance
    </p>

    {/* Progress Bar */}

    <div className="w-full h-2 bg-slate-700 rounded-full mt-6">

      <div
        className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
        style={{ width: value }}
      />

    </div>

    {/* Footer */}

    <p className="text-slate-400 mt-4 text-sm">
      {subtitle}
    </p>

  </div>
);
}

export default StatCard;