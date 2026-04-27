import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { FaBook, FaQuran, FaMicrophone, FaGavel, FaScroll, FaLanguage, FaArrowRight } from 'react-icons/fa';

export default function Departments() {
  const { t } = useTranslation();
  const items = [
    { key: 'dars', icon: FaBook },
    { key: 'hifz', icon: FaQuran },
    { key: 'tajweed', icon: FaMicrophone },
    { key: 'ifta', icon: FaGavel },
    { key: 'hadith', icon: FaScroll },
    { key: 'arabic', icon: FaLanguage },
  ];

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">
            {t('departments.title')}
          </h2>
          <div className="w-12 h-1 bg-slate-900 mx-auto"></div>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className="bg-white border border-slate-200 rounded-lg p-6 hover:border-slate-400 transition group"
            >
              <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-slate-900 transition">
                <Icon className="text-xl text-slate-700 group-hover:text-white transition" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {t(`departments.${key}`)}
              </h3>
              <p className="text-slate-600 text-sm">
                Authentic Islamic education in this field.
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/departments" className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-medium transition">
            View All Departments <FaArrowRight className="rtl:rotate-180" size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}