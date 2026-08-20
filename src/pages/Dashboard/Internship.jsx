import RecommendedInternships from "../../components/Dashboard/RecommendedInternships";
import { Briefcase, Sparkles, TrendingUp } from "lucide-react";

export default function Internship() {
  return (
    <main className="min-h-screen bg-slate-950 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">

        {/* ================= PAGE HEADER ================= */}
        <section className="mb-8">

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <div className="mb-3 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                  <Briefcase
                    size={18}
                    className="text-cyan-400"
                  />
                </div>

                <span className="text-sm font-semibold text-cyan-400">
                  CAREER OPPORTUNITIES
                </span>
              </div>

              <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Find Your Next Internship
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 sm:text-base">
                Discover internship opportunities matched with your career
                interests and skills. Explore, compare and apply to your next
                opportunity.
              </p>
            </div>

            {/* ================= QUICK STATS ================= */}
            <div className="flex flex-wrap gap-3">

              <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/10">
                  <Sparkles
                    size={18}
                    className="text-cyan-400"
                  />
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Smart Matching
                  </p>

                  <p className="text-sm font-semibold text-white">
                    AI Powered
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-slate-800 bg-slate-900/60 px-4 py-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10">
                  <TrendingUp
                    size={18}
                    className="text-violet-400"
                  />
                </div>

                <div>
                  <p className="text-xs text-slate-500">
                    Opportunities
                  </p>

                  <p className="text-sm font-semibold text-white">
                    Live Listings
                  </p>
                </div>
              </div>

            </div>

          </div>

        </section>

        {/* ================= INTERNSHIP CONTENT ================= */}
        <section className="rounded-3xl border border-slate-800 bg-slate-950/40">

          <RecommendedInternships />

        </section>

      </div>
    </main>
  );
}