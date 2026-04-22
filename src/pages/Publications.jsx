import { useTranslation } from 'react-i18next';
import { FaBook } from 'react-icons/fa';

export default function Publications() {
  const { t } = useTranslation();
  const books = [
    { title: 'Tafseer Collection', pages: 500 },
    { title: 'Hadith Studies', pages: 350 },
    { title: 'Fiqh Essentials', pages: 400 },
    { title: 'Arabic Grammar', pages: 280 },
  ];

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-r from-green-900 to-green-800 text-white py-20 text-center">
        <h1 className="text-5xl font-bold mb-4">{t('pages.publicationsTitle')}</h1>
        <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-16">
        <p className="text-center text-lg text-gray-700 mb-12">{t('pages.publicationsContent')}</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {books.map((b, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow hover:shadow-xl transition">
              <FaBook className="text-5xl text-green-700 mb-4" />
              <h3 className="font-bold text-green-900">{b.title}</h3>
              <p className="text-gray-500 text-sm mt-1">{b.pages} pages</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}