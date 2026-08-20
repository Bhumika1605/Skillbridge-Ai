import express from "express";
import cors from "cors";
import multer from "multer";
import mammoth from "mammoth";
import dotenv from "dotenv";
import pkg from "pdf-parse";

const { PDFParse } = pkg;

dotenv.config();

console.log("==================================================");
console.log(" SkillBridge AI - Backend Starting");
console.log("==================================================");

/* =========================================================
   APP
========================================================= */

const app = express();

const PORT =
  Number(process.env.PORT) || 5000;

/* =========================================================
   CONFIGURATION
========================================================= */

const LIVE_JOBS_ENABLED =
  String(
    process.env.LIVE_JOBS_ENABLED ?? "true"
  ).toLowerCase() === "true";

const ARBEITNOW_URL =
  process.env.ARBEITNOW_URL ||
  "https://www.arbeitnow.com/api/job-board-api";

const REMOTIVE_URL =
  process.env.REMOTIVE_URL ||
  "https://remotive.com/api/remote-jobs";

const LIVE_CACHE_TTL_MS =
  Number(
    process.env.LIVE_CACHE_TTL_MS
  ) || 10 * 60 * 1000;

const LIVE_FETCH_TIMEOUT_MS =
  Number(
    process.env.LIVE_FETCH_TIMEOUT_MS
  ) || 12000;

const MAX_LIVE_RESULTS =
  Number(
    process.env.MAX_LIVE_RESULTS
  ) || 200;

/*
  IMPORTANT

  Apify is intentionally disabled.

  This backend NEVER calls Apify.

  Live sources:
    1. Arbeitnow
    2. Remotive

  If live APIs fail:
    local fallback remains available.
*/

/* =========================================================
   CACHE
========================================================= */

const liveCache = {
  jobs: [],
  internships: [],

  jobsFetchedAt: 0,
  internshipsFetchedAt: 0,

  jobsRefreshing: false,
};

/* =========================================================
   MIDDLEWARE
========================================================= */

app.use(
  cors({
    origin: true,
    credentials: false,
  })
);

app.use(
  express.json({
    limit: "10mb",
  })
);

app.use(
  express.urlencoded({
    extended: true,
    limit: "10mb",
  })
);

/* =========================================================
   MULTER
========================================================= */

const upload = multer({
  storage:
    multer.memoryStorage(),

  limits: {
    fileSize:
      10 * 1024 * 1024,
  },

  fileFilter: (
    req,
    file,
    cb
  ) => {
    const allowedTypes = [
      "application/pdf",

      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

      "text/plain",
    ];

    if (
      allowedTypes.includes(
        file.mimetype
      )
    ) {
      cb(null, true);
      return;
    }

    cb(
      new Error(
        "Only PDF, DOCX and TXT resume files are supported."
      )
    );
  },
});

/* =========================================================
   CAREER ROLES
========================================================= */

const ROLES = [
  "Frontend Developer",
  "Backend Developer",
  "Full-Stack Developer",
  "Software Engineer",
  "AI Engineer",
  "ML Engineer",
  "Data Scientist",
  "Data Analyst",
  "UI/UX Designer",
  "Cybersecurity Analyst",
  "Cloud Engineer",
  "DevOps Engineer",
  "Mobile App Developer",

  "Mechanical Engineer",
  "Design Engineer",
  "Production Engineer",
  "Automotive Engineer",
  "CAD Engineer",

  "Civil Engineer",
  "Site Engineer",
  "Structural Engineer",

  "Electrical Engineer",
  "Power Systems Engineer",

  "Electronics Engineer",
  "Embedded Systems Engineer",
  "VLSI Engineer",

  "Chemical Engineer",
  "Process Engineer",
  "Biomedical Engineer",
  "Environmental Engineer",

  "Accountant",
  "Financial Analyst",
  "Banking Associate",
  "Investment Analyst",
  "Business Analyst",
  "Business Development Executive",
  "Marketing Executive",
  "Digital Marketing Specialist",
  "Sales Executive",
  "Human Resources Executive",
  "HR Manager",
  "Operations Manager",
  "Product Manager",

  "Research Assistant",
  "Laboratory Assistant",
  "Research Scientist",
  "Statistician",
  "Biotechnologist",
  "Chemist",
  "Environmental Scientist",

  "Graphic Designer",
  "Product Designer",
  "Content Writer",
  "Copywriter",
  "Social Media Manager",
  "Video Editor",
  "Digital Content Creator",
  "Journalist",
  "Public Relations Executive",

  "Clinical Research Associate",
  "Pharmacovigilance Associate",
  "Healthcare Analyst",
  "Medical Representative",
  "Hospital Administrator",
  "Medical Laboratory Technologist",

  "Agronomist",
  "Agriculture Officer",
  "Farm Manager",
  "Agricultural Consultant",
  "Food Technologist",

  "Hotel Manager",
  "Event Manager",
  "Hospitality Executive",
  "Travel Consultant",

  "Teacher",
  "Academic Counselor",
  "Training Coordinator",
  "Education Consultant",

  "Legal Associate",
  "Legal Researcher",
  "Compliance Officer",
];

/* =========================================================
   SKILLS
========================================================= */

const SKILLS = [
  "HTML",
  "CSS",
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Angular",
  "Vue",
  "Tailwind CSS",
  "Node.js",
  "Express",
  "Python",
  "Java",
  "C",
  "C++",
  "C#",
  "SQL",
  "MySQL",
  "PostgreSQL",
  "MongoDB",
  "Firebase",
  "Git",
  "GitHub",
  "REST API",
  "API",

  "Machine Learning",
  "Deep Learning",
  "Artificial Intelligence",
  "Generative AI",
  "TensorFlow",
  "PyTorch",
  "Data Science",
  "Data Analysis",
  "Pandas",
  "NumPy",
  "Matplotlib",
  "Power BI",
  "Tableau",
  "Excel",

  "Figma",
  "UI/UX",
  "UX Design",
  "Cybersecurity",
  "Ethical Hacking",
  "Penetration Testing",
  "Network Security",

  "AWS",
  "Azure",
  "Google Cloud",
  "GCP",
  "Docker",
  "Kubernetes",
  "Jenkins",
  "Terraform",

  "Flutter",
  "React Native",
  "Android",
  "iOS",

  "Linux",
  "System Design",
  "Data Structures",
  "Algorithms",

  "AutoCAD",
  "SolidWorks",
  "CATIA",
  "ANSYS",
  "Creo",
  "Fusion 360",
  "CNC",
  "CAD",
  "CAM",
  "Thermodynamics",
  "Fluid Mechanics",
  "Manufacturing",
  "Production Planning",
  "Mechanical Design",
  "GD&T",
  "HVAC",
  "Robotics",
  "MATLAB",

  "Civil 3D",
  "STAAD Pro",
  "Revit",
  "Primavera",
  "MS Project",
  "Structural Analysis",
  "Structural Design",
  "Surveying",
  "Construction Management",
  "Quantity Surveying",
  "Estimation",
  "BOQ",
  "Concrete Technology",

  "Electrical Design",
  "Power Systems",
  "Power Electronics",
  "PLC",
  "SCADA",
  "Electrical Wiring",
  "Circuit Design",
  "MATLAB Simulink",
  "ETAP",
  "PSCAD",
  "Control Systems",
  "Renewable Energy",

  "Embedded Systems",
  "Arduino",
  "Raspberry Pi",
  "Microcontrollers",
  "VLSI",
  "Verilog",
  "VHDL",
  "PCB Design",
  "IoT",
  "Embedded C",
  "Digital Electronics",
  "Analog Electronics",

  "Accounting",
  "Financial Accounting",
  "Tally",
  "GST",
  "Taxation",
  "Auditing",
  "Financial Analysis",
  "Investment Analysis",
  "Banking",
  "Finance",
  "Economics",
  "Business Analysis",
  "Business Development",
  "Marketing",
  "Digital Marketing",
  "SEO",
  "SEM",
  "Social Media Marketing",
  "Sales",
  "CRM",
  "Human Resources",
  "Recruitment",
  "Talent Acquisition",
  "Payroll",
  "Operations",
  "Supply Chain",
  "Project Management",
  "Agile",
  "Scrum",
  "Jira",

  "Research",
  "Laboratory",
  "Statistics",
  "Biotechnology",
  "Microbiology",
  "Biochemistry",
  "Chemistry",
  "Physics",
  "Environmental Science",
  "Scientific Writing",
  "SPSS",
  "R",

  "Graphic Design",
  "Adobe Photoshop",
  "Photoshop",
  "Adobe Illustrator",
  "Illustrator",
  "Canva",
  "Prototyping",
  "Wireframing",
  "User Research",
  "Typography",
  "Branding",
  "Video Editing",
  "Premiere Pro",
  "After Effects",
  "Content Creation",
  "Content Writing",
  "Copywriting",
  "Journalism",
  "Public Relations",

  "Pharmacology",
  "Pharmaceutical Analysis",
  "Clinical Research",
  "Clinical Trials",
  "Pharmacovigilance",
  "Drug Safety",
  "Medical Coding",
  "Medical Terminology",
  "Healthcare Management",
  "Hospital Administration",
  "Laboratory Diagnostics",

  "Agriculture",
  "Agronomy",
  "Horticulture",
  "Soil Science",
  "Crop Management",
  "Farm Management",
  "Agricultural Economics",
  "Food Technology",
  "Food Processing",
  "Irrigation",

  "Hospitality Management",
  "Hotel Management",
  "Food Production",
  "Food and Beverage",
  "Front Office",
  "Housekeeping",
  "Event Management",
  "Travel Management",
  "Tourism",

  "Teaching",
  "Lesson Planning",
  "Classroom Management",
  "Curriculum Development",
  "Educational Technology",
  "Training",
  "Counseling",

  "Legal Research",
  "Legal Writing",
  "Contract Law",
  "Corporate Law",
  "Compliance",
  "Litigation",
  "Intellectual Property",
];

