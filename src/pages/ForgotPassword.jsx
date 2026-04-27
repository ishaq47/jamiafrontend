import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import API from '../api/axios';
import { FaEnvelope } from 'react-icons/fa';

export default function ForgotPassword() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setMessage(''); setLoading(true);
    try {
      await API.post('/auth/forgot-password', { email });
      setMessage(t('auth.resetEmailSent'));
    } catch (err) {
      setError(err.response?.data?.error || 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-slate-50 to-yellow-50 py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-slate-900 text-white text-center py-8">
          <h2 className="text-3xl font-bold">{t('auth.forgotPassword')}</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          {error && <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>}
          {message && <div className="bg-green-100 text-green-700 p-3 rounded">{message}</div>}
          <div className="relative">
            <FaEnvelope className="absolute top-4 start-3 text-gray-400" />
            <input
              type="email" required placeholder={t('auth.email')} value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full ps-10 pe-3 py-3 border rounded-lg"
            />
          </div>
          <button disabled={loading} className="w-full bg-slate-800 text-white py-3 rounded-lg font-bold disabled:opacity-60">
            {loading ? '...' : t('auth.sendResetLink')}
          </button>
          <Link to="/login" className="block text-center text-slate-700 text-sm">{t('common.back')}</Link>
        </form>
      </div>
    </div>
  );
}