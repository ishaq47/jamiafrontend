import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { FaClock, FaCheckCircle } from 'react-icons/fa';

export default function Dashboard() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    API.get('/questions/my').then((res) => setQuestions(res.data));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-green-900 mb-2">
        {t('auth.welcome')}, {user?.name}
      </h1>
      <p className="text-gray-600 mb-8">{t('qa.myQuestions')}</p>

      <div className="space-y-4">
        {questions.map((q) => (
          <div key={q._id}
            className={`bg-white p-5 rounded-lg shadow border-s-4 ${
              q.status === 'answered' ? 'border-green-600' : 'border-yellow-500'
            }`}>
            <div className="flex items-center gap-2 text-sm mb-2 flex-wrap">
              {q.status === 'answered' ? (
                <span className="text-green-700 flex items-center gap-1">
                  <FaCheckCircle /> {t('qa.answered')}
                </span>
              ) : (
                <span className="text-yellow-600 flex items-center gap-1">
                  <FaClock /> {t('qa.pending')}
                </span>
              )}
              <span className="text-gray-400">{new Date(q.createdAt).toLocaleDateString()}</span>
              <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs">
                {t(`categories.${q.category}`)}
              </span>
            </div>
            <p className="font-bold text-gray-800 mb-2">{q.question}</p>
            {q.answer && (
              <div className="mt-3 p-3 bg-green-50 rounded border-s-2 border-green-500">
                <div className="text-gray-700 prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: q.answer }} />
              </div>
            )}
          </div>
        ))}
        {questions.length === 0 && (
          <p className="text-center text-gray-500 py-12">{t('qa.noQuestions')}</p>
        )}
      </div>
    </div>
  );
}