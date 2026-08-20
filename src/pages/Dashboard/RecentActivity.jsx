function RecentActivity() {
  const activities = [
    {
      title: "Resume Updated",
      time: "2 hours ago",
      color: "bg-cyan-500",
    },
    {
      title: "Completed Mock Interview",
      time: "Today",
      color: "bg-green-500",
    },
    {
      title: "Applied for Frontend Developer",
      time: "Yesterday",
      color: "bg-yellow-500",
    },
    {
      title: "Career Score Improved",
      time: "2 days ago",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="bg-slate-800 rounded-3xl p-8 border border-slate-700">

      <h2 className="text-3xl font-bold text-white">
        Recent Activity
      </h2>

      <div className="mt-8 space-y-6">

        {activities.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4"
          >
            <div className={`w-4 h-4 rounded-full ${item.color}`} />

            <div>
              <h3 className="text-white font-semibold">
                {item.title}
              </h3>

              <p className="text-slate-400 text-sm">
                {item.time}
              </p>
            </div>
          </div>
        ))}

      </div>

    </div>
  );
}

export default RecentActivity;