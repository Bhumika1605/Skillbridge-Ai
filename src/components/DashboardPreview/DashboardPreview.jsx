import {
  TrendingUp,
  FileText,
  Briefcase,
  Sparkles,
} from "lucide-react";

function DashboardPreview() {
  return (
    <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700 rounded-3xl p-6 shadow-2xl">

      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-white">
          Career Dashboard
        </h3>

        <span className="bg-cyan-500 text-white text-xs px-3 py-1 rounded-full">
          AI
        </span>
      </div>

      <div className="space-y-6">

        {/* Career Score */}
        <div>
          <div className="flex items-center justify-between mb-2">

            <div className="flex items-center gap-2">
              <TrendingUp className="text-cyan-400" size={18} />
              <span>Career Score</span>
            </div>

            <span className="font-semibold">92%</span>

          </div>

          <div className="w-full h-2 bg-slate-700 rounded-full">
            <div className="w-[92%] h-2 bg-cyan-400 rounded-full"></div>
          </div>
        </div>

        {/* Resume */}
        <div>
          <div className="flex items-center justify-between mb-2">

            <div className="flex items-center gap-2">
              <FileText className="text-green-400" size={18} />
              <span>Resume Score</span>
            </div>

            <span className="font-semibold">88%</span>

          </div>

          <div className="w-full h-2 bg-slate-700 rounded-full">
            <div className="w-[88%] h-2 bg-green-400 rounded-full"></div>
          </div>
        </div>

        {/* Placement */}
        <div>
          <div className="flex items-center justify-between mb-2">

            <div className="flex items-center gap-2">
              <Briefcase className="text-blue-400" size={18} />
              <span>Placement Readiness</span>
            </div>

            <span className="font-semibold">91%</span>

          </div>

          <div className="w-full h-2 bg-slate-700 rounded-full">
            <div className="w-[91%] h-2 bg-blue-400 rounded-full"></div>
          </div>
        </div>

      </div>

      {/* AI Recommendation */}

      <div className="mt-8 rounded-2xl bg-slate-900 p-4 border border-slate-700">

        <div className="flex items-center gap-2 mb-2">

          <Sparkles className="text-yellow-400" size={18} />

          <h4 className="font-semibold">
            AI Recommendation
          </h4>

        </div>

        <p className="text-sm text-slate-300">
          Learn React, Git, and build one portfolio project
          to improve your placement chances.
        </p>

      </div>

    </div>
  );
}

export default DashboardPreview;