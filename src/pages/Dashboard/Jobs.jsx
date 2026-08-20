import React, { useCallback, useEffect, useMemo, useState } from "react";

const API = "http://localhost:5000";

const ROLES = [
  "All Roles",
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
  "Product Manager",
];

const LOCATIONS = [
  "All India",
  "Gujarat",
  "Remote",
  "Ahmedabad",
  "Vadodara",
  "Surat",
  "Rajkot",
  "Mumbai",
  "Pune",
  "Bengaluru",
  "Hyderabad",
  "Delhi",
  "Noida",
  "Gurugram",
  "Chennai",
];

const WORK_MODES = [
  "All",
  "Remote",
  "On-site",
  "Hybrid",
];

export default function Jobs() {
  const [jobs, setJobs] = useState([]);

  const [role, setRole] = useState("All Roles");
  const [location, setLocation] = useState("All India");
  const [workMode, setWorkMode] = useState("All");
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState(null);

  /*
   * ----------------------------------------------------------
   * LOAD REAL JOBS
   * ----------------------------------------------------------
   *
   * We intentionally request the general jobs endpoint without
   * frontend filters.
   *
   * The filtering is then handled here in React.
   *
   * This prevents problems when the backend uses slightly
   * different values such as:
   *
   * "Work from home"
   * "WFH"
   * "Remote"
   *
   * or:
   *
   * "Ahmedabad, Gujarat"
   * "Gujarat"
   *
   * etc.
   */

  const loadJobs = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API}/api/jobs`
      );

      if (!response.ok) {
        throw new Error(
          `Server returned status ${response.status}`
        );
      }

      const data = await response.json();

      if (!data || data.success !== true) {
        throw new Error(
          data?.message || "Unable to load jobs."
        );
      }

      const receivedJobs = Array.isArray(data.jobs)
        ? data.jobs
        : [];

      setJobs(receivedJobs);
      setLastUpdated(new Date());
    } catch (err) {
      console.error("Jobs loading error:", err);

      setError(
        err?.message ||
          "Unable to load jobs. Make sure the SkillBridge AI backend is running on port 5000."
      );

      setJobs([]);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  /*
   * ----------------------------------------------------------
   * FRONTEND FILTERING
   * ----------------------------------------------------------
   */

  const filteredJobs = useMemo(() => {
    let result = [...jobs];

    /*
     * ROLE FILTER
     */

    if (role !== "All Roles") {
      const wantedRole = normalize(role);

      result = result.filter((job) => {
        const searchableText = normalize(
          [
            job?.role,
            job?.jobRole,
            job?.title,
            job?.jobTitle,
            job?.position,
            job?.description,
            job?.summary,
            job?.skills,
            job?.requiredSkills,
          ]
            .flat()
            .join(" ")
        );

        const roleWords = wantedRole.split(" ");

        /*
         * We don't require every word to match exactly.
         *
         * Example:
         * "Frontend Developer"
         *
         * can match:
         * "Frontend Developer Intern"
         * "React Frontend Developer"
         * "Frontend Engineer"
         */

        if (searchableText.includes(wantedRole)) {
          return true;
        }

        const importantWords = roleWords.filter(
          (word) =>
            word.length > 2 &&
            word !== "developer" &&
            word !== "engineer"
        );

        if (importantWords.length === 0) {
          return searchableText.includes(
            wantedRole
          );
        }

        return importantWords.some((word) =>
          searchableText.includes(word)
        );
      });
    }

    /*
     * LOCATION FILTER
     */

    if (location !== "All India") {
      const wantedLocation = normalize(location);

      result = result.filter((job) => {
        const jobLocation = normalize(
          [
            job?.location,
            job?.jobLocation,
            job?.city,
            job?.state,
            job?.country,
          ]
            .flat()
            .join(" ")
        );

        /*
         * Remote jobs should appear under Remote.
         */

        const isRemote =
          isRemoteJob(job);

        if (wantedLocation === "remote") {
          return isRemote;
        }

        /*
         * Gujarat should include Ahmedabad,
         * Vadodara, Surat, Rajkot, etc.
         */

        if (wantedLocation === "gujarat") {
          return (
            jobLocation.includes("gujarat") ||
            jobLocation.includes("ahmedabad") ||
            jobLocation.includes("vadodara") ||
            jobLocation.includes("surat") ||
            jobLocation.includes("rajkot") ||
            isRemote
          );
        }

        /*
         * Specific cities
         */

        return jobLocation.includes(
          wantedLocation
        );
      });
    }

    /*
     * WORK MODE FILTER
     */

    if (workMode !== "All") {
      result = result.filter((job) => {
        return matchesWorkMode(
          job,
          workMode
        );
      });
    }

    /*
     * SEARCH FILTER
     */

    if (search.trim()) {
      const searchTerms = normalize(
        search
      )
        .split(" ")
        .filter(Boolean);

      result = result.filter((job) => {
        const searchableText = normalize(
          [
            job?.title,
            job?.jobTitle,
            job?.position,
            job?.company,
            job?.companyName,
            job?.employer,
            job?.location,
            job?.jobLocation,
            job?.role,
            job?.jobRole,
            job?.description,
            job?.summary,
            job?.skills,
            job?.requiredSkills,
            job?.technologies,
            job?.experience,
            job?.experienceLevel,
            job?.jobType,
            job?.employmentType,
            job?.workMode,
            job?.mode,
          ]
            .flat()
            .join(" ")
        );

        return searchTerms.every((term) =>
          searchableText.includes(term)
        );
      });
    }

    return result;
  }, [
    jobs,
    role,
    location,
    workMode,
    search,
  ]);

  /*
   * ----------------------------------------------------------
   * CLEAR FILTERS
   * ----------------------------------------------------------
   */

  function resetFilters() {
    setRole("All Roles");
    setLocation("All India");
    setWorkMode("All");
    setSearch("");
  }

  /*
   * ----------------------------------------------------------
   * REFRESH
   * ----------------------------------------------------------
   */

  async function handleRefresh() {
    setRefreshing(true);
    await loadJobs();
  }

  return (
    <section className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* ==================================================
            HEADER
        =================================================== */}

        <div className="mb-8">
          <div className="mb-3 flex flex-wrap items-center gap-3">

            <span className="inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
              <span className="h-2 w-2 rounded-full bg-cyan-400" />
              SkillBridge AI
            </span>

            <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
              Live Opportunities
            </span>

          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Job Opportunities
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
            Explore real job opportunities and find
            positions that match your career goals.
          </p>
        </div>

        {/* ==================================================
            FILTERS
        =================================================== */}

        <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-xl shadow-black/20 sm:p-5">

          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <h2 className="text-base font-semibold text-white">
                Find your next opportunity
              </h2>

              <p className="mt-1 text-xs text-slate-500">
                Filter jobs by role, location, work mode,
                or search.
              </p>
            </div>

            <button
              type="button"
              onClick={resetFilters}
              className="w-fit rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-400 transition hover:border-cyan-500/50 hover:text-cyan-400"
            >
              Clear Filters
            </button>

          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

            {/* ROLE */}

            <FilterSelect
              label="Career Role"
              value={role}
              onChange={setRole}
              options={ROLES}
            />

            {/* LOCATION */}

            <FilterSelect
              label="Location"
              value={location}
              onChange={setLocation}
              options={LOCATIONS}
            />

            {/* WORK MODE */}

            <FilterSelect
              label="Work Mode"
              value={workMode}
              onChange={setWorkMode}
              options={WORK_MODES}
            />

            {/* SEARCH */}

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-400">
                Search
              </label>

              <div className="relative">

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                  placeholder="Search jobs, companies, skills..."
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 pr-10 text-sm text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-lg text-slate-500 transition hover:text-white"
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}

              </div>
            </div>

          </div>
        </div>

        {/* ==================================================
            ERROR
        =================================================== */}

        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-5">

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <p className="font-semibold text-red-300">
                  Unable to load jobs
                </p>

                <p className="mt-1 text-sm leading-6 text-red-400/80">
                  {error}
                </p>
              </div>

              <button
                type="button"
                onClick={handleRefresh}
                disabled={refreshing}
                className="shrink-0 rounded-xl bg-red-500/20 px-4 py-2.5 text-sm font-semibold text-red-300 transition hover:bg-red-500/30 disabled:opacity-50"
              >
                {refreshing
                  ? "Retrying..."
                  : "Try Again"}
              </button>

            </div>

          </div>
        )}

        {/* ==================================================
            RESULTS TOOLBAR
        =================================================== */}

        {!loading && !error && (
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-sm text-slate-400">
                <span className="font-semibold text-white">
                  {filteredJobs.length}
                </span>{" "}
                {filteredJobs.length === 1
                  ? "job"
                  : "jobs"}{" "}
                found
              </p>

              {lastUpdated && (
                <p className="mt-1 text-xs text-slate-600">
                  Updated{" "}
                  {lastUpdated.toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={handleRefresh}
              disabled={refreshing}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:border-cyan-500 hover:text-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <span
                className={
                  refreshing
                    ? "animate-spin"
                    : ""
                }
              >
                ↻
              </span>

              {refreshing
                ? "Refreshing..."
                : "Refresh"}
            </button>

          </div>
        )}

        {/* ==================================================
            LOADING
        =================================================== */}

        {loading && (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

            {Array.from({
              length: 6,
            }).map((_, index) => (
              <JobSkeleton
                key={index}
              />
            ))}

          </div>
        )}

        {/* ==================================================
            EMPTY
        =================================================== */}

        {!loading &&
          !error &&
          filteredJobs.length === 0 && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 px-6 py-14 text-center">

              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-500/20 bg-cyan-500/10 text-3xl">
                🔎
              </div>

              <h2 className="text-xl font-semibold">
                No matching jobs found
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">
                No available jobs match your current
                filters. Try changing the role,
                location, work mode, or search.
              </p>

              <button
                type="button"
                onClick={resetFilters}
                className="mt-6 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Clear Filters
              </button>

            </div>
          )}

        {/* ==================================================
            JOB CARDS
        =================================================== */}

        {!loading &&
          !error &&
          filteredJobs.length > 0 && (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

              {filteredJobs.map(
                (job, index) => (
                  <JobCard
                    key={
                      job?.id ||
                      job?.jobId ||
                      job?.key ||
                      job?.url ||
                      index
                    }
                    job={job}
                  />
                )
              )}

            </div>
          )}

      </div>
    </section>
  );
}

/* ============================================================
   FILTER SELECT
============================================================ */

function FilterSelect({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-400">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/30"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ============================================================
   JOB CARD
============================================================ */

function JobCard({ job }) {
  const title = getFirstValue(
    job?.title,
    job?.jobTitle,
    job?.position,
    "Job Opportunity"
  );

  const company = getFirstValue(
    job?.company,
    job?.companyName,
    job?.employer,
    "Company not specified"
  );

  const location = getFirstValue(
    job?.location,
    job?.jobLocation,
    job?.city,
    "Location not specified"
  );

  const workMode = getFirstValue(
    job?.workMode,
    job?.work_mode,
    job?.mode,
    detectWorkMode(job)
  );

  const role = getFirstValue(
    job?.role,
    job?.jobRole,
    ""
  );

  const description = getFirstValue(
    job?.description,
    job?.summary,
    job?.jobDescription,
    "View the official listing for complete job details."
  );

  const salary = formatSalary(
    job?.salary ??
      job?.salaryRange ??
      job?.pay
  );

  const experience = getFirstValue(
    job?.experience,
    job?.experienceLevel,
    job?.seniority,
    ""
  );

  const jobType = getFirstValue(
    job?.jobType,
    job?.employmentType,
    job?.type,
    ""
  );

  const source = getFirstValue(
    job?.source,
    job?.platform,
    job?.provider,
    "Job Source"
  );

  const applyUrl = getFirstValue(
    job?.applyUrl,
    job?.applyURL,
    job?.jobUrl,
    job?.url,
    job?.link,
    ""
  );

  const skills = normalizeArray(
    job?.skills ||
      job?.requiredSkills ||
      job?.technologies ||
      []
  );

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/80 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-cyan-500/40">

      {/* TOP LINE */}

      <div className="h-1 w-full bg-gradient-to-r from-cyan-500/80 via-cyan-400/30 to-transparent" />

      <div className="flex flex-1 flex-col p-5">

        {/* HEADER */}

        <div className="mb-5">

          <div className="flex items-start justify-between gap-3">

            <div className="min-w-0 flex-1">

              {role && (
                <span className="mb-3 inline-flex max-w-full rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400">
                  <span className="truncate">
                    {role}
                  </span>
                </span>
              )}

              <h2 className="line-clamp-2 text-lg font-semibold leading-6 text-white">
                {title}
              </h2>

              <p className="mt-1 truncate text-sm font-medium text-slate-400">
                {company}
              </p>

            </div>

            <div className="shrink-0 rounded-xl border border-slate-700 bg-slate-950 p-2.5 text-cyan-400">
              💼
            </div>

          </div>

        </div>

        {/* INFORMATION */}

        <div className="mb-5 grid grid-cols-2 gap-2">

          <InfoItem
            label="Location"
            value={location}
          />

          <InfoItem
            label="Work Mode"
            value={workMode}
          />

          <InfoItem
            label="Salary"
            value={salary}
          />

          <InfoItem
            label="Experience"
            value={experience}
          />

        </div>

        {/* JOB TYPE */}

        {jobType && (
          <div className="mb-4">

            <span className="rounded-lg bg-slate-800 px-2.5 py-1.5 text-xs text-slate-300">
              {jobType}
            </span>

          </div>
        )}

        {/* SKILLS */}

        {skills.length > 0 && (
          <div className="mb-5">

            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-600">
              Skills
            </p>

            <div className="flex flex-wrap gap-2">

              {skills
                .slice(0, 5)
                .map((skill, index) => (
                  <span
                    key={
                      skill +
                      "-" +
                      index
                    }
                    className="rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-1.5 text-xs text-slate-400"
                  >
                    {skill}
                  </span>
                ))}

              {skills.length > 5 && (
                <span className="rounded-lg bg-slate-800 px-2.5 py-1.5 text-xs text-slate-500">
                  +{skills.length - 5} more
                </span>
              )}

            </div>

          </div>
        )}

        {/* DESCRIPTION */}

        <div className="mb-6 flex-1">

          <p className="line-clamp-4 text-sm leading-6 text-slate-400">
            {description}
          </p>

        </div>

        {/* APPLY */}

        <div className="mt-auto">

          {applyUrl ? (
            <a
              href={applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-xl bg-cyan-500 px-4 py-3 text-center text-sm font-bold text-slate-950 transition hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/10"
            >
              View & Apply
            </a>
          ) : (
            <div className="block w-full rounded-xl bg-slate-800 px-4 py-3 text-center text-sm font-semibold text-slate-500">
              Application Link Unavailable
            </div>
          )}

          <div className="mt-3 flex items-center justify-between gap-3">

            <p className="truncate text-[11px] text-slate-600">
              Source: {source}
            </p>

            {applyUrl && (
              <span className="shrink-0 text-[11px] text-emerald-500">
                Apply Online
              </span>
            )}

          </div>

        </div>

      </div>
    </article>
  );
}

/* ============================================================
   INFO ITEM
============================================================ */

function InfoItem({
  label,
  value,
}) {
  return (
    <div className="min-h-[68px] rounded-xl border border-slate-800/80 bg-slate-950/70 p-3">

      <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600">
        {label}
      </p>

      <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-300">
        {value || "Not specified"}
      </p>

    </div>
  );
}

/* ============================================================
   LOADING SKELETON
============================================================ */

function JobSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

      <div className="h-1 bg-slate-800" />

      <div className="animate-pulse p-5">

        <div className="mb-5">

          <div className="h-6 w-28 rounded-full bg-slate-800" />

          <div className="mt-4 h-5 w-4/5 rounded bg-slate-800" />

          <div className="mt-2 h-4 w-2/5 rounded bg-slate-800" />

        </div>

        <div className="grid grid-cols-2 gap-2">

          <div className="h-16 rounded-xl bg-slate-800" />
          <div className="h-16 rounded-xl bg-slate-800" />
          <div className="h-16 rounded-xl bg-slate-800" />
          <div className="h-16 rounded-xl bg-slate-800" />

        </div>

        <div className="mt-5 space-y-2">

          <div className="h-3 w-full rounded bg-slate-800" />
          <div className="h-3 w-full rounded bg-slate-800" />
          <div className="h-3 w-3/4 rounded bg-slate-800" />

        </div>

        <div className="mt-6 h-11 rounded-xl bg-slate-800" />

      </div>
    </div>
  );
}

/* ============================================================
   ROLE / LOCATION / WORK MODE HELPERS
============================================================ */

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function isRemoteJob(job) {
  const text = normalize(
    [
      job?.workMode,
      job?.work_mode,
      job?.mode,
      job?.location,
      job?.jobLocation,
      job?.description,
      job?.summary,
    ]
      .flat()
      .join(" ")
  );

  return (
    text.includes("remote") ||
    text.includes("work from home") ||
    text.includes("wfh") ||
    text.includes("work-from-home")
  );
}

function detectWorkMode(job) {
  if (isRemoteJob(job)) {
    return "Remote";
  }

  const text = normalize(
    [
      job?.workMode,
      job?.work_mode,
      job?.mode,
      job?.location,
      job?.jobLocation,
      job?.description,
    ]
      .flat()
      .join(" ")
  );

  if (
    text.includes("hybrid")
  ) {
    return "Hybrid";
  }

  if (
    text.includes("on site") ||
    text.includes("onsite")
  ) {
    return "On-site";
  }

  return "";
}

function matchesWorkMode(job, wantedMode) {
  const detected = normalize(
    [
      job?.workMode,
      job?.work_mode,
      job?.mode,
      job?.location,
      job?.jobLocation,
      job?.description,
      job?.summary,
    ]
      .flat()
      .join(" ")
  );

  if (wantedMode === "Remote") {
    return (
      detected.includes("remote") ||
      detected.includes("work from home") ||
      detected.includes("wfh")
    );
  }

  if (wantedMode === "Hybrid") {
    return detected.includes("hybrid");
  }

  if (wantedMode === "On-site") {
    return (
      detected.includes("on site") ||
      detected.includes("onsite") ||
      detected.includes("office")
    );
  }

  return true;
}

/* ============================================================
   VALUE HELPERS
============================================================ */

function getFirstValue(...values) {
  for (const value of values) {
    if (
      value !== undefined &&
      value !== null &&
      String(value).trim() !== ""
    ) {
      return String(value);
    }
  }

  return "";
}

function normalizeArray(value) {
  if (Array.isArray(value)) {
    return value
      .filter(
        (item) =>
          item !== null &&
          item !== undefined &&
          String(item).trim() !== ""
      )
      .map((item) => {
        if (
          typeof item === "object" &&
          item.name
        ) {
          return String(item.name);
        }

        return String(item);
      });
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  return [];
}

function formatSalary(value) {
  if (
    value === undefined ||
    value === null ||
    value === ""
  ) {
    return "Not specified";
  }

  if (typeof value === "object") {
    const min =
      value.min ??
      value.minimum ??
      value.from;

    const max =
      value.max ??
      value.maximum ??
      value.to;

    const currency =
      value.currency ||
      value.currencyCode ||
      "INR";

    if (
      min !== undefined &&
      max !== undefined
    ) {
      return (
        currency +
        " " +
        formatNumber(min) +
        " - " +
        formatNumber(max)
      );
    }

    if (min !== undefined) {
      return (
        currency +
        " " +
        formatNumber(min) +
        "+"
      );
    }

    if (max !== undefined) {
      return (
        "Up to " +
        currency +
        " " +
        formatNumber(max)
      );
    }

    if (value.text) {
      return String(value.text);
    }

    return "Not specified";
  }

  if (typeof value === "number") {
    return (
      "INR " +
      formatNumber(value)
    );
  }

  return String(value);
}

function formatNumber(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return String(value);
  }

  return number.toLocaleString("en-IN");
}