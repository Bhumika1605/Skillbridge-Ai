import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function AppliedJobs() {
  const appliedJobs =
    JSON.parse(localStorage.getItem("appliedJobs")) || [];

  return (
    <div className="flex bg-slate-900 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Topbar />

        <div className="p-8">

          <h1 className="text-4xl font-bold text-white">
            Applied Jobs
          </h1>

          <p className="text-slate-400 mt-2">
            Track all jobs you have applied for.
          </p>

          {appliedJobs.length === 0 ? (

            <div className="mt-12 bg-slate-800 rounded-3xl p-10 border border-slate-700 text-center">

              <h2 className="text-2xl text-white">
                No Jobs Applied Yet
              </h2>

              <p className="text-slate-400 mt-3">
                Start applying to jobs and they will appear here.
              </p>

            </div>

          ) : (

            <div className="grid md:grid-cols-2 gap-6 mt-10">

              {appliedJobs.map((job) => (

                <div
                  key={job.id}
                  className="bg-slate-800 border border-slate-700 rounded-3xl p-6"
                >

                  <h2 className="text-2xl font-bold text-white">
                    {job.company}
                  </h2>

                  <p className="text-cyan-400 mt-2">
                    {job.role}
                  </p>

                  <p className="text-slate-300 mt-5">
                    📍 {job.location}
                  </p>

                  <p className="text-yellow-400 mt-2">
                    ⭐ {job.match}% Match
                  </p>

                  <div className="flex justify-between items-center mt-6">

  <span className="bg-green-500/20 text-green-400 px-4 py-2 rounded-full font-semibold">
    ✓ Applied
  </span>

  <a
    href={job.link}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-cyan-500 hover:bg-cyan-600 text-white px-5 py-2 rounded-xl transition"
  >
    View Job
  </a>

</div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
}

export default AppliedJobs;