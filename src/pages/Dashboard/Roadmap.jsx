import { CheckCircle2, Circle, Clock3 } from "lucide-react";

function Roadmap() {
  const roadmap = [
    { week: "Week 1", title: "HTML5", status: "completed" },
    { week: "Week 2", title: "CSS3", status: "completed" },
    { week: "Week 3", title: "JavaScript", status: "current" },
    { week: "Week 4", title: "React.js", status: "pending" },
    { week: "Week 5", title: "Tailwind CSS", status: "pending" },
    { week: "Week 6", title: "Git & GitHub", status: "pending" },
    { week: "Week 7", title: "Build Portfolio", status: "pending" },
    { week: "Week 8", title: "Mock Interview", status: "pending" },
  ];

  return (
    <div className="min-h-screen bg-slate-900 p-8 text-white">

      <h1 className="text-4xl font-bold">
        Career Roadmap
      </h1>

      <p className="text-slate-400 mt-2">
        Follow your personalized learning journey.
      </p>

      {/* Career Selection */}

      <div className="mt-8">

        <label className="block text-slate-300 mb-2">
          Choose Career
        </label>

        <select className="bg-slate-800 border border-slate-700 rounded-xl px-5 py-3 text-white w-full md:w-96">

          <option>Frontend Developer</option>
          <option>Backend Developer</option>
          <option>AI Engineer</option>
          <option>Data Scientist</option>
          <option>Cyber Security</option>
          <option>Cloud Engineer</option>

        </select>

      </div>

      {/* Timeline */}

      <div className="mt-10 space-y-5">

        {roadmap.map((step, index) => (

          <div
            key={index}
            className="bg-slate-800 rounded-2xl p-6 border border-slate-700 flex items-center gap-5 hover:border-cyan-500 transition"
          >

            {step.status === "completed" && (
              <CheckCircle2
                className="text-green-400"
                size={30}
              />
            )}

            {step.status === "current" && (
              <Clock3
                className="text-yellow-400"
                size={30}
              />
            )}

            {step.status === "pending" && (
              <Circle
                className="text-slate-500"
                size={30}
              />
            )}

            <div>

              <p className="text-cyan-400 font-semibold">
                {step.week}
              </p>

              <h2 className="text-2xl font-bold">
                {step.title}
              </h2>

            </div>

          </div>

        ))}

      </div>

      <button className="mt-10 bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-xl font-semibold transition">
        Start Learning
      </button>

    </div>
  );
}

export default Roadmap;