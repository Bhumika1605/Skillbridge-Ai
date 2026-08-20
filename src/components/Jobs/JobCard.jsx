import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MapPin,
  IndianRupee,
  Briefcase,
  ArrowRight,
} from "lucide-react";

function JobCard({ job }) {

  const navigate = useNavigate();

  const [applied, setApplied] = useState(
    JSON.parse(localStorage.getItem("appliedJobs") || "[]").some(
      (item) => item.id === job.id
    )
  );

  return (
    <div className="bg-slate-800 border border-slate-700 rounded-3xl p-6 hover:border-cyan-500 hover:-translate-y-1 transition-all duration-300">

      <div className="flex justify-between items-start">

        <div>

          <h2 className="text-2xl font-bold text-white">
            {job.company}
          </h2>

          <p className="text-cyan-400 mt-2">
            {job.role}
          </p>

        </div>

        <div className="bg-cyan-500/20 text-cyan-400 px-4 py-2 rounded-full font-semibold">
          {job.match}% Match
        </div>

      </div>

      <div className="mt-6 space-y-3">

        <div className="flex items-center gap-3 text-slate-300">
          <MapPin size={18} />
          {job.location}
        </div>

        <div className="flex items-center gap-3 text-slate-300">
          <IndianRupee size={18} />
          {job.salary}
        </div>

        <div className="flex items-center gap-3 text-slate-300">
          <Briefcase size={18} />
          Full Time
        </div>

      </div>

      <div className="flex gap-4 mt-8">

        <button
  onClick={() => {

    const appliedJobs =
      JSON.parse(localStorage.getItem("appliedJobs")) || [];

    if (!appliedJobs.some((item) => item.id === job.id)) {
      appliedJobs.push(job);
      localStorage.setItem(
        "appliedJobs",
        JSON.stringify(appliedJobs)
      );
    }

    setApplied(true);

    alert("Application Submitted Successfully 🎉");

    window.open(job.link, "_blank");

  }}
  disabled={applied}
  className={`flex-1 py-3 rounded-xl text-white transition ${
    applied
      ? "bg-green-600 cursor-not-allowed"
      : "bg-cyan-500 hover:bg-cyan-600"
  }`}
>
  {applied ? "Applied ✓" : "Apply Now"}
</button>

        <button
  onClick={() => navigate(`/job-details/${job.id}`)}
  className="w-14 h-14 bg-slate-700 hover:bg-slate-600 rounded-xl flex items-center justify-center transition"
>
  <ArrowRight size={22} className="text-white" />
</button>

      </div>

    </div>
  );
}

export default JobCard;