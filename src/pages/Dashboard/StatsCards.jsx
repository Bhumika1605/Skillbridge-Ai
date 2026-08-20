import { motion } from "framer-motion";
import {
  Flame,
  Target,
  Trophy,
} from "lucide-react";

const stats = [
  {
    title: "Day Streak",
    value: "12",
    subtitle: "Keep it up!",
    icon: Flame,
    color: "orange",
  },
  {
    title: "Weekly Goals",
    value: "5/7",
    subtitle: "2 Remaining",
    icon: Target,
    color: "green",
  },
  {
    title: "Achievements",
    value: "8",
    subtitle: "Unlocked",
    icon: Trophy,
    color: "yellow",
  },
];

const colors = {
  orange: {
    bg: "bg-orange-500/10",
    text: "text-orange-400",
    border: "border-orange-500/20",
  },
  green: {
    bg: "bg-green-500/10",
    text: "text-green-400",
    border: "border-green-500/20",
  },
  yellow: {
    bg: "bg-yellow-500/10",
    text: "text-yellow-400",
    border: "border-yellow-500/20",
  },
};

function StatsCards() {
  return (
    <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
      {stats.map((item, index) => {
        const Icon = item.icon;
        const c = colors[item.color];

        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            whileHover={{
              y: -8,
              scale: 1.03,
            }}
            className={`
              rounded-3xl
              border
              ${c.border}
              bg-white/5
              backdrop-blur-xl
              p-6
            `}
          >
            <div
              className={`
                flex
                h-14
                w-14
                items-center
                justify-center
                rounded-2xl
                ${c.bg}
              `}
            >
              <Icon
                size={28}
                className={c.text}
              />
            </div>

            <h2 className="mt-6 text-5xl font-black text-white">
              {item.value}
            </h2>

            <p className="mt-2 text-lg font-semibold text-white">
              {item.title}
            </p>

            <p className={`mt-1 text-sm ${c.text}`}>
              {item.subtitle}
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}

export default StatsCards;