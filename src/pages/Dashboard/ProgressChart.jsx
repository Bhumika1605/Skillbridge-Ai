import LineChart from "../../components/Dashboard/LineChart";

function ProgressChart() {
  return (
    <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-3xl font-bold text-white">
            Weekly Progress
          </h2>

          <p className="text-slate-400 mt-2">
            Your learning activity this week
          </p>

        </div>

        <div className="text-right">

          <h1 className="text-cyan-400 text-6xl font-bold">
            92%
          </h1>

          <p className="text-slate-400">
            Average
          </p>

        </div>

      </div>

      <LineChart />

    </div>
  );
}

export default ProgressChart;