import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { FaClock, FaCheckCircle } from 'react-icons/fa';
import PageHeader from '../components/PageHeader';

export default function Dashboard() {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    API.get('/questions/my').then((res) => setQuestions(res.data));
  }, []);

  return (
    <>
      <PageHeader 
        title={`${t('auth.welcome')}, ${user?.name}`}
        subtitle={t('qa.myQuestions')}
      />

      <div className="max-w-5xl mx-auto px-4 py-12">
        <div className="space-y-3">
          {questions.map((q) => (
            <div key={q._id} className="bg-white border border-slate-200 rounded-lg p-5">
              <div className="flex items-center gap-2 text-xs mb-3 flex-wrap">
                {q.status === 'answered' ? (
                  <span className="flex items-center gap-1 bg-emerald-50 text-emerald-700 px-2 py-1 rounded">
                    <FaCheckCircle size={11} /> {t('qa.answered')}
                  </span>
                ) : (
                  <span className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-2 py-1 rounded">
                    <FaClock size={11} /> {t('qa.pending')}
                  </span>
                )}
                <span className="text-slate-500">{new Date(q.createdAt).toLocaleDateString()}</span>
                <span className="bg-slate-100 text-slate-700 px-2 py-1 rounded">
                  {t(`categories.${q.category}`)}
                </span>
              </div>
              <p className="font-medium text-slate-900 mb-3">{q.question}</p>
              {q.answer && (
                <div className="mt-3 p-4 bg-slate-50 rounded border-s-2 border-slate-900">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Answer</p>
                  <div className="text-slate-700 prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: q.answer }} />
                </div>
              )}
            </div>
          ))}
          {questions.length === 0 && (
            <div className="bg-white border border-slate-200 rounded-lg p-12 text-center">
              <p className="text-slate-500">{t('qa.noQuestions')}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}