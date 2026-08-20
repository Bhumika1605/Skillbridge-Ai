import { useMemo, useState } from "react";
import {
  BrainCircuit,
  CheckCircle2,
  XCircle,
  BookOpen,
  Target,
  TrendingUp,
  Sparkles,
  Plus,
  X,
  RotateCcw,
} from "lucide-react";

// ============================================================
// CAREER DATA
// ============================================================

const careerData = {
  "Computer Engineering": {
    roles: {
      "Frontend Developer": {
        requiredSkills: [
          "HTML",
          "CSS",
          "JavaScript",
          "React.js",
          "Responsive Design",
          "Git & GitHub",
          "REST APIs",
          "TypeScript",
        ],
        roadmap: [
          "HTML & Semantic Web",
          "CSS & Responsive Design",
          "JavaScript ES6+",
          "React.js",
          "Git & GitHub",
          "REST APIs",
          "TypeScript",
        ],
      },

      "Backend Developer": {
        requiredSkills: [
          "JavaScript",
          "Node.js",
          "Express.js",
          "REST APIs",
          "Databases",
          "SQL",
          "Git & GitHub",
          "Authentication",
        ],
        roadmap: [
          "JavaScript Fundamentals",
          "Node.js",
          "Express.js",
          "REST APIs",
          "SQL & Databases",
          "Authentication",
          "Git & GitHub",
        ],
      },

      "Full Stack Developer": {
        requiredSkills: [
          "HTML",
          "CSS",
          "JavaScript",
          "React.js",
          "Node.js",
          "Express.js",
          "SQL",
          "Git & GitHub",
          "REST APIs",
        ],
        roadmap: [
          "HTML & CSS",
          "JavaScript",
          "React.js",
          "Node.js & Express",
          "Databases",
          "REST APIs",
          "Git & GitHub",
        ],
      },

      "AI / ML Engineer": {
        requiredSkills: [
          "Python",
          "NumPy",
          "Pandas",
          "Machine Learning",
          "Statistics",
          "Scikit-learn",
          "Data Visualization",
          "Git",
        ],
        roadmap: [
          "Python",
          "NumPy & Pandas",
          "Statistics",
          "Machine Learning",
          "Scikit-learn",
          "Data Visualization",
          "ML Projects",
        ],
      },

      "Data Analyst": {
        requiredSkills: [
          "Python",
          "SQL",
          "Excel",
          "Pandas",
          "Statistics",
          "Data Visualization",
          "Power BI",
        ],
        roadmap: [
          "Excel",
          "SQL",
          "Python",
          "Pandas",
          "Statistics",
          "Power BI",
          "Data Projects",
        ],
      },

      "Cybersecurity Engineer": {
        requiredSkills: [
          "Networking",
          "Linux",
          "Python",
          "Cybersecurity Basics",
          "Cryptography",
          "Ethical Hacking",
          "OWASP",
          "Git",
        ],
        roadmap: [
          "Computer Networks",
          "Linux",
          "Python",
          "Cybersecurity Fundamentals",
          "OWASP",
          "Ethical Hacking",
          "Security Projects",
        ],
      },
    },
  },

  // ==========================================================
  // MECHANICAL
  // ==========================================================

  "Mechanical Engineering": {
    roles: {
      "Design Engineer": {
        requiredSkills: [
          "Engineering Drawing",
          "AutoCAD",
          "SolidWorks",
          "3D Modeling",
          "CAD",
          "GD&T",
          "Material Science",
        ],
        roadmap: [
          "Engineering Drawing",
          "AutoCAD",
          "3D Modeling",
          "SolidWorks",
          "GD&T",
          "Design Projects",
        ],
      },

      "Production Engineer": {
        requiredSkills: [
          "Manufacturing",
          "Production Planning",
          "CNC",
          "Quality Control",
          "Lean Manufacturing",
          "AutoCAD",
          "Industrial Safety",
        ],
        roadmap: [
          "Manufacturing Basics",
          "Production Planning",
          "CNC",
          "Quality Control",
          "Lean Manufacturing",
          "Industrial Safety",
        ],
      },

      "Automobile Engineer": {
        requiredSkills: [
          "Automobile Engineering",
          "Vehicle Dynamics",
          "Engine Systems",
          "CAD",
          "Automotive Electronics",
          "Manufacturing",
        ],
        roadmap: [
          "Automobile Fundamentals",
          "Engine Systems",
          "Vehicle Dynamics",
          "Automotive Electronics",
          "CAD",
          "Automotive Projects",
        ],
      },

      "Robotics Engineer": {
        requiredSkills: [
          "Robotics",
          "Arduino",
          "C++",
          "Python",
          "Sensors",
          "Control Systems",
          "CAD",
        ],
        roadmap: [
          "Arduino",
          "C++",
          "Python",
          "Sensors",
          "Control Systems",
          "Robotics Projects",
        ],
      },
    },
  },

  // ==========================================================
  // CIVIL
  // ==========================================================

  "Civil Engineering": {
    roles: {
      "Structural Engineer": {
        requiredSkills: [
          "Structural Analysis",
          "AutoCAD",
          "STAAD Pro",
          "RCC Design",
          "Steel Design",
          "Engineering Drawing",
        ],
        roadmap: [
          "Structural Analysis",
          "AutoCAD",
          "RCC Design",
          "Steel Design",
          "STAAD Pro",
          "Structural Projects",
        ],
      },

      "Site Engineer": {
        requiredSkills: [
          "Construction Management",
          "AutoCAD",
          "Site Planning",
          "Quantity Estimation",
          "Surveying",
          "Project Management",
          "Safety Management",
        ],
        roadmap: [
          "Surveying",
          "Construction Basics",
          "Site Planning",
          "Quantity Estimation",
          "Project Management",
          "Site Practice",
        ],
      },

      "Construction Engineer": {
        requiredSkills: [
          "Construction Management",
          "Project Planning",
          "AutoCAD",
          "Quantity Surveying",
          "Building Materials",
          "Safety Management",
        ],
        roadmap: [
          "Building Materials",
          "Construction Methods",
          "AutoCAD",
          "Quantity Surveying",
          "Project Planning",
          "Construction Projects",
        ],
      },

      "Transportation Engineer": {
        requiredSkills: [
          "Transportation Engineering",
          "Highway Design",
          "Traffic Engineering",
          "AutoCAD",
          "Surveying",
          "GIS",
        ],
        roadmap: [
          "Transportation Basics",
          "Traffic Engineering",
          "Highway Design",
          "Surveying",
          "GIS",
          "Transportation Projects",
        ],
      },
    },
  },

  // ==========================================================
  // CHEMICAL
  // ==========================================================

  "Chemical Engineering": {
    roles: {
      "Process Engineer": {
        requiredSkills: [
          "Chemical Processes",
          "Process Design",
          "Thermodynamics",
          "Fluid Mechanics",
          "Process Simulation",
          "Process Safety",
        ],
        roadmap: [
          "Chemical Processes",
          "Thermodynamics",
          "Fluid Mechanics",
          "Process Design",
          "Process Simulation",
          "Process Safety",
        ],
      },

      "Quality Engineer": {
        requiredSkills: [
          "Quality Control",
          "Quality Assurance",
          "Chemical Analysis",
          "Process Control",
          "Statistics",
          "Safety",
        ],
        roadmap: [
          "Quality Control",
          "Chemical Analysis",
          "Statistics",
          "Process Control",
          "Quality Assurance",
          "Quality Projects",
        ],
      },

      "Environmental Engineer": {
        requiredSkills: [
          "Environmental Engineering",
          "Waste Management",
          "Water Treatment",
          "Pollution Control",
          "Environmental Regulations",
          "Chemical Analysis",
        ],
        roadmap: [
          "Environmental Basics",
          "Water Treatment",
          "Waste Management",
          "Pollution Control",
          "Environmental Regulations",
          "Environmental Projects",
        ],
      },
    },
  },

  // ==========================================================
  // FINANCE
  // ==========================================================

  Finance: {
    roles: {
      "Financial Analyst": {
        requiredSkills: [
          "Financial Analysis",
          "Excel",
          "Accounting",
          "Financial Modeling",
          "Statistics",
          "Power BI",
          "Data Analysis",
        ],
        roadmap: [
          "Accounting Basics",
          "Advanced Excel",
          "Financial Analysis",
          "Financial Modeling",
          "Power BI",
          "Finance Projects",
        ],
      },

      "Investment Analyst": {
        requiredSkills: [
          "Investment Analysis",
          "Financial Markets",
          "Excel",
          "Financial Modeling",
          "Valuation",
          "Economics",
          "Risk Analysis",
        ],
        roadmap: [
          "Financial Markets",
          "Investment Basics",
          "Excel",
          "Financial Modeling",
          "Company Valuation",
          "Investment Analysis",
        ],
      },

      "Risk Analyst": {
        requiredSkills: [
          "Risk Management",
          "Statistics",
          "Excel",
          "Financial Analysis",
          "Data Analysis",
          "Probability",
        ],
        roadmap: [
          "Risk Management",
          "Statistics",
          "Probability",
          "Excel",
          "Financial Analysis",
          "Risk Projects",
        ],
      },

      Accountant: {
        requiredSkills: [
          "Accounting",
          "Tally",
          "Excel",
          "GST",
          "Financial Statements",
          "Taxation",
        ],
        roadmap: [
          "Accounting Fundamentals",
          "Tally",
          "Excel",
          "GST",
          "Taxation",
          "Financial Statements",
        ],
      },
    },
  },

  // ==========================================================
  // BUSINESS
  // ==========================================================

  Business: {
    roles: {
      "Business Analyst": {
        requiredSkills: [
          "Business Analysis",
          "Excel",
          "SQL",
          "Power BI",
          "Data Analysis",
          "Communication",
          "Problem Solving",
        ],
        roadmap: [
          "Business Fundamentals",
          "Excel",
          "SQL",
          "Power BI",
          "Data Analysis",
          "Business Case Studies",
        ],
      },

      "Marketing Executive": {
        requiredSkills: [
          "Digital Marketing",
          "SEO",
          "Social Media Marketing",
          "Content Marketing",
          "Google Analytics",
          "Communication",
        ],
        roadmap: [
          "Marketing Fundamentals",
          "SEO",
          "Social Media",
          "Content Marketing",
          "Google Analytics",
          "Marketing Campaign",
        ],
      },

      "Human Resources": {
        requiredSkills: [
          "HR Management",
          "Recruitment",
          "Communication",
          "Employee Relations",
          "Excel",
          "Interviewing",
        ],
        roadmap: [
          "HR Fundamentals",
          "Recruitment",
          "Interviewing",
          "Employee Relations",
          "Excel",
          "HR Projects",
        ],
      },

      "Operations Manager": {
        requiredSkills: [
          "Operations Management",
          "Project Management",
          "Excel",
          "Supply Chain",
          "Problem Solving",
          "Communication",
        ],
        roadmap: [
          "Operations Basics",
          "Excel",
          "Supply Chain",
          "Project Management",
          "Problem Solving",
          "Operations Case Studies",
        ],
      },
    },
  },
};

