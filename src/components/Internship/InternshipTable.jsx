function InternshipTable() {
  const internships = [
    {
      company: "Google",
      role: "Frontend Developer Intern",
      location: "Bangalore",
      applied: "12 Jul 2026",
      status: "Applied",
    },
    {
      company: "Microsoft",
      role: "Software Engineer Intern",
      location: "Hyderabad",
      applied: "10 Jul 2026",
      status: "Interview",
    },
    {
      company: "Amazon",
      role: "Web Developer Intern",
      location: "Remote",
      applied: "05 Jul 2026",
      status: "Rejected",
    },
    {
      company: "Adobe",
      role: "React Developer Intern",
      location: "Noida",
      applied: "01 Jul 2026",
      status: "Offer",
    },
  ];

  const statusColor = (status) => {
    switch (status) {
      case "Applied":
        return "bg-cyan-500/20 text-cyan-400";
      case "Interview":
        return "bg-yellow-500/20 text-yellow-400";
      case "Offer":
        return "bg-green-500/20 text-green-400";
      case "Rejected":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-slate-700 text-white";
    }
  };

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 overflow-x-auto">

      <h2 className="text-2xl font-bold text-white mb-6">
        Internship Applications
      </h2>

      <table className="w-full text-left">

        <thead>
          <tr className="border-b border-slate-700 text-slate-300">
            <th className="py-4">Company</th>
            <th>Role</th>
            <th>Location</th>
            <th>Applied</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>

          {internships.map((item, index) => (

            <tr
              key={index}
              className="border-b border-slate-700 hover:bg-slate-700/40 transition"
            >
              <td className="py-5 font-semibold text-white">
                {item.company}
              </td>

              <td className="text-slate-300">
                {item.role}
              </td>

              <td className="text-slate-300">
                {item.location}
              </td>

              <td className="text-slate-400">
                {item.applied}
              </td>

              <td>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold ${statusColor(
                    item.status
                  )}`}
                >
                  {item.status}
                </span>
              </td>
            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default InternshipTable;