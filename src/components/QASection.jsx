import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import API from '../api/axios';
import QuestionCard from './QuestionCard';

export default function QASection() {
  const { t } = useTranslation();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    API.get('/questions/public?limit=5').then((res) => setQuestions(res.data.questions));
  }, []);

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-green-900 mb-3">
          {t('qa.title')}
        </h2>
        <div className="w-24 h-1 bg-yellow-500 mx-auto mb-12"></div>

        {questions.length === 0 ? (
          <p className="text-center text-gray-500">{t('qa.noQuestions')}</p>
        ) : (
          <div className="space-y-4">
            {questions.map((q) => <QuestionCard key={q._id} q={q} />)}
          </div>
        )}
        <div className="text-center mt-8">
          <Link to="/qa" className="inline-block bg-green-800 hover:bg-green-700 text-white px-8 py-3 rounded-full font-bold">
            {t('common.viewAll')} →
          </Link>
        </div>
      </div>
    </section>
  );
}