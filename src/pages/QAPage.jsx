import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { FaSearch, FaQuestionCircle, FaPaperPlane } from 'react-icons/fa';
import QuestionCard from '../components/QuestionCard';
import Pagination from '../components/Pagination';
import PageHeader from '../components/PageHeader';
import SEO from '../components/SEO';
import { faqSchema } from '../utils/seoSchemas';

const categories = ['all', 'general', 'fiqh', 'aqeedah', 'hadith', 'tafseer', 'seerah', 'family'];

export default function QAPage() {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const [data, setData] = useState({ questions: [], pages: 1 });
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);
  const [question, setQuestion] = useState('');
  const [qCategory, setQCategory] = useState('general');
  const [message, setMessage] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const load = () => {
    const params = new URLSearchParams({ page, limit: 10, category });
    if (search) params.append('search', search);
    API.get(`/questions/public?${params}`).then((r) => setData(r.data));
  };

  useEffect(() => { load(); }, [page, category]);

  useEffect(() => {
    const timer = setTimeout(() => { setPage(1); load(); }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  const submit = async (e) => {
    e.preventDefault();
    if (question.trim().length < 5) {
      setMessage({ type: 'error', text: 'Question too short' });
      return;
    }
    try {
      setLoading(true);
      await API.post('/questions', { 
        question: question.trim(), 
        language: i18n.language, 
        category: qCategory 
      });
      setQuestion('');
      setMessage({ type: 'success', text: t('qa.submitSuccess') });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.error || 'Error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO 
        title="Islamic Q&A - Fatawa | Jamia Uloom Islamia"
        description="Browse authentic Islamic answers from qualified scholars."
        schema={data.questions.length > 0 ? faqSchema(data.questions) : null}
      />
      <PageHeader 
        title={t('qa.title')}
        subtitle="Get authentic answers from qualified scholars"
      />

      <div className="max-w-5xl mx-auto px-4 py-12">
        {/* Ask Question Card */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-100">
            <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
              <FaQuestionCircle className="text-slate-700" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">{t('hero.askTitle')}</h2>
              <p className="text-xs text-slate-500">{t('hero.askSubtitle')}</p>
            </div>
          </div>
          
          {user ? (
            <form onSubmit={submit} className="space-y-3">
              <select
                value={qCategory}
                onChange={(e) => setQCategory(e.target.value)}
                className="w-full md:w-auto border border-slate-300 px-3 py-2 rounded-lg text-sm focus:outline-none focus:border-slate-900"
              >
                {categories.filter(c => c !== 'all').map((c) => (
                  <option key={c} value={c}>{t(`categories.${c}`)}</option>
                ))}
              </select>
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={t('hero.askPlaceholder')}
                required rows="3"
                className="w-full px-4 py-2.5 rounded-lg border border-slate-300 focus:outline-none focus:border-slate-900 resize-none"
              />
              <button 
                disabled={loading}
                className="bg-slate-900 hover:bg-slate-800 text-white font-medium px-5 py-2.5 rounded-lg flex items-center gap-2 disabled:opacity-60"
              >
                <FaPaperPlane size={14} /> {loading ? '...' : t('hero.askButton')}
              </button>
              {message.text && (
                <p className={`text-sm p-2 rounded ${
                  message.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                }`}>
                  {message.text}
                </p>
              )}
            </form>
          ) : (
            <div className="text-center py-4">
              <p className="text-slate-600 mb-4 text-sm">{t('hero.loginToAsk')}</p>
              <div className="flex gap-2 justify-center">
                <Link to="/login" className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2 rounded-lg text-sm font-medium">
                  {t('auth.login')}
                </Link>
                <Link to="/register" className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 px-5 py-2 rounded-lg text-sm font-medium">
                  {t('auth.register')}
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <FaSearch className="absolute top-3.5 start-4 text-slate-400" size={14} />
          <input
            type="text" placeholder={t('common.search')}
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full ps-11 pe-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:border-slate-900"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {categories.map((c) => (
            <button
              key={c} onClick={() => { setCategory(c); setPage(1); }}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition border ${
                category === c 
                  ? 'bg-slate-900 text-white border-slate-900' 
                  : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400'
              }`}
            >
              {t(`categories.${c}`)}
            </button>
          ))}
        </div>

        {/* Questions */}
        <div className="space-y-3">
          {data.questions.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-lg p-12 text-center">
              <p className="text-slate-500">{t('qa.noQuestions')}</p>
            </div>
          ) : (
            data.questions.map((q) => <QuestionCard key={q._id} q={q} />)
          )}
        </div>

        <Pagination page={page} pages={data.pages} onChange={setPage} />
      </div>
    </>
  );
}