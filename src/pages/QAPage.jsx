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
  const [isFetching, setIsFetching] = useState(true);

  const lang = i18n.language || 'en';
  const isRtl = lang === 'ur' || lang === 'ar';

  const load = async () => {
    try {
      setIsFetching(true);
      const params = new URLSearchParams({ page, limit: 10, category });
      if (search.trim()) params.append('search', search.trim());
      const res = await API.get(`/questions/public?${params}`);
      setData(res.data || { questions: [], pages: 1 });
    } catch (err) {
      console.error('Error loading questions:', err);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    load();
  }, [page, category]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPage(1);
      load();
    }, 400);
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
        language: lang,
        category: qCategory,
      });
      setQuestion('');
      setMessage({ type: 'success', text: t('qa.submitSuccess') || 'Question submitted successfully!' });
      setTimeout(() => setMessage({ type: '', text: '' }), 3000);
    } catch (err) {
      setMessage({ type: 'error', text: err.response?.data?.error || 'Error submitting question' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div dir={isRtl ? 'rtl' : 'ltr'} className="font-serif bg-slate-50/50 min-h-screen">
      <SEO 
        title={`${t('qa.title') || 'Islamic Q&A - Fatawa'} | Jamia Darul Uloom Shah Mansoor`}
        description="Browse authentic Islamic answers from qualified scholars at Jamia Darul Uloom Shah Mansoor."
        schema={data.questions && data.questions.length > 0 ? faqSchema(data.questions) : null}
      />
      
      <PageHeader 
        title={t('qa.title') || 'Questions & Answers'}
        subtitle={t('hero.askSubtitle') || 'Get authentic answers from qualified Islamic scholars'}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14 space-y-8">
        
        {/* Submit Question Box */}
        {user?.role !== 'admin' && (
          <div className="bg-white border border-emerald-100 rounded-2xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-900 via-amber-400 to-emerald-900"></div>

            <div className="flex items-center gap-3.5 mb-6 pb-4 border-b border-slate-100">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-900 border border-emerald-200/80 rounded-xl flex items-center justify-center flex-shrink-0">
                <FaQuestionCircle size={20} />
              </div>
              <div>
                <h2 className="text-lg font-bold text-emerald-950">
                  {t('hero.askTitle') || 'Ask a Question'}
                </h2>
                <p className="text-xs text-slate-500">
                  {t('hero.askSubtitle') || 'Get authentic guidance from our Fatwa Department'}
                </p>
              </div>
            </div>

            {user ? (
              <form onSubmit={submit} className="space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <label className="text-xs font-semibold text-emerald-950 sm:w-28">
                    {t('qa.category') || 'Category'}:
                  </label>
                  <select
                    value={qCategory}
                    onChange={(e) => setQCategory(e.target.value)}
                    className="border border-slate-200 bg-slate-50/50 text-slate-800 text-sm px-3.5 py-2 rounded-xl focus:outline-none focus:border-amber-400 focus:bg-white transition"
                  >
                    {categories.filter((c) => c !== 'all').map((c) => (
                      <option key={c} value={c}>
                        {t(`categories.${c}`) || c}
                      </option>
                    ))}
                  </select>
                </div>

                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder={t('hero.askPlaceholder') || 'Write your question here...'}
                  required
                  rows="3"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 text-sm placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:bg-white resize-none transition font-sans"
                />

                <div className="flex items-center justify-between gap-4 pt-1">
                  <button 
                    type="submit"
                    disabled={loading}
                    className="bg-emerald-900 hover:bg-emerald-950 text-amber-100 font-bold px-6 py-2.5 rounded-xl text-sm flex items-center gap-2 transition shadow-sm disabled:opacity-60"
                  >
                    <FaPaperPlane size={13} />
                    <span>{loading ? '...' : (t('hero.askButton') || 'Submit Question')}</span>
                  </button>

                  {message.text && (
                    <p className={`text-xs px-3 py-2 rounded-lg font-sans border ${
                      message.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-700'
                    }`}>
                      {message.text}
                    </p>
                  )}
                </div>
              </form>
            ) : (
              <div className="text-center py-4 bg-emerald-50/50 border border-dashed border-emerald-200/80 rounded-xl p-6">
                <p className="text-slate-700 mb-4 text-sm font-medium">
                  {t('hero.loginToAsk') || 'Please login or create an account to submit a question.'}
                </p>
                <div className="flex gap-3 justify-center">
                  <Link to="/login" className="bg-emerald-900 hover:bg-emerald-950 text-amber-100 px-5 py-2 rounded-xl text-xs font-bold transition shadow-xs">
                    {t('auth.login') || 'Login'}
                  </Link>
                  <Link to="/register" className="bg-amber-400 hover:bg-amber-300 text-emerald-950 px-5 py-2 rounded-xl text-xs font-bold transition shadow-xs">
                    {t('auth.register') || 'Register'}
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Search Bar */}
        <div className="relative">
          <FaSearch className="absolute top-3.5 start-4 text-emerald-700/60" size={14} />
          <input
            type="text"
            placeholder={t('common.search') || 'Search questions or fatawa...'}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full ps-11 pe-4 py-3 rounded-xl bg-white border border-emerald-100/90 text-slate-800 text-sm focus:outline-none focus:border-amber-400 shadow-xs transition"
          />
        </div>

        {/* Category Selector Pills */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => { setCategory(c); setPage(1); }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition border ${
                category === c 
                  ? 'bg-emerald-900 text-amber-300 border-emerald-900 shadow-xs' 
                  : 'bg-white text-slate-700 border-emerald-100 hover:bg-emerald-50'
              }`}
            >
              {t(`categories.${c}`) || c}
            </button>
          ))}
        </div>

        {/* Questions List Container */}
        {isFetching ? (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white border border-emerald-100 rounded-2xl p-6 animate-pulse space-y-3">
                <div className="h-5 bg-slate-200 rounded w-3/4"></div>
                <div className="h-4 bg-slate-100 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : data.questions.length === 0 ? (
          <div className="bg-white border border-emerald-100/90 rounded-2xl p-12 text-center shadow-xs">
            <FaQuestionCircle className="mx-auto text-4xl text-emerald-800/30 mb-3" />
            <p className="text-slate-600 font-medium text-sm sm:text-base">
              {t('qa.noQuestions') || 'No public questions found matching your search.'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {data.questions.map((q) => (
              <QuestionCard key={q._id || q.id} q={q} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {data.pages > 1 && (
          <div className="pt-4">
            <Pagination page={page} pages={data.pages} onChange={setPage} />
          </div>
        )}

      </div>
    </div>
  );
}