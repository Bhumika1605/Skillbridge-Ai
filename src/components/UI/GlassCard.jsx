import { motion } from "framer-motion";

function GlassCard({
  children,
  className = "",
  hover = true,
}) {
  return (
    <motion.div
      whileHover={
        hover
          ? {
              y: -6,
              scale: 1.02,
            }
          : {}
      }
      transition={{
        duration: 0.25,
      }}
      className={`
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/5
        backdrop-blur-xl
        shadow-[0_8px_40px_rgba(0,0,0,0.35)]
        ${className}
      `}
    >
      {/* Top Glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

      {/* Background Glow */}
      <div className="absolute -top-16 -right-16 h-32 w-32 rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}

export default GlassCard;