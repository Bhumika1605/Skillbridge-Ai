import { motion } from "framer-motion";
import {
  FileText,
  Target,
  Briefcase,
  BrainCircuit,
  ArrowUpRight,
} from "lucide-react";

const stats = [
  {
    title: "Resume Score",
    value: "89%",
    icon: FileText,
    color: "cyan",
    progress: "89%",
    increase: "+8%",
  },
  {
    title: "Career Readiness",
    value: "92%",
    icon: Target,
    color: "green",
    progress: "92%",
    increase: "+6%",
  },
  {
    title: "Skill Match",
    value: "84%",
    icon: BrainCircuit,
    color: "violet",
    progress: "84%",
    increase: "+5%",
  },
  {
    title: "Placement Chance",
    value: "High",
    icon: Briefcase,
    color: "orange",
    progress: "88%",
    increase: "+9%",
  },
];

function DashboardStats() {
  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <motion.div
            key={index}
            whileHover={{
              y: -8,
              scale: 1.02,
            }}
            transition={{ duration: 0.25 }}
            className="
              relative
              overflow-hidden
              rounded-[28px]
              border
              border-white/10
              bg-white/5
              backdrop-blur-2xl
              p-6
            "
          >

        {/* Glow */}

<div
  className={`
    absolute
    -right-10
    -top-10
    h-40
    w-40
    rounded-full
    blur-[90px]

    ${
      item.color === "cyan"
        ? "bg-cyan-500/15"
        : item.color === "green"
        ? "bg-green-500/15"
        : item.color === "violet"
        ? "bg-violet-500/15"
        : "bg-orange-500/15"
    }
  `}
/>

<div className="relative z-10">

  {/* Top */}

  <div className="flex items-center justify-between">

    <div
      className={`
        flex
        h-14
        w-14
        items-center
        justify-center
        rounded-2xl

        ${
          item.color === "cyan"
            ? "bg-cyan-500/15 text-cyan-400"
            : item.color === "green"
            ? "bg-green-500/15 text-green-400"
            : item.color === "violet"
            ? "bg-violet-500/15 text-violet-400"
            : "bg-orange-500/15 text-orange-400"
        }
      `}
    >

      <Icon size={26} />

    </div>

    <div
      className="
        flex
        items-center
        gap-1
        rounded-full
        bg-green-500/10
        px-3
        py-1
        text-xs
        font-semibold
        text-green-400
      "
    >

      {item.increase}

      <ArrowUpRight size={14} />

    </div>

  </div>

  {/* Title */}

  <p className="mt-6 text-sm text-slate-400">
    {item.title}
  </p>

  {/* Value */}

  <h2 className="mt-2 text-5xl font-black text-white">
    {item.value}
  </h2>

  {/* Progress */}

  <div className="mt-8">

    <div className="mb-2 flex justify-between text-xs text-slate-500">

      <span>Progress</span>

      <span>{item.progress}</span>

    </div>

    <div className="h-3 overflow-hidden rounded-full bg-slate-800">

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: item.progress }}
        transition={{
          duration: 1.5,
          delay: index * 0.2,
        }}
        className={`
          h-full
          rounded-full

          ${
            item.color === "cyan"
              ? "bg-gradient-to-r from-cyan-400 to-blue-500"
              : item.color === "green"
              ? "bg-gradient-to-r from-green-400 to-emerald-500"
              : item.color === "violet"
              ? "bg-gradient-to-r from-violet-400 to-fuchsia-500"
              : "bg-gradient-to-r from-orange-400 to-red-500"
          }
        `}
      />

    </div>

  </div>

</div>

          </motion.div>
        );
      })}
    </section>
  );
}

export default DashboardStats;