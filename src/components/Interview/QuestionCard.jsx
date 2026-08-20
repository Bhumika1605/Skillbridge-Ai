import { PlayCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function QuestionCard() {
  const navigate = useNavigate();

  const categories = [
    {
      title: "React Interview",
      route: "react",
    },
    {
      title: "JavaScript Interview",
      route: "javascript",
    },
    {
      title: "SQL Interview",
      route: "sql",
    },
    {
      title: "HR Interview",
      route: "hr",
    },
    {
      title: "DSA Interview",
      route: "dsa",
    },
    {
      title: "HTML Interview",
      route: "html",
    },
    {
      title: "CSS Interview",
      route: "css",
    },
    {
      title: "Node.js Interview",
      route: "node",
    },
    {
      title: "MongoDB Interview",
      route: "mongodb",
    },
    {
      title: "Python Interview",
      route: "python",
    },
  ];

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6">

      <h2 className="text-2xl font-bold text-white mb-6">
        Interview Practice
      </h2>

      <div className="space-y-5">

        {categories.map((item) => (

          <div
            key={item.route}
            className="flex justify-between items-center bg-slate-900 rounded-xl p-5 hover:bg-slate-700 transition"
          >

            <div className="flex items-center gap-4">

              <PlayCircle
                size={24}
                className="text-cyan-400"
              />

              <h3 className="text-white text-lg">
                {item.title}
              </h3>

            </div>

            <button
              onClick={() =>
                navigate(`/interview/${item.route}`)
              }
              className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-xl flex items-center gap-2 transition"
            >

              Practice

              <ArrowRight size={18} />

            </button>

          </div>

        ))}

      </div>

    </div>
  );
}

export default QuestionCard;