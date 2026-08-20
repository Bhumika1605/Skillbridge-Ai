import { useState } from "react";

function HRInterview() {
  const questions = [
    {
      question: "Tell me about yourself.",
      answer:
        "Introduce yourself briefly, your education, skills, projects, and career goals.",
    },
    {
      question: "Why should we hire you?",
      answer:
        "Highlight your skills, strengths, willingness to learn, and how you can add value to the company.",
    },
    {
      question: "What are your strengths?",
      answer:
        "Mention strengths like problem solving, teamwork, communication, adaptability, and quick learning.",
    },
    {
      question: "What is your biggest weakness?",
      answer:
        "Mention a genuine weakness and explain how you are improving it.",
    },
    {
      question: "Where do you see yourself in 5 years?",
      answer:
        "Talk about growing professionally, improving technical skills, and contributing to the organization.",
    },
  ];

  const [current, setCurrent] = useState(0);

  return (
    <div className="p-8">

      <h1 className="text-5xl font-bold text-white">
        HR Interview
      </h1>

      <p className="text-slate-400 mt-2">
        Practice HR & Behavioral Questions.
      </p>

      <div className="mt-10 bg-slate-800 rounded-3xl border border-slate-700 p-8">

        <h2 className="text-cyan-400 text-3xl font-bold">
          Question {current + 1}
        </h2>

        <p className="text-white text-2xl mt-8">
          {questions[current].question}
        </p>

        <div className="bg-slate-900 rounded-2xl p-8 mt-8">

          <h3 className="text-green-400 text-2xl font-bold">
            Suggested Answer
          </h3>

          <p className="text-white mt-6 text-xl leading-8">
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

export default HRInterview;