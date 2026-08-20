import { motion } from "framer-motion";

function GradientButton({
  children,
  className = "",
  ...props
}) {
  return (
    <motion.button
      whileHover={{
        scale: 1.04,
      }}
      whileTap={{
        scale: 0.97,
      }}
      className={`
        px-6
        py-3
        rounded-2xl
        font-semibold
        text-white
        bg-gradient-to-r
        from-cyan-500
        via-sky-500
        to-blue-600
        shadow-lg
        shadow-cyan-500/20
        transition-all
        duration-300
        hover:shadow-cyan-500/40
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.button>
  );
}

export default GradientButton;