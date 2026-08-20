import { Routes, Route } from "react-router-dom";

// Landing / Authentication
import Landing from "./pages/Landing/Landing";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";

// Onboarding
import Welcome from "./pages/Onboarding/Welcome";
import ProfileSetup from "./pages/Onboarding/ProfileSetup";
import UploadResume from "./pages/Onboarding/UploadResume";
import CareerGoal from "./pages/Onboarding/CareerGoal";
import AIAnalysis from "./pages/Onboarding/AIAnalysis";

// Dashboard Layout
import DashboardLayout from "./pages/Dashboard/DashboardLayout";

// Dashboard
import DashboardHome from "./pages/Dashboard/DashboardHome";

// Resume
import Resume from "./pages/Dashboard/Resume";
import ResumeAnalyzer from "./pages/Dashboard/ResumeAnalyzer";
import ResumeBuilder from "./pages/Resume/ResumeBuilder";

// Career
import SkillGap from "./pages/Dashboard/SkillGap";
import Roadmap from "./pages/Dashboard/Roadmap";
import CareerRoadmap from "./pages/Dashboard/CareerRoadmap";

// Profile / Settings
import Profile from "./pages/Dashboard/Profile";
import Settings from "./pages/Dashboard/Settings";

// Jobs / Internships
import Internship from "./pages/Dashboard/Internship";
import Jobs from "./pages/Dashboard/Jobs";
import JobDetails from "./pages/Dashboard/JobDetails";
import AppliedJobs from "./pages/Dashboard/AppliedJobs";

// Interviews
import Interview from "./pages/Dashboard/Interview";
import InterviewPractice from "./pages/Dashboard/InterviewPractice";
import InterviewResult from "./pages/Dashboard/InterviewResult";
import TechnicalInterview from "./pages/Dashboard/TechnicalInterview";
import MockInterview from "./pages/Dashboard/MockInterview";
import Aptitude from "./pages/Dashboard/Aptitude";
import HRInterview from "./pages/Dashboard/HRInterview";

// Analytics
import Analytics from "./pages/Dashboard/analytics";


function App() {
  return (
    <Routes>

      {/* =====================================================
          PUBLIC ROUTES
      ===================================================== */}

      <Route
        path="/"
        element={<Landing />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/signup"
        element={<Signup />}
      />

      {/* =====================================================
          ONBOARDING ROUTES
      ===================================================== */}

      <Route
        path="/welcome"
        element={<Welcome />}
      />

      <Route
        path="/profile-setup"
        element={<ProfileSetup />}
      />

      <Route
        path="/upload-resume"
        element={<UploadResume />}
      />

      <Route
        path="/career-goal"
        element={<CareerGoal />}
      />

      <Route
        path="/ai-analysis"
        element={<AIAnalysis />}
      />

      {/* =====================================================
          DASHBOARD ROUTES
          All routes below use DashboardLayout
      ===================================================== */}

      <Route element={<DashboardLayout />}>

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={<DashboardHome />}
        />

        {/* =================================================
            RESUME
        ================================================= */}

        <Route
          path="/resume"
          element={<Resume />}
        />

        <Route
          path="/resume-analyzer"
          element={<ResumeAnalyzer />}
        />

        <Route
          path="/resume-builder"
          element={<ResumeBuilder />}
        />

        {/* =================================================
            SKILLS & CAREER
        ================================================= */}

        <Route
          path="/skill-gap"
          element={<SkillGap />}
        />

        <Route
          path="/roadmap"
          element={<Roadmap />}
        />

        <Route
          path="/career-roadmap"
          element={<CareerRoadmap />}
        />

        {/* =================================================
            PROFILE / SETTINGS
        ================================================= */}

        <Route
          path="/profile"
          element={<Profile />}
        />

        <Route
          path="/settings"
          element={<Settings />}
        />

        {/* =================================================
            INTERNSHIPS
        ================================================= */}

        <Route
          path="/internships"
          element={<Internship />}
        />

        {/* =================================================
            JOBS
        ================================================= */}

        <Route
          path="/jobs"
          element={<Jobs />}
        />

        <Route
          path="/job-details/:id"
          element={<JobDetails />}
        />

        <Route
          path="/applied-jobs"
          element={<AppliedJobs />}
        />

        {/* =================================================
            INTERVIEW
        ================================================= */}

        <Route
          path="/interview"
          element={<Interview />}
        />

        <Route
          path="/interview/:category"
          element={<InterviewPractice />}
        />

        <Route
          path="/interview/result"
          element={<InterviewResult />}
        />

        <Route
          path="/technical"
          element={<TechnicalInterview />}
        />

        <Route
          path="/aptitude"
          element={<Aptitude />}
        />

        <Route
          path="/hr-interview"
          element={<HRInterview />}
        />

        <Route
          path="/mock-interview"
          element={<MockInterview />}
        />

        {/* =================================================
            ANALYTICS
        ================================================= */}

        <Route
          path="/analytics"
          element={<Analytics />}
        />

      </Route>

    </Routes>
  );
}

export default App;