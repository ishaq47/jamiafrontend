import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import API from '../api/axios';
import QuestionCard from './QuestionCard';

export default function QASection() {
  const { t } = useTranslation();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    API.get('/questions/public?limit=5').then((res) => setQuestions(res.data.questions));
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            {t('qa.title')}
          </h2>
          <div className="w-12 h-1 bg-slate-900 mx-auto"></div>
        </div>

        {questions.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-lg p-12 text-center">
            <p className="text-slate-500">{t('qa.noQuestions')}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {questions.map((q) => <QuestionCard key={q._id} q={q} />)}
          </div>
        )}

        <div className="text-center mt-8">
          <Link to="/qa" className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-medium transition">
            View All Q&A <FaArrowRight className="rtl:rotate-180" size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}