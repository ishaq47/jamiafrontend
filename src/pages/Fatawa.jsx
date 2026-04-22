import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Fatawa() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-green-900 to-green-800 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">{t('pages.fatawaTitle')}</h1>
        <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
      </div>
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <p className="text-lg text-gray-700 mb-8">{t('pages.fatawaContent')}</p>
        <Link to="/qa" className="inline-block bg-green-800 hover:bg-green-700 text-white px-8 py-3 rounded-full font-bold">
          {t('common.viewAll')} →
        </Link>
      </div>
    </div>
  );
}