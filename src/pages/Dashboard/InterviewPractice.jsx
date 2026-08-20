import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { ChevronLeft, ChevronRight, Clock } from "lucide-react";
import { evaluateInterview } from "../../services/gemini";
import { interviewQuestions } from "../../data/interviewQuestions";

function InterviewPractice() {
  const navigate = useNavigate();
  const { category } = useParams();

  const questions =
    interviewQuestions[category] || interviewQuestions.hr;

  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState(
    Array(questions.length).fill("")
  );

  const [loading, setLoading] = useState(false);
  const textareaRef = useRef(null);

  useEffect(() => {
  textareaRef.current?.focus();
}, [currentQuestion]);

  const handleAnswerChange = (e) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestion] = e.target.value;
    setAnswers(updatedAnswers);
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  };

  const finishInterview = async () => {
    const unanswered = answers.some(
      (answer) => answer.trim() === ""
    );

    if (unanswered) {
      alert("Please answer all questions before finishing.");
      return;
    }

    try {
      setLoading(true);

      const result = await evaluateInterview(
        questions,
        answers
      );

      navigate("/interview/result", {
        state: {
          result,
        },
      });

    } catch (error) {
      console.error("Interview Evaluation Error:", error);

      alert("Failed to evaluate interview.");

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex bg-slate-900 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Topbar />

        <div className="p-8">

          {/* Header */}

          <div className="flex justify-between items-center">

            <div>

              <h1 className="text-4xl font-bold text-white">
                {category
                  ? `${category.toUpperCase()} Interview`
                  : "AI Interview"}
              </h1>

              <p className="text-slate-400 mt-2">
                Answer each question carefully.
              </p>

            </div>

            <div className="flex items-center gap-2 bg-slate-800 px-5 py-3 rounded-xl">

              <Clock className="text-cyan-400" />

              <span className="text-white font-semibold">
                10:00
              </span>

            </div>

          </div>

          {/* Progress */}

          <div className="mt-8">

            <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">

              <div
                className="h-full bg-cyan-500 transition-all"
                style={{
                  width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                }}
              />

            </div>

          </div>

          {/* Question Card */}

          <div className="bg-slate-800 rounded-3xl p-8 mt-8">

            <h2 className="text-cyan-400 font-semibold">
              Question {currentQuestion + 1} / {questions.length}
            </h2>

            <h3 className="text-3xl font-bold text-white mt-4">
              {questions[currentQuestion]}
            </h3>

            <textarea
              ref={textareaRef}
              value={answers[currentQuestion]}
              onChange={handleAnswerChange}
              placeholder="Write your answer here..."
              className="w-full mt-8 h-56 bg-slate-900 border border-slate-700 rounded-2xl p-6 text-white resize-none outline-none focus:border-cyan-500"
            />

            <div className="flex justify-between mt-8">

              <button
                onClick={previousQuestion}
                disabled={currentQuestion === 0 || loading}
                className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 disabled:opacity-40 px-6 py-3 rounded-xl text-white"
              >
                <ChevronLeft size={20} />
                Previous
              </button>

              {currentQuestion === questions.length - 1 ? (

                <button
                  onClick={finishInterview}
                  disabled={loading}
                  className="bg-green-500 hover:bg-green-600 disabled:opacity-50 px-8 py-3 rounded-xl text-white font-semibold"
                >
                  {loading ? "Evaluating..." : "Finish Interview"}
                </button>

              ) : (

                <button
                  onClick={nextQuestion}
                  disabled={loading}
                  className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-xl text-white"
                >
                  Next
                  <ChevronRight size={20} />
                </button>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default InterviewPractice;