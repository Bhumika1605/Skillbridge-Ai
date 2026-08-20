import { useLocation, Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

import {
  Trophy,
  Brain,
  MessageCircle,
  Code,
  Lightbulb,
  BookOpen,
  RotateCcw,
  Home,
} from "lucide-react";

import { Radar } from "react-chartjs-2";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function InterviewResult() {
  const { state } = useLocation();

  const result = state?.result;

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            No Interview Result Found
          </h1>

          <Link
            to="/interview"
            className="mt-8 inline-block bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-xl"
          >
            Go Back
          </Link>
        </div>
      </div>
    );
  }

const hiringProbability = Math.min(
  100,
  Math.round(
    (
      result?.overall +
      result?.confidence +
      result?.communication
    ) / 3
  )
);

const level =
  hiringProbability >= 90
    ? "Excellent"
    : hiringProbability >= 75
    ? "Advanced"
    : hiringProbability >= 60
    ? "Intermediate"
    : "Beginner";

    const grade =
  hiringProbability >= 95
    ? "A+"
    : hiringProbability >= 90
    ? "A"
    : hiringProbability >= 80
    ? "B+"
    : hiringProbability >= 70
    ? "B"
    : hiringProbability >= 60
    ? "C"
    : "D";

  const scoreCards = [
    {
      title: "Overall",
      value: result.overall,
      color: "text-cyan-400",
      icon: <Trophy size={28} />,
    },
    {
      title: "Confidence",
      value: result.confidence,
      color: "text-green-400",
      icon: <Brain size={28} />,
    },
    {
      title: "Communication",
      value: result.communication,
      color: "text-yellow-400",
      icon: <MessageCircle size={28} />,
    },
    {
      title: "Technical",
      value: result.technical,
      color: "text-purple-400",
      icon: <Code size={28} />,
    },
    {
      title: "Problem Solving",
      value: result.problemSolving,
      color: "text-orange-400",
      icon: <Lightbulb size={28} />,
    },
    {
      title: "Grammar",
      value: result.grammar,
      color: "text-pink-400",
      icon: <BookOpen size={28} />,
    },
  ];

  const radarData = {
    labels: [
      "Confidence",
      "Communication",
      "Technical",
      "Problem Solving",
      "Grammar",
    ],
    datasets: [
      {
        label: "Performance",
        data: [
          result.confidence,
          result.communication,
          result.technical,
          result.problemSolving,
          result.grammar,
        ],
        backgroundColor: "rgba(34,211,238,0.25)",
        borderColor: "#22d3ee",
        borderWidth: 3,
        pointBackgroundColor: "#22d3ee",
      },
    ],
  };

  const radarOptions = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: {
          color: "white",
          backdropColor: "transparent",
        },
        grid: {
          color: "#475569",
        },
        angleLines: {
          color: "#475569",
        },
        pointLabels: {
          color: "white",
          font: {
            size: 14,
          },
        },
      },
    },
  };

  return (
    <div className="flex bg-slate-900 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Topbar />

        <div className="p-8">

          <h1 className="text-4xl font-bold text-white">
            AI Interview Performance Report
          </h1>

          <p className="text-slate-400 mt-2">
            Here's a complete AI analysis of your interview performance, strengths, weaknesses and placement readiness.
          </p>

          {/* Score Cards */}

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6 mt-10">

            {scoreCards.map((card) => (

              <div
                key={card.title}
              className="bg-slate-800 rounded-2xl p-6 border border-slate-700 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/20 hover:scale-105 transition-all duration-300"
              >

                <div className="flex justify-between items-center">

                  <div>

                    <h3 className="text-slate-400">
                      {card.title}
                    </h3>

                  <div className="relative w-24 h-24 mt-4">

  <svg className="w-24 h-24 -rotate-90">

    <circle
      cx="48"
      cy="48"
      r="40"
      stroke="#334155"
      strokeWidth="8"
      fill="none"
    />

    <circle
  cx="48"
  cy="48"
  r="40"
  stroke="currentColor"
  strokeWidth="8"
  fill="none"
  strokeLinecap="round"
  strokeDasharray="251"
  strokeDashoffset={251 - (251 * card.value) / 100}
  className={`${card.color} transition-all duration-300 duration-1000 ease-out`}
/>

  </svg>

  <div className="absolute inset-0 flex items-center justify-center">

    <span
  className={`text-xl font-bold ${card.color} animate-pulse`}
>
  {card.value}%
</span>

  </div>

</div>

                  </div>

                  <div className={card.color}>
                    {card.icon}
                  </div>

                </div>

              </div>

            ))}

          </div>

          {/* Radar Chart */}

          <div className="bg-slate-800 rounded-3xl p-8 mt-10 border border-slate-700">

            <h2 className="text-2xl font-bold text-white mb-8">
              Performance Analysis
            </h2>

            <div className="max-w-2xl mx-auto">

              <Radar
                data={radarData}
                options={radarOptions}
              />

            </div>

          </div>

          {/* AI Hiring Prediction */}

<div className="grid md:grid-cols-2 gap-6 mt-10">

<div className="bg-slate-800 rotransition-all duration-300 unded-3xl p-8 border border-slate-700 hover:border-cyan-400 hover:shadow-2xl hover:shadow-cyan-500/20  duration-300">

    <h2 className="text-lg text-slate-400">
      AI Hiring Probability
    </h2>

    <h1 className="text-6xl font-bold text-cyan-400 mt-5">
      {hiringProbability}%
    </h1>

    <div className="w-full h-4 bg-slate-700 rounded-full mt-6 overflow-hidden">

      <div
        className="h-full bg-cyan-500 rounded-full transition-all duration-300 duration-1000"
        style={{
          width: `${hiringProbability}%`,
        }}
      />

    </div>

    <p className="text-slate-400 mt-5">
      Based on your overall interview performance.
    </p>

  </div>

  <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700 hover:border-green-500 transition-all">

    <h2 className="text-lg text-slate-400">
      Skill Level
    </h2>

    <h1 className="text-5xl font-bold text-green-400 mt-5">
  {level}
</h1>

<div className="mt-5">

  <span className="bg-cyan-500 text-white px-5 py-2 rounded-full text-lg font-bold">

    Grade : {grade}

  </span>

</div>

<p className="text-slate-400 mt-5">
  AI has categorized your interview performance.
</p>

    <div className="mt-8">
  <span
  className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold shadow-lg ${
      hiringProbability >= 75
        ? "bg-green-500/20 text-green-400 border border-green-500"
        : "bg-red-500/20 text-red-400 border border-red-500"
    }`}
  >
    {hiringProbability >= 75
      ? "🏆 Ready for Placement"
      : "📚 Needs More Practice"}
  </span>
</div>

  </div>

</div>
          
          {/* Strengths */}

          <div className="bg-slate-800 rounded-3xl p-8 mt-10 border border-slate-700">

            <h2 className="text-2xl font-bold text-green-400 mb-6">
              Strengths
            </h2>

            <ul className="space-y-4">

              {result.strengths?.map((item, index) => (

                <li
                  key={index}
                  className="text-white flex gap-3"
                >
                  ✅ {item}
                </li>

              ))}

            </ul>

          </div>

          {/* Weaknesses */}

          <div className="bg-slate-800 rounded-3xl p-8 mt-8 border border-slate-700">

            <h2 className="text-2xl font-bold text-red-400 mb-6">
              Weaknesses
            </h2>

            <ul className="space-y-4">

              {result.weaknesses?.map((item, index) => (

                <li
                  key={index}
                  className="text-white flex gap-3"
                >
                  ❌ {item}
                </li>

              ))}

            </ul>

          </div>

          {/* Suggestions */}

          <div className="bg-slate-800 rounded-3xl p-8 mt-8 border border-slate-700">

            <h2 className="text-2xl font-bold text-cyan-400 mb-6">
              AI Suggestions
            </h2>

            <ul className="space-y-4">

              {result.suggestions?.map((item, index) => (

                <li
                  key={index}
                  className="text-white flex gap-3"
                >
                  💡 {item}
                </li>

              ))}

            </ul>

          </div>

          {/* Buttons */}

          <div className="flex flex-wrap gap-6 mt-10">

            <Link
              to="/interview"
              className="flex items-center gap-3 bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-xl text-white font-semibold"
            >
              <RotateCcw size={20} />
              Retake Interview
            </Link>

            <Link
              to="/dashboard"
              className="flex items-center gap-3 bg-slate-700 hover:bg-slate-600 px-8 py-4 rounded-xl text-white font-semibold"
            >
              <Home size={20} />
              Dashboard
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}

export default InterviewResult;