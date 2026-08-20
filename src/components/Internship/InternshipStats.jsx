import {
  Briefcase,
  Clock3,
  CheckCircle2,
  XCircle,
} from "lucide-react";

function InternshipStats() {
  const stats = [
    {
      title: "Applied",
      value: "12",
      icon: <Briefcase size={28} />,
      color: "bg-cyan-500",
    },
    {
      title: "Interview",
      value: "5",
      icon: <Clock3 size={28} />,
      color: "bg-yellow-500",
    },
    {
      title: "Offers",
      value: "2",
      icon: <CheckCircle2 size={28} />,
      color: "bg-green-500",
    },
    {
      title: "Rejected",
      value: "3",
      icon: <XCircle size={28} />,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

      {stats.map((item, index) => (

        <div
          key={index}
          className="bg-slate-800 border border-slate-700 rounded-2xl p-6 hover:border-cyan-500 transition duration-300"
        >

          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-400">
                {item.title}
              </p>

              <h2 className="text-4xl font-bold text-white mt-3">
                {item.value}
              </h2>

            </div>

            <div
              className={`${item.color} w-14 h-14 rounded-xl flex items-center justify-center text-white`}
            >
              {item.icon}
            </div>

          </div>

        </div>

      ))}

    </div>
  );
}

export default InternshipStats;