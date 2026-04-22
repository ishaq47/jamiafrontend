import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { FaEnvelope, FaLock } from 'react-icons/fa';

export default function Login() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-green-50 to-yellow-50 py-12 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="bg-green-900 text-white text-center py-8">
          <h2 className="text-3xl font-bold">{t('auth.login')}</h2>
          <p className="text-yellow-300 mt-2">{t('auth.welcome')}</p>
        </div>
        <form onSubmit={handleSubmit} className="p-8 space-y-4">
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded">{error}</div>
          )}
          <div className="relative">
            <FaEnvelope className="absolute top-4 start-3 text-gray-400" />
            <input
              type="email"
              required
              placeholder={t('auth.email')}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full ps-10 pe-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <div className="relative">
            <FaLock className="absolute top-4 start-3 text-gray-400" />
            <input
              type="password"
              required
              placeholder={t('auth.password')}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full ps-10 pe-3 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>
          <button
            disabled={loading}
            className="w-full bg-green-800 hover:bg-green-700 text-white py-3 rounded-lg font-bold disabled:opacity-60"
          >
            {loading ? '...' : t('auth.loginBtn')}
          </button>
          <p className="text-center text-sm text-gray-600">
            {t('auth.noAccount')}{' '}
            <Link to="/register" className="text-green-700 font-bold hover:underline">
              {t('auth.register')}
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}