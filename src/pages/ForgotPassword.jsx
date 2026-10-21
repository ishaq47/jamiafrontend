import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import API from '../api/axios';
import { FaEnvelope, FaPaperPlane, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import webLogo from '../../public/webLogo.png';
import SEO from '../components/SEO';

export default function ForgotPassword() {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const lang = i18n.language || 'en';
  const isRtl = lang === 'ur' || lang === 'ar';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setLoading(true);

    try {
      await API.post('/auth/forgot-password', { email });
      setMessage(
        t('auth.resetEmailSent') ||
          (isRtl
            ? 'تم ارسال رابط إعادة ضبط كلمة المرور إلى بريدك الإلكتروني.'
            : 'Password reset link has been sent to your email.')
      );
      setEmail('');
    } catch (err) {
      setError(
        err.response?.data?.error ||
          (isRtl
            ? 'حدث خطأ. يرجى التأكد من صحة البريد الإلكتروني.'
            : 'Failed to send reset link. Please try again.')
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
        title={`${t('auth.forgotPassword') || (isRtl ? 'استعادة كلمة المرور' : 'Forgot Password')} | Jamia Darul Uloom Shah Mansoor`}
        description="Reset your password to regain access to your Jamia Darul Uloom Shah Mansoor portal account."
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
            {t('auth.forgotPassword') || (isRtl ? 'استعادة كلمة المرور' : 'Reset Password')}
          </h1>
          <p className="text-slate-600 mt-1 text-xs sm:text-sm font-sans">
            {isRtl
              ? 'أدخل بريدك الإلكتروني لتلقي رابط إعادت ضبط كلمة السر'
              : 'Enter your registered email to receive a password reset link'}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white border border-emerald-100 rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-900 via-amber-400 to-emerald-900"></div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Feedback Alerts */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs sm:text-sm font-sans">
                {error}
              </div>
            )}
            {message && (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-3 rounded-xl text-xs sm:text-sm font-sans">
                {message}
              </div>
            )}

            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-emerald-950 mb-2">
                {t('auth.email') || (isRtl ? 'البريد الإلكتروني' : 'Email Address')}
              </label>
              <div className="relative">
                <FaEnvelope
                  className="absolute top-3.5 start-3.5 text-emerald-800/50"
                  size={14}
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@jamia.edu.pk"
                  className="w-full ps-10 pe-3 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-sm font-sans focus:outline-none focus:border-amber-400 focus:bg-white transition"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-900 hover:bg-emerald-950 text-amber-100 font-bold py-3 rounded-xl transition shadow-md flex items-center justify-center gap-2 text-sm disabled:opacity-60"
            >
              <FaPaperPlane size={13} />
              <span>
                {loading
                  ? '...'
                  : t('auth.sendResetLink') || (isRtl ? 'إرسال رابط الضبط' : 'Send Reset Link')}
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