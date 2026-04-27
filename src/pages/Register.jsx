import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';

export default function Register() {
  const { t } = useTranslation();
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setLoading(true);
    try {
      await register(form.name, form.email, form.password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">{t('auth.register')}</h1>
          <p className="text-slate-600 mt-1 text-sm">Create your account</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && <div className="bg-red-50 text-red-700 p-3 rounded text-sm">{error}</div>}
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">{t('auth.name')}</label>
              <div className="relative">
                <FaUser className="absolute top-3.5 start-3 text-slate-400" size={14} />
                <input
                  type="text" required value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full ps-10 pe-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">{t('auth.email')}</label>
              <div className="relative">
                <FaEnvelope className="absolute top-3.5 start-3 text-slate-400" size={14} />
                <input
                  type="email" required value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full ps-10 pe-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">{t('auth.password')}</label>
              <div className="relative">
                <FaLock className="absolute top-3.5 start-3 text-slate-400" size={14} />
                <input
                  type="password" required minLength="6" value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full ps-10 pe-3 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:border-slate-900"
                />
              </div>
            </div>
            <button 
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 rounded-lg disabled:opacity-60"
            >
              {loading ? '...' : t('auth.registerBtn')}
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-slate-600 mt-6">
          {t('auth.hasAccount')}{' '}
          <Link to="/login" className="text-slate-900 font-medium hover:underline">
            {t('auth.login')}
          </Link>
        </p>
      </div>
    </div>
  );
}