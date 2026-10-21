import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAuth } from "../context/AuthContext";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaSignInAlt } from "react-icons/fa";
import webLogo from "../../public/webLogo.png";
import SEO from "../components/SEO";

export default function Login() {
  const { t, i18n } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const lang = i18n.language || "en";
  const isRtl = lang === "ur" || lang === "ar";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.error ||
          (isRtl
            ? "فشل تسجيل الدخول. يرجى التحقق من صحة البيانات."
            : "Login failed. Please check your credentials.")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      dir={isRtl ? "rtl" : "ltr"}
      className="min-h-[82vh] flex items-center justify-center bg-slate-50/60 py-12 px-4 font-serif"
    >
      <SEO
        title={`${t("auth.login") || (isRtl ? "تسجيل الدخول" : "Login")} | Jamia Darul Uloom Shah Mansoor`}
        description="Login to access your student or scholar portal at Jamia Darul Uloom Shah Mansoor."
      />

      <div className="w-full max-w-md">
        {/* Header Branding */}
        <div className="text-center mb-8">
          <Link className="inline-block group mb-3" to="/">
            <div className="w-16 h-16 mx-auto bg-emerald-50 border border-emerald-200/80 rounded-2xl p-1.5 flex items-center justify-center shadow-xs group-hover:border-amber-400 transition-colors duration-300">
              <img
                src={webLogo}
                alt="Jamia Logo"
                className="w-full h-full object-contain rounded-xl"
              />
            </div>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 tracking-tight">
            {t("auth.login") || (isRtl ? "تسجيل الدخول" : "Login to Portal")}
          </h1>
          <p className="text-slate-600 mt-1 text-xs sm:text-sm font-sans">
            {t("auth.welcome") ||
              (isRtl
                ? "مرحباً بك في البوابة الإلكترونية"
                : "Welcome back to your account")}
          </p>
        </div>

        {/* Card Form Wrapper */}
        <div className="bg-white border border-emerald-100 rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-900 via-amber-400 to-emerald-900"></div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs sm:text-sm font-sans">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-emerald-950 mb-2">
                {t("auth.email") || (isRtl ? "البريد الإلكتروني" : "Email Address")}
              </label>
              <div className="relative">
                <FaEnvelope
                  className="absolute top-3.5 start-3.5 text-emerald-800/50"
                  size={14}
                />
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="user@jamia.edu.pk"
                  className="w-full ps-10 pe-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-sans focus:outline-none focus:border-amber-400 focus:bg-white transition"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-emerald-950 mb-2">
                {t("auth.password") || (isRtl ? "كلمة المرور" : "Password")}
              </label>
              <div className="relative">
                <FaLock
                  className="absolute top-3.5 start-3.5 text-emerald-800/50"
                  size={14}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  minLength="6"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  placeholder="••••••••"
                  className="w-full ps-10 pe-10 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-sans focus:outline-none focus:border-amber-400 focus:bg-white transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-3.5 end-3.5 text-slate-400 hover:text-emerald-900 transition"
                  tabIndex="-1"
                >
                  {showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-end">
              <Link
                className="text-xs text-amber-700 hover:text-amber-800 font-semibold font-sans transition"
                to="/forgot-password"
              >
                {t("auth.forgotPassword") ||
                  (isRtl ? "نسيت كلمة المرور؟" : "Forgot Password?")}
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-900 hover:bg-emerald-950 text-amber-100 font-bold py-3 rounded-xl transition shadow-md flex items-center justify-center gap-2 text-sm disabled:opacity-60"
            >
              <FaSignInAlt size={14} />
              <span>
                {loading
                  ? "..."
                  : t("auth.loginBtn") || (isRtl ? "دخول" : "Login")}
              </span>
            </button>
          </form>
        </div>

        {/* Register Account Link */}
        <p className="text-center text-xs sm:text-sm text-slate-600 mt-6 font-sans">
          {t("auth.noAccount") ||
            (isRtl ? "ليس لديك حساب؟" : "Don't have an account?")}{" "}
          <Link
            className="text-emerald-900 font-bold hover:text-amber-600 transition underline ms-1"
            to="/register"
          >
            {t("auth.register") || (isRtl ? "التسجيل" : "Register here")}
          </Link>
        </p>
      </div>
    </div>
  );
}