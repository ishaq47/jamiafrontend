import { useTranslation } from 'react-i18next';
import { FaBook, FaQuran, FaMicrophone, FaGavel, FaScroll, FaLanguage } from 'react-icons/fa';

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
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-green-900 mb-12">
          {t('departments.title')}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className="bg-white p-8 rounded-lg shadow hover:shadow-xl transition border-t-4 border-yellow-500"
            >
              <Icon className="text-5xl text-green-800 mb-4" />
              <h3 className="text-2xl font-bold text-green-900 mb-2">
                {t(`departments.${key}`)}
              </h3>
              <p className="text-gray-600">
                {t('about.description').substring(0, 80)}...
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}