import Topbar from "./Topbar";
import DashboardHeader from "./DashboardHeader";
import DashboardStats from "./DashboardStats";
import DashboardCharts from "./DashboardCharts";
import DashboardBottom from "./DashboardBottom";
import DashboardRight from "./DashboardRight";

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#08111f]">

      {/* Main Content */}
      <div className="flex-1">

        <Topbar />

        <div className="p-6 space-y-6">

          <DashboardHeader />

          <DashboardStats />

          <DashboardCharts />

          <DashboardBottom />

        </div>

      </div>

      {/* Right Sidebar */}
      <DashboardRight />

    </div>
  );
}

export default Dashboard;