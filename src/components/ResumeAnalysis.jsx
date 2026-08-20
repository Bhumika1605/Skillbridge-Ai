import {
  CheckCircle,
  XCircle,
  Lightbulb,
} from "lucide-react";

function ResumeAnalysis() {
  return (
    <div className="space-y-8 mt-10">

      {/* Scores */}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        <div className="bg-slate-800 rounded-2xl p-6 border border-cyan-500">
          <h3 className="text-slate-400">Resume Score</h3>

          <p className="text-5xl font-bold text-cyan-400 mt-3">
            92%
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6 border border-green-500">
          <h3 className="text-slate-400">ATS Score</h3>

          <p className="text-5xl font-bold text-green-400 mt-3">
            88%
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6 border border-purple-500">
          <h3 className="text-slate-400">Career Readiness</h3>

          <p className="text-5xl font-bold text-purple-400 mt-3">
            91%
          </p>
        </div>

        <div className="bg-slate-800 rounded-2xl p-6 border border-yellow-500">

  <h3 className="text-slate-400">
    AI Confidence
  </h3>

  <p className="text-5xl font-bold text-yellow-400 mt-3">
    94%
  </p>

</div>

      </div>

      {/* Skills */}

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-slate-800 rounded-2xl p-6">

          <h2 className="text-white text-2xl font-bold mb-5">
            Skills Found
          </h2>

          <div className="flex flex-wrap gap-3">

            {[
              "HTML",
              "CSS",
              "JavaScript",
              "React",
              "Tailwind CSS",
            ].map((skill) => (
              <div
                key={skill}
                className="flex items-center gap-2 bg-green-500/10 border border-green-500 px-4 py-2 rounded-full text-green-400 hover:scale-105 transition"
              >
                <CheckCircle size={18} />
                {skill}
              </div>
            ))}

          </div>

        </div>

        <div className="bg-slate-800 rounded-2xl p-6">

          <h2 className="text-white text-2xl font-bold mb-5">
            Missing Skills
          </h2>

          <div className="flex flex-wrap gap-3">

            {[
              "Node.js",
              "Express.js",
              "MongoDB",
              "Git",
            ].map((skill) => (
              <div
                key={skill}
                className="flex items-center gap-2 bg-red-500/10 border border-red-500 px-4 py-2 rounded-full text-red-400 hover:scale-105 transition"
              >
                <XCircle size={18} />
                {skill}
              </div>
            ))}

          </div>

        </div>

      </div>

      {/* AI Suggestions */}

      <div className="bg-slate-800 rounded-2xl p-6">

        <h2 className="text-white text-2xl font-bold mb-6">
          AI Suggestions
        </h2>

        <div className="grid md:grid-cols-2 gap-4">

          {[
            "Add measurable achievements.",
            "Improve your professional summary.",
            "Add GitHub profile.",
            "Add LinkedIn profile.",
            "Mention internships and certifications.",
            "Reduce resume to one page.",
          ].map((tip) => (
            <div
  key={tip}
  className="flex items-start gap-4 bg-slate-900 border border-slate-700 rounded-2xl p-5 hover:border-cyan-500 hover:shadow-lg hover:shadow-cyan-500/10 transition"
>
  <Lightbulb
    className="text-yellow-400 mt-1"
    size={22}
  />

  <p className="text-slate-300 leading-7">
    {tip}
  </p>

</div>
          ))}

        </div>

      </div>

      {/* Progress Analysis */}

<div className="bg-slate-800 rounded-2xl p-6">

  <h2 className="text-2xl font-bold text-white mb-8">
    Resume Strength
  </h2>

  <div className="space-y-8">

    <div>

      <div className="flex justify-between mb-2">
        <span className="text-slate-300">
          Technical Skills
        </span>

        <span className="text-cyan-400 font-semibold">
          92%
        </span>
      </div>

      <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
        <div className="h-full w-[92%] bg-cyan-500 rounded-full"></div>
      </div>

    </div>

    <div>

      <div className="flex justify-between mb-2">
        <span className="text-slate-300">
          Experience
        </span>

        <span className="text-green-400 font-semibold">
          80%
        </span>
      </div>

      <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
        <div className="h-full w-[80%] bg-green-500 rounded-full"></div>
      </div>

    </div>

    <div>

      <div className="flex justify-between mb-2">
        <span className="text-slate-300">
          Projects
        </span>

        <span className="text-yellow-400 font-semibold">
          95%
        </span>
      </div>

      <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
        <div className="h-full w-[95%] bg-yellow-500 rounded-full"></div>
      </div>

    </div>

    <div>

      <div className="flex justify-between mb-2">
        <span className="text-slate-300">
          Communication
        </span>

        <span className="text-purple-400 font-semibold">
          85%
        </span>
      </div>

      <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
        <div className="h-full w-[85%] bg-purple-500 rounded-full"></div>
      </div>

    </div>

  </div>

</div>

{/* ATS Keyword Scanner */}

<div className="bg-slate-800 rounded-3xl p-8 mt-8 border border-slate-700">

  <h2 className="text-3xl font-bold text-white mb-8">
    🔍 ATS Keyword Scanner
  </h2>

  <div className="grid md:grid-cols-2 gap-8">

    {/* Keywords Found */}

    <div>

      <h3 className="text-green-400 text-xl font-semibold mb-5">
        ✅ Keywords Found
      </h3>

      <div className="flex flex-wrap gap-3">

        {[
          "HTML",
          "CSS",
          "JavaScript",
          "React",
          "Tailwind CSS",
          "GitHub",
        ].map((item) => (

          <span
            key={item}
            className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500 text-green-400"
          >
            {item}
          </span>

        ))}

      </div>

    </div>

    {/* Missing Keywords */}

    <div>

      <h3 className="text-red-400 text-xl font-semibold mb-5">
        ❌ Missing Keywords
      </h3>

      <div className="flex flex-wrap gap-3">

        {[
          "Node.js",
          "MongoDB",
          "REST API",
          "SQL",
          "Docker",
          "AWS",
        ].map((item) => (

          <span
            key={item}
            className="px-4 py-2 rounded-full bg-red-500/10 border border-red-500 text-red-400"
          >
            {item}
          </span>

        ))}

      </div>

    </div>

  </div>

</div>

{/* AI Overall Feedback */}

<div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500 rounded-3xl p-8 mt-8">

  <h2 className="text-3xl font-bold text-cyan-400">
    🤖 AI Overall Feedback
  </h2>

  <p className="text-slate-300 mt-5 leading-8 text-lg">
    Your resume is well structured and demonstrates strong frontend
    development skills. The ATS score is excellent, and your projects
    showcase practical experience. To further strengthen your resume,
    include measurable achievements, relevant certifications, GitHub
    contributions, and backend technologies like Node.js and MongoDB.
    This can significantly improve your placement opportunities.
  </p>

</div>

<div className="flex justify-end mt-8">

  <button
    className="bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-2xl text-white font-semibold transition hover:scale-105"
  >
    📥 Download AI Report
  </button>

</div>

    </div>
  );
}

export default ResumeAnalysis;