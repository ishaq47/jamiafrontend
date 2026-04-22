import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import API from '../api/axios';
import { FaLock } from 'react-icons/fa';

export default function ResetPassword() {
  const { t } = useTranslation();
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await API.post(`/auth/reset-password/${token}`, { password });
      alert(t('auth.resetSuccess'));
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-green-50 to-yellow-50 py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-green-900 text-white text-center py-8">
          <h2 className="text-3xl font-bold">{t('auth.resetPassword')}</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          {error && <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>}
          <div className="relative">
            <FaLock className="absolute top-4 start-3 text-gray-400" />
            <input
              type="password" required minLength="6"
              placeholder={t('auth.newPassword')} value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full ps-10 pe-3 py-3 border rounded-lg"
            />
          </div>
          <button disabled={loading} className="w-full bg-green-800 text-white py-3 rounded-lg font-bold disabled:opacity-60">
            {loading ? '...' : t('auth.resetPassword')}
          </button>
          <Link to="/login" className="block text-center text-green-700 text-sm">{t('common.back')}</Link>
        </form>
      </div>
    </div>
  );
}