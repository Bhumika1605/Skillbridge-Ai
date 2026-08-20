function ScoreCard() {
  const scores = [
    {
      title: "Confidence",
      value: 91,
    },
    {
      title: "Communication",
      value: 88,
    },
    {
      title: "Technical Knowledge",
      value: 93,
    },
    {
      title: "Problem Solving",
      value: 89,
    },
  ];

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">

      <h2 className="text-2xl font-bold text-white mb-8">
        AI Interview Score
      </h2>

      <div className="space-y-6">

        {scores.map((score, index) => (

          <div key={index}>

            <div className="flex justify-between mb-2">

              <span className="text-white">
                {score.title}
              </span>

              <span className="text-cyan-400 font-bold">
                {score.value}%
              </span>

            </div>

            <div className="w-full bg-slate-700 rounded-full h-3">

              <div
                className="bg-cyan-500 h-3 rounded-full"
                style={{
                  width: `${score.value}%`,
                }}
              />

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default ScoreCard;