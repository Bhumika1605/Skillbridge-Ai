import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase/firebase";
import { doc, updateDoc } from "firebase/firestore";

function UploadResume() {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];

    if (!selected) return;

    const allowed = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowed.includes(selected.type)) {
      alert("Only PDF, DOC and DOCX files are allowed.");
      return;
    }

    setFile(selected);
  };

  const handleContinue = async () => {
    if (!file) {
      alert("Please select a resume first.");
      return;
    }

    try {
      setLoading(true);

      const user = auth.currentUser;

      if (!user) {
        alert("Please login again.");
        navigate("/login");
        return;
      }

      await updateDoc(doc(db, "users", user.uid), {
        resumeUploaded: true,
        resumeName: file.name,
        resumeSize: file.size,
        resumeType: file.type,
        uploadedAt: new Date().toISOString(),
      });

      alert("Resume uploaded successfully!");

      navigate("/career-goal");
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex justify-center items-center px-6">
      <div className="bg-slate-800 p-10 rounded-3xl w-full max-w-2xl">

        <h1 className="text-4xl font-bold text-white">
          Upload Your Resume
        </h1>

        <p className="text-slate-400 mt-3">
          Upload your latest resume to personalize AI analysis.
        </p>

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="mt-8 text-white"
        />

        {file && (
          <div className="mt-6 rounded-xl bg-slate-900 p-5 border border-slate-700">
            <p className="text-white font-semibold">{file.name}</p>

            <p className="text-slate-400 mt-2">
              {(file.size / 1024).toFixed(2)} KB
            </p>
          </div>
        )}

        <button
          onClick={handleContinue}
          disabled={loading}
          className="mt-8 w-full py-4 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-semibold"
        >
          {loading ? "Saving..." : "Continue"}
        </button>

      </div>
    </div>
  );
}

export default UploadResume;