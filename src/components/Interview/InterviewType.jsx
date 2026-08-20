import {
  Users,
  Code2,
  Brain,
  MessageCircle,
} from "lucide-react";

function InterviewType() {
  const interviewTypes = [
    {
      title: "HR Interview",
      icon: <Users size={32} />,
      color: "bg-cyan-500",
    },
    {
      title: "Technical Interview",
      icon: <Code2 size={32} />,
      color: "bg-green-500",
    },
    {
      title: "Aptitude Test",
      icon: <Brain size={32} />,
      color: "bg-yellow-500",
    },
    {
      title: "Group Discussion",
      icon: <MessageCircle size={32} />,
      color: "bg-purple-500",
    },
  ];

  return (
    <div>

      <h2 className="text-2xl font-bold text-white mb-6">
        Choose Interview Type
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

        {interviewTypes.map((item, index) => (

          <div
            key={index}
            className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:border-cyan-500 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >

            <div
              className={`${item.color} w-16 h-16 rounded-xl flex items-center justify-center text-white`}
            >
              {item.icon}
            </div>

            <h3 className="text-xl font-semibold text-white mt-6">
              {item.title}
            </h3>

          </div>

        ))}

      </div>

    </div>
  );
}

export default InterviewType;