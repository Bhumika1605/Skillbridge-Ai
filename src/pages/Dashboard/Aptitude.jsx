import { useState } from "react";

function Aptitude() {
  const questions = [
    {
      question: "What is 25% of 400?",
      answer: "100",
    },
    {
      question: "If a train travels 60 km/hr for 2 hours, distance?",
      answer: "120 km",
    },
    {
      question: "Find the next number: 2, 4, 8, 16, ?",
      answer: "32",
    },
    {
      question: "A man buys for ₹100 and sells for ₹120. Profit?",
      answer: "20%",
    },
    {
      question: "If 5x = 25 then x = ?",
      answer: "5",
    },
  ];

  const [current, setCurrent] = useState(0);

  return (
    <div className="p-8">

      <h1 className="text-5xl font-bold text-white">
        Aptitude Test
      </h1>

      <p className="text-slate-400 mt-2">
        Quantitative & Logical Reasoning Practice.
      </p>

      <div className="mt-10 bg-slate-800 p-8 rounded-3xl border border-slate-700">

        <h2 className="text-cyan-400 text-3xl font-bold">
          Question {current + 1}
        </h2>

        <p className="text-white text-2xl mt-8">
          {questions[current].question}
        </p>

        <div className="bg-slate-900 rounded-2xl p-8 mt-8">

          <h3 className="text-green-400 text-2xl font-bold">
            Answer
          </h3>

          <p className="text-white mt-6 text-xl">
            {questions[current].answer}
          </p>

        </div>

        <div className="flex justify-between mt-10">

          <button
            disabled={current === 0}
            onClick={() => setCurrent(current - 1)}
            className="bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-xl text-white disabled:opacity-40"
          >
            Previous
          </button>

          <button
            disabled={current === questions.length - 1}
            onClick={() => setCurrent(current + 1)}
            className="bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl text-white disabled:opacity-40"
          >
            Next
          </button>

        </div>

      </div>

    </div>
  );
}

export default Aptitude;