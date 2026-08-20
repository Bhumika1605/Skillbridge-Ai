import { useEffect, useState } from "react";
import {
  Upload,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Target,
  Trash2,
  BrainCircuit,
  ShieldCheck,
  Code2,
  BriefcaseBusiness,
  RefreshCw,
} from "lucide-react";

function ResumeAnalyzer() {
  const [selectedFile, setSelectedFile] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [result, setResult] =
    useState(null);

  /* =========================================================
     LOAD PREVIOUS ANALYSIS
  ========================================================= */

  useEffect(() => {
    loadSavedAnalysis();

    window.addEventListener(
      "resumeAnalysisUpdated",
      loadSavedAnalysis
    );

    return () => {
      window.removeEventListener(
        "resumeAnalysisUpdated",
        loadSavedAnalysis
      );
    };
  }, []);

  /* =========================================================
     LOAD SAVED ANALYSIS
  ========================================================= */

  const loadSavedAnalysis = () => {
    try {
      const saved =
        localStorage.getItem(
          "resumeAnalysis"
        );

      if (!saved) {
        setResult(null);
        return;
      }

      const data =
        JSON.parse(saved);

      setResult(
        data?.analysis || data
      );
    } catch (error) {
      console.error(
        "Failed to load saved resume analysis:",
        error
      );

      setResult(null);
    }
  };

  /* =========================================================
     FILE SELECT
  ========================================================= */

  const handleFileChange = (event) => {
    const file =
      event.target.files?.[0];

    setError("");

    if (!file) {
      setSelectedFile(null);
      return;
    }

    const fileName =
      file.name.toLowerCase();

    const validFile =
      file.type === "application/pdf" ||
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.type === "text/plain" ||
      fileName.endsWith(".pdf") ||
      fileName.endsWith(".docx") ||
      fileName.endsWith(".txt");

    if (!validFile) {
      setError(
        "Please upload a PDF, DOCX or TXT resume."
      );

      setSelectedFile(null);
      return;
    }

    if (
      file.size >
      10 * 1024 * 1024
    ) {
      setError(
        "Resume must be smaller than 10 MB."
      );

      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
  };

  /* =========================================================
     ANALYZE RESUME
  ========================================================= */

  const analyzeResume =
    async () => {

      if (!selectedFile) {
        setError(
          "Please select your resume first."
        );

        return;
      }

      setLoading(true);
      setError("");

      try {

        console.log(
          "Sending resume to SkillBridge AI..."
        );

        /* ---------------------------------------------
           FORM DATA
        --------------------------------------------- */

        const formData =
          new FormData();

        formData.append(
          "resume",
          selectedFile
        );

        /* ---------------------------------------------
           BACKEND REQUEST
        --------------------------------------------- */

        const response =
          await fetch(
            "https://skillbridge-ai-backend-78l7.onrender.com/api/analyze-resume",
            {
              method: "POST",
              body: formData,
            }
          );

        console.log(
          "Backend status:",
          response.status
        );

        /* ---------------------------------------------
           RESPONSE
        --------------------------------------------- */

        let data;

        try {
          data =
            await response.json();
        } catch {
          throw new Error(
            "Backend returned an invalid response."
          );
        }

        console.log(
          "Backend response:",
          data
        );

        /* ---------------------------------------------
           ERROR RESPONSE
        --------------------------------------------- */

        if (!response.ok) {
          throw new Error(
            data?.message ||
              data?.error ||
              "Resume analysis failed."
          );
        }

        if (
          data?.success === false
        ) {
          throw new Error(
            data?.message ||
              "Unable to analyze resume."
          );
        }

        /* ---------------------------------------------
           EXTRACT ACTUAL ANALYSIS
        --------------------------------------------- */

        const analysis =
          data?.analysis || data;

        /* ---------------------------------------------
           SAVE COMPLETE ANALYSIS
        --------------------------------------------- */

        localStorage.setItem(
          "resumeAnalysis",
          JSON.stringify(
            data
          )
        );

        /* ---------------------------------------------
           SAVE FILE INFORMATION
        --------------------------------------------- */

        localStorage.setItem(
          "resumeFile",
          JSON.stringify({
            name:
              selectedFile.name,

            size:
              selectedFile.size,

            type:
              selectedFile.type,

            uploadedAt:
              new Date().toISOString(),
          })
        );

        /* ---------------------------------------------
           SAVE CAREER DATA
           
           This makes career information available
           to other dashboard components.
        --------------------------------------------- */

        const careerData = {
          careerRole:
            analysis?.careerRole ||
            analysis?.detectedRole ||
            analysis?.careerGoal ||
            "",

          roleConfidence:
            Number(
              analysis?.roleConfidence
            ) || 0,

          resumeScore:
            Number(
              analysis?.resumeScore
            ) || 0,

          atsScore:
            Number(
              analysis?.atsScore
            ) || 0,

          technicalSkillsScore:
            Number(
              analysis?.technicalSkillsScore
            ) || 0,

          placementProbability:
            Number(
              analysis?.placementProbability
            ) || 0,

          skillsFound:
            Array.isArray(
              analysis?.skillsFound
            )
              ? analysis.skillsFound
              : [],

          missingSkills:
            Array.isArray(
              analysis?.missingSkills
            )
              ? analysis.missingSkills
              : [],

          updatedAt:
            new Date().toISOString(),
        };

        localStorage.setItem(
          "careerData",
          JSON.stringify(
            careerData
          )
        );

        /* ---------------------------------------------
           UPDATE DASHBOARD
        --------------------------------------------- */

        window.dispatchEvent(
          new Event(
            "resumeAnalysisUpdated"
          )
        );

        window.dispatchEvent(
          new Event(
            "careerDataUpdated"
          )
        );

        /* ---------------------------------------------
           SHOW RESULT
        --------------------------------------------- */

        setResult(
          analysis
        );

        console.log(
          "Resume analysis saved successfully."
        );

      } catch (error) {

        console.error(
          "Resume analysis error:",
          error
        );

        setError(
          error?.message ||
            "Something went wrong while analyzing the resume."
        );

      } finally {

        setLoading(false);

      }
    };

  /* =========================================================
     CLEAR ANALYSIS
  ========================================================= */

  const clearAnalysis =
    () => {

      localStorage.removeItem(
        "resumeAnalysis"
      );

      localStorage.removeItem(
        "resumeFile"
      );

      localStorage.removeItem(
        "careerData"
      );

      setSelectedFile(null);
      setResult(null);
      setError("");

      window.dispatchEvent(
        new Event(
          "resumeAnalysisUpdated"
        )
      );

      window.dispatchEvent(
        new Event(
          "careerDataUpdated"
        )
      );
    };

  /* =========================================================
     FORMAT SCORE
  ========================================================= */

  const getScore =
    (value) => {

      const number =
        Number(value);

      if (
        !Number.isFinite(number)
      ) {
        return 0;
      }

      return Math.min(
        100,
        Math.max(
          0,
          Math.round(number)
        )
      );
    };

  /* =========================================================
     REAL VALUES
  ========================================================= */

  const resumeScore =
    getScore(
      result?.resumeScore
    );

  const atsScore =
    getScore(
      result?.atsScore
    );

  const technicalScore =
    getScore(
      result?.technicalSkillsScore
    );

  const placementScore =
    getScore(
      result?.placementProbability
    );

  const careerRole =
    result?.careerRole ||
    result?.detectedRole ||
    result?.careerGoal ||
    "Career role not detected";

  const roleConfidence =
    getScore(
      result?.roleConfidence
    );

  const skillsFound =
    Array.isArray(
      result?.skillsFound
    )
      ? result.skillsFound
      : [];

  const missingSkills =
    Array.isArray(
      result?.missingSkills
    )
      ? result.missingSkills
      : [];

  const strengths =
    Array.isArray(
      result?.strengths
    )
      ? result.strengths
      : [];

  const improvements =
    Array.isArray(
      result?.areasToImprove
    )
      ? result.areasToImprove
      : [];

  const recommendations =
    Array.isArray(
      result?.recommendations
    )
      ? result.recommendations
      : [];

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <main
      className="
        min-h-screen
        bg-[#020617]
        p-4
        text-white
        md:p-6
      "
    >

      <div
        className="
          mx-auto
          max-w-7xl
        "
      >

        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="mb-8">

          <div
            className="
              flex
              items-center
              gap-2
            "
          >

            <Sparkles
              size={17}
              className="text-cyan-400"
            />

            <p
              className="
                text-xs
                font-bold
                uppercase
                tracking-[0.2em]
                text-cyan-400
              "
            >
              AI Career Intelligence
            </p>

          </div>

          <h1
            className="
              mt-3
              text-3xl
              font-black
              tracking-tight
              text-white
              md:text-4xl
            "
          >
            Resume Analyzer
          </h1>

          <p
            className="
              mt-3
              max-w-3xl
              text-sm
              leading-6
              text-slate-400
            "
          >
            Upload your resume and let
            SkillBridge AI analyze your
            career role, ATS compatibility,
            technical skills, strengths,
            skill gaps and placement
            readiness.
          </p>

        </div>

        {/* ===================================================
            UPLOAD CARD
        =================================================== */}

        <div
          className="
            rounded-3xl
            border
            border-white/[0.08]
            bg-[#111827]
            p-5
            shadow-[0_20px_70px_rgba(0,0,0,0.25)]
            md:p-8
          "
        >

          <div
            className="
              rounded-3xl
              border
              border-dashed
              border-cyan-400/20
              bg-cyan-400/[0.025]
              p-7
              text-center
              md:p-10
            "
          >

            {/* ICON */}

            <div
              className="
                mx-auto
                flex
                h-16
                w-16
                items-center
                justify-center
                rounded-2xl
                border
                border-cyan-400/10
                bg-cyan-400/10
              "
            >

              <Upload
                size={27}
                className="text-cyan-400"
              />

            </div>

            <h2
              className="
                mt-5
                text-xl
                font-bold
                text-white
              "
            >
              Upload Your Resume
            </h2>

            <p
              className="
                mt-2
                text-sm
                text-slate-500
              "
            >
              PDF, DOCX or TXT
              {" • "}
              Maximum 10 MB
            </p>

            {/* FILE INPUT */}

            <label
              htmlFor="resume-upload"
              className="
                mt-7
                inline-flex
                cursor-pointer
                items-center
                gap-2
                rounded-xl
                border
                border-cyan-400/20
                bg-cyan-400/10
                px-6
                py-3
                text-sm
                font-semibold
                text-cyan-300
                transition
                hover:border-cyan-400/30
                hover:bg-cyan-400/15
              "
            >

              <FileText size={16} />

              Choose Resume

              <input
                id="resume-upload"
                type="file"
                accept="
                  .pdf,
                  .docx,
                  .txt,
                  application/pdf,
                  application/vnd.openxmlformats-officedocument.wordprocessingml.document,
                  text/plain
                "
                onChange={
                  handleFileChange
                }
                className="hidden"
              />

            </label>

            {/* SELECTED FILE */}

            {selectedFile && (

              <div
                className="
                  mx-auto
                  mt-6
                  max-w-xl
                  rounded-2xl
                  border
                  border-white/[0.07]
                  bg-white/[0.025]
                  p-4
                "
              >

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                  "
                >

                  <div className="min-w-0 text-left">

                    <p
                      className="
                        break-all
                        text-sm
                        font-semibold
                        text-white
                      "
                    >
                      {selectedFile.name}
                    </p>

                    <p
                      className="
                        mt-1
                        text-xs
                        text-slate-500
                      "
                    >
                      {(
                        selectedFile.size /
                        1024 /
                        1024
                      ).toFixed(2)}{" "}
                      MB
                    </p>

                  </div>

                  <span
                    className="
                      shrink-0
                      rounded-full
                      bg-emerald-400/10
                      px-3
                      py-1
                      text-xs
                      font-semibold
                      text-emerald-400
                    "
                  >
                    Ready
                  </span>

                </div>

              </div>

            )}

            {/* ANALYZE BUTTON */}

            <button
              onClick={
                analyzeResume
              }
              disabled={
                !selectedFile ||
                loading
              }
              className="
                mt-7
                inline-flex
                w-full
                items-center
                justify-center
                gap-2
                rounded-xl
                bg-gradient-to-r
                from-cyan-500
                to-blue-600
                px-6
                py-4
                text-sm
                font-bold
                text-white
                shadow-lg
                shadow-cyan-500/10
                transition
                hover:scale-[1.005]
                hover:shadow-cyan-500/20
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >

              {loading ? (
                <>
                  <RefreshCw
                    size={17}
                    className="animate-spin"
                  />

                  Analyzing Resume...
                </>
              ) : (
                <>
                  <BrainCircuit
                    size={17}
                  />

                  Analyze Resume
                </>
              )}

            </button>

            {/* ERROR */}

            {error && (

              <div
                className="
                  mt-5
                  flex
                  items-start
                  gap-3
                  rounded-2xl
                  border
                  border-red-400/10
                  bg-red-400/[0.04]
                  p-4
                  text-left
                "
              >

                <AlertTriangle
                  size={18}
                  className="
                    mt-0.5
                    shrink-0
                    text-red-400
                  "
                />

                <p
                  className="
                    text-sm
                    leading-6
                    text-red-300
                  "
                >
                  {error}
                </p>

              </div>

            )}

          </div>

        </div>

        {/* ===================================================
            RESULTS
        =================================================== */}

        {result && (

          <div className="mt-8 space-y-5">

            {/* SUCCESS */}

            <div
              className="
                flex
                items-center
                gap-3
                rounded-2xl
                border
                border-emerald-400/10
                bg-emerald-400/[0.04]
                p-4
              "
            >

              <CheckCircle2
                size={20}
                className="text-emerald-400"
              />

              <div>

                <p
                  className="
                    text-sm
                    font-semibold
                    text-emerald-400
                  "
                >
                  Resume analyzed successfully
                </p>

                <p
                  className="
                    mt-1
                    text-xs
                    text-slate-500
                  "
                >
                  Your dashboard has been
                  updated using the real
                  resume analysis.
                </p>

              </div>

            </div>

            {/* =================================================
                CAREER ROLE
            ================================================= */}

            <div
              className="
                rounded-3xl
                border
                border-cyan-400/10
                bg-[#111827]
                p-6
              "
            >

              <div
                className="
                  flex
                  flex-col
                  gap-5
                  md:flex-row
                  md:items-center
                  md:justify-between
                "
              >

                <div
                  className="
                    flex
                    items-center
                    gap-4
                  "
                >

                  <div
                    className="
                      flex
                      h-12
                      w-12
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      bg-cyan-400/10
                    "
                  >

                    <Target
                      size={22}
                      className="text-cyan-400"
                    />

                  </div>

                  <div>

                    <p
                      className="
                        text-[10px]
                        font-semibold
                        uppercase
                        tracking-wider
                        text-slate-600
                      "
                    >
                      Recommended Career Role
                    </p>

                    <h2
                      className="
                        mt-1
                        text-2xl
                        font-black
                        text-white
                      "
                    >
                      {careerRole}
                    </h2>

                  </div>

                </div>

                <div
                  className="
                    rounded-xl
                    border
                    border-cyan-400/10
                    bg-cyan-400/[0.04]
                    px-4
                    py-3
                  "
                >

                  <p
                    className="
                      text-[10px]
                      uppercase
                      tracking-wider
                      text-slate-600
                    "
                  >
                    Role Confidence
                  </p>

                  <p
                    className="
                      mt-1
                      text-xl
                      font-black
                      text-cyan-400
                    "
                  >
                    {roleConfidence}%
                  </p>

                </div>

              </div>

            </div>

            {/* =================================================
                SCORE CARDS
            ================================================= */}

            <div
              className="
                grid
                grid-cols-1
                gap-4
                sm:grid-cols-2
                xl:grid-cols-4
              "
            >

              <ScoreCard
                title="ATS Score"
                value={atsScore}
                icon={ShieldCheck}
                type="cyan"
              />

              <ScoreCard
                title="Resume Score"
                value={resumeScore}
                icon={FileText}
                type="blue"
              />

              <ScoreCard
                title="Technical Skills"
                value={technicalScore}
                icon={Code2}
                type="violet"
              />

              <ScoreCard
                title="Placement Probability"
                value={placementScore}
                icon={BriefcaseBusiness}
                type="green"
              />

            </div>

            {/* =================================================
                AI SUMMARY
            ================================================= */}

            <div
              className="
                rounded-3xl
                border
                border-white/[0.08]
                bg-[#111827]
                p-6
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >

                <Sparkles
                  size={18}
                  className="text-cyan-400"
                />

                <h2
                  className="
                    text-lg
                    font-bold
                    text-white
                  "
                >
                  AI Resume Summary
                </h2>

              </div>

              <p
                className="
                  mt-4
                  text-sm
                  leading-7
                  text-slate-400
                "
              >
                {result?.aiSummary ||
                  result?.summary ||
                  "No AI summary was returned by the analysis service."}
              </p>

            </div>

            {/* =================================================
                STRENGTHS / IMPROVEMENTS
            ================================================= */}

            <div
              className="
                grid
                grid-cols-1
                gap-5
                lg:grid-cols-2
              "
            >

              <ResultList
                title="Resume Strengths"
                items={strengths}
                positive
              />

              <ResultList
                title="Areas to Improve"
                items={improvements}
              />

            </div>

            {/* =================================================
                SKILLS
            ================================================= */}

            <div
              className="
                grid
                grid-cols-1
                gap-5
                lg:grid-cols-2
              "
            >

              <SkillBox
                title="Skills Found"
                skills={skillsFound}
              />

              <SkillBox
                title="Missing Skills"
                skills={missingSkills}
                missing
              />

            </div>

            {/* =================================================
                RECOMMENDATIONS
            ================================================= */}

            <div
              className="
                rounded-3xl
                border
                border-cyan-400/10
                bg-cyan-400/[0.025]
                p-6
              "
            >

              <div
                className="
                  flex
                  items-center
                  gap-2
                "
              >

                <BrainCircuit
                  size={19}
                  className="text-cyan-400"
                />

                <h2
                  className="
                    text-lg
                    font-bold
                    text-white
                  "
                >
                  AI Recommendations
                </h2>

              </div>

              {recommendations.length >
              0 ? (

                <div
                  className="
                    mt-5
                    space-y-3
                  "
                >

                  {recommendations.map(
                    (
                      item,
                      index
                    ) => (

                      <div
                        key={index}
                        className="
                          flex
                          gap-3
                          rounded-2xl
                          border
                          border-white/[0.05]
                          bg-white/[0.02]
                          p-4
                        "
                      >

                        <span
                          className="
                            flex
                            h-6
                            w-6
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-cyan-400/10
                            text-[10px]
                            font-bold
                            text-cyan-400
                          "
                        >
                          {index + 1}
                        </span>

                        <p
                          className="
                            text-sm
                            leading-6
                            text-slate-300
                          "
                        >
                          {item}
                        </p>

                      </div>

                    )
                  )}

                </div>

              ) : (

                <p
                  className="
                    mt-5
                    text-sm
                    text-slate-500
                  "
                >
                  No recommendations were
                  returned by the AI analysis.
                </p>

              )}

            </div>

            {/* =================================================
                CLEAR ANALYSIS
            ================================================= */}

            <div
              className="
                flex
                justify-end
              "
            >

              <button
                onClick={
                  clearAnalysis
                }
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-red-400/10
                  bg-red-400/[0.04]
                  px-4
                  py-2.5
                  text-xs
                  font-semibold
                  text-red-400
                  transition
                  hover:bg-red-400/[0.08]
                "
              >

                <Trash2 size={14} />

                Clear Saved Analysis

              </button>

            </div>

          </div>

        )}

      </div>

    </main>
  );
}

/* ============================================================
   SCORE CARD
============================================================ */

function ScoreCard({
  title,
  value,
  icon: Icon,
  type,
}) {

  const colors = {

    cyan: {
      icon:
        "bg-cyan-400/10 text-cyan-400",
      value:
        "text-cyan-400",
      bar:
        "bg-cyan-400",
    },

    blue: {
      icon:
        "bg-blue-400/10 text-blue-400",
      value:
        "text-blue-400",
      bar:
        "bg-blue-400",
    },

    violet: {
      icon:
        "bg-violet-400/10 text-violet-400",
      value:
        "text-violet-400",
      bar:
        "bg-violet-400",
    },

    green: {
      icon:
        "bg-emerald-400/10 text-emerald-400",
      value:
        "text-emerald-400",
      bar:
        "bg-emerald-400",
    },

  };

  const selected =
    colors[type] ||
    colors.cyan;

  const score =
    Math.min(
      100,
      Math.max(
        0,
        Number(value) || 0
      )
    );

  return (
    <div
      className="
        rounded-3xl
        border
        border-white/[0.08]
        bg-[#111827]
        p-5
        transition
        hover:border-white/[0.12]
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <div
          className={`
            flex
            h-9
            w-9
            items-center
            justify-center
            rounded-lg
            ${selected.icon}
          `}
        >

          <Icon size={17} />

        </div>

        <span
          className={`
            text-2xl
            font-black
            ${selected.value}
          `}
        >
          {score}%
        </span>

      </div>

      <p
        className="
          mt-4
          text-xs
          font-semibold
          text-slate-400
        "
      >
        {title}
      </p>

      <div
        className="
          mt-3
          h-1.5
          overflow-hidden
          rounded-full
          bg-slate-800
        "
      >

        <div
          className={`
            h-full
            rounded-full
            ${selected.bar}
            transition-all
            duration-700
          `}
          style={{
            width: `${score}%`,
          }}
        />

      </div>

    </div>
  );
}

/* ============================================================
   RESULT LIST
============================================================ */

function ResultList({
  title,
  items,
  positive = false,
}) {

  return (
    <div
      className="
        rounded-3xl
        border
        border-white/[0.08]
        bg-[#111827]
        p-6
      "
    >

      <h2
        className={`
          text-lg
          font-bold
          ${
            positive
              ? "text-emerald-400"
              : "text-amber-400"
          }
        `}
      >
        {title}
      </h2>

      {items.length > 0 ? (

        <div
          className="
            mt-5
            space-y-3
          "
        >

          {items.map(
            (
              item,
              index
            ) => (

              <div
                key={index}
                className="
                  flex
                  gap-3
                  rounded-xl
                  border
                  border-white/[0.04]
                  bg-white/[0.02]
                  p-3
                "
              >

                <span
                  className={
                    positive
                      ? "text-emerald-400"
                      : "text-amber-400"
                  }
                >
                  {positive
                    ? "✓"
                    : "→"}
                </span>

                <p
                  className="
                    text-sm
                    leading-6
                    text-slate-400
                  "
                >
                  {item}
                </p>

              </div>

            )
          )}

        </div>

      ) : (

        <p
          className="
            mt-5
            text-sm
            text-slate-600
          "
        >
          No information returned.
        </p>

      )}

    </div>
  );
}

/* ============================================================
   SKILL BOX
============================================================ */

function SkillBox({
  title,
  skills,
  missing = false,
}) {

  return (
    <div
      className="
        rounded-3xl
        border
        border-white/[0.08]
        bg-[#111827]
        p-6
      "
    >

      <div
        className="
          flex
          items-center
          justify-between
        "
      >

        <h2
          className={`
            text-lg
            font-bold
            ${
              missing
                ? "text-red-400"
                : "text-emerald-400"
            }
          `}
        >
          {title}
        </h2>

        <span
          className={`
            rounded-full
            px-2.5
            py-1
            text-[10px]
            font-bold
            ${
              missing
                ? "bg-red-400/10 text-red-400"
                : "bg-emerald-400/10 text-emerald-400"
            }
          `}
        >
          {skills.length}
        </span>

      </div>

      {skills.length > 0 ? (

        <div
          className="
            mt-5
            flex
            flex-wrap
            gap-2
          "
        >

          {skills.map(
            (
              skill,
              index
            ) => (

              <span
                key={`${skill}-${index}`}
                className={`
                  rounded-xl
                  border
                  px-3
                  py-2
                  text-xs
                  font-medium
                  ${
                    missing
                      ? "border-red-400/10 bg-red-400/5 text-red-300"
                      : "border-emerald-400/10 bg-emerald-400/5 text-emerald-300"
                  }
                `}
              >

                <span className="mr-1.5">
                  {missing
                    ? "×"
                    : "✓"}
                </span>

                {skill}

              </span>

            )
          )}

        </div>

      ) : (

        <div
          className="
            mt-5
            rounded-xl
            border
            border-white/[0.05]
            bg-white/[0.02]
            p-4
          "
        >

          <p
            className="
              text-sm
              text-slate-600
            "
          >
            {missing
              ? "No skill gaps were detected."
              : "No technical skills were detected."}
          </p>

        </div>

      )}

    </div>
  );
}

export default ResumeAnalyzer;