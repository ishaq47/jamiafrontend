import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import API from '../api/axios';
import { FaLock, FaEye, FaEyeSlash, FaCheckCircle, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import webLogo from '../../public/webLogo.png';
import SEO from '../components/SEO';

export default function ResetPassword() {
  const { t, i18n } = useTranslation();
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const lang = i18n.language || 'en';
  const isRtl = lang === 'ur' || lang === 'ar';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await API.post(`/auth/reset-password/${token}`, { password });
      alert(
        t('auth.resetSuccess') ||
          (isRtl
            ? 'تم تغيير كلمة المرور بنجاح. يمكنك الآن تسجيل الدخول.'
            : 'Password reset successfully! You can now log in.')
      );
      navigate('/login');
    } catch (err) {
      setError(
        err.response?.data?.error ||
          (isRtl
            ? 'حدث خطأ أو انتهت صلاحية الرابط. يرجى المحاولة مرة أخرى.'
            : 'Error resetting password or link expired.')
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className="min-h-[82vh] flex items-center justify-center bg-slate-50/60 py-12 px-4 font-serif"
    >
      <SEO
        title={`${t('auth.resetPassword') || (isRtl ? 'إعادة ضبط كلمة المرور' : 'Reset Password')} | Jamia Darul Uloom Shah Mansoor`}
        description="Set your new account password for Jamia Darul Uloom Shah Mansoor portal."
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
            {t('auth.resetPassword') || (isRtl ? 'تعيين كلمة مرور جديدة' : 'New Password')}
          </h1>
          <p className="text-slate-600 mt-1 text-xs sm:text-sm font-sans">
            {isRtl
              ? 'أدخل كلمة المرور الجديدة لحسابك'
              : 'Please enter your new password to secure your account'}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white border border-emerald-100 rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-900 via-amber-400 to-emerald-900"></div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Error Feedback */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs sm:text-sm font-sans">
                {error}
              </div>
            )}

            {/* New Password Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-emerald-950 mb-2">
                {t('auth.newPassword') || (isRtl ? 'كلمة المرور الجديدة' : 'New Password')}
              </label>
              <div className="relative">
                <FaLock
                  className="absolute top-3.5 start-3.5 text-emerald-800/50"
                  size={14}
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  minLength="6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-900 hover:bg-emerald-950 text-amber-100 font-bold py-3 rounded-xl transition shadow-md flex items-center justify-center gap-2 text-sm disabled:opacity-60"
            >
              <FaCheckCircle size={14} />
              <span>
                {loading
                  ? '...'
                  : t('auth.resetPassword') || (isRtl ? 'حفظ كلمة المرور' : 'Reset Password')}
              </span>
            </button>
          </form>
        </div>

        {/* Back to Login Link */}
        <div className="text-center mt-6">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-xs sm:text-sm text-emerald-900 font-bold hover:text-amber-600 font-sans transition"
          >
            {isRtl ? <FaArrowRight size={12} /> : <FaArrowLeft size={12} />}
            <span>{t('common.back') || (isRtl ? 'العودة إلى تسجيل الدخول' : 'Back to Login')}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}