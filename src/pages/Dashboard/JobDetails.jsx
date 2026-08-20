import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function JobDetails() {

    const { id } = useParams();

const jobs = [
  {
    id: 1,
    company: "Google",
    role: "Frontend Developer",
    location: "Bangalore",
    salary: "₹12 LPA",
    match: 95,
    link: "https://careers.google.com/",
  },
  {
    id: 2,
    company: "Microsoft",
    role: "Software Engineer",
    location: "Hyderabad",
    salary: "₹15 LPA",
    match: 92,
    link: "https://careers.microsoft.com/",
  },
  {
    id: 3,
    company: "Adobe",
    role: "React Developer",
    location: "Noida",
    salary: "₹10 LPA",
    match: 89,
    link: "https://careers.adobe.com/",
  },
  {
    id: 4,
    company: "Amazon",
    role: "UI Engineer",
    location: "Remote",
    salary: "₹11 LPA",
    match: 87,
    link: "https://www.amazon.jobs/",
  },
];

const job = jobs.find((item) => item.id === Number(id));

if (!job) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white text-3xl">
      Job Not Found
    </div>
  );
}

  return (
    <div className="flex bg-slate-900 min-h-screen">

      <Sidebar />

      <div className="flex-1">

        <Topbar />

        <div className="p-8">

          <h1 className="text-4xl font-bold text-white">
            {job.role}
          </h1>

          <p className="text-cyan-400 mt-2">
            {job.company} • {job.location}
          </p>

          <div className="mt-10 bg-slate-800 rounded-3xl border border-slate-700 p-8">

            <h2 className="text-2xl font-bold text-white">
              Job Description
            </h2>

            <p className="text-slate-300 mt-5 leading-8">
              We are looking for a Frontend Developer proficient in
              React, JavaScript, HTML, CSS and Tailwind CSS to build
              beautiful and scalable web applications.
            </p>

          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-8">

            <div className="bg-slate-800 rounded-3xl border border-slate-700 p-6">

              <h2 className="text-green-400 text-2xl font-bold">
                Required Skills
              </h2>

              <ul className="mt-5 space-y-3 text-white">

                <li>✔ HTML</li>
                <li>✔ CSS</li>
                <li>✔ JavaScript</li>
                <li>✔ React</li>
                <li>✔ Tailwind CSS</li>

              </ul>

            </div>

            <div className="bg-slate-800 rounded-3xl border border-slate-700 p-6">

              <h2 className="text-cyan-400 text-2xl font-bold">
                Job Details
              </h2>

              <div className="mt-5 space-y-4 text-white">

                <p>📍 {job.location}</p>

                <p>💼 Full Time</p>

                <p>💰 {job.salary}</p>

                <p>⭐ {job.match}% Match</p>

              </div>

            </div>

          </div>

          <button
  onClick={() => {
    const appliedJobs =
      JSON.parse(localStorage.getItem("appliedJobs")) || [];

    const alreadyApplied = appliedJobs.find(
      (item) => item.id === job.id
    );

    if (!alreadyApplied) {
      appliedJobs.push(job);
      localStorage.setItem(
        "appliedJobs",
        JSON.stringify(appliedJobs)
      );
    }

    window.open(job.link, "_blank");
  }}
  className="mt-10 bg-cyan-500 hover:bg-cyan-600 px-8 py-4 rounded-xl text-white font-semibold transition"
>
  Apply on Company Website
</button>

        </div>

      </div>

    </div>
  );
}

export default JobDetails;