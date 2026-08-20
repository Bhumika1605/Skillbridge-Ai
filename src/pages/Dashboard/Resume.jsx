import { useState } from "react";
import {
  UploadCloud,
  FileText,
  Trash2,
} from "lucide-react";

import ResumeAnalysis from "../../components/ResumeAnalysis";

function Resume() {
  const [resume, setResume] = useState(null);

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setResume(e.target.files[0]);
    }
  };

  const removeResume = () => {
    setResume(null);
  };

  return (
    <div className="p-8 bg-slate-900 min-h-screen">

      {/* Header */}

      <h1 className="text-4xl font-bold text-white">
        Resume Analyzer
      </h1>

      <p className="text-slate-400 mt-2">
        Upload your resume and receive AI-powered feedback.
      </p>

      {/* Upload Box */}

      <div className="mt-10">

        <div className="border-2 border-dashed border-cyan-500 rounded-3xl bg-slate-800 p-12 text-center hover:bg-slate-800/80 transition">

          <UploadCloud
            size={70}
            className="mx-auto text-cyan-400"
          />

          <h2 className="text-3xl font-bold text-white mt-6">
            Drag & Drop Your Resume
          </h2>

          <p className="text-slate-400 mt-3">
            Supported formats: PDF, DOC, DOCX
          </p>

          <label className="inline-block mt-8 bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-xl cursor-pointer transition">

            Choose Resume

            <input
              type="file"
              accept=".pdf,.doc,.docx"
              className="hidden"
              onChange={handleFileChange}
            />

          </label>

        </div>

      </div>

      {/* Uploaded Resume */}

      <div className="mt-10 bg-slate-800 rounded-2xl p-6 border border-slate-700">

        {resume ? (

          <div className="flex items-center justify-between flex-wrap gap-6">

            <div className="flex items-center gap-4">

              <FileText
                size={45}
                className="text-cyan-400"
              />

              <div>

                <h3 className="text-white text-2xl font-semibold">
                  {resume.name}
                </h3>

                <p className="text-green-400 mt-1">
                  Resume uploaded successfully.
                </p>

              </div>

            </div>

            <button
              onClick={removeResume}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl transition"
            >
              <Trash2 size={20} />
              Remove Resume
            </button>

          </div>

        ) : (

          <div className="flex items-center gap-4">

            <FileText
              size={45}
              className="text-cyan-400"
            />

            <div>

              <h3 className="text-white text-2xl font-semibold">
                No Resume Uploaded
              </h3>

              <p className="text-slate-400">
                Upload a resume to start AI analysis.
              </p>

            </div>

          </div>

        )}

      </div>

      {/* AI Analysis */}

      {resume && <ResumeAnalysis />}

    </div>
  );
}

export default Resume;