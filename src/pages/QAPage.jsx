import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { FaSearch, FaQuestionCircle, FaPaperPlane } from 'react-icons/fa';
import QuestionCard from '../components/QuestionCard';
import Pagination from '../components/Pagination';

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
  const [message, setMessage] = useState('');

  const load = () => {
    const params = new URLSearchParams({ page, limit: 10, category });
    if (search) params.append('search', search);
    API.get(`/questions/public?${params}`).then((r) => setData(r.data));
  };

  useEffect(() => { load(); }, [page, category]);

  useEffect(() => {
    const timer = setTimeout(() => { setPage(1); load(); }, 500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line
  }, [search]);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/questions', { question, language: i18n.language, category: qCategory });
      setQuestion('');
      setMessage(t('qa.submitSuccess'));
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-green-900 mb-3">{t('qa.title')}</h1>
          <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
        </div>

        {/* Ask Question */}
        <div className="bg-green-900 text-white rounded-2xl p-6 mb-8 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <FaQuestionCircle className="text-3xl text-yellow-400" />
            <h2 className="text-xl font-bold">{t('hero.askTitle')}</h2>
          </div>
          {user ? (
            <form onSubmit={submit} className="space-y-3">
              <select
                value={qCategory}
                onChange={(e) => setQCategory(e.target.value)}
                className="w-full md:w-auto px-4 py-2 rounded bg-white/90 text-gray-800"
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
                className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-800"
              />
              <button className="bg-yellow-500 hover:bg-yellow-400 text-green-900 font-bold px-6 py-2 rounded-lg flex items-center gap-2">
                <FaPaperPlane /> {t('hero.askButton')}
              </button>
              {message && <p className="text-yellow-300">{message}</p>}
            </form>
          ) : (
            <div className="flex gap-3">
              <Link to="/login" className="bg-yellow-500 text-green-900 font-bold px-6 py-2 rounded-lg">{t('auth.login')}</Link>
              <Link to="/register" className="bg-white/20 border border-white/40 text-white font-bold px-6 py-2 rounded-lg">{t('auth.register')}</Link>
            </div>
          )}
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <FaSearch className="absolute top-4 start-4 text-gray-400" />
          <input
            type="text"
            placeholder={t('common.search')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full ps-12 pe-4 py-3 rounded-lg border shadow-sm"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => { setCategory(c); setPage(1); }}
              className={`px-4 py-2 rounded-full text-sm ${
                category === c ? 'bg-green-800 text-white' : 'bg-white border text-gray-700 hover:bg-green-50'
              }`}
            >
              {t(`categories.${c}`)}
            </button>
          ))}
        </div>

        {/* Questions */}
        <div className="space-y-4">
          {data.questions.length === 0 ? (
            <p className="text-center text-gray-500 py-10">{t('qa.noQuestions')}</p>
          ) : (
            data.questions.map((q) => <QuestionCard key={q._id} q={q} />)
          )}
        </div>

        <Pagination page={page} pages={data.pages} onChange={setPage} />
      </div>
    </div>
  );
}