function ScoreCard({ title, value, color }) {
  const colors = {
    cyan: "from-cyan-500 to-cyan-700",
    green: "from-green-500 to-green-700",
    yellow: "from-yellow-500 to-yellow-700",
    purple: "from-purple-500 to-purple-700",
  };

  return (
    <div className="bg-slate-800 rounded-2xl border border-slate-700 p-6 hover:border-cyan-500 transition-all duration-300 hover:scale-105">

      <p className="text-slate-400 text-sm">
        {title}
      </p>

      <div
        className={`mt-5 h-24 rounded-xl bg-gradient-to-r ${colors[color]} flex items-center justify-center`}
      >
        <h2 className="text-4xl font-bold text-white">
          {value}
        </h2>
      </div>

    </div>
  );
}

export default ScoreCard;