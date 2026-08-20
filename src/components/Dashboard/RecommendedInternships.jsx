import React, { useEffect, useState } from "react";

const API = "http://localhost:5000";

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
  "Product Manager",
];

/* ============================================================
   HELPERS
============================================================ */

function formatSalary(salary) {
  if (!salary) {
    return "Not specified";
  }

  if (typeof salary === "string") {
    return salary;
  }

  if (typeof salary === "number") {
    return `₹${salary.toLocaleString("en-IN")}`;
  }

  if (typeof salary === "object") {
    // Best value from Indeed/Apify
    if (
      salary.salaryText &&
      typeof salary.salaryText === "string"
    ) {
      return salary.salaryText;
    }

    const min = salary.salaryMin;
    const max = salary.salaryMax;
    const currency =
      salary.salaryCurrency || "INR";

    const symbol =
      currency === "INR"
        ? "₹"
        : currency === "USD"
        ? "$"
        : currency === "EUR"
        ? "€"
        : `${currency} `;

    if (min != null && max != null) {
      return `${symbol}${Number(min).toLocaleString(
        "en-IN"
      )} - ${symbol}${Number(max).toLocaleString(
        "en-IN"
      )}`;
    }

    if (min != null) {
      return `${symbol}${Number(min).toLocaleString(
        "en-IN"
      )}`;
    }

    if (max != null) {
      return `${symbol}${Number(max).toLocaleString(
        "en-IN"
      )}`;
    }
  }

  return "Not specified";
}

function formatSimpleValue(value) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return "Not specified";
  }

  if (typeof value === "string") {
    return value;
  }

  if (typeof value === "number") {
    return String(value);
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (
          typeof item === "object" &&
          item !== null
        ) {
          return (
            item.name ||
            item.title ||
            item.label ||
            JSON.stringify(item)
          );
        }

        return String(item);
      })
      .join(", ");
  }

  if (typeof value === "object") {
    return (
      value.name ||
      value.title ||
      value.label ||
      value.value ||
      value.text ||
      "Not specified"
    );
  }

  return String(value);
}

function formatWhoCanApply(value) {
  if (!value) {
    return [];
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (
          typeof item === "object" &&
          item !== null
        ) {
          return (
            item.name ||
            item.title ||
            item.label ||
            item.text ||
            null
          );
        }

        return String(item);
      })
      .filter(Boolean);
  }

  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  if (typeof value === "object") {
    const text =
      value.name ||
      value.title ||
      value.label ||
      value.text;

    return text ? [text] : [];
  }

  return [];
}

/* ============================================================
   MAIN COMPONENT
============================================================ */

