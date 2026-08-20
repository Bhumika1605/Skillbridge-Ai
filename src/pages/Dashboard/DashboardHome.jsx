import CareerAnalytics from "../../components/Dashboard/CareerAnalytics";
import SkillGapAnalysis from "../../components/Dashboard/SkillGapAnalysis";
import LearningRoadmap from "../../components/Dashboard/LearningRoadmap";
import ResumeStatus from "../../components/Dashboard/ResumeStatus";
import CareerGoalProgress from "../../components/Dashboard/CareerGoalProgress";
import RecentAchievements from "../../components/Dashboard/RecentAchievements";
import CareerActionCenter from "../../components/Dashboard/CareerActionCenter";

import DashboardHeader from "./DashboardHeader";

function DashboardHome() {
  return (
    <main
      className="
        min-h-full
        w-full
        bg-[#0b1220]
        px-3
        py-4
        text-white
        sm:px-4
        lg:px-5
        xl:px-6
        space-y-5
      "
    >
      {/* =====================================================
          DASHBOARD HEADER
      ===================================================== */}

      <section className="w-full">
        <DashboardHeader />
      </section>

      {/* =====================================================
          CAREER ANALYTICS + RESUME HEALTH
      ===================================================== */}

      <section
        className="
          grid
          w-full
          grid-cols-1
          items-stretch
          gap-5
          xl:grid-cols-12
        "
      >
        {/* Career Analytics */}

        <div
          className="
            min-w-0
            xl:col-span-8
          "
        >
          <div className="h-full min-h-[420px]">
            <CareerAnalytics />
          </div>
        </div>

        {/* Resume Health */}

        <div
          className="
            min-w-0
            xl:col-span-4
          "
        >
          <div className="h-full min-h-[420px]">
            <ResumeStatus />
          </div>
        </div>
      </section>

      {/* =====================================================
          SKILL GAP + CAREER GOAL
      ===================================================== */}

      <section
        className="
          grid
          w-full
          grid-cols-1
          items-stretch
          gap-5
          xl:grid-cols-12
        "
      >
        {/* Skill Gap */}

        <div
          className="
            min-w-0
            xl:col-span-8
          "
        >
          <div className="h-full">
            <SkillGapAnalysis />
          </div>
        </div>

        {/* Career Goal */}

        <div
          className="
            min-w-0
            xl:col-span-4
          "
        >
          <div className="h-full">
            <CareerGoalProgress />
          </div>
        </div>
      </section>

      {/* =====================================================
          CAREER ACTION CENTER
      ===================================================== */}

      <section className="w-full">
        <div className="w-full">
          <CareerActionCenter />
        </div>
      </section>

      {/* =====================================================
          LEARNING ROADMAP + ACHIEVEMENTS
      ===================================================== */}

      <section
        className="
          grid
          w-full
          grid-cols-1
          items-stretch
          gap-5
          xl:grid-cols-12
        "
      >
        {/* Learning Roadmap */}

        <div
          className="
            min-w-0
            xl:col-span-8
          "
        >
          <div className="h-full">
            <LearningRoadmap />
          </div>
        </div>

        {/* Recent Achievements */}

        <div
          className="
            min-w-0
            xl:col-span-4
          "
        >
          <div className="h-full">
            <RecentAchievements />
          </div>
        </div>
      </section>

      {/* =====================================================
          BOTTOM SPACING
      ===================================================== */}

      <div className="h-2" />
    </main>
  );
}

export default DashboardHome;