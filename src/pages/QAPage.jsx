import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { FaSearch, FaUserCircle, FaCheckCircle, FaQuestionCircle, FaPaperPlane } from 'react-icons/fa';

export default function QAPage() {
  const { t, i18n } = useTranslation();
  const { user } = useAuth();
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);
  const [question, setQuestion] = useState('');
  const [message, setMessage] = useState('');

  const load = () => API.get('/questions/public').then((r) => setQuestions(r.data));

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/questions', {
        question,
        language: i18n.language,
        category: 'general',
      });
      setQuestion('');
      setMessage(t('qa.submitSuccess'));
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Error');
    }
  };

  const filtered = questions.filter(
    (q) =>
      q.question.toLowerCase().includes(search.toLowerCase()) ||
      q.answer?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-green-900 mb-3">{t('qa.title')}</h1>
          <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
        </div>

        {/* Ask Question Card */}
        <div className="bg-green-900 text-white rounded-2xl p-6 mb-8 shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <FaQuestionCircle className="text-3xl text-yellow-400" />
            <h2 className="text-xl font-bold">{t('hero.askTitle')}</h2>
          </div>
          {user ? (
            <form onSubmit={submit} className="space-y-3">
              <textarea
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder={t('hero.askPlaceholder')}
                required
                rows="3"
                className="w-full px-4 py-3 rounded-lg bg-white/90 text-gray-800"
              />
              <button className="bg-yellow-500 hover:bg-yellow-400 text-green-900 font-bold px-6 py-2 rounded-lg flex items-center gap-2">
                <FaPaperPlane /> {t('hero.askButton')}
              </button>
              {message && <p className="text-yellow-300">{message}</p>}
            </form>
          ) : (
            <div className="flex gap-3">
              <Link to="/login" className="bg-yellow-500 text-green-900 font-bold px-6 py-2 rounded-lg">
                {t('auth.login')}
              </Link>
              <Link to="/register" className="bg-white/20 border border-white/40 text-white font-bold px-6 py-2 rounded-lg">
                {t('auth.register')}
              </Link>
            </div>
          )}
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <FaSearch className="absolute top-4 start-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full ps-12 pe-4 py-3 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <p className="text-center text-gray-500 py-10">{t('qa.noQuestions')}</p>
          ) : (
            filtered.map((q) => (
              <div
                key={q._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition border-s-4 border-green-700"
              >
                <button
                  onClick={() => setExpanded(expanded === q._id ? null : q._id)}
                  className="w-full p-5 text-start flex justify-between items-start gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <FaUserCircle />
                      <span>{q.userName}</span>
                      <span className="text-green-600 flex items-center gap-1">
                        <FaCheckCircle /> {t('qa.answered')}
                      </span>
                    </div>
                    <h3 className="font-bold text-lg text-green-900">{q.question}</h3>
                  </div>
                  <span className="text-yellow-600 text-2xl">
                    {expanded === q._id ? '−' : '+'}
                  </span>
                </button>
                {expanded === q._id && (
                  <div className="px-5 pb-5 bg-yellow-50 border-t border-yellow-200">
                    <h4 className="font-bold text-green-800 mt-3 mb-2">
                      {t('qa.answer')}:
                    </h4>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {q.answer}
                    </p>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}