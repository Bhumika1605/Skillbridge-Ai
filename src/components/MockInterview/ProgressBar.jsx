function ProgressBar({ current, total }) {
  const progress = ((current + 1) / total) * 100;

  return (
  <div className="mt-6">

    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">

      <div
        className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-500"
        style={{ width: `${progress}%` }}
      />

    </div>

  </div>
);
}

export default ProgressBar;