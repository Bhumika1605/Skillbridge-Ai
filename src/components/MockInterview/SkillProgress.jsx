function SkillProgress({
  title,
  value,
  color = "bg-cyan-500",
}) {
  return (
    <div className="mb-6">

      <div className="flex justify-between mb-2">

        <span className="text-white font-medium">
          {title}
        </span>

        <span className="text-slate-300">
          {value}%
        </span>

      </div>

      <div className="w-full bg-slate-700 rounded-full h-3">

        <div
          className={`${color} h-3 rounded-full transition-all duration-700`}
          style={{ width: `${value}%` }}
        />

      </div>

    </div>
  );
}

export default SkillProgress;