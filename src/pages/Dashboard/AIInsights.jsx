function AIInsights() {
  return (
    <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 h-full">

      <h2 className="text-3xl font-bold text-white">
        🤖 AI Insights
      </h2>

      <p className="text-slate-400 mt-2">
        Personalized career recommendations
      </p>

      <div className="mt-8 space-y-5">

        <div className="bg-slate-900 rounded-xl p-4">
          <h3 className="text-cyan-400 font-semibold">
            Resume Strength
          </h3>

          <p className="text-white text-2xl font-bold mt-2">
            92%
          </p>
        </div>

        <div className="bg-slate-900 rounded-xl p-4">
          <h3 className="text-green-400 font-semibold">
            AI Suggests
          </h3>

          <ul className="text-slate-300 mt-3 space-y-2">
            <li>✔ Learn Redux Toolkit</li>
            <li>✔ Improve DSA</li>
            <li>✔ Build one Full Stack project</li>
          </ul>
        </div>

        <div className="bg-slate-900 rounded-xl p-4">
          <h3 className="text-yellow-400 font-semibold">
            Placement Prediction
          </h3>

          <p className="text-4xl font-bold text-white mt-2">
            94%
          </p>
        </div>

      </div>

    </div>
  );
}

export default AIInsights;