/* =========================================================
   ROLE KEYWORDS
========================================================= */

const ROLE_KEYWORDS = {
  "Frontend Developer": [
    "frontend developer",
    "front end developer",
    "web developer",
    "react developer",
    "javascript developer",
    "html",
    "css",
    "react",
    "tailwind",
  ],

  "Backend Developer": [
    "backend developer",
    "back end developer",
    "node.js developer",
    "nodejs developer",
    "express",
    "django",
    "flask",
    "spring boot",
    "api developer",
    "backend",
  ],

  "Full-Stack Developer": [
    "full stack developer",
    "full-stack developer",
    "fullstack developer",
    "mern",
    "mean stack",
  ],

  "Software Engineer": [
    "software engineer",
    "software developer",
    "software development",
    "programmer",
    "software intern",
  ],

  "AI Engineer": [
    "ai engineer",
    "artificial intelligence",
    "generative ai",
    "genai",
    "llm",
  ],

  "ML Engineer": [
    "machine learning engineer",
    "ml engineer",
    "machine learning",
    "deep learning",
    "tensorflow",
    "pytorch",
  ],

  "Data Scientist": [
    "data scientist",
    "data science",
    "predictive modeling",
    "statistical modeling",
  ],

  "Data Analyst": [
    "data analyst",
    "data analytics",
    "data analysis",
    "business intelligence",
    "power bi",
    "tableau",
    "excel analyst",
  ],

  "UI/UX Designer": [
    "ui ux",
    "ui/ux",
    "ux designer",
    "ui designer",
    "user experience",
    "user interface",
    "figma",
    "product designer",
  ],

  "Cybersecurity Analyst": [
    "cybersecurity",
    "cyber security",
    "security analyst",
    "information security",
    "soc analyst",
    "ethical hacking",
    "penetration testing",
    "network security",
  ],

  "Cloud Engineer": [
    "cloud engineer",
    "cloud computing",
    "aws",
    "azure",
    "google cloud",
    "gcp",
    "cloud infrastructure",
  ],

  "DevOps Engineer": [
    "devops engineer",
    "devops",
    "docker",
    "kubernetes",
    "jenkins",
    "terraform",
    "ci/cd",
  ],

  "Mobile App Developer": [
    "mobile app developer",
    "android developer",
    "ios developer",
    "flutter developer",
    "react native",
    "mobile application",
  ],

  "Mechanical Engineer": [
    "mechanical engineer",
    "mechanical engineering",
    "thermodynamics",
    "fluid mechanics",
    "manufacturing",
  ],

  "Civil Engineer": [

    "civil engineer",
    "civil engineering",
    "construction",
    "surveying",
  ],

  "Electrical Engineer": [
    "electrical engineer",
    "electrical engineering",
    "electrical design",
    "electrical systems",
  ],

  "Electronics Engineer": [
    "electronics engineer",
    "electronics engineering",
    "digital electronics",
    "analog electronics",
    "circuit design",
  ],

  "Embedded Systems Engineer": [
    "embedded systems",
    "embedded engineer",
    "embedded c",
    "microcontroller",
    "arduino",
    "raspberry pi",
  ],

  "Accountant": [
    "accountant",
    "accounting",
    "financial accounting",
    "tally",
    "gst",
    "auditing",
  ],

  "Financial Analyst": [
    "financial analyst",
    "financial analysis",
    "investment analysis",
    "finance analyst",
  ],

  "Business Analyst": [
    "business analyst",
    "business analysis",
    "business intelligence",
    "requirements analysis",
  ],

  "Marketing Executive": [
    "marketing executive",
    "marketing",
    "marketing management",
    "brand marketing",
  ],

  "Digital Marketing Specialist": [
    "digital marketing",
    "seo",
    "sem",
    "social media marketing",
    "google ads",
    "content marketing",
  ],

  "Graphic Designer": [
    "graphic designer",
    "graphic design",
    "photoshop",
    "illustrator",
    "canva",
    "branding",
  ],

  "Content Writer": [
    "content writer",
    "content writing",
    "blog writer",
    "technical writer",
    "copywriting",
  ],

  "Research Assistant": [
    "research assistant",
    "research intern",
    "research",
    "research project",
  ],

  "Teacher": [
    "teacher",
    "teaching",
    "education",
    "lesson planning",
  ],

  "Legal Associate": [
    "legal associate",
    "legal research",
    "legal writing",
    "corporate law",
  ],
};

/* =========================================================
   FIELD KEYWORDS
========================================================= */

const FIELD_KEYWORDS = {
  "Computer / IT": [
    "computer",
    "software",
    "programming",
    "developer",
    "development",
    "react",
    "javascript",
    "python",
    "java",
    "node",
    "html",
    "css",
    "sql",
    "database",
    "web",
    "coding",
    "software engineering",
  ],

  Engineering: [
    "engineering",
    "engineer",
    "technical",
    "manufacturing",
    "design",
    "production",
  ],

  "Business / Commerce": [
    "business",
    "commerce",
    "accounting",
    "finance",
    "marketing",
    "sales",
    "management",
    "banking",
    "economics",
  ],

  Science: [
    "science",
    "research",
    "laboratory",
    "statistics",
    "physics",
    "chemistry",
    "biology",
    "biotechnology",
  ],

  "Design / Media": [
    "design",
    "designer",
    "ui",
    "ux",
    "graphic",
    "creative",
    "media",
    "content",
    "video",
  ],

  Healthcare: [
    "healthcare",
    "medical",
    "hospital",
    "pharmacy",
    "clinical",
    "medicine",
  ],

  Agriculture: [
    "agriculture",
    "agronomy",
    "farming",
    "crop",
    "soil",
    "irrigation",
  ],

  Hospitality: [
    "hotel",
    "hospitality",
    "tourism",
    "travel",
    "event",
  ],

  Education: [
    "teacher",
    "teaching",
    "education",
    "training",
    "academic",
  ],

  Law: [
    "law",
    "legal",
    "lawyer",
    "litigation",
    "compliance",
    "contract",
  ],
};

/* =========================================================
   ROLE REQUIRED SKILLS
========================================================= */

const ROLE_REQUIRED_SKILLS = {
  "Frontend Developer": [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Git",
    "GitHub",
  ],

  "Backend Developer": [
    "Node.js",
    "Express",
    "JavaScript",
    "SQL",
    "REST API",
    "Git",
  ],

  "Full-Stack Developer": [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Node.js",
    "Express",
    "SQL",
    "Git",
  ],

  "Software Engineer": [
    "Java",
    "Python",
    "C++",
    "Data Structures",
    "Algorithms",
    "Git",
  ],

  "AI Engineer": [
    "Python",
    "Artificial Intelligence",
    "Machine Learning",
    "Data Science",
    "Git",
  ],

  "ML Engineer": [
    "Python",
    "Machine Learning",
    "Deep Learning",
    "TensorFlow",
    "PyTorch",
  ],

  "Data Scientist": [
    "Python",
    "Data Science",
    "Pandas",
    "NumPy",
    "Statistics",
    "Machine Learning",
  ],

  "Data Analyst": [
    "Excel",
    "SQL",
    "Python",
    "Pandas",
    "Power BI",
    "Data Analysis",
  ],

  "UI/UX Designer": [
    "Figma",
    "UI/UX",
    "UX Design",
    "Wireframing",
    "Prototyping",
  ],

  "Cybersecurity Analyst": [
    "Cybersecurity",
    "Network Security",
    "Ethical Hacking",
    "Linux",
  ],

  "Cloud Engineer": [
    "AWS",
    "Azure",
    "Linux",
    "Docker",
  ],

  "DevOps Engineer": [
    "Docker",
    "Kubernetes",
    "Jenkins",
    "Terraform",
    "Linux",
  ],
};