export default function RecommendedInternship() {
  const [internships, setInternships] =
    useState([]);

  const [role, setRole] =
    useState("All Roles");

  const [location, setLocation] =
    useState("Gujarat");

  const [workMode, setWorkMode] =
    useState("All");

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  async function loadInternships() {
    try {
      setLoading(true);
      setError("");

      const params =
        new URLSearchParams();

      if (role !== "All Roles") {
        params.set("role", role);
      }

      params.set("location", location);

      if (workMode !== "All") {
        params.set("workMode", workMode);
      }

      if (search.trim()) {
        params.set(
          "search",
          search.trim()
        );
      }

      const response = await fetch(
        `${API}/api/internships?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error(
          `Server error: ${response.status}`
        );
      }

      const data =
        await response.json();

      console.log(
        "Internship API response:",
        data
      );

      if (!data.success) {
        throw new Error(
          data.message ||
            "Unable to load internships."
        );
      }

      const results =
        Array.isArray(data.internships)
          ? data.internships
          : [];

      setInternships(results);
    } catch (err) {
      console.error(
        "Internship loading error:",
        err
      );

      setError(
        "Unable to load live internships. Make sure server.js is running on port 5000."
      );

      setInternships([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadInternships();
  }, [
    role,
    location,
    workMode,
    search,
  ]);

  return (
    <section className="min-h-screen bg-slate-950 px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            SkillBridge AI
          </p>

          <h1 className="text-3xl font-bold sm:text-4xl">
            Recommended Internships
          </h1>

          <p className="mt-2 max-w-2xl text-slate-400">
            Discover real internship opportunities
            from live job listings and find
            opportunities that match your career
            goals.
          </p>
        </div>

        {/* =====================================================
            FILTERS
        ===================================================== */}

        <div className="mb-8 rounded-2xl border border-slate-800 bg-slate-900/70 p-4 shadow-xl">

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">

            {/* ROLE */}

            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Career Role
              </label>

              <select
                value={role}
                onChange={(e) =>
                  setRole(e.target.value)
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500"
              >
                <option value="All Roles">
                  All Roles
                </option>

                {ROLES.map((item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                ))}
              </select>
            </div>

            {/* LOCATION */}

            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Location
              </label>

              <select
                value={location}
                onChange={(e) =>
                  setLocation(e.target.value)
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500"
              >
                <option value="Gujarat">
                  Gujarat + Remote
                </option>

                <option value="Remote">
                  Remote
                </option>

                <option value="All India">
                  All India
                </option>
              </select>
            </div>

            {/* WORK MODE */}

            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Work Mode
              </label>

              <select
                value={workMode}
                onChange={(e) =>
                  setWorkMode(e.target.value)
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-500"
              >
                <option value="All">
                  All Modes
                </option>

                <option value="On-site">
                  On-site
                </option>

                <option value="Remote">
                  Remote
                </option>

                <option value="Hybrid">
                  Hybrid
                </option>
              </select>
            </div>

            {/* SEARCH */}

            <div>
              <label className="mb-2 block text-sm text-slate-400">
                Search
              </label>

              <input
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search internship..."
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-600 transition focus:border-cyan-500"
              />
            </div>

          </div>
        </div>

        {/* =====================================================
            ERROR
        ===================================================== */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-300">
            {error}
          </div>
        )}

        {/* =====================================================
            LOADING
        ===================================================== */}

        {loading && (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map(
              (item) => (
                <div
                  key={item}
                  className="h-80 animate-pulse rounded-2xl bg-slate-900"
                />
              )
            )}
          </div>
        )}

        {/* =====================================================
            EMPTY
        ===================================================== */}

        {!loading &&
          internships.length === 0 && (
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">

              <div className="mb-3 text-4xl">
                🔎
              </div>

              <h3 className="text-xl font-semibold">
                No matching internships found
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">
                We couldn't find internship listings
                for the selected filters. Try
                another role, location or work mode.
              </p>

              <button
                onClick={loadInternships}
                className="mt-5 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
              >
                Refresh
              </button>

            </div>
          )}

        {/* =====================================================
            RESULTS
        ===================================================== */}

        {!loading &&
          internships.length > 0 && (
            <>
              <div className="mb-4 flex items-center justify-between">

                <p className="text-sm text-slate-400">
                  {internships.length} internship
                  {internships.length !== 1
                    ? "s"
                    : ""}{" "}
                  found
                </p>

                <button
                  onClick={loadInternships}
                  className="rounded-lg border border-slate-700 px-3 py-2 text-xs text-slate-300 transition hover:border-cyan-500 hover:text-cyan-400"
                >
                  Refresh
                </button>

              </div>

              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                {internships.map(
                  (internship, index) => (
                    <InternshipCard
                      key={
                        internship.id ||
                        internship.jobId ||
                        internship.url ||
                        index
                      }
                      internship={internship}
                    />
                  )
                )}

              </div>
            </>
          )}

      </div>
    </section>
  );
}

/* ============================================================
   INTERNSHIP CARD
============================================================ */

function InternshipCard({
  internship,
}) {
  const whoCanApply =
    formatWhoCanApply(
      internship.whoCanApply
    );

  const salary =
    formatSalary(
      internship.salary
    );

  const description =
    formatSimpleValue(
      internship.description
    );

  const title =
    formatSimpleValue(
      internship.title
    );

  const company =
    formatSimpleValue(
      internship.company
    );

  const internshipLocation =
    formatSimpleValue(
      internship.location
    );

  const workMode =
    formatSimpleValue(
      internship.workMode
    );

  const duration =
    formatSimpleValue(
      internship.duration
    );

  const source =
    formatSimpleValue(
      internship.source
    );

  const applyUrl =
    internship.applyUrl ||
    internship.url ||
    internship.link ||
    "#";

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900/80 p-5 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-cyan-500/50 hover:shadow-cyan-500/5">

      {/* =====================================================
          ROLE
      ===================================================== */}

      <div className="mb-4">

        <span className="inline-flex rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400">
          {formatSimpleValue(
            internship.role
          )}
        </span>

        <h2 className="mt-3 text-lg font-semibold leading-snug">
          {title}
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          {company}
        </p>

      </div>

      {/* =====================================================
          INFORMATION
      ===================================================== */}

      <div className="mb-4 grid grid-cols-2 gap-2">

        <Info
          label="Location"
          value={internshipLocation}
        />

        <Info
          label="Work Mode"
          value={workMode}
        />

        <Info
          label="Duration"
          value={duration}
        />

        <Info
          label="Stipend"
          value={salary}
        />

      </div>

      {/* =====================================================
          WHO CAN APPLY
      ===================================================== */}

      {whoCanApply.length > 0 && (
        <div className="mb-4">

          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
            Who can apply
          </p>

          <div className="flex flex-wrap gap-2">

            {whoCanApply
              .slice(0, 4)
              .map((person, index) => (
                <span
                  key={`${person}-${index}`}
                  className="rounded-lg bg-slate-800 px-2 py-1 text-xs text-slate-300"
                >
                  {person}
                </span>
              ))}

          </div>
        </div>
      )}

      {/* =====================================================
          DESCRIPTION
      ===================================================== */}

      <p className="mb-5 line-clamp-4 text-sm leading-6 text-slate-400">
        {description !==
        "Not specified"
          ? description
          : "View the official listing for complete internship details."}
      </p>

      {/* =====================================================
          APPLY
      ===================================================== */}

      <div className="mt-auto">

        {applyUrl !== "#" ? (
          <a
            href={applyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full rounded-xl bg-cyan-500 px-4 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            View & Apply
          </a>
        ) : (
          <button
            disabled
            className="block w-full cursor-not-allowed rounded-xl bg-slate-700 px-4 py-3 text-center text-sm font-semibold text-slate-400"
          >
            Application Link Unavailable
          </button>
        )}

        <p className="mt-2 text-center text-[11px] text-slate-600">
          Source: {source}
        </p>

      </div>

    </article>
  );
}

/* ============================================================
   INFO COMPONENT
============================================================ */

function Info({
  label,
  value,
}) {
  return (
    <div className="rounded-xl bg-slate-950/80 p-3">

      <p className="text-[10px] uppercase tracking-wide text-slate-600">
        {label}
      </p>

      <p className="mt-1 line-clamp-2 text-xs text-slate-300">
        {formatSimpleValue(value)}
      </p>

    </div>
  );
}