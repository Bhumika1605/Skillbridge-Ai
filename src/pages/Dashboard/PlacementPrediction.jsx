function PlacementPrediction() {
  return (
    <div className="bg-slate-800 rounded-3xl border border-slate-700 p-8">

      <h2 className="text-3xl font-bold text-white">
        🎯 Placement Prediction
      </h2>

      <p className="text-slate-400 mt-2">
        AI estimated placement probability
      </p>

      <div className="flex justify-center mt-10">

        <div className="relative w-44 h-44">

          <svg className="w-44 h-44 rotate-[-90deg]">

            <circle
              cx="88"
              cy="88"
              r="70"
              stroke="#334155"
              strokeWidth="14"
              fill="none"
            />

            <circle
              cx="88"
              cy="88"
              r="70"
              stroke="#06b6d4"
              strokeWidth="14"
              fill="none"
              strokeDasharray="440"
              strokeDashoffset="57"
              strokeLinecap="round"
            />

          </svg>

          <div className="absolute inset-0 flex items-center justify-center">

            <div className="text-center">

              <h1 className="text-5xl font-bold text-cyan-400">
                87%
              </h1>

              <p className="text-slate-400">
                Excellent
              </p>

            </div>

          </div>

        </div>

      </div>

      <div className="mt-8 bg-slate-900 rounded-xl p-5">

        <h3 className="text-green-400 font-semibold">
          Expected Salary
        </h3>

        <p className="text-white text-3xl mt-2 font-bold">
          ₹6–9 LPA
        </p>

      </div>

    </div>
  );
}

export default PlacementPrediction;