/* =========================================================
   HELPERS
========================================================= */

function cleanText(value) {
  return String(value ?? "")
    .replace(/\s+/g, " ")
    .trim();
}

function normalizeText(value) {
  return cleanText(value)
    .toLowerCase();
}

function uniqueArray(array) {
  return [
    ...new Set(
      Array.isArray(array)
        ? array
        : []
    ),
  ];
}

function stripHtml(value) {
  return String(value ?? "")
    .replace(
      /<script[\s\S]*?<\/script>/gi,
      " "
    )
    .replace(
      /<style[\s\S]*?<\/style>/gi,
      " "
    )
    .replace(
      /<[^>]+>/g,
      " "
    )
    .replace(
      /&nbsp;/gi,
      " "
    )
    .replace(
      /&amp;/gi,
      "&"
    )
    .replace(
      /&lt;/gi,
      "<"
    )
    .replace(
      /&gt;/gi,
      ">"
    )
    .replace(
      /\s+/g,
      " "
    )
    .trim();
}

function makeId(
  prefix,
  value
) {
  const text =
    `${prefix}-${value || Math.random()}`
      .toLowerCase()
      .replace(
        /[^a-z0-9]+/g,
        "-"
      )
      .slice(
        0,
        100
      );

  return text;
}

function isIndiaLocation(
  value
) {
  const text =
    normalizeText(value);

  return [
    "india",
    "gujarat",
    "ahmedabad",
    "gandhinagar",
    "vadodara",
    "surat",
    "rajkot",
    "mumbai",
    "delhi",
    "bangalore",
    "bengaluru",
    "pune",
    "hyderabad",
    "chennai",
    "kolkata",
    "noida",
    "gurgaon",
    "gurugram",
    "remote",
    "worldwide",
  ].some(
    (item) =>
      text.includes(item)
  );
}

/* =========================================================
   FETCH WITH TIMEOUT
========================================================= */

async function fetchJson(
  url
) {
  const controller =
    new AbortController();

  const timeout =
    setTimeout(
      () =>
        controller.abort(),
      LIVE_FETCH_TIMEOUT_MS
    );

  try {
    const response =
      await fetch(
        url,
        {
          method: "GET",

          headers: {
            Accept:
              "application/json",

            "User-Agent":
              "SkillBridgeAI/1.0",
          },

          signal:
            controller.signal,
        }
      );

    if (
      !response.ok
    ) {
      throw new Error(
        `HTTP ${response.status}`
      );
    }

    return await response.json();
  } finally {
    clearTimeout(
      timeout
    );
  }
}

/* =========================================================
   ROLE DETECTION FOR JOBS
========================================================= */

function detectJobRole(
  title,
  description = ""
) {
  const text =
    normalizeText(
      `${title} ${description}`
    );

  let bestRole =
    "Software Engineer";

  let bestScore = 0;

  for (
    const [
      role,
      keywords,
    ] of Object.entries(
      ROLE_KEYWORDS
    )
  ) {
    let score = 0;

    for (
      const keyword of keywords
    ) {
      if (
        text.includes(
          normalizeText(
            keyword
          )
        )
      ) {
        score++;
      }
    }

    if (
      score > bestScore
    ) {
      bestScore =
        score;

      bestRole =
        role;
    }
  }

  return bestRole;
}

/* =========================================================
   JOB SKILL EXTRACTION
========================================================= */

function extractJobSkills(
  title,
  description
) {
  const text =
    normalizeText(
      `${title} ${description}`
    );

  return SKILLS
    .filter(
      (skill) =>
        text.includes(
          normalizeText(
            skill
          )
        )
    )
    .slice(
      0,
      20
    );
}

/* =========================================================
   ARBEITNOW NORMALIZATION
========================================================= */

function normalizeArbeitnowJob(
  item
) {
  if (!item) {
    return null;
  }

  const title =
    cleanText(
      item.title
    );

  if (!title) {
    return null;
  }

  const description =
    stripHtml(
      item.description
    );

  const location =
    cleanText(
      item.location ||
        "Not specified"
    );

  const company =
    cleanText(
      item.company_name ||
        item.company ||
        "Company not specified"
    );

  const tags =
    Array.isArray(
      item.tags
    )
      ? item.tags
      : [];

  const skills =
    uniqueArray([
      ...tags,
      ...extractJobSkills(
        title,
        description
      ),
    ]).slice(
      0,
      20
    );

  const role =
    detectJobRole(
      title,
      description
    );

  const remote =
    Boolean(
      item.remote
    );

  const internship =
    isInternshipCandidate(
      {
        title,
        description,
        tags,
        employmentType:
          item.job_type ||
          item.employment_type ||
          "",
      }
    );

  return {
    id: makeId(
      "arbeitnow",
      item.slug ||
        item.url ||
        `${company}-${title}`
    ),

    title,

    company,

    location:
      remote
        ? `${location} / Remote`
        : location,

    workMode:
      remote
        ? "Remote"
        : "On-site",

    experience:
      internship
        ? "Internship"
        : "Not specified",

    salary:
      cleanText(
        item.salary ||
          "Not specified"
      ),

    skills,

    description:
      description.slice(
        0,
        1000
      ),

    applyUrl:
      item.url ||
      "https://www.arbeitnow.com/",

    source:
      "Arbeitnow",

    sourceUrl:
      item.url ||
      "https://www.arbeitnow.com/",

    postedAt:
      item.created_at ||
      null,

    role,

    isInternship:
      internship,
  };
}

/* =========================================================
   REMOTIVE NORMALIZATION
========================================================= */

function normalizeRemotiveJob(
  item
) {
  if (!item) {
    return null;
  }

  const title =
    cleanText(
      item.title
    );

  if (!title) {
    return null;
  }

  const description =
    stripHtml(
      item.description
    );

  const company =
    cleanText(
      item.company_name ||
        item.company ||
        "Company not specified"
    );

  const location =
    cleanText(
      item.candidate_required_location ||
        item.job_type ||
        "Remote"
    );

  const tags =
    Array.isArray(
      item.tags
    )
      ? item.tags
      : [];

  const skills =
    uniqueArray([
      ...tags,

      ...extractJobSkills(
        title,
        description
      ),
    ]).slice(
      0,
      20
    );

  const role =
    detectJobRole(
      title,
      description
    );

  const employmentType =
    cleanText(
      item.job_type ||
        item.employment_type ||
        ""
    );

  const internship =
    isInternshipCandidate(
      {
        title,
        description,
        tags,
        employmentType,
      }
    );

  return {
    id: makeId(
      "remotive",
      item.id ||
        item.url ||
        `${company}-${title}`
    ),

    title,

    company,

    location,

    workMode:
      "Remote",

    experience:
      internship
        ? "Internship"
        : employmentType ||
          "Not specified",

    salary:
      cleanText(
        item.salary ||
          "Not specified"
      ),

    skills,

    description:
      description.slice(
        0,
        1000
      ),

    applyUrl:
      item.url ||
      "https://remotive.com/",

    source:
      "Remotive",

    sourceUrl:
      item.url ||
      "https://remotive.com/",

    postedAt:
      item.publication_date ||
      null,

    role,

    isInternship:
      internship,
  };
}

/* =========================================================
   INTERNSHIP DETECTION
========================================================= */

