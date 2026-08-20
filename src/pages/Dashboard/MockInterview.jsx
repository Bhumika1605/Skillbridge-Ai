import { useState, useEffect } from "react";
import Timer from "../../components/MockInterview/Timer";
import ProgressBar from "../../components/MockInterview/ProgressBar";
import AIAvatar from "../../components/MockInterview/AIAvatar";
import InterviewAnalysis from "../../components/MockInterview/InterviewAnalysis";
import AIFeedback from "../../components/MockInterview/AIFeedback";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

function MockInterview() {
  const questions = [
    "Tell me about yourself.",
    "Why do you want to join our company?",
    "Describe a challenging project you worked on.",
    "What are your strengths and weaknesses?",
    "Where do you see yourself in 5 years?",
  ];

  const [current, setCurrent] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [listening, setListening] = useState(false);

  const recognition = SpeechRecognition
    ? new SpeechRecognition()
    : null;

  useEffect(() => {
    if (completed) return;

    if (timeLeft <= 0) {
      nextQuestion();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, completed]);

  const nextQuestion = () => {
    const updatedAnswers = [...answers];
    updatedAnswers[current] = answer;
    setAnswers(updatedAnswers);

    setAnswer("");

    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setTimeLeft(60);
      setAnswer(updatedAnswers[current + 1] || "");
    } else {
      setCompleted(true);
    }
  };

  const previousQuestion = () => {
    if (current > 0) {
      const updatedAnswers = [...answers];
      updatedAnswers[current] = answer;
      setAnswers(updatedAnswers);

      setCurrent(current - 1);
      setAnswer(updatedAnswers[current - 1] || "");
    }
  };

  const startListening = () => {
    if (!recognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    recognition.lang = "en-US";
    recognition.interimResults = false;

    recognition.start();

    setListening(true);

    recognition.onresult = (event) => {
      setAnswer(event.results[0][0].transcript);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  if (completed) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen">

        <div className="bg-slate-800 rounded-3xl p-10 max-w-3xl w-full border border-slate-700">

          <h1 className="text-5xl font-bold text-white">
            Interview Completed 🎉
          </h1>

          <p className="text-slate-400 mt-4">
            Your mock interview has been completed successfully.
          </p>

          <InterviewAnalysis answers={answers} />

          <AIFeedback answers={answers} />

          <button
            onClick={() => {
              setCurrent(0);
              setAnswer("");
              setAnswers([]);
              setCompleted(false);
              setTimeLeft(60);
            }}
            className="mt-10 bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-xl"
          >
            Take Interview Again
          </button>

        </div>

      </div>
    );
  }

  return (
    <div className="p-8">

      <h1 className="text-5xl font-bold text-white">
        AI Mock Interview
      </h1>

      <p className="text-slate-400 mt-3">
        Practice HR interview questions.
      </p>

      <div className="mt-8">
        <AIAvatar />
      </div>

      <div className="mt-10 bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-10 border border-slate-700 shadow-2xl">

        <div className="flex items-center justify-between">

          <h2 className="text-cyan-400 text-3xl font-bold">
            Question {current + 1} of {questions.length}
          </h2>

          <Timer timeLeft={timeLeft} />

        </div>

        <ProgressBar
          current={current}
          total={questions.length}
        />

                <h3 className="text-white text-5xl mt-10">
          {questions[current]}
        </h3>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Type your answer here..."
          className="w-full h-44 mt-10 bg-slate-900 border border-slate-700 rounded-2xl p-6 text-white outline-none resize-none"
        />

        <div className="flex justify-end mt-4">

          <button
            onClick={startListening}
            className={`px-6 py-3 rounded-xl font-semibold transition ${
              listening
                ? "bg-red-500 text-white animate-pulse"
                : "bg-cyan-500 hover:bg-cyan-600 text-white"
            }`}
          >
            {listening ? "🎤 Listening..." : "🎤 Speak Answer"}
          </button>

        </div>

        <div className="flex justify-between mt-10">

          <button
            onClick={previousQuestion}
            disabled={current === 0}
            className="bg-slate-700 hover:bg-slate-600 disabled:opacity-40 text-white px-8 py-4 rounded-xl"
          >
            Previous
          </button>

          <button
            onClick={nextQuestion}
            className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-xl"
          >
            {current === questions.length - 1
              ? "Finish Interview"
              : "Next →"}
          </button>

        </div>

      </div>

    </div>
  );
}

export default MockInterview;