import { useState } from "react";
import { NavLink, Outlet, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";

import {
  FaFileAlt,
  FaNewspaper,
  FaQuestion,
  FaTachometerAlt,
  FaUsers,
  FaBars,
  FaTimes,
} from "react-icons/fa";

import { FaBackward } from "react-icons/fa6";

export default function AdminLayout() {
  const { t } = useTranslation();
  const { user, loading } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" />;
  }

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
      isActive
        ? "bg-white text-slate-900 font-bold"
        : "text-white hover:bg-slate-700"
    }`;

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-slate-900 text-white px-4 py-3 flex justify-between items-center">
        <h2 className="font-bold text-lg">{t("admin.dashboard")}</h2>

        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
    fixed md:top-0 top-0 left-0 z-40
    h-screen w-64 bg-slate-900 text-white p-5
    transform transition-transform duration-300
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
    md:translate-x-0
  `}
      >
        <h2 className="text-2xl font-bold mb-8 mt-12 md:mt-0">
          {t("admin.dashboard")}
        </h2>

        <nav className="space-y-2">
          <NavLink to="/admin" end className={linkClass} onClick={closeSidebar}>
            <FaTachometerAlt />
            {t("admin.dashboard")}
          </NavLink>

          <NavLink
            to="/admin/news"
            className={linkClass}
            onClick={closeSidebar}
          >
            <FaNewspaper />
            {t("admin.manageNews")}
          </NavLink>

          <NavLink
            to="/admin/questions"
            className={linkClass}
            onClick={closeSidebar}
          >
            <FaQuestion />
            {t("admin.manageQuestions")}
          </NavLink>

          <NavLink
            to="/admin/users"
            className={linkClass}
            onClick={closeSidebar}
          >
            <FaUsers />
            {t("admin.manageUsers")}
          </NavLink>

          <NavLink
            to="/admin/applications"
            className={linkClass}
            onClick={closeSidebar}
          >
            <FaFileAlt />
            Applications
          </NavLink>

          <NavLink to="/" className={linkClass} onClick={closeSidebar}>
            <FaBackward />
            {t("admin.backToHome")}
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 mt-16 md:mt-0 md:ml-64 overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}
