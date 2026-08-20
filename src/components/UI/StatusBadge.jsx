import { motion } from "framer-motion";

function StatusBadge({
  text,
  color = "cyan",
}) {
  const colors = {
    cyan: "bg-cyan-500/15 text-cyan-400 border-cyan-500/30",
    green: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    yellow: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    red: "bg-red-500/15 text-red-400 border-red-500/30",
    purple: "bg-purple-500/15 text-purple-400 border-purple-500/30",
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`
        inline-flex
        items-center
        rounded-full
        border
        px-3
        py-1
        text-sm
        font-medium
        ${colors[color]}
      `}
    >
      {text}
    </motion.span>
  );
}

export default StatusBadge;