function ProgressBar({
  label,
  value,
}) {

  return (

    <div>

      <div className="flex justify-between text-sm text-slate-300">

        <span>{label}</span>

        <span>{value}%</span>

      </div>

      <div className="bg-slate-700 h-2 rounded-full mt-2">

        <div
          className="bg-cyan-400 h-2 rounded-full"
          style={{ width: `${value}%` }}
        />

      </div>

    </div>

  );

}

export default ProgressBar;