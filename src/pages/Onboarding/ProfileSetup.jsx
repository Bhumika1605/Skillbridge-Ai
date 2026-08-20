import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { auth, db } from "../../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

function ProfileSetup() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [profile, setProfile] = useState({
    fullName: "",
    college: "",
    branch: "",
    graduation: "",
    careerGoal: "",
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleContinue = async () => {
    if (
      !profile.fullName ||
      !profile.college ||
      !profile.branch ||
      !profile.graduation ||
      !profile.careerGoal
    ) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      const user = auth.currentUser;

      if (!user) {
        alert("Please login first.");
        navigate("/login");
        return;
      }

      await updateDoc(doc(db, "users", user.uid), {
        fullName: profile.fullName,
        college: profile.college,
        branch: profile.branch,
        graduation: profile.graduation,
        careerGoal: profile.careerGoal,
        profileCompleted: true,
      });

      alert("Profile Saved Successfully!");

      navigate("/upload-resume");

    } catch (error) {
      console.log(error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

      <div className="w-full max-w-3xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-10">

        <h1 className="text-4xl font-bold text-white">
          Complete Your Profile
        </h1>

        <p className="mt-3 text-slate-400">
          This information helps our AI personalize your career journey.
        </p>

        <div className="mt-10 grid gap-6">

          <input
            type="text"
            name="fullName"
            value={profile.fullName}
            onChange={handleChange}
            placeholder="Full Name"
            className="rounded-xl bg-slate-900 border border-slate-700 px-5 py-4 text-white outline-none focus:border-cyan-500"
          />

          <input
            type="text"
            name="college"
            value={profile.college}
            onChange={handleChange}
            placeholder="College Name"
            className="rounded-xl bg-slate-900 border border-slate-700 px-5 py-4 text-white outline-none focus:border-cyan-500"
          />

          <input
            type="text"
            name="branch"
            value={profile.branch}
            onChange={handleChange}
            placeholder="Branch"
            className="rounded-xl bg-slate-900 border border-slate-700 px-5 py-4 text-white outline-none focus:border-cyan-500"
          />

          <input
            type="text"
            name="graduation"
            value={profile.graduation}
            onChange={handleChange}
            placeholder="Graduation Year"
            className="rounded-xl bg-slate-900 border border-slate-700 px-5 py-4 text-white outline-none focus:border-cyan-500"
          />

          <select
            name="careerGoal"
            value={profile.careerGoal}
            onChange={handleChange}
            className="rounded-xl bg-slate-900 border border-slate-700 px-5 py-4 text-white outline-none focus:border-cyan-500"
          >
            <option value="">Select Career Goal</option>
            <option>Frontend Developer</option>
            <option>Backend Developer</option>
            <option>Full Stack Developer</option>
            <option>AI / ML Engineer</option>
            <option>Data Scientist</option>
            <option>Cyber Security</option>
            <option>UI / UX Designer</option>
          </select>

        </div>

        <button
          onClick={handleContinue}
          disabled={loading}
          className="mt-10 w-full rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 py-4 text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
        >
          {loading ? "Saving..." : "Continue"}
        </button>

      </div>

    </div>
  );
}

export default ProfileSetup;