function isInternshipCandidate(
  {
    title = "",
    description = "",
    tags = [],
    employmentType = "",
  }
) {
  const combined =
    normalizeText(
      [
        title,
        description,
        employmentType,
        ...(Array.isArray(tags)
          ? tags
          : []),
      ].join(" ")
    );

  /*
    Strong signals
  */

  const strongSignals = [
    "internship",
    "intern",
    "trainee",
    "apprentice",
    "graduate program",
    "student program",
    "student internship",
    "summer internship",
    "winter internship",
    "co-op",
    "cooperative education",
  ];

  if (
    strongSignals.some(
      (keyword) =>
        combined.includes(
          keyword
        )
    )
  ) {
    return true;
  }

  /*
    Employment type signal.

    Remotive's public job system
    includes Internship as an
    employment type.
  */

  const employmentSignals = [
    "internship",
    "intern",
    "student",
    "trainee",
    "apprentice",
  ];

  if (
    employmentSignals.some(
      (keyword) =>
        normalizeText(
          employmentType
        ).includes(
          keyword
        )
    )
  ) {
    return true;
  }

  return false;
}

/* =========================================================
   DUPLICATE REMOVAL
========================================================= */

function dedupeJobs(
  jobs
) {
  const map =
    new Map();

  for (
    const job of jobs
  ) {
    if (!job) {
      continue;
    }

    const key =
      normalizeText(
        `${job.title}|${job.company}|${job.location}`
      );

    if (
      !map.has(key)
    ) {
      map.set(
        key,
        job
      );
    }
  }

  return [
    ...map.values(),
  ];
}

/* =========================================================
   FETCH LIVE JOBS
========================================================= */

async function fetchLiveJobs() {
  if (
    !LIVE_JOBS_ENABLED
  ) {
    return [];
  }

  const allJobs = [];

  /* =======================================================
     ARBEITNOW
  ======================================================= */

  try {
    console.log(
      "Live source: fetching Arbeitnow..."
    );

    const data =
      await fetchJson(
        ARBEITNOW_URL
      );

    const items =
      Array.isArray(
        data?.data
      )
        ? data.data
        : [];

    const normalized =
      items
        .map(
          normalizeArbeitnowJob
        )
        .filter(Boolean);

    allJobs.push(
      ...normalized
    );

    console.log(
      `Arbeitnow: ${normalized.length} jobs received.`
    );
  } catch (
    error
  ) {
    console.warn(
      "Arbeitnow unavailable:",
      error?.message
    );
  }

  /* =======================================================
     REMOTIVE
  ======================================================= */

  try {
    console.log(
      "Live source: fetching Remotive..."
    );

    const data =
      await fetchJson(
        REMOTIVE_URL
      );

    const items =
      Array.isArray(
        data?.jobs
      )
        ? data.jobs
        : [];

    const normalized =
      items
        .map(
          normalizeRemotiveJob
        )
        .filter(Boolean);

    allJobs.push(
      ...normalized
    );

    console.log(
      `Remotive: ${normalized.length} jobs received.`
    );
  } catch (
    error
  ) {
    console.warn(
      "Remotive unavailable:",
      error?.message
    );
  }

  const unique =
    dedupeJobs(
      allJobs
    );

  return unique.slice(
    0,
    MAX_LIVE_RESULTS
  );
}

/* =========================================================
   EXISTING LOCAL JOB SYSTEM
========================================================= */

/*
  IMPORTANT

  KEEP YOUR EXISTING 201 JOB ARRAY HERE.

  The code supplied in the current message contains only
  10 local jobs, so those 10 are preserved below.

  If your actual project file contains the complete 201-job
  array, replace ONLY this array with that existing array.

  Do NOT delete your 201 records.
*/

const LOCAL_JOBS = [
  {
    id: "local-job-001",
    title: "Frontend Developer",
    company: "SkillBridge Demo Company",
    location: "Ahmedabad, Gujarat",
    workMode: "Hybrid",
    experience: "Fresher",
    salary: "₹3 - ₹6 LPA",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Git",
    ],
    description:
      "Frontend development opportunity for candidates building modern responsive web applications.",
    applyUrl:
      "https://www.linkedin.com/jobs/",
    source:
      "SkillBridge AI Demo",
    sourceUrl:
      "https://www.linkedin.com/jobs/",
    role:
      "Frontend Developer",
    isInternship:
      false,
  },

  {
    id: "local-job-002",
    title: "React Developer",
    company: "SkillBridge Demo Company",
    location: "Ahmedabad, Gujarat",
    workMode: "Remote",
    experience: "Fresher",
    salary: "₹3 - ₹7 LPA",
    skills: [
      "React",
      "JavaScript",
      "HTML",
      "CSS",
      "Git",
    ],
    description:
      "React development opportunity focused on reusable UI components and responsive applications.",
    applyUrl:
      "https://www.linkedin.com/jobs/",
    source:
      "SkillBridge AI Demo",
    sourceUrl:
      "https://www.linkedin.com/jobs/",
    role:
      "Frontend Developer",
    isInternship:
      false,
  },

  {
    id: "local-job-003",
    title: "Software Developer",
    company: "SkillBridge Demo Company",
    location: "Gandhinagar, Gujarat",
    workMode: "On-site",
    experience: "0-2 Years",
    salary: "₹4 - ₹8 LPA",
    skills: [
      "Java",
      "Python",
      "SQL",
      "Git",
    ],
    description:
      "Software development opportunity involving programming, databases and application development.",
    applyUrl:
      "https://www.linkedin.com/jobs/",
    source:
      "SkillBridge AI Demo",
    sourceUrl:
      "https://www.linkedin.com/jobs/",
    role:
      "Software Engineer",
    isInternship:
      false,
  },

  {
    id: "local-job-004",
    title: "Python Developer",
    company: "SkillBridge Demo Company",
    location: "Vadodara, Gujarat",
    workMode: "Hybrid",
    experience: "Fresher",
    salary: "₹3 - ₹7 LPA",
    skills: [
      "Python",
      "SQL",
      "Git",
      "API",
    ],
    description:
      "Python development opportunity involving applications, automation and APIs.",
    applyUrl:
      "https://www.linkedin.com/jobs/",
    source:
      "SkillBridge AI Demo",
    sourceUrl:
      "https://www.linkedin.com/jobs/",
    role:
      "Software Engineer",
    isInternship:
      false,
  },

  {
    id: "local-job-005",
    title: "Data Analyst",
    company: "SkillBridge Demo Company",
    location: "Ahmedabad, Gujarat",
    workMode: "Remote",
    experience: "0-2 Years",
    salary: "₹4 - ₹8 LPA",
    skills: [
      "Excel",
      "SQL",
      "Python",
      "Power BI",
    ],
    description:
      "Data analysis opportunity involving reporting, dashboards and business insights.",
    applyUrl:
      "https://www.linkedin.com/jobs/",
    source:
      "SkillBridge AI Demo",
    sourceUrl:
      "https://www.linkedin.com/jobs/",
    role:
      "Data Analyst",
    isInternship:
      false,
  },

  {
    id: "local-job-006",
    title: "UI/UX Designer",
    company: "SkillBridge Demo Company",
    location: "Ahmedabad, Gujarat",
    workMode: "Remote",
    experience: "Fresher",
    salary: "₹3 - ₹6 LPA",
    skills: [
      "Figma",
      "UI/UX",
      "Wireframing",
      "Prototyping",
    ],
    description:
      "UI/UX opportunity focused on interface design, prototyping and user experience.",
    applyUrl:
      "https://www.linkedin.com/jobs/",
    source:
      "SkillBridge AI Demo",
    sourceUrl:
      "https://www.linkedin.com/jobs/",
    role:
      "UI/UX Designer",
    isInternship:
      false,
  },

  {
    id: "local-job-007",
    title: "Backend Developer",
    company: "SkillBridge Demo Company",
    location: "Surat, Gujarat",
    workMode: "On-site",
    experience: "0-2 Years",
    salary: "₹4 - ₹8 LPA",
    skills: [
      "Node.js",
      "Express",
      "SQL",
      "REST API",
    ],
    description:
      "Backend development opportunity involving APIs, services and databases.",
    applyUrl:
      "https://www.linkedin.com/jobs/",
    source:
      "SkillBridge AI Demo",
    sourceUrl:
      "https://www.linkedin.com/jobs/",
    role:
      "Backend Developer",
    isInternship:
      false,
  },

  {
    id: "local-job-008",
    title: "Cybersecurity Analyst",
    company: "SkillBridge Demo Company",
    location: "Gandhinagar, Gujarat",
    workMode: "Hybrid",
    experience: "Fresher",
    salary: "₹4 - ₹8 LPA",
    skills: [
      "Cybersecurity",
      "Linux",
      "Network Security",
      "Ethical Hacking",
    ],
    description:
      "Cybersecurity opportunity involving security monitoring and network security.",
    applyUrl:
      "https://www.linkedin.com/jobs/",
    source:
      "SkillBridge AI Demo",
    sourceUrl:
      "https://www.linkedin.com/jobs/",
    role:
      "Cybersecurity Analyst",
    isInternship:
      false,
  },

  {
    id: "local-job-009",
    title: "Full Stack Developer",
    company: "SkillBridge Demo Company",
    location: "Ahmedabad, Gujarat",
    workMode: "Hybrid",
    experience: "0-2 Years",
    salary: "₹5 - ₹10 LPA",
    skills: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Git",
    ],
    description:
      "Full-stack development opportunity using React, Node.js, APIs and databases.",
    applyUrl:
      "https://www.linkedin.com/jobs/",
    source:
      "SkillBridge AI Demo",
    sourceUrl:
      "https://www.linkedin.com/jobs/",
    role:
      "Full-Stack Developer",
    isInternship:
      false,
  },

  {
    id: "local-job-010",
    title: "Machine Learning Engineer",
    company: "SkillBridge Demo Company",
    location: "Ahmedabad, Gujarat",
    workMode: "Remote",
    experience: "0-2 Years",
    salary: "₹5 - ₹12 LPA",
    skills: [
      "Python",
      "Machine Learning",
      "Pandas",
      "NumPy",
    ],
    description:
      "Machine learning opportunity involving Python, data processing and ML models.",
    applyUrl:
      "https://www.linkedin.com/jobs/",
    source:
      "SkillBridge AI Demo",
    sourceUrl:
      "https://www.linkedin.com/jobs/",
    role:
      "ML Engineer",
    isInternship:
      false,
  },
];

