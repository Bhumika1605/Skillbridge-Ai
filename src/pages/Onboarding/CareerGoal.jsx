import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

function CareerGoal() {
  const navigate = useNavigate();

  const [career, setCareer] = useState("");
  const [experience, setExperience] = useState("");
  const [workType, setWorkType] = useState("");
  const [location, setLocation] = useState("");

  const handleContinue = async () => {
    if (!career || !experience || !workType || !location) {
      alert("Please fill all fields.");
      return;
    }

    try {
      const user = auth.currentUser;

      if (!user) {
        alert("Please login again.");
        navigate("/login");
        return;
      }

      await updateDoc(doc(db, "users", user.uid), {
        careerGoal: career,
        experience,
        workType,
        location,
      });

      navigate("/ai-analysis");
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex justify-center items-center px-6">
      <div className="bg-slate-900 p-10 rounded-3xl w-full max-w-xl border border-slate-700">

        <h1 className="text-4xl font-bold text-white mb-3">
          Select Your Career Goal
        </h1>

        <p className="text-slate-400 mb-8">
          Help AI personalize your career roadmap.
        </p>

        <div className="space-y-5">

          <select
            value={career}
            onChange={(e) => setCareer(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white"
          >
            <option value="">Dream Career</option>
            <option>Frontend Developer</option>
            <option>Backend Developer</option>
            <option>Full Stack Developer</option>
            <option>AI Engineer</option>
            <option>Data Scientist</option>
            <option>Cyber Security</option>
            <option>UI/UX Designer</option>
          </select>

          <select
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white"
          >
            <option value="">Experience</option>
            <option>Student</option>
            <option>Fresher</option>
            <option>1-2 Years</option>
            <option>3+ Years</option>
          </select>

          <select
            value={workType}
            onChange={(e) => setWorkType(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white"
          >
            <option value="">Preferred Work Type</option>
            <option>Remote</option>
            <option>Hybrid</option>
            <option>Onsite</option>
          </select>

          <input
            type="text"
            placeholder="Preferred Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 text-white"
          />

          <button
            onClick={handleContinue}
            className="w-full bg-cyan-500 hover:bg-cyan-600 rounded-xl py-4 text-white font-semibold"
          >
            Continue
          </button>

        </div>

      </div>
    </div>
  );
}

export default CareerGoal;