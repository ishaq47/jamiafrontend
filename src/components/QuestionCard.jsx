import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaUserCircle, FaCheckCircle, FaChevronDown } from 'react-icons/fa';

export default function QuestionCard({ q }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition border-s-4 border-green-700 overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-5 text-start flex justify-between items-start gap-4"
      >
        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2 flex-wrap">
            <FaUserCircle />
            <span>{q.userName}</span>
            <span className="text-green-600 flex items-center gap-1">
              <FaCheckCircle /> {t('qa.answered')}
            </span>
            {q.category && (
              <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs">
                {t(`categories.${q.category}`)}
              </span>
            )}
          </div>
          <h3 className="font-bold text-lg text-green-900">{q.question}</h3>
        </div>
        <FaChevronDown
          className={`text-yellow-600 text-xl transition-transform mt-2 ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 bg-yellow-50 border-t border-yellow-200">
            <h4 className="font-bold text-green-800 mt-3 mb-2">{t('qa.answer')}:</h4>
            <div
              className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: q.answer }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}