/* =========================================================
   LOCAL INTERNSHIPS
========================================================= */

/*
  These are fallback internships.

  They are NOT presented as real live company listings.
*/

const LOCAL_INTERNSHIPS =
  LOCAL_JOBS.map(
    (
      job,
      index
    ) => ({
      ...job,

      id:
        `local-internship-${index + 1}`,

      title:
        `${job.title} Intern`,

      duration:
        "3 Months",

      salary:
        "Stipend depends on company",

      whoCanApply: [
        "Students",
        "Freshers",
        "Graduates",
      ],

      description:
        `Demo fallback internship related to ${job.title}. ${job.description}`,

      source:
        "SkillBridge AI Demo",

      sourceUrl:
        job.applyUrl,

      isInternship:
        true,
    })
  );

/* =========================================================
   REFRESH LIVE DATA
========================================================= */

async function refreshLiveData(
  force = false
) {
  if (
    !LIVE_JOBS_ENABLED
  ) {
    return;
  }

  const now =
    Date.now();

  const cacheValid =
    liveCache.jobs.length >
      0 &&
    now -
      liveCache.jobsFetchedAt <
      LIVE_CACHE_TTL_MS;

  if (
    cacheValid &&
    !force
  ) {
    return;
  }

  if (
    liveCache.jobsRefreshing
  ) {
    return;
  }

  liveCache.jobsRefreshing =
    true;

  try {
    console.log(
      "=================================================="
    );

    console.log(
      " Refreshing live job + internship data..."
    );

    console.log(
      "=================================================="
    );

    const jobs =
      await fetchLiveJobs();

    if (
      jobs.length > 0
    ) {
      liveCache.jobs =
        jobs;

      /*
        IMPORTANT:

        Internship records are extracted from the same
        normalized live feed.

        Only records detected as internships enter this cache.
      */

      liveCache.internships =
        jobs.filter(
          (job) =>
            job?.isInternship ===
            true
        );

      liveCache.jobsFetchedAt =
        Date.now();

      liveCache.internshipsFetchedAt =
        Date.now();

      console.log(
        `Live jobs cached: ${liveCache.jobs.length}`
      );

      console.log(
        `Live internships cached: ${liveCache.internships.length}`
      );
    } else {
      console.log(
        "No live listings received. Existing cache/fallback remains active."
      );
    }
  } catch (
    error
  ) {
    console.error(
      "Live data refresh failed:",
      error?.message
    );
  } finally {
    liveCache.jobsRefreshing =
      false;
  }
}

/* =========================================================
   FILTER JOB LIST
========================================================= */

function filterJobList({
  jobs,
  role,
  location,
  workMode,
  search,
}) {
  let results =
    Array.isArray(jobs)
      ? [...jobs]
      : [];

  /* =======================================================
     ROLE
  ======================================================= */

  if (
    role &&
    role !== "All Roles"
  ) {
    const roleText =
      normalizeText(role);

    results =
      results.filter(
        (job) =>
          normalizeText(
            job.role
          ).includes(
            roleText
          ) ||
          normalizeText(
            job.title
          ).includes(
            roleText
          ) ||
          normalizeText(
            job.description
          ).includes(
            roleText
          ) ||
          (
            Array.isArray(
              job.skills
            ) &&
            job.skills.some(
              (
                skill
              ) =>
                normalizeText(
                  skill
                ).includes(
                  roleText
                )
            )
          )
      );
  }

  /* =======================================================
     LOCATION
  ======================================================= */

  if (
    location &&
    location !== "All India"
  ) {
    const locationText =
      normalizeText(
        location
      );

    results =
      results.filter(
        (job) => {
          const jobLocation =
            normalizeText(
              job.location
            );

          const jobMode =
            normalizeText(
              job.workMode
            );

          if (
            locationText ===
            "remote"
          ) {
            return (
              jobMode ===
                "remote" ||
              jobLocation.includes(
                "remote"
              )
            );
          }

          if (
            locationText ===
            "gujarat"
          ) {
            return (
              jobLocation.includes(
                "gujarat"
              ) ||
              jobLocation.includes(
                "ahmedabad"
              ) ||
              jobLocation.includes(
                "gandhinagar"
              ) ||
              jobLocation.includes(
                "vadodara"
              ) ||
              jobLocation.includes(
                "surat"
              ) ||
              jobMode ===
                "remote"
            );
          }

          if (
            locationText ===
            "india"
          ) {
            return (
              isIndiaLocation(
                job.location
              ) ||
              jobMode ===
                "remote"
            );
          }

          return jobLocation.includes(
            locationText
          );
        }
      );
  }

  /* =======================================================
     WORK MODE
  ======================================================= */

  if (
    workMode &&
    workMode !== "All"
  ) {
    results =
      results.filter(
        (job) =>
          normalizeText(
            job.workMode
          ) ===
          normalizeText(
            workMode
          )
      );
  }

  /* =======================================================
     SEARCH
  ======================================================= */

  if (
    search &&
    String(
      search
    ).trim()
  ) {
    const searchText =
      normalizeText(
        search
      );

    results =
      results.filter(
        (job) => {
          const skills =
            Array.isArray(
              job.skills
            )
              ? job.skills
              : [];

          return (
            normalizeText(
              job.title
            ).includes(
              searchText
            ) ||
            normalizeText(
              job.company
            ).includes(
              searchText
            ) ||
            normalizeText(
              job.location
            ).includes(
              searchText
            ) ||
            normalizeText(
              job.description
            ).includes(
              searchText
            ) ||
            normalizeText(
              job.role
            ).includes(
              searchText
            ) ||
            skills.some(
              (
                skill
              ) =>
                normalizeText(
                  skill
                ).includes(
                  searchText
                )
            )
          );
        }
      );
  }

  return results;
}

/* =========================================================
   RESUME TEXT EXTRACTION
========================================================= */

async function extractResumeText(
  file
) {
  if (
    !file ||
    !file.buffer
  ) {
    throw new Error(
      "No resume file received."
    );
  }

  const mimetype =
    file.mimetype ||
    "";

  /* =======================================================
     PDF
  ======================================================= */

  if (
    mimetype ===
    "application/pdf"
  ) {
    const parser =
      new PDFParse({
        data:
          file.buffer,
      });

    try {
      const result =
        await parser.getText();

      return cleanText(
        result?.text ||
          ""
      );
    } finally {
      if (
        parser &&
        typeof parser.destroy ===
          "function"
      ) {
        await parser.destroy();
      }
    }
  }

  /* =======================================================
     DOCX
  ======================================================= */

  if (
    mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result =
      await mammoth.extractRawText(
        {
          buffer:
            file.buffer,
        }
      );

    return cleanText(
      result?.value ||
        ""
    );
  }

  /* =======================================================
     TXT
  ======================================================= */

  if (
    mimetype ===
    "text/plain"
  ) {
    return cleanText(
      file.buffer.toString(
        "utf8"
      )
    );
  }

  throw new Error(
    "Unsupported resume format."
  );
}

