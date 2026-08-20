import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex bg-slate-900 min-h-screen">

      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex-1 h-screen overflow-y-auto">

        <Topbar
          setSidebarOpen={setSidebarOpen}
        />

        <div className="p-6">

          <Outlet />

        </div>

      </div>

    </div>
  );
}

export default DashboardLayout;