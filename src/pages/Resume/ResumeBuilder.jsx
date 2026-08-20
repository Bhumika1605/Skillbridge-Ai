import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import {
  User,
  GraduationCap,
  BriefcaseBusiness,
  Code2,
  FolderGit2,
  Award,
  Plus,
  Trash2,
  Save,
  Printer,
  Sparkles,
  FileText,
  Camera,
} from "lucide-react";

function ResumeBuilder() {
  // ============================================================
  // DEFAULT DATA
  // ============================================================

  const defaultResume = {
    personal: {
      fullName: "",
      jobTitle: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
      portfolio: "",
      photo: "",
    },

    summary: "",

    skills: [],

    education: [
      {
        degree: "",
        institution: "",
        year: "",
        description: "",
      },
    ],

    experience: [
      {
        role: "",
        company: "",
        duration: "",
        description: "",
      },
    ],

    projects: [
      {
        name: "",
        technologies: "",
        description: "",
        link: "",
      },
    ],

    certifications: [
      {
        name: "",
        issuer: "",
        year: "",
      },
    ],
  };

  // ============================================================
  // STATE
  // ============================================================

  const [resume, setResume] = useState(() => {
    const saved = localStorage.getItem("skillbridgeResume");

    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        return {
          ...defaultResume,
          ...parsed,

          personal: {
            ...defaultResume.personal,
            ...(parsed.personal || {}),
          },

          skills: Array.isArray(parsed.skills)
            ? parsed.skills
            : [],

          education: Array.isArray(parsed.education)
            ? parsed.education
            : defaultResume.education,

          experience: Array.isArray(parsed.experience)
            ? parsed.experience
            : defaultResume.experience,

          projects: Array.isArray(parsed.projects)
            ? parsed.projects
            : defaultResume.projects,

          certifications: Array.isArray(parsed.certifications)
            ? parsed.certifications
            : defaultResume.certifications,
        };
      } catch {
        return defaultResume;
      }
    }

    return defaultResume;
  });

  const [photo, setPhoto] = useState(() => {
    return localStorage.getItem("skillbridgeResumePhoto") || "";
  });

  const [skillInput, setSkillInput] = useState("");

  const [savedMessage, setSavedMessage] = useState("");

  // ============================================================
  // SAVE TO LOCAL STORAGE
  // ============================================================

  useEffect(() => {
    localStorage.setItem(
      "skillbridgeResume",
      JSON.stringify(resume)
    );
  }, [resume]);

  // ============================================================
  // PERSONAL INFORMATION
  // ============================================================

  const updatePersonal = (field, value) => {
    setResume((previous) => ({
      ...previous,

      personal: {
        ...previous.personal,
        [field]: value,
      },
    }));
  };

  // ============================================================
  // PHOTO UPLOAD
  // ============================================================

  const handlePhotoUpload = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Please choose an image smaller than 5 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      const imageData = reader.result;

      setPhoto(imageData);

      localStorage.setItem(
        "skillbridgeResumePhoto",
        imageData
      );
    };

    reader.readAsDataURL(file);

    event.target.value = "";
  };

  const removePhoto = () => {
    setPhoto("");

    localStorage.removeItem(
      "skillbridgeResumePhoto"
    );
  };

  // ============================================================
  // SUMMARY
  // ============================================================

  const updateSummary = (value) => {
    setResume((previous) => ({
      ...previous,
      summary: value,
    }));
  };

  // ============================================================
  // SKILLS
  // ============================================================

  const addSkill = () => {
    const skill = skillInput.trim();

    if (!skill) return;

    const alreadyExists = resume.skills.some(
      (item) =>
        item.toLowerCase() === skill.toLowerCase()
    );

    if (alreadyExists) {
      setSkillInput("");
      return;
    }

    setResume((previous) => ({
      ...previous,
      skills: [...previous.skills, skill],
    }));

    setSkillInput("");
  };

  const removeSkill = (index) => {
    setResume((previous) => ({
      ...previous,

      skills: previous.skills.filter(
        (_, skillIndex) =>
          skillIndex !== index
      ),
    }));
  };

  // ============================================================
  // EDUCATION
  // ============================================================

  const updateEducation = (
    index,
    field,
    value
  ) => {
    setResume((previous) => {
      const education = [
        ...previous.education,
      ];

      education[index] = {
        ...education[index],
        [field]: value,
      };

      return {
        ...previous,
        education,
      };
    });
  };

  const addEducation = () => {
    setResume((previous) => ({
      ...previous,

      education: [
        ...previous.education,

        {
          degree: "",
          institution: "",
          year: "",
          description: "",
        },
      ],
    }));
  };

  const removeEducation = (index) => {
    setResume((previous) => ({
      ...previous,

      education:
        previous.education.filter(
          (_, educationIndex) =>
            educationIndex !== index
        ),
    }));
  };

  // ============================================================
  // EXPERIENCE
  // ============================================================

  const updateExperience = (
    index,
    field,
    value
  ) => {
    setResume((previous) => {
      const experience = [
        ...previous.experience,
      ];

      experience[index] = {
        ...experience[index],
        [field]: value,
      };

      return {
        ...previous,
        experience,
      };
    });
  };

  const addExperience = () => {
    setResume((previous) => ({
      ...previous,

      experience: [
        ...previous.experience,

        {
          role: "",
          company: "",
          duration: "",
          description: "",
        },
      ],
    }));
  };

  const removeExperience = (index) => {
    setResume((previous) => ({
      ...previous,

      experience:
        previous.experience.filter(
          (_, experienceIndex) =>
            experienceIndex !== index
        ),
    }));
  };

  // ============================================================
  // PROJECTS
  // ============================================================

  const updateProject = (
    index,
    field,
    value
  ) => {
    setResume((previous) => {
      const projects = [
        ...previous.projects,
      ];

      projects[index] = {
        ...projects[index],
        [field]: value,
      };

      return {
        ...previous,
        projects,
      };
    });
  };

  const addProject = () => {
    setResume((previous) => ({
      ...previous,

      projects: [
        ...previous.projects,

        {
          name: "",
          technologies: "",
          description: "",
          link: "",
        },
      ],
    }));
  };

  const removeProject = (index) => {
    setResume((previous) => ({
      ...previous,

      projects:
        previous.projects.filter(
          (_, projectIndex) =>
            projectIndex !== index
        ),
    }));
  };

  // ============================================================
  // CERTIFICATIONS
  // ============================================================

  const updateCertification = (
    index,
    field,
    value
  ) => {
    setResume((previous) => {
      const certifications = [
        ...previous.certifications,
      ];

      certifications[index] = {
        ...certifications[index],
        [field]: value,
      };

      return {
        ...previous,
        certifications,
      };
    });
  };

  const addCertification = () => {
    setResume((previous) => ({
      ...previous,

      certifications: [
        ...previous.certifications,

        {
          name: "",
          issuer: "",
          year: "",
        },
      ],
    }));
  };

  const removeCertification = (index) => {
    setResume((previous) => ({
      ...previous,

      certifications:
        previous.certifications.filter(
          (_, certificationIndex) =>
            certificationIndex !== index
        ),
    }));
  };

  // ============================================================
  // SAVE
  // ============================================================

  const saveResume = () => {
    localStorage.setItem(
      "skillbridgeResume",
      JSON.stringify(resume)
    );

    if (photo) {
      localStorage.setItem(
        "skillbridgeResumePhoto",
        photo
      );
    }

    setSavedMessage(
      "Resume saved successfully!"
    );

    setTimeout(() => {
      setSavedMessage("");
    }, 2500);
  };

  // ============================================================
  // PRINT
  // ============================================================

  const printResume = () => {
    window.print();
  };

  // ============================================================
  // DOWNLOAD PDF
  // ============================================================

  const downloadResume = () => {
    try {
      const pdf = new jsPDF(
        "p",
        "mm",
        "a4"
      );

      const pageWidth = 210;
      const pageHeight = 297;

      const margin = 18;

      const contentWidth =
        pageWidth - margin * 2;

      let y = 20;

      // --------------------------------------------------------
      // TEXT HELPER
      // --------------------------------------------------------

      const addText = (
        text,
        x,
        yPosition,
        size = 10,
        style = "normal",
        maxWidth = contentWidth
      ) => {
        pdf.setFont(
          "helvetica",
          style
        );

        pdf.setFontSize(size);

        const lines =
          pdf.splitTextToSize(
            String(text || ""),
            maxWidth
          );

        pdf.text(
          lines,
          x,
          yPosition
        );

        return (
          yPosition +
          lines.length *
            (size * 0.45)
        );
      };

      // --------------------------------------------------------
      // PAGE CHECK
      // --------------------------------------------------------

      const checkPage = (
        neededHeight = 15
      ) => {
        if (
          y + neededHeight >
          pageHeight - 15
        ) {
          pdf.addPage();

          y = 20;
        }
      };

      // ========================================================
      // HEADER
      // ========================================================

      pdf.setTextColor(
        15,
        23,
        42
      );

      y = addText(
        resume.personal.fullName ||
          "Your Name",
        margin,
        y,
        22,
        "bold"
      );

      y += 2;

      y = addText(
        resume.personal.jobTitle ||
          "Target Job Title",
        margin,
        y,
        11,
        "bold"
      );

      y += 4;

      const contact = [
        resume.personal.email,
        resume.personal.phone,
        resume.personal.location,
      ]
        .filter(Boolean)
        .join("  |  ");

      if (contact) {
        y = addText(
          contact,
          margin,
          y,
          8,
          "normal"
        );
      }

      const links = [
        resume.personal.linkedin &&
          `LinkedIn: ${resume.personal.linkedin}`,

        resume.personal.github &&
          `GitHub: ${resume.personal.github}`,

        resume.personal.portfolio &&
          `Portfolio: ${resume.personal.portfolio}`,
      ]
        .filter(Boolean)
        .join("  |  ");

      if (links) {
        y += 1;

        y = addText(
          links,
          margin,
          y,
          7.5,
          "normal"
        );
      }

      y += 3;

      pdf.setDrawColor(
        15,
        23,
        42
      );

      pdf.setLineWidth(0.6);

      pdf.line(
        margin,
        y,
        pageWidth - margin,
        y
      );

      // ========================================================
      // SECTION TITLE
      // ========================================================

      const sectionTitle = (
        title
      ) => {
        checkPage(18);

        y += 8;

        pdf.setFont(
          "helvetica",
          "bold"
        );

        pdf.setFontSize(10);

        pdf.setTextColor(
          15,
          23,
          42
        );

        pdf.text(
          title,
          margin,
          y
        );

        y += 2;

        pdf.setDrawColor(
          100,
          116,
          139
        );

        pdf.setLineWidth(
          0.25
        );

        pdf.line(
          margin,
          y,
          pageWidth - margin,
          y
        );

        y += 6;
      };

      // ========================================================
      // SUMMARY
      // ========================================================

      if (
        resume.summary?.trim()
      ) {
        sectionTitle(
          "PROFESSIONAL SUMMARY"
        );

        pdf.setFont(
          "helvetica",
          "normal"
        );

        pdf.setFontSize(9);

        pdf.setTextColor(
          51,
          65,
          85
        );

        const lines =
          pdf.splitTextToSize(
            resume.summary,
            contentWidth
          );

        checkPage(
          lines.length * 4 + 5
        );

        pdf.text(
          lines,
          margin,
          y
        );

        y +=
          lines.length * 4 +
          2;
      }

      // ========================================================
      // SKILLS
      // ========================================================

      if (
        resume.skills?.length >
        0
      ) {
        sectionTitle(
          "TECHNICAL SKILLS"
        );

        const skills =
          resume.skills.join(
            " • "
          );

        y = addText(
          skills,
          margin,
          y,
          9,
          "normal"
        );

        y += 2;
      }

      // ========================================================
      // EDUCATION
      // ========================================================

      if (
        resume.education?.some(
          (item) =>
            item.degree ||
            item.institution
        )
      ) {
        sectionTitle(
          "EDUCATION"
        );

        resume.education.forEach(
          (education) => {
            if (
              !education.degree &&
              !education.institution
            ) {
              return;
            }

            checkPage(25);

            y = addText(
              education.degree ||
                "",
              margin,
              y,
              9.5,
              "bold"
            );

            y = addText(
              education.institution ||
                "",
              margin,
              y,
              8.5,
              "bold"
            );

            if (
              education.year
            ) {
              y = addText(
                education.year,
                margin,
                y,
                8,
                "normal"
              );
            }

            if (
              education.description
            ) {
              y += 1;

              y = addText(
                education.description,
                margin,
                y,
                8.5,
                "normal"
              );
            }

            y += 4;
          }
        );
      }

      // ========================================================
      // EXPERIENCE
      // ========================================================

      if (
        resume.experience?.some(
          (item) =>
            item.role ||
            item.company
        )
      ) {
        sectionTitle(
          "EXPERIENCE"
        );

        resume.experience.forEach(
          (experience) => {
            if (
              !experience.role &&
              !experience.company
            ) {
              return;
            }

            checkPage(25);

            y = addText(
              experience.role ||
                "",
              margin,
              y,
              9.5,
              "bold"
            );

            y = addText(
              experience.company ||
                "",
              margin,
              y,
              8.5,
              "bold"
            );

            if (
              experience.duration
            ) {
              y = addText(
                experience.duration,
                margin,
                y,
                8,
                "normal"
              );
            }

            if (
              experience.description
            ) {
              y += 1;

              y = addText(
                experience.description,
                margin,
                y,
                8.5,
                "normal"
              );
            }

            y += 4;
          }
        );
      }

      // ========================================================
      // PROJECTS
      // ========================================================

      if (
        resume.projects?.some(
          (item) =>
            item.name ||
            item.description
        )
      ) {
        sectionTitle(
          "PROJECTS"
        );

        resume.projects.forEach(
          (project) => {
            if (
              !project.name &&
              !project.description
            ) {
              return;
            }

            checkPage(25);

            y = addText(
              project.name ||
                "",
              margin,
              y,
              9.5,
              "bold"
            );

            if (
              project.technologies
            ) {
              y = addText(
                `Technologies: ${project.technologies}`,
                margin,
                y,
                8,
                "bold"
              );
            }

            if (
              project.description
            ) {
              y += 1;

              y = addText(
                project.description,
                margin,
                y,
                8.5,
                "normal"
              );
            }

            if (
              project.link
            ) {
              y += 1;

              y = addText(
                project.link,
                margin,
                y,
                7.5,
                "normal"
              );
            }

            y += 4;
          }
        );
      }

      // ========================================================
      // CERTIFICATIONS
      // ========================================================

      if (
        resume.certifications?.some(
          (item) =>
            item.name ||
            item.issuer
        )
      ) {
        sectionTitle(
          "CERTIFICATIONS"
        );

        resume.certifications.forEach(
          (certification) => {
            if (
              !certification.name &&
              !certification.issuer
            ) {
              return;
            }

            checkPage(15);

            let certificationText =
              certification.name ||
              "";

            if (
              certification.issuer
            ) {
              certificationText +=
                ` — ${certification.issuer}`;
            }

            if (
              certification.year
            ) {
              certificationText +=
                ` (${certification.year})`;
            }

            y = addText(
              certificationText,
              margin,
              y,
              8.5,
              "normal"
            );

            y += 3;
          }
        );
      }

      // ========================================================
      // SAVE PDF
      // ========================================================

      const fileName =
        (
          resume.personal.fullName ||
          "SkillBridge_Resume"
        )
          .replace(
            /[^a-z0-9]/gi,
            "_"
          )
          .replace(
            /_+/g,
            "_"
          );

      pdf.save(
        `${fileName}.pdf`
      );
    } catch (error) {
      console.error(
        "Resume download failed:",
        error
      );

      alert(
        "Unable to download the resume. Please try again."
      );
    }
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <div className="min-h-screen bg-slate-950 p-4 text-white sm:p-6 lg:p-8">

      {/* ========================================================
          HEADER
      ======================================================== */}

      <div className="mb-7 flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">

        <div className="flex items-start gap-3">

          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10">

            <FileText
              size={23}
              className="text-cyan-400"
            />

          </div>

          <div>

            <div className="flex flex-wrap items-center gap-2">

              <h1 className="text-2xl font-bold sm:text-3xl">
                Resume Builder
              </h1>

              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-cyan-400">
                SkillBridge AI
              </span>

            </div>

            <p className="mt-1 text-sm text-slate-500">
              Build a professional, job-ready resume with SkillBridge AI.
            </p>

          </div>

        </div>

        <div className="flex flex-wrap gap-3">

          {savedMessage && (
            <div className="flex items-center rounded-xl border border-green-400/20 bg-green-400/10 px-4 py-3 text-sm font-medium text-green-400">
              ✓ {savedMessage}
            </div>
          )}

          <button
            type="button"
            onClick={saveResume}
            className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-400"
          >
            <Save size={17} />
            Save Resume
          </button>

          <button
            type="button"
            onClick={downloadResume}
            className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-400"
          >
            <FileText size={17} />
            Download PDF
          </button>

          <button
            type="button"
            onClick={printResume}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-sm font-semibold text-slate-200 transition hover:border-cyan-400/40 hover:text-cyan-400"
          >
            <Printer size={17} />
            Print
          </button>

        </div>

      </div>

      {/* ========================================================
          BUILDER
      ======================================================== */}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        {/* ======================================================
            LEFT FORM
        ====================================================== */}

        <div className="space-y-6">

          {/* ====================================================
              PERSONAL INFORMATION
          ==================================================== */}

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-5 sm:p-6">

            <SectionHeader
              icon={<User size={19} />}
              title="Personal Information"
              description="Add the basic information recruiters need to contact you."
            />

            {/* PHOTO */}

            <div className="mb-5">

              <label className="mb-2 block text-xs font-semibold text-slate-400">
                Profile Photo
              </label>

              <div className="flex flex-wrap items-center gap-4">

                <div className="relative">

                  {photo ? (
                    <img
                      src={photo}
                      alt="Profile"
                      className="h-20 w-20 rounded-2xl border border-slate-700 object-cover"
                    />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-950 text-slate-600">
                      <User size={25} />
                    </div>
                  )}

                </div>

                <div className="flex flex-wrap gap-2">

                  <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400">

                    <Camera size={16} />

                    {photo
                      ? "Change Photo"
                      : "Upload Photo"}

                    <input
                      type="file"
                      accept="image/*"
                      onChange={
                        handlePhotoUpload
                      }
                      className="hidden"
                    />

                  </label>

                  {photo && (
                    <button
                      type="button"
                      onClick={
                        removePhoto
                      }
                      className="flex items-center gap-2 rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3 text-sm text-red-400 transition hover:bg-red-400/10"
                    >
                      <Trash2 size={15} />
                      Remove
                    </button>
                  )}

                </div>

              </div>

              <p className="mt-2 text-[11px] text-slate-600">
                Recommended: square JPG or PNG image, maximum 5 MB.
              </p>

            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

              <div className="sm:col-span-2">

                <Input
                  value={
                    resume.personal.fullName
                  }
                  onChange={(value) =>
                    updatePersonal(
                      "fullName",
                      value
                    )
                  }
                  placeholder="Full Name"
                />

              </div>

              <Input
                value={
                  resume.personal.jobTitle
                }
                onChange={(value) =>
                  updatePersonal(
                    "jobTitle",
                    value
                  )
                }
                placeholder="Target Job Title"
              />

              <Input
                type="email"
                value={
                  resume.personal.email
                }
                onChange={(value) =>
                  updatePersonal(
                    "email",
                    value
                  )
                }
                placeholder="Email Address"
              />

              <Input
                value={
                  resume.personal.phone
                }
                onChange={(value) =>
                  updatePersonal(
                    "phone",
                    value
                  )
                }
                placeholder="Phone Number"
              />

              <Input
                value={
                  resume.personal.location
                }
                onChange={(value) =>
                  updatePersonal(
                    "location",
                    value
                  )
                }
                placeholder="City, Country"
              />

              <Input
                value={
                  resume.personal.linkedin
                }
                onChange={(value) =>
                  updatePersonal(
                    "linkedin",
                    value
                  )
                }
                placeholder="LinkedIn URL"
              />

              <Input
                value={
                  resume.personal.github
                }
                onChange={(value) =>
                  updatePersonal(
                    "github",
                    value
                  )
                }
                placeholder="GitHub URL"
              />

              <div className="sm:col-span-2">

                <Input
                  value={
                    resume.personal.portfolio
                  }
                  onChange={(value) =>
                    updatePersonal(
                      "portfolio",
                      value
                    )
                  }
                  placeholder="Portfolio / Website URL"
                />

              </div>

            </div>

          </section>

          {/* ====================================================
              SUMMARY
          ==================================================== */}

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-5 sm:p-6">

            <SectionHeader
              icon={<Sparkles size={19} />}
              title="Professional Summary"
              description="Write a short introduction highlighting your strengths and career goal."
            />

            <textarea
              value={resume.summary}
              onChange={(e) =>
                updateSummary(
                  e.target.value
                )
              }
              rows={6}
              placeholder="Example: Computer Engineering student passionate about frontend development, modern UI/UX and building real-world web applications..."
              className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30"
            />

            <button
              type="button"
              onClick={() => {
                if (
                  !resume.summary.trim()
                ) {
                  updateSummary(
                    "Motivated Computer Engineering student with strong interest in software development, modern technologies and building practical real-world applications. Passionate about learning, problem solving and creating user-focused digital experiences."
                  );
                }
              }}
              className="mt-3 flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-xs font-semibold text-cyan-400 transition hover:bg-cyan-400/20"
            >
              <Sparkles size={14} />
              Generate Sample Summary
            </button>

          </section>

          {/* ====================================================
              SKILLS
          ==================================================== */}

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-5 sm:p-6">

            <SectionHeader
              icon={<Code2 size={19} />}
              title="Technical Skills"
              description="Add technologies, programming languages, tools and professional skills."
            />

            <div className="flex flex-col gap-3 sm:flex-row">

              <input
                value={skillInput}
                onChange={(e) =>
                  setSkillInput(
                    e.target.value
                  )
                }
                onKeyDown={(e) => {
                  if (
                    e.key ===
                    "Enter"
                  ) {
                    e.preventDefault();
                    addSkill();
                  }
                }}
                placeholder="e.g. React.js"
                className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400"
              />

              <button
                type="button"
                onClick={addSkill}
                className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-400"
              >
                <Plus size={17} />
                Add Skill
              </button>

            </div>

            <div className="mt-5 flex flex-wrap gap-2">

              {resume.skills.map(
                (
                  skill,
                  index
                ) => (
                  <div
                    key={`${skill}-${index}`}
                    className="flex items-center gap-2 rounded-xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-sm text-cyan-300"
                  >

                    {skill}

                    <button
                      type="button"
                      onClick={() =>
                        removeSkill(
                          index
                        )
                      }
                      className="text-slate-500 transition hover:text-red-400"
                    >
                      ×
                    </button>

                  </div>
                )
              )}

            </div>

          </section>

          {/* ====================================================
              EDUCATION
          ==================================================== */}

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-5 sm:p-6">

            <div className="flex items-start justify-between gap-4">

              <SectionHeader
                icon={
                  <GraduationCap
                    size={19}
                  />
                }
                title="Education"
                description="Add your academic qualifications."
              />

              <button
                type="button"
                onClick={
                  addEducation
                }
                className="flex flex-shrink-0 items-center gap-1 rounded-xl bg-cyan-500/10 px-3 py-2 text-xs font-semibold text-cyan-400 hover:bg-cyan-500/20"
              >
                <Plus size={15} />
                Add
              </button>

            </div>

            <div className="space-y-5">

              {resume.education.map(
                (
                  education,
                  index
                ) => (
                  <div
                    key={index}
                    className="relative rounded-2xl border border-slate-800 bg-slate-950/60 p-4"
                  >

                    {resume.education
                      .length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeEducation(
                            index
                          )
                        }
                        className="absolute right-4 top-4 text-slate-600 hover:text-red-400"
                      >
                        <Trash2
                          size={16}
                        />
                      </button>
                    )}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                      <Input
                        value={
                          education.degree
                        }
                        onChange={(
                          value
                        ) =>
                          updateEducation(
                            index,
                            "degree",
                            value
                          )
                        }
                        placeholder="Degree / Course"
                      />

                      <Input
                        value={
                          education.institution
                        }
                        onChange={(
                          value
                        ) =>
                          updateEducation(
                            index,
                            "institution",
                            value
                          )
                        }
                        placeholder="College / University"
                      />

                      <Input
                        value={
                          education.year
                        }
                        onChange={(
                          value
                        ) =>
                          updateEducation(
                            index,
                            "year",
                            value
                          )
                        }
                        placeholder="Year / Duration"
                      />

                      <div className="sm:col-span-2">

                        <textarea
                          value={
                            education.description
                          }
                          onChange={(
                            e
                          ) =>
                            updateEducation(
                              index,
                              "description",
                              e.target
                                .value
                            )
                          }
                          rows={3}
                          placeholder="Relevant coursework, achievements, CGPA..."
                          className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 focus:border-cyan-400"
                        />

                      </div>

                    </div>

                  </div>
                )
              )}

            </div>

          </section>

          {/* ====================================================
              EXPERIENCE
          ==================================================== */}

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-5 sm:p-6">

            <div className="flex items-start justify-between gap-4">

              <SectionHeader
                icon={
                  <BriefcaseBusiness
                    size={19}
                  />
                }
                title="Experience"
                description="Add internships, freelance work or professional experience."
              />

              <button
                type="button"
                onClick={
                  addExperience
                }
                className="flex flex-shrink-0 items-center gap-1 rounded-xl bg-cyan-500/10 px-3 py-2 text-xs font-semibold text-cyan-400 hover:bg-cyan-500/20"
              >
                <Plus size={15} />
                Add
              </button>

            </div>

            <div className="space-y-5">

              {resume.experience.map(
                (
                  experience,
                  index
                ) => (
                  <div
                    key={index}
                    className="relative rounded-2xl border border-slate-800 bg-slate-950/60 p-4"
                  >

                    {resume.experience
                      .length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeExperience(
                            index
                          )
                        }
                        className="absolute right-4 top-4 text-slate-600 hover:text-red-400"
                      >
                        <Trash2
                          size={16}
                        />
                      </button>
                    )}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                      <Input
                        value={
                          experience.role
                        }
                        onChange={(
                          value
                        ) =>
                          updateExperience(
                            index,
                            "role",
                            value
                          )
                        }
                        placeholder="Job / Internship Role"
                      />

                      <Input
                        value={
                          experience.company
                        }
                        onChange={(
                          value
                        ) =>
                          updateExperience(
                            index,
                            "company",
                            value
                          )
                        }
                        placeholder="Company / Organization"
                      />

                      <Input
                        value={
                          experience.duration
                        }
                        onChange={(
                          value
                        ) =>
                          updateExperience(
                            index,
                            "duration",
                            value
                          )
                        }
                        placeholder="Duration"
                      />

                      <div className="sm:col-span-2">

                        <textarea
                          value={
                            experience.description
                          }
                          onChange={(
                            e
                          ) =>
                            updateExperience(
                              index,
                              "description",
                              e.target
                                .value
                            )
                          }
                          rows={4}
                          placeholder="Describe your responsibilities, achievements and technologies used..."
                          className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400"
                        />

                      </div>

                    </div>

                  </div>
                )
              )}

            </div>

          </section>

          {/* ====================================================
              PROJECTS
          ==================================================== */}

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-5 sm:p-6">

            <div className="flex items-start justify-between gap-4">

              <SectionHeader
                icon={
                  <FolderGit2
                    size={19}
                  />
                }
                title="Projects"
                description="Showcase projects that prove your practical skills."
              />

              <button
                type="button"
                onClick={
                  addProject
                }
                className="flex flex-shrink-0 items-center gap-1 rounded-xl bg-cyan-500/10 px-3 py-2 text-xs font-semibold text-cyan-400 hover:bg-cyan-500/20"
              >
                <Plus size={15} />
                Add
              </button>

            </div>

            <div className="space-y-5">

              {resume.projects.map(
                (
                  project,
                  index
                ) => (
                  <div
                    key={index}
                    className="relative rounded-2xl border border-slate-800 bg-slate-950/60 p-4"
                  >

                    {resume.projects
                      .length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeProject(
                            index
                          )
                        }
                        className="absolute right-4 top-4 text-slate-600 hover:text-red-400"
                      >
                        <Trash2
                          size={16}
                        />
                      </button>
                    )}

                    <div className="space-y-4">

                      <Input
                        value={
                          project.name
                        }
                        onChange={(
                          value
                        ) =>
                          updateProject(
                            index,
                            "name",
                            value
                          )
                        }
                        placeholder="Project Name"
                      />

                      <Input
                        value={
                          project.technologies
                        }
                        onChange={(
                          value
                        ) =>
                          updateProject(
                            index,
                            "technologies",
                            value
                          )
                        }
                        placeholder="Technologies — React, JavaScript, Tailwind..."
                      />

                      <textarea
                        value={
                          project.description
                        }
                        onChange={(
                          e
                        ) =>
                          updateProject(
                            index,
                            "description",
                            e.target
                              .value
                          )
                        }
                        rows={4}
                        placeholder="Describe what you built, your contribution and the result..."
                        className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm leading-6 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400"
                      />

                      <Input
                        value={
                          project.link
                        }
                        onChange={(
                          value
                        ) =>
                          updateProject(
                            index,
                            "link",
                            value
                          )
                        }
                        placeholder="Project URL"
                      />

                    </div>

                  </div>
                )
              )}

            </div>

          </section>

          {/* ====================================================
              CERTIFICATIONS
          ==================================================== */}

          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-5 sm:p-6">

            <div className="flex items-start justify-between gap-4">

              <SectionHeader
                icon={
                  <Award size={19} />
                }
                title="Certifications"
                description="Add certifications and professional achievements."
              />

              <button
                type="button"
                onClick={
                  addCertification
                }
                className="flex flex-shrink-0 items-center gap-1 rounded-xl bg-cyan-500/10 px-3 py-2 text-xs font-semibold text-cyan-400 hover:bg-cyan-500/20"
              >
                <Plus size={15} />
                Add
              </button>

            </div>

            <div className="space-y-4">

              {resume.certifications.map(
                (
                  certification,
                  index
                ) => (
                  <div
                    key={index}
                    className="relative rounded-2xl border border-slate-800 bg-slate-950/60 p-4"
                  >

                    {resume.certifications
                      .length > 1 && (
                      <button
                        type="button"
                        onClick={() =>
                          removeCertification(
                            index
                          )
                        }
                        className="absolute right-4 top-4 text-slate-600 hover:text-red-400"
                      >
                        <Trash2
                          size={16}
                        />
                      </button>
                    )}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                      <Input
                        value={
                          certification.name
                        }
                        onChange={(
                          value
                        ) =>
                          updateCertification(
                            index,
                            "name",
                            value
                          )
                        }
                        placeholder="Certification"
                      />

                      <Input
                        value={
                          certification.issuer
                        }
                        onChange={(
                          value
                        ) =>
                          updateCertification(
                            index,
                            "issuer",
                            value
                          )
                        }
                        placeholder="Issuer"
                      />

                      <Input
                        value={
                          certification.year
                        }
                        onChange={(
                          value
                        ) =>
                          updateCertification(
                            index,
                            "year",
                            value
                          )
                        }
                        placeholder="Year"
                      />

                    </div>

                  </div>
                )
              )}

            </div>

          </section>

        </div>

        {/* ======================================================
            RIGHT — LIVE RESUME PREVIEW
        ====================================================== */}

        <div className="xl:sticky xl:top-6 xl:h-fit">

          <div className="mb-3 flex items-center justify-between">

            <div>

              <p className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
                Live Preview
              </p>

              <p className="mt-1 text-xs text-slate-600">
                Your resume updates automatically.
              </p>

            </div>

          </div>

          {/* ====================================================
              RESUME PAPER
          ==================================================== */}

          <div
            id="resume-preview"
            className="resume-paper overflow-hidden rounded-xl bg-white text-slate-900 shadow-2xl"
          >

            <div className="p-6 sm:p-8">

              {/* ==================================================
                  HEADER
              ================================================== */}

              <div className="border-b-2 border-slate-900 pb-5">

                <div className="flex items-start justify-between gap-5">

                  <div className="min-w-0 flex-1">

                    <h1 className="break-words text-3xl font-black uppercase tracking-tight sm:text-4xl">
                      {resume.personal
                        .fullName ||
                        "Your Name"}
                    </h1>

                    <p className="mt-2 text-base font-semibold text-slate-600">
                      {resume.personal
                        .jobTitle ||
                        "Target Job Title"}
                    </p>

                    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-600">

                      {resume.personal
                        .email && (
                        <span>
                          {
                            resume.personal
                              .email
                          }
                        </span>
                      )}

                      {resume.personal
                        .phone && (
                        <span>
                          {
                            resume.personal
                              .phone
                          }
                        </span>
                      )}

                      {resume.personal
                        .location && (
                        <span>
                          {
                            resume.personal
                              .location
                          }
                        </span>
                      )}

                    </div>

                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">

                      {resume.personal
                        .linkedin && (
                        <span className="break-all">
                          LinkedIn:{" "}
                          {
                            resume.personal
                              .linkedin
                          }
                        </span>
                      )}

                      {resume.personal
                        .github && (
                        <span className="break-all">
                          GitHub:{" "}
                          {
                            resume.personal
                              .github
                          }
                        </span>
                      )}

                      {resume.personal
                        .portfolio && (
                        <span className="break-all">
                          Portfolio:{" "}
                          {
                            resume.personal
                              .portfolio
                          }
                        </span>
                      )}

                    </div>

                  </div>

                  {photo && (
                    <img
                      src={photo}
                      alt="Profile"
                      className="h-24 w-24 flex-shrink-0 rounded-xl border border-slate-200 object-cover"
                    />
                  )}

                </div>

              </div>

              {/* ==================================================
                  SUMMARY
              ================================================== */}

              {resume.summary && (
                <ResumeSection
                  title="PROFESSIONAL SUMMARY"
                >

                  <p className="text-xs leading-5 text-slate-700">
                    {resume.summary}
                  </p>

                </ResumeSection>
              )}

              {/* ==================================================
                  SKILLS
              ================================================== */}

              {resume.skills.length >
                0 && (
                <ResumeSection
                  title="TECHNICAL SKILLS"
                >

                  <div className="flex flex-wrap gap-x-2 gap-y-1 text-xs text-slate-700">

                    {resume.skills.map(
                      (
                        skill,
                        index
                      ) => (
                        <span
                          key={index}
                        >
                          {skill}

                          {index <
                            resume
                              .skills
                              .length -
                              1 &&
                            " •"}
                        </span>
                      )
                    )}

                  </div>

                </ResumeSection>
              )}

              {/* ==================================================
                  EDUCATION
              ================================================== */}

              {resume.education.some(
                (item) =>
                  item.degree ||
                  item.institution
              ) && (
                <ResumeSection
                  title="EDUCATION"
                >

                  {resume.education.map(
                    (
                      education,
                      index
                    ) => {
                      if (
                        !education.degree &&
                        !education.institution
                      ) {
                        return null;
                      }

                      return (
                        <div
                          key={index}
                          className="mb-4 last:mb-0"
                        >

                          <div className="flex flex-col justify-between gap-1 sm:flex-row">

                            <div>

                              <h3 className="text-sm font-bold">
                                {
                                  education.degree
                                }
                              </h3>

                              <p className="text-xs font-semibold text-slate-600">
                                {
                                  education.institution
                                }
                              </p>

                            </div>

                            <p className="text-xs text-slate-500">
                              {
                                education.year
                              }
                            </p>

                          </div>

                          {education.description && (
                            <p className="mt-1 text-xs leading-5 text-slate-600">
                              {
                                education.description
                              }
                            </p>
                          )}

                        </div>
                      );
                    }
                  )}

                </ResumeSection>
              )}

              {/* ==================================================
                  EXPERIENCE
              ================================================== */}

              {resume.experience.some(
                (item) =>
                  item.role ||
                  item.company
              ) && (
                <ResumeSection
                  title="EXPERIENCE"
                >

                  {resume.experience.map(
                    (
                      experience,
                      index
                    ) => {
                      if (
                        !experience.role &&
                        !experience.company
                      ) {
                        return null;
                      }

                      return (
                        <div
                          key={index}
                          className="mb-4 last:mb-0"
                        >

                          <div className="flex flex-col justify-between gap-1 sm:flex-row">

                            <div>

                              <h3 className="text-sm font-bold">
                                {
                                  experience.role
                                }
                              </h3>

                              <p className="text-xs font-semibold text-slate-600">
                                {
                                  experience.company
                                }
                              </p>

                            </div>

                            <p className="text-xs text-slate-500">
                              {
                                experience.duration
                              }
                            </p>

                          </div>

                          {experience.description && (
                            <p className="mt-1 whitespace-pre-line text-xs leading-5 text-slate-600">
                              {
                                experience.description
                              }
                            </p>
                          )}

                        </div>
                      );
                    }
                  )}

                </ResumeSection>
              )}

              {/* ==================================================
                  PROJECTS
              ================================================== */}

              {resume.projects.some(
                (item) =>
                  item.name ||
                  item.description
              ) && (
                <ResumeSection
                  title="PROJECTS"
                >

                  {resume.projects.map(
                    (
                      project,
                      index
                    ) => {
                      if (
                        !project.name &&
                        !project.description
                      ) {
                        return null;
                      }

                      return (
                        <div
                          key={index}
                          className="mb-4 last:mb-0"
                        >

                          <h3 className="text-sm font-bold">
                            {
                              project.name
                            }
                          </h3>

                          {project.technologies && (
                            <p className="mt-1 text-xs font-semibold text-slate-600">
                              Technologies:{" "}
                              {
                                project.technologies
                              }
                            </p>
                          )}

                          {project.description && (
                            <p className="mt-1 whitespace-pre-line text-xs leading-5 text-slate-600">
                              {
                                project.description
                              }
                            </p>
                          )}

                          {project.link && (
                            <p className="mt-1 break-all text-xs text-slate-500">
                              {
                                project.link
                              }
                            </p>
                          )}

                        </div>
                      );
                    }
                  )}

                </ResumeSection>
              )}

              {/* ==================================================
                  CERTIFICATIONS
              ================================================== */}

              {resume.certifications.some(
                (item) =>
                  item.name ||
                  item.issuer
              ) && (
                <ResumeSection
                  title="CERTIFICATIONS"
                >

                  {resume.certifications.map(
                    (
                      certification,
                      index
                    ) => {
                      if (
                        !certification.name &&
                        !certification.issuer
                      ) {
                        return null;
                      }

                      return (
                        <div
                          key={index}
                          className="mb-2 flex flex-col justify-between gap-1 text-xs sm:flex-row"
                        >

                          <span>

                            <strong>
                              {
                                certification.name
                              }
                            </strong>

                            {certification.issuer &&
                              ` — ${certification.issuer}`}

                          </span>

                          <span className="text-slate-500">
                            {
                              certification.year
                            }
                          </span>

                        </div>
                      );
                    }
                  )}

                </ResumeSection>
              )}

            </div>

          </div>

        </div>

      </div>

      {/* ========================================================
          MOBILE TIP
      ======================================================== */}

      <div className="mt-6 rounded-2xl border border-cyan-400/10 bg-cyan-400/[0.03] p-4 text-center text-xs text-slate-500 xl:hidden">
        💡 Fill the sections above and your resume preview will
        update automatically.
      </div>

    </div>
  );
}

// ================================================================
// INPUT COMPONENT
// IMPORTANT:
// OUTSIDE ResumeBuilder TO PREVENT CURSOR/FOCUS ISSUES.
// ================================================================

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
      placeholder={placeholder}
      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400/30"
    />
  );
}

// ================================================================
// SECTION HEADER
// ================================================================

function SectionHeader({
  icon,
  title,
  description,
}) {
  return (
    <div className="mb-6 flex items-start gap-3">

      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-400">
        {icon}
      </div>

      <div>

        <h2 className="text-lg font-bold text-white">
          {title}
        </h2>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          {description}
        </p>

      </div>

    </div>
  );
}

// ================================================================
// RESUME SECTION
// ================================================================

function ResumeSection({
  title,
  children,
}) {
  return (
    <section className="mt-6">

      <h2 className="border-b border-slate-300 pb-1 text-xs font-black tracking-widest text-slate-900">
        {title}
      </h2>

      <div className="mt-3">
        {children}
      </div>

    </section>
  );
}

export default ResumeBuilder;