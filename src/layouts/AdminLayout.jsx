import { useState, useEffect } from "react";
import Navbar from "../components/admin/Navbar";
import Sidebar from "../components/admin/Sidebar";
import Footer from "../components/admin/Footer";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";


function AdminLayout() {
  const { accessToken } = useAuth();

  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    return localStorage.getItem("sb|sidebar-toggle") === "true";
  });

  useEffect(() => {
    localStorage.setItem("sb|sidebar-toggle", isSidebarOpen);
  }, [isSidebarOpen]);

  return (
    <>
    <link rel="stylesheet" href="/css/admin.css" media="all"/>

    <div className={isSidebarOpen ? "sb-sidenav-toggled" : ""}>
      <Navbar onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />
      <div id="layoutSidenav">
        <Sidebar />
        <div id="layoutSidenav_content">
          <main>
            <div className="container-fluid px-4">
              {accessToken ? <Outlet /> : <Navigate to="/auth/login" replace />}
            </div>
          </main>
          <Footer />
        </div>
      </div>
    </div>
    </>
  );
}

export default AdminLayout