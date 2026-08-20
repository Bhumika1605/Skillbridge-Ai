import { useNavigate } from "react-router-dom";

function Interview() {
  const navigate = useNavigate();

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold text-white">
        AI Interview Preparation
      </h1>

      <p className="text-slate-400 mt-2">
        Practice technical, aptitude and HR interview questions.
      </p>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mt-10">

        {/* Technical */}

        <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 hover:border-cyan-500 hover:shadow-xl hover:shadow-cyan-500/20 transition duration-300 flex flex-col min-h-[300px]">

          <h2 className="text-2xl text-white font-bold">
            💻 Technical
          </h2>

          <p className="text-slate-400 mt-3">
            Programming, React, JavaScript & DSA Questions
          </p>

          <div className="mt-6 space-y-2 text-slate-300">
            <p>⏱ Duration : 20 mins</p>
            <p>❓ Questions : 15</p>
            <p>📊 Difficulty : Medium</p>
            <p>🤖 AI Feedback Included</p>
          </div>

          <button
            onClick={() => navigate("/technical")}
            className="mt-auto bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl text-white font-semibold"
          >
            Start Interview →
          </button>

        </div>

        {/* Aptitude */}

        <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 flex flex-col min-h-[250px]">

          <h2 className="text-2xl text-white font-bold">
            Aptitude
          </h2>

          <p className="text-slate-400 mt-3">
            Quantitative & Logical Reasoning
          </p>

          <button
            onClick={() => navigate("/aptitude")}
            className="mt-auto bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl text-white w-fit"
          >
            Start
          </button>

        </div>

        {/* HR */}

        <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 flex flex-col min-h-[250px]">

          <h2 className="text-2xl text-white font-bold">
            HR Round
          </h2>

          <p className="text-slate-400 mt-3">
            HR & Behavioral Questions
          </p>

          <button
            onClick={() => navigate("/hr-interview")}
            className="mt-auto bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl text-white w-fit"
          >
            Start
          </button>

        </div>

        {/* Mock */}

        <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 flex flex-col min-h-[250px]">

          <h2 className="text-2xl text-white font-bold">
            Mock Interview
          </h2>

          <p className="text-slate-400 mt-3">
            AI Powered Interview Practice
          </p>

          <button
            onClick={() => navigate("/mock-interview")}
            className="mt-auto bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl text-white w-fit"
          >
            Start
          </button>

        </div>

      </div>

    </div>
  );
}

export default Interview;