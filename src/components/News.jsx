import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import { useLanguage } from '../context/LanguageContext';

export default function News() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [news, setNews] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/news?lang=${language}`)
      .then((res) => setNews(res.data))
      .catch(() => setNews([]));
  }, [language]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-green-900 mb-12">
          {t('news.title')}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {news.length ? (
            news.map((item) => (
              <article
                key={item._id}
                className="bg-gray-50 rounded-lg overflow-hidden shadow hover:shadow-lg"
              >
                <img
                  src={item.image || 'https://via.placeholder.com/400x250'}
                  alt=""
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <span className="text-xs text-yellow-600">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                  <h3 className="text-xl font-bold text-green-900 mt-2 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {item.description?.substring(0, 120)}...
                  </p>
                </div>
              </article>
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-500">No news available</p>
          )}
        </div>
      </div>
    </section>
  );
}