/* =========================================================
   FIELD DETECTION
========================================================= */

function detectField(
  text
) {
  const normalized =
    normalizeText(text);

  const scores = {};

  for (
    const [
      field,
      keywords,
    ] of Object.entries(
      FIELD_KEYWORDS
    )
  ) {
    let score = 0;

    for (
      const keyword of keywords
    ) {
      if (
        normalized.includes(
          keyword.toLowerCase()
        )
      ) {
        score++;
      }
    }

    scores[field] =
      score;
  }

  const sorted =
    Object.entries(
      scores
    ).sort(
      (
        a,
        b
      ) =>
        b[1] -
        a[1]
    );

  const best =
    sorted[0];

  if (
    !best ||
    best[1] === 0
  ) {
    return {
      field:
        "Computer / IT",

      confidence:
        35,
    };
  }

  const second =
    sorted[1]?.[1] ||
    0;

  const confidence =
    Math.min(
      98,
      Math.max(
        50,
        60 +
          best[1] *
            5 -
          second *
            2
      )
    );

  return {
    field:
      best[0],

    confidence,
  };
}

/* =========================================================
   ROLE DETECTION
========================================================= */

function detectRole(
  text,
  careerGoal = ""
) {
  const normalized =
    normalizeText(text);

  const requested =
    normalizeText(
      careerGoal
    );

  if (
    careerGoal
  ) {
    const exactRole =
      ROLES.find(
        (
          role
        ) =>
          normalizeText(
            role
          ) ===
          requested
      );

    if (
      exactRole
    ) {
      return {
        role:
          exactRole,

        confidence:
          95,

        detectedRole:
          exactRole,
      };
    }

    const partialRole =
      ROLES.find(
        (
          role
        ) =>
          requested.includes(
            normalizeText(
              role
            )
          ) ||
          normalizeText(
            role
          ).includes(
            requested
          )
      );

    if (
      partialRole
    ) {
      return {
        role:
          partialRole,

        confidence:
          90,

        detectedRole:
          partialRole,
      };
    }
  }

  let bestRole =
    "Software Engineer";

  let bestScore =
    0;

  for (
    const [
      role,
      keywords,
    ] of Object.entries(
      ROLE_KEYWORDS
    )
  ) {
    let score = 0;

    for (
      const keyword of keywords
    ) {
      if (
        normalized.includes(
          keyword.toLowerCase()
        )
      ) {
        score++;
      }
    }

    if (
      score > bestScore
    ) {
      bestScore =
        score;

      bestRole =
        role;
    }
  }

  const confidence =
    bestScore === 0
      ? 40
      : Math.min(
          96,
          55 +
            bestScore *
              7
        );

  return {
    role:
      bestRole,

    confidence,

    detectedRole:
      bestRole,
  };
}

/* =========================================================
   SKILL DETECTION
========================================================= */

function detectSkills(
  text
) {
  const normalized =
    normalizeText(text);

  const found = [];

  for (
    const skill of SKILLS
  ) {
    if (
      normalized.includes(
        skill.toLowerCase()
      )
    ) {
      found.push(
        skill
      );
    }
  }

  return uniqueArray(
    found
  );
}

/* =========================================================
   SCORE CALCULATION
========================================================= */

function calculateScores({
  text,
  role,
}) {
  const normalized =
    normalizeText(text);

  const wordCount =
    normalized
      .split(
        /\s+/
      )
      .filter(
        Boolean
      ).length;

  const required =
    ROLE_REQUIRED_SKILLS[
      role
    ] ||
    ROLE_REQUIRED_SKILLS[
      "Software Engineer"
    ];

  const matchedRequired =
    required.filter(
      (
        skill
      ) =>
        normalized.includes(
          skill.toLowerCase()
        )
    );

  const technicalSkillsScore =
    Math.min(
      100,
      Math.round(
        (
          matchedRequired.length /
          Math.max(
            required.length,
            1
          )
        ) *
          100
      )
    );

  const atsFactors = [
    normalized.includes(
      "experience"
    ),

    normalized.includes(
      "education"
    ),

    normalized.includes(
      "skills"
    ),

    normalized.includes(
      "project"
    ),

    normalized.includes(
      "github"
    ),

    normalized.includes(
      "linkedin"
    ),

    wordCount >=
      150,

    wordCount >=
      300,
  ];

  const atsScore =
    Math.min(
      100,
      45 +
        atsFactors.filter(
          Boolean
        ).length *
          7
    );

  const resumeScore =
    Math.min(
      100,
      Math.round(
        atsScore *
          0.45 +
          technicalSkillsScore *
          0.4 +
          Math.min(
            100,
            wordCount / 4
          ) *
          0.15
      )
    );

  const placementProbability =
    Math.min(
      99,
      Math.max(
        5,
        Math.round(
          resumeScore *
            0.55 +
            technicalSkillsScore *
            0.45
        )
      )
    );

  return {
    atsScore,

    resumeScore,

    technicalSkillsScore,

    placementProbability,
  };
}

/* =========================================================
   ANALYZE RESUME
========================================================= */

function analyzeResume(
  resumeText,
  careerGoal
) {
  const text =
    cleanText(
      resumeText
    );

  const fieldInfo =
    detectField(
      text
    );

  const roleInfo =
    detectRole(
      text,
      careerGoal
    );

  const skills =
    detectSkills(
      text
    );

  const role =
    roleInfo.role;

  const required =
    ROLE_REQUIRED_SKILLS[
      role
    ] || [];

  const normalized =
    normalizeText(
      text
    );

  const missingSkills =
    required.filter(
      (
        skill
      ) =>
        !normalized.includes(
          skill.toLowerCase()
        )
    );

  const scores =
    calculateScores({
      text,
      role,
    });

  const strengths = [];

  if (
    skills.length >= 5
  ) {
    strengths.push(
      "Good technical skill coverage"
    );
  }

  if (
    normalized.includes(
      "project"
    )
  ) {
    strengths.push(
      "Projects are mentioned in the resume"
    );
  }

  if (
    normalized.includes(
      "education"
    )
  ) {
    strengths.push(
      "Education information is available"
    );
  }

  if (
    normalized.includes(
      "experience"
    )
  ) {
    strengths.push(
      "Experience information is included"
    );
  }

  if (
    strengths.length ===
    0
  ) {
    strengths.push(
      "Resume contains a foundation that can be improved"
    );
  }

  const areasToImprove =
    [];

  if (
    scores.atsScore <
    70
  ) {
    areasToImprove.push(
      "Improve ATS-friendly resume structure and keyword usage"
    );
  }

  if (
    missingSkills.length >
    0
  ) {
    areasToImprove.push(
      `Develop missing skills for ${role}`
    );
  }

  if (
    !normalized.includes(
      "project"
    )
  ) {
    areasToImprove.push(
      "Add relevant projects with measurable outcomes"
    );
  }

  if (
    !normalized.includes(
      "github"
    )
  ) {
    areasToImprove.push(
      "Add a GitHub or portfolio link"
    );
  }

  if (
    areasToImprove.length ===
    0
  ) {
    areasToImprove.push(
      "Continue improving measurable achievements and role-specific keywords"
    );
  }

  const recommendations =
    missingSkills
      .slice(
        0,
        6
      )
      .map(
        (
          skill
        ) =>
          `Learn and practice ${skill}`
      );

  recommendations.push(
    "Build at least one practical project related to your target role"
  );

  recommendations.push(
    "Keep your resume concise, structured and ATS-friendly"
  );

  const summary =
    `Your resume is currently aligned with the ${role} career path. ` +
    `You have ${skills.length} detected skills. ` +
    `Your current resume score is ${scores.resumeScore}/100. ` +
    `Focus on the missing skills and practical projects to improve your career readiness.`;

  return {
    field:
      fieldInfo.field,

    fieldConfidence:
      fieldInfo.confidence,

    careerGoal:
      role,

    roleConfidence:
      roleInfo.confidence,

    detectedRole:
      roleInfo.detectedRole,

    atsScore:
      scores.atsScore,

    resumeScore:
      scores.resumeScore,

    technicalSkillsScore:
      scores.technicalSkillsScore,

    placementProbability:
      scores.placementProbability,

    summary,

    strengths,

    areasToImprove,

    skillsFound:
      skills,

    missingSkills,

    recommendations,
  };
}

