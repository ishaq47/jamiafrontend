import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { FaQuestionCircle, FaPaperPlane } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';

export default function Hero() {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return navigate('/login');
    try {
      setLoading(true);
      await API.post('/questions', {
        question,
        language: i18n.language,
        category: 'general',
      });
      setMessage(t('qa.submitSuccess'));
      setQuestion('');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-green-900 text-white py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1564769625905-50e93615e769?w=1600')] bg-cover bg-center opacity-15"></div>
      <div className="relative max-w-7xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
        {/* Left: Intro */}
        <div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {t('hero.title')}
          </h1>
          <p className="text-xl text-yellow-300 mb-6">{t('hero.subtitle')}</p>
          <p className="text-green-100 mb-8 leading-relaxed">
            {t('about.description')}
          </p>
          <button className="bg-yellow-500 hover:bg-yellow-400 text-green-900 font-bold px-8 py-3 rounded-full transition shadow-lg">
            {t('hero.cta')}
          </button>
        </div>

        {/* Right: Ask Question Box */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
          <div className="flex items-center gap-3 mb-4">
            <FaQuestionCircle className="text-4xl text-yellow-400" />
            <div>
              <h2 className="text-2xl font-bold">{t('hero.askTitle')}</h2>
              <p className="text-sm text-green-200">{t('hero.askSubtitle')}</p>
            </div>
          </div>

          {user ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={t('hero.askPlaceholder')}
                required
                rows="5"
                className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-500 hover:bg-yellow-400 text-green-900 font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition disabled:opacity-60"
              >
                <FaPaperPlane />
                {loading ? '...' : t('hero.askButton')}
              </button>
              {message && (
                <p className="text-center text-yellow-300 font-medium">
                  {message}
                </p>
              )}
            </form>
          ) : (
            <div className="text-center py-6">
              <p className="mb-4 text-green-100">{t('hero.loginToAsk')}</p>
              <div className="flex gap-3 justify-center">
                <Link
                  to="/login"
                  className="bg-yellow-500 hover:bg-yellow-400 text-green-900 font-bold px-6 py-2 rounded-lg"
                >
                  {t('auth.login')}
                </Link>
                <Link
                  to="/register"
                  className="bg-white/20 hover:bg-white/30 text-white font-bold px-6 py-2 rounded-lg border border-white/40"
                >
                  {t('auth.register')}
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}