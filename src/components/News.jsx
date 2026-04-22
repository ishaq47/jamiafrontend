import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import API, { API_URL } from '../api/axios';
import { useLanguage } from '../context/LanguageContext';

export default function News() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [news, setNews] = useState([]);

  useEffect(() => {
    API.get(`/news?lang=${language}&limit=3`)
      .then((res) => setNews(res.data.news || []))
      .catch(() => setNews([]));
  }, [language]);

  const getImageUrl = (img) =>
    img?.startsWith('/uploads/') ? `${API_URL}${img}` : img;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-green-900 mb-3">
          {t('news.title')}
        </h2>
        <div className="w-24 h-1 bg-yellow-500 mx-auto mb-12"></div>
        <div className="grid md:grid-cols-3 gap-6">
          {news.map((item) => (
            <article key={item._id} className="bg-gray-50 rounded-lg overflow-hidden shadow hover:shadow-lg transition">
              {item.image && (
                <img src={getImageUrl(item.image)} alt="" className="w-full h-48 object-cover" />
              )}
              <div className="p-5">
                <span className="text-xs text-yellow-600">
                  {new Date(item.createdAt).toLocaleDateString()}
                </span>
                <h3 className="text-xl font-bold text-green-900 mt-2 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description?.substring(0, 120)}...</p>
              </div>
            </article>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/news" className="inline-block bg-green-800 hover:bg-green-700 text-white px-8 py-3 rounded-full font-bold">
            {t('common.viewAll')} →
          </Link>
        </div>
      </div>
    </section>
  );
}