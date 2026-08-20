import { motion } from "framer-motion";

function PageHeader({
  badge,
  title,
  subtitle,
  action,
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      className="mb-8"
    >
      {badge && (
        <span className="inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-2 text-sm font-semibold text-cyan-300">
          {badge}
        </span>
      )}

      <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white lg:text-4xl">
            {title}
          </h1>

          <p className="mt-3 max-w-2xl text-slate-400">
            {subtitle}
          </p>
        </div>

        {action}
      </div>
    </motion.div>
  );
}

export default PageHeader;