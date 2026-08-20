import { analyzeAnswer } from "./AIUtils";

function AIFeedback({ answers }) {
  const questions = [
    "Tell me about yourself.",
    "Why do you want to join our company?",
    "Describe a challenging project you worked on.",
    "What are your strengths and weaknesses?",
    "Where do you see yourself in 5 years?",
  ];

  const getAnalysis = (answer) => {
    const result = analyzeAnswer(answer);

    const strengths = [];
    const improvements = [];

    if (result.techCount > 0)
      strengths.push("Mentioned technical skills and technologies.");

    if (result.actionCount > 0)
      strengths.push("Used action-oriented language.");

    if (result.exampleCount > 0)
      strengths.push("Included practical examples or experience.");

    if (result.words > 35)
      strengths.push("Answer is detailed and well explained.");

    if (result.words < 15)
      improvements.push("Expand your answer with more details.");

    if (result.techCount === 0)
      improvements.push("Mention technologies or relevant skills.");

    if (result.exampleCount === 0)
      improvements.push("Support your answer with a real example.");

    if (result.actionCount === 0)
      improvements.push("Use action words like developed, created, implemented.");

    if (strengths.length === 0)
      strengths.push("Answer is understandable.");

    if (improvements.length === 0)
      improvements.push("Keep practicing to improve fluency and confidence.");

    return {
      ...result,
      strengths,
      improvements,
    };
  };

  return (
    <div className="mt-12">

      <h2 className="text-4xl font-bold text-white mb-8">
        🤖 AI Interview Feedback
      </h2>

      <div className="space-y-8">

        {answers.map((answer, index) => {
          const report = getAnalysis(answer || "");

          return (
            <div
              key={index}
              className="bg-slate-900 border border-slate-700 rounded-3xl p-8"
            >

              <div className="flex justify-between items-center">

                <div>

                  <h3 className="text-2xl font-bold text-white">
                    Question {index + 1}
                  </h3>

                  <p className="text-slate-400 mt-1">
                    {questions[index]}
                  </p>

                </div>

                <div className="text-center">

                  <h1 className="text-5xl font-bold text-cyan-400">
                    {report.score}%
                  </h1>

                  <p className="text-slate-400">
                    AI Score
                  </p>

                </div>

              </div>

              <div className="mt-8">

                <h4 className="text-cyan-400 text-xl font-bold">
                  💬 Your Answer
                </h4>

                <div className="bg-slate-800 rounded-2xl p-5 mt-3">

                  <p className="text-slate-300 leading-8 whitespace-pre-wrap">
                    {answer || "No answer provided."}
                  </p>

                </div>

              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-8">

                <div className="bg-green-900/20 border border-green-700 rounded-2xl p-5">

                  <h4 className="text-green-400 font-bold text-xl mb-4">
                    ✅ Strengths
                  </h4>

                  <ul className="space-y-2 text-slate-300">

                    {report.strengths.map((item, i) => (
                      <li key={i}>✔ {item}</li>
                    ))}

                  </ul>

                </div>

                <div className="bg-red-900/20 border border-red-700 rounded-2xl p-5">

                  <h4 className="text-red-400 font-bold text-xl mb-4">
                    📌 Improvements
                  </h4>

                  <ul className="space-y-2 text-slate-300">

                    {report.improvements.map((item, i) => (
                      <li key={i}>• {item}</li>
                    ))}

                  </ul>

                </div>

              </div>

            </div>
          );
        })}

      </div>

      <div className="mt-12 bg-gradient-to-r from-cyan-600 to-blue-700 rounded-3xl p-8">

        <h2 className="text-3xl font-bold text-white">
          🚀 Final Recommendation
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mt-8 text-white">

          <div>

            <h3 className="font-bold text-xl mb-4">
              Keep Doing
            </h3>

            <ul className="space-y-2">

              <li>✅ Speak confidently.</li>
              <li>✅ Mention real projects.</li>
              <li>✅ Explain your contribution.</li>
              <li>✅ Use technical terms naturally.</li>

            </ul>

          </div>

          <div>

            <h3 className="font-bold text-xl mb-4">
              Improve Further
            </h3>

            <ul className="space-y-2">

              <li>📌 Use the STAR method.</li>
              <li>📌 Give measurable achievements.</li>
              <li>📌 Add business impact.</li>
              <li>📌 Practice speaking fluently.</li>

            </ul>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AIFeedback;