import ScoreCard from "./ScoreCard";
import SkillProgress from "./SkillProgress";

function InterviewAnalysis({ answers }) {
  const totalWords = answers
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  // Better scoring algorithm
  const overall = Math.min(95, Math.max(45, Math.round(totalWords * 0.65)));

  const communication = Math.min(
    100,
    overall + Math.floor(Math.random() * 8)
  );

  const confidence = Math.min(
    100,
    overall - 5 + Math.floor(Math.random() * 10)
  );

  const technical = Math.min(
    100,
    overall - 3 + Math.floor(Math.random() * 12)
  );

  const professionalism = Math.min(
    100,
    overall + Math.floor(Math.random() * 6)
  );

  const problemSolving = Math.min(
    100,
    overall - 4 + Math.floor(Math.random() * 12)
  );

  const grammar = Math.min(
    100,
    overall + 2 + Math.floor(Math.random() * 8)
  );

  const placement =
    overall >= 85
      ? "Excellent"
      : overall >= 70
      ? "Good"
      : overall >= 55
      ? "Average"
      : "Needs Improvement";

  const roles =
    technical > 80
      ? [
          "Frontend Developer",
          "React Developer",
          "Software Engineer",
          "UI Engineer",
        ]
      : [
          "Web Developer",
          "Junior Frontend Developer",
          "Intern",
        ];

  return (
    <div className="mt-12">

      <h2 className="text-4xl font-bold text-white mb-8">
        📊 AI Interview Analysis
      </h2>

      {/* Score Cards */}

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">

        <ScoreCard
          title="Overall"
          value={overall}
          color="from-cyan-500 to-blue-600"
        />

        <ScoreCard
          title="Communication"
          value={communication}
          color="from-pink-500 to-purple-600"
        />

        <ScoreCard
          title="Confidence"
          value={confidence}
          color="from-green-500 to-emerald-600"
        />

        <ScoreCard
          title="Technical"
          value={technical}
          color="from-orange-500 to-red-500"
        />

        <ScoreCard
          title="Problem Solving"
          value={problemSolving}
          color="from-indigo-500 to-violet-600"
        />

        <ScoreCard
          title="Grammar"
          value={grammar}
          color="from-yellow-500 to-orange-500"
        />

      </div>

      {/* Performance */}

      <div className="bg-slate-900 rounded-3xl mt-10 p-8 border border-slate-700">

        <h2 className="text-3xl font-bold text-white mb-8">
          📈 Performance Breakdown
        </h2>

        <SkillProgress
          title="Communication"
          value={communication}
          color="bg-cyan-500"
        />

        <SkillProgress
          title="Confidence"
          value={confidence}
          color="bg-green-500"
        />

        <SkillProgress
          title="Technical Knowledge"
          value={technical}
          color="bg-pink-500"
        />

        <SkillProgress
          title="Problem Solving"
          value={problemSolving}
          color="bg-orange-500"
        />

        <SkillProgress
          title="Grammar"
          value={grammar}
          color="bg-violet-500"
        />

      </div>

      {/* Strengths & Improvements */}

      <div className="grid md:grid-cols-2 gap-8 mt-10">

        <div className="bg-green-900/20 border border-green-700 rounded-3xl p-8">

          <h2 className="text-2xl font-bold text-green-400 mb-5">
            ✅ Strengths
          </h2>

          <ul className="space-y-3 text-slate-300">

            <li>✔ Clear communication skills</li>
            <li>✔ Professional tone</li>
            <li>✔ Good interview confidence</li>
            <li>✔ Strong willingness to learn</li>

          </ul>

        </div>

        <div className="bg-red-900/20 border border-red-700 rounded-3xl p-8">

          <h2 className="text-2xl font-bold text-red-400 mb-5">
            📌 Areas to Improve
          </h2>

          <ul className="space-y-3 text-slate-300">

            <li>• Add measurable achievements</li>
            <li>• Use STAR Method</li>
            <li>• Explain projects in depth</li>
            <li>• Maintain eye contact & confidence</li>

          </ul>

        </div>

      </div>

      {/* Placement */}

      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl p-8 mt-10 text-white">

        <h2 className="text-3xl font-bold">
          💼 Placement Readiness
        </h2>

        <h1 className="text-6xl font-bold mt-4">
          {overall}%
        </h1>

        <p className="text-xl mt-2">
          {placement}
        </p>

        <div className="mt-8">

          <h3 className="text-2xl font-semibold mb-4">
            🎯 Recommended Roles
          </h3>

          <div className="flex flex-wrap gap-3">

            {roles.map((role) => (
              <span
                key={role}
                className="bg-white/20 px-5 py-2 rounded-full"
              >
                {role}
              </span>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}

export default InterviewAnalysis;