import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FaUserCircle, FaCheckCircle, FaChevronDown } from 'react-icons/fa';

export default function QuestionCard({ q }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white border border-slate-200 rounded-lg hover:border-slate-300 hover:shadow-sm transition overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full p-5 text-start flex justify-between items-start gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-2 flex-wrap">
            <FaUserCircle />
            <span>{q.userName}</span>
            <span className="text-emerald-600 flex items-center gap-1">
              <FaCheckCircle /> {t('qa.answered')}
            </span>
            {q.category && (
              <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-xs">
                {t(`categories.${q.category}`)}
              </span>
            )}
          </div>
          <h3 className="font-semibold text-slate-900">{q.question}</h3>
        </div>
        <FaChevronDown className={`text-slate-400 mt-1 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <div className="px-5 pb-5 border-t border-slate-100 pt-4">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{t('qa.answer')}</h4>
            <div 
  className="text-slate-700 text-[15px] leading-relaxed space-y-3 max-w-none"
  dangerouslySetInnerHTML={{ __html: q.answer }}
/>
          </div>
        </div>
      </div>
    </div>
  );
}