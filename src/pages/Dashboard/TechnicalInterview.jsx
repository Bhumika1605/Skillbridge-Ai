import { useState } from "react";

function TechnicalInterview() {
  const questions = [
    {
      question: "What is React?",
      answer:
        "React is a JavaScript library used for building user interfaces using reusable components.",
    },
    {
      question: "Difference between let, var and const?",
      answer:
        "var is function scoped, let and const are block scoped. const cannot be reassigned.",
    },
    {
      question: "What is Virtual DOM?",
      answer:
        "Virtual DOM is a lightweight copy of the real DOM used by React to update UI efficiently.",
    },
    {
      question: "What is Tailwind CSS?",
      answer:
        "Tailwind CSS is a utility-first CSS framework used to build responsive interfaces quickly.",
    },
    {
      question: "What is JavaScript Closure?",
      answer:
        "A closure allows a function to access variables from its outer scope even after the outer function has finished execution.",
    },
  ];

  const [current, setCurrent] = useState(0);

  return (
    <div className="p-8">

      <h1 className="text-4xl font-bold text-white">
        Technical Interview
      </h1>

      <div className="mt-10 bg-slate-800 rounded-3xl border border-slate-700 p-8">

        <h2 className="text-2xl font-bold text-cyan-400">
          Question {current + 1}
        </h2>

        <p className="text-white text-xl mt-6">
          {questions[current].question}
        </p>

        <div className="mt-8 bg-slate-900 rounded-2xl p-6">

          <h3 className="text-green-400 font-bold">
            Answer
          </h3>

          <p className="text-slate-300 mt-4 leading-8">
            {questions[current].answer}
          </p>

        </div>

        <div className="flex justify-between mt-8">

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

export default TechnicalInterview;