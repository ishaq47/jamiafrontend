import { NavLink, Outlet, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../../context/AuthContext";
import { FaNewspaper, FaQuestion, FaTachometerAlt, FaUsers } from "react-icons/fa";
import { BsBack } from "react-icons/bs";
import { FaBackward } from "react-icons/fa6";

export default function AdminLayout() {
  const { t } = useTranslation();
  const { user, loading } = useAuth();

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (!user || user.role !== "admin") return <Navigate to="/login" />;

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
      isActive
        ? "bg-yellow-500 text-green-900 font-bold"
        : "text-white hover:bg-green-700"
    }`;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-green-900 text-white p-5 hidden md:block">
        <h2 className="text-2xl font-bold mb-8 text-yellow-400">
          {t("admin.dashboard")}
        </h2>
        <nav className="space-y-2">
          <NavLink to="/admin" end className={linkClass}>
            <FaTachometerAlt /> {t("admin.dashboard")}
          </NavLink>
          <NavLink to="/admin/news" className={linkClass}>
            <FaNewspaper /> {t("admin.manageNews")}
          </NavLink>
          <NavLink to="/admin/questions" className={linkClass}>
            <FaQuestion /> {t("admin.manageQuestions")}
          </NavLink>
          <NavLink to="/admin/users" className={linkClass}>
            <FaUsers /> {t("admin.manageUsers")}
          </NavLink>
          <NavLink to="/" className={linkClass}>
            <FaBackward /> {t("admin.backToHome")}
          </NavLink>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
