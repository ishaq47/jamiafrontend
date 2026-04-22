import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import API from '../api/axios';
import { FaCheckCircle, FaUserCircle } from 'react-icons/fa';

export default function QASection() {
  const { t } = useTranslation();
  const [questions, setQuestions] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    API.get('/questions/public')
      .then((res) => setQuestions(res.data))
      .catch(() => setQuestions([]));
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
            {questions.map((q) => (
              <div
                key={q._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition border-s-4 border-green-700 overflow-hidden"
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
                    <h3 className="font-bold text-lg text-green-900">
                      {q.question}
                    </h3>
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
            ))}
          </div>
        )}
      </div>
    </section>
  );
}