/* =========================================================
   HEALTH
========================================================= */

app.get(
  "/",
  (
    req,
    res
  ) => {
    res.status(200)
      .json({
        success:
          true,

        message:
          "SkillBridge AI Backend Server is running.",

        version:
          "5.0.0",

        server:
          "online",

        liveJobs:
          LIVE_JOBS_ENABLED,

        apify:
          "DISABLED",

        liveSources: [
          "Arbeitnow",
          "Remotive",
        ],

        cacheMinutes:
          Math.round(
            LIVE_CACHE_TTL_MS /
              60000
          ),

        endpoints: [
          "/",
          "/api/fields",
          "/api/analyze-resume",
          "/api/jobs",
          "/api/jobs/all",
          "/api/internships",
          "/api/internships/all",
          "/api/jobs/refresh",
          "/api/live/status",
        ],
      });
  }
);

/* =========================================================
   FIELDS
========================================================= */

app.get(
  "/api/fields",
  (
    req,
    res
  ) => {
    res.status(200)
      .json({
        success:
          true,

        fields:
          Object.keys(
            FIELD_KEYWORDS
          ),

        roles:
          ROLES,

        skills:
          SKILLS,
      });
  }
);

/* =========================================================
   RESUME ANALYZER
========================================================= */

app.post(
  "/api/analyze-resume",

  upload.single(
    "resume"
  ),

  async (
    req,
    res
  ) => {
    try {
      console.log(
        "Resume analysis request received."
      );

      if (
        !req.file
      ) {
        return res
          .status(400)
          .json({
            success:
              false,

            message:
              "No resume file uploaded. Please select a PDF, DOCX or TXT resume.",
          });
      }

      console.log(
        "Resume:",
        req.file
          .originalname
      );

      const resumeText =
        await extractResumeText(
          req.file
        );

      if (
        !resumeText ||
        resumeText
          .trim()
          .length <
          50
      ) {
        return res
          .status(400)
          .json({
            success:
              false,

            message:
              "Unable to extract enough text from the resume. Please upload a text-based PDF, DOCX or TXT resume.",
          });
      }

      const careerGoal =
        typeof req.body
          ?.careerGoal ===
        "string"
          ? req.body
              .careerGoal
              .trim()
          : "";

      const analysis =
        analyzeResume(
          resumeText,
          careerGoal
        );

      return res
        .status(200)
        .json({
          success:
            true,

          message:
            "Resume analyzed successfully.",

          analysis,

          field:
            analysis.field,

          fieldConfidence:
            analysis.fieldConfidence,

          atsScore:
            analysis.atsScore,

          resumeScore:
            analysis.resumeScore,

          technicalSkillsScore:
            analysis.technicalSkillsScore,

          placementProbability:
            analysis.placementProbability,

          careerRole:
            analysis.careerGoal,

          roleConfidence:
            analysis.roleConfidence,

          detectedRole:
            analysis.detectedRole,

          aiSummary:
            analysis.summary,

          summary:
            analysis.summary,

          strengths:
            analysis.strengths,

          areasToImprove:
            analysis.areasToImprove,

          skillsFound:
            analysis.skillsFound,

          missingSkills:
            analysis.missingSkills,

          recommendations:
            analysis.recommendations,
        });
    } catch (
      error
    ) {
      console.error(
        "Resume analysis error:",
        error
      );

      return res
        .status(500)
        .json({
          success:
            false,

          message:
            "Unable to analyze resume.",

          error:
            error?.message ||
            "Unknown server error.",
        });
    }
  }
);

/* =========================================================
   JOBS
========================================================= */

app.get(
  "/api/jobs",
  async (
    req,
    res
  ) => {
    try {
      await refreshLiveData(
        false
      );

      const {
        role,
        location,
        workMode,
        search,
      } =
        req.query;

      /*
        LIVE FIRST
        FALLBACK SECOND
      */

      const combined =
        dedupeJobs([
          ...liveCache.jobs,
          ...LOCAL_JOBS,
        ]);

      const results =
        filterJobList({
          jobs:
            combined,

          role,

          location,

          workMode,

          search,
        });

      const liveCount =
        results.filter(
          (
            job
          ) =>
            job.source !==
            "SkillBridge AI Demo"
        ).length;

      const fallbackCount =
        results.length -
        liveCount;

      return res
        .status(200)
        .json({
          success:
            true,

          source:
            liveCount > 0
              ? "live+fallback"
              : "fallback",

          live:
            liveCount,

          fallback:
            fallbackCount,

          count:
            results.length,

          jobs:
            results,
        });
    } catch (
      error
    ) {
      console.error(
        "Jobs API error:",
        error
      );

      const results =
        filterJobList({
          jobs:
            LOCAL_JOBS,

          role:
            req.query
              .role,

          location:
            req.query
              .location,

          workMode:
            req.query
              .workMode,

          search:
            req.query
              .search,
        });

      return res
        .status(200)
        .json({
          success:
            true,

          source:
            "fallback",

          live:
            0,

          fallback:
            results.length,

          count:
            results.length,

          jobs:
            results,

          message:
            "Live job sources are temporarily unavailable. Showing fallback listings.",
        });
    }
  }
);

/* =========================================================
   ALL JOBS
========================================================= */

app.get(
  "/api/jobs/all",
  async (
    req,
    res
  ) => {
    try {
      await refreshLiveData(
        false
      );

      const jobs =
        dedupeJobs([
          ...liveCache.jobs,
          ...LOCAL_JOBS,
        ]);

      return res
        .status(200)
        .json({
          success:
            true,

          source:
            liveCache.jobs
              .length >
            0
              ? "live+fallback"
              : "fallback",

          live:
            liveCache.jobs
              .length,

          fallback:
            LOCAL_JOBS.length,

          count:
            jobs.length,

          jobs,
        });
    } catch (
      error
    ) {
      console.error(
        "All Jobs API error:",
        error
      );

      return res
        .status(200)
        .json({
          success:
            true,

          source:
            "fallback",

          live:
            0,

          fallback:
            LOCAL_JOBS.length,

          count:
            LOCAL_JOBS.length,

          jobs:
            LOCAL_JOBS,
        });
    }
  }
);

/* =========================================================
   INTERNSHIPS
========================================================= */

app.get(
  "/api/internships",
  async (
    req,
    res
  ) => {
    try {
      await refreshLiveData(
        false
      );

      const {
        role,
        location,
        workMode,
        search,
      } =
        req.query;

      /*
        REAL LIVE INTERNSHIPS
        FIRST

        FALLBACK INTERNSHIPS
        SECOND
      */

      const liveInternships =
        Array.isArray(
          liveCache.internships
        )
          ? liveCache.internships
          : [];

      const combined =
        dedupeJobs([
          ...liveInternships,
          ...LOCAL_INTERNSHIPS,
        ]);

      const results =
        filterJobList({
          jobs:
            combined,

          role,

          location,

          workMode,

          search,
        });

      const liveCount =
        results.filter(
          (
            item
          ) =>
            item.source !==
            "SkillBridge AI Demo"
        ).length;

      const fallbackCount =
        results.length -
        liveCount;

      return res
        .status(200)
        .json({
          success:
            true,

          source:
            liveCount > 0
              ? "live+fallback"
              : "fallback",

          live:
            liveCount,

          fallback:
            fallbackCount,

          count:
            results.length,

          internships:
            results,
        });
    } catch (
      error
    ) {
      console.error(
        "Internship API error:",
        error
      );

      const results =
        filterJobList({
          jobs:
            LOCAL_INTERNSHIPS,

          role:
            req.query
              .role,

          location:
            req.query
              .location,

          workMode:
            req.query
              .workMode,

          search:
            req.query
              .search,
        });

      return res
        .status(200)
        .json({
          success:
            true,

          source:
            "fallback",

          live:
            0,

          fallback:
            results.length,

          count:
            results.length,

          internships:
            results,

          message:
            "Live internship sources are temporarily unavailable. Showing fallback internships.",
        });
    }
  }
);

/* =========================================================
   ALL INTERNSHIPS
========================================================= */

