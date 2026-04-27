import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import API, { API_URL } from '../api/axios';
import { useLanguage } from '../context/LanguageContext';
import { FaCalendarAlt, FaArrowRight } from 'react-icons/fa';

export default function News() {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [news, setNews] = useState([]);

  useEffect(() => {
    API.get(`/news?lang=${language}&limit=3`)
      .then((res) => setNews(res.data.news || []))
      .catch(() => setNews([]));
  }, [language]);

  const getImageUrl = (img) => img?.startsWith('/uploads/') ? `${API_URL}${img}` : img;

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">{t('news.title')}</h2>
          <div className="w-12 h-1 bg-slate-900 mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {news.map((item) => (
            <article key={item._id} className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:border-slate-300 transition">
              {item.image && (
                <img src={getImageUrl(item.image)} alt="" className="w-full h-44 object-cover" />
              )}
              <div className="p-5">
                <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                  <FaCalendarAlt size={11} />
                  {new Date(item.createdAt).toLocaleDateString()}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600">{item.description?.substring(0, 100)}...</p>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link to="/news" className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-medium transition">
            All News <FaArrowRight className="rtl:rotate-180" size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}