import { motion } from "framer-motion";

function WorkflowStep({ icon, title, description }) {
  return (
    <motion.div
      whileHover={{
        y: -10,
        scale: 1.03,
      }}
      transition={{ duration: 0.3 }}
      className="bg-slate-800 border border-slate-700 rounded-3xl p-8 hover:border-cyan-400 transition-all duration-300"
    >
      <div className="w-18 h-18 bg-slate-700 rounded-2xl flex items-center justify-center text-cyan-400 mb-6">
        {icon}
      </div>

      <h3 className="text-2xl font-bold text-white mb-4">
        {title}
      </h3>

      <p className="text-slate-300 leading-8">
        {description}
      </p>
    </motion.div>
  );
}

export default WorkflowStep;