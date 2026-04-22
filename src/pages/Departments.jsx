import { useTranslation } from 'react-i18next';
import { FaBook, FaQuran, FaMicrophone, FaGavel, FaScroll, FaLanguage } from 'react-icons/fa';

export default function Departments() {
  const { t } = useTranslation();
  const items = [
    { key: 'dars', icon: FaBook, color: 'from-green-600 to-green-800' },
    { key: 'hifz', icon: FaQuran, color: 'from-yellow-500 to-yellow-700' },
    { key: 'tajweed', icon: FaMicrophone, color: 'from-blue-600 to-blue-800' },
    { key: 'ifta', icon: FaGavel, color: 'from-purple-600 to-purple-800' },
    { key: 'hadith', icon: FaScroll, color: 'from-red-600 to-red-800' },
    { key: 'arabic', icon: FaLanguage, color: 'from-pink-600 to-pink-800' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-green-900 to-green-800 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">{t('pages.departmentsTitle')}</h1>
        <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map(({ key, icon: Icon, color }) => (
            <div key={key} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-1">
              <div className={`bg-gradient-to-br ${color} p-8 text-white`}>
                <Icon className="text-6xl mb-4" />
                <h3 className="text-2xl font-bold">{t(`departments.${key}`)}</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600">{t('about.description')}</p>
                <button className="mt-4 text-green-700 font-bold hover:underline">
                  {t('common.readMore')} →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}