import { motion } from "framer-motion";

function SectionHeader({
  title,
  subtitle,
  action,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col md:flex-row md:items-center md:justify-between mb-6"
    >
      <div>

        <h2 className="text-2xl font-bold text-white">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-2 text-slate-400">
            {subtitle}
          </p>
        )}

      </div>

      {action && (
        <div className="mt-4 md:mt-0">
          {action}
        </div>
      )}
    </motion.div>
  );
}

export default SectionHeader;