function CareerScoreCard({ title, score, color }) {
  return (
    <div className="bg-slate-800 rounded-3xl p-6 shadow-xl border border-slate-700 hover:scale-105 transition">

      <h2 className="text-slate-400 text-lg">
        {title}
      </h2>

      <h1 className={`text-5xl font-bold mt-4 ${color}`}>
        {score}%
      </h1>

      <div className="w-full h-3 bg-slate-700 rounded-full mt-6">

        <div
          className="h-full rounded-full bg-cyan-500"
          style={{ width: `${score}%` }}
        />

      </div>

    </div>
  );
}

export default CareerScoreCard;