// ============================================================
// MAIN COMPONENT
// ============================================================

export default function SkillGap() {
  const [field, setField] = useState("");
  const [jobRole, setJobRole] = useState("");

  const [skillInput, setSkillInput] = useState("");
  const [skills, setSkills] = useState([]);

  const [loading, setLoading] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  // ----------------------------------------------------------
  // AVAILABLE JOB ROLES
  // ----------------------------------------------------------

  const availableRoles = useMemo(() => {
    if (!field) return [];

    return Object.keys(
      careerData[field]?.roles || {}
    );
  }, [field]);

  // ----------------------------------------------------------
  // SELECT FIELD
  // ----------------------------------------------------------

  const handleFieldChange = (e) => {
    setField(e.target.value);
    setJobRole("");
    setSkills([]);
    setAnalyzed(false);
  };

  // ----------------------------------------------------------
  // SELECT ROLE
  // ----------------------------------------------------------

  const handleRoleChange = (e) => {
    setJobRole(e.target.value);
    setSkills([]);
    setAnalyzed(false);
  };

  // ----------------------------------------------------------
  // ADD SKILL
  // ----------------------------------------------------------

  const addSkill = () => {
    const skill = skillInput.trim();

    if (!skill) return;

    const alreadyExists = skills.some(
      (item) =>
        item.toLowerCase() === skill.toLowerCase()
    );

    if (alreadyExists) {
      setSkillInput("");
      return;
    }

    setSkills([...skills, skill]);
    setSkillInput("");
    setAnalyzed(false);
  };

  // ----------------------------------------------------------
  // REMOVE SKILL
  // ----------------------------------------------------------

  const removeSkill = (index) => {
    setSkills(
      skills.filter((_, i) => i !== index)
    );

    setAnalyzed(false);
  };

  // ----------------------------------------------------------
  // ANALYZE
  // ----------------------------------------------------------

  const analyzeSkillGap = () => {
    if (!field) {
      alert("Please select your engineering/business field.");
      return;
    }

    if (!jobRole) {
      alert("Please select your target job role.");
      return;
    }

    if (skills.length === 0) {
      alert("Please add at least one current skill.");
      return;
    }

    setLoading(true);
    setAnalyzed(false);

    setTimeout(() => {
      setLoading(false);
      setAnalyzed(true);
    }, 1500);
  };

  // ----------------------------------------------------------
  // RESET
  // ----------------------------------------------------------

  const resetAnalysis = () => {
    setField("");
    setJobRole("");
    setSkills([]);
    setSkillInput("");
    setAnalyzed(false);
  };

  // ----------------------------------------------------------
  // CURRENT ROLE DATA
  // ----------------------------------------------------------

  const roleData =
    careerData[field]?.roles?.[jobRole];

  // ----------------------------------------------------------
  // MATCHING SKILLS
  // ----------------------------------------------------------

  const matchingSkills = useMemo(() => {
    if (!roleData) return [];

    return roleData.requiredSkills.filter(
      (requiredSkill) =>
        skills.some(
          (userSkill) =>
            userSkill.toLowerCase() ===
            requiredSkill.toLowerCase()
        )
    );
  }, [roleData, skills]);

  // ----------------------------------------------------------
  // MISSING SKILLS
  // ----------------------------------------------------------

  const missingSkills = useMemo(() => {
    if (!roleData) return [];

    return roleData.requiredSkills.filter(
      (requiredSkill) =>
        !skills.some(
          (userSkill) =>
            userSkill.toLowerCase() ===
            requiredSkill.toLowerCase()
        )
    );
  }, [roleData, skills]);

  // ----------------------------------------------------------
  // SKILL MATCH %
  // ----------------------------------------------------------

  const skillMatch = roleData
    ? Math.round(
        (matchingSkills.length /
          roleData.requiredSkills.length) *
          100
      )
    : 0;

  // ----------------------------------------------------------
  // JOB READINESS
  // ----------------------------------------------------------

  const jobReadiness = Math.min(
    100,
    Math.round(skillMatch * 0.85 + 10)
  );

  // ==========================================================
  // UI
  // ==========================================================

  return (
    <div className="min-h-screen bg-slate-950 p-6 md:p-8">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="max-w-7xl mx-auto">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

          <div>

            <div className="flex items-center gap-3">

              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">

                <BrainCircuit
                  size={25}
                  className="text-cyan-400"
                />

              </div>

              <div>

                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  Skill Gap Analysis
                </h1>

                <p className="mt-1 text-sm text-slate-400">
                  Discover the skills you need for your dream career.
                </p>

              </div>

            </div>

          </div>

          {(field || jobRole || skills.length > 0) && (
            <button
              onClick={resetAnalysis}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-cyan-500/40 hover:text-cyan-400"
            >
              <RotateCcw size={16} />
              Reset
            </button>
          )}

        </div>

        {/* ===================================================
            INPUT CARD
        =================================================== */}

        <div className="mt-8 rounded-3xl border border-slate-800 bg-slate-900/70 p-6 md:p-8">

          <div className="grid lg:grid-cols-2 gap-6">

            {/* FIELD */}

            <div>

              <label className="text-sm font-semibold text-white">
                Engineering / Career Field
              </label>

              <select
                value={field}
                onChange={handleFieldChange}
                className="mt-3 w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-4 text-white outline-none transition focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10"
              >

                <option value="">
                  Select Main Field
                </option>

                {Object.keys(careerData).map(
                  (fieldName) => (
                    <option
                      key={fieldName}
                      value={fieldName}
                    >
                      {fieldName}
                    </option>
                  )
                )}

              </select>

            </div>

            {/* JOB ROLE */}

            <div>

              <label className="text-sm font-semibold text-white">
                Target Job Role
              </label>

              <select
                value={jobRole}
                onChange={handleRoleChange}
                disabled={!field}
                className="mt-3 w-full rounded-2xl border border-slate-700 bg-slate-800 px-4 py-4 text-white outline-none transition disabled:cursor-not-allowed disabled:opacity-50 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/10"
              >

                <option value="">
                  {!field
                    ? "Select field first"
                    : "Select Job Role"}
                </option>

                {availableRoles.map(
                  (role) => (
                    <option
                      key={role}
                      value={role}
                    >
                      {role}
                    </option>
                  )
                )}

              </select>

            </div>

          </div>

          {/* =================================================
              CURRENT SKILLS
          ================================================= */}

          <div className="mt-8">

            <label className="text-sm font-semibold text-white">
              Your Current Skills
            </label>

            <div className="mt-3 flex flex-col sm:flex-row gap-3">

              <input
                type="text"
                value={skillInput}
                onChange={(e) =>
                  setSkillInput(e.target.value)
                }
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addSkill();
                  }
                }}
                placeholder="Example: HTML, Python, AutoCAD..."
                className="flex-1 rounded-2xl border border-slate-700 bg-slate-800 px-4 py-4 text-white outline-none placeholder:text-slate-600 focus:border-cyan-500"
              />

              <button
                type="button"
                onClick={addSkill}
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-6 py-4 font-semibold text-white transition hover:bg-cyan-400"
              >
                <Plus size={18} />
                Add Skill
              </button>

            </div>

            {/* SKILL TAGS */}

            {skills.length > 0 && (

              <div className="mt-5 flex flex-wrap gap-2">

                {skills.map(
                  (skill, index) => (

                    <div
                      key={index}
                      className="inline-flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-sm font-medium text-cyan-300"
                    >

                      {skill}

                      <button
                        type="button"
                        onClick={() =>
                          removeSkill(index)
                        }
                        className="text-cyan-400 transition hover:text-white"
                      >
                        <X size={15} />
                      </button>

                    </div>

                  )
                )}

              </div>

            )}

          </div>

          {/* =================================================
              ANALYZE BUTTON
          ================================================= */}

          <button
            type="button"
            onClick={analyzeSkillGap}
            disabled={loading}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 py-4 text-lg font-bold text-white shadow-lg shadow-cyan-500/10 transition hover:-translate-y-0.5 hover:shadow-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-60"
          >

            <Sparkles size={20} />

            {loading
              ? "Analyzing Your Career..."
              : "Analyze My Skill Gap"}

          </button>

          {/* =================================================
              LOADING
          ================================================= */}

          {loading && (

            <div className="mt-8 rounded-2xl border border-cyan-400/10 bg-cyan-400/5 p-8 text-center">

              <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-cyan-500/20 border-t-cyan-400" />

              <p className="mt-4 font-medium text-cyan-400">
                AI is comparing your skills with the {jobRole} skill requirements...
              </p>

            </div>

          )}

        </div>

        {/* ===================================================
            REPORT
        =================================================== */}

        {analyzed && roleData && (

          <div className="mt-8">

            {/* REPORT HEADER */}

            <div className="mb-6 rounded-3xl border border-cyan-400/10 bg-cyan-400/5 p-6">

              <div className="flex items-start gap-4">

                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10">

                  <Target
                    size={24}
                    className="text-cyan-400"
                  />

                </div>

                <div>

                  <p className="text-sm text-cyan-400">
                    Personalized Career Analysis
                  </p>

                  <h2 className="mt-1 text-2xl font-bold text-white">
                    {jobRole}
                  </h2>

                  <p className="mt-1 text-sm text-slate-400">
                    {field} • Skill requirements matched to your current profile
                  </p>

                </div>

              </div>

            </div>

            {/* =================================================
                SCORE CARDS
            ================================================= */}

            <div className="grid md:grid-cols-2 gap-6">

              {/* SKILL MATCH */}

              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-slate-400">
                      Skill Match
                    </p>

                    <p className="mt-2 text-5xl font-bold text-cyan-400">
                      {skillMatch}%
                    </p>

                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10">

                    <Target
                      size={22}
                      className="text-cyan-400"
                    />

                  </div>

                </div>

                <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-800">

                  <div
                    className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-700"
                    style={{
                      width: `${skillMatch}%`,
                    }}
                  />

                </div>

                <p className="mt-3 text-xs text-slate-500">
                  {matchingSkills.length} of{" "}
                  {roleData.requiredSkills.length} required skills matched
                </p>

              </div>

              {/* JOB READINESS */}

              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-sm text-slate-400">
                      Job Readiness
                    </p>

                    <p className="mt-2 text-5xl font-bold text-emerald-400">
                      {jobReadiness}%
                    </p>

                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10">

                    <TrendingUp
                      size={22}
                      className="text-emerald-400"
                    />

                  </div>

                </div>

                <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-800">

                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-400 transition-all duration-700"
                    style={{
                      width: `${jobReadiness}%`,
                    }}
                  />

                </div>

                <p className="mt-3 text-xs text-slate-500">
                  Based on your current skills and target role
                </p>

              </div>

            </div>

            {/* =================================================
                SKILL BREAKDOWN
            ================================================= */}

            <div className="mt-6 grid lg:grid-cols-2 gap-6">

              {/* MATCHING */}

              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

                <div className="flex items-center gap-3">

                  <CheckCircle2
                    size={22}
                    className="text-emerald-400"
                  />

                  <h3 className="text-xl font-bold text-white">
                    Matching Skills
                  </h3>

                </div>

                <p className="mt-1 text-sm text-slate-500">
                  Skills you already have for this role.
                </p>

                <div className="mt-5 space-y-3">

                  {matchingSkills.length > 0 ? (

                    matchingSkills.map(
                      (skill) => (

                        <div
                          key={skill}
                          className="flex items-center gap-3 rounded-xl border border-emerald-400/10 bg-emerald-400/5 px-4 py-3"
                        >

                          <CheckCircle2
                            size={17}
                            className="text-emerald-400"
                          />

                          <span className="text-sm font-medium text-emerald-300">
                            {skill}
                          </span>

                        </div>

                      )
                    )

                  ) : (

                    <p className="rounded-xl bg-slate-800 p-4 text-sm text-slate-500">
                      No matching skills yet.
                    </p>

                  )}

                </div>

              </div>

              {/* MISSING */}

              <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6">

                <div className="flex items-center gap-3">

                  <XCircle
                    size={22}
                    className="text-red-400"
                  />

                  <h3 className="text-xl font-bold text-white">
                    Missing Skills
                  </h3>

                </div>

                <p className="mt-1 text-sm text-slate-500">
                  Skills recommended to become job-ready.
                </p>

                <div className="mt-5 space-y-3">

                  {missingSkills.length > 0 ? (

                    missingSkills.map(
                      (skill) => (

                        <div
                          key={skill}
                          className="flex items-center gap-3 rounded-xl border border-red-400/10 bg-red-400/5 px-4 py-3"
                        >

                          <XCircle
                            size={17}
                            className="text-red-400"
                          />

                          <span className="text-sm font-medium text-red-300">
                            {skill}
                          </span>

                        </div>

                      )
                    )

                  ) : (

                    <div className="rounded-xl border border-emerald-400/10 bg-emerald-400/5 p-4">

                      <p className="text-sm font-medium text-emerald-300">
                        🎉 Excellent! You have all the required skills.
                      </p>

                    </div>

                  )}

                </div>

              </div>

            </div>

            {/* =================================================
                LEARNING ROADMAP
            ================================================= */}

            <div className="mt-6 rounded-3xl border border-slate-800 bg-slate-900 p-6">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10">

                  <BookOpen
                    size={20}
                    className="text-cyan-400"
                  />

                </div>

                <div>

                  <h3 className="text-xl font-bold text-white">
                    Personalized Learning Roadmap
                  </h3>

                  <p className="text-sm text-slate-500">
                    Recommended learning path for {jobRole}
                  </p>

                </div>

              </div>

              <div className="mt-6 grid md:grid-cols-2 lg:grid-cols-3 gap-4">

                {roleData.roadmap.map(
                  (step, index) => (

                    <div
                      key={step}
                      className="relative rounded-2xl border border-slate-800 bg-slate-950/70 p-5 transition hover:border-cyan-400/20"
                    >

                      <div className="flex items-center gap-3">

                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-cyan-400/10 text-sm font-bold text-cyan-400">

                          {index + 1}

                        </div>

                        <span className="text-sm font-semibold text-white">
                          {step}
                        </span>

                      </div>

                    </div>

                  )
                )}

              </div>

            </div>

            {/* =================================================
                RECOMMENDATION
            ================================================= */}

            <div className="mt-6 rounded-3xl border border-cyan-400/10 bg-gradient-to-r from-cyan-400/5 to-blue-500/5 p-6">

              <div className="flex items-start gap-4">

                <Sparkles
                  size={22}
                  className="mt-0.5 flex-shrink-0 text-cyan-400"
                />

                <div>

                  <h3 className="font-bold text-white">
                    SkillBridge Recommendation
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-400">

                    {missingSkills.length > 0
                      ? `Focus first on ${missingSkills.slice(0, 3).join(", ")}. Building these skills will improve your readiness for a ${jobRole} position.`
                      : `You have a strong skill foundation for ${jobRole}. Focus on real-world projects, internships and portfolio development.`}

                  </p>

                </div>

              </div>

            </div>

          </div>

        )}

      </div>

    </div>
  );
}