app.get(
  "/api/internships/all",
  async (
    req,
    res
  ) => {
    try {
      await refreshLiveData(
        false
      );

      const internships =
        dedupeJobs([
          ...liveCache.internships,
          ...LOCAL_INTERNSHIPS,
        ]);

      return res
        .status(200)
        .json({
          success:
            true,

          source:
            liveCache
              .internships
              .length >
            0
              ? "live+fallback"
              : "fallback",

          live:
            liveCache
              .internships
              .length,

          fallback:
            LOCAL_INTERNSHIPS.length,

          count:
            internships.length,

          internships,
        });
    } catch (
      error
    ) {
      console.error(
        "All Internships API error:",
        error
      );

      return res
        .status(200)
        .json({
          success:
            true,

          source:
            "fallback",

          live:
            0,

          fallback:
            LOCAL_INTERNSHIPS.length,

          count:
            LOCAL_INTERNSHIPS.length,

          internships:
            LOCAL_INTERNSHIPS,
        });
    }
  }
);

/* =========================================================
   MANUAL LIVE REFRESH
========================================================= */

app.post(
  "/api/jobs/refresh",
  async (
    req,
    res
  ) => {
    try {
      await refreshLiveData(
        true
      );

      return res
        .status(200)
        .json({
          success:
            true,

          liveJobs:
            liveCache.jobs
              .length,

          liveInternships:
            liveCache
              .internships
              .length,

          fallbackJobs:
            LOCAL_JOBS.length,

          fallbackInternships:
            LOCAL_INTERNSHIPS.length,

          fetchedAt:
            liveCache
              .jobsFetchedAt
              ? new Date(
                  liveCache
                    .jobsFetchedAt
                ).toISOString()
              : null,

          message:
            "Live jobs and internships refreshed successfully.",
        });
    } catch (
      error
    ) {
      console.error(
        "Manual refresh error:",
        error
      );

      return res
        .status(200)
        .json({
          success:
            false,

          message:
            "Live refresh failed. Existing cached/fallback data remains available.",

          error:
            error?.message ||
            "Unknown error.",
        });
    }
  }
);

/* =========================================================
   LIVE STATUS
========================================================= */

app.get(
  "/api/live/status",
  (
    req,
    res
  ) => {
    const jobsAge =
      liveCache.jobsFetchedAt
        ? Date.now() -
          liveCache.jobsFetchedAt
        : null;

    const cacheValid =
      jobsAge !== null &&
      jobsAge <
        LIVE_CACHE_TTL_MS;

    res
      .status(200)
      .json({
        success:
          true,

        liveEnabled:
          LIVE_JOBS_ENABLED,

        apify:
          "DISABLED",

        sources: [
          {
            name:
              "Arbeitnow",

            enabled:
              LIVE_JOBS_ENABLED,

            url:
              ARBEITNOW_URL,
          },

          {
            name:
              "Remotive",

            enabled:
              LIVE_JOBS_ENABLED,

            url:
              REMOTIVE_URL,
          },
        ],

        liveJobs:
          liveCache
            .jobs
            .length,

        liveInternships:
          liveCache
            .internships
            .length,

        fallbackJobs:
          LOCAL_JOBS.length,

        fallbackInternships:
          LOCAL_INTERNSHIPS.length,

        cacheValid,

        cacheAgeMinutes:
          jobsAge === null
            ? null
            : Math.round(
                jobsAge /
                  60000
              ),

        cacheTtlMinutes:
          Math.round(
            LIVE_CACHE_TTL_MS /
              60000
          ),

        lastRefresh:
          liveCache
            .jobsFetchedAt
            ? new Date(
                liveCache
                  .jobsFetchedAt
              ).toISOString()
            : null,
      });
  }
);

/* =========================================================
   404
========================================================= */

app.use(
  (
    req,
    res
  ) => {
    res
      .status(404)
      .json({
        success:
          false,

        message:
          `Route not found: ${req.method} ${req.originalUrl}`,
      });
  }
);

/* =========================================================
   ERROR HANDLER
========================================================= */

app.use(
  (
    error,
    req,
    res,
    next
  ) => {
    console.error(
      "Express error:",
      error
    );

    if (
      error instanceof
      multer.MulterError
    ) {
      if (
        error.code ===
        "LIMIT_FILE_SIZE"
      ) {
        return res
          .status(400)
          .json({
            success:
              false,

            message:
              "Resume file is too large. Maximum allowed size is 10 MB.",
          });
      }

      return res
        .status(400)
        .json({
          success:
            false,

          message:
            error.message,
        });
    }

    return res
      .status(500)
      .json({
        success:
          false,

        message:
          error?.message ||
          "Internal server error.",
      });
  }
);

/* =========================================================
   START SERVER
========================================================= */

const server =
  app.listen(
    PORT,
    "0.0.0.0",
    async () => {
      console.log("");

      console.log(
        "=================================================="
      );

      console.log(
        " SkillBridge AI - Backend Server"
      );

      console.log(
        "=================================================="
      );

      console.log(
        `Server       : http://localhost:${PORT}`
      );

      console.log(
        `Health       : http://localhost:${PORT}/`
      );

      console.log(
        `Fields       : http://localhost:${PORT}/api/fields`
      );

      console.log(
        `Resume       : http://localhost:${PORT}/api/analyze-resume`
      );

      console.log(
        `Jobs         : http://localhost:${PORT}/api/jobs`
      );

      console.log(
        `All Jobs     : http://localhost:${PORT}/api/jobs/all`
      );

      console.log(
        `Internships  : http://localhost:${PORT}/api/internships`
      );

      console.log(
        `All Intern.  : http://localhost:${PORT}/api/internships/all`
      );

      console.log(
        `Live Status  : http://localhost:${PORT}/api/live/status`
      );

      console.log(
        `Refresh      : POST http://localhost:${PORT}/api/jobs/refresh`
      );

      console.log(
        "=================================================="
      );

      console.log(
        `Live Jobs    : ${
          LIVE_JOBS_ENABLED
            ? "ENABLED"
            : "DISABLED"
        }`
      );

      console.log(
        "Apify        : DISABLED"
      );

      console.log(
        "Sources      : Arbeitnow + Remotive"
      );

      console.log(
        `Cache        : ${Math.round(
          LIVE_CACHE_TTL_MS /
            60000
        )} minutes`
      );

      console.log(
        `Fallback Jobs: ${LOCAL_JOBS.length}`
      );

      console.log(
        `Fallback Int.: ${LOCAL_INTERNSHIPS.length}`
      );

      console.log(
        "=================================================="
      );

      console.log("");

      /*
        Warm cache.

        Failure here NEVER prevents
        the server from starting.
      */

      try {
        await refreshLiveData(
          true
        );
      } catch (
        error
      ) {
        console.warn(
          "Initial live refresh failed. Server will continue with fallback data.",
          error?.message
        );
      }

      console.log("");

      console.log(
        "SkillBridge AI backend is READY."
      );

      console.log("");
    }
  );

/* =========================================================
   SERVER ERROR
========================================================= */

server.on(
  "error",
  (
    error
  ) => {
    console.error("");

    console.error(
      "=================================================="
    );

    console.error(
      " SERVER ERROR"
    );

    console.error(
      "=================================================="
    );

    console.error(
      error
    );

    console.error(
      "=================================================="
    );

    if (
      error.code ===
      "EADDRINUSE"
    ) {
      console.error(
        `Port ${PORT} is already being used.`
      );

      console.error(
        "Close the other Node server and run again."
      );
    }
  }
);

/* =========================================================
   GLOBAL ERROR PROTECTION
========================================================= */

process.on(
  "uncaughtException",
  (
    error
  ) => {
    console.error(
      "UNCAUGHT EXCEPTION:",
      error
    );

    /*
      Intentionally do not terminate.

      Non-critical errors should not
      take down the SkillBridge backend.
    */
  }
);

process.on(
  "unhandledRejection",
  (
    reason
  ) => {
    console.error(
      "UNHANDLED PROMISE REJECTION:",
      reason
    );

    /*
      Intentionally do not terminate.
    */
  }
);

/* =========================================================
   GRACEFUL SHUTDOWN
========================================================= */

function shutdown(
  signal
) {
  console.log("");

  console.log(
    `${signal} received.`
  );

  console.log(
    "Shutting down SkillBridge AI backend..."
  );

  server.close(
    () => {
      console.log(
        "Server closed successfully."
      );

      process.exit(0);
    }
  );

  setTimeout(
    () => {
      console.error(
        "Forced shutdown."
      );

      process.exit(1);
    },
    5000
  ).unref();
}

process.on(
  "SIGINT",
  () =>
    shutdown(
      "SIGINT"
    )
);

process.on(
  "SIGTERM",
  () =>
    shutdown(
      "SIGTERM"
    )
);
